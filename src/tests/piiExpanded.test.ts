import { describe, it, expect } from 'vitest';
import { redactPII, restorePII } from '../utils/redactor';

describe('Comprehensive Statutory PII Redaction & Restoration', () => {
  it('should redact Indian Permanent Account Number (PAN)', () => {
    const text = 'The Tax Deducted at Source certificate for Mr. Rajesh Kumar is linked to PAN ABCDE1234F.';
    const result = redactPII(text);

    expect(result.redactedText).not.toContain('ABCDE1234F');
    expect(result.redactedText).toContain('[PAN_ID_1]');
    expect(result.counts.bankGovIds).toBeGreaterThanOrEqual(1);

    const restored = restorePII(result.redactedText, result.redactionMap);
    expect(restored).toBe(text);
  });

  it('should redact Indian Aadhaar 12-digit number formats', () => {
    const text = 'Identity verification completed via Aadhaar card number 4512 8934 1092 in accordance with regulations.';
    const result = redactPII(text);

    expect(result.redactedText).not.toContain('4512 8934 1092');
    expect(result.redactedText).toContain('[AADHAAR_ID_1]');

    const restored = restorePII(result.redactedText, result.redactionMap);
    expect(restored).toBe(text);
  });

  it('should redact Credit/Debit Card numbers and Bank IFSC codes', () => {
    const text = 'Settlement shall be remitted to IFSC code HDFC0001234 or billed to corporate Visa 4111-2222-3333-4444.';
    const result = redactPII(text);

    expect(result.redactedText).not.toContain('HDFC0001234');
    expect(result.redactedText).not.toContain('4111-2222-3333-4444');
    expect(result.redactedText).toContain('[IFSC_CODE_1]');
    expect(result.redactedText).toContain('[PAYMENT_CARD_1]');

    const restored = restorePII(result.redactedText, result.redactionMap);
    expect(restored).toBe(text);
  });

  it('should redact multi-entity contracts with combined PII attributes without data loss', () => {
    const legalDoc = `This Non-Disclosure Agreement is entered into by and between Alice Morgan, residing at 742 Evergreen Terrace, Springfield, IL 62704, email alice.m@innovations.io, phone 312-555-0198, PAN BSKPM8891G, and TechCorp LLC.`;
    
    const result = redactPII(legalDoc);

    // Verify all sensitive elements are shielded
    expect(result.redactedText).not.toContain('alice.m@innovations.io');
    expect(result.redactedText).not.toContain('312-555-0198');
    expect(result.redactedText).not.toContain('BSKPM8891G');
    expect(result.redactedText).not.toContain('742 Evergreen Terrace');

    expect(result.counts.total).toBeGreaterThanOrEqual(4);

    // Verify 100% loss-free roundtrip reconstruction
    const restored = restorePII(result.redactedText, result.redactionMap);
    expect(restored).toBe(legalDoc);
  });
});
