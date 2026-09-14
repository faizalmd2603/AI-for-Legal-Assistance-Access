import { useState } from 'react';
import { X, ShieldCheck, Lock, Check, Copy } from 'lucide-react';
import { redactPII } from '../../utils/redactor';

interface PiiInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawText: string;
  isPiiEnabled: boolean;
}

export function PiiInspectorModal({
  isOpen,
  onClose,
  rawText,
  isPiiEnabled
}: PiiInspectorModalProps) {
  const [activeView, setActiveView] = useState<'redacted' | 'original' | 'map'>('redacted');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const redaction = redactPII(rawText);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      id="modal-pii-inspector"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pii-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="pii-modal-title" className="text-lg font-bold text-white tracking-tight">
                Client-Side PII Sanitization Inspector
              </h2>
              <p className="text-xs text-slate-400">
                Verifying local redaction before sending payload to LLM
              </p>
            </div>
          </div>
          <button
            id="btn-close-pii-inspector"
            onClick={onClose}
            aria-label="Close PII Inspector"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats summary banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Items</span>
            <span className="text-lg font-extrabold text-emerald-400">{redaction.counts.total}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Names</span>
            <span className="text-lg font-extrabold text-slate-200">{redaction.counts.names}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Emails</span>
            <span className="text-lg font-extrabold text-slate-200">{redaction.counts.emails}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Phones</span>
            <span className="text-lg font-extrabold text-slate-200">{redaction.counts.phones}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Addresses</span>
            <span className="text-lg font-extrabold text-slate-200">{redaction.counts.addresses}</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView('redacted')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'redacted' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sanitized Text (Sent to AI)
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'map' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Redaction Map ({Object.keys(redaction.redactionMap).length})
            </button>
            <button
              onClick={() => setActiveView('original')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'original' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Original Raw
            </button>
          </div>

          <button
            onClick={() => handleCopy(activeView === 'original' ? rawText : redaction.redactedText)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Text Viewport */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text">
          {activeView === 'map' ? (
            Object.keys(redaction.redactionMap).length === 0 ? (
              <p className="text-slate-500 italic">No specific personal identifying patterns detected.</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(redaction.redactionMap).map(([token, orig]) => (
                  <div key={token} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-emerald-400 font-bold">{token}</span>
                    <span className="text-slate-400 font-sans truncate max-w-xs">{orig}</span>
                  </div>
                ))}
              </div>
            )
          ) : activeView === 'redacted' ? (
            redaction.redactedText || <p className="text-slate-500 italic">No text provided.</p>
          ) : (
            rawText || <p className="text-slate-500 italic">No text provided.</p>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span>Redaction state: {isPiiEnabled ? 'Enabled (Default Protected)' : 'Disabled'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
