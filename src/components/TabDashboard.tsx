import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Sparkles,
  X,
  ShieldAlert,
  ShieldCheck,
  MapPin,
  Activity,
  Database,
  Clock,
} from "lucide-react";
import { cn } from "../lib/utils";

const chartData = [
  { day: "Mon", scans: 12000, blocks: 300 },
  { day: "Tue", scans: 15000, blocks: 450 },
  { day: "Wed", scans: 14000, blocks: 380 },
  { day: "Thu", scans: 18000, blocks: 600 },
  { day: "Fri", scans: 22000, blocks: 800 },
  { day: "Sat", scans: 31000, blocks: 1100 },
  { day: "Sun", scans: 33200, blocks: 1250 },
];

const threatData = [
  {
    id: "#04A2B",
    loc: "Istanbul, TR",
    threat: "Replay Attempt",
    protocol: "SUN Protocol (CMAC Spent)",
    time: "2s ago",
    status: "danger",
  },
  {
    id: "#09F1C",
    loc: "Baku, AZ",
    threat: "Velocity Anomaly",
    protocol: "Haversine Geo-Check Failed",
    time: "1m ago",
    status: "danger",
  },
  {
    id: "#11A8B",
    loc: "Berlin, DE",
    threat: "Validated",
    protocol: "AES-128 Key Diversified",
    time: "3m ago",
    status: "safe",
  },
];

