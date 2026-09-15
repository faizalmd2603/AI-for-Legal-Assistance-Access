import { Scale, ShieldCheck, Settings as SettingsIcon, FileSearch, GitCompare, MessageSquare, Briefcase } from 'lucide-react';
import { AISettings } from '../../types';

interface NavbarProps {
  activeTab: 'analyzer' | 'comparator' | 'chat' | 'briefing';
  onTabChange: (tab: 'analyzer' | 'comparator' | 'chat' | 'briefing') => void;
  settings: AISettings;
  onOpenSettings: () => void;
  onOpenPiiInspector?: () => void;
  serverHasGemini: boolean;
}

export function Navbar({
  activeTab,
  onTabChange,
  settings,
  onOpenSettings,
  onOpenPiiInspector,
  serverHasGemini
}: NavbarProps) {
  const isConnected = serverHasGemini || Boolean(settings.geminiApiKey);

  return (
    <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-teal-950/50">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white tracking-tight">ClarifyLex AI</span>
                <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Legal Tech
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Transparent Legal Document Comprehension for Non-Lawyers
              </p>
            </div>
          </div>

          {/* Mobile settings button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Open Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none" role="tablist" aria-label="Legal Assistance Workflows">
          <button
            id="tab-analyzer"
            role="tab"
            aria-selected={activeTab === 'analyzer'}
            aria-controls="view-analyzer"
            onClick={() => onTabChange('analyzer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none cursor-pointer ${
              activeTab === 'analyzer'
                ? 'bg-teal-500/15 border border-teal-500/30 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Document Analyzer</span>
          </button>

          <button
            id="tab-comparator"
            role="tab"
            aria-selected={activeTab === 'comparator'}
            aria-controls="view-comparator"
            onClick={() => onTabChange('comparator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none cursor-pointer ${
              activeTab === 'comparator'
                ? 'bg-teal-500/15 border border-teal-500/30 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Contract Diff</span>
          </button>

          <button
            id="tab-chat"
            role="tab"
            aria-selected={activeTab === 'chat'}
            aria-controls="view-chat"
            onClick={() => onTabChange('chat')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-teal-500/15 border border-teal-500/30 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Contextual Chat</span>
          </button>

          <button
            id="tab-briefing"
            role="tab"
            aria-selected={activeTab === 'briefing'}
            aria-controls="view-briefing"
            onClick={() => onTabChange('briefing')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none cursor-pointer ${
              activeTab === 'briefing'
                ? 'bg-teal-500/15 border border-teal-500/30 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Lawyer Action Pack</span>
          </button>
        </nav>

        {/* Right status & configuration tools */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* PII Redaction indicator pill */}
          <button
            id="btn-nav-pii-inspector"
            onClick={onOpenPiiInspector}
            title="Inspect Client-Side PII Sanitizer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px]">PII Redactor: {settings.enablePiiRedaction ? 'Active' : 'Off'}</span>
          </button>

          {/* AI Engine Status badge */}
          <button
            id="btn-nav-settings"
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-xs text-slate-200 transition-all cursor-pointer shadow-sm"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected
                  ? 'bg-emerald-400'
                  : 'bg-amber-400'
              }`}
            />
            <span className="font-medium text-[11px]">
              {serverHasGemini
                ? 'Gemini Server'
                : settings.geminiApiKey
                ? 'Custom Key'
                : 'Configure AI'}
            </span>
            <SettingsIcon className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
