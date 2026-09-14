import { describe, it, expect } from 'vitest';
import { cleanExtractedText, countWords } from '../utils/fileExtractor';

describe('File Extraction Helper', () => {
  it('should clean up irregular whitespace, tabs, and excess line breaks', () => {
    const dirty = 'SECTION  1: \t CONFIDENTIALITY\r\n\r\n\r\n\r\nObligations shall survive   indefinitely. ';
    const cleaned = cleanExtractedText(dirty);

    expect(cleaned).not.toContain('\r');
    expect(cleaned).toContain('SECTION 1: CONFIDENTIALITY');
    expect(cleaned).toContain('Obligations shall survive indefinitely.');
  });

  it('should accurately count words in legal paragraphs', () => {
    const legalText = 'This Agreement is entered into by and between Party A and Party B.';
    expect(countWords(legalText)).toBe(13);
    expect(countWords('')).toBe(0);
  });
});
