import { describe, it, expect } from 'vitest';
import { redactPII, restorePII } from '../utils/redactor';

describe('PII Redaction Engine', () => {
  it('should sanitize emails, phone numbers, and street addresses', () => {
    const input = 'Please contact Samantha Brooks at samantha@example.com or call (555) 234-5678 regarding 1408 Willow Creek Way, Suite 4B.';
    const result = redactPII(input);

    expect(result.redactedText).not.toContain('samantha@example.com');
    expect(result.redactedText).not.toContain('(555) 234-5678');
    expect(result.redactedText).toContain('[EMAIL_1]');
    expect(result.redactedText).toContain('[PHONE_1]');
    expect(result.counts.emails).toBe(1);
    expect(result.counts.phones).toBe(1);
    expect(result.counts.total).toBeGreaterThanOrEqual(2);
  });

  it('should accurately restore redacted tokens back to original values', () => {
    const input = 'Send notices to john.doe@apexlegal.org or dial 1-800-555-0199.';
    const result = redactPII(input);
    const restored = restorePII(result.redactedText, result.redactionMap);

    expect(restored).toBe(input);
  });

  it('should handle empty or null string gracefully without throwing', () => {
    const result = redactPII('');
    expect(result.redactedText).toBe('');
    expect(result.counts.total).toBe(0);
  });
});
