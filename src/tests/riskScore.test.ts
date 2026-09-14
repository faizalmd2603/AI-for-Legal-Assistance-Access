import { describe, it, expect } from 'vitest';
import { calculateRiskLevel, evaluateClauseRisk, compileRiskBreakdown } from '../utils/riskScorer';

describe('Risk Scoring Engine', () => {
  it('should flag uncapped indemnification and liquidated damages as high risk', () => {
    const clauseTitle = 'Indemnification & Penalties';
    const clauseContent = 'Contractor shall defend, indemnify, and hold harmless Company from any claims without financial cap or limitation of liability, and agree to liquidated damages of $25,000.';
    
    const evalResult = evaluateClauseRisk(clauseTitle, clauseContent);
    expect(evalResult.level).toBe('high');
    expect(evalResult.score).toBeGreaterThan(60);
    expect(evalResult.flags.length).toBeGreaterThanOrEqual(1);
  });

  it('should classify benign or balanced clauses as low risk', () => {
    const clauseTitle = 'Standard Notices';
    const clauseContent = 'All notices under this agreement shall be in writing and delivered via email to the addresses specified in the preamble.';
    
    const evalResult = evaluateClauseRisk(clauseTitle, clauseContent);
    expect(evalResult.level).toBe('low');
    expect(evalResult.score).toBeLessThan(38);
  });

  it('should compile an aggregate risk scorecard accurately', () => {
    const mockClauses: any[] = [
      {
        id: '1',
        title: 'Uncapped Indemnity',
        originalText: 'Contractor shall defend and indemnify without cap.',
        riskLevel: 'high',
        riskScore: 90
      },
      {
        id: '2',
        title: 'Auto-Renewal Trap',
        originalText: 'Agreement shall automatically renew for 12 months.',
        riskLevel: 'moderate',
        riskScore: 60
      }
    ];

    const breakdown = compileRiskBreakdown(mockClauses);
    expect(breakdown.overallScore).toBeGreaterThanOrEqual(60);
    expect(breakdown.criticalFlagsCount).toBe(1);
    expect(breakdown.overallRating).toBeDefined();
  });
});
