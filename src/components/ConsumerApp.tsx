import { useState, useEffect } from "react";
import {
  History,
  ScanLine,
  Settings,
  CheckCircle,
  ShieldAlert,
  ChevronRight,
  AlertTriangle,
  Search,
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { cn } from "../lib/utils";

const TRANSLATIONS: any = {
  en: {
    scan: "Scan",
    history: "History",
    settings: "Settings",
    nfcDisabled: "NFC is Disabled",
    nfcMessage: "Please turn on NFC in your device settings to scan smart tags.",
    turnOnNfc: "Turn On NFC",
    dismiss: "Dismiss",
    authentic: "Authentic Product",
    fake: "Counterfeit Detected",
    suspicious: "Suspicious Activity",
    authenticMsg: "Verified successfully",
    fakeMsg: "This product could not be verified.",
    suspiciousMsg: "This tag has been scanned multiple times.",
    reportIssue: "Report Issue",
    issueReported: "Issue Reported",
    done: "Done",
    all: "All",
    authenticTab: "Authentic",
    counterfeitTab: "Counterfeit",
    suspiciousTab: "Suspicious",
    preferences: "Preferences",
    pushNotifications: "Push Notifications",
    appSounds: "App Sounds",
    hapticFeedback: "Haptic Feedback",
    language: "Language",
    fontSize: "Font Size",
    support: "Support",
    helpCenter: "Help Center",
    privacySecurity: "Privacy & Security",
    signOut: "Sign Out",
    scanning: "Scanning...",
    holdNear: "Hold your phone near the smart tag",
    unknownProduct: "Unknown Product",
    today: "Today",
    yesterday: "Yesterday",
    teamMembers: "Team Members",
    manufacturer: "Manufacturer",
    product: "Product",
    productionDate: "Production Date",
    location: "Location",
    batch: "Batch",
    nfcUid: "NFC UID",
    origin: "Origin",
    mfgDate: "Mfg Date",
    warranty: "Warranty",
    distributor: "Distributor",
    carbonFootprint: "Carbon Footprint",
    verification: "Verification",
    secure: "Secure",
    tapToVerify: "Tap to Verify",
    establishing: "Establishing secure connection...",
    bringPhone: "Bring your phone close to the smart tag."
  },
  tr: {
    scan: "Tara",
    history: "Geçmiş",
    settings: "Ayarlar",
    nfcDisabled: "NFC Kapalı",
    nfcMessage: "Akıllı etiketleri taramak için lütfen cihaz ayarlarınızdan NFC'yi açın.",
    turnOnNfc: "NFC'yi Aç",
    dismiss: "Kapat",
    authentic: "Orijinal Ürün",
    fake: "Sahte Ürün Tespit Edildi",
    suspicious: "Şüpheli Aktivite",
    authenticMsg: "Başarıyla doğrulandı",
    fakeMsg: "Bu ürün doğrulanamadı.",
    suspiciousMsg: "Bu etiket birden fazla kez tarandı.",
    reportIssue: "Sorun Bildir",
    issueReported: "Sorun Bildirildi",
    done: "Bitti",
    all: "Tümü",
    authenticTab: "Orijinal",
    counterfeitTab: "Sahte",
    suspiciousTab: "Şüpheli",
    preferences: "Tercihler",
    pushNotifications: "Anlık Bildirimler",
    appSounds: "Uygulama Sesleri",
    hapticFeedback: "Titreşim",
    language: "Dil",
    fontSize: "Yazı Tipi Boyutu",
    support: "Destek",
    helpCenter: "Yardım Merkezi",
    privacySecurity: "Gizlilik ve Güvenlik",
    signOut: "Çıkış Yap",
    scanning: "Taranıyor...",
    holdNear: "Telefonunuzu akıllı etikete yaklaştırın",
    unknownProduct: "Bilinmeyen Ürün",
    today: "Bugün",
    yesterday: "Dün",
    teamMembers: "Ekip Üyeleri",
    manufacturer: "Üretici",
    product: "Ürün",
    productionDate: "Üretim Tarihi",
    location: "Konum",
    batch: "Parti No",
    nfcUid: "NFC UID",
    origin: "Menşei",
    mfgDate: "Üretim Tarihi",
    warranty: "Garanti",
    distributor: "Distribütör",
    carbonFootprint: "Karbon Ayak İzi",
    verification: "Doğrulama",
    secure: "Güvenli",
    tapToVerify: "Doğrulamak için Dokunun",
    establishing: "Güvenli bağlantı kuruluyor...",
    bringPhone: "Telefonunuzu akıllı etikete yaklaştırın."
  }
};

export function ConsumerApp() {
  const [activeTab, setActiveTab] = useState("scan");
  
  // Settings state
  const [settings, setSettings] = useState({
    pushNotifications: true,
    soundEnabled: true,
    hapticsEnabled: true,
    language: "en",
    fontSize: "medium"
  });

  useEffect(() => {
    const sizeMap: any = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.fontSize = sizeMap[settings.fontSize] || "16px";
  }, [settings.fontSize]);

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  // History state
  const [history, setHistory] = useState([
    {
      id: 1,
      name: "Luxury Cognac XO",
      time: "Today, 10:42",
      status: "success",
      product: PRODUCTS[2],
    },
    {
      id: 2,
      name: "Premium Swiss Chronograph",
      time: "Yesterday, 14:20",
      status: "success",
      product: PRODUCTS[0],
    }
  ]);
  
  const [nfcEnabled, setNfcEnabled] = useState(false);
  
  const [viewedHistoryItem, setViewedHistoryItem] = useState<any>(null);

  const addScanToHistory = (status: string, product: typeof PRODUCTS[0]) => {
    const newItem = {
      id: Date.now(),
      name: product?.name || t.unknownProduct,
      time: `${t.today}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status,
      product
    };
    setHistory([newItem, ...history]);
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex-1 overflow-y-auto w-full relative">
        {activeTab === "scan" && (
          <ScanView 
            nfcEnabled={nfcEnabled} 
            setNfcEnabled={setNfcEnabled} 
            addScanToHistory={addScanToHistory}
            viewedItem={viewedHistoryItem}
            setViewedItem={setViewedHistoryItem}
            t={t}
          />
        )}
        {activeTab === "history" && (
          <HistoryView 
            history={history} 
            onViewItem={(item) => {
              setViewedHistoryItem({
                status: item.status,
                product: item.product,
                scanTimes: item.status === "suspicious" ? 3 : 1
              });
              setActiveTab("scan");
            }}
            t={t}
          />
        )}
        {activeTab === "settings" && <SettingsView settings={settings} setSettings={setSettings} t={t} />}
      </div>

      {/* Bottom Nav */}
      <div className="bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%] border-t border-white/50 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-safe sm:pb-6 pt-2 px-6 flex justify-between items-center relative z-40">
        <NavButton
          id="scan"
          icon={ScanLine}
          label={t.scan}
          active={activeTab === "scan"}
          onClick={() => setActiveTab("scan")}
        />
        <NavButton
          id="history"
          icon={History}
          label={t.history}
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        />
        <NavButton
          id="settings"
          icon={Settings}
          label={t.settings}
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-2 min-w-[72px]"
    >
      <div
        className={cn(
          "p-1.5 rounded-xl transition-all duration-300",
          active ? "bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/50" : "bg-transparent",
        )}
      >
        <Icon
          className={cn(
            "w-6 h-6 transition-colors duration-200",
            active ? "text-slate-800" : "text-slate-400",
          )}
        />
      </div>
      <span
        className={cn(
          "text-[10px] font-bold transition-colors duration-200 tracking-wide",
          active ? "text-slate-800" : "text-slate-400",
        )}
      >
        {label}
      </span>
    </button>
  );
}

const PRODUCTS = [
  {
    id: "B-8821-X",
    name: "Premium Swiss Chronograph",
    description:
      "Hand-assembled in Geneva, Switzerland. Features an automatic movement, scratch-resistant sapphire crystal, and marine-grade stainless steel case. NTAG 424 DNA cryptographic tracking is active for absolute provenance.",
  },
  {
    id: "A-9932-Y",
    name: "Organic Reserve Olive Oil",
    description:
      "Cold-pressed from centenary olive trees in Tuscany, Italy. 500ml volume. Harvested in October 2025 with acidity < 0.2%. NTAG 424 DNA cryptographic tracking is active to guarantee farm-to-table authenticity.",
  },
  {
    id: "C-1104-Z",
    name: "Luxury Cognac XO",
    description:
      "Aged for a minimum of 10 years in French oak barrels. Origin: Cognac region, France. 750ml volume. Notes of dried fruit, oak, and spices. NTAG 424 DNA cryptographic tracking is active, ensuring uncompromised quality and origin.",
  },
  {
    id: "D-4455-W",
    name: "Artisan Leather Handbag",
    description:
      "Handcrafted in Milan, Italy using full-grain calfskin leather and custom palladium-finish hardware. Includes a suede interior lining. NTAG 424 DNA cryptographic tracking is active, permanently securing the chain of custody.",
  },
];

function ScanView({ nfcEnabled, setNfcEnabled, addScanToHistory, viewedItem, setViewedItem, t }: any) {
  const [scanState, setScanState] = useState<
    "idle" | "scanning" | "success" | "fake" | "suspicious" | "nfc_error"
  >("idle");
  const [scannedProduct, setScannedProduct] = useState(PRODUCTS[0]);
  const [scanTimes, setScanTimes] = useState(0);

  const [reported, setReported] = useState(false);

  // If we clicked an item from history, show it immediately
  if (viewedItem && scanState === "idle") {
    setScanState(viewedItem.status);
    setScannedProduct(viewedItem.product || PRODUCTS[0]);
    setScanTimes(viewedItem.scanTimes || 1);
  }

  const handleDone = () => {
    setScanState("idle");
    setReported(false);
    if (viewedItem) setViewedItem(null);
  };

  const handleReport = () => {
    setReported(true);
    setTimeout(() => {
      handleDone();
    }, 2000);
  };

  const handleScan = () => {
    if (!nfcEnabled) {
      setScanState("nfc_error");
      return;
    }

    setScanState("scanning");
    setTimeout(() => {
      const rand = Math.random();
      let newStatus: any = "fake";
      let product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      
      if (rand > 0.6) {
        newStatus = "success";
      } else if (rand > 0.3) {
        newStatus = "suspicious";
        setScanTimes(Math.floor(Math.random() * 5) + 1); // 1 to 5 times
      } else {
        newStatus = "fake";
      }
      
      setScannedProduct(product);
      setScanState(newStatus);
      addScanToHistory(newStatus, product);
    }, 2500);
  };

  if (scanState === "nfc_error") {
    return (
      <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-white to-slate-50 animate-in fade-in zoom-in-95 duration-300">
        <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
          <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-slate-200 shrink-0 mt-4">
            <ScanLine className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight text-center">
            {t.nfcDisabled}
          </h2>
          <p className="text-slate-500 text-center mb-8 text-sm font-medium px-4">
            {t.nfcMessage}
          </p>
          <div className="w-full max-w-sm space-y-3 mt-4 shrink-0 mb-4">
            <button
              onClick={() => {
                setNfcEnabled(true);
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
                if (isIOS) {
                  window.location.href = "App-Prefs:root=General";
                } else {
                  window.location.href = "intent://#Intent;action=android.settings.NFC_SETTINGS;end";
                }
                setTimeout(() => setScanState("idle"), 1000);
              }}
              className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              {t.turnOnNfc}
            </button>
            <button
              onClick={() => setScanState("idle")}
              className="w-full bg-white/60 backdrop-blur-xl border border-white/60 text-slate-800 font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] active:scale-95 transition-all"
            >
              {t.dismiss}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (scanState === "success") {
    return (
      <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-white to-[#f0fdf4] animate-in fade-in zoom-in-95 duration-300">
        <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
          <div className="w-20 h-20 bg-[#dcfce7] text-[#16a34a] rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-green-100 shrink-0 mt-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight">
            {t.authentic}
          </h2>
          <p className="text-[#16a34a] font-medium text-center mb-6 text-sm">
            {t.authenticMsg}
          </p>

          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6 flex flex-col items-center">
            <div className="font-bold text-slate-800 text-lg text-center mb-1">
              {scannedProduct.name}
            </div>
            <div className="text-slate-500 text-sm text-center mb-5">
              {scannedProduct.id}
            </div>
            <div className="w-full space-y-3 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t.manufacturer}</span>
                <span className="text-sm font-medium text-slate-800">
                  CAVIDOĞLU
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t.origin}</span>
                <span className="text-sm font-medium text-slate-800">
                  Geneva, Switzerland
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t.mfgDate}</span>
                <span className="text-sm font-medium text-slate-800">
                  2026-05-14
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t.warranty}</span>
                <span className="text-sm font-medium text-slate-800">
                  Valid until 2028
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t.distributor}</span>
                <span className="text-sm font-medium text-slate-800">
                  Global Tech Supply
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t.carbonFootprint}</span>
                <span className="text-sm font-medium text-slate-800">
                  12 kg CO2e
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t.verification}</span>
                <span className="text-sm font-medium text-green-600">
                  {t.secure}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDone}
            className="w-full max-w-sm bg-white/60 backdrop-blur-xl border border-white/60 text-slate-800 font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] active:scale-95 transition-all mt-4 shrink-0 mb-4"
          >
            {t.done}
          </button>
        </div>
      </div>
    );
  }

  if (scanState === "fake") {
    return (
      <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-white to-[#fff1f2] animate-in fade-in zoom-in-95 duration-300">
        <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
          <div className="w-20 h-20 bg-[#ffe4e6] text-[#e11d48] rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-red-100 mt-4 shrink-0">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight text-center">
            {t.fake}
          </h2>
          <p className="text-[#e11d48] text-center mb-8 text-sm font-medium">
            {t.fakeMsg}
          </p>

          <div className="w-full max-w-sm space-y-3 mt-4 shrink-0 mb-4">
            <button
              onClick={handleReport}
              disabled={reported}
              className="w-full flex items-center justify-center gap-2 bg-[#e11d48]/80 backdrop-blur-xl border border-white/40 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(225,29,72,0.2)] active:scale-95 transition-all disabled:opacity-50"
            >
              {reported ? <CheckCircle className="w-5 h-5" /> : null}
              {reported ? t.issueReported : t.reportIssue}
            </button>
            <button
              onClick={handleDone}
              className="w-full bg-white/60 backdrop-blur-xl border border-white/60 text-slate-800 font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] active:scale-95 transition-all"
            >
              {t.dismiss}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (scanState === "suspicious") {
    return (
      <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-white to-[#fffbeb] animate-in fade-in zoom-in-95 duration-300">
        <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
          <div className="w-20 h-20 bg-[#fef3c7] text-[#d97706] rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-yellow-100 mt-4 shrink-0">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight text-center">
            {t.suspicious}
          </h2>
          <p className="text-[#d97706] text-center mb-8 text-sm font-medium">
            {t.suspiciousMsg}
          </p>

          <div className="w-full max-w-sm space-y-3 mt-4 shrink-0 mb-4">
            <button
              onClick={handleReport}
              disabled={reported}
              className="w-full flex items-center justify-center gap-2 bg-[#d97706]/80 backdrop-blur-xl border border-white/40 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(217,119,6,0.2)] active:scale-95 transition-all disabled:opacity-50"
            >
              {reported ? <CheckCircle className="w-5 h-5" /> : null}
              {reported ? t.issueReported : t.reportIssue}
            </button>
            <button
              onClick={handleDone}
              className="w-full bg-white/60 backdrop-blur-xl border border-white/60 text-slate-800 font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] active:scale-95 transition-all"
            >
              {t.dismiss}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <div className="relative mb-16 mt-[-40px] perspective-[1000px]">
        {scanState === "scanning" && (
          <>
            <div
              className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-30 scale-150"
              style={{ animationDuration: "2s" }}
            ></div>
            <div
              className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-30 scale-125"
              style={{ animationDuration: "2s", animationDelay: "0.5s" }}
            ></div>
          </>
        )}
        <button
          onClick={handleScan}
          disabled={scanState === "scanning"}
          className={cn(
            "w-56 h-56 rounded-full flex flex-col items-center justify-center transition-all duration-700 relative z-10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] bg-white/60 backdrop-blur-2xl border border-white/80",
            scanState === "scanning"
              ? "animate-heartbeat"
              : "active:scale-95 hover:shadow-2xl hover:border-slate-300",
          )}
        >
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ perspective: "1000px" }}
          >
            <div
              className={cn(
                "relative w-full h-full transform-3d transition-transform duration-1000 ease-out",
                scanState === "scanning"
                  ? "sphere-spin-3d"
                  : "sphere-idle-spin",
              )}
            >
              {/* Longitudinal rings */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`long-${i}`}
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
                const r = Math.cos(angle) * 112; // radius in px
                const y = Math.sin(angle) * 112; // y in px
                if (Math.abs(index) === 6) return null;
                return (
                  <div
                    key={`lat-${i}`}
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
          <div className="absolute inset-0 rounded-full shadow-[inset_-20px_-20px_50px_rgba(255,255,255,0.8),inset_20px_20px_50px_rgba(0,0,0,0.05)] pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-0 rounded-full bg-white/20" />
          <div className="flex flex-col items-center z-10 text-slate-800">
            <ScanLine
              className={cn(
                "w-12 h-12 mb-2 text-[#10b981]",
                scanState === "scanning" && "animate-pulse opacity-80",
              )}
            />
            <span className="font-bold text-lg tracking-wide drop-shadow-sm">
              {scanState === "scanning" ? t.scanning : (t.tapToVerify || "Tap to Verify")}
            </span>
          </div>
        </button>
      </div>

      <p className="text-slate-500 text-center px-4 font-medium text-[15px]">
        {scanState === "scanning"
          ? (t.establishing || "Establishing secure connection...")
          : (t.bringPhone || "Bring your phone close to the smart tag.")}
      </p>
    </div>
  );
}

function HistoryView({ history, onViewItem, t }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Verified", "Suspicious", "Fake"];

  const filteredHistory = history.filter((item: any) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "Verified" && item.status === "success") ||
      (activeCategory === "Suspicious" && item.status === "suspicious") ||
      (activeCategory === "Fake" && item.status === "fake");
    return matchesSearch && matchesCategory;
  });

  const categoryLabel = (cat: string) => {
    if (cat === "All") return t.all || "All";
    if (cat === "Verified") return t.authenticTab || "Authentic";
    if (cat === "Suspicious") return t.suspiciousTab || "Suspicious";
    if (cat === "Fake") return t.counterfeitTab || "Counterfeit";
    return cat;
  };

  return (
    <div className="p-6 pb-0 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{t.history}</h2>

      {/* Search Bar */}
      <div className="relative mb-4 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder={t.searchHistory || "Search history..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all shadow-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors",
              activeCategory === cat
                ? "bg-slate-800 text-white shadow-md"
                : "bg-white/60 backdrop-blur-md text-slate-600 border border-white/60 shadow-sm",
            )}
          >
            {categoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3 overflow-y-auto flex-1 pr-1 pb-0">
        {filteredHistory.map((item: any) => (
          <div
            key={item.id}
            onClick={() => onViewItem(item)}
            className="cursor-pointer bg-white/50 backdrop-blur-xl p-4 rounded-[1.25rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 flex items-center gap-4 active:bg-white/70 transition-colors shrink-0"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0",
                item.status === "success"
                  ? "bg-[#f0fdf4] text-[#16a34a]"
                  : item.status === "suspicious"
                    ? "bg-[#fffbeb] text-[#d97706]"
                    : "bg-[#ffe4e6] text-[#e11d48]",
              )}
            >
              {item.status === "success" ? (
                <CheckCircle className="w-6 h-6" />
              ) : item.status === "suspicious" ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <ShieldAlert className="w-6 h-6" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-800 text-base mb-0.5 truncate">
                {item.name}
              </div>
              <div
                className={cn(
                  "text-xs font-medium truncate",
                  item.status === "success"
                    ? "text-slate-400"
                    : item.status === "suspicious"
                      ? "text-[#d97706]"
                      : "text-[#e11d48]",
                )}
              >
                {item.status === "success"
                  ? item.time
                  : item.status === "suspicious"
                    ? t.suspicious
                    : t.fake}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
          </div>
        ))}
        {filteredHistory.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            {t.noScans || "No scans found."}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsView({ settings, setSettings, t }: any) {
  const [showHelp, setShowHelp] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  if (showHelp) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setShowHelp(false)} className="p-2 bg-white/60 rounded-full shadow-sm hover:bg-white/80 active:scale-95 transition-all">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t.helpCenter}</h2>
        </div>
        
        <div className="bg-white/60 backdrop-blur-xl rounded-[1.5rem] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 mb-6">
          <p className="text-slate-600 text-sm">
            Please contact support if you have any issues with the application.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.settings}</h2>

      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center shrink-0">
          <User className="w-8 h-8 text-lime-600" />
        </div>
        <div>
          <div className="font-bold text-slate-800 text-lg">Huseyn Aliyev</div>
          <div className="text-slate-500 text-sm">huseyn.aliyev@gmail.com</div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            {t.preferences}
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden">
            <button 
              onClick={() => toggleSetting('pushNotifications')}
              className="w-full flex items-center justify-between p-4 active:bg-white/40 transition-colors border-b border-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  {t.pushNotifications}
                </span>
              </div>
              <div className={cn("w-10 h-6 rounded-full transition-colors flex items-center px-1 border", settings.pushNotifications ? "bg-lime-500 border-lime-600" : "bg-slate-200 border-slate-300")}>
                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.pushNotifications ? "translate-x-4" : "translate-x-0")} />
              </div>
            </button>
            <button 
              onClick={() => toggleSetting('soundEnabled')}
              className="w-full flex items-center justify-between p-4 active:bg-white/40 transition-colors border-b border-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  {t.appSounds}
                </span>
              </div>
              <div className={cn("w-10 h-6 rounded-full transition-colors flex items-center px-1 border", settings.soundEnabled ? "bg-lime-500 border-lime-600" : "bg-slate-200 border-slate-300")}>
                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.soundEnabled ? "translate-x-4" : "translate-x-0")} />
              </div>
            </button>
            <button 
              onClick={() => toggleSetting('hapticsEnabled')}
              className="w-full flex items-center justify-between p-4 active:bg-white/40 transition-colors border-b border-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  {t.hapticFeedback}
                </span>
              </div>
              <div className={cn("w-10 h-6 rounded-full transition-colors flex items-center px-1 border", settings.hapticsEnabled ? "bg-lime-500 border-lime-600" : "bg-slate-200 border-slate-300")}>
                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.hapticsEnabled ? "translate-x-4" : "translate-x-0")} />
              </div>
            </button>
            <div className="w-full flex items-center justify-between p-4 border-b border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-lime-600" />
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
                  <Search className="w-4 h-4 text-lime-600" />
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

        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            {t.support}
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden">
            <button onClick={() => setShowHelp(true)} className="w-full flex items-center justify-between p-4 active:bg-white/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  {t.helpCenter}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        <button className="w-full bg-white/60 backdrop-blur-xl rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 p-4 flex items-center justify-center gap-2 active:bg-white/40 transition-colors text-red-500 font-bold text-sm">
          <LogOut className="w-4 h-4" />
          {t.signOut}
        </button>
      </div>
    </div>
  );
}
