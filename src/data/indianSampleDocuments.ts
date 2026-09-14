import { SampleDocument, LegalDocumentType } from '../types';

export const INDIAN_SAMPLE_DOCUMENTS: SampleDocument[] = [
  // 1. DPDPA 2023 DATA PROTECTION ADDENDUM
  {
    id: 'dpdpa-data-privacy-india',
    title: 'Digital Personal Data Protection Act (DPDPA 2023) Statutory Addendum',
    category: 'Indian Statutory / Privacy',
    documentType: LegalDocumentType.INDIAN_LAW,
    description: 'Statutory data fiduciary agreement incorporating DPDPA 2023 consent notices, Data Principal statutory rights, 72-hr DPBI reporting, and penalties up to ₹250 Crores.',
    rawText: `DATA PROTECTION ADDENDUM (UNDER THE DIGITAL PERSONAL DATA PROTECTION ACT, 2023)

This Data Protection Addendum ("DPA") is executed as of January 15, 2026, by and between Bharat Cloud Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at Koramangala, Bengaluru, Karnataka 560034 ("Data Fiduciary"), and FinNext Intelligence Private Limited, having its registered office at Nariman Point, Mumbai, Maharashtra 400021 ("Data Processor").

1. STATUTORY PURPOSE & DEFINITIONS
This DPA governs the processing of Digital Personal Data in compliance with the Digital Personal Data Protection Act, 2023 ("DPDPA 2023") and any rules promulgated thereunder by the Ministry of Electronics and Information Technology (MeitY). The terms "Data Fiduciary", "Data Principal", "Data Processor", and "Personal Data Breach" shall have the meanings ascribed to them under Section 2 of the DPDPA 2023.

2. NOTICE AND STATUTORY CONSENT UNDER SECTION 6
In accordance with Section 6 of the DPDPA 2023, Data Fiduciary warrants that every Data Principal whose personal data is provided to Data Processor has been furnished with an itemized notice in English and one of the 22 languages specified in the Eighth Schedule to the Constitution of India. The processing of personal data shall be strictly limited to the specified purpose for which consent was affirmatively provided.

3. MANDATORY 72-HOUR BREACH REPORTING TO DATA PROTECTION BOARD OF INDIA (DPBI)
In the event of any suspected or confirmed Personal Data Breach, Data Processor shall notify Data Fiduciary in writing within twenty-four (24) hours of becoming aware of the incident. Data Fiduciary shall inturn notify the Data Protection Board of India ("DPBI") and each affected Data Principal within seventy-two (72) hours in accordance with Section 8(6) of the DPDPA 2023.

4. STATUTORY RIGHTS OF DATA PRINCIPALS UNDER SECTION 12
Data Processor shall provide technological infrastructure to enable Data Fiduciary to fulfill all statutory rights of Data Principals under Section 12 of the DPDPA 2023, including: (a) right to access information about processing; (b) right to correction and erasure of personal data; (c) right of grievance redressal within seven (7) business days; and (d) right to nominate any other individual in the event of death or incapacity.

5. CROSS-BORDER DATA TRANSFERS & RESTRICTED JURISDICTIONS
Personal data of Indian citizens shall not be transferred to, stored in, or accessed from any country or territory specifically restricted or blacklisted by the Central Government of India via official notification under Section 16 of the DPDPA 2023. Data Processor covenants that primary database nodes storing financial personal data shall remain localized within data centers situated in the Republic of India.

6. REGULATORY PENALTIES & INDEMNIFICATION UNDER SCHEDULE 1
Data Processor acknowledges that failure to implement reasonable security safeguards under Section 8(5) risks statutory penalties of up to Two Hundred and Fifty Crores of Rupees (₹250,00,00,000) imposed by the Data Protection Board of India under Schedule 1 of the DPDPA 2023. Data Processor agrees to indemnify Data Fiduciary for any administrative monetary penalties levied by the DPBI directly caused by Data Processor's gross negligence or willful failure to implement technical and organizational security controls.`,
    precomputedAnalysis: {
      documentId: 'dpdpa-data-privacy-india',
      documentTitle: 'Digital Personal Data Protection Act (DPDPA 2023) Statutory Addendum',
      documentType: LegalDocumentType.INDIAN_LAW,
      wordCount: 472,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 68,
        overallRating: 'moderate',
        unilateralObligationsScore: 72,
        harshIndemnitiesScore: 84,
        liquidatedDamagesScore: 60,
        autoRenewalTrapScore: 35,
        criticalFlagsCount: 3,
        summary: 'Indian statutory data protection addendum governed by the Digital Personal Data Protection Act, 2023. The agreement mandates 72-hour DPBI breach reporting, Section 12 Data Principal rights, and holds the processor to statutory penalty indemnities of up to ₹250 Crores under Schedule 1.',
        documentType: LegalDocumentType.INDIAN_LAW,
        typeDimensions: [
          {
            key: 'sec27_restraint_trade',
            label: 'Section 27 ICA & Enforceability',
            score: 25,
            status: 'safe',
            description: 'No post-termination restraint of trade covenants detected; compliance with Section 27 of the Indian Contract Act, 1872 maintained.'
          },
          {
            key: 'dpdpa_regulatory_penalties',
            label: 'DPDPA 2023 Statutory Liabilities',
            score: 84,
            status: 'critical',
            description: 'Strict regulatory exposure under DPDPA 2023 with potential DPBI fines reaching ₹250 Crores for breach of security safeguards under Schedule 1.'
          },
          {
            key: 'rera_consumer_protection',
            label: 'RERA 2016 Carpet Area & Interest',
            score: 15,
            status: 'safe',
            description: 'Non-real estate commercial agreement; standard commercial data governance provisions apply.'
          },
          {
            key: 'arbitration_stamp_jurisdiction',
            label: 'Arbitration Seat, Stamp Duty & BNS',
            score: 42,
            status: 'warning',
            description: 'Ensure agreement execution carries appropriate stamp duty under the Karnataka Stamp Act (Bengaluru) to avoid arbitral impounding.'
          }
        ]
      },
      clauses: [
        {
          id: 'dp-1',
          sectionNumber: 'Section 2',
          title: 'Statutory Notice & Consent Mandate under Section 6',
          category: 'dpdpa_data_protection',
          riskLevel: 'moderate',
          riskScore: 48,
          originalText: 'In accordance with Section 6 of the DPDPA 2023, Data Fiduciary warrants that every Data Principal whose personal data is provided to Data Processor has been furnished with an itemized notice in English and one of the 22 languages specified in the Eighth Schedule to the Constitution of India...',
          plainEnglishText: 'The Data Fiduciary must give every individual a clear notice in English or one of the 22 recognized Indian regional languages before taking their data, explaining exactly what it will be used for.',
          executiveSummary: 'Mandates DPDPA Section 6 multilingual consent notice across 22 Eighth Schedule languages, strictly barring processing beyond specified consent.',
          riskReasons: ['Requires localized itemized notices in 22 Eighth Schedule languages', 'Processing strictly conditioned on specific purpose'],
          impactOnUser: 'Inadequate consent notice voids legal basis of processing under Indian law.',
          suggestedAction: 'Implement bilingual consent flow capturing explicit affirmative consent.',
          questionForLawyer: 'How will consent verification records be audited under MeitY DPDPA compliance rules?',
          translations: {
            hi: 'डीपीडीपीए 2023 की धारा 6 के अनुसार, डेटा फिडुशियरी को डेटा लेने से पहले अंग्रेजी या 22 आधिकारिक भारतीय भाषाओं में स्पष्ट सूचना देनी होगी।',
            ta: 'டிஜிட்டல் தனிநபர் தரவு பாதுகாப்பு சட்டம் 2023 பிரிவு 6-ன் படி, ஆங்கிலம் அல்லது 22 அட்டவணைப்படுத்தப்பட்ட மொழிகளில் முன் அறிவிப்பு வழங்கப்பட வேண்டும்.',
            es: 'De conformidad con el Artículo 6 de la DPDPA 2023, el Fiduciario de Datos garantiza aviso previo en inglés o en una de las 22 lenguas oficiales de la India.'
          },
          domainTag: 'DPDPA 2023 Sec 6'
        },
        {
          id: 'dp-2',
          sectionNumber: 'Section 3',
          title: 'Mandatory 72-Hour DPBI Breach Reporting Window',
          category: 'dpdpa_data_protection',
          riskLevel: 'high',
          riskScore: 78,
          originalText: 'Data Processor shall notify Data Fiduciary in writing within twenty-four (24) hours... Data Fiduciary shall inturn notify the Data Protection Board of India ("DPBI") and each affected Data Principal within seventy-two (72) hours in accordance with Section 8(6) of the DPDPA 2023.',
          plainEnglishText: 'If a data breach happens, the processor has 24 hours to tell the company, and the company must alert the Indian Data Protection Board and all affected citizens within 72 hours.',
          executiveSummary: 'Statutory deadline of 24h internal notice and 72h regulatory notification to the Data Protection Board of India under Section 8(6).',
          riskReasons: ['Tight 24h notification window for processor', 'Mandatory 72h notice to DPBI under Section 8(6)'],
          impactOnUser: 'Delayed reporting constitutes a separate statutory violation punishable under Schedule 1.',
          suggestedAction: 'Establish automated SOC alerts to meet the 24-hour escalation requirement.',
          questionForLawyer: 'Does the reporting requirement trigger on suspected breaches or confirmed breaches?',
          translations: {
            hi: 'डेटा उल्लंघन की स्थिति में 24 घंटे में कंपनी को और 72 घंटे के भीतर भारतीय डेटा संरक्षण बोर्ड (DPBI) को सूचित करना अनिवार्य है।',
            ta: 'தரவு மீறல் ஏற்பட்டால் 24 மணி நேரத்திற்குள் நிறுவனத்திற்கும், 72 மணி நேரத்திற்குள் இந்திய தரவு பாதுகாப்பு வாரியத்திற்கும் தெரிவிக்க வேண்டும்.',
            es: 'En caso de brecha de datos, notificación obligatoria en 24 horas al Fiduciario y en 72 horas a la Junta de Protección de Datos de la India (DPBI).'
          },
          domainTag: 'DPBI Reporting'
        },
        {
          id: 'dp-3',
          sectionNumber: 'Section 6',
          title: 'Statutory Penalties up to ₹250 Crores & Processor Indemnity',
          category: 'liabilities_indemnities',
          riskLevel: 'high',
          riskScore: 92,
          originalText: 'Data Processor acknowledges that failure to implement reasonable security safeguards under Section 8(5) risks statutory penalties of up to Two Hundred and Fifty Crores of Rupees (₹250,00,00,000) imposed by the Data Protection Board of India under Schedule 1... Data Processor agrees to indemnify...',
          plainEnglishText: 'The processor acknowledges that under Indian law, security failures can lead to massive government fines of up to ₹250 Crores, and agrees to reimburse the company for any fines caused by their negligence.',
          executiveSummary: 'Indemnification covenant covering statutory regulatory fines up to ₹250 Crores under DPDPA 2023 Schedule 1 for breach of security safeguards.',
          riskReasons: ['Massive financial exposure up to ₹250 Crores per incident', 'Uncapped indemnity for regulatory administrative penalties'],
          impactOnUser: 'Catastrophic liability if a breach occurs on the processor side.',
          suggestedAction: 'Negotiate a commercial liability cap and restrict indemnification to gross negligence or willful misconduct.',
          questionForLawyer: 'Are regulatory fines levied by DPBI legally indemnifiable under Indian public policy?',
          translations: {
            hi: 'डीपीडीपीए अनुसूची 1 के तहत सुरक्षा में चूक पर ₹250 करोड़ तक के वैधानिक जुर्माने की पूरी क्षतिपूर्ति प्रोसेसर पर डाली गई है।',
            ta: 'பாதுகாப்பு குறைபாட்டிற்கு அட்டவணை 1-ன் கீழ் ₹250 கோடி வரை அபராதம் விதிக்கப்படலாம்; அதற்கான முழு இழப்பீட்டு பொறுப்பும் செயலி மீது சுமத்தப்படுகிறது.',
            es: 'Indemnización por sanciones administrativas de hasta 250 millones de rupias (₹250 Crores) bajo el Anexo 1 de la DPDPA 2023.'
          },
          domainTag: 'Schedule 1 Penalty'
        }
      ],
      obligations: [
        {
          id: 'dp-ob-1',
          clauseId: 'dp-2',
          section: 'Section 3',
          title: 'Data Processor 24-Hour Breach Escalation',
          description: 'Transmit written breach analysis and scope report to Data Fiduciary CISO within 24 hours.',
          noticeDays: 1,
          penaltyWarning: 'Breach of Section 8(6) DPDPA leading to statutory DPBI enforcement',
          completed: false
        },
        {
          id: 'dp-ob-2',
          clauseId: 'dp-1',
          section: 'Section 4',
          title: 'Data Principal Grievance Redressal Mechanism',
          description: 'Acknowledge, investigate, and provide resolution for erasure or correction requests within 7 business days.',
          noticeDays: 7,
          penaltyWarning: 'Direct complaint escalation to Data Protection Board of India under Section 13',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Digital Personal Data Protection Act (DPDPA 2023) Statutory Addendum',
        clientNamePlaceholder: 'FinNext Intelligence Private Limited',
        keyAmbiguities: [
          'Does not specify whether the ₹250 Crore indemnity is subject to a commercial limitation of liability cap or represents uncapped exposure.',
          'Definition of "suspected" breach lacks materiality thresholds, creating operational risk of premature regulatory disclosures.'
        ],
        conflictingClauses: [
          'Section 6 indemnity requires processor to cover statutory administrative fines, which may be legally uninsurable under Indian public policy.'
        ],
        factualTimeline: [
          { event: 'Processor Internal Incident Notice', triggerCondition: 'Within 24 hours of awareness', sectionRef: 'Section 3' },
          { event: 'DPBI & Data Principal Statutory Notice', triggerCondition: 'Strict 72 hours under Section 8(6)', sectionRef: 'Section 3' },
          { event: 'Grievance Redressal Resolution', triggerCondition: '7 business days from citizen filing', sectionRef: 'Section 4' }
        ],
        targetedQuestions: [
          '1. Can the indemnity for DPBI statutory penalties (₹250 Cr) be capped at the trailing 12-month contract fees under Indian law?',
          '2. Does the processor require Significant Data Fiduciary registration under Section 10 rules?',
          '3. Is an express carve-out included for data subject frivolous complaints under Section 13(2)?'
        ]
      },
      analyzedAt: '2026-09-14T13:20:00Z'
    }
  },

  // 2. INDIAN IT EMPLOYMENT & SERVICE BOND AGREEMENT (ICA 1872 & BNS 2023)
  {
    id: 'indian-contract-act-service-bond',
    title: 'Indian IT Employment & Service Bond Agreement (ICA 1872 & BNS 2023)',
    category: 'Indian Statutory / Employment',
    documentType: LegalDocumentType.INDIAN_LAW,
    description: 'Realistic Indian employment agreement containing a post-employment 2-year non-compete (VOID under Sec 27 ICA), a ₹5,00,000 service bond, and BNS 2023 criminal breach of trust covenants.',
    rawText: `EMPLOYMENT AND SERVICE BOND AGREEMENT

This Employment and Service Bond Agreement ("Agreement") is made and entered into at Bengaluru, Karnataka, on this 1st day of February, 2026, by and between:
TechNova Infotech Private Limited, a company incorporated under the Companies Act, 2013, with its corporate office at Electronic City Phase 1, Bengaluru, Karnataka 560100 ("Company" or "Employer");
AND
Rohan Sharma, residing at Indiranagar, Bengaluru, Karnataka 560038 ("Employee").

1. APPOINTMENT AND SCOPE OF WORK
Company hereby employs Employee as Senior Cloud Architect. Employee agrees to devote full business time and best efforts exclusively to the business of the Company.

2. RESTRAINT OF TRADE & POST-TERMINATION NON-COMPETE COVENANT
Employee explicitly agrees that during the term of employment and for a continuous period of twenty-four (24) months immediately following the termination or resignation of employment for any reason, Employee shall not, directly or indirectly, whether as an employee, consultant, advisor, partner, or shareholder, engage in, work for, or assist any entity, startup, or competitor operating in the field of cloud infrastructure, artificial intelligence, or financial technology anywhere within the territorial territory of the Republic of India.

3. MANDATORY 3-YEAR SERVICE BOND & LIQUIDATED DAMAGES FORFEITURE
In consideration of specialized technical training provided by Company, Employee executes this mandatory Service Bond agreeing to serve Company for a minimum lock-in tenure of thirty-six (36) consecutive months. If Employee resigns, discontinues service, or is terminated for cause prior to the expiry of the lock-in period, Employee shall immediately forfeit and pay to Company a predetermined liquidated damages sum of Five Lakh Indian Rupees (INR 5,00,000/-) as compensatory training damages.

4. EXCLUSIVE SERVICE AND PROHIBITION ON MOONLIGHTING
Employee shall not, without prior written approval of the Board of Directors, accept any secondary engagement, freelance assignment, advisory gig, or commercial work, whether compensated or honorary ("Moonlighting"). Any violation shall constitute gross misconduct and immediate cause for termination.

5. BHARATIYA NYAYA SANHITA (BNS 2023) PENAL COVENANT & CRIMINAL BREACH OF TRUST
Employee acknowledges that any unauthorized retention, copying, or dissemination of proprietary source code, cryptographic keys, or customer records shall be deemed Criminal Breach of Trust under Section 316 of the Bharatiya Nyaya Sanhita, 2023 ("BNS 2023"), and Company reserves the full right to lodge First Information Reports (FIR) and initiate criminal prosecution in addition to civil injunctive remedies.

6. GOVERNING LAW, ARBITRATION, AND JURISDICTION
This Agreement shall be construed in accordance with the laws of India, including the Indian Contract Act, 1872. Any dispute shall be resolved by sole arbitrator appointed mutually under the Arbitration and Conciliation Act, 1996, with the legal seat and venue of arbitration at Bengaluru. The courts of Bengaluru shall have exclusive jurisdiction.`,
    precomputedAnalysis: {
      documentId: 'indian-contract-act-service-bond',
      documentTitle: 'Indian IT Employment & Service Bond Agreement (ICA 1872 & BNS 2023)',
      documentType: LegalDocumentType.INDIAN_LAW,
      wordCount: 465,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 89,
        overallRating: 'high',
        unilateralObligationsScore: 92,
        harshIndemnitiesScore: 85,
        liquidatedDamagesScore: 94,
        autoRenewalTrapScore: 40,
        criticalFlagsCount: 4,
        summary: 'High legal exposure under Indian Law. Clause 2 imposes a 24-month post-employment non-compete that is VOID ab initio under Section 27 of the Indian Contract Act, 1872. Clause 3 imposes a ₹5,00,000 service bond penalty that is unenforceable under Section 74 without proof of actual training expenses.',
        documentType: LegalDocumentType.INDIAN_LAW,
        typeDimensions: [
          {
            key: 'sec27_restraint_trade',
            label: 'Section 27 ICA & Enforceability',
            score: 95,
            status: 'critical',
            description: 'Clause 2 post-termination non-compete is VOID ab initio under Section 27 Indian Contract Act 1872 (Supreme Court rulings in Percept D\'Mark v. Zaheer Khan and Niranjan Shankar Golikari).'
          },
          {
            key: 'dpdpa_regulatory_penalties',
            label: 'DPDPA 2023 Statutory Liabilities',
            score: 30,
            status: 'safe',
            description: 'Standard employer-employee records; general internal employment processing exemptions under Section 17 DPDPA 2023 apply.'
          },
          {
            key: 'rera_consumer_protection',
            label: 'RERA 2016 Carpet Area & Interest',
            score: 10,
            status: 'safe',
            description: 'Non-applicable to IT employment agreements.'
          },
          {
            key: 'arbitration_stamp_jurisdiction',
            label: 'Arbitration Seat, Stamp Duty & BNS',
            score: 75,
            status: 'critical',
            description: 'Clause 5 references criminal prosecution under Section 316 BNS 2023 for trade secret retention, which is non-arbitrable under Booz Allen & Hamilton v. SBI Home Finance.'
          }
        ]
      },
      clauses: [
        {
          id: 'ind-c-1',
          sectionNumber: 'Section 2',
          title: 'Post-Termination Non-Compete (VOID under Section 27 ICA 1872)',
          category: 'restraint_of_trade_sec27',
          riskLevel: 'high',
          riskScore: 96,
          originalText: 'Employee explicitly agrees that during the term of employment and for a continuous period of twenty-four (24) months immediately following the termination or resignation... Employee shall not, directly or indirectly... engage in, work for, or assist any entity, startup, or competitor... anywhere within the territorial territory of the Republic of India.',
          plainEnglishText: 'The company is trying to ban you from working for any competitor anywhere in India for 2 years after leaving. In India, this is completely illegal and void under Section 27 of the Indian Contract Act.',
          executiveSummary: 'Post-employment non-compete covenant is legally VOID ab initio under Section 27 of the Indian Contract Act, 1872, per established Supreme Court precedent.',
          riskReasons: ['Violates Section 27 of the Indian Contract Act, 1872', 'Contrary to Supreme Court landmark in Percept D\'Mark v. Zaheer Khan'],
          impactOnUser: 'Severe restriction on future livelihood, though legally unenforceable in Indian courts.',
          suggestedAction: 'Refuse covenant or insist on deletion referencing Section 27 and Percept D\'Mark.',
          questionForLawyer: 'Will the employer confirm in writing that Section 2 is nullified in light of Indian public policy?',
          translations: {
            hi: 'भारतीय अनुबंध अधिनियम, 1872 की धारा 27 के तहत नौकरी छोड़ने के बाद 2 साल तक किसी प्रतिस्पर्धी कंपनी में काम करने पर रोक पूरी तरह से अवैध और अमान्य (Void) है।',
            ta: 'இந்திய ஒப்பந்தச் சட்டம் 1872 பிரிவு 27-ன் படி, வேலையை விட்டு விலகிய பிறகு 2 ஆண்டுகள் வேறு நிறுவனத்தில் பணிபுரிய தடை விதிக்கும் இந்த ஷரத்து செல்லாது (Void).',
            es: 'Pacto de no competencia posterior al empleo es nulo de pleno derecho (VOID ab initio) según la Sección 27 de la Ley de Contratos de la India de 1872.'
          },
          domainTag: 'Section 27 ICA 1872'
        },
        {
          id: 'ind-c-2',
          sectionNumber: 'Section 3',
          title: '3-Year Service Bond & ₹5,00,000 Penalty (Section 74 ICA)',
          category: 'liabilities_indemnities',
          riskLevel: 'high',
          riskScore: 86,
          originalText: 'Employee executes this mandatory Service Bond agreeing to serve Company for a minimum lock-in tenure of thirty-six (36) consecutive months. If Employee resigns... Employee shall immediately forfeit and pay to Company a predetermined liquidated damages sum of Five Lakh Indian Rupees (INR 5,00,000/-)...',
          plainEnglishText: 'You are asked to commit to 3 years or pay a ₹5 Lakh fine. Under Indian law (Section 74), companies cannot collect arbitrary penalty amounts unless they prove they spent that exact amount on real, specialized training.',
          executiveSummary: 'Service bond of ₹5,00,000 acts as an in terrorem penalty unenforceable under Section 74 unless employer proves genuine commensurate training expenses.',
          riskReasons: ['Unreasonable forfeiture under Section 74 ICA', 'No itemization of actual training expenses incurred'],
          impactOnUser: 'Financial harassment and delayed relieving letter upon resignation.',
          suggestedAction: 'Require employer to show evidence of specialized third-party training before agreeing to any bond.',
          questionForLawyer: 'Can the employer legally withhold relieving letters or experience certificates for non-payment of bond amounts?',
          translations: {
            hi: 'धारा 74 के अनुसार ₹5,00,000 का यह सेवा बांड (Service Bond) एक दंडात्मक जुर्माना है। कंपनी वास्तविक प्रशिक्षण खर्च साबित किए बिना यह राशि जबरन वसूल नहीं कर सकती।',
            ta: 'பிரிவு 74-ன் படி ₹5 லட்சம் சர்வீஸ் பாண்ட் என்பது அபராதமாகும். நிறுவனம் உண்மையான பயிற்சி செலவை நிரூபிக்காமல் இந்த தொகையை வசூலிக்க முடியாது.',
            es: 'Fianza de servicio de ₹5,00,000 constituye una penalidad excesiva inexigible según la Sección 74 salvo prueba de gastos reales de capacitación.'
          },
          domainTag: 'Section 74 ICA 1872'
        },
        {
          id: 'ind-c-3',
          sectionNumber: 'Section 5',
          title: 'Criminal Breach of Trust under Bharatiya Nyaya Sanhita (BNS 2023)',
          category: 'bns_criminal_liability',
          riskLevel: 'high',
          riskScore: 82,
          originalText: 'Employee acknowledges that any unauthorized retention, copying, or dissemination of proprietary source code... shall be deemed Criminal Breach of Trust under Section 316 of the Bharatiya Nyaya Sanhita, 2023 ("BNS 2023"), and Company reserves the full right to lodge First Information Reports (FIR)...',
          plainEnglishText: 'The contract threatens criminal police charges (FIR) under the new Bharatiya Nyaya Sanhita 2023 criminal code if you keep or share work files.',
          executiveSummary: 'Explicitly invokes criminal prosecution under Section 316 BNS 2023 (replacing IPC Sec 405) for trade secret or code possession.',
          riskReasons: ['Threat of criminal proceedings (FIR) under BNS Section 316', 'Bypasses civil dispute resolution mechanisms'],
          impactOnUser: 'Potential police intimidation during exit disputes.',
          suggestedAction: 'Insist on standard civil injunctive remedies and delete criminal penal threats from employment contracts.',
          questionForLawyer: 'Does Section 316 BNS apply to good faith software developers in the ordinary course of remote employment?',
          translations: {
            hi: 'कोड या डेटा बनाए रखने पर नए भारतीय न्याय संहिता (BNS 2023) की धारा 316 के तहत आपराधिक विश्वासघात (Criminal Breach of Trust) और FIR की चेतावनी दी गई है।',
            ta: 'புதிய பாரதிய நியாய சன்ஹிதா 2023 பிரிவு 316-ன் கீழ் நம்பிக்கை துரோக குற்றவியல் வழக்கு (FIR) பதிவு செய்யப்படும் என்று அச்சுறுத்தப்பட்டுள்ளது.',
            es: 'Invoca persecución penal por abuso de confianza criminal bajo la Sección 316 del nuevo Código Penal de la India (BNS 2023).'
          },
          domainTag: 'BNS 2023 Sec 316'
        }
      ],
      obligations: [
        {
          id: 'ind-ob-1',
          clauseId: 'ind-c-2',
          section: 'Section 3',
          title: '36-Month Lock-in Tenure Compliance',
          description: 'Maintain continuous employment or face dispute over training cost reimbursement claim.',
          noticeDays: 1095,
          penaltyWarning: 'Attempted forfeiture of INR 5,00,000 liquidated damages claim',
          completed: false
        },
        {
          id: 'ind-ob-2',
          clauseId: 'ind-c-1',
          section: 'Section 4',
          title: 'Zero-Moonlighting Disclosure',
          description: 'Refrain from secondary commercial engagements without Board written consent.',
          penaltyWarning: 'Immediate summary dismissal for gross misconduct',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Indian IT Employment & Service Bond Agreement (ICA 1872 & BNS 2023)',
        clientNamePlaceholder: 'Rohan Sharma',
        keyAmbiguities: [
          'Section 2 fails to acknowledge Section 27 of the Indian Contract Act, 1872, rendering the 24-month post-employment restriction legally dead on arrival.',
          'Section 3 fails to itemize actual specialized training costs, making the ₹5,00,000 claim vulnerable to complete dismissal under Section 74.'
        ],
        conflictingClauses: [
          'Section 5 attempts to submit criminal breach of trust under BNS 2023 to Section 6 arbitration, which violates the Supreme Court ruling in Booz Allen (criminal matters are non-arbitrable).'
        ],
        factualTimeline: [
          { event: 'Service Bond Lock-in Expiry', triggerCondition: '36 continuous months from joining date', sectionRef: 'Section 3' },
          { event: 'Post-employment Non-Compete Window', triggerCondition: '24 months post-termination (Legally Void)', sectionRef: 'Section 2' }
        ],
        targetedQuestions: [
          '1. In light of Percept D\'Mark v. Zaheer Khan, will the employer delete the post-employment non-compete in Section 2?',
          '2. Can the employer produce itemized invoices demonstrating actual training costs to justify any bond amount under Section 74?',
          '3. Has this agreement been stamped with required stamp duty under the Karnataka Stamp Act?'
        ]
      },
      analyzedAt: '2026-09-14T13:20:00Z'
    }
  },

  // 3. RERA BUILDER-ALLOTTEE APARTMENT AGREEMENT (RERA ACT 2016)
  {
    id: 'rera-builder-allottee-agreement',
    title: 'RERA Real Estate Allotment Agreement (RERA Act 2016 & State Rules)',
    category: 'Indian Statutory / Real Estate',
    documentType: LegalDocumentType.INDIAN_LAW,
    description: 'Allotment agreement under the Real Estate (Regulation and Development) Act, 2016, with statutory carpet area protections, 5-year defect warranty, and SBI MCLR delay compensation.',
    rawText: `AGREEMENT FOR ALLOTMENT (UNDER SECTION 13 OF RERA ACT, 2016)

This Agreement for Allotment ("Agreement") is executed at Mumbai on this 10th day of March, 2026, by and between:
Prestige Heights Developers LLP, a limited liability partnership having its registered office at Bandra Kurla Complex, Bandra (East), Mumbai, Maharashtra 400051, registered with MahaRERA under Registration No. P51800098765 ("Promoter");
AND
Ananya Iyer and Vikram Iyer, residing at Powai, Mumbai, Maharashtra 400076 ("Allottees").

1. RERA STATUTORY CARPET AREA SPECIFICATION
The Promoter agrees to sell and the Allottees agree to purchase Apartment No. 1402 on the 14th Floor of Wing B having a Carpet Area of 1,120 square feet (104.05 square meters) as defined under Section 2(k) of the Real Estate (Regulation and Development) Act, 2016 ("RERA Act"). The parties expressly agree that no additional charge shall be levied for super built-up area markup or common circulation spaces.

2. SEPARATE BANK ACCOUNT & 70% ESCROW COMPLIANCE
In accordance with Section 4(2)(l)(D) of the RERA Act, 2016, Promoter warrants that seventy percent (70%) of all amounts realized from Allottees for the real estate project shall be deposited in a separate dedicated scheduled bank account to cover the cost of construction and land cost, withdrawn strictly in proportion to the percentage of project completion certified by an engineer, architect, and chartered accountant in practice.

3. POSSESSION DATE & STATUTORY DELAY COMPENSATION UNDER SECTION 18
The Promoter undertakes to complete the construction and hand over possession of the Apartment with Occupancy Certificate on or before December 31, 2026. In the event of any delay in handing over possession, the Promoter shall be liable to pay interest to the Allottee for every month of delay at the rate prescribed under Rule 18 of MahaRERA (equal to the State Bank of India's highest Marginal Cost of Lending Rate [MCLR] plus two percent [2%]) until handing over of lawful possession.

4. 5-YEAR STRUCTURAL DEFECT WARRANTY UNDER SECTION 14(3)
In case any structural defect or any other defect in workmanship, quality, or provision of services is brought to the notice of the Promoter within a period of five (5) years by the Allottee from the date of handing over possession, it shall be the duty of the Promoter to rectify such defects without further charge within thirty (30) days.

5. RESTRICTION ON ARBITRARY MODIFICATIONS & ALTERATIONS
Promoter shall not make any major additions and alterations in the sanctioned plans, layout plans, and specifications of the building or common areas without the previous written consent of at least two-thirds (2/3) of the allottees who have agreed to take apartments in such building under Section 14(2) of the RERA Act.

6. BAR OF JURISDICTION OF CIVIL COURTS UNDER SECTION 79
Pursuant to Section 79 of the RERA Act, 2016, no civil court shall have jurisdiction to entertain any suit or proceeding in respect of any matter which the Real Estate Regulatory Authority (MahaRERA) or the Real Estate Appellate Tribunal is empowered to determine.`,
    precomputedAnalysis: {
      documentId: 'rera-builder-allottee-agreement',
      documentTitle: 'RERA Real Estate Allotment Agreement (RERA Act 2016 & State Rules)',
      documentType: LegalDocumentType.INDIAN_LAW,
      wordCount: 488,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 34,
        overallRating: 'low',
        unilateralObligationsScore: 28,
        harshIndemnitiesScore: 22,
        liquidatedDamagesScore: 35,
        autoRenewalTrapScore: 15,
        criticalFlagsCount: 0,
        summary: 'Pro-consumer RERA allotment agreement rigorously aligned with the Real Estate (Regulation and Development) Act, 2016. Enforces Section 2(k) carpet area pricing, 70% escrow maintenance, mandatory delay compensation at SBI MCLR + 2%, and a 5-year structural defect warranty under Section 14(3).',
        documentType: LegalDocumentType.INDIAN_LAW,
        typeDimensions: [
          {
            key: 'sec27_restraint_trade',
            label: 'Section 27 ICA & Enforceability',
            score: 12,
            status: 'safe',
            description: 'Consumer real estate allotment; no employment restraint of trade covenants.'
          },
          {
            key: 'dpdpa_regulatory_penalties',
            label: 'DPDPA 2023 Statutory Liabilities',
            score: 18,
            status: 'safe',
            description: 'Allottee KYC processing conforms to statutory RERA registration requirements.'
          },
          {
            key: 'rera_consumer_protection',
            label: 'RERA 2016 Carpet Area & Interest',
            score: 22,
            status: 'safe',
            description: 'Exemplary RERA compliance: strict carpet area definition, 70% escrow lock-in, and SBI MCLR + 2% delayed possession interest.'
          },
          {
            key: 'arbitration_stamp_jurisdiction',
            label: 'Arbitration Seat, Stamp Duty & BNS',
            score: 30,
            status: 'safe',
            description: 'Section 79 civil court bar cleanly channels all consumer disputes to MahaRERA and Real Estate Appellate Tribunal; ensure registration under Maharashtra Stamp Act.'
          }
        ]
      },
      clauses: [
        {
          id: 'rera-1',
          sectionNumber: 'Section 1',
          title: 'Carpet Area Pricing Mandate under Section 2(k)',
          category: 'rera_consumer_protection',
          riskLevel: 'low',
          riskScore: 20,
          originalText: 'The Promoter agrees to sell and the Allottees agree to purchase... having a Carpet Area of 1,120 square feet (104.05 square meters) as defined under Section 2(k) of the Real Estate (Regulation and Development) Act, 2016... no additional charge shall be levied for super built-up area markup...',
          plainEnglishText: 'You are only paying for the actual usable floor area inside your apartment walls (RERA Carpet Area). The builder cannot charge hidden super built-up markups.',
          executiveSummary: 'Statutory compliance with Section 2(k) RERA carpet area standard, eliminating ambiguous super built-up area markups.',
          riskReasons: ['Statutory carpet area protection under RERA Section 2(k)'],
          impactOnUser: 'Guarantees that you only pay for usable internal square footage.',
          suggestedAction: 'Verify that carpet area matches sanctioned municipal corporation architectural drawings.',
          questionForLawyer: 'Does the agreement include a verified floor plan drawing signed by the architect?',
          translations: {
            hi: 'रेरा अधिनियम की धारा 2(k) के तहत आप केवल वास्तविक कारपेट एरिया (दीवारों के भीतर की उपयोग योग्य जगह) का भुगतान कर रहे हैं, सुपर बिल्ट-अप का नहीं।',
            ta: 'ரேரா சட்டம் பிரிவு 2(k)-ன் கீழ் நடைமுறைப்படுத்தப்பட்டுள்ள கார்பெட் ஏரியாவிற்கு மட்டுமே கட்டணம் வசூலிக்கப்படும்; கூடுதல் மறைமுக கட்டணம் வசூலிக்கப்படாது.',
            es: 'Cumplimiento de la norma de área útil alfombrada (Carpet Area) bajo la Sección 2(k) de la Ley RERA de 2016.'
          },
          domainTag: 'RERA Sec 2(k)'
        },
        {
          id: 'rera-2',
          sectionNumber: 'Section 3',
          title: 'Statutory Delay Compensation at SBI MCLR + 2% (Section 18)',
          category: 'rera_consumer_protection',
          riskLevel: 'low',
          riskScore: 24,
          originalText: 'In the event of any delay in handing over possession, the Promoter shall be liable to pay interest to the Allottee for every month of delay at the rate prescribed under Rule 18 of MahaRERA (equal to the State Bank of India\'s highest Marginal Cost of Lending Rate [MCLR] plus two percent [2%])...',
          plainEnglishText: 'If the builder delays handing over the flat past December 31, 2026, they must pay you monthly interest at SBI MCLR + 2% until you get your keys.',
          executiveSummary: 'Mandatory Section 18 delay interest compensation pegged to SBI MCLR + 2% per annum for every month of delayed delivery.',
          riskReasons: ['Statutory protection against indefinite construction delays'],
          impactOnUser: 'Provides legal certainty of monetary compensation if project possession is delayed.',
          suggestedAction: 'Track MahaRERA quarterly progress reports (QPR) to monitor completion percentage.',
          questionForLawyer: 'Does the force majeure clause contain any unauthorized extensions beyond 6 months?',
          translations: {
            hi: 'यदि बिल्डर 31 दिसंबर 2026 तक पजेशन नहीं देता है, तो उसे हर महीने की देरी के लिए एसबीआई एमसीएलआर + 2% की दर से ब्याज देना होगा।',
            ta: 'ஒப்பந்த தேதியைத் தாண்டி தாமதம் ஏற்பட்டால், எஸ்பிஐ எம்சிஎல்ஆர் + 2% வட்டி விகிதத்தில் மாதாந்திர இழப்பீடு பில்டர் வழங்க வேண்டும்.',
            es: 'Compensación obligatoria por retraso en entrega según la Sección 18 fijada en la tasa MCLR de SBI + 2% anual.'
          },
          domainTag: 'RERA Sec 18 Interest'
        },
        {
          id: 'rera-3',
          sectionNumber: 'Section 4',
          title: '5-Year Structural Defect Warranty under Section 14(3)',
          category: 'critical_obligations',
          riskLevel: 'low',
          riskScore: 18,
          originalText: 'In case any structural defect or any other defect in workmanship, quality, or provision of services is brought to the notice of the Promoter within a period of five (5) years... it shall be the duty of the Promoter to rectify such defects without further charge within thirty (30) days.',
          plainEnglishText: 'For 5 full years after you get possession, the builder is legally obligated to repair any structural crack or construction defect for free within 30 days.',
          executiveSummary: 'Statutory 5-year structural defect liability under Section 14(3) requiring prompt rectification without cost to allottees.',
          riskReasons: ['Statutory 5-year defect rectification protection under RERA'],
          impactOnUser: 'Protects buyer against substandard construction and structural degradation.',
          suggestedAction: 'Conduct a professional third-party snagging inspection prior to taking possession.',
          questionForLawyer: 'Are electrical wiring and waterproofing explicitly covered under the 5-year defect warranty?',
          translations: {
            hi: 'पजेशन मिलने के 5 साल तक किसी भी संरचनात्मक खराबी (Structural Defect) को बिल्डर को 30 दिनों के भीतर बिना किसी अतिरिक्त खर्च के ठीक करना होगा।',
            ta: 'கைப்பற்றிய நாளிலிருந்து 5 ஆண்டுகளுக்கு ஏற்படும் கட்டிடக் குறைபாடுகளை பில்டர் 30 நாட்களுக்குள் இலவசமாக சரிசெய்து தர வேண்டும்.',
            es: 'Garantía legal de 5 años por defectos estructurales bajo la Sección 14(3) con rectificación gratuita en 30 días.'
          },
          domainTag: 'RERA Sec 14(3)'
        }
      ],
      obligations: [
        {
          id: 'rera-ob-1',
          clauseId: 'rera-2',
          section: 'Section 3',
          title: 'Promoter Possession Deadline & OC Handover',
          description: 'Procure lawful Occupancy Certificate and tender formal possession by December 31, 2026.',
          dueDateStr: 'December 31, 2026',
          penaltyWarning: 'Monthly interest liability at SBI MCLR + 2% per annum under Section 18',
          completed: false
        },
        {
          id: 'rera-ob-2',
          clauseId: 'rera-1',
          section: 'Section 2',
          title: '70% Construction Escrow Maintenance',
          description: 'Deposit 70% of collections in project designated RERA escrow bank account.',
          penaltyWarning: 'Freezing of account and penal revocation of RERA registration',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'RERA Real Estate Allotment Agreement (RERA Act 2016 & State Rules)',
        clientNamePlaceholder: 'Ananya Iyer & Vikram Iyer',
        keyAmbiguities: [
          'Possession clause should explicitly confirm whether force majeure grace period is capped at six (6) months.'
        ],
        conflictingClauses: [],
        factualTimeline: [
          { event: 'Project Construction & OC Possession', triggerCondition: 'December 31, 2026', sectionRef: 'Section 3' },
          { event: 'Defect Rectification Window', triggerCondition: '30 days from Allottee written defect notice', sectionRef: 'Section 4' },
          { event: 'Statutory Warranty Duration', triggerCondition: '5 continuous years from possession date', sectionRef: 'Section 4' }
        ],
        targetedQuestions: [
          '1. Has the Promoter uploaded the latest quarterly progress reports (QPR) and CA certificates on the MahaRERA portal?',
          '2. Does the title search report confirm clear and marketable title free from any banking mortgage liens?',
          '3. Are the parking spaces earmarked in compliance with the Supreme Court ruling in Nahalchand Laloochand?'
        ]
      },
      analyzedAt: '2026-09-14T13:20:00Z'
    }
  },

  // 4. INDIAN PATENT SPECIFICATION & 2024 AMENDMENT RULES
  {
    id: 'indian-patent-specification-2024',
    title: 'Indian Patent Specification (Patents Act 1970 & 2024 Amendment Rules)',
    category: 'Indian Statutory / Patents',
    documentType: LegalDocumentType.INDIAN_LAW,
    description: 'Patent application engineered to overcome the Section 3(k) statutory bar ("computer programme per se") under Ferid Allani, with Form 27 triennial commercial working reporting under 2024 Rules.',
    rawText: `COMPLETE SPECIFICATION (SECTION 10 OF THE PATENTS ACT, 1970)

APPLICANT: BHARAT INTELLIGENT SYSTEMS PRIVATE LIMITED
TITLE OF THE INVENTION: SECURE DECENTRALIZED IDENTITY VERIFICATION ENGINE WITH HARDWARE-SECURED ATTESTATION

FIELD OF THE INVENTION
The present invention relates generally to cryptographic identity management, and more specifically to a hardware-anchored biometric verification processor operating in distributed telecommunication environments.

BACKGROUND & OVERCOMING SECTION 3(k) STATUTORY EXCLUSION
Under Section 3(k) of the Patents Act, 1970, a "computer programme per se" is not patentable. However, as established by the High Court of Delhi in Ferid Allani v. Union of India (2019) and Telefonaktiebolaget LM Ericsson v. Intex Technologies, patentability is affirmed where an invention demonstrates a technical effect, a technical contribution, or an interaction with specific industrial hardware transforming physical processor state registers. The present invention is not an abstract algorithm, but a physical system comprising a trusted execution hardware core and cryptographic physical security coprocessor.

SUMMARY OF THE INVENTION
The invention provides a novel cryptographic attestation coprocessor coupled to an optical biometric acquisition sensor to execute zero-knowledge zero-leakage threshold tokenization.

CLAIMS (SECTION 10(4) OF THE PATENTS ACT, 1970)
We claim:
1. A hardware-anchored identity verification system comprising:
   an optical sensor configured to capture a physical biological pattern;
   a dedicated cryptographic security coprocessor electrically coupled to said optical sensor, said coprocessor comprising physical registers isolated from an operating system bus;
   wherein said cryptographic security coprocessor is configured to:
   (a) execute hardware-isolated feature extraction directly on said physical registers to generate a polynomial attestation matrix;
   (b) apply an irreversible one-way cryptographic permutation to said matrix to generate an ephemeral proof token without persisting raw biological patterns in volatile memory; and
   (c) transmit said ephemeral proof token across an air-gapped serial transceiver to establish authenticated session identity;
   thereby producing a technical contribution through hardware isolation that eliminates side-channel electromagnetic biometric leakage.
2. The system as claimed in claim 1, wherein said cryptographic security coprocessor comprises a physical random number generator (TRNG) producing true physical entropy from thermal noise registers.
3. The system as claimed in claim 1, wherein said air-gapped serial transceiver operates via an optical optocoupler preventing electrical feedback spikes.

SECTION 8 FOREIGN FILING & FORM 27 COMMERCIAL WORKING COMPLIANCE (2024 RULES)
The applicant shall fulfill the requirements of Section 8 of the Patents Act, 1970 by submitting Form 3 within the statutory period of six (6) months. In accordance with the Patents (Amendment) Rules, 2024, the applicant undertakes to submit Form 27 detailing the commercial working of the patent in India once every three (3) financial years, replacing the prior annual requirement.`,
    precomputedAnalysis: {
      documentId: 'indian-patent-specification-2024',
      documentTitle: 'Indian Patent Specification (Patents Act 1970 & 2024 Amendment Rules)',
      documentType: LegalDocumentType.INDIAN_LAW,
      wordCount: 461,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 42,
        overallRating: 'moderate',
        unilateralObligationsScore: 35,
        harshIndemnitiesScore: 25,
        liquidatedDamagesScore: 30,
        autoRenewalTrapScore: 45,
        criticalFlagsCount: 1,
        summary: 'Indian patent specification carefully crafted to overcome the Section 3(k) statutory bar ("computer programme per se"). Explicitly recites physical hardware registers and thermal entropy generators to satisfy the Delhi High Court Ferid Allani technical effect doctrine. Adopts 2024 triennial Form 27 working rules.',
        documentType: LegalDocumentType.INDIAN_LAW,
        typeDimensions: [
          {
            key: 'sec27_restraint_trade',
            label: 'Section 27 ICA & Enforceability',
            score: 15,
            status: 'safe',
            description: 'Standard inventor assignment clauses; no post-employment restrictive trade covenants.'
          },
          {
            key: 'dpdpa_regulatory_penalties',
            label: 'DPDPA 2023 Statutory Liabilities',
            score: 28,
            status: 'safe',
            description: 'Biometric processing features zero-leakage ephemeral tokens, aligning with DPDPA 2023 purpose limitation standards.'
          },
          {
            key: 'rera_consumer_protection',
            label: 'RERA 2016 Carpet Area & Interest',
            score: 10,
            status: 'safe',
            description: 'Non-applicable to patent specifications.'
          },
          {
            key: 'arbitration_stamp_jurisdiction',
            label: 'Arbitration Seat, Stamp Duty & BNS',
            score: 52,
            status: 'warning',
            description: 'Strict Section 8 Form 3 foreign filing reporting timelines and Patents (Amendment) Rules 2024 Form 27 commercial working triennial compliance mandatory.'
          }
        ]
      },
      clauses: [
        {
          id: 'inpat-1',
          sectionNumber: 'Claim 1',
          title: 'Independent Claim 1: Overcoming Section 3(k) Bar',
          category: 'patent_claims_scope',
          riskLevel: 'moderate',
          riskScore: 45,
          originalText: 'A hardware-anchored identity verification system comprising: an optical sensor... a dedicated cryptographic security coprocessor... comprising physical registers isolated from an operating system bus... thereby producing a technical contribution through hardware isolation...',
          plainEnglishText: 'Claim 1 is carefully structured to include specific physical chips, sensors, and hardware circuits so the Indian Patent Office cannot reject it as just "software code" under Section 3(k).',
          executiveSummary: 'Independent claim engineered with physical hardware co-processor limitations to satisfy Delhi High Court Ferid Allani test under Section 3(k).',
          riskReasons: ['Strict Section 3(k) judicial examination of technical effect'],
          impactOnUser: 'Proper hardware limitations ensure enforceable patent grant in India.',
          suggestedAction: 'Retain detailed circuit block diagrams in complete specification drawings.',
          questionForLawyer: 'Will the controller require benchmark telemetry to prove hardware state transformation under Ferid Allani?',
          translations: {
            hi: 'पेटेंट अधिनियम की धारा 3(k) के तहत केवल सॉफ्टवेयर को पेटेंट नहीं दिया जा सकता; इसलिए क्लेम 1 में हार्डवेयर प्रोसेसर और सेंसर जोड़कर तकनीकी प्रभाव साबित किया गया है।',
            ta: 'இந்திய காப்புரிமைச் சட்டம் பிரிவு 3(k)-ன் கீழ் மென்பொருளை மட்டுமே பதிவு செய்ய முடியாது; இதனால் இயற்பியல் வன்பொருள் மற்றும் சென்சார்களுடன் இணைக்கப்பட்டுள்ளது.',
            es: 'Reivindicación 1 formulada con elementos de hardware dedicados para superar la exclusión legal de software per se del Artículo 3(k).'
          },
          domainTag: 'Section 3(k) Patents Act'
        },
        {
          id: 'inpat-2',
          sectionNumber: 'Section 8 & Form 27',
          title: 'Patents (Amendment) Rules, 2024 Form 27 Triennial Working',
          category: 'indian_statutory_compliance',
          riskLevel: 'moderate',
          riskScore: 38,
          originalText: 'In accordance with the Patents (Amendment) Rules, 2024, the applicant undertakes to submit Form 27 detailing the commercial working of the patent in India once every three (3) financial years, replacing the prior annual requirement.',
          plainEnglishText: 'Under the newly amended Indian Patent Rules of 2024, patent holders now only need to report commercial working in India every 3 years instead of every single year.',
          executiveSummary: 'Incorporates updated Patents (Amendment) Rules 2024 easing Form 27 commercial working filings from annual to triennial cycles.',
          riskReasons: ['Statutory triennial filing compliance required under Section 146(2)'],
          impactOnUser: 'Reduces regulatory compliance overhead while maintaining commercial disclosure.',
          suggestedAction: 'Calendar Form 27 filings on a triennial cycle following patent grant.',
          questionForLawyer: 'Does the amendment apply retroactively to patents granted prior to the 2024 notification?',
          translations: {
            hi: 'पेटेंट (संशोधन) नियम, 2024 के तहत भारत में पेटेंट के व्यावसायिक उपयोग का विवरण (फॉर्म 27) अब हर साल के बजाय हर 3 वित्तीय वर्ष में एक बार देना होगा।',
            ta: 'காப்புரிமை (திருத்த) விதிகள் 2024-ன் படி, வணிக பயன்பாட்டு அறிக்கை (படிவம் 27) இனி ஒவ்வொரு ஆண்டும் பதிலாக 3 ஆண்டுகளுக்கு ஒருமுறை சமர்ப்பிக்கப்பட வேண்டும்.',
            es: 'Incorpora las Reglas de Enmienda de Patentes de 2024 que modifican la declaración de explotación Formulario 27 a ciclos trienales.'
          },
          domainTag: '2024 Rules Form 27'
        }
      ],
      obligations: [
        {
          id: 'inpat-ob-1',
          clauseId: 'inpat-2',
          section: 'Section 8',
          title: 'Section 8 Form 3 Foreign Filing Statement',
          description: 'Submit Form 3 disclosing corresponding foreign PCT/USPTO applications within 6 months.',
          noticeDays: 180,
          penaltyWarning: 'Revocation grounds under Section 64(1)(m) for non-compliance',
          completed: false
        },
        {
          id: 'inpat-ob-2',
          clauseId: 'inpat-2',
          section: 'Rules 2024',
          title: 'Form 27 Triennial Working Statement',
          description: 'File statement of commercial exploitation and local manufacturing quantum once every 3 financial years.',
          penaltyWarning: 'Statutory monetary penalty under Section 122 of Patents Act, 1970',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Indian Patent Specification (Patents Act 1970 & 2024 Amendment Rules)',
        clientNamePlaceholder: 'Bharat Intelligent Systems Private Limited',
        keyAmbiguities: [
          'Claim 1 recital of "air-gapped serial transceiver" may be argued as conventional hardware; consider adding specific baud rate or optocoupler circuit claims.'
        ],
        conflictingClauses: [],
        factualTimeline: [
          { event: 'Section 8 Form 3 Statutory Update', triggerCondition: 'Strict 6-month window from corresponding filings', sectionRef: 'Section 8' },
          { event: 'First Examination Report (FER) Response', triggerCondition: '6 months from issuance date', sectionRef: 'Section 12' },
          { event: 'Form 27 Commercial Working Reporting', triggerCondition: 'Triennial cycle under 2024 Amendment Rules', sectionRef: 'Form 27' }
        ],
        targetedQuestions: [
          '1. Does the patent specification provide sufficient working examples illustrating the "technical effect" as mandated by the Delhi High Court in Ferid Allani?',
          '2. Have all co-inventors executed Form 1 assignments with proper stamp duty in their respective Indian states?',
          '3. Is expedited examination available under Rule 24C (e.g. for DPIIT-recognized startups or female inventors)?'
        ]
      },
      analyzedAt: '2026-09-14T13:20:00Z'
    }
  },

  // 5. INDIAN WILL & TESTAMENTARY DISPOSITION (HSA 1956 & ISA 1925)
  {
    id: 'indian-family-will-succession',
    title: 'Indian Testamentary Will & Estate Disposition (HSA 1956 & ISA 1925)',
    category: 'Indian Statutory / Estate Planning',
    documentType: LegalDocumentType.INDIAN_LAW,
    description: 'Indian testamentary will distinguishing self-acquired assets from HUF coparcenary rights under the Hindu Succession Act (Vineeta Sharma doctrine), with Section 63 two-witness attestation.',
    rawText: `LAST WILL AND TESTAMENT

I, Rajeshwar Dayal Saxena, son of Late Shri Harish Dayal Saxena, aged approximately 68 years, residing at Bungalow No. 12, Golf Links, New Delhi 110003, do hereby revoke all my former wills, codicils, and testamentary dispositions made by me, and declare this to be my Last Will and Testament.

1. DECLARATION OF SOUND HEALTH AND TESTAMENTARY CAPACITY
I declare that I am in sound health of body and disposing state of mind, fully capable of understanding the nature and effect of this testamentary disposition, and execute this document of my own free will, without any undue influence, fraud, or coercion.

2. CLASSIFICATION OF SELF-ACQUIRED PROPERTY VS. ANCESTRAL COPARCENARY ESTATE
I declare that the residential bungalow at Golf Links, New Delhi, and commercial office space at Connaught Place, New Delhi, are my absolute self-acquired properties, purchased exclusively out of my personal earnings, and do not form part of any ancestral Hindu Undivided Family (HUF) coparcenary property. In respect of any ancestral agricultural land situated in Bareilly, Uttar Pradesh, I acknowledge that my rights therein are governed by the Hindu Succession Act, 1956 (as amended in 2005) and the Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), wherein my daughter Sunita Saxena possesses equal coparcenary rights by birth.

3. SPECIFIC BEQUESTS OF IMMOVABLE AND MOVABLE ASSETS
(a) I bequeath my residential bungalow at Golf Links, New Delhi, absolutely and forever to my wife, Smt. Kamla Saxena.
(b) I bequeath my commercial office space at Barakhamba Road, Connaught Place, New Delhi, in equal fifty percent (50%) undivided shares to my son Amit Saxena and my daughter Sunita Saxena as tenants-in-common.
(c) All my fixed deposits with State Bank of India, mutual funds, and equity shares in demat account held with HDFC Securities shall be liquidated and divided equally among my grandchildren.

4. APPOINTMENT OF EXECUTOR & SECTION 213 PROBATE CLAUSE
I hereby nominate and appoint my trusted nephew, Shri Devendra Saxena, Advocate, Supreme Court of India, as the sole Executor of this my Will. The Executor shall obtain probate if required under Section 213 and Section 57 of the Indian Succession Act, 1925, for properties situated within the presidency towns of Mumbai, Kolkata, or Chennai.

5. ATTESTATION UNDER SECTION 63 OF THE INDIAN SUCCESSION ACT, 1925
IN WITNESS WHEREOF, I have signed this Will in the presence of two independent attesting witnesses who have subscribed their names in my presence and in the presence of each other at New Delhi.`,
    precomputedAnalysis: {
      documentId: 'indian-family-will-succession',
      documentTitle: 'Indian Testamentary Will & Estate Disposition (HSA 1956 & ISA 1925)',
      documentType: LegalDocumentType.INDIAN_LAW,
      wordCount: 442,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 28,
        overallRating: 'low',
        unilateralObligationsScore: 20,
        harshIndemnitiesScore: 15,
        liquidatedDamagesScore: 25,
        autoRenewalTrapScore: 20,
        criticalFlagsCount: 0,
        summary: 'Meticulously drafted Indian testamentary instrument under the Indian Succession Act, 1925, and Hindu Succession Act, 1956. Accurately bifurcates self-acquired assets from ancestral coparcenary property in alignment with the Supreme Court Vineeta Sharma judgment. Meets Section 63 two-witness requirements.',
        documentType: LegalDocumentType.INDIAN_LAW,
        typeDimensions: [
          {
            key: 'sec27_restraint_trade',
            label: 'Section 27 ICA & Enforceability',
            score: 10,
            status: 'safe',
            description: 'Testamentary succession document; no commercial restraint of trade.'
          },
          {
            key: 'dpdpa_regulatory_penalties',
            label: 'DPDPA 2023 Statutory Liabilities',
            score: 15,
            status: 'safe',
            description: 'Personal testamentary instrument exempt from commercial DPDPA fiduciary mandates.'
          },
          {
            key: 'rera_consumer_protection',
            label: 'RERA 2016 Carpet Area & Interest',
            score: 10,
            status: 'safe',
            description: 'Non-applicable to testamentary wills.'
          },
          {
            key: 'arbitration_stamp_jurisdiction',
            label: 'Arbitration Seat, Stamp Duty & BNS',
            score: 35,
            status: 'safe',
            description: 'Strict Section 63 Indian Succession Act compliance with two independent witnesses present simultaneously; notes Section 213 probate requirements.'
          }
        ]
      },
      clauses: [
        {
          id: 'inwill-1',
          sectionNumber: 'Section 2',
          title: 'Self-Acquired vs Coparcenary Estate (Vineeta Sharma Precedent)',
          category: 'testamentary_bequest_estate',
          riskLevel: 'low',
          riskScore: 22,
          originalText: 'I declare that the residential bungalow... are my absolute self-acquired properties... In respect of any ancestral agricultural land... I acknowledge that my rights therein are governed by the Hindu Succession Act, 1956... and the Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020)...',
          plainEnglishText: 'The testator clearly separates his self-bought homes from family ancestral land, recognizing that under Indian Supreme Court law, daughters have equal birth rights in ancestral property.',
          executiveSummary: 'Statutory demarcation of self-acquired assets vs coparcenary estate incorporating the landmark Vineeta Sharma v. Rakesh Sharma (2020) daughter coparcenary doctrine.',
          riskReasons: ['Distinguishes testable self-acquired property from non-alienable ancestral coparcenary rights'],
          impactOnUser: 'Prevents title disputes and challenges by coparceners after probate.',
          suggestedAction: 'Ensure title deeds and conveyance deeds clearly document individual purchase source.',
          questionForLawyer: 'Are any ancestral agricultural properties subject to state land ceiling acts in Uttar Pradesh?',
          translations: {
            hi: 'वसीयतकर्ता ने अपनी स्वयं अर्जित संपत्ति और पैतृक संपत्ति को अलग किया है और विनीता शर्मा बनाम राकेश शर्मा (2020) के तहत बेटी के समान समांशी (Coparcener) अधिकार को मान्यता दी है।',
            ta: 'சுயமாக சம்பாதித்த சொத்து மற்றும் பரம்பரை கூட்டுச் சொத்தை பிரித்து, வினிதா சர்மா தீர்ப்பின்படி மகளுக்கு சம பங்கு உள்ளதை உறுதி செய்கிறது.',
            es: 'Distingue bienes propios adquiridos de la herencia coparcenaria ancestral bajo la doctrina Vineeta Sharma (2020).'
          },
          domainTag: 'HSA 1956 & Vineeta Sharma'
        },
        {
          id: 'inwill-2',
          sectionNumber: 'Section 4',
          title: 'Section 213 Indian Succession Act Probate Mandate',
          category: 'executor_fiduciary_powers',
          riskLevel: 'moderate',
          riskScore: 32,
          originalText: 'The Executor shall obtain probate if required under Section 213 and Section 57 of the Indian Succession Act, 1925, for properties situated within the presidency towns of Mumbai, Kolkata, or Chennai.',
          plainEnglishText: 'If any property in the will is in Mumbai, Kolkata, or Chennai, Indian law requires the executor to get a court-certified probate certificate before distributing the assets.',
          executiveSummary: 'Explicitly notes Section 213 Indian Succession Act, 1925 probate requirement for immovable properties within presidency towns.',
          riskReasons: ['Statutory probate requirement for presidency town properties'],
          impactOnUser: 'Executor must file probate petition in High Court with court fees.',
          suggestedAction: 'Maintain indexed certified copies of property title documents for executor filing.',
          questionForLawyer: 'Will probate be required if property is situated outside presidency towns in Delhi?',
          translations: {
            hi: 'भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 213 के अनुसार मुंबई, कोलकाता या चेन्नई के प्रेसीडेंसी शहरों में स्थित अचल संपत्ति के लिए प्रोबेट अनिवार्य है।',
            ta: 'மும்பை, கொல்கத்தா அல்லது சென்னையில் உள்ள சொத்துக்களுக்கு இந்திய வாரிசுரிமைச் சட்டம் பிரிவு 213-ன் படி நீதிமன்ற ப்ரோபேட் சான்றிதழ் தேவை.',
            es: 'Identifica la exigencia obligatoria de legalización testamentaria (probate) bajo el Artículo 213 en las ciudades de la presidencia.'
          },
          domainTag: 'Section 213 ISA 1925'
        }
      ],
      obligations: [
        {
          id: 'inwill-ob-1',
          clauseId: 'inwill-2',
          section: 'Section 5',
          title: 'Section 63 Two-Witness Simultaneous Attestation',
          description: 'Ensure two independent non-beneficiary witnesses sign in testator presence.',
          penaltyWarning: 'Invalidation of will under Section 63 Indian Succession Act',
          completed: true
        }
      ],
      lawyerDossier: {
        documentTitle: 'Indian Testamentary Will & Estate Disposition (HSA 1956 & ISA 1925)',
        clientNamePlaceholder: 'Rajeshwar Dayal Saxena',
        keyAmbiguities: [
          'Registration of the will at the Sub-Registrar\'s Office is optional under the Registration Act, 1908, but strongly recommended to preempt probate challenges.'
        ],
        conflictingClauses: [],
        factualTimeline: [
          { event: 'Execution and Two-Witness Attestation', triggerCondition: 'Simultaneous presence of 2 independent witnesses', sectionRef: 'Section 5' },
          { event: 'Probate Petition (if presidency town property)', triggerCondition: 'Following death of testator', sectionRef: 'Section 4' }
        ],
        targetedQuestions: [
          '1. Are any of the attesting witnesses beneficiaries or spouses of beneficiaries under the will (which would void their devises under Section 67 ISA)?',
          '2. Has a registered medical doctor endorsed the testator\'s mental capacity on the date of execution?',
          '3. Are the immovable property municipal tax receipts and mutation records up to date?'
        ]
      },
      analyzedAt: '2026-09-14T13:20:00Z'
    }
  },

  // 6. INDIAN SHAREHOLDERS' AGREEMENT (COMPANIES ACT 2013 & VB RANGARAJ)
  {
    id: 'indian-shareholders-agreement-sha',
    title: 'Indian Shareholders\' Agreement (Companies Act 2013 & VB Rangaraj Rule)',
    category: 'Indian Statutory / Corporate',
    documentType: LegalDocumentType.INDIAN_LAW,
    description: 'Venture capital SHA incorporating ROFR, Tag-Along, Drag-Along, and statutory entrenchment in Articles of Association under the Supreme Court VB Rangaraj doctrine.',
    rawText: `SHAREHOLDERS' AGREEMENT (UNDER THE COMPANIES ACT, 2013)

This Shareholders' Agreement ("Agreement") is made at Mumbai on this 5th day of January, 2026, by and between:
AeroPulse Mobility Private Limited, a private limited company incorporated under the Companies Act, 2013, having its registered office at Andheri East, Mumbai 400069 ("Company");
Vikram Mehta and Neha Kapoor, founders of the Company ("Founders");
AND
Indus Growth Ventures Fund II, an alternative investment fund registered with SEBI under SEBI (AIF) Regulations, 2012 ("Investor").

1. RESTRICTION ON SHARE TRANSFER & RIGHT OF FIRST REFUSAL (ROFR)
No Founder shall sell, transfer, pledge, or encumber any Equity Shares held by them without first offering such shares to the Investor on identical terms and pricing in accordance with the Right of First Refusal ("ROFR") provisions set forth herein.

2. SUPREME COURT VB RANGARAJ MANDATORY ENTRENCHMENT COVENANT
The parties acknowledge the binding doctrine established by the Supreme Court of India in V.B. Rangaraj v. V.B. Gopalakrishnan (1992) and World Phone India v. WPI Group, holding that share transfer restrictions not incorporated into the Articles of Association ("AoA") of an Indian company are unenforceable against the company. The Company and Founders undertake to convene an Extraordinary General Meeting (EGM) within thirty (30) days of execution to amend and entrench these SHA terms into the AoA under Section 14 of the Companies Act, 2013.

3. DRAG-ALONG AND TAG-ALONG RIGHTS
In the event of a proposed Qualified Sale approved by the Investor holding at least seventy-five percent (75%) of Series A Preferred Shares, the Investor shall have the right to compel the Founders to drag and sell their equity shares on pari passu terms to the bona fide third-party acquirer ("Drag-Along Right").

4. AFFIRMATIVE VOTING MATTERS & SECTION 188 RELATED PARTY COMPLIANCE
No action shall be taken by the Board of Directors or shareholders in respect of Reserved Matters (including debt creation exceeding ₹1,00,00,000/-, alteration of share capital, or appointment of key managerial personnel) without the prior written consent of the Investor director. All contracts with related parties shall strictly comply with Section 188 of the Companies Act, 2013.

5. ARBITRATION, MCIA RULES, AND STAMP DUTY ADHERENCE
Any dispute arising out of this Agreement shall be referred to and finally resolved by arbitration administered by the Mumbai Centre for International Arbitration ("MCIA") in accordance with MCIA Rules. The seat and venue shall be Mumbai, India. The parties confirm that this Agreement has been duly stamped in accordance with the Maharashtra Stamp Act, 1958, to prevent evidentiary impounding under Section 34 of the Indian Stamp Act, 1899.`,
    precomputedAnalysis: {
      documentId: 'indian-shareholders-agreement-sha',
      documentTitle: 'Indian Shareholders\' Agreement (Companies Act 2013 & VB Rangaraj Rule)',
      documentType: LegalDocumentType.INDIAN_LAW,
      wordCount: 462,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 65,
        overallRating: 'moderate',
        unilateralObligationsScore: 70,
        harshIndemnitiesScore: 55,
        liquidatedDamagesScore: 40,
        autoRenewalTrapScore: 30,
        criticalFlagsCount: 2,
        summary: 'Indian private equity SHA governed by the Companies Act, 2013. Explicitly commands entrenchment of transfer restrictions into the Articles of Association (AoA) within 30 days under the Supreme Court VB Rangaraj doctrine. Grants 75% investor drag-along forced sale rights and MCIA arbitration seated in Mumbai.',
        documentType: LegalDocumentType.INDIAN_LAW,
        typeDimensions: [
          {
            key: 'sec27_restraint_trade',
            label: 'Section 27 ICA & Enforceability',
            score: 35,
            status: 'safe',
            description: 'Goodwill purchase covenants must be calibrated under the Section 27 Exception 1 to remain enforceable.'
          },
          {
            key: 'dpdpa_regulatory_penalties',
            label: 'DPDPA 2023 Statutory Liabilities',
            score: 20,
            status: 'safe',
            description: 'Standard corporate governance records.'
          },
          {
            key: 'rera_consumer_protection',
            label: 'RERA 2016 Carpet Area & Interest',
            score: 10,
            status: 'safe',
            description: 'Non-applicable to corporate equity investments.'
          },
          {
            key: 'arbitration_stamp_jurisdiction',
            label: 'Arbitration Seat, Stamp Duty & BNS',
            score: 72,
            status: 'critical',
            description: 'Mandates AoA amendment within 30 days under Section 14 of Companies Act 2013 (VB Rangaraj doctrine); specifies MCIA Mumbai arbitration and Maharashtra Stamp Act compliance.'
          }
        ]
      },
      clauses: [
        {
          id: 'sha-1',
          sectionNumber: 'Section 2',
          title: 'Mandatory AoA Entrenchment under VB Rangaraj Doctrine',
          category: 'corporate_governance_equity',
          riskLevel: 'high',
          riskScore: 76,
          originalText: 'The parties acknowledge the binding doctrine established by the Supreme Court of India in V.B. Rangaraj v. V.B. Gopalakrishnan (1992)... holding that share transfer restrictions not incorporated into the Articles of Association ("AoA")... are unenforceable against the company. The Company and Founders undertake to convene an EGM within thirty (30) days...',
          plainEnglishText: 'Under landmark Indian Supreme Court law, rules stopping founders from selling shares are completely useless unless they are officially written into the company\'s Articles of Association at the Registrar of Companies.',
          executiveSummary: 'Enforces the V.B. Rangaraj doctrine requiring prompt Section 14 Companies Act AoA entrenchment to make share transfer covenants legally binding against the company.',
          riskReasons: ['Unenforceability of share transfer restrictions against company without AoA entrenchment'],
          impactOnUser: 'Failure to entrench leaves ROFR and transfer restrictions legally void against third parties.',
          suggestedAction: 'Convene EGM and file Form MGT-14 with the Registrar of Companies within 30 days.',
          questionForLawyer: 'Will the AoA amendment include entrenchment provisions under Section 5(3) of the Companies Act, 2013?',
          translations: {
            hi: 'सुप्रीम कोर्ट के वी.बी. रंगराज निर्णय के अनुसार, जब तक शेयर ट्रांसफर की शर्तें कंपनी के आर्टिकल्स ऑफ एसोसिएशन (AoA) में दर्ज नहीं होतीं, वे कानूनी रूप से लागू नहीं हो सकतीं।',
            ta: 'வி.பி. ரங்கராஜ் உச்ச நீதிமன்ற தீர்ப்பின்படி, நிறுவனத்தின் விதிகளில் (AoA) சேர்க்கப்படாத பங்கு பரிமாற்ற கட்டுப்பாடுகள் செல்லாது.',
            es: 'Aplica la doctrina del Tribunal Supremo VB Rangaraj que exige incorporar restricciones de acciones a los Estatutos (AoA) según la Sección 14.'
          },
          domainTag: 'VB Rangaraj & AoA'
        },
        {
          id: 'sha-2',
          sectionNumber: 'Section 3',
          title: 'Drag-Along Forced Liquidation Threshold',
          category: 'founder_vesting_transfer',
          riskLevel: 'high',
          riskScore: 78,
          originalText: 'In the event of a proposed Qualified Sale approved by the Investor holding at least seventy-five percent (75%) of Series A Preferred Shares, the Investor shall have the right to compel the Founders to drag and sell their equity shares...',
          plainEnglishText: 'If the investors holding 75% of preferred stock agree to sell the company, they have the power to legally force the founders to sell their company shares too.',
          executiveSummary: 'Drag-Along right permitting 75% Series A holders to compel founders into an acquisition.',
          riskReasons: ['Involuntary forced sale of founder equity at investor discretion'],
          impactOnUser: 'Founders can be forced to exit their company against their wishes.',
          suggestedAction: 'Negotiate minimum floor valuation and founder affirmative consent thresholds.',
          questionForLawyer: 'Can a minimum 2x return hurdle be added before Drag-Along rights can be triggered?',
          translations: {
            hi: 'यदि 75% सीरीज ए निवेशक कंपनी बेचने का फैसला करते हैं, तो वे संस्थापकों (Founders) को भी अपने शेयर बेचने के लिए कानूनी रूप से बाध्य (Drag) कर सकते हैं।',
            ta: '75% விருப்பப் பங்கு முதலீட்டாளர்கள் நிறுவனத்தை விற்க முடிவு செய்தால், நிறுவனர்களையும் பங்குகளை விற்க கட்டாயப்படுத்தலாம் (Drag-Along).',
            es: 'Derecho de arrastre (Drag-Along) que permite a inversores con el 75% forzar la venta total de las acciones de los fundadores.'
          },
          domainTag: 'Drag-Along Right'
        }
      ],
      obligations: [
        {
          id: 'sha-ob-1',
          clauseId: 'sha-1',
          section: 'Section 2',
          title: 'EGM & Articles of Association Amendment Filing',
          description: 'Pass special resolution and file Form MGT-14 with Registrar of Companies (ROC) within 30 days.',
          noticeDays: 30,
          penaltyWarning: 'Unenforceability of transfer restrictions against third parties under VB Rangaraj',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Indian Shareholders\' Agreement (Companies Act 2013 & VB Rangaraj Rule)',
        clientNamePlaceholder: 'Founders (Vikram Mehta & Neha Kapoor)',
        keyAmbiguities: [
          'Drag-Along clause does not specify a minimum floor valuation or minimum return hurdle for common founders.'
        ],
        conflictingClauses: [],
        factualTimeline: [
          { event: 'EGM for AoA Amendment', triggerCondition: 'Within 30 days of SHA signing', sectionRef: 'Section 2' },
          { event: 'Form MGT-14 ROC Filing', triggerCondition: 'Within 30 days of EGM special resolution', sectionRef: 'Section 2' },
          { event: 'Investor ROFR Notice Window', triggerCondition: '30 days from receipt of transfer notice', sectionRef: 'Section 1' }
        ],
        targetedQuestions: [
          '1. Can the Founders negotiate a minimum floor exit valuation before the Drag-Along right in Section 3 can be exercised?',
          '2. Does the Investor affirmative voting list in Section 4 infringe on the independent fiduciary duties of directors under Section 166 of the Companies Act, 2013?',
          '3. Has appropriate ad valorem stamp duty been paid under Article 5(h) of the Maharashtra Stamp Act?'
        ]
      },
      analyzedAt: '2026-09-14T13:20:00Z'
    }
  }
];

