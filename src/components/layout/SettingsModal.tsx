import { useState } from 'react';
import { AISettings } from '../../types';
import { X, KeyRound, Cpu, Shield, Check, Eye, EyeOff, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSave: (newSettings: AISettings) => void;
  serverHasGemini: boolean;
  serverHasGroq: boolean;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
  serverHasGemini,
  serverHasGroq
}: SettingsModalProps) {
  const [formData, setFormData] = useState<AISettings>({ ...settings });
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div
      id="modal-settings"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-lg font-bold text-white tracking-tight">
                AI Engines &amp; Security Settings
              </h2>
              <p className="text-xs text-slate-400">Dual Engine Configuration (Gemini + Groq) &amp; PII Redactor</p>
            </div>
          </div>
          <button
            id="btn-close-settings"
            onClick={onClose}
            aria-label="Close Settings"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Status Indicators */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3.5 mb-5 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${serverHasGemini ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 font-medium">
              Server Gemini Key: {serverHasGemini ? 'Injected via Environment' : 'Not Detected (Using Client Key or Local Legal Engine)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${serverHasGroq ? 'bg-emerald-400' : 'bg-slate-600'}`} />
            <span className="text-slate-400">
              Groq Fallback: {serverHasGroq ? 'Connected' : 'Client Configurable'}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Primary AI Inference Provider
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'auto', label: 'Auto Fallback', desc: 'Gemini -> Groq -> Local Engine' },
                { id: 'gemini', label: 'Gemini Engine', desc: 'Long-context multimodal' },
                { id: 'groq', label: 'Groq Engine', desc: 'Ultra-low latency' }
              ].map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  id={`btn-provider-${prov.id}`}
                  onClick={() => setFormData({ ...formData, preferredProvider: prov.id as any })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    formData.preferredProvider === prov.id
                      ? 'border-teal-500 bg-teal-500/10 text-white font-medium'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold text-slate-200">{prov.label}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{prov.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Google Gemini Configuration */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Google Gemini API
              </span>
              <span className="text-[11px] text-teal-400/80 font-mono">Multimodal Legal Reasoner</span>
            </div>

            <div>
              <label htmlFor="input-gemini-key" className="block text-[11px] text-slate-400 mb-1">
                Custom Gemini API Key (Stored strictly in client localStorage)
              </label>
              <div className="relative">
                <input
                  id="input-gemini-key"
                  type={showGeminiKey ? 'text' : 'password'}
                  value={formData.geminiApiKey}
                  onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                  placeholder={serverHasGemini ? 'Inherited from AI Studio environment (optional override)' : 'Enter Gemini API key...'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500 pr-9"
                />
                <button
                  type="button"
                  id="btn-toggle-gemini-key"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="select-gemini-model" className="block text-[11px] text-slate-400 mb-1">
                Gemini Model Tier
              </label>
              <select
                id="select-gemini-model"
                value={formData.geminiModel}
                onChange={(e) => setFormData({ ...formData, geminiModel: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
              >
                <option value="gemini-3.5-flash">gemini-3.5-flash — Fast, high-accuracy contract analysis (Recommended)</option>
                <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview — Deep reasoning &amp; thinking for complex contracts</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite — Ultra-fast minimal latency</option>
              </select>
            </div>
          </div>

          {/* Groq API Configuration */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Groq LPU Engine (Secondary Fallback)
              </span>
              <span className="text-[11px] text-amber-400/80 font-mono">Ultra-fast Fallback</span>
            </div>

            <div>
              <label htmlFor="input-groq-key" className="block text-[11px] text-slate-400 mb-1">
                Groq API Key (Optional)
              </label>
              <div className="relative">
                <input
                  id="input-groq-key"
                  type={showGroqKey ? 'text' : 'password'}
                  value={formData.groqApiKey}
                  onChange={(e) => setFormData({ ...formData, groqApiKey: e.target.value })}
                  placeholder="gsk_..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500 pr-9"
                />
                <button
                  type="button"
                  id="btn-toggle-groq-key"
                  onClick={() => setShowGroqKey(!showGroqKey)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  {showGroqKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Security & Client-Side PII Guard */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block">Automated Client-Side PII Redaction</span>
                <span className="text-[11px] text-slate-400 block leading-tight mt-0.5">
                  Masks real names, emails, phone numbers, and physical addresses locally before payload transmission.
                </span>
              </div>
            </div>
            <button
              type="button"
              id="btn-toggle-pii"
              onClick={() => setFormData({ ...formData, enablePiiRedaction: !formData.enablePiiRedaction })}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                formData.enablePiiRedaction ? 'bg-teal-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  formData.enablePiiRedaction ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            id="btn-cancel-settings"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            id="btn-save-settings"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Saved to LocalStorage
              </>
            ) : (
              'Save Configuration'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
