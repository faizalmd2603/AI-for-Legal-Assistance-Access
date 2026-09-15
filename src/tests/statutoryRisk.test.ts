import { describe, it, expect } from 'vitest';
import { evaluateClauseRisk, calculateRiskLevel, compileRiskBreakdown } from '../utils/riskScorer';
import { LegalDocumentType } from '../types';

describe('Statutory Legal Scorer & Multi-Jurisdictional Frameworks', () => {
  describe('Indian Contract Act 1872 & Commercial Jurisprudence', () => {
    it('should flag post-termination non-compete covenants as critical risk under Section 27 ICA 1872', () => {
      const title = 'Post-Termination Restraint';
      const content = 'Employee covenants that for 24 months post-termination, they shall not directly or indirectly engage in any competing software development business.';
      
      const evalResult = evaluateClauseRisk(title, content, LegalDocumentType.INDIAN_LAW);
      expect(evalResult.level).toBe('high');
      expect(evalResult.score).toBeGreaterThan(65);
      expect(evalResult.flags.some(f => f.includes('Section 27 ICA 1872') || f.includes('Percept'))).toBe(true);
    });

    it('should detect DPDPA 2023 statutory penalties and Data Fiduciary obligations', () => {
      const title = 'Data Principal Processing';
      const content = 'The Data Fiduciary may process personal data and retain records indefinitely without notice, subject to Data Protection Board scrutiny and 250 crore statutory sanctions.';
      
      const evalResult = evaluateClauseRisk(title, content, LegalDocumentType.INDIAN_LAW);
      expect(evalResult.level).toBe('high');
      expect(evalResult.flags.some(f => f.includes('DPDPA 2023') || f.includes('250 Crore'))).toBe(true);
    });

    it('should identify RERA 2016 violations regarding delayed possession and carpet area', () => {
      const title = 'Possession & Handover';
      const content = 'Builder provides delayed possession without interest and specifies super built-up area rather than statutory carpet area.';
      
      const evalResult = evaluateClauseRisk(title, content, LegalDocumentType.INDIAN_LAW);
      expect(evalResult.flags.some(f => f.includes('RERA 2016') || f.includes('carpet area'))).toBe(true);
    });
  });

  describe('Patent Documents & 35 U.S.C. / Indian Patents Act', () => {
    it('should detect Section 3(k) computer programme per se bars under Patents Act 1970', () => {
      const title = 'Claim 1: Algorithmic Pipeline';
      const content = 'A computer programme per se executing an algorithm without specialized industrial hardware.';
      
      const evalResult = evaluateClauseRisk(title, content, LegalDocumentType.PATENT);
      expect(evalResult.flags.some(f => f.includes('Section 3(k)') || f.includes('Patents Act'))).toBe(true);
    });

    it('should flag 35 U.S.C. 112(f) Means-Plus-Function vulnerabilities', () => {
      const title = 'Independent Claim 14';
      const content = 'A system comprising means for receiving encoded video packets and means including a buffer.';
      
      const evalResult = evaluateClauseRisk(title, content, LegalDocumentType.PATENT);
      expect(evalResult.flags.some(f => f.includes('Means-Plus-Function') || f.includes('112(f)'))).toBe(true);
    });
  });

  describe('Wills, Estate Planning & Corporate Incorporation', () => {
    it('should flag In Terrorem / No-Contest forfeiture clauses in testamentary wills', () => {
      const title = 'Contest of Testamentary Disposition';
      const content = 'If any beneficiary under this will contests this will or disputes any distribution, they forfeit all bequest and share in the estate.';
      
      const evalResult = evaluateClauseRisk(title, content, LegalDocumentType.WILL);
      expect(evalResult.level).toBe('high');
      expect(evalResult.flags.some(f => f.includes('In Terrorem') || f.includes('No-Contest'))).toBe(true);
    });

    it('should flag Blank-Check Preferred Stock rights in Corporate Charters', () => {
      const title = 'Article IV: Authorized Capital Stock';
      const content = 'The Board of Directors is authorized to issue blank-check preferred stock in series and designate preferences without shareholder approval.';
      
      const evalResult = evaluateClauseRisk(title, content, LegalDocumentType.INCORPORATION);
      expect(evalResult.level).toBe('high');
      expect(evalResult.flags.some(f => f.includes('Blank-Check Preferred'))).toBe(true);
    });
  });

  describe('Aggregate Scorecard Generation', () => {
    it('should synthesize a multi-dimensional risk breakdown across all document categories', () => {
      const mockIndianClauses: any[] = [
        {
          id: 'c1',
          title: 'Section 27 Non-Compete',
          originalText: 'Shall not engage in competing business for 3 years post separation.',
          riskLevel: 'high',
          riskScore: 85
        },
        {
          id: 'c2',
          title: 'Governing Law',
          originalText: 'Governed by Indian Law and courts in Mumbai.',
          riskLevel: 'low',
          riskScore: 20
        }
      ];

      const scorecard = compileRiskBreakdown(mockIndianClauses, LegalDocumentType.INDIAN_LAW);
      expect(scorecard.overallScore).toBeGreaterThanOrEqual(40);
      expect(scorecard.criticalFlagsCount).toBe(1);
      expect(scorecard.typeDimensions).toBeDefined();
      expect(scorecard.typeDimensions?.length).toBeGreaterThan(0);
    });
  });
});
