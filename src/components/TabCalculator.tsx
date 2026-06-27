import { useState } from "react";
import { cn } from "../lib/utils";

export function TabCalculator() {
  const [volume, setVolume] = useState(40000);

  const setupCost = 5000;
  const saasLicense = 7000;
  const chipCost = volume * 0.45;
  const totalInvestment = saasLicense + chipCost;
  const lossPrevented = volume * 0.033 * 50;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-forest-900">
          ROI & Pricing Calculator
        </h1>
        <p className="text-slate-500 mt-2">
          Project your return on investment based on annual packaging volume.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="mb-8">
          <label className="flex justify-between items-end mb-4">
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Annual Product Volume
            </span>
            <span className="text-3xl font-bold text-forest-900">
              {volume.toLocaleString()} units
            </span>
          </label>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-forest-900"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
            <span>10,000</span>
            <span>1,000,000</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500 font-medium">
                  Setup & API Integration
                </div>
                <div className="text-xs text-slate-400 mt-1">One-time fee</div>
              </div>
              <div className="font-mono font-medium text-slate-900">
                ${setupCost.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500 font-medium">
                  Haversine SaaS License
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Annual subscription
                </div>
              </div>
              <div className="font-mono font-medium text-slate-900">
                ${saasLicense.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500 font-medium">
                  Cryptographic Chips
                </div>
                <div className="text-xs text-slate-400 mt-1">$0.45 / unit</div>
              </div>
              <div className="font-mono font-medium text-slate-900">
                ${chipCost.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-100 h-[104px] flex flex-col justify-center">
              <div className="text-sm text-forest-700 font-medium mb-1">
                Total Annual Investment
              </div>
              <div className="text-3xl font-bold text-forest-900 font-mono">
                ${totalInvestment.toLocaleString()}
              </div>
            </div>

            <div className="bg-forest-900 rounded-xl p-6 border border-forest-800 h-[148px] flex flex-col justify-center relative overflow-hidden shadow-lg">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-lime-500/20 rounded-full blur-3xl"></div>
              <div className="text-sm text-lime-400 font-medium mb-1 relative z-10">
                Estimated Loss Prevented
              </div>
              <div className="text-4xl font-bold text-white font-mono relative z-10">
                ${lossPrevented.toLocaleString()}
              </div>
              <div className="text-xs text-forest-300 mt-2 relative z-10">
                Based on 3.3% global counterfeit rate at $50 avg. price
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
