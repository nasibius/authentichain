import { useState, useEffect } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  ScanFace,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";
import { cn } from "../lib/utils";

export function TabSimulator() {
  const [isAttackMode, setIsAttackMode] = useState(false);
  const [scanState, setScanState] = useState<"idle" | "scanning" | "result">(
    "idle",
  );

  const handleScan = () => {
    setScanState("scanning");
    setTimeout(() => {
      setScanState("result");
    }, 1500);
  };

  const resetScan = () => {
    setScanState("idle");
  };

  // Reset scan state when mode changes
  useEffect(() => {
    resetScan();
  }, [isAttackMode]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-forest-900">
          Mobile Viewer Simulator
        </h1>
        <p className="text-slate-500 mt-2">
          Experience the frictionless consumer authentication flow.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        {/* Left Column: Control Dashboard */}
        <div className="flex-1 space-y-8 flex flex-col justify-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Simulation Environment
            </h3>

            <div className="flex bg-slate-100 p-1 rounded-xl w-full max-w-md relative">
              <button
                onClick={() => setIsAttackMode(false)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 relative z-10",
                  !isAttackMode
                    ? "text-forest-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <ShieldCheck className="w-4 h-4" />
                Safe Authentication
              </button>
              <button
                onClick={() => setIsAttackMode(true)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 relative z-10",
                  isAttackMode
                    ? "text-red-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <ShieldAlert className="w-4 h-4" />
                Counterfeit Attack
              </button>
              {/* Animated Background Indicator */}
              <div
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out",
                  isAttackMode ? "left-[calc(50%+2px)]" : "left-1",
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Active Scenario
            </h4>
            {!isAttackMode ? (
              <div className="bg-forest-50 border border-forest-100 p-5 rounded-xl">
                <p className="text-sm text-forest-800 leading-relaxed">
                  <strong>Valid Product Scan:</strong> A genuine product with an
                  untouched cryptographic chip is scanned. The signature matches
                  the Cloud HSM perfectly.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-100 p-5 rounded-xl">
                <p className="text-sm text-red-800 leading-relaxed">
                  <strong>Replay / Clone Attack:</strong> A counterfeiter has
                  copied the URL and chip signature to fake packaging. The
                  system detects an impossible geographic velocity anomaly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: The Smartphone */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-[320px] h-[650px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-slate-200 shrink-0">
            {/* iPhone Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />

            {/* Screen Content */}
            <div className="relative w-full h-full bg-white rounded-[36px] overflow-hidden flex flex-col">
              {scanState === "idle" && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 relative">
                  <div className="w-24 h-24 bg-forest-100 rounded-full flex items-center justify-center mb-6 absolute top-1/4 animate-pulse">
                    <ScanFace className="w-10 h-10 text-forest-900" />
                  </div>
                  <div className="mt-32">
                    <h3 className="font-bold text-xl text-slate-900 mb-2">
                      Ready to Scan
                    </h3>
                    <p className="text-sm text-slate-500 mb-10">
                      Hold phone near product packaging to scan. No App
                      Required.
                    </p>
                    <button
                      onClick={handleScan}
                      className="w-full bg-forest-900 text-white font-medium py-4 px-6 rounded-2xl shadow-lg hover:bg-forest-800 active:scale-95 transition-all"
                    >
                      Simulate Physical Tap
                    </button>
                  </div>
                </div>
              )}

              {scanState === "scanning" && (
                <div className="flex-1 flex flex-col items-center justify-center bg-forest-900 text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-500/20 via-transparent to-transparent animate-pulse" />

                  {/* Radar rings */}
                  <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-lime-500/30 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-lime-500/50 animate-ping delay-150" />
                    <ShieldCheck className="w-12 h-12 text-lime-400 relative z-10 animate-bounce" />
                  </div>

                  <div className="space-y-3 relative z-10">
                    <p className="text-sm font-mono text-lime-400 animate-pulse">
                      Querying Spring Boot Backend...
                    </p>
                    <p className="text-xs font-mono text-forest-300 opacity-80">
                      Diversifying Keys...
                    </p>
                    <p className="text-xs font-mono text-forest-300 opacity-60">
                      Resolving MaxMind GeoIP...
                    </p>
                  </div>
                </div>
              )}

              {scanState === "result" && !isAttackMode && (
                <div className="flex-1 flex flex-col items-center justify-center bg-lime-500 text-forest-950 p-8 text-center animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-20 h-20 mb-6" />
                  <h2 className="text-2xl font-bold mb-2">100% Authentic</h2>
                  <p className="text-sm font-medium opacity-90 mb-8">
                    Product Verified
                  </p>

                  <div className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left border border-white/30 space-y-3">
                    <div className="flex justify-between items-center border-b border-forest-900/10 pb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                        Brand
                      </span>
                      <span className="text-sm font-bold">AuthentiChain</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-forest-900/10 pb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                        Batch
                      </span>
                      <span className="text-sm font-mono">B-8821-X</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono opacity-60 block mb-1">
                        Secure Token Hash
                      </span>
                      <span className="text-[10px] font-mono break-all leading-tight block">
                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.verified_via_Cloud_HSM
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={resetScan}
                    className="mt-8 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
                  >
                    Scan Another
                  </button>
                </div>
              )}

              {scanState === "result" && isAttackMode && (
                <div className="flex-1 flex flex-col items-center justify-center bg-red-600 text-white p-8 text-center animate-in fade-in zoom-in duration-300">
                  <AlertOctagon className="w-20 h-20 mb-6" />
                  <h2 className="text-2xl font-bold mb-2">WARNING</h2>
                  <p className="text-sm font-bold mb-8 uppercase tracking-widest text-red-200">
                    Counterfeit Suspected
                  </p>

                  <div className="w-full bg-black/20 backdrop-blur-sm rounded-xl p-5 text-left border border-red-500/30">
                    <p className="text-xs leading-relaxed font-medium">
                      This chip token has already been spent or detected in an
                      impossible location speed.
                      <strong className="block mt-2 text-white">
                        Do not purchase.
                      </strong>
                    </p>
                  </div>

                  <button
                    onClick={resetScan}
                    className="mt-8 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
