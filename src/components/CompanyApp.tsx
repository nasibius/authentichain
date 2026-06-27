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
} from "lucide-react";
import { cn } from "../lib/utils";

export function CompanyApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dppModalOpen, setDppModalOpen] = useState(false);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex-1 overflow-y-auto w-full bg-[#F0F9FF]">
        {activeTab === "dashboard" && (
          <AdminDashboard onOpenDpp={() => setDppModalOpen(true)} />
        )}
        {activeTab === "threats" && (
          <div className="p-6 text-slate-500 text-center mt-10">
            Threat Intelligence Feed
          </div>
        )}
        {activeTab === "settings" && (
          <div className="p-6 text-slate-500 text-center mt-10">
            Settings placeholder
          </div>
        )}
      </div>

      {/* Floating Action Button for DPP */}
      {activeTab === "dashboard" && (
        <button
          onClick={() => setDppModalOpen(true)}
          className="absolute bottom-24 right-6 bg-slate-900 text-white rounded-full p-4 shadow-xl active:scale-95 transition-transform flex items-center justify-center z-30"
        >
          <FileText className="w-6 h-6" />
        </button>
      )}

      {/* Bottom Nav */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-safe sm:pb-6 pt-2 px-6 flex justify-between items-center relative z-40">
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
      </div>

      {/* DPP Modal (Bottom Sheet) */}
      {dppModalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setDppModalOpen(false)}
          ></div>
          <div className="bg-white rounded-t-[2rem] max-h-[85%] flex flex-col shadow-2xl relative animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-2 shrink-0"></div>
            <div className="px-6 py-2 pb-4 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-xl text-slate-800">
                EU Product Passport
              </h3>
              <button
                onClick={() => setDppModalOpen(false)}
                className="p-2 bg-slate-100 rounded-full active:bg-slate-200"
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
            <div className="p-6 bg-white border-t border-slate-100 pb-safe sm:pb-8 shrink-0">
              <button className="w-full bg-[#0EA5E9] text-white font-bold text-lg py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
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
      className="flex flex-col items-center gap-1.5 p-2 min-w-[72px]"
    >
      <div
        className={cn(
          "p-1.5 rounded-xl transition-all duration-300",
          active ? "bg-slate-100" : "bg-transparent",
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
    <div className="p-6 pb-24">
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

      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar -mx-6 px-6">
        <div className="snap-center shrink-0 w-[85%] bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-sky-50 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <div className="relative z-10">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              Total Scans
            </div>
            <div className="text-4xl font-black text-slate-800 tracking-tight">
              145,200
            </div>
            <div className="mt-4 text-xs font-bold text-sky-600 bg-sky-50 inline-block px-3 py-1.5 rounded-full">
              +12.3% vs yesterday
            </div>
          </div>
        </div>
        <div className="snap-center shrink-0 w-[85%] bg-[#e11d48] text-white p-6 rounded-[2rem] shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-rose-400/30 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <div className="relative z-10">
            <div className="text-sm font-bold text-rose-200 uppercase tracking-wider mb-2">
              Threats Blocked
            </div>
            <div className="text-4xl font-black tracking-tight">3,402</div>
            <div className="mt-4 text-xs font-bold text-rose-100 bg-rose-900/30 inline-block px-3 py-1.5 rounded-full flex items-center gap-1.5 w-max">
              <AlertCircle className="w-3.5 h-3.5" />
              Requires attention
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">Live Feed</h2>
        <span className="text-xs font-bold text-sky-500 uppercase">
          View All
        </span>
      </div>

      <div className="space-y-3">
        {threats.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-200"
          >
            <div
              className="p-5 flex items-start gap-4 cursor-pointer active:bg-slate-50"
              onClick={() =>
                setExpandedThreat(expandedThreat === t.id ? null : t.id)
              }
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full mt-1.5 shrink-0 shadow-sm ring-4",
                  t.status === "danger"
                    ? "bg-[#e11d48] ring-rose-100"
                    : "bg-[#0EA5E9] ring-sky-100",
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
                <div className="px-5 pb-5 pt-1 bg-slate-50 border-t border-slate-100 text-[13px] text-slate-600 font-medium">
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
