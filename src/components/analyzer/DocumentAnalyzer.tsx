import React, { useState, useRef, useEffect } from 'react';
import {
  AISettings,
  ClauseAnalysis,
  ClauseCategory,
  DocumentAnalysisResult,
  LegalDocumentType,
  ReadingLevel,
  SampleDocument
} from '../../types';
import { SAMPLE_DOCUMENTS } from '../../data/sampleDocuments';
import { extractTextFromFile } from '../../utils/fileExtractor';
import { analyzeLegalDocument } from '../../services/aiService';
import { RiskRadarScorecard } from './RiskRadarScorecard';
import { ClauseCard } from './ClauseCard';
import { PiiInspectorModal } from './PiiInspectorModal';
import {
  UploadCloud,
  FileText,
  Sparkles,
  RefreshCw,
  Eye,
  Shield,
  Layers,
  Sliders,
  ChevronRight,
  Search,
  Filter,
  ArrowRight,
  Cpu,
  BookOpen,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  Briefcase,
  ChevronDown,
  ChevronUp,
  CheckSquare
} from 'lucide-react';

interface DocumentAnalyzerProps {
  currentAnalysis: DocumentAnalysisResult | null;
  onAnalysisUpdate: (analysis: DocumentAnalysisResult) => void;
  settings: AISettings;
  onSwitchToComparator?: () => void;
}

