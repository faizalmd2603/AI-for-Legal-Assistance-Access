import { describe, it, expect } from 'vitest';
import { redactPII, restorePII } from '../utils/redactor';
import { evaluateClauseRisk, compileRiskBreakdown } from '../utils/riskScorer';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { LegalDocumentType } from '../types';

describe('End-to-End Legal Assistance Workflows & Data Pipelines', () => {
  it('Workflow 1: Secure Ingestion with Zero-PII Leakage & Roundtrip Restoration', () => {
    const rawContract = 'This Agreement is between Alice Smith (PAN: ABCDE1234F, Aadhaar: 1234-5678-9012) and Tech Corp.';
    
    // Step 1: Pre-flight redaction
    const redaction = redactPII(rawContract);
    expect(redaction.redactedText).not.toContain('Alice Smith');
    expect(redaction.redactedText).not.toContain('ABCDE1234F');
    expect(redaction.redactedText).not.toContain('1234-5678-9012');
    expect(redaction.redactedText).toContain('[PARTY_1]');
    expect(redaction.redactedText).toContain('[PAN_ID_1]');

    // Step 2: Risk analysis on sanitized text
    const risk = evaluateClauseRisk('Parties & Identification', redaction.redactedText, LegalDocumentType.CONTRACT);
    expect(risk).toBeDefined();

    // Step 3: Reversible unredaction for user local view
    const restored = restorePII(redaction.redactedText, redaction.redactionMap);
    expect(restored).toContain('Alice Smith');
    expect(restored).toContain('ABCDE1234F');
    expect(restored).toContain('1234-5678-9012');
  });

  it('Workflow 2: Side-by-Side Policy/Contract Comparison Pipeline', () => {
    const originalPolicy = 'Client may terminate upon thirty (30) days prior written notice without penalty.';
    const revisedPolicy = 'Vendor may terminate at its sole discretion immediately. Client shall indemnify and hold harmless Vendor against all liabilities and pay liquidated damages.';

    const riskA = evaluateClauseRisk('Termination', originalPolicy, LegalDocumentType.CONTRACT);
    const riskB = evaluateClauseRisk('Termination', revisedPolicy, LegalDocumentType.CONTRACT);

    expect(riskB.score).toBeGreaterThan(riskA.score);
    expect(riskB.flags.length).toBeGreaterThan(riskA.flags.length);
  });

  it('Workflow 3: Multi-Category Legal Document Routing', () => {
    const categories = SAMPLE_DOCUMENTS.map(d => d.documentType);
    expect(categories).toContain(LegalDocumentType.CONTRACT);
    expect(categories).toContain(LegalDocumentType.INDIAN_LAW);
    expect(categories).toContain(LegalDocumentType.PATENT);
    expect(categories).toContain(LegalDocumentType.WILL);
    expect(categories).toContain(LegalDocumentType.INCORPORATION);
  });

  it('Workflow 4: Complete Attorney Action Pack Dossier Generation', () => {
    const sample = SAMPLE_DOCUMENTS[1]; // Indian IT Employment & Service Bond
    expect(sample.precomputedAnalysis).toBeDefined();
    const dossier = sample.precomputedAnalysis!.lawyerDossier;

    expect(dossier.documentTitle).toBeTruthy();
    expect(dossier.keyAmbiguities.length).toBeGreaterThan(0);
    expect(dossier.conflictingClauses.length).toBeGreaterThan(0);
    expect(dossier.factualTimeline.length).toBeGreaterThan(0);
    expect(dossier.targetedQuestions.length).toBeGreaterThan(0);
  });

  it('Workflow 5: Multilingual Vernacular Localization for Non-English Speakers', () => {
    const sample = SAMPLE_DOCUMENTS[0];
    const clauseWithHindi = sample.precomputedAnalysis?.clauses.find(c => c.translations?.hi);
    const clauseWithTamil = sample.precomputedAnalysis?.clauses.find(c => c.translations?.ta);

    expect(clauseWithHindi?.translations?.hi).toBeDefined();
    expect(clauseWithTamil?.translations?.ta).toBeDefined();
  });
});
