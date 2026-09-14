import { useState } from 'react';
import { LegalDocumentType, RiskBreakdown } from '../../types';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Zap,
  RotateCcw,
  Scale,
  DollarSign,
  Cpu,
  BookOpen,
  Building2,
  FileCheck,
  CheckCircle2,
  Landmark
} from 'lucide-react';

interface RiskRadarScorecardProps {
  breakdown: RiskBreakdown;
  documentTitle: string;
}

export function RiskRadarScorecard({ breakdown, documentTitle }: RiskRadarScorecardProps) {
  const {
    overallScore,
    overallRating,
    unilateralObligationsScore,
    harshIndemnitiesScore,
    liquidatedDamagesScore,
    autoRenewalTrapScore,
    criticalFlagsCount,
    summary,
    documentType,
    typeDimensions
  } = breakdown;

  const hasTypeDimensions = Boolean(typeDimensions && typeDimensions.length > 0);
  const [activeDimensionView, setActiveDimensionView] = useState<'domain' | 'standard'>(
    hasTypeDimensions ? 'domain' : 'standard'
  );

  const getScoreColor = (score: number) => {
    if (score >= 68) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (score >= 38) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  const getBarColor = (score: number) => {
    if (score >= 68) return 'bg-rose-500';
    if (score >= 38) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStatusBadge = (status: 'good' | 'warning' | 'critical' | 'safe') => {
    if (status === 'critical') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-300 uppercase">
          <ShieldAlert className="w-3 h-3 text-rose-400" />
          Critical Exposure
        </span>
      );
    }
    if (status === 'warning') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-300 uppercase">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          Caution
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 uppercase">
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        Protected
      </span>
    );
  };

  const getDocTypeIcon = (type?: LegalDocumentType) => {
    switch (type) {
      case LegalDocumentType.INDIAN_LAW:
        return <Landmark className="w-4 h-4 text-amber-400" />;
      case LegalDocumentType.PATENT:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case LegalDocumentType.WILL:
        return <BookOpen className="w-4 h-4 text-violet-400" />;
      case LegalDocumentType.INCORPORATION:
        return <Building2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <FileCheck className="w-4 h-4 text-teal-400" />;
    }
  };

  const getDocTypeLabel = (type?: LegalDocumentType) => {
    switch (type) {
      case LegalDocumentType.INDIAN_LAW:
        return 'Indian Statutory & Regulatory Vectors';
      case LegalDocumentType.PATENT:
        return 'Patent & IP Vectors';
      case LegalDocumentType.WILL:
        return 'Testamentary & Estate Vectors';
      case LegalDocumentType.INCORPORATION:
        return 'Corporate Governance & Equity Vectors';
      default:
        return 'Domain Risk Vectors';
    }
  };

  return (
    <div
      id="risk-radar-scorecard"
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden text-slate-100"
    >
      {/* Top Title & Overall badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              {getDocTypeIcon(documentType)}
              Legal Risk Radar
            </h3>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${getScoreColor(overallScore)}`}>
              {overallRating} Risk ({overallScore}/100)
            </span>
            {documentType && (
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {documentType.replace('_', ' ')}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 truncate max-w-md mt-0.5">
            Document: <span className="text-slate-200 font-medium">{documentTitle}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {hasTypeDimensions && (
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
              <button
                id="btn-radar-domain-view"
                onClick={() => setActiveDimensionView('domain')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeDimensionView === 'domain'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Domain Vectors
              </button>
              <button
                id="btn-radar-standard-view"
                onClick={() => setActiveDimensionView('standard')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeDimensionView === 'standard'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Contract Fundamentals
              </button>
            </div>
          )}

          {criticalFlagsCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{criticalFlagsCount} Severe Risk Items</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Big Circular Dial + Metric Sub-Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/50 border border-slate-800/60 rounded-xl self-stretch justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-800 fill-none"
                strokeWidth="10"
              />
              {/* Progress ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className={`fill-none transition-all duration-1000 ease-out ${
                  overallScore >= 68 ? 'stroke-rose-500' : overallScore >= 38 ? 'stroke-amber-500' : 'stroke-emerald-500'
                }`}
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * overallScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">{overallScore}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Index</span>
            </div>
          </div>
          <span className="text-xs text-slate-300 font-medium mt-3 text-center">
            {overallScore >= 68 ? 'Critical Legal Exposure — High Caution' : overallScore >= 38 ? 'Notable Imbalances or Ambiguities' : 'Standard Balanced Provisions'}
          </span>
          <span className="text-[11px] text-slate-500 text-center mt-1">
            Calculated across weighted statutory and contractual risk vectors
          </span>
        </div>

        {/* Sub-Bars: Either Domain-Specific Dimensions or Standard Fundamentals */}
        <div className="lg:col-span-8 space-y-3.5">
          {activeDimensionView === 'domain' && hasTypeDimensions ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800/60">
                <span className="font-semibold text-slate-300">{getDocTypeLabel(documentType)}</span>
                <span>Sub-scores (0 = Safe, 100 = Critical)</span>
              </div>
              {typeDimensions?.map((dim) => (
                <div key={dim.key} className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-200 font-medium">{dim.label}</span>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(dim.status)}
                      <span className="font-mono text-slate-200 font-bold text-xs">{dim.score}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getBarColor(dim.score)}`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{dim.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3.5">
              {/* Unilateral Obligations */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <Scale className="w-3.5 h-3.5 text-indigo-400" />
                    Unilateral Obligations &amp; Discretion
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">{unilateralObligationsScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(unilateralObligationsScore)}`}
                    style={{ width: `${unilateralObligationsScore}%` }}
                  />
                </div>
              </div>

              {/* Harsh Indemnities */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    Uncapped / Harsh Indemnities
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">{harshIndemnitiesScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(harshIndemnitiesScore)}`}
                    style={{ width: `${harshIndemnitiesScore}%` }}
                  />
                </div>
              </div>

              {/* Liquidated Damages */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    Liquidated Damages &amp; Penalty Clauses
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">{liquidatedDamagesScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(liquidatedDamagesScore)}`}
                    style={{ width: `${liquidatedDamagesScore}%` }}
                  />
                </div>
              </div>

              {/* Auto-Renewal Traps */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
                    Auto-Renewal Traps &amp; Short Notice Windows
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">{autoRenewalTrapScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(autoRenewalTrapScore)}`}
                    style={{ width: `${autoRenewalTrapScore}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary card */}
      <div className="mt-4 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
        <Zap className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white font-semibold">AI Risk Summary:</strong> {summary}
        </p>
      </div>
    </div>
  );
}
