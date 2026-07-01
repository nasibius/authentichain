import { ArrowLeft, ShieldAlert, Activity, FileText, MapPin, Target, Download, CheckCircle } from "lucide-react";
import { useState } from "react";

export function InvestigationsView({ threat, onBack, t }: { threat: any, onBack: () => void, t: any }) {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [offlineActionTaken, setOfflineActionTaken] = useState(false);

  if (!threat) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center">
        <p className="text-slate-500">{t.noThreatSelected || "No threat selected for investigation."}</p>
        <button onClick={onBack} className="mt-4 text-lime-600 font-bold hover:underline">{t.goBack || "Go Back"}</button>
      </div>
    );
  }

  const handleGenerateReport = () => {
    const reportContent = `INCIDENT REPORT
ID: INC-${threat.id}8832X
Type: ${threat.type}
Product: ${threat.product}
Location: ${threat.loc}
Time: ${threat.time}
Severity: CRITICAL

Details:
${threat.detail}

Generated on: ${new Date().toLocaleString()}
`;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Incident_Report_INC-${threat.id}8832X.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setReportGenerated(true);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  const handleOfflineAction = () => {
    setOfflineActionTaken(true);
    setTimeout(() => {
      setOfflineActionTaken(false);
      onBack();
    }, 2000);
  };

  return (
    <div className="p-6 pb-10 h-full overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 bg-white/60 backdrop-blur-xl border border-white/60 rounded-full hover:bg-white/80 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t.investigationDetails || "Investigation Details"}</h2>
      </div>

      <div className="bg-white/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] mb-6">
        <div className="flex items-start gap-5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
            <ShieldAlert className="w-7 h-7 text-orange-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
              {t.activeIncident || "Active Incident"}
            </div>
            <h3 className="text-2xl font-black text-slate-800">{threat.type}</h3>
            <p className="text-slate-600 font-medium mt-1">{t.product || "Product"}: {threat.product}</p>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-sm mb-6">
          <div className="text-sm font-bold text-slate-700 mb-2">{t.description || "Description"}</div>
          <p className="text-slate-600 text-sm leading-relaxed">{threat.detail}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-sm">
            <MapPin className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 font-medium">{t.locationDetected || "Location Detected"}</div>
              <div className="text-sm font-bold text-slate-800">{threat.loc}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-sm">
            <Activity className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 font-medium">{t.timeOfDetection || "Time of Detection"}</div>
              <div className="text-sm font-bold text-slate-800">{threat.time}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-sm">
            <Target className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 font-medium">{t.severity || "Severity"}</div>
              <div className="text-sm font-bold text-orange-600">{t.critical || "CRITICAL"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-sm">
            <FileText className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 font-medium">{t.incidentId || "Incident ID"}</div>
              <div className="text-sm font-bold text-slate-800 font-mono">INC-{threat.id}8832X</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleGenerateReport}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-lg py-4 px-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-slate-800 transition-all"
        >
          {reportGenerated ? <CheckCircle className="w-5 h-5" /> : <Download className="w-5 h-5" />}
          {reportGenerated ? (t.reportDownloaded || "Report Downloaded") : (t.generateReport || "Generate Full Report")}
        </button>
        <button 
          onClick={handleOfflineAction}
          disabled={offlineActionTaken}
          className="flex-1 flex items-center justify-center gap-2 bg-white/60 backdrop-blur-xl border border-orange-200 text-orange-600 font-bold text-lg py-4 px-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:bg-orange-50 transition-all disabled:opacity-50"
        >
          {offlineActionTaken ? <CheckCircle className="w-5 h-5" /> : null}
          {offlineActionTaken ? (t.actionLogged || "Action Logged") : (t.takeOfflineAction || "Take Offline Action")}
        </button>
      </div>
    </div>
  );
}