export function DocumentAnalyzer({
  currentAnalysis,
  onAnalysisUpdate,
  settings,
  onSwitchToComparator
}: DocumentAnalyzerProps) {
  const [inputText, setInputText] = useState<string>(currentAnalysis?.rawText || '');
  const [docTitle, setDocTitle] = useState<string>(currentAnalysis?.documentTitle || '');
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('plain');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedClause, setSelectedClause] = useState<ClauseAnalysis | null>(currentAnalysis?.clauses?.[0] || null);
  const [isPiiModalOpen, setIsPiiModalOpen] = useState<boolean>(false);
  const [isChecklistExpanded, setIsChecklistExpanded] = useState<boolean>(true);
  const [uploadedPdfBase64, setUploadedPdfBase64] = useState<string | null>(null);
  const [apiKeyRequired, setApiKeyRequired] = useState<boolean>(false);
  const [inlineApiKey, setInlineApiKey] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const documentViewerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const docType = currentAnalysis?.documentType || currentAnalysis?.documentTypeMetadata?.detectedType || LegalDocumentType.CONTRACT;
  const meta = currentAnalysis?.documentTypeMetadata;

  // When selectedClause changes, scroll to its occurrence in the raw document viewer
  useEffect(() => {
    if (!selectedClause || !documentViewerRef.current) return;
    const targetElement = documentViewerRef.current.querySelector(
      `[data-clause-id="${selectedClause.id}"]`
    );
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedClause]);

  const handleRunAnalysis = async (
    textToAnalyze?: string,
    customTitle?: string,
    pdfBase64?: string | null,
    allowHeuristicFallback: boolean = false
  ) => {
    const text = textToAnalyze || inputText;
    const title = customTitle || docTitle;
    const pdf = pdfBase64 !== undefined ? pdfBase64 : uploadedPdfBase64;

    if (!text.trim() && !pdf) return;

    setIsLoading(true);
    setAnalysisError(null);
    setApiKeyRequired(false);

    try {
      const result = await analyzeLegalDocument(
        text,
        title,
        settings,
        pdf || undefined,
        allowHeuristicFallback
      );
      onAnalysisUpdate(result);
      if (result.clauses.length > 0) {
        setSelectedClause(result.clauses[0]);
      }
      if (result.extractedDocumentText) {
        setInputText(result.extractedDocumentText);
      }
    } catch (err: any) {
      console.error('Analysis failed:', err);
      if (err?.message?.includes('GEMINI_API_KEY_REQUIRED')) {
        setApiKeyRequired(true);
      } else {
        setAnalysisError(err?.message || 'Analysis failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKeyAndAnalyze = () => {
    if (!inlineApiKey.trim()) return;
    localStorage.setItem('clarifylex_gemini_key', inlineApiKey.trim());
    settings.geminiApiKey = inlineApiKey.trim();
    setApiKeyRequired(false);
    handleRunAnalysis(inputText, docTitle, uploadedPdfBase64, false);
  };

  const handleSelectSample = (sample: SampleDocument) => {
    setUploadedPdfBase64(null);
    setApiKeyRequired(false);
    setAnalysisError(null);
    setInputText(sample.rawText);
    setDocTitle(sample.title);
    handleRunAnalysis(sample.rawText, sample.title, null, false);
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setAnalysisError(null);
    try {
      const extracted = await extractTextFromFile(file);
      setInputText(extracted.text);
      setUploadedPdfBase64(extracted.pdfBase64 || null);
      const title = file.name.replace(/\.[^/.]+$/, '');
      setDocTitle(title);
      await handleRunAnalysis(extracted.text, title, extracted.pdfBase64 || null, false);
    } catch (err: any) {
      console.error('File extraction failed:', err);
      if (err?.message?.includes('GEMINI_API_KEY_REQUIRED')) {
        setApiKeyRequired(true);
      } else {
        setAnalysisError(err?.message || 'File extraction failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Filter clauses by category and search
  const filteredClauses = (currentAnalysis?.clauses || []).filter((clause) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      clause.category === selectedCategory ||
      (selectedCategory === 'high_risk' && clause.riskLevel === 'high');

    const matchesSearch =
      searchQuery === '' ||
      clause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.plainEnglishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.sectionNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="document-analyzer-view" className="space-y-6">
      {/* Top Controls: Upload, Synthetic Presets, PII Shield, and Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              Document Ingestion &amp; Synthesis
            </h2>
            <p className="text-xs text-slate-400">
              Upload PDF, DOCX, TXT contracts, paste raw legalese, or select from the Synthetic Document Library.
            </p>
          </div>

          {/* Quick Presets Dropdown */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Synthetic Document Library:
            </span>
            <select
              id="select-synthetic-preset"
              onChange={(e) => {
                const found = SAMPLE_DOCUMENTS.find((s) => s.id === e.target.value);
                if (found) handleSelectSample(found);
              }}
              value={SAMPLE_DOCUMENTS.find((s) => s.title === docTitle)?.id || ''}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-teal-500 cursor-pointer max-w-xs sm:max-w-md"
            >
              <option value="" disabled>Select synthetic document template...</option>
              <optgroup label="🇮🇳 Indian Statutory & Amended Acts Synthesis">
                {SAMPLE_DOCUMENTS.filter((s) => s.documentType === LegalDocumentType.INDIAN_LAW).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.category})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Commercial Contracts, SaaS & Data Privacy">
                {SAMPLE_DOCUMENTS.filter(
                  (s) =>
                    !s.documentType ||
                    (s.documentType !== LegalDocumentType.PATENT &&
                      s.documentType !== LegalDocumentType.WILL &&
                      s.documentType !== LegalDocumentType.INCORPORATION &&
                      s.documentType !== LegalDocumentType.INDIAN_LAW)
                ).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.category})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Patents & Intellectual Property">
                {SAMPLE_DOCUMENTS.filter((s) => s.documentType === LegalDocumentType.PATENT).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.subtype || 'Patent'})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Wills, Trusts & Estate Planning">
                {SAMPLE_DOCUMENTS.filter((s) => s.documentType === LegalDocumentType.WILL).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.subtype || 'Estate'})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Corporate Formation & Governance">
                {SAMPLE_DOCUMENTS.filter((s) => s.documentType === LegalDocumentType.INCORPORATION).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.subtype || 'Corporate'})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Drag & drop upload area + paste toggle */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`md:col-span-5 border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-teal-400 bg-teal-500/10'
                : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.md,.rtf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-2">
              <UploadCloud className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">
              Drag &amp; drop document or click to browse
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Supports PDF, DOCX, TXT (Auto Client-Side PII Redacted)
            </span>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="input-doc-title" className="text-xs font-semibold text-slate-300">
                  Contract Title:
                </label>
                <button
                  type="button"
                  id="btn-inspect-pii-header"
                  onClick={() => setIsPiiModalOpen(true)}
                  className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Inspect PII Sanitization</span>
                </button>
              </div>
              <input
                id="input-doc-title"
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g. Master Services Agreement"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-100 focus:outline-none focus:border-teal-500 mb-3"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Word Count: <span className="font-mono text-slate-200 font-semibold">{inputText.split(/\s+/).filter(Boolean).length} words</span>
              </span>

              <button
                id="btn-run-analysis"
                disabled={isLoading || (!inputText.trim() && !uploadedPdfBase64)}
                onClick={() => handleRunAnalysis()}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                  isLoading
                    ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Legal Payload...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze Contract Risk</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Gemini API Key Prompt for Custom Documents */}
        {apiKeyRequired && (
          <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-slate-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-xs font-bold text-amber-300">
                    Google Gemini API Key Required for Live Document Analysis
                  </h4>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-medium">
                    Production Vercel Ready
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  To perform real-time, clause-by-clause statutory analysis, visual PDF OCR, and risk scoring on your uploaded document, provide your Google Gemini API Key. It is stored securely in your browser's local storage.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <input
                    type="password"
                    value={inlineApiKey}
                    onChange={(e) => setInlineApiKey(e.target.value)}
                    placeholder="Paste your Gemini API key (AIzaSy...)"
                    className="bg-slate-950 border border-slate-700 text-xs text-slate-100 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleSaveKeyAndAnalyze}
                    disabled={!inlineApiKey.trim() || isLoading}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Save Key &amp; Analyze Real Document
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRunAnalysis(undefined, undefined, undefined, true)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Run Offline Estimate (No AI)
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2 pt-1">
                  <span>
                    Get a free key from{' '}
                    <a
                      href="https://aistudio.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 underline hover:text-amber-300 font-medium"
                    >
                      Google AI Studio
                    </a>
                    .
                  </span>
                  <span>
                    Or choose any contract from the <strong>Synthetic Document Library</strong> dropdown above to test instantly.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error notification */}
        {analysisError && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{analysisError}</span>
            </div>
            <button
              type="button"
              onClick={() => setAnalysisError(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {currentAnalysis?.isHeuristicFallback && (
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Rule-Based Offline Mode:</strong> This document was evaluated using local legal heuristics. Connect your Gemini API Key in Settings or enter it above for deep AI OCR and statutory citations.
            </span>
          </div>
        </div>
      )}

      {!currentAnalysis ? (
        <div id="analyzer-ready-state" className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-950/40">
            <FileText className="w-8 h-8" />
          </div>
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Ready to Analyze Your Legal Document
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Upload a legal document file above (PDF, DOCX, TXT), paste contract text directly, or select a document from the Synthetic Document Library to run AI clause extraction and risk analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2 text-left">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                <Shield className="w-4 h-4" />
                <span>Client-Side PII Shield</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Identities, phone numbers, and addresses are automatically scrubbed before any inference.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                <Layers className="w-4 h-4" />
                <span>Domain Intelligence</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Detects Patents 112(f) traps, Wills in terrorem clauses, or Incorporation deadlock vulnerabilities.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Sliders className="w-4 h-4" />
                <span>Risk Radar &amp; Dial</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Toggle plain English summaries, audit obligations, and export consultation dossiers.
              </p>
            </div>
          </div>

          {inputText.trim() && (
            <div className="pt-2">
              <button
                id="btn-trigger-analysis-cta"
                disabled={isLoading}
                onClick={() => handleRunAnalysis()}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-lg shadow-teal-950/60 inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Loaded Document Text</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Visual Risk Meter Scorecard */}
          <RiskRadarScorecard breakdown={currentAnalysis.riskBreakdown} documentTitle={currentAnalysis.documentTitle} />

      {/* Domain Intelligence Dossier & Statutory Compliance Checklist */}
      {meta && (
        <div id="domain-intelligence-dossier" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          {/* Header with Classification and Jurisdiction */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                {docType === LegalDocumentType.PATENT ? (
                  <Cpu className="w-5 h-5" />
                ) : docType === LegalDocumentType.WILL ? (
                  <BookOpen className="w-5 h-5" />
                ) : docType === LegalDocumentType.INCORPORATION ? (
                  <Building2 className="w-5 h-5" />
                ) : (
                  <FileCheck className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Domain Intelligence Dossier
                  </h3>
                  {meta.subtype && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {meta.subtype}
                    </span>
                  )}
                  {meta.jurisdictionOrOffice && (
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {meta.jurisdictionOrOffice}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Specialized statutory legal intelligence for{' '}
                  <span className="text-slate-200 font-semibold uppercase">{docType.replace('_', ' ')}</span>{' '}
                  instruments.
                </p>
              </div>
            </div>

            {meta.filingOrRegistrationDeadline && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold self-start sm:self-auto">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Deadline: {meta.filingOrRegistrationDeadline}</span>
              </div>
            )}
          </div>

          {/* Key Identified Parties / Legal Roles */}
          {meta.keyPartiesOrRoles && meta.keyPartiesOrRoles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                Identified Parties &amp; Legal Capacities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {meta.keyPartiesOrRoles.map((role, rIdx) => (
                  <div
                    key={rIdx}
                    className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 flex items-start gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wide">
                        {role.role}
                      </span>
                      <span className="text-xs font-bold text-slate-100 truncate block">
                        {role.name || role.nameOrEntity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Domain-Specific Statutory Checklist */}
          {meta.domainSpecificChecklist && meta.domainSpecificChecklist.length > 0 && (
            <div className="pt-2 border-t border-slate-800/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-teal-400" />
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Statutory Formality &amp; Risk Checklist ({meta.domainSpecificChecklist.length} Items)
                  </h4>
                </div>
                <button
                  id="btn-toggle-domain-checklist"
                  onClick={() => setIsChecklistExpanded(!isChecklistExpanded)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <span>{isChecklistExpanded ? 'Hide Checklist' : 'Show Checklist'}</span>
                  {isChecklistExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isChecklistExpanded && (
                <div className="space-y-2.5">
                  {meta.domainSpecificChecklist.map((item, idx) => {
                    const isPass = item.status === 'pass' || (item.status as string) === 'passed';
                    const isWarning = item.status === 'warning';
                    const label = (item as any).label || item.item;
                    const noteText = item.note || (item as any).notes;
                    const rec = item.recommendation;

                    return (
                      <div
                        key={idx}
                        className="bg-slate-950/50 border border-slate-800/70 rounded-xl p-3 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            {isPass ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : isWarning ? (
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                            ) : (
                              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                            <span className="font-bold text-slate-200">{label}</span>
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                              isPass
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                : isWarning
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            }`}
                          >
                            {isPass ? 'Compliant' : isWarning ? 'Advisory' : 'Critical Defect'}
                          </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed pl-6">{noteText}</p>
                        {rec && (
                          <div className="ml-6 mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-teal-300 flex items-start gap-1.5">
                            <span className="font-semibold text-white shrink-0">Action:</span>
                            <span>{rec}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reading Level Dial & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Reading Level Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-teal-400" />
            Reading Level Dial:
          </span>
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              id="btn-reading-plain"
              onClick={() => setReadingLevel('plain')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                readingLevel === 'plain'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Plain English (8th Grade)
            </button>
            <button
              id="btn-reading-executive"
              onClick={() => setReadingLevel('executive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                readingLevel === 'executive'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Executive Summary
            </button>
            <button
              id="btn-reading-original"
              onClick={() => setReadingLevel('original')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                readingLevel === 'original'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Original Legalese
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              id="input-search-clauses"
              type="text"
              placeholder="Search extracted clauses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500 w-48 sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Categorized Clause Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none" aria-label="Clause Categories">
        {[
          { id: 'all', label: 'All Clauses', count: currentAnalysis.clauses.length },
          { id: 'high_risk', label: 'Severe Risk Only', count: currentAnalysis.clauses.filter((c) => c.riskLevel === 'high').length },
          ...(docType === LegalDocumentType.PATENT
            ? [
                { id: 'patent_claims_scope', label: 'Patent Claims & Scope', count: currentAnalysis.clauses.filter((c) => c.category === 'patent_claims_scope').length },
                { id: 'patent_prior_art_enablement', label: 'Prior Art & Enablement', count: currentAnalysis.clauses.filter((c) => c.category === 'patent_prior_art_enablement').length },
                { id: 'patent_inventorship_assignment', label: 'Inventorship & Bayh-Dole', count: currentAnalysis.clauses.filter((c) => c.category === 'patent_inventorship_assignment').length }
              ]
            : docType === LegalDocumentType.WILL
            ? [
                { id: 'testamentary_bequest_estate', label: 'Bequests & Estate Distribution', count: currentAnalysis.clauses.filter((c) => c.category === 'testamentary_bequest_estate').length },
                { id: 'executor_fiduciary_powers', label: 'Executor & Fiduciary Powers', count: currentAnalysis.clauses.filter((c) => c.category === 'executor_fiduciary_powers').length },
                { id: 'no_contest_probate_terms', label: 'No-Contest / In Terrorem', count: currentAnalysis.clauses.filter((c) => c.category === 'no_contest_probate_terms').length }
              ]
            : docType === LegalDocumentType.INCORPORATION
            ? [
                { id: 'corporate_governance_equity', label: 'Corporate Equity & Stock', count: currentAnalysis.clauses.filter((c) => c.category === 'corporate_governance_equity').length },
                { id: 'director_indemnification_liability', label: 'Director Exculpation & Liability', count: currentAnalysis.clauses.filter((c) => c.category === 'director_indemnification_liability').length },
                { id: 'founder_vesting_transfer', label: 'Founder Deadlock & Transfer', count: currentAnalysis.clauses.filter((c) => c.category === 'founder_vesting_transfer').length }
              ]
            : []),
          { id: 'critical_obligations', label: 'Critical Obligations', count: currentAnalysis.clauses.filter((c) => c.category === 'critical_obligations').length },
          { id: 'liabilities_indemnities', label: 'Liabilities & Indemnities', count: currentAnalysis.clauses.filter((c) => c.category === 'liabilities_indemnities').length },
          { id: 'termination_notice', label: 'Termination & Notice', count: currentAnalysis.clauses.filter((c) => c.category === 'termination_notice').length },
          { id: 'dispute_resolution', label: 'Dispute Resolution / Arbitration', count: currentAnalysis.clauses.filter((c) => c.category === 'dispute_resolution').length },
          { id: 'intellectual_property', label: 'Intellectual Property', count: currentAnalysis.clauses.filter((c) => c.category === 'intellectual_property').length },
          { id: 'confidentiality', label: 'Confidentiality', count: currentAnalysis.clauses.filter((c) => c.category === 'confidentiality').length }
        ]
          .filter((tab) => tab.id === 'all' || tab.id === 'high_risk' || (tab.count !== undefined && tab.count > 0))
          .map((tab) => (
          <button
            key={tab.id}
            id={`tab-category-${tab.id}`}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === tab.id
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/60 font-mono">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Dual-Pane Reader on Desktop: Clauses on Left, Full Document Viewer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Clause Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredClauses.length} clause breakdowns</span>
            <span className="italic">Click any clause to highlight in document</span>
          </div>

          {filteredClauses.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No clauses match the current filter.</p>
              <p className="text-xs mt-1">Try switching categories or clearing search keywords.</p>
            </div>
          ) : (
            filteredClauses.map((clause) => (
              <ClauseCard
                key={clause.id}
                clause={clause}
                readingLevel={readingLevel}
                isSelected={selectedClause?.id === clause.id}
                onSelectClause={(c) => setSelectedClause(c)}
              />
            ))
          )}
        </div>

        {/* Right Column: Full Document Viewer with Citation Highlighting */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="bg-slate-950 p-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-white tracking-tight truncate max-w-[200px]">
                  {currentAnalysis.documentTitle}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedClause ? `Focused: ${selectedClause.sectionNumber}` : 'Full Text Stream'}
              </span>
            </div>

            {/* Document Content Pane */}
            <div
              ref={documentViewerRef}
              id="raw-document-viewer-pane"
              className="p-4 overflow-y-auto flex-1 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap space-y-4"
            >
              {currentAnalysis.clauses.map((clause) => {
                const isSelected = selectedClause?.id === clause.id;
                return (
                  <div
                    key={clause.id}
                    data-clause-id={clause.id}
                    onClick={() => setSelectedClause(clause)}
                    className={`p-3 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-teal-950/40 border-teal-500 shadow-md ring-1 ring-teal-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-teal-400 mb-1">
                      <span>{clause.sectionNumber}: {clause.title}</span>
                      <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono ${
                        clause.riskLevel === 'high' ? 'text-rose-400 bg-rose-950/50' : clause.riskLevel === 'moderate' ? 'text-amber-400 bg-amber-950/50' : 'text-emerald-400 bg-emerald-950/50'
                      }`}>
                        {clause.riskLevel}
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      {clause.originalText}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom jump action */}
            {onSwitchToComparator && (
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Comparing with updated terms?</span>
                <button
                  id="btn-jump-to-diff"
                  onClick={onSwitchToComparator}
                  className="flex items-center gap-1 font-semibold text-teal-400 hover:text-teal-300"
                >
                  <span>Launch Contract Diff</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </>
      )}

      {/* PII Redactor Inspector Modal */}
      <PiiInspectorModal
        isOpen={isPiiModalOpen}
        onClose={() => setIsPiiModalOpen(false)}
        rawText={inputText}
        isPiiEnabled={settings.enablePiiRedaction}
      />
    </div>
  );
}