export const INDIAN_COMPARISON_PRESETS = [
  {
    id: 'indian-employment-diff',
    title: 'Indian IT Employment: Standard Offer vs. Aggressive Service Bond & Section 27 Restraint',
    docAName: 'Standard Indian IT Offer Letter (v1)',
    docBName: 'Aggressive Service Bond & Restraint (v2 Revised)',
    textA: `1. ROLE & REMUNERATION: Employee appointed as Systems Engineer at INR 14,00,000 LPA.
2. NOTICE PERIOD: Either party may terminate with thirty (30) days prior written notice.
3. CONFIDENTIALITY: Employee shall preserve company trade secrets during employment and for one (1) year thereafter.
4. INTELLECTUAL PROPERTY: Work products created during official hours belong to the Company.
5. GOVERNING LAW: Laws of India, subject to Bengaluru jurisdiction.`,
    textB: `1. ROLE & REMUNERATION: Employee appointed as Systems Engineer at INR 14,00,000 LPA.
2. 3-YEAR SERVICE BOND: Employee must serve 36 continuous months or forfeit liquidated damages of INR 5,00,000 immediately.
3. POST-EMPLOYMENT RESTRAINT (VOID SEC 27): Employee shall not work for any competitor anywhere in India for twenty-four (24) months post-termination.
4. SUMMARY TERMINATION: Company may terminate without cause immediately; Employee must provide ninety (90) days notice.
5. BNS 2023 CRIMINAL PROSECUTION: Unauthorized retention of files constitutes Criminal Breach of Trust under Section 316 BNS 2023 with immediate FIR.
6. ARBITRATION & COSTS: Mandatory arbitration with Employee bearing 100% of arbitrator fees.`
  },
  {
    id: 'indian-rera-allotment-diff',
    title: 'Indian Real Estate: RERA Statutory Agreement vs. Pre-RERA Builder Markup Agreement',
    docAName: 'Statutory MahaRERA Compliant Agreement (v1)',
    docBName: 'Unilateral Builder Skewed Agreement (v2 Developer)',
    textA: `1. CARPET AREA: Sale based strictly on RERA Carpet Area of 1,050 sq.ft under Section 2(k).
2. POSSESSION & OC: Handover by Dec 2026. Delay interest payable at SBI MCLR + 2% under Section 18.
3. 70% ESCROW: 70% of collections maintained in dedicated project bank account.
4. DEFECT LIABILITY: 5-year structural defect warranty under Section 14(3) repaired free of cost within 30 days.`,
    textB: `1. SUPER BUILT-UP AREA: Sale based on Super Built-Up Area of 1,450 sq.ft with tentative carpet area subject to developer alteration.
2. POSSESSION GRACE: Developer entitled to twelve (12) months unilateral grace period without interest or compensation.
3. DELAY COMPENSATION: Developer delay capped at nominal Rs. 5 per sq.ft per month; Allottee default charged 18% per annum.
4. DEFECT LIABILITY: Defect liability restricted to six (6) months excluding waterproofing and plumbing.`
  }
];
