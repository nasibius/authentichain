import {
  Activity,
  Smartphone,
  Calculator,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Activity },
  { id: "simulator", label: "Mobile Simulator", icon: Smartphone },
  { id: "calculator", label: "ROI Calculator", icon: Calculator },
  { id: "techstack", label: "Tech Blueprint", icon: Layers },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-lime-500" />
        </div>
        <span className="font-bold text-lg tracking-tight text-forest-900">
          AuthentiChain
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-forest-50 text-forest-900"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-forest-900" : "text-slate-400",
                )}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            System Status
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-700">
              All Systems Nominal
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