export function TabDashboard() {
  const [isDppOpen, setIsDppOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<
    (typeof threatData)[0] | null
  >(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-forest-900">
            Operations Control
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-500">
              Cloud HSM Online & Syncing
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsDppOpen(true)}
          className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-lime-400" />
          Generate EU DPP Passport (2027)
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Total Authentications
          </div>
          <div className="text-3xl font-bold text-forest-900">145,200</div>
          <div className="text-xs font-medium text-lime-600 mt-2 bg-lime-50 inline-block px-2 py-0.5 rounded-full">
            +12.3% this week
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Counterfeits Blocked
          </div>
          <div className="text-3xl font-bold text-red-600">3,402</div>
          <div className="text-xs font-medium text-red-500 mt-2">
            3.3% global anomaly rate
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-end mb-2">
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Active Crypto Chips
            </div>
            <div className="text-xs font-mono text-slate-400">40k / 40k</div>
          </div>
          <div className="text-3xl font-bold text-forest-900 mb-3">100%</div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-lime-500 w-full rounded-full" />
          </div>
        </div>
        <div className="bg-forest-900 p-6 rounded-2xl border border-forest-800 shadow-sm hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-lime-500/10 rounded-full blur-2xl" />
          <div className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-2 relative z-10">
            Projected ARR Saved
          </div>
          <div className="text-3xl font-bold text-white font-mono relative z-10">
            $124,500 <span className="text-lg text-forest-300">USD</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">
          Global Verification Traffic
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BCC29" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7BCC29" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ fontSize: "14px", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="blocks"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBlocks)"
                name="Blocked Attacks"
              />
              <Area
                type="monotone"
                dataKey="scans"
                stroke="#7BCC29"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScans)"
                name="Authentic Scans"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Threat Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">
            Live Threat Detection
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
            <Activity className="w-3 h-3" />
            Monitoring
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Product UID</th>
                <th className="p-4 font-semibold">Target Location</th>
                <th className="p-4 font-semibold">Threat Vector</th>
                <th className="p-4 font-semibold">Security Protocol</th>
                <th className="p-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {threatData.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedThreat(row)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <td className="p-4 font-mono text-sm text-slate-900 font-medium group-hover:text-forest-900">
                    {row.id}
                  </td>
                  <td className="p-4 text-sm text-slate-600">{row.loc}</td>
                  <td className="p-4">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold",
                        row.status === "danger"
                          ? "bg-red-50 text-red-700"
                          : "bg-lime-50 text-forest-800",
                      )}
                    >
                      {row.status === "danger" ? (
                        <ShieldAlert className="w-3 h-3" />
                      ) : (
                        <ShieldCheck className="w-3 h-3" />
                      )}
                      {row.threat}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-mono text-slate-500">
                    {row.protocol}
                  </td>
                  <td className="p-4 text-sm text-slate-400">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DPP Modal */}
      {isDppOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
            <div className="bg-forest-900 p-6 flex justify-between items-center text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-lime-500/20 rounded-full blur-2xl translate-x-10 -translate-y-10" />
              <div className="relative z-10">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-lime-400" />
                  EU Digital Product Passport
                </h2>
                <p className="text-forest-200 text-sm mt-1 font-mono">
                  Drafted for 2027 Compliance Mandate
                </p>
              </div>
              <button
                onClick={() => setIsDppOpen(false)}
                className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors text-forest-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-slate-50">
              <div className="bg-white rounded-xl border border-slate-200 p-5 font-mono text-sm text-slate-700 overflow-x-auto shadow-inner">
                <pre>
                  {`{
  "passport_id": "urn:epc:id:sgtin:0614141.812345.6789",
  "issuer": "AuthentiChain Trust Core",
  "compliance": {
    "framework": "EU-DPP-2027",
    "status": "VERIFIED_COMPLIANT",
    "cryptographic_assurance": "AN10922_SUN"
  },
  "product_data": {
    "manufacturer": "Acme Luxury Goods",
    "material_composition": [
      {"material": "Recycled Aluminum", "pct": 85},
      {"material": "Bio-resin", "pct": 15}
    ],
    "carbon_footprint_kg_co2e": 4.2
  },
  "signature": "304502201...[TRUNCATED]...6259"
}`}
                </pre>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="flex items-center gap-2 text-sm font-semibold text-forest-900 bg-lime-100 px-4 py-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-lime-600" />
                  Cryptographically Signed
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Threat Side Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-40 transform transition-transform duration-500 ease-out flex flex-col",
          selectedThreat ? "translate-x-0" : "translate-x-full",
        )}
      >
        {selectedThreat && (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">
                Incident Analysis
              </h2>
              <button
                onClick={() => setSelectedThreat(null)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Target Asset
                </div>
                <div className="text-2xl font-mono font-bold text-forest-900">
                  {selectedThreat.id}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      Verdict: {selectedThreat.threat}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {selectedThreat.protocol}
                    </div>
                  </div>
                </div>

                {selectedThreat.threat === "Velocity Anomaly" && (
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" /> Scan 1
                      </div>
                      <div className="font-mono font-medium">
                        Istanbul, TR (10:00)
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" /> Scan 2
                      </div>
                      <div className="font-mono font-medium">
                        Baku, AZ (10:04)
                      </div>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-slate-500">
                        <span>Physical distance:</span>
                        <span className="font-mono text-slate-900">
                          1,800 km
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Calculated velocity:</span>
                        <span className="font-mono text-red-600 font-bold">
                          27,000 km/h
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg text-red-800 font-medium">
                      Physical impossibility detected. ID Blacklisted globally
                      across edge nodes.
                    </div>
                  </div>
                )}

                {selectedThreat.threat === "Replay Attempt" && (
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Database className="w-4 h-4" /> CMAC Signature
                      </div>
                      <div className="font-mono font-medium text-red-600">
                        PREVIOUSLY_SPENT
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg text-red-800 font-medium">
                      Cryptographic counter did not increment. Attempted URL
                      cloning detected and neutralized.
                    </div>
                  </div>
                )}

                {selectedThreat.threat === "Validated" && (
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Database className="w-4 h-4" /> Verification
                      </div>
                      <div className="font-mono font-medium text-forest-900">
                        SUCCESS
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-lime-50 rounded-lg text-forest-800 font-medium">
                      AES-128 keys successfully diversified against Cloud HSM.
                      Secure session established.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-colors">
                Export Incident Log (PDF)
              </button>
            </div>
          </>
        )}
      </div>

      {/* Drawer Overlay backdrop */}
      {selectedThreat && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 animate-in fade-in"
          onClick={() => setSelectedThreat(null)}
        />
      )}
    </div>
  );
}
