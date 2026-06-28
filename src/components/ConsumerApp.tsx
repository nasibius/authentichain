import { useState } from "react";
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
} from "lucide-react";
import { cn } from "../lib/utils";

export function ConsumerApp() {
  const [activeTab, setActiveTab] = useState("scan");

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex-1 overflow-y-auto w-full relative">
        {activeTab === "scan" && <ScanView />}
        {activeTab === "history" && <HistoryView />}
        {activeTab === "settings" && <SettingsView />}
      </div>

      {/* Bottom Nav */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-emerald-100 pb-safe sm:pb-6 pt-2 px-6 flex justify-between items-center relative z-40">
        <NavButton
          id="scan"
          icon={ScanLine}
          label="Scan"
          active={activeTab === "scan"}
          onClick={() => setActiveTab("scan")}
        />
        <NavButton
          id="history"
          icon={History}
          label="History"
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        />
        <NavButton
          id="settings"
          icon={Settings}
          label="Settings"
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
          active ? "bg-emerald-100" : "bg-transparent",
        )}
      >
        <Icon
          className={cn(
            "w-6 h-6 transition-colors duration-200",
            active ? "text-emerald-600" : "text-slate-400",
          )}
        />
      </div>
      <span
        className={cn(
          "text-[10px] font-bold transition-colors duration-200 tracking-wide",
          active ? "text-emerald-600" : "text-slate-400",
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

function ScanView() {
  const [scanState, setScanState] = useState<
    "idle" | "scanning" | "success" | "fake" | "suspicious"
  >("idle");
  const [scannedProduct, setScannedProduct] = useState(PRODUCTS[0]);
  const [scanTimes, setScanTimes] = useState(0);

  const handleScan = () => {
    setScanState("scanning");
    setTimeout(() => {
      const rand = Math.random();
      if (rand > 0.6) {
        setScannedProduct(
          PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
        );
        setScanState("success");
      } else if (rand > 0.3) {
        setScannedProduct(
          PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
        );
        setScanTimes(Math.floor(Math.random() * 5) + 1); // 1 to 5 times
        setScanState("suspicious");
      } else {
        setScanState("fake");
      }
    }, 2500);
  };

  if (scanState === "success") {
    return (
      <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-white to-[#f0fdf4] animate-in fade-in zoom-in-95 duration-300">
        <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
          <div className="w-20 h-20 bg-[#dcfce7] text-[#16a34a] rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-green-100 shrink-0 mt-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight">
            Authentic Product
          </h2>
          <p className="text-[#16a34a] font-medium text-center mb-6 text-sm">
            Verified successfully
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
                <span className="text-sm text-slate-500">Manufacturer</span>
                <span className="text-sm font-medium text-slate-800">
                  NovaTech Inc.
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Origin</span>
                <span className="text-sm font-medium text-slate-800">
                  Geneva, Switzerland
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Mfg Date</span>
                <span className="text-sm font-medium text-slate-800">
                  2026-05-14
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Warranty</span>
                <span className="text-sm font-medium text-slate-800">
                  Valid until 2028
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Distributor</span>
                <span className="text-sm font-medium text-slate-800">
                  Global Tech Supply
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Carbon Footprint</span>
                <span className="text-sm font-medium text-slate-800">
                  12 kg CO2e
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Verification</span>
                <span className="text-sm font-medium text-green-600">
                  Secure
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setScanState("idle")}
            className="w-full max-w-sm bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl shadow-lg active:scale-95 transition-transform mt-4 shrink-0 mb-4"
          >
            Done
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
            Warning: Counterfeit
          </h2>
          <p className="text-[#e11d48] text-center mb-8 text-sm font-medium">
            This tag is invalid or has been cloned. Do not consume.
          </p>

          <div className="w-full max-w-sm space-y-3 mt-4 shrink-0 mb-4">
            <button
              onClick={() => setScanState("idle")}
              className="w-full bg-[#e11d48] text-white font-bold text-lg py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              Report Issue
            </button>
            <button
              onClick={() => setScanState("idle")}
              className="w-full bg-white text-slate-600 font-bold text-lg py-4 rounded-2xl shadow-sm border border-slate-200 active:scale-95 transition-transform"
            >
              Dismiss
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
            Suspicious Activity
          </h2>
          <p className="text-[#d97706] text-center mb-8 text-sm font-medium">
            This tag is suspicious. It was scanned {scanTimes}{" "}
            {scanTimes === 1 ? "time" : "times"} already.
          </p>

          <div className="w-full max-w-sm space-y-3 mt-4 shrink-0 mb-4">
            <button
              onClick={() => setScanState("idle")}
              className="w-full bg-[#d97706] text-white font-bold text-lg py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              Report Issue
            </button>
            <button
              onClick={() => setScanState("idle")}
              className="w-full bg-white text-slate-600 font-bold text-lg py-4 rounded-2xl shadow-sm border border-slate-200 active:scale-95 transition-transform"
            >
              Dismiss
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
              className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30 scale-150"
              style={{ animationDuration: "2s" }}
            ></div>
            <div
              className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30 scale-125"
              style={{ animationDuration: "2s", animationDelay: "0.5s" }}
            ></div>
          </>
        )}
        <button
          onClick={handleScan}
          disabled={scanState === "scanning"}
          className={cn(
            "w-56 h-56 rounded-full flex flex-col items-center justify-center transition-all duration-700 relative z-10 overflow-hidden shadow-xl border border-slate-200/50 bg-white",
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
              {scanState === "scanning" ? "Scanning..." : "Tap to Verify"}
            </span>
          </div>
        </button>
      </div>

      <p className="text-slate-500 text-center px-4 font-medium text-[15px]">
        {scanState === "scanning"
          ? "Establishing secure connection..."
          : "Bring your phone close to the smart tag."}
      </p>
    </div>
  );
}

function HistoryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Verified", "Suspicious", "Fake"];

  const history = [
    {
      id: 1,
      name: "Luxury Cognac XO",
      time: "Today, 10:42",
      status: "success",
    },
    {
      id: 2,
      name: "Premium Swiss Chronograph",
      time: "Yesterday, 14:20",
      status: "success",
    },
    {
      id: 3,
      name: "Organic Reserve Olive Oil",
      time: "Oct 12, 09:15",
      status: "fake",
    },
    {
      id: 4,
      name: "Artisan Leather Handbag",
      time: "Oct 10, 16:30",
      status: "success",
    },
    {
      id: 5,
      name: "Vintage Bordeaux Wine",
      time: "Oct 08, 11:20",
      status: "suspicious",
    },
    {
      id: 6,
      name: "Designer Sunglasses",
      time: "Oct 05, 15:45",
      status: "fake",
    },
    {
      id: 7,
      name: "Organic Honey",
      time: "Oct 01, 08:30",
      status: "success",
    },
  ];

  const filteredHistory = history.filter((item) => {
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

  return (
    <div className="p-6 pb-0 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Recent Scans</h2>

      {/* Search Bar */}
      <div className="relative mb-4 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
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
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-500 border border-slate-200",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3 overflow-y-auto flex-1 pr-1 pb-0">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-[1.25rem] shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 transition-colors shrink-0"
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
                    ? "Suspicious Activity"
                    : "Counterfeit Warning"}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
          </div>
        ))}
        {filteredHistory.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            No scans found.
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="p-6 pb-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <User className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <div className="font-bold text-slate-800 text-lg">Huseyn Aliyev</div>
          <div className="text-slate-500 text-sm">huseyn.aliyev@gmail.com</div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            Preferences
          </div>
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 transition-colors border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  Push Notifications
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  Privacy & Security
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            Support
          </div>
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-medium text-slate-700 text-sm">
                  Help Center
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        <button className="w-full bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-4 flex items-center justify-center gap-2 active:bg-slate-50 transition-colors text-red-500 font-bold text-sm">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
