/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { ConsumerApp } from "./components/ConsumerApp";
import { CompanyApp } from "./components/CompanyApp";
import { cn } from "./lib/utils";

export default function App() {
  const [isCompanyMode, setIsCompanyMode] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [toastMsg, setToastMsg] = useState("");

  const handleHeaderTap = () => {
    const now = Date.now();
    if (now - lastTap < 500) {
      const newCount = tapCount + 1;
      setTapCount(newCount);
      if (newCount === 3) {
        setIsCompanyMode(!isCompanyMode);
        setToastMsg(
          !isCompanyMode ? "Admin Access Granted" : "Switched to User Mode",
        );
        setTimeout(() => setToastMsg(""), 3000);
        setTapCount(0);
      }
    } else {
      setTapCount(1);
    }
    setLastTap(now);
  };

  return (
    <div
      className={cn(
        "min-h-[100dvh] flex flex-col items-center justify-center font-sans selection:bg-lime-200 selection:text-lime-900 transition-all duration-500",
        isCompanyMode ? "bg-white" : "bg-white sm:bg-slate-900 sm:p-8",
      )}
    >
      <div
        className={cn(
          "bg-white overflow-hidden relative flex flex-col transition-all duration-500",
          isCompanyMode
            ? "w-full h-[100dvh]"
            : "w-full sm:w-[393px] h-[100dvh] sm:h-[852px] sm:rounded-[3rem] shadow-2xl sm:ring-8 sm:ring-slate-800",
        )}
      >
        {/* Dynamic Island fake for desktop preview */}
        {!isCompanyMode && (
          <div className="hidden sm:flex absolute top-0 w-full justify-center z-50 pt-3 pointer-events-none">
            <div className="w-32 h-8 bg-black rounded-full"></div>
          </div>
        )}

        {/* Global Header */}
        <div
          onClick={handleHeaderTap}
          className="pt-safe sm:pt-6 pb-3 px-3 flex items-center gap-3 cursor-pointer select-none bg-white/80 backdrop-blur-md border-b border-lime-100 z-40 relative shrink-0"
        >
          <img
            src="/logo.png"
            alt="AuthentiChain Logo"
            className="h-8 object-contain mt-[10px]"
          />
          {isCompanyMode && (
            <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-lime-600 bg-lime-100 px-2 py-1 rounded-full">
              Admin
            </span>
          )}
        </div>

        {/* App Content */}
        <div className="flex-1 overflow-hidden relative bg-[#F0FDF4] flex flex-col">
          {isCompanyMode ? <CompanyApp /> : <ConsumerApp />}
        </div>

        {/* Toast */}
        <div
          className={cn(
            "absolute top-28 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-5 py-2.5 rounded-full shadow-lg text-sm font-medium transition-all duration-300 z-50 flex items-center gap-2 whitespace-nowrap",
            toastMsg
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none",
          )}
        >
          {toastMsg}
        </div>
      </div>

      {!isCompanyMode && (
        <div className="mt-8 text-slate-400 text-sm hidden sm:block text-center space-y-1">
          <p>Mobile App Preview</p>
          <p className="opacity-60 text-xs">
            Hint: Triple-tap the header to toggle Admin Mode
          </p>
        </div>
      )}
    </div>
  );
}
