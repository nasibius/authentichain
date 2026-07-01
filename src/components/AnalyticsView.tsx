import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export function AnalyticsView({ t }: any) {
  const data = [
    { name: t.mon || "Mon", scans: 12000, threats: 400 },
    { name: t.tue || "Tue", scans: 19000, threats: 500 },
    { name: t.wed || "Wed", scans: 15000, threats: 300 },
    { name: t.thu || "Thu", scans: 22000, threats: 800 },
    { name: t.fri || "Fri", scans: 28000, threats: 1200 },
    { name: t.sat || "Sat", scans: 34000, threats: 1500 },
    { name: t.sun || "Sun", scans: 25000, threats: 900 },
  ];

  return (
    <div className="p-6 pb-10 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t.analytics}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{t.today}</div>
          <div className="text-2xl font-black text-slate-800">25,400</div>
          <div className="text-xs text-lime-600 font-bold mt-1">+12% {t.vsYesterday}</div>
        </div>
        <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{t.thisWeek}</div>
          <div className="text-2xl font-black text-slate-800">145,200</div>
          <div className="text-xs text-lime-600 font-bold mt-1">+5% {t.vsLastWeek}</div>
        </div>
        <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{t.thisMonth}</div>
          <div className="text-2xl font-black text-slate-800">584,000</div>
          <div className="text-xs text-lime-600 font-bold mt-1">+18% {t.vsLastMonth}</div>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-6 h-72 flex flex-col">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 shrink-0">{t.scansOverview}</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="scans" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.04)] h-72 flex flex-col">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 shrink-0">{t.threatsBlocked}</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="threats" stroke="#f97316" strokeWidth={3} dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
