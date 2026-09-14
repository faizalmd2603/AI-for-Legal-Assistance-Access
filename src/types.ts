export type RiskLevel = 'low' | 'moderate' | 'high';

export type ReadingLevel = 'plain' | 'executive' | 'original';

export enum LegalDocumentType {
  CONTRACT = 'contract',
  PATENT = 'patent',
  WILL = 'will',
  INCORPORATION = 'incorporation',
  REGULATORY = 'regulatory',
  INDIAN_LAW = 'indian_law',
  OTHER = 'other',
}

export type ClauseCategory =
  // General Commercial Contracts & Agreements
  | 'critical_obligations'
  | 'liabilities_indemnities'
  | 'termination_notice'
  | 'dispute_resolution'
  | 'intellectual_property'
  | 'confidentiality'
  // Patent Documents (Applications, Claims & Specifications)
  | 'patent_claims_scope'
  | 'patent_prior_art_enablement'
  | 'patent_inventorship_assignment'
  // Wills & Estate Planning Documents
  | 'testamentary_bequest_estate'
  | 'executor_fiduciary_powers'
  | 'no_contest_probate_terms'
  // Incorporation & Corporate Formation Documents
  | 'corporate_governance_equity'
  | 'founder_vesting_transfer'
  | 'director_indemnification_liability'
  // Indian Statutory & Regulatory Dimensions
  | 'indian_statutory_compliance'
  | 'dpdpa_data_protection'
  | 'rera_consumer_protection'
  | 'restraint_of_trade_sec27'
  | 'bns_criminal_liability'
  | 'arbitration_stamp_duty';

export interface ClauseAnalysis {
  id: string;
  sectionNumber: string;
  title: string;
  category: ClauseCategory;
  riskLevel: RiskLevel;
  riskScore: number; // 0-100
  originalText: string;
  plainEnglishText: string;
  executiveSummary: string;
  riskReasons: string[];
  impactOnUser: string;
  suggestedAction: string;
  questionForLawyer: string;
  deadlinesOrNotices?: string;
  translations?: Record<string, string>; // language code -> translated plain summary
  domainTag?: string; // e.g., "Independent Claim 1", "Residuary Clause", "Blank-Check Preferred"
}

export interface TypeSpecificRiskDimension {
  key: string;
  label: string;
  score: number; // 0-100
  weight?: number;
  status: 'safe' | 'warning' | 'critical';
  description: string;
}

export interface RiskBreakdown {
  overallScore: number; // 0-100
  overallRating: RiskLevel;
  unilateralObligationsScore: number;
  harshIndemnitiesScore: number;
  liquidatedDamagesScore: number;
  autoRenewalTrapScore: number;
  criticalFlagsCount: number;
  summary: string;
  documentType?: LegalDocumentType;
  typeDimensions?: TypeSpecificRiskDimension[];
}

export interface DocumentTypeDetails {
  detectedType: LegalDocumentType;
  subtype: string; // e.g. "Utility Patent Application", "Last Will and Testament", "Certificate of Incorporation (Delaware C-Corp)", "Commercial Agreement"
  jurisdictionOrOffice?: string; // e.g. "USPTO / Patent Office", "Probate Court (County)", "Delaware Division of Corporations", "State / Federal Courts"
  filingOrRegistrationDeadline?: string;
  keyPartiesOrRoles: {
    role: string; // e.g. "Inventor", "Testator", "Executor", "Incorporator", "Disclosing Party"
    name: string;
    nameOrEntity?: string;
  }[];
  domainSpecificChecklist: {
    item: string;
    status: 'pass' | 'warning' | 'alert';
    note: string;
    recommendation?: string;
  }[];
}

export interface ActionObligation {
  id: string;
  clauseId: string;
  section: string;
  title: string;
  description: string;
  dueDateStr?: string;
  noticeDays?: number;
  penaltyWarning?: string;
  completed: boolean;
}

export interface LawyerDossier {
  documentTitle: string;
  clientNamePlaceholder: string;
  keyAmbiguities: string[];
  conflictingClauses: string[];
  factualTimeline: {
    event: string;
    triggerCondition: string;
    sectionRef: string;
  }[];
  targetedQuestions: string[];
}

export interface DocumentAnalysisResult {
  documentId: string;
  documentTitle: string;
  documentType?: LegalDocumentType;
  documentTypeMetadata?: DocumentTypeDetails;
  wordCount: number;
  rawText: string;
  redactedText: string;
  piiRedacted: boolean;
  redactionMap: Record<string, string>;
  riskBreakdown: RiskBreakdown;
  clauses: ClauseAnalysis[];
  obligations: ActionObligation[];
  lawyerDossier: LawyerDossier;
  analyzedAt: string;
  extractedDocumentText?: string;
  isHeuristicFallback?: boolean;
}

export interface DiffClauseChange {
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  sectionA?: string;
  sectionB?: string;
  title: string;
  contentA?: string;
  contentB?: string;
  riskShift?: {
    from: RiskLevel;
    to: RiskLevel;
    explanation: string;
  };
  rightsCommentary: string;
}

export interface ContractComparisonResult {
  docAName: string;
  docBName: string;
  summaryOfKeyChanges: string;
  rightsSurrenderedSummary: string[];
  rightsGainedSummary: string[];
  riskShiftScore: number; // -100 to +100
  changes: DiffClauseChange[];
}

export interface ChatCitation {
  section: string;
  clauseId: string;
  excerpt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: ChatCitation[];
  groundedQuote?: string;
}

export interface AISettings {
  preferredProvider: 'gemini' | 'groq' | 'auto';
  geminiApiKey: string;
  geminiModel: 'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-3.1-flash-lite';
  groqApiKey: string;
  groqModel: string;
  enablePiiRedaction: boolean;
  isDemoMode?: boolean;
  temperature?: number;
}

export interface SyntheticDocumentTemplate {
  id: string;
  title: string;
  category: string;
  documentType: LegalDocumentType;
  subtype?: string;
  description: string;
  rawText: string;
  precomputedAnalysis?: DocumentAnalysisResult;
}

export type SampleDocument = SyntheticDocumentTemplate;
