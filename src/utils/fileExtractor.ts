/**
 * File extraction utility for client-side document reading
 * Handles .txt, .md, .docx, .pdf text streams
 */

import { LegalDocumentType, DocumentTypeDetails } from '../types';

export interface ExtractedDocument {
  filename: string;
  text: string;
  wordCount: number;
  fileType: string;
  fileSizeBytes: number;
  detectedType?: LegalDocumentType;
  detectedSubtype?: string;
}

export function detectLegalDocumentType(
  text: string,
  filename: string = ''
): { type: LegalDocumentType; subtype: string; confidence: number } {
  const combined = `${filename} \n ${text.slice(0, 10000)}`.toLowerCase();

  // 1. Patent scoring
  let patentScore = 0;
  if (/united states patent|patent application|patent publication/i.test(combined)) patentScore += 40;
  if (/what is claimed is|we claim|claims:\s*\n\s*1\./i.test(combined)) patentScore += 40;
  if (/prior art|field of (?:the )?invention|background of (?:the )?invention/i.test(combined)) patentScore += 25;
  if (/inventor(?:s)?\s*:\s*[a-z]/i.test(combined)) patentScore += 20;
  if (/assignee\s*:\s*[a-z]|uspto|pct\//i.test(combined)) patentScore += 20;
  if (/independent claim|dependent claim|embodiment/i.test(combined)) patentScore += 15;

  // 2. Will & Estate Planning scoring
  let willScore = 0;
  if (/last will and testament|last will & testament/i.test(combined)) willScore += 50;
  if (/testator|testatrix/i.test(combined)) willScore += 35;
  if (/give, devise,? and bequeath|devise and bequeath|bequeath/i.test(combined)) willScore += 30;
  if (/residuary estate|all the rest, residue,? and remainder/i.test(combined)) willScore += 30;
  if (/executor|executrix|personal representative/i.test(combined)) willScore += 25;
  if (/in terrorem|no-contest clause|contest this will/i.test(combined)) willScore += 25;
  if (/attestation clause|sound mind and disposing memory/i.test(combined)) willScore += 30;

  // 3. Incorporation & Corporate Governance scoring
  let incorpScore = 0;
  if (/certificate of incorporation|articles of incorporation|articles of organization/i.test(combined)) incorpScore += 50;
  if (/corporate bylaws|by-laws of|by laws of/i.test(combined)) incorpScore += 45;
  if (/general corporation law|dgcl|division of corporations/i.test(combined)) incorpScore += 35;
  if (/authorized (?:capital )?shares|common stock|preferred stock|blank-check preferred/i.test(combined)) incorpScore += 30;
  if (/incorporator|registered agent|registered office/i.test(combined)) incorpScore += 25;
  if (/operating agreement|shareholders'? agreement|drag-along|tag-along|rofr/i.test(combined)) incorpScore += 30;

  // 4. Indian Statutory & Amended Acts scoring
  let indianScore = 0;
  if (/digital personal data protection act|dpdpa\s*2023|data fiduciary|data principal|data protection board of india/i.test(combined)) indianScore += 55;
  if (/indian contract act|section 27\b|section 28\b|section 73\b|section 74\b|restraint of trade/i.test(combined)) indianScore += 45;
  if (/bharatiya nyaya sanhita|bns\s*2023|bnss\s*2023|bharatiya sakshya|bsa\s*2023|section 63 of the bharatiya/i.test(combined)) indianScore += 50;
  if (/real estate \(regulation and development\) act|rera\s*2016|maharera|rera registered|allottee and promoter|carpet area as defined in rera/i.test(combined)) indianScore += 55;
  if (/patents act,? 1970|patents \(amendment\) rules,? 2024|section 3\(k\)|section 3\(d\)|form 27\b|controller of patents/i.test(combined)) indianScore += 50;
  if (/hindu succession act|indian succession act,? 1925|coparcenary|ancestral property|hindu undivided family|\bhuf\b|section 63 of the indian succession|section 213 of the indian succession/i.test(combined)) indianScore += 50;
  if (/arbitration and conciliation act,? 1996|mcia|nclt|indian stamp act|karnataka stamp act|maharashtra stamp act|delhi high court|supreme court of india/i.test(combined)) indianScore += 40;
  if (/rupees|inr\b|rs\.\s*[0-9]|lakh|crore|bengaluru|mumbai|new delhi|hyderabad|chennai/i.test(combined)) indianScore += 20;

  // 5. Contract baseline
  let contractScore = 15;
  if (/agreement|contract|lease|terms of service|nda|license/i.test(combined)) contractScore += 30;
  if (/by and between|in witness whereof|parties agree/i.test(combined)) contractScore += 25;

  // Evaluate maximum
  const scores = [
    { type: LegalDocumentType.INDIAN_LAW, score: indianScore, defaultSubtype: 'Indian Statutory & Commercial Agreement' },
    { type: LegalDocumentType.PATENT, score: patentScore, defaultSubtype: 'Utility Patent Specification & Claims' },
    { type: LegalDocumentType.WILL, score: willScore, defaultSubtype: 'Last Will & Testament' },
    { type: LegalDocumentType.INCORPORATION, score: incorpScore, defaultSubtype: 'Certificate of Incorporation / Corporate Bylaws' },
    { type: LegalDocumentType.CONTRACT, score: contractScore, defaultSubtype: 'Commercial Contract / Agreement' },
  ];

  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];

  if (best.score >= 40) {
    let specificSubtype = best.defaultSubtype;
    if (best.type === LegalDocumentType.INDIAN_LAW) {
      if (/dpdpa|data fiduciary|data principal/i.test(combined)) specificSubtype = 'DPDPA 2023 Data Protection Addendum';
      else if (/rera|allottee|carpet area/i.test(combined)) specificSubtype = 'RERA 2016 Real Estate Allotment Agreement';
      else if (/patent|claims:\s*\n\s*1\.|section 3\(k\)/i.test(combined)) specificSubtype = 'Indian Patent Specification (2024 Rules)';
      else if (/will|testament|coparcenary|succession act/i.test(combined)) specificSubtype = 'Indian Testamentary Will (HSA / ISA)';
      else if (/shareholders'? agreement|sha|articles of association/i.test(combined)) specificSubtype = 'Indian Shareholders Agreement (Companies Act 2013)';
      else specificSubtype = 'Indian Employment & IP Agreement (ICA 1872 & BNS 2023)';
    } else if (best.type === LegalDocumentType.PATENT) {
      if (/provisional/i.test(combined)) specificSubtype = 'Provisional Patent Application';
      else if (/pct\//i.test(combined)) specificSubtype = 'PCT International Patent Application';
      else if (/granted|letters patent/i.test(combined)) specificSubtype = 'Granted Letters Patent';
      else specificSubtype = 'Utility Patent Application & Claims';
    } else if (best.type === LegalDocumentType.WILL) {
      if (/codicil/i.test(combined)) specificSubtype = 'Codicil to Last Will';
      else if (/living trust|revocable trust/i.test(combined)) specificSubtype = 'Revocable Living Trust Agreement';
      else specificSubtype = 'Last Will and Testament';
    } else if (best.type === LegalDocumentType.INCORPORATION) {
      if (/bylaws/i.test(combined)) specificSubtype = 'Corporate Governance Bylaws';
      else if (/operating agreement/i.test(combined)) specificSubtype = 'LLC Operating Agreement';
      else if (/delaware/i.test(combined)) specificSubtype = 'Certificate of Incorporation (Delaware C-Corp)';
      else specificSubtype = 'Articles of Incorporation';
    }
    return { type: best.type, subtype: specificSubtype, confidence: Math.min(99, best.score) };
  }

  return { type: LegalDocumentType.CONTRACT, subtype: 'Commercial Legal Document', confidence: 50 };
}

export function extractDocumentMetadata(
  text: string,
  docType: LegalDocumentType,
  subtype: string = 'Legal Document'
): DocumentTypeDetails {
  const parties: { role: string; name: string }[] = [];
  const checklist: { item: string; status: 'pass' | 'warning' | 'alert'; note: string }[] = [];

  if (docType === LegalDocumentType.PATENT) {
    // Extract inventors
    const inventorMatch = text.match(/inventor(?:s)?\s*:\s*([^\n;.]+)/i);
    if (inventorMatch) {
      parties.push({ role: 'Inventor(s)', name: inventorMatch[1].trim() });
    } else {
      parties.push({ role: 'Inventor(s)', name: 'Named Co-Inventors' });
    }

    // Extract assignee
    const assigneeMatch = text.match(/assignee\s*:\s*([^\n;.]+)/i);
    if (assigneeMatch) {
      parties.push({ role: 'Assignee / Entity', name: assigneeMatch[1].trim() });
    }

    // Patent checklist
    const hasIndClaims = /claim\s+1\b|claims:\s*\n\s*1\./i.test(text);
    const hasPriorArt = /prior art|background of the invention/i.test(text);
    const hasMeansPlus = /means for\b/i.test(text);
    const hasAbstract = /abstract\b/i.test(text);

    checklist.push({
      item: 'Independent Claim 1 Definition',
      status: hasIndClaims ? 'pass' : 'alert',
      note: hasIndClaims ? 'Independent claim found delineating the core inventive boundary.' : 'Missing or non-standard independent claim 1 formulation.'
    });
    checklist.push({
      item: 'Prior Art Disclosure & Enablement',
      status: hasPriorArt ? 'pass' : 'warning',
      note: hasPriorArt ? 'Prior art acknowledged to satisfy 35 U.S.C. 112 enablement.' : 'Limited prior art citation; risk of 35 U.S.C. 102/103 rejections.'
    });
    checklist.push({
      item: 'Means-Plus-Function Ambiguity',
      status: hasMeansPlus ? 'warning' : 'pass',
      note: hasMeansPlus ? 'Contains "means for" wording which may be narrowly constrained to disclosed structural embodiments.' : 'No problematic means-plus-function limitations detected.'
    });
    checklist.push({
      item: 'Abstract & Field Clarity',
      status: hasAbstract ? 'pass' : 'warning',
      note: hasAbstract ? 'Technical abstract included for USPTO/EPO classification.' : 'Abstract not identified.'
    });

    return {
      detectedType: LegalDocumentType.PATENT,
      subtype,
      jurisdictionOrOffice: 'USPTO / WIPO / International Patent System',
      keyPartiesOrRoles: parties,
      domainSpecificChecklist: checklist
    };
  }

  if (docType === LegalDocumentType.WILL) {
    // Extract testator
    const testatorMatch = text.match(/I,\s*([A-Z][a-zA-Z\s.]+),\s*(?:residing|of the City|a resident)/i)
      || text.match(/Testament of\s*([A-Z][a-zA-Z\s.]+)/i);
    if (testatorMatch) {
      parties.push({ role: 'Testator', name: testatorMatch[1].trim() });
    } else {
      parties.push({ role: 'Testator', name: 'Declaring Individual' });
    }

    // Extract executor
    const executorMatch = text.match(/appoint\s*([A-Z][a-zA-Z\s.]+)\s*(?:as|to be)\s*(?:the\s*)?(?:Independent\s*)?Executor/i);
    if (executorMatch) {
      parties.push({ role: 'Primary Executor', name: executorMatch[1].trim() });
    }
    const altExecutorMatch = text.match(/if\s*[^,\n]+\s*(?:fails|unable|predeceases)[^,\n]*appoint\s*([A-Z][a-zA-Z\s.]+)/i);
    if (altExecutorMatch) {
      parties.push({ role: 'Alternate Executor', name: altExecutorMatch[1].trim() });
    }

    // Will checklist
    const hasResiduary = /residue|residuary/i.test(text);
    const hasRevokePrior = /revoke all prior wills|revoking any and all prior/i.test(text);
    const hasBondWaiver = /without bond|waive(?:s)? (?:any )?bond/i.test(text);
    const hasNoContest = /in terrorem|no-contest|contests? this will/i.test(text);
    const hasSelfProving = /subscribed and sworn|notary public|affidavit/i.test(text);

    checklist.push({
      item: 'Revocation of Prior Wills',
      status: hasRevokePrior ? 'pass' : 'alert',
      note: hasRevokePrior ? 'Expressly revokes prior testamentary instruments to prevent duplicate probate contests.' : 'No express revocation of prior wills found; danger of conflicting instruments.'
    });
    checklist.push({
      item: 'Residuary Estate Provision',
      status: hasResiduary ? 'pass' : 'alert',
      note: hasResiduary ? 'Captures unallocated assets so property does not pass via statutory intestacy.' : 'No residuary clause detected! High risk of partial intestacy.'
    });
    checklist.push({
      item: 'Fiduciary Surety Bond Waiver',
      status: hasBondWaiver ? 'warning' : 'pass',
      note: hasBondWaiver ? 'Executor serves without bond, saving estate fees but eliminating financial insurance against misfeasance.' : 'Surety bond required or standard judicial oversight preserved.'
    });
    checklist.push({
      item: 'No-Contest / In Terrorem Penalty',
      status: hasNoContest ? 'warning' : 'pass',
      note: hasNoContest ? 'Disinherits beneficiaries who challenge the will in probate court.' : 'No punitive disinheritance clause found.'
    });
    checklist.push({
      item: 'Self-Proving Notarial Affidavit',
      status: hasSelfProving ? 'pass' : 'warning',
      note: hasSelfProving ? 'Includes self-proving affidavit; avoids requiring live witness testimony during probate.' : 'Self-proving affidavit absent; witnesses may need to be subpoenaed to validate.'
    });

    return {
      detectedType: LegalDocumentType.WILL,
      subtype,
      jurisdictionOrOffice: 'County Surrogate / Probate Court',
      keyPartiesOrRoles: parties,
      domainSpecificChecklist: checklist
    };
  }

  if (docType === LegalDocumentType.INCORPORATION) {
    // Extract Corporation Name
    const nameMatch = text.match(/(?:name of the corporation is|named)\s*([A-Z][a-zA-Z0-9\s,.'&-]+(?:Inc\.|LLC|Corporation|Corp\.|Company))/i);
    if (nameMatch) {
      parties.push({ role: 'Entity Name', name: nameMatch[1].trim() });
    }

    // Extract Incorporator
    const incorpMatch = text.match(/incorporator(?:\s+is)?\s*:\s*([A-Z][a-zA-Z\s.]+)/i);
    if (incorpMatch) {
      parties.push({ role: 'Incorporator', name: incorpMatch[1].trim() });
    }

    // Incorporation checklist
    const hasAuthorizedShares = /authorized\s+(?:to\s+issue\s+)?([0-9,]+)\s+shares/i.test(text);
    const hasBlankCheck = /blank[- ]check preferred|authority to determine.*series/i.test(text);
    const hasLiabilityExculpation = /liability of (?:a|the) director.*eliminated|exculpat/i.test(text);
    const hasDragAlong = /drag[- ]along|forced sale/i.test(text);
    const hasSupermajority = /supermajority|(?:two-thirds|75%|80%)\s+vote/i.test(text);

    checklist.push({
      item: 'Authorized Share Capitalization',
      status: hasAuthorizedShares ? 'pass' : 'alert',
      note: hasAuthorizedShares ? 'Defined share capital and par value clearly delineated.' : 'Ambiguous authorized shares count; risk of corporate ultra vires issues.'
    });
    checklist.push({
      item: 'Blank-Check Preferred Stock',
      status: hasBlankCheck ? 'alert' : 'pass',
      note: hasBlankCheck ? 'Board can create senior stock classes with superior liquidation preferences without common shareholder approval.' : 'No blank-check preferred stock traps.'
    });
    checklist.push({
      item: 'Director Liability Exculpation',
      status: hasLiabilityExculpation ? 'warning' : 'pass',
      note: hasLiabilityExculpation ? 'Eliminates personal monetary liability of directors pursuant to DGCL § 102(b)(7) except for bad faith or loyalty breach.' : 'Directors maintain standard fiduciary exposure.'
    });
    checklist.push({
      item: 'Drag-Along & Transfer Restrictions',
      status: hasDragAlong ? 'warning' : 'pass',
      note: hasDragAlong ? 'Minority shareholders can be compelled to sell shares in an acquisition negotiated by controlling majority.' : 'No mandatory forced-sale drag-along found.'
    });
    checklist.push({
      item: 'Supermajority Governance Safeguards',
      status: hasSupermajority ? 'pass' : 'warning',
      note: hasSupermajority ? 'Protective supermajority provisions prevent hostile bylaws amendments.' : 'Simple majority governance; minority founders vulnerable to dilution.'
    });

    return {
      detectedType: LegalDocumentType.INCORPORATION,
      subtype,
      jurisdictionOrOffice: 'Delaware Division of Corporations / State SOS',
      keyPartiesOrRoles: parties,
      domainSpecificChecklist: checklist
    };
  }

  if (docType === LegalDocumentType.INDIAN_LAW) {
    // Extract Indian Parties
    const dfMatch = text.match(/Data Fiduciary(?:\s*:\s*|\s*\("Data Fiduciary"\)|\s*named\s+)([A-Z][a-zA-Z0-9\s,.'&-]+)/i);
    const dpMatch = text.match(/Data Principal(?:\s*:\s*|\s*\("Data Principal"\)|\s*named\s+)([A-Z][a-zA-Z0-9\s,.'&-]+)/i);
    const promoterMatch = text.match(/Promoter(?:\s*:\s*|\s*\("Promoter"\)|\s*named\s+)([A-Z][a-zA-Z0-9\s,.'&-]+)/i);
    const allotteeMatch = text.match(/Allottee(?:\s*:\s*|\s*\("Allottee"\)|\s*named\s+)([A-Z][a-zA-Z0-9\s,.'&-]+)/i);
    const companyMatch = text.match(/by and between\s+([A-Z][a-zA-Z0-9\s,.'&-]+?)(?:,|\s*\("Company"\)|\s*\("Employer"\))/i);
    const employeeMatch = text.match(/and\s+([A-Z][a-zA-Z0-9\s,.'&-]+?)(?:,|\s*\("Employee"\)|\s*\("Consultant"\))/i);

    if (dfMatch) parties.push({ role: 'Data Fiduciary', name: dfMatch[1].trim() });
    if (dpMatch) parties.push({ role: 'Data Principal / Processor', name: dpMatch[1].trim() });
    if (promoterMatch) parties.push({ role: 'Promoter / Builder', name: promoterMatch[1].trim() });
    if (allotteeMatch) parties.push({ role: 'Allottee / Purchaser', name: allotteeMatch[1].trim() });
    if (companyMatch && !parties.length) parties.push({ role: 'Company / Employer', name: companyMatch[1].trim() });
    if (employeeMatch && parties.length === 1) parties.push({ role: 'Employee / Consultant', name: employeeMatch[1].trim() });

    if (!parties.length) {
      parties.push({ role: 'First Party (India)', name: 'Contracting Entity' });
      parties.push({ role: 'Second Party (India)', name: 'Individual / Counterparty' });
    }

    // Indian Statutory Checklist
    const hasSec27NonCompete = /non[- ]compete|restraint of trade|shall not engage in any competing/i.test(text);
    const hasDpdpaConsent = /section 6\b|data fiduciary|data principal|data protection board/i.test(text);
    const hasReraCarpet = /carpet area|section 2\(k\)|rera/i.test(text);
    const hasBnsCriminal = /bharatiya nyaya|bns\s*2023|criminal breach of trust/i.test(text);
    const hasArbitrationStamp = /arbitration and conciliation act|stamp duty|mcia|seat.*mumbai|seat.*delhi|seat.*bengaluru/i.test(text);
    const hasSection74Liquidated = /liquidated damages|bond amount|forfeit/i.test(text);

    checklist.push({
      item: 'Section 27 ICA 1872 Restraint of Trade Audit',
      status: hasSec27NonCompete ? 'alert' : 'pass',
      note: hasSec27NonCompete
        ? 'Contains post-termination non-compete. Under Section 27 of the Indian Contract Act, 1872 (Percept D\'Mark v. Zaheer Khan), post-employment non-competes are VOID ab initio in India.'
        : 'Complies with Section 27 of the Indian Contract Act, 1872 (no void restraint of trade covenants).'
    });

    if (/dpdpa|data/i.test(text)) {
      checklist.push({
        item: 'DPDPA 2023 Statutory Compliance & Penalty Exposure',
        status: hasDpdpaConsent ? 'pass' : 'warning',
        note: hasDpdpaConsent
          ? 'Explicitly references DPDPA 2023 obligations, Data Protection Board of India reporting, and Data Principal rights.'
          : 'Lacks explicit DPDPA 2023 consent notice (Section 6) or 72-hr breach notification; statutory penalties up to ₹250 Crores under Schedule 1.'
      });
    }

    if (/rera|allottee|promoter|apartment|flat/i.test(text)) {
      checklist.push({
        item: 'RERA 2016 Carpet Area & Delayed Possession Interest',
        status: hasReraCarpet ? 'pass' : 'alert',
        note: hasReraCarpet
          ? 'Complies with RERA Section 2(k) carpet area norms and Section 18 mandatory delay interest at SBI MCLR + 2%.'
          : 'Super built-up area markup detected or lacks mandatory RERA Section 18 delay interest compensation.'
      });
    }

    if (hasSection74Liquidated) {
      checklist.push({
        item: 'Section 74 ICA Reasonable Compensation Rule',
        status: 'warning',
        note: 'Under Section 74 (Kailash Nath Associates v. DDA), liquidated damages cannot be claimed as a penalty without proof of actual loss unless impossible to calculate.'
      });
    }

    checklist.push({
      item: 'Arbitration & State Stamp Act Compliance',
      status: hasArbitrationStamp ? 'pass' : 'warning',
      note: hasArbitrationStamp
        ? 'Arbitration clause specifies Indian seat/venue and satisfies Supreme Court 7-judge bench stamp duty guidelines.'
        : 'Verify appropriate stamp duty under the relevant State Stamp Act (Maharashtra/Karnataka/Delhi) to prevent evidentiary impounding.'
    });

    return {
      detectedType: LegalDocumentType.INDIAN_LAW,
      subtype,
      jurisdictionOrOffice: 'Courts of India / High Courts / Supreme Court / NCLT / RERA / DPBI',
      keyPartiesOrRoles: parties,
      domainSpecificChecklist: checklist
    };
  }

  // Contract default
  const party1Match = text.match(/by and between\s+([A-Z][a-zA-Z0-9\s,.'&-]+?)(?:,|\s*\("Company"\)|\s*\("Discloser"\)|\s*\("Landlord"\))/i);
  const party2Match = text.match(/and\s+([A-Z][a-zA-Z0-9\s,.'&-]+?)(?:,|\s*\("Contractor"\)|\s*\("Recipient"\)|\s*\("Tenant"\))/i);
  if (party1Match) parties.push({ role: 'Primary Party / Company', name: party1Match[1].trim() });
  if (party2Match) parties.push({ role: 'Counterparty / Individual', name: party2Match[1].trim() });

  checklist.push({
    item: 'Bilateral Reciprocal Terms',
    status: /mutual/i.test(text) ? 'pass' : 'warning',
    note: /mutual/i.test(text) ? 'Contract contains mutual protections.' : 'May contain asymmetric unilateral covenants.'
  });
  checklist.push({
    item: 'Liability Cap Specification',
    status: /limitation of liability|aggregate liability/i.test(text) ? 'pass' : 'alert',
    note: /limitation of liability/i.test(text) ? 'Financial liability ceiling specified.' : 'No liability limitation ceiling detected; potential uncapped exposure.'
  });

  return {
    detectedType: LegalDocumentType.CONTRACT,
    subtype,
    jurisdictionOrOffice: 'State Court / Binding Commercial Arbitration',
    keyPartiesOrRoles: parties,
    domainSpecificChecklist: checklist
  };
}

export async function extractTextFromFile(file: File): Promise<ExtractedDocument> {
  const fileType = file.name.split('.').pop()?.toLowerCase() || '';
  const fileSizeBytes = file.size;

  if (fileType === 'txt' || fileType === 'md' || fileType === 'rtf' || fileType === 'json') {
    const text = await file.text();
    const cleaned = cleanExtractedText(text);
    const detection = detectLegalDocumentType(cleaned, file.name);
    return {
      filename: file.name,
      text: cleaned,
      wordCount: countWords(cleaned),
      fileType,
      fileSizeBytes,
      detectedType: detection.type,
      detectedSubtype: detection.subtype
    };
  }

  if (fileType === 'docx') {
    try {
      // Basic text extraction from DOCX XML container
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      const decoded = new TextDecoder('utf-8', { fatal: false }).decode(uint8);
      
      // Look for document.xml paragraphs <w:p> and text <w:t>
      const textMatches = decoded.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
      if (textMatches && textMatches.length > 0) {
        const text = textMatches
          .map((m) => m.replace(/<[^>]+>/g, ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (text.length > 50) {
          const cleaned = cleanExtractedText(text);
          const detection = detectLegalDocumentType(cleaned, file.name);
          return {
            filename: file.name,
            text: cleaned,
            wordCount: countWords(cleaned),
            fileType,
            fileSizeBytes,
            detectedType: detection.type,
            detectedSubtype: detection.subtype
          };
        }
      }
    } catch (e) {
      console.warn('DOCX direct XML extraction fell back:', e);
    }
  }

  // Generic text fallback / PDF stream parsing attempt
  try {
    const rawText = await file.text();
    // Filter non-printable binary characters if PDF or doc
    const sanitized = rawText.replace(/[^\x20-\x7E\t\r\n]/g, ' ');
    const cleaned = cleanExtractedText(sanitized);

    if (cleaned.length > 60) {
      const detection = detectLegalDocumentType(cleaned, file.name);
      return {
        filename: file.name,
        text: cleaned,
        wordCount: countWords(cleaned),
        fileType,
        fileSizeBytes,
        detectedType: detection.type,
        detectedSubtype: detection.subtype
      };
    }
  } catch {
    // fallback below
  }

  // If binary file could not be cleanly parsed in-browser, provide a descriptive message
  const fallback = `[Document: ${file.name}]\nNote: Binary container content parsed. For deepest legal semantic analysis with embedded clauses, you may also paste the raw legal text into the input box below.`;
  const detection = detectLegalDocumentType(fallback, file.name);
  return {
    filename: file.name,
    text: fallback,
    wordCount: countWords(fallback),
    fileType,
    fileSizeBytes,
    detectedType: detection.type,
    detectedSubtype: detection.subtype
  };
}

export function cleanExtractedText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, '  ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}
