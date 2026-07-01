import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShieldAlert,
  Settings,
  FileText,
  ChevronRight,
  X,
  Download,
  AlertCircle,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Building,
  Users,
} from "lucide-react";
import { cn } from "../lib/utils";
import { AnalyticsView } from "./AnalyticsView";
import { InvestigationsView } from "./InvestigationsView";

const TRANSLATIONS: any = {
  en: {
    dashboard: "Dashboard",
    threats: "Threats",
    analytics: "Analytics",
    settings: "Settings",
    euProductPassport: "EU Product Passport",
    activeThreats: "Active Threats",
    requiresAttention: "Requires attention",
    liveFeed: "Live Feed",
    viewAll: "View All",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    scansOverview: "Scans Overview (Last 7 Days)",
    threatsBlocked: "Threats Blocked (Trend)",
    actionRequired: "Action Required",
    investigate: "Investigate",
    dismiss: "Dismiss",
    noActiveThreats: "No active threats.",
    securityPolicies: "Security Policies",
    require2fa: "Require 2FA for all members",
    system: "System",
    autoBlock: "Auto-block Critical Threats",
    emailAlerts: "Email Alerts",
    language: "Language",
    fontSize: "Font Size",
    investigationDetails: "Investigation Details",
    activeIncident: "Active Incident",
    product: "Product",
    description: "Description",
    locationDetected: "Location Detected",
    timeOfDetection: "Time of Detection",
    severity: "Severity",
    incidentId: "Incident ID",
    generateReport: "Generate Full Report",
    reportDownloaded: "Report Downloaded",
    takeOfflineAction: "Take Offline Action",
    actionLogged: "Action Logged",
    goBack: "Go Back",
    noThreatSelected: "No threat selected for investigation.",
    exportData: "Export Data",
    close: "Close",
    vsYesterday: "vs yesterday",
    vsLastWeek: "vs last week",
    vsLastMonth: "vs last month",
    menu: "Menu",
    overview: "Overview",
    todayMetrics: "Today's metrics",
    totalScans: "Total Scans",
    threatIntelligence: "Threat Intelligence",
    resolvedToday: "Resolved Today",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
    replayAttackBlocked: "Replay Attack Blocked",
    velocityAnomaly: "Velocity Anomaly",
    bruteForceAttempt: "Brute Force Attempt",
    premiumSwissChronograph: "Premium Swiss Chronograph",
    luxuryCognacXO: "Luxury Cognac XO",
    authEndpoint: "Authentication Endpoint",
    twoMinsAgo: "2 mins ago",
    fifteenMinsAgo: "15 mins ago",
    fortyFiveMinsAgo: "45 mins ago",
    cmacSpent: "CMAC spent. Cryptographic counter did not increment. Attempted cloning detected.",
    haversineFailed: "Haversine check failed. Impossible travel speed detected between New York and Tokyo.",
    multipleFailed: "Multiple failed tag validation attempts from single IP. Rate limiting applied.",
    verified: "Verified",
    organicOliveOil: "Organic Reserve Olive Oil",
    artisanHandbag: "Artisan Leather Handbag",
    oneHrAgo: "1 hr ago",
    threeHrsAgo: "3 hrs ago",
    validScan: "Valid scan. Cryptographic signature verified by Cloud HSM.",
    critical: "CRITICAL"
  },
  tr: {
    dashboard: "Panel",
    threats: "Tehditler",
    analytics: "Analizler",
    settings: "Ayarlar",
    euProductPassport: "AB Ürün Pasaportu",
    activeThreats: "Aktif Tehditler",
    requiresAttention: "Dikkat gerektiriyor",
    liveFeed: "Canlı Akış",
    viewAll: "Tümünü Gör",
    today: "Bugün",
    thisWeek: "Bu Hafta",
    thisMonth: "Bu Ay",
    scansOverview: "Tarama Özeti (Son 7 Gün)",
    threatsBlocked: "Engellenen Tehditler",
    actionRequired: "Eylem Gerekiyor",
    investigate: "İncele",
    dismiss: "Kapat",
    noActiveThreats: "Aktif tehdit yok.",
    securityPolicies: "Güvenlik Politikaları",
    require2fa: "Tüm üyeler için 2FA zorunlu",
    system: "Sistem",
    autoBlock: "Kritik Tehditleri Otomatik Engelle",
    emailAlerts: "E-posta Uyarıları",
    language: "Dil",
    fontSize: "Yazı Boyutu",
    investigationDetails: "İnceleme Detayları",
    activeIncident: "Aktif Olay",
    product: "Ürün",
    description: "Açıklama",
    locationDetected: "Tespit Edilen Konum",
    timeOfDetection: "Tespit Zamanı",
    severity: "Önem Derecesi",
    incidentId: "Olay Kimliği",
    generateReport: "Tam Rapor Oluştur",
    reportDownloaded: "Rapor İndirildi",
    takeOfflineAction: "Çevrimdışı Eylem Al",
    actionLogged: "Eylem Kaydedildi",
    goBack: "Geri Dön",
    noThreatSelected: "İncelenecek tehdit seçilmedi.",
    exportData: "Veriyi Dışa Aktar",
    close: "Kapat",
    vsYesterday: "düne göre",
    vsLastWeek: "geçen haftaya göre",
    vsLastMonth: "geçen aya göre",
    menu: "Menü",
    overview: "Genel Bakış",
    todayMetrics: "Bugünün ölçümleri",
    totalScans: "Toplam Taramalar",
    threatIntelligence: "Tehdit İstihbaratı",
    resolvedToday: "Bugün Çözülen",
    mon: "Pzt",
    tue: "Sal",
    wed: "Çar",
    thu: "Per",
    fri: "Cum",
    sat: "Cmt",
    sun: "Paz",
    replayAttackBlocked: "Tekrar Saldırısı Engellendi",
    velocityAnomaly: "Hız Anomalisi",
    bruteForceAttempt: "Kaba Kuvvet Denemesi",
    premiumSwissChronograph: "Premium İsviçre Kronografı",
    luxuryCognacXO: "Lüks Konyak XO",
    authEndpoint: "Kimlik Doğrulama Uç Noktası",
    twoMinsAgo: "2 dk önce",
    fifteenMinsAgo: "15 dk önce",
    fortyFiveMinsAgo: "45 dk önce",
    cmacSpent: "CMAC harcandı. Kriptografik sayaç artmadı. Klonlama girişimi tespit edildi.",
    haversineFailed: "Haversine kontrolü başarısız. New York ve Tokyo arasında imkansız seyahat hızı.",
    multipleFailed: "Tek IP'den birden fazla başarısız etiket doğrulama denemesi. Hız sınırlaması uygulandı.",
    verified: "Doğrulandı",
    organicOliveOil: "Organik Rezerv Zeytinyağı",
    artisanHandbag: "El Yapımı Deri Çanta",
    oneHrAgo: "1 saat önce",
    threeHrsAgo: "3 saat önce",
    validScan: "Geçerli tarama. Kriptografik imza Cloud HSM tarafından doğrulandı.",
    critical: "KRİTİK"
  }
};

