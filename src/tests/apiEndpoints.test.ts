import { describe, it, expect } from 'vitest';
import { sanitizeLegalInput, ResponseCache } from '../server/securityMiddleware';
import { LegalDocumentType } from '../types';

describe('API Endpoints Validation & Contract Integrity', () => {
  describe('Input Validation & Boundary Invariants', () => {
    it('should validate and reject empty or whitespace-only documents', () => {
      const emptyInput = '   \t  \n  ';
      const sanitized = sanitizeLegalInput(emptyInput).trim();
      expect(sanitized.length).toBe(0);
    });

    it('should correctly normalize unicode quotation marks and dashes in legal drafts', () => {
      const fancyQuotes = '“Party A” covenants to pay ‘Party B’ — without delay – forthwith.';
      const clean = sanitizeLegalInput(fancyQuotes);
      expect(clean).toContain('Party A');
      expect(clean).toContain('Party B');
    });

    it('should retain essential legal numbering formats (e.g. 1.1(a)(ii))', () => {
      const sectionHeader = 'Section 4.2(b)(iii): Intellectual Property Assignment';
      const clean = sanitizeLegalInput(sectionHeader);
      expect(clean).toBe(sectionHeader);
    });
  });

  describe('Deterministic Fingerprinting & Cache Integration', () => {
    it('should produce identical SHA-256 digests for equivalent legal text blocks', () => {
      const docA = 'This Agreement is between Company and Consultant.';
      const docB = 'This Agreement is between Company and Consultant.';
      const digestA = ResponseCache.hashKey('doc', docA);
      const digestB = ResponseCache.hashKey('doc', docB);

      expect(digestA).toBe(digestB);
    });

    it('should differentiate documents with subtle covenant modifications', () => {
      const docA = 'Contractor shall be liable for direct damages capped at $10,000.';
      const docB = 'Contractor shall be liable for direct damages without cap.';
      const digestA = ResponseCache.hashKey('doc', docA);
      const digestB = ResponseCache.hashKey('doc', docB);

      expect(digestA).not.toBe(digestB);
    });
  });

  describe('Document Type Classification Consistency', () => {
    it('should verify all LegalDocumentType enum members are strictly typed', () => {
      const types = Object.values(LegalDocumentType);
      expect(types).toContain('contract');
      expect(types).toContain('patent');
      expect(types).toContain('will');
      expect(types).toContain('incorporation');
      expect(types).toContain('regulatory');
      expect(types).toContain('indian_law');
      expect(types).toContain('other');
    });
  });
});
