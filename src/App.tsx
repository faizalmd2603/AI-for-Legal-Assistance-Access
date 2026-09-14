import { useState, useEffect } from 'react';
import { AISettings, DocumentAnalysisResult } from './types';
import { checkServerConfig, ServerConfigStatus } from './services/aiService';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { DisclaimerModal } from './components/layout/DisclaimerModal';
import { Navbar } from './components/layout/Navbar';
import { SettingsModal } from './components/layout/SettingsModal';
import { PiiInspectorModal } from './components/analyzer/PiiInspectorModal';
import { DocumentAnalyzer } from './components/analyzer/DocumentAnalyzer';
import { ContractComparator } from './components/comparator/ContractComparator';
import { DocumentChat } from './components/chat/DocumentChat';
import { ActionPackDossier } from './components/briefing/ActionPackDossier';

const SETTINGS_STORAGE_KEY = 'clarifylex_ai_settings_v1';

const DEFAULT_SETTINGS: AISettings = {
  preferredProvider: 'auto',
  geminiModel: 'gemini-3.5-flash',
  geminiApiKey: '',
  groqApiKey: '',
  groqModel: 'llama-3.3-70b-versatile',
  enablePiiRedaction: true,
  isDemoMode: false,
  temperature: 0.2
};

export function App() {
  // Active workflow tab
  const [activeTab, setActiveTab] = useState<'analyzer' | 'comparator' | 'chat' | 'briefing'>('analyzer');

  // Active document analysis state (starts empty; populated upon ingestion, upload, or synthetic template selection)
  const [currentAnalysis, setCurrentAnalysis] = useState<DocumentAnalysisResult | null>(null);

  // AI settings
  const [settings, setSettings] = useState<AISettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to parse saved settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Server credentials status
  const [serverConfig, setServerConfig] = useState<ServerConfigStatus>({
    hasGeminiKey: false,
    hasGroqKey: false,
    serverEnv: 'checking'
  });

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isPiiModalOpen, setIsPiiModalOpen] = useState<boolean>(false);

  useEffect(() => {
    checkServerConfig().then((cfg) => {
      setServerConfig(cfg);
    });
  }, []);

  const handleSaveSettings = (newSettings: AISettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Failed to persist settings:', e);
    }
  };

  return (
    <div id="clarifylex-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* 1. Mandatory Ethical Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Mandatory First-Use Disclaimer Confirmation Modal */}
      <DisclaimerModal onAccept={() => {}} />

      {/* 3. Global Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPiiInspector={() => setIsPiiModalOpen(true)}
        serverHasGemini={serverConfig.hasGeminiKey}
      />

      {/* 4. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'analyzer' && (
          <DocumentAnalyzer
            currentAnalysis={currentAnalysis}
            onAnalysisUpdate={(newAnalysis) => setCurrentAnalysis(newAnalysis)}
            settings={settings}
            onSwitchToComparator={() => setActiveTab('comparator')}
          />
        )}

        {activeTab === 'comparator' && (
          <ContractComparator settings={settings} />
        )}

        {activeTab === 'chat' && (
          <DocumentChat
            currentAnalysis={currentAnalysis}
            settings={settings}
            onSelectClauseId={() => {
              setActiveTab('analyzer');
            }}
            onNavigateToAnalyzer={() => setActiveTab('analyzer')}
          />
        )}

        {activeTab === 'briefing' && (
          <ActionPackDossier
            currentAnalysis={currentAnalysis}
            onNavigateToAnalyzer={() => setActiveTab('analyzer')}
          />
        )}
      </main>

      {/* 5. Minimalist Legal Tech Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">ClarifyLex AI</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-lg">
            ClarifyLex AI is an educational legal comprehension tool, not formal legal counsel. Client-side PII sanitization active.
          </p>
        </div>
      </footer>

      {/* 6. Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
        serverHasGemini={serverConfig.hasGeminiKey}
        serverHasGroq={serverConfig.hasGroqKey}
      />

      {/* 7. PII Redactor Inspector Modal */}
      <PiiInspectorModal
        isOpen={isPiiModalOpen}
        onClose={() => setIsPiiModalOpen(false)}
        rawText={currentAnalysis?.rawText || ''}
        isPiiEnabled={settings.enablePiiRedaction}
      />
    </div>
  );
}

export default App;
