import { useState } from 'react';
import { ActionObligation, DocumentAnalysisResult, LawyerDossier } from '../../types';
import { downloadICSFile } from '../../utils/calendarExport';
import {
  Briefcase,
  Calendar,
  Download,
  Printer,
  CheckCircle2,
  Circle,
  HelpCircle,
  AlertTriangle,
  Clock,
  FileCheck,
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface ActionPackDossierProps {
  currentAnalysis: DocumentAnalysisResult | null;
  onNavigateToAnalyzer?: () => void;
}

export function ActionPackDossier({ currentAnalysis, onNavigateToAnalyzer }: ActionPackDossierProps) {
  if (!currentAnalysis) {
    return (
      <div id="action-pack-empty" className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <Briefcase className="w-7 h-7" />
        </div>
        <div className="max-w-md mx-auto space-y-1.5">
          <h3 className="text-base font-bold text-white">No Consultation Dossier Ready</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Analyze a legal document or select a template from the Synthetic Document Library to generate a customized Lawyer Consultation Briefing Pack with negotiation leverage questions and calendar deadline exports.
          </p>
        </div>
        {onNavigateToAnalyzer && (
          <div className="pt-2">
            <button
              id="btn-dossier-go-to-analyzer"
              onClick={onNavigateToAnalyzer}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer"
            >
              Go to Document Ingestion
            </button>
          </div>
        )}
      </div>
    );
  }

  const { lawyerDossier, obligations, documentTitle } = currentAnalysis;
  const [localObligations, setLocalObligations] = useState<ActionObligation[]>(obligations || []);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleObligation = (id: string) => {
    setLocalObligations((prev) =>
      prev.map((ob) => (ob.id === id ? { ...ob, completed: !ob.completed } : ob))
    );
  };

  const handleDownloadCalendar = () => {
    downloadICSFile(localObligations, documentTitle);
  };

  const generateMarkdownDossier = (): string => {
    return `# ClarifyLex AI — Lawyer Consultation Dossier & Briefing Pack
**Document Analyzed:** ${documentTitle}
**Date Generated:** ${new Date().toLocaleDateString()}
**Notice:** Informational compilation prepared for legal consultation. Not formal legal advice.

---

## 1. Key Identified Ambiguities
${lawyerDossier.keyAmbiguities.map((a, i) => `${i + 1}. ${a}`).join('\n')}

---

## 2. Conflicting or Problematic Clauses
${lawyerDossier.conflictingClauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}

---

## 3. Factual Timeline & Obligation Triggers
${lawyerDossier.factualTimeline.map((t) => `- **${t.event}**: ${t.triggerCondition} (Ref: ${t.sectionRef})`).join('\n')}

---

## 4. Top 5 Targeted Questions to Ask Your Attorney
${lawyerDossier.targetedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

---

## 5. Action Obligations & Deadlines
${localObligations.map((o) => `- [${o.completed ? 'X' : ' '}] **${o.section} - ${o.title}**: ${o.description} (Notice: ${o.noticeDays ? `${o.noticeDays} days` : 'Immediate'}) | Warning: ${o.penaltyWarning || 'N/A'}`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownDossier());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="lawyer-action-pack-view" className="space-y-6">
      {/* Top Banner & Export Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-teal-400" />
              Attorney Consultation Dossier &amp; Action Pack
            </h2>
            <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              Ready for Consultation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Empower yourself with precise questions, ambiguity breakdowns, and calendar-synced deadlines for your attorney consultation.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-export-calendar-ics"
            onClick={handleDownloadCalendar}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-colors shadow-sm cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>Download .ICS Calendar</span>
          </button>

          <button
            id="btn-copy-dossier-markdown"
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-colors shadow-sm cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Dossier (MD)'}</span>
          </button>

          <button
            id="btn-print-dossier"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-xs font-semibold text-white shadow-lg shadow-teal-950/50 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Export</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Column (Lawyer Dossier), Right Column (Action Obligations Checklist) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lawyer Briefing Pack */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top 5 Targeted Attorney Questions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Top 5 Targeted Questions to Ask Your Attorney
                </h3>
                <p className="text-[11px] text-slate-400">
                  Save hours and legal consultation fees with focused inquiries
                </p>
              </div>
            </div>

            <ol className="space-y-2.5 pt-1">
              {lawyerDossier.targetedQuestions.map((q, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{q}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Key Ambiguities & Conflicts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Contractual Ambiguities Identified
                </h4>
              </div>
              <ul className="space-y-2">
                {lawyerDossier.keyAmbiguities.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-amber-400 font-bold">&bull;</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="w-4 h-4 text-rose-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Conflicting or Unbalanced Provisions
                </h4>
              </div>
              <ul className="space-y-2">
                {lawyerDossier.conflictingClauses.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-rose-400 font-bold">&bull;</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Factual Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Factual Timeline of Trigger Events
              </h3>
            </div>

            <div className="space-y-2">
              {lawyerDossier.factualTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-200 block">{item.event}</span>
                    <span className="text-slate-400 text-[11px]">{item.triggerCondition}</span>
                  </div>
                  <span className="font-mono text-teal-400 text-[11px] bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    {item.sectionRef}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actionable Obligations & Calendar Checklist */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Obligations &amp; Deadlines Checklist
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {localObligations.filter((o) => o.completed).length} / {localObligations.length} Completed
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Track notice periods, cure windows, and renewal cutoffs to prevent default penalties.
            </p>

            {/* Checklist Items */}
            <div className="space-y-2.5">
              {localObligations.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No specific calendar obligations found.</p>
              ) : (
                localObligations.map((ob) => (
                  <div
                    key={ob.id}
                    onClick={() => toggleObligation(ob.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      ob.completed
                        ? 'bg-slate-950/40 border-slate-800 text-slate-500 line-through'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 text-teal-400 shrink-0">
                        {ob.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-slate-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 hover:text-teal-400" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 px-1.5 py-0.2 rounded border border-teal-500/20">
                            {ob.section}
                          </span>
                          <h4 className="text-xs font-bold text-white">{ob.title}</h4>
                        </div>

                        <p className="text-xs text-slate-300 font-sans leading-relaxed">{ob.description}</p>

                        <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                          {ob.noticeDays && (
                            <span className="flex items-center gap-1 font-mono text-amber-300">
                              <Clock className="w-3 h-3" />
                              {ob.noticeDays} days advance notice
                            </span>
                          )}
                          {ob.penaltyWarning && (
                            <span className="text-rose-400 font-medium">
                              Warning: {ob.penaltyWarning}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick sync button */}
            <button
              id="btn-sync-all-to-calendar"
              onClick={handleDownloadCalendar}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-950/40 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export {localObligations.length} Deadlines to Apple/Google Calendar (.ics)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
