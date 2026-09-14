import React, { useState, useEffect } from 'react';
import { ClauseAnalysis, ReadingLevel } from '../../types';
import { speechService, SpeechState } from '../../services/speechService';
import {
  Volume2,
  VolumeX,
  Languages,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ClauseCardProps {
  key?: string;
  clause: ClauseAnalysis;
  readingLevel: ReadingLevel;
  isSelected?: boolean;
  onSelectClause: (clause: ClauseAnalysis) => void;
}

function sanitizeForSpeech(text: string): string {
  if (!text) return '';
  return text
    .replace(/\[(?:Hindi|Spanish|Tamil):[^\]]+\]/gi, '')
    .replace(/%PDF[^\s]+/gi, '')
    .replace(/\/[A-Za-z0-9]+/g, ' ')
    .replace(/<<|>>/g, ' ')
    .replace(/[*_#`~]/g, '')
    .replace(/[^\w\s.,!?'"()-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function ClauseCard({
  clause,
  readingLevel,
  isSelected = false,
  onSelectClause
}: ClauseCardProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [speechStatus, setSpeechStatus] = useState<SpeechState>({
    isPlaying: false,
    isPaused: false,
    currentText: ''
  });

  useEffect(() => {
    return speechService.subscribe((state) => {
      setSpeechStatus(state);
    });
  }, []);

  const getRiskBadge = (level: string, score: number) => {
    if (level === 'high') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
          <AlertCircle className="w-3 h-3" />
          High Risk ({score}%)
        </span>
      );
    }
    if (level === 'moderate') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
          <AlertCircle className="w-3 h-3" />
          Moderate Risk ({score}%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
        <CheckCircle2 className="w-3 h-3" />
        Low Risk ({score}%)
      </span>
    );
  };

  // Get active text based on reading level and vernacular translation
  const getDisplayText = () => {
    if (selectedLanguage !== 'en' && clause.translations?.[selectedLanguage]) {
      return clause.translations[selectedLanguage];
    }
    if (readingLevel === 'original') return clause.originalText;
    if (readingLevel === 'executive') return clause.executiveSummary;
    return clause.plainEnglishText;
  };

  const displayText = getDisplayText();
  const cleanSpeechText = sanitizeForSpeech(displayText);
  const isCurrentlySpeakingThis = speechStatus.isPlaying && speechStatus.currentText === cleanSpeechText;

  const handleToggleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentlySpeakingThis) {
      speechService.stop();
    } else {
      speechService.speak(cleanSpeechText, selectedLanguage, 1.0);
    }
  };

  return (
    <div
      id={`clause-card-${clause.id}`}
      onClick={() => onSelectClause(clause)}
      className={`rounded-2xl border transition-all cursor-pointer p-4 sm:p-5 relative ${
        isSelected
          ? 'bg-slate-800/90 border-teal-500/70 shadow-lg shadow-teal-950/40 ring-1 ring-teal-500/30'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
            {clause.sectionNumber}
          </span>
          {clause.domainTag && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {clause.domainTag}
            </span>
          )}
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">{clause.title}</h4>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {getRiskBadge(clause.riskLevel, clause.riskScore)}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            aria-label={isExpanded ? 'Collapse clause details' : 'Expand clause details'}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main explanation content */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
            {readingLevel === 'plain'
              ? 'Plain English (8th Grade Level)'
              : readingLevel === 'executive'
              ? 'Executive Commercial Summary'
              : 'Original Legal Text'}
          </span>

          {/* Controls: Audio TTS & Language Switcher */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {/* Vernacular Language select */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300">
              <Languages className="w-3 h-3 text-teal-400" />
              <select
                id={`select-lang-${clause.id}`}
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-200"
              >
                <option value="en" className="bg-slate-900">English</option>
                <option value="hi" className="bg-slate-900">हिन्दी (Hindi)</option>
                <option value="es" className="bg-slate-900">Español</option>
                <option value="ta" className="bg-slate-900">தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* In-browser Web Speech API audio button */}
            <button
              id={`btn-tts-${clause.id}`}
              onClick={handleToggleSpeech}
              title={isCurrentlySpeakingThis ? 'Stop Audio' : 'Listen to Explanation (Audio TTS)'}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                isCurrentlySpeakingThis
                  ? 'bg-teal-500 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {isCurrentlySpeakingThis ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Listen</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p
          className={`text-sm leading-relaxed ${
            readingLevel === 'original'
              ? 'font-mono text-slate-300 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80 whitespace-pre-wrap'
              : 'text-slate-200 font-normal'
          }`}
        >
          {displayText}
        </p>
      </div>

      {/* Collapsible deep dive: Impact & Lawyer Questions */}
      {isExpanded && (
        <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs">
          {/* Real World Impact */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="font-semibold text-teal-300 block mb-1">What this means for you:</span>
            <p className="text-slate-300 leading-relaxed">{clause.impactOnUser}</p>
          </div>

          {/* Risk Reasons */}
          {clause.riskReasons && clause.riskReasons.length > 0 && (
            <div className="space-y-1">
              <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider block">
                Identified Risk Factors:
              </span>
              <ul className="space-y-1">
                {clause.riskReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-rose-400 font-bold">&bull;</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Lawyer Question */}
          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-indigo-200 block mb-0.5">Recommended Attorney Question:</span>
              <p className="text-slate-300 italic">{clause.questionForLawyer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
