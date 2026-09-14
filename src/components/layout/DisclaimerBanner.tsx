import { useState } from 'react';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';

export function DisclaimerBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div
        id="disclaimer-minimized-badge"
        className="bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Informational Legal Intelligence Tool &bull; Not Professional Legal Counsel</span>
        </div>
        <button
          id="btn-reopen-disclaimer"
          onClick={() => setIsDismissed(false)}
          className="hover:text-slate-200 underline text-[11px] transition-colors"
        >
          View Full Disclaimer
        </button>
      </div>
    );
  }

  return (
    <aside
      id="disclaimer-banner"
      role="note"
      aria-label="Legal Disclaimer"
      className="bg-amber-950/40 border-b border-amber-600/30 px-4 py-2.5 text-amber-200/90 backdrop-blur-sm relative z-40 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-start sm:items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="font-semibold text-amber-300">Mandatory Ethical Boundary:</strong> ClarifyLex AI is an educational comprehension tool,{' '}
            <span className="underline decoration-amber-400/50">NOT licensed legal advice</span>. No attorney-client privilege is created. Always consult a qualified attorney for formal legal decisions.
          </p>
        </div>
        <button
          id="btn-dismiss-disclaimer"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss disclaimer banner"
          className="p-1 text-amber-400/70 hover:text-amber-200 hover:bg-amber-900/30 rounded transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