export function CompanyApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dppModalOpen, setDppModalOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<any>(null);
  
  const [settings, setSettings] = useState({
    autoBlockThreats: true,
    emailAlerts: true,
    twoFactorAuth: false,
    language: "en",
    fontSize: "medium"
  });

  useEffect(() => {
    const sizeMap: any = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.fontSize = sizeMap[settings.fontSize] || "16px";
  }, [settings.fontSize]);

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const handleNavigate = (tab: string, item?: any) => {
    setActiveTab(tab);
    if (tab === "investigations" && item) {
      setSelectedThreat(item);
    }
  };

  return (
    <div className="h-full flex flex-row w-full bg-slate-50 relative overflow-hidden">
      {/* Background Spinning Half-Sphere */}
      <div className="absolute top-1/2 -right-[400px] -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 opacity-[0.25] overflow-visible">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <div 
            className="relative w-full h-full transform-3d"
            style={{ animation: "spin-idle-3d 240s linear infinite" }}
          >
            {/* Longitudinal rings */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`bg-long-${i}`}
                className="absolute rounded-full left-1/2 top-1/2 w-full h-full border-[1.5px] border-[#10b981] opacity-70"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${i * 15}deg)`,
                }}
              />
            ))}
            {/* Latitudinal rings */}
            {[...Array(13)].map((_, i) => {
              const index = i - 6; // -6 to 6
              const angle = (index / 7) * (Math.PI / 2);
              const r = Math.cos(angle) * 400; // radius in px
              const y = Math.sin(angle) * 400; // y in px
              if (Math.abs(index) === 6) return null;
              return (
                <div
                  key={`bg-lat-${i}`}
                  className="absolute rounded-full left-1/2 top-1/2 border-[1.5px] border-[#10b981] opacity-70"
                  style={{
                    width: `${r * 2}px`,
                    height: `${r * 2}px`,
                    transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${y}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Side Nav */}
      <div className="w-64 bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%] border-r border-white/50 p-6 flex flex-col gap-2 relative z-40 shadow-[4px_0_24px_rgba(0,0,0,0.08)]">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
          {t.menu || "Menu"}
        </div>
        <NavButton
          id="dashboard"
          icon={LayoutDashboard}
          label={t.dashboard}
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <NavButton
          id="threats"
          icon={ShieldAlert}
          label={t.threats}
          active={activeTab === "threats"}
          onClick={() => setActiveTab("threats")}
        />
        <NavButton
          id="settings"
          icon={Settings}
          label={t.settings}
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />

        {/* Floating Action Button for DPP - moved to sidebar */}
        <div className="mt-auto">
          <button
            onClick={() => setDppModalOpen(true)}
            className="w-full bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/50 text-slate-800 hover:bg-white/80 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 z-30"
          >
            <FileText className="w-5 h-5" />
            <span className="font-bold text-sm">{t.euProductPassport}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full relative bg-transparent z-10">

        <div className="relative z-10 h-full">
          {activeTab === "dashboard" && (
            <AdminDashboard onOpenDpp={() => setDppModalOpen(true)} onNavigate={handleNavigate} t={t} />
          )}
          {activeTab === "threats" && <ThreatsView onNavigate={handleNavigate} t={t} />}
          {activeTab === "analytics" && <AnalyticsView t={t} />}
          {activeTab === "investigations" && <InvestigationsView threat={selectedThreat} onBack={() => setActiveTab("threats")} t={t} />}
          {activeTab === "settings" && <AdminSettingsView settings={settings} setSettings={setSettings} t={t} />}
        </div>
      </div>

      {/* DPP Modal (Bottom Sheet / Modal) */}
      {dppModalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-center items-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in p-4 sm:p-8">
          <div
            className="absolute inset-0"
            onClick={() => setDppModalOpen(false)}
          ></div>
          <div className="bg-white rounded-[2rem] w-full max-w-lg max-h-[85%] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-xl text-slate-800">
                {t.euProductPassport}
              </h3>
              <button
                onClick={() => setDppModalOpen(false)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 font-mono text-xs text-slate-600 shadow-sm overflow-hidden" id="dpp-content">
                <pre className="whitespace-pre-wrap break-all leading-relaxed">
                  {`{
  "passport_id": "urn:epc:12345",
  "issuer": "AuthentiChain",
  "compliance": "EU-DPP-2027",
  "status": "VERIFIED_COMPLIANT",
  "product_data": {
    "manufacturer": "CAVIDOĞLU",
    "carbon_footprint": "4.2kg CO2",
    "materials": [
      "Recycled Aluminum",
      "Bio-resin"
    ]
  },
  "signature": "304502201...6259"
}`}
                </pre>
              </div>
            </div>
            <div className="p-6 bg-white/40 backdrop-blur-xl border-t border-white/60 rounded-b-[2rem] shrink-0">
              <button 
                onClick={() => {
                  const data = document.getElementById("dpp-content")?.innerText || "";
                  const blob = new Blob([data], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "eu-product-passport.json";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="w-full bg-white/60 backdrop-blur-xl border border-white/60 text-slate-800 font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/80"
              >
                <Download className="w-5 h-5" />
                {t.exportData}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 w-full text-left group",
        active
          ? "bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-slate-800"
          : "bg-transparent border border-transparent text-slate-500 hover:bg-white/40 hover:backdrop-blur-md hover:border-white/40",
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors duration-200 shrink-0",
          active
            ? "text-slate-800"
            : "text-slate-400 group-hover:text-slate-600",
        )}
      />
      <span
        className={cn(
          "text-sm font-bold transition-colors duration-200 tracking-wide truncate",
          active
            ? "text-slate-800"
            : "text-slate-500 group-hover:text-slate-700",
        )}
      >
        {label}
      </span>
    </button>
  );
}

function AdminDashboard({ onOpenDpp, onNavigate, t }: { onOpenDpp: () => void, onNavigate: (tab: string) => void, t: any }) {
  const [expandedThreat, setExpandedThreat] = useState<number | null>(null);

  const threats = [
    {
      id: 1,
      type: t.replayAttackBlocked || "Replay Attack Blocked",
      product: t.premiumSwissChronograph || "Premium Swiss Chronograph",
      loc: "Paris",
      time: t.twoMinsAgo || "2 mins ago",
      status: "danger",
      detail: t.cmacSpent || "CMAC spent. Cryptographic counter did not increment. Attempted cloning detected.",
    },
    {
      id: 2,
      type: t.velocityAnomaly || "Velocity Anomaly",
      product: t.luxuryCognacXO || "Luxury Cognac XO",
      loc: "Tokyo",
      time: t.fifteenMinsAgo || "15 mins ago",
      status: "danger",
      detail: t.haversineFailed || "Haversine check failed. Impossible travel speed detected between New York and Tokyo.",
    },
    {
      id: 3,
      type: t.verified || "Verified",
      product: t.organicOliveOil || "Organic Reserve Olive Oil",
      loc: "Rome",
      time: t.oneHrAgo || "1 hr ago",
      status: "safe",
      detail: t.validScan || "Valid scan. Cryptographic signature verified by Cloud HSM.",
    },
    {
      id: 4,
      type: t.verified || "Verified",
      product: t.artisanHandbag || "Artisan Leather Handbag",
      loc: "New York",
      time: t.threeHrsAgo || "3 hrs ago",
      status: "safe",
      detail: t.validScan || "Valid scan. Cryptographic signature verified by Cloud HSM.",
    },
  ];

  return (
    <div className="p-6 pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            {t.overview}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            {t.todayMetrics}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
        <div 
          onClick={() => onNavigate("analytics")}
          className="cursor-pointer active:scale-[0.98] transition-transform bg-white/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden h-full"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              {t.totalScans}
            </div>
            <div>
              <div className="text-4xl font-black text-slate-800 tracking-tight">
                145,200
              </div>
              <div className="mt-4 text-xs font-bold text-lime-600 bg-white/80 backdrop-blur-md inline-block px-3 py-1.5 rounded-full shadow-sm border border-white/60">
                +12.3% {t.vsYesterday}
              </div>
            </div>
          </div>
        </div>
        <div 
          onClick={() => onNavigate("threats")}
          className="cursor-pointer active:scale-[0.98] transition-transform bg-white/50 backdrop-blur-xl text-slate-800 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden h-full border border-white/60"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              {t.threatsBlocked}
            </div>
            <div>
              <div className="text-4xl font-black tracking-tight text-slate-800">3,402</div>
              <div className="mt-4 text-xs font-bold text-slate-600 bg-white/80 backdrop-blur-md inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm border border-white/60 w-max">
                <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                {t.requiresAttention}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">{t.liveFeed}</h2>
        <button onClick={() => onNavigate("threats")} className="text-xs font-bold text-lime-500 uppercase hover:text-lime-600">
          {t.viewAll}
        </button>
      </div>

      <div className="space-y-3">
        {threats.map((t) => (
          <div
            key={t.id}
            className="bg-white/50 backdrop-blur-xl rounded-[1.5rem] border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-200"
          >
            <div
              className="p-5 flex items-start gap-4 cursor-pointer active:bg-white/60"
              onClick={() =>
                setExpandedThreat(expandedThreat === t.id ? null : t.id)
              }
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full mt-1.5 shrink-0 shadow-sm ring-4",
                  t.status === "danger"
                    ? "bg-rose-500 ring-rose-100"
                    : "bg-lime-500 ring-lime-100",
                )}
              />
              <div className="flex-1">
                <div className="font-bold text-slate-800 text-[15px]">
                  {t.type}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  {t.product}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1.5 flex items-center gap-2">
                  <span>{t.loc}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span>{t.time}</span>
                </div>
              </div>
              <ChevronRight
                className={cn(
                  "w-5 h-5 text-slate-300 transition-transform duration-300",
                  expandedThreat === t.id && "rotate-90",
                )}
              />
            </div>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                expandedThreat === t.id
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 bg-white/40 backdrop-blur-md border-t border-white/60 text-[13px] text-slate-600 font-medium">
                  <p className="leading-relaxed">{t.detail}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreatsView({ onNavigate, t }: { onNavigate: (tab: string, item?: any) => void, t: any }) {
  const [threats, setThreats] = useState([
    {
      id: 1,
      typeKey: "replayAttackBlocked",
      productKey: "premiumSwissChronograph",
      loc: "Paris",
      timeKey: "twoMinsAgo",
      status: "danger",
      detailKey: "cmacSpent",
    },
    {
      id: 2,
      typeKey: "velocityAnomaly",
      productKey: "luxuryCognacXO",
      loc: "Tokyo",
      timeKey: "fifteenMinsAgo",
      status: "danger",
      detailKey: "haversineFailed",
    },
    {
      id: 5,
      typeKey: "bruteForceAttempt",
      productKey: "authEndpoint",
      loc: "Frankfurt",
      timeKey: "fortyFiveMinsAgo",
      status: "danger",
      detailKey: "multipleFailed",
    },
  ]);

  const handleDismiss = (id: number) => {
    setThreats(threats.filter((th) => th.id !== id));
  };

  const enrichedThreats = threats.map(th => ({
    ...th,
    type: t[th.typeKey] || th.typeKey,
    product: t[th.productKey] || th.productKey,
    time: t[th.timeKey] || th.timeKey,
    detail: t[th.detailKey] || th.detailKey,
  }));

  return (
    <div className="p-6 pb-10 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
        {t.threatIntelligence}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-full blur-xl translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
              {t.activeThreats}
            </div>
            <div className="text-3xl font-black text-slate-800">{threats.length}</div>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-lime-50 rounded-full blur-xl translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <div className="text-xs font-bold text-lime-400 uppercase tracking-wider mb-1">
              {t.resolvedToday}
            </div>
            <div className="text-3xl font-black text-slate-800">3,390</div>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
        {t.actionRequired}
      </h3>
      <div className="space-y-3">
        {enrichedThreats.length === 0 && (
          <div className="text-slate-500 text-sm italic">{t.noActiveThreats}</div>
        )}
        {enrichedThreats.map((th) => (
          <div
            key={th.id}
            className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            <div className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold text-slate-800">{th.type}</div>
                  <div className="text-xs font-bold text-slate-400">
                    {th.time}
                  </div>
                </div>
                <div className="text-sm text-slate-600 mb-2">{th.product}</div>
                <div className="text-xs text-slate-500 bg-white/40 backdrop-blur-md p-3 rounded-xl border border-white/60 shadow-sm">
                  {th.detail}
                </div>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => onNavigate("investigations", th)}
                    className="text-xs font-bold bg-white/60 backdrop-blur-md border border-white/60 text-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.05)] px-4 py-2 rounded-lg hover:bg-white/80 transition-all"
                  >
                    {t.investigate}
                  </button>
                  <button 
                    onClick={() => handleDismiss(th.id)}
                    className="text-xs font-bold bg-white/30 backdrop-blur-md border border-white/40 text-slate-600 px-4 py-2 rounded-lg hover:bg-white/50 transition-all"
                  >
                    {t.dismiss}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettingsView({ settings, setSettings, t }: any) {
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 pb-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.settings}</h2>

      <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center shrink-0">
          <Building className="w-8 h-8 text-lime-600" />
        </div>
        <div>
          <div className="font-bold text-slate-800 text-lg">CAVIDOĞLU</div>
          <div className="text-slate-500 text-sm">Enterprise Account</div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            Company
          </div>
          <div className="bg-white/50 backdrop-blur-xl rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/60 transition-colors border-b border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  Team Members
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
            <button 
              onClick={() => toggleSetting('twoFactorAuth')}
              className="w-full flex items-center justify-between p-4 hover:bg-white/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  {t.require2fa}
                </span>
              </div>
              <div className={cn("w-10 h-6 rounded-full transition-colors flex items-center px-1 border", settings.twoFactorAuth ? "bg-lime-500 border-lime-600" : "bg-slate-200 border-slate-300")}>
                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.twoFactorAuth ? "translate-x-4" : "translate-x-0")} />
              </div>
            </button>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            {t.system}
          </div>
          <div className="bg-white/50 backdrop-blur-xl rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden">
            <button 
              onClick={() => toggleSetting('autoBlockThreats')}
              className="w-full flex items-center justify-between p-4 hover:bg-white/60 transition-colors border-b border-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  {t.autoBlock}
                </span>
              </div>
              <div className={cn("w-10 h-6 rounded-full transition-colors flex items-center px-1 border", settings.autoBlockThreats ? "bg-lime-500 border-lime-600" : "bg-slate-200 border-slate-300")}>
                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.autoBlockThreats ? "translate-x-4" : "translate-x-0")} />
              </div>
            </button>
            <button 
              onClick={() => toggleSetting('emailAlerts')}
              className="w-full flex items-center justify-between p-4 hover:bg-white/60 transition-colors border-b border-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  {t.emailAlerts}
                </span>
              </div>
              <div className={cn("w-10 h-6 rounded-full transition-colors flex items-center px-1 border", settings.emailAlerts ? "bg-lime-500 border-lime-600" : "bg-slate-200 border-slate-300")}>
                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.emailAlerts ? "translate-x-4" : "translate-x-0")} />
              </div>
            </button>
            <div className="w-full flex items-center justify-between p-4 border-b border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Building className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">{t.language}</span>
              </div>
              <select 
                value={settings.language} 
                onChange={(e) => setSettings((prev: any) => ({ ...prev, language: e.target.value }))}
                className="bg-transparent text-slate-700 text-sm font-medium outline-none text-right cursor-pointer"
              >
                <option value="en">English</option>
                <option value="tr">Turkish</option>
              </select>
            </div>
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">{t.fontSize}</span>
              </div>
              <select 
                value={settings.fontSize} 
                onChange={(e) => setSettings((prev: any) => ({ ...prev, fontSize: e.target.value }))}
                className="bg-transparent text-slate-700 text-sm font-medium outline-none text-right cursor-pointer"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        <button className="w-full bg-white/50 backdrop-blur-xl rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 p-4 flex items-center justify-center gap-2 hover:bg-white/70 transition-all text-red-500 font-bold text-sm">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
