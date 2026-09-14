import { useState, useEffect } from 'react';
import { Scale, ShieldAlert, CheckSquare, Square } from 'lucide-react';

interface DisclaimerModalProps {
  onAccept: () => void;
}

const STORAGE_KEY = 'clarifylex_disclaimer_accepted_v1';

export function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    if (!hasAgreed) return;
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    onAccept();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-first-use-disclaimer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 id="disclaimer-modal-title" className="text-xl font-bold text-white tracking-tight">
              ClarifyLex AI Compliance Notice
            </h2>
            <p className="text-xs text-slate-400">Google for Developers &amp; Hack2Skill Guardrails</p>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 mb-5 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
          <div className="flex gap-2.5 items-start text-amber-300/90 font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>Strict Ethical Boundary &amp; No Attorney-Client Relationship</span>
          </div>
          <p>
            ClarifyLex AI employs artificial intelligence to demystify, categorize, and summarize complex contract language for educational and comprehension purposes.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
            <li>It does <strong>NOT</strong> constitute professional legal counsel or statutory advice.</li>
            <li>No lawyer-client confidentiality or fiduciary duty is established.</li>
            <li>Synthetic legal templates are used to demonstrate risk analysis safely without leaking sensitive case data.</li>
            <li>Client-side PII sanitization operates locally before queries reach language models.</li>
          </ul>
        </div>

        <div className="mb-6">
          <button
            type="button"
            id="checkbox-disclaimer-consent"
            onClick={() => setHasAgreed(!hasAgreed)}
            className="flex items-start gap-3 text-left w-full p-2.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer group"
          >
            <div className="mt-0.5 text-teal-400">
              {hasAgreed ? (
                <CheckSquare className="w-5 h-5 fill-teal-500/20" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 group-hover:text-slate-400" />
              )}
            </div>
            <span className="text-xs sm:text-sm text-slate-300 font-medium leading-snug select-none">
              I understand that ClarifyLex AI provides automated informational comprehension assistance, not professional legal counsel, and I will consult a licensed attorney for binding legal matters.
            </span>
          </button>
        </div>

        <button
          id="btn-confirm-disclaimer"
          disabled={!hasAgreed}
          onClick={handleConfirm}
          className={`w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
            hasAgreed
              ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-900/40 cursor-pointer'
              : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
          }`}
        >
          Enter ClarifyLex Platform
        </button>
      </div>
    </div>
  );
}
