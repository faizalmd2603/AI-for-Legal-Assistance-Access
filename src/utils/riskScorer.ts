import { ClauseAnalysis, LegalDocumentType, RiskBreakdown, RiskLevel, TypeSpecificRiskDimension } from '../types';

export function calculateRiskLevel(score: number): RiskLevel {
  if (score >= 68) return 'high';
  if (score >= 38) return 'moderate';
  return 'low';
}

/**
 * Heuristic risk patterns for legal documents across contracts, patents, wills, and incorporation
 */
const CONTRACT_RISK_PATTERNS = [
  { regex: /indemnif(?:y|ication)|hold harmless|defend, indemnify/i, category: 'indemnity', weight: 28, flag: 'Uncapped or broad indemnification requirement' },
  { regex: /liquidated damages|penalty fee|forfeit(?:ure)?|attorney(?:'s)? fees/i, category: 'damages', weight: 25, flag: 'Pre-determined liquidated damages or forfeiture clause' },
  { regex: /auto(?:matic)?(?:ally)? renew|perpetual|evergreen clause|renewal period/i, category: 'renewal', weight: 24, flag: 'Automatic renewal with potential lock-in trap' },
  { regex: /unilateral|sole discretion|without notice|at any time without liability/i, category: 'unilateral', weight: 26, flag: 'Unilateral rights granting sole discretion to one party' },
  { regex: /waiv(?:e|er) of jury trial|mandatory arbitration|class action waiver/i, category: 'dispute', weight: 20, flag: 'Mandatory arbitration or jury waiver limiting court access' },
  { regex: /non-compete|non compete|restrict(?:ive)? covenant|worldwide|in perpetuity/i, category: 'non_compete', weight: 28, flag: 'Severe non-compete restriction or perpetual covenant' },
  { regex: /exclusive jurisdiction|governing law of (?!your)/i, category: 'jurisdiction', weight: 15, flag: 'Remote or foreign exclusive dispute jurisdiction' },
  { regex: /immediate termination|without cause by company/i, category: 'termination', weight: 20, flag: 'Asymmetric termination without notice or cause' },
];

const PATENT_RISK_PATTERNS = [
  { regex: /means for|means including|step for/i, category: 'means_plus', weight: 26, flag: '35 U.S.C. 112(f) Means-Plus-Function vulnerability: Claims limited to exact specification structures' },
  { regex: /substantially|approximately|about|or the like|essentially/i, category: 'indefiniteness', weight: 22, flag: 'Vague qualifying terminology prone to indefiniteness rejection' },
  { regex: /rights in inventions made with federal assistance|bayh-dole|government license|march-in rights/i, category: 'bayh_dole', weight: 30, flag: 'Federal funding march-in rights and non-exclusive government royalty-free license' },
  { regex: /irrevocably assigns|without further consideration|shop right|perpetual patent assignment/i, category: 'assignment', weight: 25, flag: 'Sweeping patent assignment forfeiting future derivative improvements' },
  { regex: /maintenance fee(?:s)?|abandonment|prosecution deadline|failure to pay fee/i, category: 'deadlines', weight: 24, flag: 'Statutory deadline with risk of permanent patent forfeiture or abandonment' },
  { regex: /lack(?:s)? enablement|undue experimentation|prior art disclosure/i, category: 'prior_art', weight: 28, flag: 'Enablement or prior art invalidation vulnerability under 35 U.S.C. 102/103' },
];

const WILL_RISK_PATTERNS = [
  { regex: /in terrorem|no-contest|contests this will|forfeits? (?:all )?(?:bequest|share)/i, category: 'in_terrorem', weight: 35, flag: 'In Terrorem / No-Contest Penalty: Forfeits beneficiary share if validity is questioned' },
  { regex: /without bond|without any bond|no bond.*required|waive.*bond/i, category: 'bond_waiver', weight: 22, flag: 'Unbonded fiduciary administration eliminating financial surety protections' },
  { regex: /sole and absolute discretion|without court approval|without confirmation of any court/i, category: 'fiduciary_discretion', weight: 26, flag: 'Unchecked fiduciary powers allowing property liquidation without probate court oversight' },
  { regex: /intentionally omit|make no provision for|disinherit/i, category: 'omission', weight: 28, flag: 'Explicit disinheritance or potential pretermitted heir litigation risk' },
  { regex: /residuary estate|all the rest, residue|undisposed of/i, category: 'residuary', weight: 18, flag: 'Residuary clause structure requires verification against statutory intestacy rules' },
  { regex: /no accounting.*required|waives formal accounting/i, category: 'accounting_waiver', weight: 25, flag: 'Waiver of fiduciary accounting obscuring estate asset tracking' },
];

const INCORPORATION_RISK_PATTERNS = [
  { regex: /blank[- ]check preferred|authority to issue.*series|designate preferences/i, category: 'blank_check', weight: 32, flag: 'Blank-Check Preferred Stock: Board can issue senior shares with superior liquidation preferences' },
  { regex: /drag[- ]along|forced to sell|compelled to transfer|compulsory drag/i, category: 'drag_along', weight: 28, flag: 'Drag-Along forced sale clause allowing majority to liquidate founder equity' },
  { regex: /50% and 50%|equal voting|deadlock|impasse/i, category: 'deadlock', weight: 30, flag: 'Deadlock vulnerability without explicit buy-sell shotgun or tiebreaker mechanism' },
  { regex: /exculpat(?:e|ion)|eliminate personal liability|not liable for breach of fiduciary/i, category: 'exculpation', weight: 24, flag: 'Extensive DGCL § 102(b)(7) exculpation shielding directors from monetary damages' },
  { regex: /supermajority|(?:two-thirds|75%|80%)\s+affirmative vote/i, category: 'supermajority', weight: 20, flag: 'Supermajority governance hurdle that may lock out minority motions' },
  { regex: /right of first refusal|rofr|lock-up|transfer restriction/i, category: 'transfer_restriction', weight: 22, flag: 'Restrictive share transfer provisions limiting secondary liquidity' },
];

const INDIAN_LAW_RISK_PATTERNS = [
  { regex: /non[- ]compete|restraint of trade|shall not directly or indirectly engage in any competing/i, category: 'sec27_restraint', weight: 35, flag: 'Section 27 ICA 1872 Voidness Alert: Post-termination non-compete is VOID ab initio in India (Percept D\'Mark v. Zaheer Khan)' },
  { regex: /dpdpa|data fiduciary|data principal|data protection board|250 crore/i, category: 'dpdpa_exposure', weight: 30, flag: 'DPDPA 2023 Statutory Exposure: Non-compliance with Data Fiduciary safeguards risks up to ₹250 Crores penalty' },
  { regex: /super built-up|carpet area.*tentative|delayed possession.*without interest|no compensation for delay/i, category: 'rera_violation', weight: 32, flag: 'RERA 2016 Violation: Dilution of statutory carpet area or denial of Section 18 SBI MCLR + 2% delay interest' },
  { regex: /service bond|bond amount|liquidated damages of rs\.|liquidated damages of inr/i, category: 'sec74_penalty', weight: 26, flag: 'Section 74 ICA Penalty Hurdle: Liquidated damages/bonds cannot be enforced without proof of actual pecuniary loss' },
  { regex: /criminal breach of trust|bns\s*2023|section 316|section 405/i, category: 'criminal_liability', weight: 28, flag: 'Bharatiya Nyaya Sanhita 2023 Criminal Breach of Trust or Penal Exposure' },
  { regex: /arbitration without stamp|unstamped|insufficiently stamped/i, category: 'stamp_duty', weight: 25, flag: 'Indian Stamp Act / State Stamp Duty Impounding Risk under Supreme Court 7-Judge Bench ruling' },
  { regex: /section 3\(k\)|computer programme per se|algorithm per se/i, category: 'patent_sec3k', weight: 30, flag: 'Section 3(k) Patents Act 1970 Bar: Software inventions must demonstrate a technical effect / industrial hardware interface' },
];

export function evaluateClauseRisk(
  title: string,
  content: string,
  docType: LegalDocumentType = LegalDocumentType.CONTRACT
): { score: number; level: RiskLevel; flags: string[] } {
  let score = 15; // baseline
  const flags: string[] = [];
  const text = `${title} \n ${content}`.toLowerCase();

  // Combine patterns based on docType
  let activePatterns = [...CONTRACT_RISK_PATTERNS];
  if (docType === LegalDocumentType.INDIAN_LAW) {
    activePatterns = [...INDIAN_LAW_RISK_PATTERNS, ...CONTRACT_RISK_PATTERNS];
  } else if (docType === LegalDocumentType.PATENT) {
    activePatterns = [...PATENT_RISK_PATTERNS, ...CONTRACT_RISK_PATTERNS.slice(0, 4)];
  } else if (docType === LegalDocumentType.WILL) {
    activePatterns = [...WILL_RISK_PATTERNS, ...CONTRACT_RISK_PATTERNS.slice(0, 4)];
  } else if (docType === LegalDocumentType.INCORPORATION) {
    activePatterns = [...INCORPORATION_RISK_PATTERNS, ...CONTRACT_RISK_PATTERNS.slice(0, 4)];
  } else {
    // If contract, also check if patent/will/incorp/indian keywords appear
    activePatterns = [
      ...CONTRACT_RISK_PATTERNS,
      ...INDIAN_LAW_RISK_PATTERNS.slice(0, 3),
      ...PATENT_RISK_PATTERNS.slice(0, 2),
      ...WILL_RISK_PATTERNS.slice(0, 2),
      ...INCORPORATION_RISK_PATTERNS.slice(0, 2)
    ];
  }

  for (const pattern of activePatterns) {
    if (pattern.regex.test(text)) {
      score += pattern.weight;
      flags.push(pattern.flag);
    }
  }

  // Bonus/penalty checks
  if (/survive(?:s)? termination indefinitely/i.test(text)) {
    score += 15;
    flags.push('Obligations survive termination indefinitely');
  }
  if (/mutual(?:ly|)? agree|written notice of at least 30 days|pro rata/i.test(text)) {
    score = Math.max(10, score - 15); // mitigations
  }

  const boundedScore = Math.min(98, Math.max(12, score));
  return {
    score: boundedScore,
    level: calculateRiskLevel(boundedScore),
    flags: Array.from(new Set(flags))
  };
}

export function compileRiskBreakdown(
  clauses: ClauseAnalysis[],
  docType: LegalDocumentType = LegalDocumentType.CONTRACT
): RiskBreakdown {
  if (!clauses || clauses.length === 0) {
    return {
      overallScore: 25,
      overallRating: 'low',
      unilateralObligationsScore: 20,
      harshIndemnitiesScore: 15,
      liquidatedDamagesScore: 10,
      autoRenewalTrapScore: 10,
      criticalFlagsCount: 0,
      summary: 'No major clauses detected or document is minimal.',
      documentType: docType,
      typeDimensions: generateTypeDimensions(docType, 25, 20, 15, 10, 10)
    };
  }

  let totalScore = 0;
  let unilateralScores: number[] = [];
  let indemnityScores: number[] = [];
  let damagesScores: number[] = [];
  let renewalScores: number[] = [];
  let criticalFlags = 0;

  for (const clause of clauses) {
    totalScore += clause.riskScore;
    if (clause.riskLevel === 'high') criticalFlags++;

    const text = `${clause.title} ${clause.originalText}`.toLowerCase();

    if (/unilateral|sole discretion|without notice|means for|in terrorem|blank-check/i.test(text)) {
      unilateralScores.push(clause.riskScore);
    }
    if (/indemnif|hold harmless|defend|bayh-dole|exculpat/i.test(text)) {
      indemnityScores.push(clause.riskScore);
    }
    if (/liquidated|penalty|forfeit|fee|omission|drag-along|deadlock/i.test(text)) {
      damagesScores.push(clause.riskScore);
    }
    if (/renew|evergreen|notice period|deadline|statute|probate/i.test(text)) {
      renewalScores.push(clause.riskScore);
    }
  }

  const avg = (arr: number[], fallback: number) =>
    arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : fallback;

  const rawOverall = Math.round(totalScore / clauses.length);
  // Boost overall if multiple high-risk clauses exist
  const overallScore = Math.min(98, Math.max(15, rawOverall + (criticalFlags >= 2 ? 8 : 0)));
  const overallRating = calculateRiskLevel(overallScore);

  const dim1 = avg(unilateralScores, 28);
  const dim2 = avg(indemnityScores, 30);
  const dim3 = avg(damagesScores, 22);
  const dim4 = avg(renewalScores, 25);

  let summary = '';
  if (docType === 'patent') {
    if (overallRating === 'high') {
      summary = `High patent vulnerability detected with ${criticalFlags} critical clauses. Key alerts include overbroad independent claims prone to prior art rejections, means-plus-function limitations, or unhedged inventor assignment terms.`;
    } else if (overallRating === 'moderate') {
      summary = `Moderate patent exposure. Independent and dependent claim structures contain qualifying terms that may narrow the doctrine of equivalents.`;
    } else {
      summary = `Well-structured patent specification with clear claim boundaries and standard statutory enablement.`;
    }
  } else if (docType === 'will') {
    if (overallRating === 'high') {
      summary = `High estate planning risk detected with ${criticalFlags} critical provisions. Pay close attention to in terrorem no-contest penalties, unbonded executor discretion, and residuary ambiguity.`;
    } else if (overallRating === 'moderate') {
      summary = `Moderate testamentary exposure. Some fiduciary powers lack explicit beneficiary reporting safeguards or self-proving notarization.`;
    } else {
      summary = `Balanced testamentary instrument with clear fiduciary appointment, specific devises, and comprehensive residuary disposition.`;
    }
  } else if (docType === LegalDocumentType.INDIAN_LAW) {
    if (overallRating === 'high') {
      summary = `High statutory exposure under Indian law detected with ${criticalFlags} critical clauses. Key alerts include post-employment non-compete voidness under Section 27 of the Indian Contract Act, DPDPA 2023 regulatory penalties up to ₹250 Crores, or RERA Section 18 delayed possession interest deviations.`;
    } else if (overallRating === 'moderate') {
      summary = `Moderate Indian statutory exposure. Contract clauses require calibration against the Indian Contract Act (Section 73/74), DPDPA 2023 data principal rights, or State Stamp duty requirements.`;
    } else {
      summary = `Balanced Indian commercial document aligned with governing statutory codes and standard bilateral protections.`;
    }
  } else if (docType === 'incorporation') {
    if (overallRating === 'high') {
      summary = `High corporate governance exposure with ${criticalFlags} critical clauses. Watch for blank-check preferred stock dilution, forced drag-along transfer mandates, and 50/50 founder deadlock risks.`;
    } else if (overallRating === 'moderate') {
      summary = `Moderate corporate governance risk. Shareholder voting thresholds and transfer restrictions contain minority-vulnerability provisions.`;
    } else {
      summary = `Standard corporate formation bylaws with balanced founder equity protection and standard Delaware statutory provisions.`;
    }
  } else {
    if (overallRating === 'high') {
      summary = `High risk detected with ${criticalFlags} severe clauses. Look out for one-sided indemnities, aggressive termination terms, or auto-renewal lock-ins.`;
    } else if (overallRating === 'moderate') {
      summary = `Moderate risk. Several clauses have unbalanced terms or notice requirements that warrant specific negotiation.`;
    } else {
      summary = `Standard baseline risk profile. Standard commercial protections with balanced reciprocal obligations.`;
    }
  }

  const typeDimensions = generateTypeDimensions(docType, overallScore, dim1, dim2, dim3, dim4);

  return {
    overallScore,
    overallRating,
    unilateralObligationsScore: dim1,
    harshIndemnitiesScore: dim2,
    liquidatedDamagesScore: dim3,
    autoRenewalTrapScore: dim4,
    criticalFlagsCount: criticalFlags,
    summary,
    documentType: docType,
    typeDimensions
  };
}

export function generateTypeDimensions(
  docType: LegalDocumentType,
  overall: number,
  d1: number,
  d2: number,
  d3: number,
  d4: number
): TypeSpecificRiskDimension[] {
  const getStatus = (score: number): 'safe' | 'warning' | 'critical' => {
    if (score >= 68) return 'critical';
    if (score >= 38) return 'warning';
    return 'safe';
  };

  if (docType === LegalDocumentType.INDIAN_LAW || (docType as string) === 'indian_law') {
    return [
      {
        key: 'sec27_restraint_trade',
        label: 'Section 27 ICA & Enforceability',
        score: d1,
        status: getStatus(d1),
        description: 'Vulnerability of post-termination non-competes under Section 27 Indian Contract Act 1872 (void ab initio under Percept D\'Mark v. Zaheer Khan) and Section 74 penalty bars.'
      },
      {
        key: 'dpdpa_regulatory_penalties',
        label: 'DPDPA 2023 Statutory Liabilities',
        score: d2,
        status: getStatus(d2),
        description: 'Regulatory exposure to the Data Protection Board of India (DPBI) with statutory penalties up to ₹250 Crores for breach of data fiduciary duties and Data Principal rights.'
      },
      {
        key: 'rera_consumer_protection',
        label: 'RERA 2016 Carpet Area & Interest',
        score: d3,
        status: getStatus(d3),
        description: 'Statutory compliance with Section 2(k) Carpet Area norms and Section 18 mandatory delayed possession compensation at SBI MCLR + 2% per annum.'
      },
      {
        key: 'arbitration_stamp_jurisdiction',
        label: 'Arbitration Seat, Stamp Duty & BNS',
        score: d4,
        status: getStatus(d4),
        description: 'Adherence to State Stamp Acts (preventing arbitral agreement impounding under 7-judge bench guidelines) and penal exposure under Bharatiya Nyaya Sanhita 2023.'
      }
    ];
  }

  if (docType === 'patent') {
    return [
      {
        key: 'claim_breadth',
        label: 'Claim Scope & Indefiniteness',
        score: d1,
        status: getStatus(d1),
        description: 'Vulnerability of independent claims to 35 U.S.C. 112 indefiniteness or means-plus-function structural narrowing.'
      },
      {
        key: 'prior_art',
        label: 'Prior Art & Enablement Deficiencies',
        score: d2,
        status: getStatus(d2),
        description: 'Risk of 35 U.S.C. 102/103 invalidation due to inadequate prior art disclosure or missing embodiment enablement.'
      },
      {
        key: 'ownership_assignment',
        label: 'Ownership & Bayh-Dole Encumbrances',
        score: d3,
        status: getStatus(d3),
        description: 'Sweep of inventor assignment, shop rights, and potential government funding march-in liens.'
      },
      {
        key: 'statutory_deadlines',
        label: 'Maintenance & Statutory Deadlines',
        score: d4,
        status: getStatus(d4),
        description: 'Strict 3.5, 7.5, 11.5 year USPTO maintenance fee triggers and priority conversion clocks.'
      }
    ];
  }

  if (docType === 'will') {
    return [
      {
        key: 'probate_litigation',
        label: 'Probate Litigation & In Terrorem Trap',
        score: d1,
        status: getStatus(d1),
        description: 'Aggressive no-contest disinheritance penalties that punish beneficiaries for seeking estate accounting.'
      },
      {
        key: 'fiduciary_discretion',
        label: 'Unchecked Fiduciary / Executor Powers',
        score: d2,
        status: getStatus(d2),
        description: 'Broad authority to liquidate estate assets without surety bond, probate appraisal, or court confirmation.'
      },
      {
        key: 'residuary_omissions',
        label: 'Beneficiary & Residuary Ambiguity',
        score: d3,
        status: getStatus(d3),
        description: 'Vagueness in residuary clause or pretermitted heir omissions that trigger statutory intestacy rules.'
      },
      {
        key: 'attestation_execution',
        label: 'Attestation & Formal Execution Defects',
        score: d4,
        status: getStatus(d4),
        description: 'Self-proving affidavit completeness and two-witness compliance under state surrogate probate codes.'
      }
    ];
  }

  if (docType === 'incorporation') {
    return [
      {
        key: 'blank_check_dilution',
        label: 'Equity Dilution & Blank-Check Preferred',
        score: d1,
        status: getStatus(d1),
        description: 'Board power to issue blank-check preferred shares with senior liquidation rights without common shareholder vote.'
      },
      {
        key: 'deadlock_risk',
        label: 'Founder Deadlock & Oppression Risk',
        score: d2,
        status: getStatus(d2),
        description: '50/50 voting deadlock exposure or minority squeeze-out vulnerability lacking an explicit buy-sell mechanism.'
      },
      {
        key: 'governance_hurdles',
        label: 'Governance & Supermajority Hurdles',
        score: d3,
        status: getStatus(d3),
        description: 'Supermajority voting requirements (66%–80%) for fundamental corporate changes, mergers, and dissolutions.'
      },
      {
        key: 'transfer_drag_along',
        label: 'Transfer Restrictions & Drag-Along Exposure',
        score: d4,
        status: getStatus(d4),
        description: 'Forced sale drag-along mandates compelling minority founders to sell shares without a valuation floor.'
      }
    ];
  }

  // Commercial Contracts Default
  return [
    {
      key: 'unilateral_obligations',
      label: 'Unilateral Obligations & Discretion',
      score: d1,
      status: getStatus(d1),
      description: 'One-sided covenants granting the counterparty sole discretion to alter terms, suspend services, or deny remedies.'
    },
    {
      key: 'harsh_indemnities',
      label: 'Uncapped / Harsh Indemnities',
      score: d2,
      status: getStatus(d2),
      description: 'Broad third-party defense and indemnification liabilities that bypass liability caps.'
    },
    {
      key: 'liquidated_damages',
      label: 'Liquidated Damages & Penalty Clauses',
      score: d3,
      status: getStatus(d3),
      description: 'Predetermined financial penalties triggered automatically upon perceived default.'
    },
    {
      key: 'auto_renewal_trap',
      label: 'Auto-Renewal & Lock-In Traps',
      score: d4,
      status: getStatus(d4),
      description: 'Evergreen contract extension traps requiring narrow advance notice windows to terminate.'
    }
  ];
}
