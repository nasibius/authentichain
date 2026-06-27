import { Cpu, Zap, Lock, Code2 } from "lucide-react";

export function TabTechStack() {
  const stack = [
    {
      title: "NTAG 424 DNA",
      layer: "NFC Hardware Perimeter",
      icon: Cpu,
      details:
        "Hardware-enforced SUN protocol, unique 7-byte silicon fingerprint ID, anti-tamper.",
    },
    {
      title: "Redis Cache & MaxMind",
      layer: "Speed & Intelligence Layer",
      icon: Zap,
      details:
        "In-memory geospatial tracking, real-time IP parsing, millisecond-level throughput.",
    },
    {
      title: "Cloud HSM Vault",
      layer: "Cryptographic Core",
      icon: Lock,
      details:
        "AN10922 Key Diversification. Root keys are mathematically isolated and never exposed to the database.",
    },
    {
      title: "Spring Boot & React JS",
      layer: "Presentation & Trust",
      icon: Code2,
      details:
        "Cryptographically signed JWT tokens, stateless state verification, 1-second consumer response time.",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-forest-900">
          Technology Stack Blueprint
        </h1>
        <p className="text-slate-500 mt-2">
          Enterprise-grade architecture built for speed and cryptographic
          assurance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stack.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md hover:border-forest-200 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-lime-500 transition-colors duration-300"></div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-forest-50 flex items-center justify-center shrink-0 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-slate-400 group-hover:text-forest-900 transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {item.layer}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-forest-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
