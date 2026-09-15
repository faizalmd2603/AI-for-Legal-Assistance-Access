/**
 * Client-Side PII (Personally Identifiable Information) Redaction Engine
 * Sanitizes sensitive personal identifying information before dispatching payloads
 * to LLMs or external processing pipelines.
 */

export interface RedactionResult {
  redactedText: string;
  originalText: string;
  redactionMap: Record<string, string>; // e.g. "[PERSON_1]" -> "Johnathan Davis"
  reverseMap: Record<string, string>;   // e.g. "Johnathan Davis" -> "[PERSON_1]"
  counts: {
    emails: number;
    phones: number;
    addresses: number;
    ssnTaxIds: number;
    names: number;
    financialCards?: number;
    bankGovIds?: number;
    total: number;
  };
}

// Common honorifics and legal party designators
const NAME_PREFIXES = [
  'Mr\\.',
  'Ms\\.',
  'Mrs\\.',
  'Dr\\.',
  'Attorney',
  'Tenant',
  'Landlord',
  'Consultant',
  'Employee',
  'Employer',
  'Contractor',
  'Client'
];

export function redactPII(text: string): RedactionResult {
  if (!text || typeof text !== 'string') {
    return {
      redactedText: '',
      originalText: '',
      redactionMap: {},
      reverseMap: {},
      counts: { emails: 0, phones: 0, addresses: 0, ssnTaxIds: 0, names: 0, total: 0 }
    };
  }

  let redacted = text;
  const redactionMap: Record<string, string> = {};
  const reverseMap: Record<string, string> = {};

  const counts = {
    emails: 0,
    phones: 0,
    addresses: 0,
    ssnTaxIds: 0,
    names: 0,
    financialCards: 0,
    bankGovIds: 0,
    total: 0
  };

  const registerToken = (token: string, original: string) => {
    redactionMap[token] = original;
    reverseMap[original] = token;
  };

  let panCount = 0;
  let aadhaarCount = 0;
  let ifscCount = 0;
  let cardCount = 0;

  // 1. Redact Emails
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  redacted = redacted.replace(emailRegex, (match) => {
    if (reverseMap[match]) return reverseMap[match];
    counts.emails++;
    counts.total++;
    const token = `[EMAIL_${counts.emails}]`;
    registerToken(token, match);
    return token;
  });

  // 2. Redact Social Security Numbers & US Tax/EIN IDs
  const ssnRegex = /\b(?:\d{3}-\d{2}-\d{4}|\d{2}-\d{7})\b/g;
  redacted = redacted.replace(ssnRegex, (match) => {
    if (reverseMap[match]) return reverseMap[match];
    counts.ssnTaxIds++;
    counts.total++;
    const token = `[TAX_ID_${counts.ssnTaxIds}]`;
    registerToken(token, match);
    return token;
  });

  // 3. Redact Credit/Debit Card Numbers (16-digit Visa, MasterCard, Amex, Discover)
  const cardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
  redacted = redacted.replace(cardRegex, (match) => {
    if (reverseMap[match]) return reverseMap[match];
    cardCount++;
    counts.financialCards = (counts.financialCards || 0) + 1;
    counts.total++;
    const token = `[PAYMENT_CARD_${cardCount}]`;
    registerToken(token, match);
    return token;
  });

  // 4. Redact Indian PAN Card Numbers (e.g. ABCDE1234F)
  const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g;
  redacted = redacted.replace(panRegex, (match) => {
    if (reverseMap[match]) return reverseMap[match];
    panCount++;
    counts.bankGovIds = (counts.bankGovIds || 0) + 1;
    counts.total++;
    const token = `[PAN_ID_${panCount}]`;
    registerToken(token, match);
    return token;
  });

  // 5. Redact Indian Aadhaar Numbers (e.g. 1234 5678 9012 or 1234-5678-9012)
  const aadhaarRegex = /\b(?:\d{4}[ -]\d{4}[ -]\d{4}(?![ -]?\d{4})|\d{12})\b/g;
  redacted = redacted.replace(aadhaarRegex, (match) => {
    if (match.length < 12) return match;
    if (reverseMap[match]) return reverseMap[match];
    aadhaarCount++;
    counts.bankGovIds = (counts.bankGovIds || 0) + 1;
    counts.total++;
    const token = `[AADHAAR_ID_${aadhaarCount}]`;
    registerToken(token, match);
    return token;
  });

  // 6. Redact Indian Bank IFSC Codes (e.g. HDFC0001234)
  const ifscRegex = /\b[A-Z]{4}0[A-Z0-9]{6}\b/g;
  redacted = redacted.replace(ifscRegex, (match) => {
    if (reverseMap[match]) return reverseMap[match];
    ifscCount++;
    counts.bankGovIds = (counts.bankGovIds || 0) + 1;
    counts.total++;
    const token = `[IFSC_CODE_${ifscCount}]`;
    registerToken(token, match);
    return token;
  });

  // 7. Redact Phone numbers (US, international formats)
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
  redacted = redacted.replace(phoneRegex, (match) => {
    // avoid matching pure 10-digit dates or section references like 1.2.3
    if (match.length < 10) return match;
    if (reverseMap[match]) return reverseMap[match];
    counts.phones++;
    counts.total++;
    const token = `[PHONE_${counts.phones}]`;
    registerToken(token, match);
    return token;
  });

  // 8. Redact Addresses (Street, Ave, Blvd, Suite, Postal codes, Terrace, Court, Parkway)
  const addressRegex = /\b\d{1,5}\s+[A-Za-z0-9\s.,]{3,35}\s+(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Lane|Ln|Drive|Dr|Way|Suite|Ste|Floor|Fl|Terrace|Ter|Court|Ct|Circle|Cir|Parkway|Pkwy)\b(?:,\s*[A-Za-z\s]+)?(?:,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?)?/gi;
  redacted = redacted.replace(addressRegex, (match) => {
    if (reverseMap[match]) return reverseMap[match];
    counts.addresses++;
    counts.total++;
    const token = `[ADDRESS_${counts.addresses}]`;
    registerToken(token, match);
    return token;
  });

  // 9. Redact Prefixed Names & Party definitions e.g. "by and between Johnathan Doe" or "hereinafter referred to as Alice Smith"
  const partyNameRegex = new RegExp(`(?:by and between|between|Party:|hereinafter referred to as|signed by|represented by|attention of|c\\/o)\\s+([A-Z][a-z]+(?:\\s+[A-Z][a-z]+){1,2})`, 'g');
  redacted = redacted.replace(partyNameRegex, (fullMatch, nameGroup) => {
    if (reverseMap[nameGroup]) {
      return fullMatch.replace(nameGroup, reverseMap[nameGroup]);
    }
    counts.names++;
    counts.total++;
    const token = `[PARTY_${counts.names}]`;
    registerToken(token, nameGroup);
    return fullMatch.replace(nameGroup, token);
  });

  // 10. Also match honorific names e.g. "Mr. David Miller"
  const honorificRegex = new RegExp(`\\b(?:${NAME_PREFIXES.join('|')})\\s+([A-Z][a-z]+(?:\\s+[A-Z][a-z]+){1,2})\\b`, 'g');
  redacted = redacted.replace(honorificRegex, (fullMatch, nameGroup) => {
    if (reverseMap[nameGroup]) {
      return fullMatch.replace(nameGroup, reverseMap[nameGroup]);
    }
    counts.names++;
    counts.total++;
    const token = `[PERSON_${counts.names}]`;
    registerToken(token, nameGroup);
    return fullMatch.replace(nameGroup, token);
  });

  return {
    redactedText: redacted,
    originalText: text,
    redactionMap,
    reverseMap,
    counts
  };
}

/**
 * Restores redacted tokens back to their original values
 */
export function restorePII(text: string, redactionMap: Record<string, string>): string {
  if (!text || !redactionMap) return text;
  let restored = text;
  for (const [token, original] of Object.entries(redactionMap)) {
    // replace all occurrences of token
    restored = restored.split(token).join(original);
  }
  return restored;
}
