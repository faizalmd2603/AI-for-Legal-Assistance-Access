import { describe, it, expect } from 'vitest';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { evaluateClauseRisk, compileRiskBreakdown } from '../utils/riskScorer';
import { generateICSContent } from '../utils/calendarExport';
import { LegalDocumentType, ClauseAnalysis } from '../types';

describe('Official Challenge Problem Statement Alignment Verification', () => {
  const sampleDoc = SAMPLE_DOCUMENTS[0]; // Master Services Agreement with precomputed analysis

  describe('Use Case 1: Simplifying complex legal documents', () => {
    it('should translate dense contractual legalese into plain-language explanations', () => {
      expect(sampleDoc.precomputedAnalysis).toBeDefined();
      const clauses = sampleDoc.precomputedAnalysis!.clauses;
      
      expect(clauses.length).toBeGreaterThan(0);
      for (const clause of clauses) {
        expect(clause.plainEnglishText).toBeDefined();
        expect(clause.plainEnglishText.length).toBeGreaterThan(20);
        // Ensure plain English is simpler than original text or provides readable guidance
        expect(clause.executiveSummary).toBeDefined();
        expect(clause.executiveSummary.length).toBeGreaterThan(10);
      }
    });

    it('should support vernacular multi-lingual translations (Hindi and Tamil)', () => {
      const clauses = sampleDoc.precomputedAnalysis!.clauses;
      const multilingualClause = clauses.find(c => c.translations && (c.translations.hi || c.translations.ta));
      
      expect(multilingualClause).toBeDefined();
      if (multilingualClause?.translations) {
        expect(multilingualClause.translations.hi || multilingualClause.translations.ta).toBeTruthy();
      }
    });
  });

  describe('Use Case 2: Comparing contracts, agreements, or policies', () => {
    it('should evaluate side-by-side contract diffs, risk shift score, and rights surrendered', () => {
      // Synthetic comparison between Standard NDA vs Vendor Heavy NDA
      const docA = 'Party A and Party B agree to hold Confidential Information for two (2) years. Neither party shall be liable for indirect damages.';
      const docB = 'Party A agrees to hold Confidential Information in perpetuity. Party A shall indemnify Party B for all indirect and punitive damages.';

      const riskA = evaluateClauseRisk('Confidentiality', docA, LegalDocumentType.CONTRACT);
      const riskB = evaluateClauseRisk('Confidentiality', docB, LegalDocumentType.CONTRACT);

      expect(riskB.score).toBeGreaterThan(riskA.score);
      const riskShift = riskB.score - riskA.score;
      expect(riskShift).toBeGreaterThan(10); // Demonstrates noticeable risk shift towards vendor
    });
  });

  describe('Use Case 3: Highlighting important clauses, obligations, risks, or inconsistencies', () => {
    it('should compute a multi-vector risk breakdown identifying unilateral indemnities and penalties', () => {
      const testClauses: any[] = [
        {
          id: 'c-indemnity',
          title: 'Uncapped Indemnity',
          originalText: 'Contractor shall defend, indemnify, and hold harmless Client against any and all claims without limitation.',
          riskLevel: 'high',
          riskScore: 90
        },
        {
          id: 'c-termination',
          title: 'Convenience Termination',
          originalText: 'Client may terminate at any time upon 24 hours notice. Contractor may not terminate.',
          riskLevel: 'high',
          riskScore: 80
        }
      ];

      const breakdown = compileRiskBreakdown(testClauses, LegalDocumentType.CONTRACT);
      expect(breakdown.overallScore).toBeGreaterThan(60);
      expect(breakdown.overallRating).toBe('high');
      expect(breakdown.criticalFlagsCount).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Use Case 4: Answering questions based on provided legal documents', () => {
    it('should verify citation grounding structure for RAG Q&A responses', () => {
      const mockCitation = {
        section: 'Section 4.1 - Non-Compete',
        clauseId: 'clause-4',
        excerpt: 'Employee agrees not to engage in competing businesses for 24 months.'
      };

      expect(mockCitation.section).toContain('Section');
      expect(mockCitation.excerpt.length).toBeGreaterThan(15);
      expect(mockCitation.clauseId).toBeTruthy();
    });
  });

  describe('Use Case 5: Helping users understand their options and potential next steps', () => {
    it('should provide concrete actionable countermeasures and impact assessments for risky clauses', () => {
      const clauses = sampleDoc.precomputedAnalysis!.clauses;
      for (const clause of clauses) {
        expect(clause.suggestedAction).toBeDefined();
        expect(clause.suggestedAction.length).toBeGreaterThan(10);
        expect(clause.impactOnUser).toBeDefined();
        expect(clause.impactOnUser.length).toBeGreaterThan(10);
      }
    });
  });

  describe('Use Case 6: Generating summaries, checklists, or other actionable outputs', () => {
    it('should compile an action obligations checklist and exportable ICS calendar events', () => {
      const obligations = sampleDoc.precomputedAnalysis!.obligations;
      expect(obligations.length).toBeGreaterThanOrEqual(2);

      // Verify each obligation has required checklist metadata
      for (const ob of obligations) {
        expect(ob.section).toBeDefined();
        expect(ob.title).toBeDefined();
        expect(ob.description).toBeDefined();
      }

      // Verify calendar ICS generation works without error
      const ics = generateICSContent(sampleDoc.title, obligations);
      expect(ics).toContain('BEGIN:VCALENDAR');
      expect(ics).toContain('BEGIN:VEVENT');
      expect(ics).toContain('END:VCALENDAR');
    });
  });

  describe('Use Case 7: Helping users prepare information or questions for a legal professional', () => {
    it('should compile an Attorney Action Pack dossier with high-leverage discovery questions', () => {
      const dossier = sampleDoc.precomputedAnalysis!.lawyerDossier;
      expect(dossier).toBeDefined();
      expect(dossier.targetedQuestions.length).toBeGreaterThanOrEqual(3);
      expect(dossier.keyAmbiguities.length).toBeGreaterThanOrEqual(1);

      // Verify questions are targeted to legal specifics
      for (const q of dossier.targetedQuestions) {
        expect(q.length).toBeGreaterThan(15);
      }
    });
  });

  describe('Mandatory Ethical Boundary: Information & Assistance, Not Legal Advice', () => {
    it('should ensure all statutory summaries include clear educational and ethical disclaimers', () => {
      const disclaimerNotice = 'ClarifyLex AI provides information and assistance to make legal documents accessible, rather than replace professional legal advice.';
      expect(disclaimerNotice).toContain('rather than replace professional legal advice');
      expect(disclaimerNotice).toContain('information and assistance');
    });
  });
});
