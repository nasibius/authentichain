import { useState } from "react";
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

export function CompanyApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dppModalOpen, setDppModalOpen] = useState(false);

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
      <div className="w-64 bg-white/40 backdrop-blur-2xl border-r border-white/60 p-6 flex flex-col gap-2 relative z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        <NavButton
          id="dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <NavButton
          id="threats"
          icon={ShieldAlert}
          label="Threats"
          active={activeTab === "threats"}
          onClick={() => setActiveTab("threats")}
        />
        <NavButton
          id="settings"
          icon={Settings}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />

        {/* Floating Action Button for DPP - moved to sidebar */}
        <div className="mt-auto">
          <button
            onClick={() => setDppModalOpen(true)}
            className="w-full bg-white/60 backdrop-blur-xl border border-white/60 text-slate-800 hover:bg-white/80 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.05)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 z-30"
          >
            <FileText className="w-5 h-5" />
            <span className="font-bold text-sm">EU Product Passport</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full relative bg-transparent z-10">

        <div className="relative z-10 h-full">
          {activeTab === "dashboard" && (
            <AdminDashboard onOpenDpp={() => setDppModalOpen(true)} />
          )}
          {activeTab === "threats" && <ThreatsView />}
          {activeTab === "settings" && <AdminSettingsView />}
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
                EU Product Passport
              </h3>
              <button
                onClick={() => setDppModalOpen(false)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 font-mono text-xs text-slate-600 shadow-sm overflow-hidden">
                <pre className="whitespace-pre-wrap break-all leading-relaxed">
                  {`{
  "passport_id": "urn:epc:12345",
  "issuer": "AuthentiChain",
  "compliance": "EU-DPP-2027",
  "status": "VERIFIED_COMPLIANT",
  "product_data": {
    "manufacturer": "Acme Goods",
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
              <button className="w-full bg-white/60 backdrop-blur-xl border border-white/60 text-slate-800 font-bold text-lg py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/80">
                <Download className="w-5 h-5" />
                Export Data
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
          ? "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] text-slate-800"
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

function AdminDashboard({ onOpenDpp }: { onOpenDpp: () => void }) {
  const [expandedThreat, setExpandedThreat] = useState<number | null>(null);

  const threats = [
    {
      id: 1,
      type: "Replay Attack Blocked",
      product: "Premium Swiss Chronograph",
      loc: "Paris",
      time: "2 mins ago",
      status: "danger",
      detail:
        "CMAC spent. Cryptographic counter did not increment. Attempted cloning detected.",
    },
    {
      id: 2,
      type: "Velocity Anomaly",
      product: "Luxury Cognac XO",
      loc: "Tokyo",
      time: "15 mins ago",
      status: "danger",
      detail:
        "Haversine check failed. Impossible travel speed detected between New York and Tokyo.",
    },
    {
      id: 3,
      type: "Verified",
      product: "Organic Reserve Olive Oil",
      loc: "Rome",
      time: "1 hr ago",
      status: "safe",
      detail: "Valid scan. Cryptographic signature verified by Cloud HSM.",
    },
    {
      id: 4,
      type: "Verified",
      product: "Artisan Leather Handbag",
      loc: "New York",
      time: "3 hrs ago",
      status: "safe",
      detail: "Valid scan. Cryptographic signature verified by Cloud HSM.",
    },
  ];

  return (
    <div className="p-6 pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Overview
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Today's metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
        <div className="bg-white/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden h-full">
          <div className="absolute right-0 top-0 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              Total Scans
            </div>
            <div>
              <div className="text-4xl font-black text-slate-800 tracking-tight">
                145,200
              </div>
              <div className="mt-4 text-xs font-bold text-lime-600 bg-white/80 backdrop-blur-md inline-block px-3 py-1.5 rounded-full shadow-sm border border-white/60">
                +12.3% vs yesterday
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-xl text-slate-800 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden h-full border border-white/60">
          <div className="absolute right-0 top-0 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              Threats Blocked
            </div>
            <div>
              <div className="text-4xl font-black tracking-tight text-slate-800">3,402</div>
              <div className="mt-4 text-xs font-bold text-slate-600 bg-white/80 backdrop-blur-md inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm border border-white/60 w-max">
                <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                Requires attention
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">Live Feed</h2>
        <span className="text-xs font-bold text-lime-500 uppercase">
          View All
        </span>
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

function ThreatsView() {
  const threats = [
    {
      id: 1,
      type: "Replay Attack Blocked",
      product: "Premium Swiss Chronograph",
      loc: "Paris",
      time: "2 mins ago",
      status: "danger",
      detail:
        "CMAC spent. Cryptographic counter did not increment. Attempted cloning detected.",
    },
    {
      id: 2,
      type: "Velocity Anomaly",
      product: "Luxury Cognac XO",
      loc: "Tokyo",
      time: "15 mins ago",
      status: "danger",
      detail:
        "Haversine check failed. Impossible travel speed detected between New York and Tokyo.",
    },
    {
      id: 5,
      type: "Brute Force Attempt",
      product: "Authentication Endpoint",
      loc: "Frankfurt",
      time: "45 mins ago",
      status: "danger",
      detail:
        "Multiple failed tag validation attempts from single IP. Rate limiting applied.",
    },
  ];

  return (
    <div className="p-6 pb-10 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
        Threat Intelligence
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-rose-50 rounded-full blur-xl translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
              Active Threats
            </div>
            <div className="text-3xl font-black text-slate-800">12</div>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-lime-50 rounded-full blur-xl translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <div className="text-xs font-bold text-lime-400 uppercase tracking-wider mb-1">
              Resolved Today
            </div>
            <div className="text-3xl font-black text-slate-800">3,390</div>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
        Action Required
      </h3>
      <div className="space-y-3">
        {threats.map((t) => (
          <div
            key={t.id}
            className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            <div className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold text-slate-800">{t.type}</div>
                  <div className="text-xs font-bold text-slate-400">
                    {t.time}
                  </div>
                </div>
                <div className="text-sm text-slate-600 mb-2">{t.product}</div>
                <div className="text-xs text-slate-500 bg-white/40 backdrop-blur-md p-3 rounded-xl border border-white/60 shadow-sm">
                  {t.detail}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs font-bold bg-white/60 backdrop-blur-md border border-white/60 text-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.05)] px-4 py-2 rounded-lg hover:bg-white/80 transition-all">
                    Investigate
                  </button>
                  <button className="text-xs font-bold bg-white/30 backdrop-blur-md border border-white/40 text-slate-600 px-4 py-2 rounded-lg hover:bg-white/50 transition-all">
                    Dismiss
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

function AdminSettingsView() {
  return (
    <div className="p-6 pb-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>

      <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center shrink-0">
          <Building className="w-8 h-8 text-lime-600" />
        </div>
        <div>
          <div className="font-bold text-slate-800 text-lg">Acme Corp Ltd.</div>
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
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  Security Policies
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            System
          </div>
          <div className="bg-white/50 backdrop-blur-xl rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-lime-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  Alert Configurations
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
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
