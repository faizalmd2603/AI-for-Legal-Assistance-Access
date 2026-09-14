import { useState } from 'react';
import { AISettings, ContractComparisonResult } from '../../types';
import { compareContracts } from '../../services/aiService';
import { COMPARISON_SAMPLE_PRESETS } from '../../data/sampleDocuments';
import {
  GitCompare,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  PlusCircle,
  MinusCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  CheckCircle2,
  FileDiff
} from 'lucide-react';

interface ContractComparatorProps {
  settings: AISettings;
}

export function ContractComparator({ settings }: ContractComparatorProps) {
  const [docAName, setDocAName] = useState<string>('Original Version (v1)');
  const [docBName, setDocBName] = useState<string>('Counter-Proposal (v2)');
  const [textA, setTextA] = useState<string>('');
  const [textB, setTextB] = useState<string>('');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<ContractComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = COMPARISON_SAMPLE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setDocAName(preset.docAName);
      setDocBName(preset.docBName);
      setTextA(preset.textA);
      setTextB(preset.textB);
      setComparisonResult(null);
    }
  };

  const handleRunComparison = async () => {
    if (!textA.trim() || !textB.trim()) return;

    setIsLoading(true);
    try {
      const result = await compareContracts(textA, textB, docAName, docBName, settings);
      setComparisonResult(result);
    } catch (err) {
      console.error('Comparison error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setTextA('');
    setTextB('');
    setComparisonResult(null);
  };

  return (
    <div id="contract-comparator-view" className="space-y-6">
      {/* Top Banner & Configuration */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-teal-400" />
              Side-by-Side Contract Diff &amp; Risk Shift Analyzer
            </h2>
            <p className="text-xs text-slate-400">
              Detect subtle clauses inserted by counterparties, uncover surrendered rights, and evaluate risk delta.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1">
              <FileDiff className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <select
                id="select-comparator-preset"
                value={selectedPresetId}
                onChange={(e) => handleSelectPreset(e.target.value)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer max-w-xs"
              >
                <option value="" disabled className="bg-slate-900">Load comparison scenario...</option>
                {COMPARISON_SAMPLE_PRESETS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900">
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {(textA || textB || comparisonResult) && (
              <button
                id="btn-clear-comparator"
                onClick={() => {
                  handleClear();
                  setSelectedPresetId('');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              id="btn-run-diff"
              disabled={isLoading || !textA.trim() || !textB.trim()}
              onClick={handleRunComparison}
              className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                isLoading
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Contract Diff...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Contract Comparison</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dual Input Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Document A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                <input
                  type="text"
                  value={docAName}
                  onChange={(e) => setDocAName(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none border-b border-transparent focus:border-indigo-400"
                  placeholder="Document A Name"
                />
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Original Baseline</span>
            </div>
            <textarea
              id="textarea-doc-a"
              rows={8}
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder="Paste original contract text here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-500 resize-y"
            />
          </div>

          {/* Document B */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-400" />
                <input
                  type="text"
                  value={docBName}
                  onChange={(e) => setDocBName(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none border-b border-transparent focus:border-teal-400"
                  placeholder="Document B Name"
                />
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Counter-Proposal / Revised</span>
            </div>
            <textarea
              id="textarea-doc-b"
              rows={8}
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="Paste modified contract text here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-500 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      {!comparisonResult ? (
        <div id="comparator-ready-state" className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <GitCompare className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-white">No Comparison Run Yet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste Version A and Version B above, then click <strong className="text-teal-400 font-medium">"Run Side-by-Side Diff"</strong> to uncover subtle counterparty revisions, calculate quantitative risk exposure shifts, and detect hidden liabilities.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Executive Risk Shift Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight">Contract Diff Findings</h3>
                  <span className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{comparisonResult.riskShiftScore}% Risk Exposure Shift
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {comparisonResult.summaryOfKeyChanges}
                </p>
              </div>
            </div>

            {/* Rights Surrendered vs Rights Gained */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Rights Surrendered */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-2">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MinusCircle className="w-4 h-4 text-rose-400" />
                  Rights Surrendered by You in Version B:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {comparisonResult.rightsSurrenderedSummary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rights Gained */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Rights Gained / Balanced Terms:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {comparisonResult.rightsGainedSummary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Granular Clause Diff Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Clause-by-Clause Modification Matrix
            </h3>

            {comparisonResult.changes.map((change, idx) => {
              const isAdded = change.type === 'added';
              const isRemoved = change.type === 'removed';
              const isModified = change.type === 'modified';

              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      {isAdded && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <PlusCircle className="w-3 h-3" /> ADDED CLAUSE
                        </span>
                      )}
                      {isRemoved && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                          <MinusCircle className="w-3 h-3" /> REMOVED CLAUSE
                        </span>
                      )}
                      {isModified && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> MODIFIED RISK EXPOSURE
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-white tracking-tight">{change.title}</h4>
                    </div>

                    {change.riskShift && (
                      <span className="text-xs font-mono text-rose-300 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-800/50 self-start sm:self-auto">
                        Shift: {change.riskShift.from} &rarr; {change.riskShift.to}
                      </span>
                    )}
                  </div>

                  {/* Side-by-side snippet comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    {/* Version A */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">
                        {docAName} ({change.sectionA || 'N/A'})
                      </span>
                      <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                        {change.contentA || <span className="italic text-slate-600">[Clause absent in Version A]</span>}
                      </p>
                    </div>

                    {/* Version B */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                        {docBName} ({change.sectionB || 'N/A'})
                      </span>
                      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {change.contentB || <span className="italic text-slate-600">[Clause omitted in Version B]</span>}
                      </p>
                    </div>
                  </div>

                  {/* Commentary Pill */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong className="text-white font-semibold">Practical Legal Implication:</strong>{' '}
                      {change.rightsCommentary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
