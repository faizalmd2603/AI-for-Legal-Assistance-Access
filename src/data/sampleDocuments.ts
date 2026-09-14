import { SampleDocument, LegalDocumentType } from '../types';
import { INDIAN_SAMPLE_DOCUMENTS, INDIAN_COMPARISON_PRESETS } from './indianSampleDocuments';

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  ...INDIAN_SAMPLE_DOCUMENTS,
  {
    id: 'freelance-nda',
    title: 'Freelance NDA & IP Assignment Agreement',
    category: 'Commercial / IP',
    documentType: LegalDocumentType.CONTRACT,
    description: 'A realistic freelance contract containing one-sided confidentiality terms, perpetual non-compete, and broad indemnification.',
    rawText: `NON-DISCLOSURE AND INTELLECTUAL PROPERTY ASSIGNMENT AGREEMENT

This Agreement is entered into as of October 12, 2025, by and between Apex Global Solutions LLC, with principal offices at 450 Lexington Avenue, Suite 1800, New York, NY 10017 ("Company"), and David Vance, residing at 742 Evergreen Terrace, Austin, TX 78701 ("Contractor").

1. RECITALS & PURPOSE
Company desires to retain Contractor to perform software design and architectural consulting services. In connection with such services, Contractor will have access to confidential trade secrets and proprietary technical data.

2. UNILATERAL CONFIDENTIALITY OBLIGATIONS
Contractor agrees to hold in the strictest confidence all Confidential Information disclosed by Company. Contractor shall not disclose, duplicate, or permit access to any Confidential Information to any third party. The confidentiality obligations herein shall survive indefinitely and continue in perpetuity following termination of this Agreement. This obligation is strictly unilateral; Company owes no reciprocal confidentiality obligations to Contractor for any contractor-developed methodologies.

3. INTELLECTUAL PROPERTY & MORAL RIGHTS WAIVER
Contractor hereby irrevocably assigns, transfers, and conveys to Company all rights, titles, and interests in and to all inventions, software code, concepts, designs, and work products developed, whether conceived during or outside of working hours, and whether using Company equipment or personal devices. Contractor unconditionally waives all moral rights, rights of attribution, and paternity in perpetuity across all jurisdictions worldwide.

4. UNLIMITED INDEMNIFICATION
Contractor shall defend, indemnify, and hold harmless Company, its officers, directors, agents, and affiliates from and against any and all claims, liabilities, losses, damages, and legal expenses (including reasonable attorney's fees) arising out of or resulting from any breach of this Agreement, or any alleged infringement of third-party patents or copyrights, without financial cap or limitation of liability.

5. NON-SOLICITATION & LIQUIDATED DAMAGES
During the term of this Agreement and for a period of twenty-four (24) months following termination, Contractor shall not solicit, recruit, or attempt to engage any client, prospective client, employee, or vendor of Company. Any violation of this Section 5 shall result in liquidated damages in the amount of $25,000 per violation, which Contractor acknowledges is a reasonable pre-estimate of Company's damages and not a penalty.

6. TERMINATION & IMMEDIATE NOTICE
Company may terminate this Agreement at any time, with or without cause, effective immediately upon electronic transmission of written notice. Contractor may only terminate this Agreement upon ninety (90) days prior written notice delivered via certified registered mail.

7. MANDATORY BINDING ARBITRATION & JURY WAIVER
Any dispute arising under or relating to this Agreement shall be settled exclusively by confidential binding arbitration administered by JAMS in Wilmington, Delaware, under its Comprehensive Arbitration Rules. Both parties expressly waive any right to trial by jury or participation in a class action lawsuit. Contractor shall bear all filing fees and administrative costs of arbitration irrespective of the final award.`,
    precomputedAnalysis: {
      documentId: 'freelance-nda',
      documentTitle: 'Freelance NDA & IP Assignment Agreement',
      wordCount: 428,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 84,
        overallRating: 'high',
        unilateralObligationsScore: 88,
        harshIndemnitiesScore: 92,
        liquidatedDamagesScore: 85,
        autoRenewalTrapScore: 45,
        criticalFlagsCount: 4,
        summary: 'Critical risk profile. This agreement imposes strictly unilateral confidentiality surviving forever, uncapped indemnification on the contractor, a 24-month non-solicitation with $25,000 liquidated damages, and requires the contractor to pay all arbitration fees in Delaware.'
      },
      clauses: [
        {
          id: 'c-1',
          sectionNumber: 'Section 2',
          title: 'Unilateral Confidentiality Obligations',
          category: 'confidentiality',
          riskLevel: 'high',
          riskScore: 78,
          originalText: 'Contractor agrees to hold in the strictest confidence all Confidential Information disclosed by Company... survive indefinitely and continue in perpetuity following termination... Company owes no reciprocal confidentiality obligations to Contractor.',
          plainEnglishText: 'Only you are forced to keep secrets, forever. The company does not have to protect any of your private methods, tools, or ideas.',
          executiveSummary: 'Asymmetric perpetual non-disclosure imposing unilateral liability on Contractor without sunset period or reciprocal corporate duty.',
          riskReasons: ['Confidentiality never expires (in perpetuity)', 'Unilateral: Company has no duty to protect your IP or private info'],
          impactOnUser: 'You could be sued years later if you use general domain knowledge, and the company has no legal duty to keep your own code or proposals confidential.',
          suggestedAction: 'Insist on mutual confidentiality and standard 2-to-3 year sunset limitation for trade secrets.',
          questionForLawyer: 'Can we amend Section 2 to make confidentiality bilateral and limit the survival duration to two (2) years post-termination?',
          translations: {
            hi: 'केवल आप ही हमेशा के लिए गोपनीयता बनाए रखने के लिए बाध्य हैं। कंपनी पर आपकी किसी भी जानकारी को सुरक्षित रखने की कोई बाध्यता नहीं है।',
            es: 'Solo tú estás obligado a mantener la confidencialidad para siempre. La empresa no tiene la obligación recíproca de proteger tus métodos o ideas.',
            ta: 'நீங்கள் மட்டுமே ரகசியங்களை நிரந்தரமாக பாதுகாக்க கடமைப்பட்டுள்ளீர்கள். உங்கள் தகவலை பாதுகாக்க நிறுவனத்திற்கு எந்த கடமையும் இல்லை.'
          }
        },
        {
          id: 'c-2',
          sectionNumber: 'Section 3',
          title: 'Intellectual Property & Moral Rights Waiver',
          category: 'intellectual_property',
          riskLevel: 'high',
          riskScore: 85,
          originalText: 'Contractor hereby irrevocably assigns, transfers, and conveys to Company all rights... whether conceived during or outside of working hours, and whether using Company equipment or personal devices. Contractor unconditionally waives all moral rights.',
          plainEnglishText: 'The company claims ownership of everything you create, even on your own personal time, personal laptop, and on weekends, completely waiving your right to be recognized as the author.',
          executiveSummary: 'Overbroad IP assignment capturing off-hours and personal device work without carve-outs for pre-existing IP.',
          riskReasons: ['Captures inventions conceived outside of working hours', 'Waiver of moral attribution rights worldwide'],
          impactOnUser: 'Side projects or personal open-source software built while on this contract could legally be claimed by Apex Global Solutions.',
          suggestedAction: 'Insert Exhibit A for "Excluded Prior Inventions" and limit assignment to work specifically contracted and paid for by Company during working hours.',
          questionForLawyer: 'How can we narrow the IP assignment clause to exclude prior inventions and personal projects developed off-hours without company resources?',
          translations: {
            hi: 'कंपनी आपके द्वारा बनाए गए हर कार्य का स्वामित्व मांग रही है, चाहे वह व्यक्तिगत समय या व्यक्तिगत लैपटॉप पर ही क्यों न बनाया गया हो।',
            es: 'La empresa reclama la propiedad de todo lo que crees, incluso en tu tiempo personal y en tus propios dispositivos.',
            ta: 'நீங்கள் தனிப்பட்ட நேரத்தில் உங்கள் சொந்த மடிக்கணினியில் உருவாக்கும் படைப்புகளையும் நிறுவனம் உரிமைகோருகிறது.'
          }
        },
        {
          id: 'c-3',
          sectionNumber: 'Section 4',
          title: 'Unlimited Indemnification',
          category: 'liabilities_indemnities',
          riskLevel: 'high',
          riskScore: 92,
          originalText: 'Contractor shall defend, indemnify, and hold harmless Company... from and against any and all claims, liabilities, losses... without financial cap or limitation of liability.',
          plainEnglishText: 'If anyone sues the company over your work, you have to pay all of their legal defense costs and damages out of your personal pocket, with no maximum limit.',
          executiveSummary: 'Uncapped unilateral indemnity shifting third-party patent and copyright litigation costs entirely onto individual Contractor.',
          riskReasons: ['No monetary liability cap', 'Covers patent infringement which Contractor cannot reasonably verify', 'Obligation to defend and pay legal defense fees upfront'],
          impactOnUser: 'A single frivolous third-party claim could bankrupt an independent contractor.',
          suggestedAction: 'Cap indemnification at the total fees paid under this agreement (or 1x contract value) and remove patent defense obligations.',
          questionForLawyer: 'What language should we use to cap total contractor liability at fees actually received in the preceding 6 months?',
          translations: {
            hi: 'यदि कंपनी पर कोई मुकदमा होता है, तो आपको बिना किसी सीमा के अपनी जेब से उनका पूरा कानूनी खर्च और हर्जाना भरना पड़ेगा।',
            es: 'Si alguien demanda a la empresa por tu trabajo, deberás pagar todos sus gastos legales y daños sin ningún límite financiero.',
            ta: 'நிறுவனத்தின் மீது வழக்கு தொடரப்பட்டால், அதற்கான அனைத்து சட்ட செலவுகளையும் இழப்பீட்டையும் நீங்களே வரம்பின்றி ஏற்க வேண்டும்.'
          }
        },
        {
          id: 'c-4',
          sectionNumber: 'Section 5',
          title: 'Non-Solicitation & Liquidated Damages',
          category: 'critical_obligations',
          riskLevel: 'high',
          riskScore: 82,
          originalText: 'During the term... and for a period of twenty-four (24) months... Contractor shall not solicit, recruit, or attempt to engage any client... Any violation shall result in liquidated damages in the amount of $25,000 per violation.',
          plainEnglishText: 'For two full years after you stop working together, you cannot work with or talk to any of their clients or vendors. If you do, you automatically owe them $25,000 per instance.',
          executiveSummary: '24-month restrictive non-solicitation backed by an aggressive $25,000 per-violation liquidated damages clause.',
          riskReasons: ['Overly long restriction period (24 months)', 'Liquidated damages of $25,000 operates as an aggressive deterrent penalty'],
          impactOnUser: 'Severely impedes your future freelance business if Company has a broad client list.',
          suggestedAction: 'Reduce duration to 6-12 months and remove predetermined liquidated damages in favor of actual proven damages.',
          questionForLawyer: 'Is a $25,000 liquidated damages clause enforceable against an independent contractor in this jurisdiction?',
          deadlinesOrNotices: '24 months post-termination restriction window',
          translations: {
            hi: 'अनुबंध समाप्त होने के बाद 2 साल तक आप उनके किसी भी ग्राहक के साथ काम नहीं कर सकते। उल्लंघन पर $25,000 का जुर्माना तय किया गया है।',
            es: 'Durante 2 años no puedes trabajar con sus clientes o proveedores. Cada infracción conlleva una penalización preestablecida de $25,000.',
            ta: 'ஒப்பந்தம் முடிந்த பிறகு 2 ஆண்டுகளுக்கு அவர்களின் வாடிக்கையாளர்களுடன் பணியாற்ற முடியாது. மீறினால் $25,000 அபராதம் விதிக்கப்படும்.'
          }
        },
        {
          id: 'c-5',
          sectionNumber: 'Section 6',
          title: 'Termination & Immediate Notice',
          category: 'termination_notice',
          riskLevel: 'moderate',
          riskScore: 65,
          originalText: 'Company may terminate this Agreement at any time, with or without cause, effective immediately... Contractor may only terminate upon ninety (90) days prior written notice delivered via certified registered mail.',
          plainEnglishText: 'The company can fire you in 1 second via an email. But if you want to leave, you have to give 90 days notice by certified postal mail.',
          executiveSummary: 'Heavily asymmetric termination rights granting company immediate exit while locking contractor into 90 days certified mail notice.',
          riskReasons: ['Asymmetric notice period (0 days vs 90 days)', 'Cumbersome certified mail requirement for contractor'],
          impactOnUser: 'You can be dropped with zero income continuity, but cannot take a competing offer for 3 full months.',
          suggestedAction: 'Demand reciprocal 30-day notice for convenience for both parties, deliverable via email.',
          questionForLawyer: 'Can we amend Section 6 to provide mutual 30 days written notice via email for termination without cause?',
          deadlinesOrNotices: '90 days certified mail notice required from Contractor',
          translations: {
            hi: 'कंपनी आपको तुरंत ईमेल से निकाल सकती है, लेकिन यदि आप छोड़ना चाहते हैं तो 90 दिन पहले डाक द्वारा नोटिस देना होगा।',
            es: 'La empresa puede rescindir el contrato de inmediato por correo electrónico, pero tú debes avisar con 90 días por correo postal certificado.',
            ta: 'நிறுவனம் உடனடியாக மின்னஞ்சல் மூலம் உங்களை நீக்கலாம், ஆனால் நீங்கள் விலக 90 நாட்கள் முன் தபால் மூலம் அறிவிக்க வேண்டும்.'
          }
        },
        {
          id: 'c-6',
          sectionNumber: 'Section 7',
          title: 'Mandatory Binding Arbitration & Jury Waiver',
          category: 'dispute_resolution',
          riskLevel: 'high',
          riskScore: 75,
          originalText: 'Any dispute... settled exclusively by confidential binding arbitration administered by JAMS in Wilmington, Delaware... Contractor shall bear all filing fees and administrative costs of arbitration irrespective of the final award.',
          plainEnglishText: 'You cannot sue them in regular court or join a class action. You must travel to Delaware for private arbitration, and you must pay all the arbitration fees even if you win.',
          executiveSummary: 'Mandatory arbitration in Delaware with unilateral cost-shifting requiring Contractor to fund all filing fees regardless of outcome.',
          riskReasons: ['Unfavorable venue in Delaware away from contractor', 'Contractor forced to bear all arbitration costs even if prevailing party', 'Waiver of jury trial and class action'],
          impactOnUser: 'Arbitration fees can easily exceed $10,000, effectively pricing you out of ever enforcing unpaid invoices.',
          suggestedAction: 'Specify contractor’s local county or virtual arbitration, and add "prevailing party recovers costs and reasonable attorney fees".',
          questionForLawyer: 'Is the provision forcing Contractor to pay all arbitration costs unconscionable and unenforceable?',
          translations: {
            hi: 'विवाद की स्थिति में आपको डेलावेयर में मध्यस्थता करनी होगी और जीतने पर भी आपको ही सारा मध्यस्थता खर्च वहन करना होगा।',
            es: 'Debes resolver disputas mediante arbitraje en Delaware y pagar todos los costos de presentación, incluso si ganas.',
            ta: 'சர்ச்சைகளின் போது டெலாவேரில் மத்தியஸ்தம் செய்ய வேண்டும் மற்றும் வென்றாலும் அனைத்து செலவுகளையும் நீங்களே ஏற்க வேண்டும்.'
          }
        }
      ],
      obligations: [
        {
          id: 'ob-1',
          clauseId: 'c-4',
          section: 'Section 5',
          title: 'Non-Solicitation Lockout Period',
          description: 'Refrain from contacting, pitching, or engaging any Apex Global Solutions clients or vendors.',
          noticeDays: 730,
          penaltyWarning: '$25,000 predetermined liquidated damages per contact violation',
          completed: false
        },
        {
          id: 'ob-2',
          clauseId: 'c-5',
          section: 'Section 6',
          title: 'Termination Notice Requirement',
          description: 'Submit formal resignation in writing via certified registered mail 90 days before intended end date.',
          noticeDays: 90,
          penaltyWarning: 'Breach of contract if ceased without full 90-day certified mail notice',
          completed: false
        },
        {
          id: 'ob-3',
          clauseId: 'c-2',
          section: 'Section 3',
          title: 'List Excluded Prior Inventions',
          description: 'Document and attach an exhibit listing all software, libraries, and tools you owned prior to signing.',
          dueDateStr: 'Prior to contract execution',
          penaltyWarning: 'Risk of automatic forfeiture of prior work to Apex Global',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Freelance NDA & IP Assignment Agreement',
        clientNamePlaceholder: 'David Vance (Independent Contractor)',
        keyAmbiguities: [
          'Section 3 fails to define boundaries between contractor off-hours personal projects and company-assigned development.',
          'Section 2 defines Confidential Information broadly without standard carve-outs for publicly known information or independent development.'
        ],
        conflictingClauses: [
          'Section 6 allows Company immediate termination without notice, yet Section 4 forces Contractor into perpetual indemnification and Section 5 forces a 24-month client lockout.'
        ],
        factualTimeline: [
          { event: 'Contract Execution', triggerCondition: 'Signing date (Oct 12, 2025)', sectionRef: 'Preamble' },
          { event: 'Termination by Company', triggerCondition: 'Immediate upon electronic notice', sectionRef: 'Section 6' },
          { event: 'Termination by Contractor', triggerCondition: '90 days certified mail notice', sectionRef: 'Section 6' },
          { event: 'Non-Solicitation Expiration', triggerCondition: '24 months following formal termination', sectionRef: 'Section 5' },
          { event: 'Confidentiality Expiration', triggerCondition: 'Never (in perpetuity)', sectionRef: 'Section 2' }
        ],
        targetedQuestions: [
          '1. Will the courts in my state enforce a perpetual confidentiality clause that has no sunset period or trade secret limit?',
          '2. Is the $25,000 liquidated damages clause in Section 5 vulnerable to being struck down as an unlawful penalty?',
          '3. How can we draft an explicit "Prior Inventions Schedule" to protect my open-source libraries from the sweeping IP assignment in Section 3?',
          '4. Can the requirement that I bear all arbitration filing fees in Delaware be challenged as unconscionable under state law?',
          '5. What is the standard market language to cap my total indemnification liability at the actual revenue generated under this contract?'
        ]
      },
      analyzedAt: '2026-09-14T10:00:00Z'
    }
  },
  {
    id: 'residential-lease',
    title: 'Standard Residential Lease Agreement',
    category: 'Real Estate / Tenant Rights',
    documentType: LegalDocumentType.CONTRACT,
    description: 'A 12-month residential apartment lease with automatic renewal clause, strict sublet prohibitions, and landlord access terms.',
    rawText: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is made and entered into as of May 1, 2025, by and between Oakridge Property Management LLC ("Landlord"), and Samantha Brooks ("Tenant"), for the premises located at 1408 Willow Creek Way, Apt 3B, Chicago, IL 60614.

1. TERM & AUTOMATIC RENEWAL TRAP
The initial lease term shall commence on June 1, 2025, and expire on May 31, 2026. Unless Tenant delivers formal written notice of intent to vacate at least sixty (60) days prior to lease expiration via certified mail, this Lease shall automatically renew for an additional twelve (12) month term at a 15% rent escalation. Oral notice or email notification shall be deemed null and void.

2. RENT & LATE SURCHARGES
Monthly rent shall be $2,450.00, due on the first calendar day of each month. If rent is not received by 11:59 PM on the third day of the month, Tenant shall pay a late fee of $150.00, plus an accumulating surcharge of $25.00 per day until rent is settled in full.

3. SECURITY DEPOSIT & FORFEITURE
Tenant shall deposit $3,675.00 upon execution. Landlord may retain all or portion of the security deposit for any perceived wear beyond pristine brand-new condition, including standard carpet wear and wall scuffs. In the event of early termination by Tenant, the entire security deposit is forfeited as liquidated damages in addition to remaining lease term rent.

4. MAINTENANCE, REPAIRS, AND APPLIANCES
Tenant shall be responsible for all plumbing clogs, appliance repairs, HVAC filter replacements, and pest control costs during occupancy, regardless of cause or prior equipment age. Landlord makes no warranty regarding the working condition of kitchen appliances or central air conditioning.

5. LANDLORD ENTRY & INSPECTION
Landlord and Landlord's authorized agents may enter the premises at any time without prior notice in cases of suspected emergency, or with two (2) hours notice for routine inspections, showings to prospective tenants, or appraisals.

6. ABSOLUTE SUBLETTING & GUEST RESTRICTIONS
Subletting, assignment, Airbnb hosting, or house-sharing is strictly prohibited. Any guest staying longer than three (3) consecutive nights shall be classified as an unauthorized occupant, triggering a $500 unauthorized guest surcharge and immediate grounds for eviction.`,
    precomputedAnalysis: {
      documentId: 'residential-lease',
      documentTitle: 'Standard Residential Lease Agreement',
      wordCount: 350,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 76,
        overallRating: 'high',
        unilateralObligationsScore: 74,
        harshIndemnitiesScore: 68,
        liquidatedDamagesScore: 82,
        autoRenewalTrapScore: 90,
        criticalFlagsCount: 3,
        summary: 'High risk for tenant. Contains an auto-renewal trap with 15% rent spike requiring certified mail 60 days in advance, total security deposit forfeiture, shifting of standard structural/appliance repair costs to tenant, and invasive 2-hour entry rights.'
      },
      clauses: [
        {
          id: 'rl-1',
          sectionNumber: 'Section 1',
          title: 'Automatic Renewal Trap & Rent Escalation',
          category: 'termination_notice',
          riskLevel: 'high',
          riskScore: 88,
          originalText: 'Unless Tenant delivers formal written notice of intent to vacate at least sixty (60) days prior to lease expiration via certified mail, this Lease shall automatically renew for an additional twelve (12) month term at a 15% rent escalation.',
          plainEnglishText: 'If you do not send a certified postal letter 60 days before your lease ends, you will be locked into paying for another full year with a 15% rent hike.',
          executiveSummary: 'Auto-renewal clause with strict 60-day certified mail notice hurdle and automatic 15% escalation penalty.',
          riskReasons: ['Certified mail requirement invalidates email notice', '15% rent hike upon auto-renewal', 'Full 12-month lock-in if deadline missed'],
          impactOnUser: 'Missing the notice window by even 1 day commits you to paying over $33,000 in unexpected rent.',
          suggestedAction: 'Request standard month-to-month conversion after year one, email notification acceptance, and a 30-day notice window.',
          questionForLawyer: 'Does local municipal tenant law (e.g., Chicago RLTO) prohibit automatic lease renewals without advance written landlord reminder?',
          deadlinesOrNotices: 'Certified mail notice due by March 31, 2026 (60 days prior)',
          translations: {
            hi: 'यदि आप लीज समाप्त होने से 60 दिन पहले पंजीकृत डाक से नोटिस नहीं भेजते हैं, तो 15% किराया वृद्धि के साथ आप अगले 1 साल के लिए फिर बंध जाएंगे।',
            es: 'Si no envías una carta certificada 60 días antes de que termine el contrato, quedarás obligado por otro año con un 15% de aumento de alquiler.',
            ta: 'ஒப்பந்தம் முடிவதற்கு 60 நாட்களுக்கு முன் தபால் மூலம் அறிவிக்காவிட்டால், 15% கூடுதல் வாடகையுடன் மேலும் ஓராண்டுக்கு ஒப்பந்தம் நீட்டிக்கப்படும்.'
          }
        },
        {
          id: 'rl-2',
          sectionNumber: 'Section 3',
          title: 'Security Deposit & Total Forfeiture',
          category: 'critical_obligations',
          riskLevel: 'high',
          riskScore: 84,
          originalText: 'Landlord may retain all or portion... for any perceived wear beyond pristine brand-new condition... In the event of early termination, the entire security deposit is forfeited as liquidated damages in addition to remaining lease term rent.',
          plainEnglishText: 'The landlord is trying to keep your $3,675 deposit for normal everyday wear and tear, and if you have to move early, they take your deposit AND demand all remaining rent.',
          executiveSummary: 'Unenforceable ordinary wear-and-tear deductions coupled with dual-recovery penalty (forfeiture plus remaining rent).',
          riskReasons: ['Attempts to deduct for ordinary wear and tear (contrary to state law)', 'Double recovery: deposit forfeiture plus remaining rent'],
          impactOnUser: 'High likelihood of losing your full $3,675 security deposit at move-out.',
          suggestedAction: 'Require explicit language that ordinary wear and tear cannot be deducted, and delete automatic deposit forfeiture.',
          questionForLawyer: 'Is the clause allowing deductions for ordinary wear and tear a statutory violation under state tenant security deposit laws?',
          translations: {
            hi: 'मकान मालिक सामान्य टूट-फूट के लिए भी आपकी पूरी $3,675 की जमा राशि रख सकता है, जो कि अधिकांश राज्यों के नियमों के विरुद्ध है।',
            es: 'El propietario pretende retener tu fianza de $3,675 por el desgaste normal del uso cotidiano, lo cual suele ser ilegal.',
            ta: 'சாதாரண பயன்பாட்டிற்கு கூட உங்கள் $3,675 வைப்புத்தொகையை பறிமுதல் செய்ய வீட்டு உரிமையாளர் முயல்கிறார்.'
          }
        },
        {
          id: 'rl-3',
          sectionNumber: 'Section 4',
          title: 'Maintenance & Appliance Repair Shift',
          category: 'liabilities_indemnities',
          riskLevel: 'high',
          riskScore: 78,
          originalText: 'Tenant shall be responsible for all plumbing clogs, appliance repairs, HVAC filter replacements, and pest control costs... regardless of cause or prior equipment age.',
          plainEnglishText: 'You have to pay to fix broken refrigerators, plumbing, and air conditioning even if they were 15 years old before you moved in.',
          executiveSummary: 'Shifting statutory habitability and major mechanical appliance upkeep obligations onto residential Tenant.',
          riskReasons: ['Violates implied warranty of habitability', 'Shifts capital equipment replacement onto renter'],
          impactOnUser: 'An old furnace or AC breakdown could cost you thousands in unexpected repair bills.',
          suggestedAction: 'Limit tenant maintenance strictly to damages caused by tenant negligence, with landlord bearing all major system repairs.',
          questionForLawyer: 'Can a landlord legally disclaim the working condition of pre-installed heating and kitchen appliances?',
          translations: {
            hi: 'फ्रिज, एसी या प्लंबिंग खराब होने पर आपको अपनी जेब से मरम्मत करानी होगी, भले ही उपकरण आपके आने से पहले पुराने रहे हों।',
            es: 'Debes pagar el arreglo de electrodomésticos y tuberías incluso si el fallo se debe a su antigüedad previa.',
            ta: 'பழைய சாதனங்கள் பழுதடைந்தாலும் அதற்கான பழுதுபார்ப்பு செலவை வாடகைதாரரே ஏற்க வேண்டும் என கூறுகிறது.'
          }
        },
        {
          id: 'rl-4',
          sectionNumber: 'Section 5',
          title: 'Landlord Entry & Inspection',
          category: 'critical_obligations',
          riskLevel: 'moderate',
          riskScore: 60,
          originalText: 'Landlord and authorized agents may enter... with two (2) hours notice for routine inspections, showings to prospective tenants, or appraisals.',
          plainEnglishText: 'The landlord can enter your apartment giving you only 2 hours notice for non-emergency showings and checks.',
          executiveSummary: 'Abbreviated 2-hour entry notice window violating standard 24-48 hour quiet enjoyment statutory norms.',
          riskReasons: ['2-hour notice is unreasonably short for non-emergencies', 'Infringes on right to quiet enjoyment'],
          impactOnUser: 'Zero privacy; strangers can be brought through your home during workdays on 2 hours notice.',
          suggestedAction: 'Require minimum 24 hours (or 48 hours) advance written notice for all non-emergency entries during normal business hours.',
          questionForLawyer: 'Does local law mandate at least 24 hours notice before landlord entry for non-emergency showings?',
          deadlinesOrNotices: 'Minimum 2 hours notice specified by landlord',
          translations: {
            hi: 'मकान मालिक गैर-आपातकालीन जांच के लिए केवल 2 घंटे के नोटिस पर आपके घर में प्रवेश कर सकता है।',
            es: 'El propietario puede entrar a tu vivienda avisando con apenas 2 horas de anticipación.',
            ta: 'வீட்டு உரிமையாளர் வெறும் 2 மணி நேர அறிவிப்பில் உங்கள் வீட்டிற்குள் நுழைய முடியும்.'
          }
        }
      ],
      obligations: [
        {
          id: 'ob-rl-1',
          clauseId: 'rl-1',
          section: 'Section 1',
          title: 'Lease Non-Renewal Notice Deadline',
          description: 'Deliver certified registered mail letter declaring intent to vacate at lease end.',
          noticeDays: 60,
          dueDateStr: 'March 31, 2026',
          penaltyWarning: 'Automatic 12-month renewal lock-in at +15% rent rate ($2,817/mo)',
          completed: false
        },
        {
          id: 'ob-rl-2',
          clauseId: 'rl-2',
          section: 'Section 2',
          title: 'Monthly Rent Payment Cutoff',
          description: 'Ensure monthly rent transfer arrives before 11:59 PM on 3rd calendar day.',
          dueDateStr: '3rd of each month',
          penaltyWarning: '$150 late charge + $25/day compound penalty',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Standard Residential Lease Agreement',
        clientNamePlaceholder: 'Samantha Brooks (Tenant)',
        keyAmbiguities: [
          'Section 4 does not delineate tenant-caused damage from pre-existing system fatigue.',
          'Section 3 fails to specify a bank escrow account or statutory interest rate for the held security deposit.'
        ],
        conflictingClauses: [
          'Section 4 requires tenant to maintain habitable appliances while Section 5 limits landlord responsibility for basic equipment.'
        ],
        factualTimeline: [
          { event: 'Lease Commencement', triggerCondition: 'June 1, 2025', sectionRef: 'Section 1' },
          { event: 'Notice to Vacate Cutoff', triggerCondition: 'March 31, 2026 (60 days prior)', sectionRef: 'Section 1' },
          { event: 'Lease Expiration / Auto-Renewal Date', triggerCondition: 'May 31, 2026', sectionRef: 'Section 1' }
        ],
        targetedQuestions: [
          '1. Does the Chicago Residential Landlord and Tenant Ordinance (RLTO) override Section 4 habitability waivers?',
          '2. Can the landlord legally mandate 60-day certified mail notice for non-renewal without providing a reciprocal statutory reminder?',
          '3. Is a $150 flat late fee plus $25 daily surcharge legally permissible under state tenant protection limits?',
          '4. What photos and written notice should I send prior to move-in to invalidate Section 3 ordinary wear-and-tear deposit claims?',
          '5. Can the 2-hour entry clause be modified to 24 hours under tenant rights to quiet enjoyment?'
        ]
      },
      analyzedAt: '2026-09-14T10:30:00Z'
    }
  },
  {
    id: 'saas-tos',
    title: 'SaaS Enterprise Terms of Service',
    category: 'Technology & Cloud Services',
    documentType: LegalDocumentType.CONTRACT,
    description: 'Enterprise cloud software terms containing unilateral subscription fee changes, total warranty disclaimers, and liability limits capped at $50.',
    rawText: `ENTERPRISE CLOUD SOFTWARE TERMS OF SERVICE

Last Updated: September 1, 2025. Please review these Terms of Service carefully before utilizing the CloudFlow AI Enterprise Platform ("Service").

1. MODIFICATIONS TO FEES AND SERVICE
CloudFlow reserves the right to modify subscription pricing, tier limits, or core product features at any time in its sole discretion upon ten (10) days email notice. Continued usage following such notification constitutes irrevocable acceptance of escalated rates.

2. TOTAL AS-IS WARRANTY DISCLAIMER
THE SERVICE IS PROVIDED STRICTLY "AS IS" AND "AS AVAILABLE". CLOUDFLOW DISCLAIMS ALL WARRANTIES, WHETHER STATUTORY, EXPRESS, OR IMPLIED, INCLUDING ANY WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR OBJECTIVE, DATA ACCURACY, OR UNINTERRUPTED AVAILABILITY. CLOUDFLOW DOES NOT GUARANTEE THAT STORED CLIENT DATA WILL BE ERROR-FREE OR IMMUNE FROM CYBERATTACK OR UNRECOVERABLE LOSS.

3. AGGREGATE LIABILITY CAP ($50 LIMIT)
TO THE MAXIMUM DEGREE PERMISSIBLE UNDER APPLICABLE LAW, IN NO EVENT SHALL CLOUDFLOW'S TOTAL CUMULATIVE LIABILITY FOR ANY DIRECT, INDIRECT, PUNITIVE, SPECIAL, OR CONSEQUENTIAL DAMAGES EXCEED FIFTY UNITED STATES DOLLARS ($50.00 USD) OR THE AMOUNT PAID BY SUBSCRIBER IN THE PRECEDING ONE (1) MONTH, WHICHEVER IS LOWER.

4. USER CONTENT LICENSE & AI TRAINING
Subscriber grants CloudFlow a perpetual, worldwide, irrevocable, royalty-free license to ingest, reformat, summarize, and process all customer uploaded documents, data payloads, and prompts for the express purpose of training, tuning, and improving CloudFlow's proprietary foundational machine learning models.

5. CLASS ACTION WAIVER & DELAWARE VENUE
All disputes shall be adjudicated individually. Subscriber expressly waives any right to commence, join, or participate in any collective, representative, or class action proceeding against CloudFlow. Exclusive venue and jurisdiction shall rest in the state or federal courts situated in New Castle County, Delaware.`,
    precomputedAnalysis: {
      documentId: 'saas-tos',
      documentTitle: 'SaaS Enterprise Terms of Service',
      wordCount: 298,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 89,
        overallRating: 'high',
        unilateralObligationsScore: 92,
        harshIndemnitiesScore: 70,
        liquidatedDamagesScore: 95,
        autoRenewalTrapScore: 72,
        criticalFlagsCount: 4,
        summary: 'Critical vendor-favoring terms. Provides the vendor unilateral price hike rights with 10-day notice, an absurd $50 liability cap, claims broad perpetual rights to train AI on your confidential customer data, and disclaims all uptime and data security warranties.'
      },
      clauses: [
        {
          id: 'saas-1',
          sectionNumber: 'Section 3',
          title: 'Aggregate Liability Cap ($50 Limit)',
          category: 'liabilities_indemnities',
          riskLevel: 'high',
          riskScore: 96,
          originalText: 'IN NO EVENT SHALL CLOUDFLOW\'S TOTAL CUMULATIVE LIABILITY... EXCEED FIFTY UNITED STATES DOLLARS ($50.00 USD) OR THE AMOUNT PAID IN THE PRECEDING ONE (1) MONTH, WHICHEVER IS LOWER.',
          plainEnglishText: 'Even if the software deletes your company\'s entire database or leaks confidential customer records, the maximum money you can ever recover from them is $50.',
          executiveSummary: 'De minimis liability cap of $50 effectively shielding SaaS vendor from all material commercial breach or data loss consequences.',
          riskReasons: ['Cap of $50 is trivial and commercially lopsided', 'No carve-out for gross negligence, data breaches, or confidentiality violations'],
          impactOnUser: 'Catastrophic business losses due to vendor outage or leak cannot be recovered.',
          suggestedAction: 'Insist on liability cap equal to 12 months fees paid, with standard uncapped exclusions for data privacy breaches and IP indemnity.',
          questionForLawyer: 'Can a B2B SaaS company legally limit its gross negligence and data breach liability to $50 under applicable commercial law?',
          translations: {
            hi: 'यदि सॉफ्टवेयर आपका पूरा डेटाबेस नष्ट कर दे या डेटा लीक कर दे, तो भी आप उनसे अधिकतम केवल $50 का हर्जाना ही मांग सकते हैं।',
            es: 'Incluso si el software borra toda tu base de datos o filtra registros, lo máximo que podrás recuperar de ellos son 50 dólares.',
            ta: 'மென்பொருள் உங்கள் முழு தரவையும் அழித்துவிட்டாலும், நீங்கள் பெறக்கூடிய அதிகபட்ச இழப்பீடு வெறும் $50 மட்டுமே.'
          }
        },
        {
          id: 'saas-2',
          sectionNumber: 'Section 4',
          title: 'Customer Data AI Training License',
          category: 'intellectual_property',
          riskLevel: 'high',
          riskScore: 88,
          originalText: 'Subscriber grants CloudFlow a perpetual, worldwide, irrevocable, royalty-free license to ingest... all customer uploaded documents... for the express purpose of training, tuning, and improving proprietary machine learning models.',
          plainEnglishText: 'The vendor takes your private business documents and proprietary data and uses them to train their public AI models without paying you.',
          executiveSummary: 'Broad IP license permitting vendor to use proprietary enterprise customer data for machine learning model training.',
          riskReasons: ['Risk of proprietary trade secrets leaking into AI model outputs', 'Irrevocable and perpetual data license'],
          impactOnUser: 'May violate your own compliance obligations (e.g. HIPAA, GDPR) with your own clients.',
          suggestedAction: 'Require a zero-data-retention policy and explicit guarantee that customer data will never be used for model training.',
          questionForLawyer: 'Does this clause compromise our trade secret protections and breach our confidentiality commitments to our downstream clients?',
          translations: {
            hi: 'कंपनी आपके गोपनीय व्यावसायिक डेटा का उपयोग अपने स्वयं के AI मॉडल को प्रशिक्षित करने के लिए करने का अधिकार मांग रही है।',
            es: 'El proveedor se reserva el derecho de usar tus documentos y datos confidenciales para entrenar sus modelos de IA.',
            ta: 'உங்கள் ரகசிய ஆவணங்களை அவர்களின் AI மாதிரிகளைப் பயிற்றுவிக்க பயன்படுத்த நிறுவனம் முழு உரிமம் கோருகிறது.'
          }
        }
      ],
      obligations: [
        {
          id: 'ob-saas-1',
          clauseId: 'saas-1',
          section: 'Section 1',
          title: 'Review Rate Hike Notifications',
          description: 'Monitor registered admin email for 10-day fee modification notices to cancel before automatic lock-in.',
          noticeDays: 10,
          penaltyWarning: 'Irrevocable acceptance of escalated pricing if not cancelled within 10 days',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'SaaS Enterprise Terms of Service',
        clientNamePlaceholder: 'Enterprise Subscriber',
        keyAmbiguities: [
          'Section 4 does not define whether data used for AI training is pseudonymized or retained in foundation weights.',
          'Section 1 fails to define price escalation caps (e.g. CPI index limits).'
        ],
        conflictingClauses: [
          'Section 2 disclaims all data accuracy, directly conflicting with enterprise marketing guarantees of data reliability.'
        ],
        factualTimeline: [
          { event: 'Terms Effective Date', triggerCondition: 'First account login / API call', sectionRef: 'Preamble' },
          { event: 'Price Hike Rejection Window', triggerCondition: '10 days from email notice', sectionRef: 'Section 1' }
        ],
        targetedQuestions: [
          '1. How can we ensure our sensitive client data is explicitly ring-fenced and excluded from any model training under Section 4?',
          '2. What is standard market practice for a super-cap covering data protection breaches instead of the $50 cap in Section 3?',
          '3. Is a 10-day notice for material price increases commercially reasonable, or should we demand 60 days?'
        ]
      },
      analyzedAt: '2026-09-14T11:00:00Z'
    }
  },
  {
    id: 'patent-quantum-crypt',
    title: 'US Patent Application: Quantum-Resistant Cryptographic Sharding',
    category: 'Patents & Intellectual Property',
    documentType: LegalDocumentType.PATENT,
    description: 'A complete utility patent specification with independent & dependent claims, means-plus-function limitations, Bayh-Dole federal reservation, and maintenance fee timeline.',
    rawText: `UNITED STATES PATENT APPLICATION SPECIFICATION & CLAIMS

TITLE: DISTRIBUTED QUANTUM-RESISTANT CRYPTOGRAPHIC SHARDING SYSTEM AND METHOD
INVENTORS: Dr. Elena Rostova (Cambridge, MA), Marcus Chen (San Francisco, CA)
ASSIGNEE: CipherMatrix Technologies, Inc. (Delaware)
FILING DATE: March 14, 2025
GOVERNMENT FUNDING STATEMENT: This invention was made with government support under DARPA Grant No. HR0011-23-C-0091. The U.S. Government has certain rights in the invention, including a non-exclusive, irrevocable, royalty-free license.

1. FIELD OF THE INVENTION
The present invention relates generally to cryptographic key management and distributed data systems, and more particularly to lattice-based post-quantum secret sharing across decentralized heterogeneous compute nodes.

2. BACKGROUND OF THE INVENTION & PRIOR ART
Existing public-key infrastructures relying on RSA and Elliptic Curve Cryptography (ECC) are vulnerable to polynomial-time factor analysis via Shor's algorithm on fault-tolerant quantum computers. While classical Shamir Secret Sharing provides information-theoretic security, it requires complete reconstruction at a centralized node, introducing a single point of failure. Known references (e.g., US Pat. No. 9,847,120) fail to achieve asynchronous lattice permutation across untrusted nodes without exposing polynomial coefficients.

3. SUMMARY OF THE INVENTION
The system provides multi-party threshold decryption by decomposing arbitrary byte arrays into discrete matrix shards utilizing learning-with-errors (LWE) hardness, guaranteeing zero reconstruction leakage.

4. CLAIMS
What is claimed is:

Claim 1 (Independent Claim):
A distributed cryptographic sharding system comprising:
a memory storing executable instructions; and
one or more hardware processors configured to execute said instructions to:
(a) ingest a raw data payload and partition said payload into a plurality of polynomial coefficients;
(b) execute means for lattice-based cryptographic permutation on said plurality of polynomial coefficients to generate at least n discrete cryptographic shards;
(c) distribute each of said n discrete cryptographic shards to a plurality of disparate compute nodes operating across an untrusted network; and
(d) reassemble said raw data payload only upon receipt of an arbitrary subset of at least k shards of said n discrete cryptographic shards without exposing intermediate decryption keys.

Claim 2 (Dependent on Claim 1):
The system of claim 1, wherein said means for lattice-based cryptographic permutation comprises a module-learning-with-errors (M-LWE) hardness reduction algorithm operating over a ring dimension of at least 256.

Claim 3 (Dependent on Claim 1):
The system of claim 1, wherein said plurality of disparate compute nodes are synchronized using an asynchronous Byzantine fault-tolerant consensus protocol requiring 3f + 1 total nodes.

5. ASSIGNMENT AND INVENTOR RESTRICTIONS
Inventors hereby irrevocably assign, sell, and convey to Assignee all right, title, and interest in and to said invention, including all priority rights under the Paris Convention and all divisional, continuation, and foreign counterparts throughout the world in perpetuity without right to additional royalties or shop rights.

6. STATUTORY MAINTENANCE & PROSECUTION DEADLINES
Assignee shall maintain sole responsibility for timely payment of USPTO statutory maintenance fees due at 3.5 years, 7.5 years, and 11.5 years following grant, failure of which will result in irreversible statutory abandonment of patent rights to the public domain.`,
    precomputedAnalysis: {
      documentId: 'patent-quantum-crypt',
      documentTitle: 'US Patent Application: Quantum-Resistant Cryptographic Sharding',
      documentType: LegalDocumentType.PATENT,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.PATENT,
        subtype: 'Utility Patent Specification & Claims',
        jurisdictionOrOffice: 'USPTO / WIPO International Patent System',
        keyPartiesOrRoles: [
          { role: 'Lead Inventor', name: 'Dr. Elena Rostova' },
          { role: 'Co-Inventor', name: 'Marcus Chen' },
          { role: 'Assignee Entity', name: 'CipherMatrix Technologies, Inc.' },
          { role: 'Federal Grantor', name: 'DARPA (U.S. Department of Defense)' }
        ],
        domainSpecificChecklist: [
          { item: 'Independent Claim 1 Boundary', status: 'pass', note: 'Independent claim 1 establishes broad patent protection covering hardware processor execution of lattice sharding.' },
          { item: 'Means-Plus-Function Limitation Risk', status: 'alert', note: 'Claim 1(b) utilizes "means for lattice-based cryptographic permutation", triggering 35 U.S.C. § 112(f). Courts will narrow the claim to the specific structure disclosed in the specification.' },
          { item: 'Bayh-Dole Federal March-In Rights', status: 'alert', note: 'DARPA grant acknowledgment grants the U.S. government a royalty-free license and potential march-in rights under 35 U.S.C. § 200-212.' },
          { item: 'Prior Art Disclosure Adequacy', status: 'warning', note: 'Section 2 acknowledges classical RSA/ECC but lacks exhaustive citations for recent 2024-2025 NIST FIPS post-quantum standards.' },
          { item: 'Perpetual Inventor Royalty Forfeiture', status: 'warning', note: 'Section 5 strips co-inventors of all future commercial royalties or derivative licensing revenues in perpetuity.' }
        ]
      },
      wordCount: 462,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 74,
        overallRating: 'high',
        unilateralObligationsScore: 72,
        harshIndemnitiesScore: 76,
        liquidatedDamagesScore: 70,
        autoRenewalTrapScore: 78,
        criticalFlagsCount: 3,
        summary: 'High patent vulnerability detected. Independent Claim 1 contains a 35 U.S.C. 112(f) means-plus-function trap that severely narrows patent protection, while DARPA funding liens grant the federal government march-in rights.',
        documentType: LegalDocumentType.PATENT,
        typeDimensions: [
          {
            key: 'claim_breadth',
            label: 'Claim Scope & Indefiniteness',
            score: 78,
            status: 'critical',
            description: 'Claim 1(b) uses "means for" language which risks 35 U.S.C. 112(f) invalidation or extreme narrowing to disclosed embodiments.'
          },
          {
            key: 'prior_art',
            label: 'Prior Art & Enablement Deficiencies',
            score: 62,
            status: 'warning',
            description: 'Background omits recent NIST FIPS 203/204 standardization citations, creating vulnerability during USPTO examiner review.'
          },
          {
            key: 'ownership_assignment',
            label: 'Ownership & Bayh-Dole Encumbrances',
            score: 82,
            status: 'critical',
            description: 'DARPA grant funding grants the federal government royalty-free march-in licenses, restricting commercial monopoly exclusivity.'
          },
          {
            key: 'statutory_deadlines',
            label: 'Maintenance & Statutory Deadlines',
            score: 74,
            status: 'critical',
            description: 'Strict statutory maintenance fee clocks (3.5, 7.5, 11.5 years) with irreversible abandonment penalties if unpaid.'
          }
        ]
      },
      clauses: [
        {
          id: 'pat-c-1',
          sectionNumber: 'Claim 1',
          title: 'Independent System Claim 1 & Means-Plus-Function Trap',
          category: 'patent_claims_scope',
          domainTag: 'Independent Claim 1',
          riskLevel: 'high',
          riskScore: 78,
          originalText: 'A distributed cryptographic sharding system comprising: a memory storing executable instructions; and one or more hardware processors configured to execute said instructions to: (a) ingest a raw data payload and partition said payload into a plurality of polynomial coefficients; (b) execute means for lattice-based cryptographic permutation on said plurality of polynomial coefficients to generate at least n discrete cryptographic shards...',
          plainEnglishText: 'Claim 1 is the main patent boundary that protects your technology against competitors. However, using the phrase "means for lattice-based cryptographic permutation" allows courts to strictly limit your patent to only the exact software math described in this paper, rather than broader competitor variations.',
          executiveSummary: 'Primary independent patent claim protecting post-quantum sharding, but weakened by Section 112(f) means-plus-function drafting.',
          riskReasons: [
            '35 U.S.C. § 112(f) invocation: The phrase "means for" restricts the claim to exact disclosed structures.',
            'Competitors using alternative mathematical implementations can easily design around this patent.'
          ],
          impactOnUser: 'Your patent scope may be far narrower in infringement litigation than you expect, allowing competitors to replicate your system using slight structural variations.',
          suggestedAction: 'Instruct your registered patent attorney to replace "means for lattice-based permutation" with specific structural steps (e.g. "a cryptographic matrix transform engine configured to").',
          questionForLawyer: 'Can we rewrite Claim 1(b) as a method or apparatus claim without invoking 35 U.S.C. 112(f) means-plus-function interpretation?',
          deadlinesOrNotices: '12 months from filing to convert to PCT international application',
          translations: {
            es: 'La reivindicación 1 es la protección principal, pero la frase "medios para" limita la patente solo a la estructura matemática exacta descrita.',
            hi: 'दावा 1 मुख्य पेटेंट सुरक्षा है, लेकिन "साधन" (means for) शब्द का उपयोग पेटेंट के दायरे को बहुत संकीर्ण कर देता है।',
            ta: 'கோரிக்கை 1 முக்கிய காப்புரிமை பாதுகாப்பு, ஆனால் "means for" என்ற சொல் காப்புரிமையை மிகக் குறுகியதாக மாற்றுகிறது.'
          }
        },
        {
          id: 'pat-c-2',
          sectionNumber: 'Government Rights',
          title: 'DARPA Bayh-Dole March-In Encumbrance',
          category: 'patent_inventorship_assignment',
          domainTag: 'Bayh-Dole Act Lien',
          riskLevel: 'high',
          riskScore: 82,
          originalText: 'GOVERNMENT FUNDING STATEMENT: This invention was made with government support under DARPA Grant No. HR0011-23-C-0091. The U.S. Government has certain rights in the invention, including a non-exclusive, irrevocable, royalty-free license.',
          plainEnglishText: 'Because DARPA federal grant money funded part of this research, the U.S. military and federal government get a 100% free license to use this patent forever, and could theoretically force you to license it to others under national defense "march-in" powers.',
          executiveSummary: 'Statutory Bayh-Dole federal government reservation granting perpetual royalty-free non-exclusive government usage and march-in rights.',
          riskReasons: [
            'Federal government possesses perpetual royalty-free license worldwide.',
            'Under 35 U.S.C. § 209, government can exercise march-in rights if technology is not commercialized reasonably.'
          ],
          impactOnUser: 'You cannot block government defense agencies or their contractors from using this post-quantum sharding architecture.',
          suggestedAction: 'Ensure strict compliance with federal iEdison reporting deadlines to preserve title ownership.',
          questionForLawyer: 'What are the specific iEdison invention disclosure reporting deadlines required under our DARPA funding agreement?',
          deadlinesOrNotices: '60 days following disclosure to submit formal iEdison report',
          translations: {
            es: 'El gobierno federal de EE. UU. tiene una licencia gratuita perpetua y derechos de intervención debido a los fondos de DARPA.',
            hi: 'DARPA अनुदान के कारण अमेरिकी सरकार के पास इस आविष्कार का मुफ्त में उपयोग करने का स्थायी अधिकार है।',
            ta: 'DARPA நிதி காரணமாக அமெரிக்க அரசாங்கத்திற்கு இந்த கண்டுபிடிப்பை இலவசமாகப் பயன்படுத்த நிரந்தர உரிமை உண்டு.'
          }
        },
        {
          id: 'pat-c-3',
          sectionNumber: 'Section 5',
          title: 'Comprehensive Perpetual Assignment & Moral Waiver',
          category: 'patent_inventorship_assignment',
          domainTag: 'Inventor Assignment',
          riskLevel: 'moderate',
          riskScore: 68,
          originalText: 'Inventors hereby irrevocably assign, sell, and convey to Assignee all right, title, and interest in and to said invention... throughout the world in perpetuity without right to additional royalties or shop rights.',
          plainEnglishText: 'The inventors permanently transfer 100% of all patent rights to the company, giving up any right to receive future commercial royalties or maintain personal shop rights.',
          executiveSummary: 'Full patent title assignment divesting individual inventors of equity or ongoing commercial licensing compensation.',
          riskReasons: [
            'Complete divestment of inventor rights with zero trailing royalty share.',
            'Encompasses all international divisional, continuation, and foreign counterparts.'
          ],
          impactOnUser: 'If you leave CipherMatrix Technologies, you cannot commercially utilize this specific patent or its continuation claims.',
          suggestedAction: 'Ensure employment agreement or founder equity vesting adequately compensates for total IP divestment.',
          questionForLawyer: 'Does this assignment agreement include standard carve-outs for academic publications or pre-existing independent consulting work?',
          translations: {
            es: 'Los inventores ceden el 100% de todos los derechos de patente a la empresa sin derecho a regalías futuras.',
            hi: 'आविष्कारक भविष्य में रॉयल्टी के किसी भी अधिकार के बिना सभी पेटेंट अधिकार कंपनी को सौंपते हैं।',
            ta: 'கண்டுபிடிப்பாளர்கள் எதிர்கால ராயல்டி உரிமைகள் இல்லாமல் அனைத்து காப்புரிமை உரிமைகளையும் நிறுவனத்திற்கு மாற்றுகிறார்கள்.'
          }
        },
        {
          id: 'pat-c-4',
          sectionNumber: 'Section 6',
          title: 'Statutory Maintenance Fee Abandonment Clock',
          category: 'patent_prior_art_enablement',
          domainTag: 'Statutory Maintenance Clocks',
          riskLevel: 'moderate',
          riskScore: 65,
          originalText: 'Assignee shall maintain sole responsibility for timely payment of USPTO statutory maintenance fees due at 3.5 years, 7.5 years, and 11.5 years following grant, failure of which will result in irreversible statutory abandonment of patent rights to the public domain.',
          plainEnglishText: 'Patents do not last 20 years automatically; you must pay large fee installments to the patent office at 3.5, 7.5, and 11.5 years. If you miss a deadline, the patent dies permanently and becomes free public domain.',
          executiveSummary: 'Statutory USPTO maintenance fee payment checkpoints required to avoid permanent abandonment and dedication to the public domain.',
          riskReasons: [
            'Failure to pay maintenance fees results in permanent loss of patent monopoly.',
            'USPTO surcharge windows add severe penalties for payments missed by even 1 day.'
          ],
          impactOnUser: 'Operational oversight in docketing maintenance fee dates can destroy millions in corporate patent valuation overnight.',
          suggestedAction: 'Implement automated IP docketing software with triple calendar redundancy for maintenance fee windows.',
          questionForLawyer: 'What docketing system does your firm use to ensure USPTO maintenance fee deadlines at 3.5, 7.5, and 11.5 years are never missed?',
          deadlinesOrNotices: 'Maintenance fees due at 3.5 years ($2,000+), 7.5 years ($3,700+), and 11.5 years ($7,700+)',
          translations: {
            es: 'Las tarifas de mantenimiento de la USPTO deben pagarse a los 3.5, 7.5 y 11.5 años para evitar la pérdida total de la patente.',
            hi: 'पेटेंट को सार्वजनिक डोमेन में जाने से रोकने के लिए 3.5, 7.5 और 11.5 वर्षों में USPTO रखरखाव शुल्क का भुगतान अनिवार्य है।',
            ta: 'காப்புரிமை ரத்தாகாமல் இருக்க 3.5, 7.5 மற்றும் 11.5 ஆண்டுகளில் பராமரிப்பு கட்டணம் செலுத்த வேண்டும்.'
          }
        }
      ],
      obligations: [
        {
          id: 'pat-ob-1',
          clauseId: 'pat-c-2',
          section: 'Government Rights',
          title: 'DARPA iEdison Invention Disclosure Filing',
          description: 'Submit formal electronic invention disclosure to DARPA and NIST via the federal iEdison reporting database.',
          dueDateStr: 'Within 60 days of application filing',
          noticeDays: 60,
          penaltyWarning: 'Risk of federal forfeiture of patent title to the U.S. government',
          completed: false
        },
        {
          id: 'pat-ob-2',
          clauseId: 'pat-c-1',
          section: 'Claim 1',
          title: 'PCT International Filing Deadline',
          description: 'File Patent Cooperation Treaty (PCT) application or foreign national counterparts to claim U.S. priority date.',
          dueDateStr: '12 months from U.S. filing date (March 14, 2026)',
          noticeDays: 365,
          penaltyWarning: 'Irreversible forfeiture of all foreign patent rights across 150+ PCT member states',
          completed: false
        },
        {
          id: 'pat-ob-3',
          clauseId: 'pat-c-4',
          section: 'Section 6',
          title: 'Docket 3.5-Year USPTO Maintenance Window',
          description: 'Calendar the initial 3.5-year maintenance fee window with IP docketing manager.',
          dueDateStr: '3.5 years post-issuance',
          noticeDays: 1277,
          penaltyWarning: 'Permanent abandonment of U.S. letters patent',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'US Patent Application: Quantum-Resistant Cryptographic Sharding',
        clientNamePlaceholder: 'Dr. Elena Rostova / CipherMatrix Technologies',
        keyAmbiguities: [
          'Claim 1(b) "means for lattice-based cryptographic permutation" lacks specific algorithm reference in the claim text, invoking § 112(f).',
          'Specification Section 2 fails to distinguish over recent 2024 NIST post-quantum standardization drafts.'
        ],
        conflictingClauses: [
          'Government funding grant grants U.S. military unrestricted royalty-free license, conflicting with Section 5 statement of Assignee exclusive commercial monopoly.'
        ],
        factualTimeline: [
          { event: 'US Application Priority Filing Date', triggerCondition: 'March 14, 2025', sectionRef: 'Preamble' },
          { event: 'DARPA Federal iEdison Disclosure', triggerCondition: 'Within 60 days of filing', sectionRef: 'Government Rights' },
          { event: 'PCT International Conversion Deadline', triggerCondition: '12 months (March 14, 2026)', sectionRef: 'Section 1' },
          { event: 'First USPTO Maintenance Fee Window', triggerCondition: '3.0 to 3.5 years post-grant', sectionRef: 'Section 6' }
        ],
        targetedQuestions: [
          '1. How can we amend Claim 1(b) during prosecution to eliminate the 35 U.S.C. § 112(f) "means-plus-function" vulnerability while preserving broad infringement protection?',
          '2. Does our DARPA funding agreement impose commercialization milestones that would trigger federal march-in rights under 35 U.S.C. § 209?',
          '3. What prior art references from the 2024-2025 NIST post-quantum standardization process should we submit in an Information Disclosure Statement (IDS) to avoid inequitable conduct allegations?',
          '4. Are the co-inventor assignments signed under seal with valid consideration under state law?'
        ]
      },
      analyzedAt: '2026-09-14T11:15:00Z'
    }
  },
  {
    id: 'will-estate-planning',
    title: 'Last Will & Testament of Eleanor Vance',
    category: 'Wills & Estate Planning',
    documentType: LegalDocumentType.WILL,
    description: 'A comprehensive Last Will & Testament featuring specific bequests, residuary estate distribution, unchecked executor powers without bond, and an in terrorem no-contest penalty.',
    rawText: `LAST WILL AND TESTAMENT OF ELEANOR MARGARET VANCE

I, Eleanor Margaret Vance, a resident of the City of Evanston, County of Cook, State of Illinois, declare that this is my Last Will and Testament, hereby revoking any and all prior wills, codicils, and testamentary dispositions made by me.

ARTICLE I: PAYMENT OF DEBTS, TAXES & EXPENSES
I direct that all my legally enforceable debts, funeral expenses, expenses of my last illness, and administration expenses be paid by my Executor out of my residuary estate as soon after my decease as practicable.

ARTICLE II: SPECIFIC BEQUESTS & REAL PROPERTY
1. I give, devise, and bequeath my residential real property located at 1822 Sheridan Road, Evanston, IL, together with all improvements and insurance policies thereon, to my son, JULIAN VANCE, provided he survives me by thirty (30) days.
2. I give and bequeath my vintage 1968 Steinway Model B Grand Piano, together with my personal family jewelry collection, to my daughter, CLARA VANCE, provided she survives me.
3. I intentionally make no provision in this Will for my estranged stepson, RICHARD VANCE, and direct that he and his descendants shall take nothing under this instrument.

ARTICLE III: RESIDUARY ESTATE
All the rest, residue, and remainder of my estate, real and personal, of whatsoever kind and wheresoever situated, including any lapsed legacies or devises, I give, devise, and bequeath in equal shares to my surviving children, per stirpes.

ARTICLE IV: APPOINTMENT OF EXECUTOR & WAIVER OF SURETY BOND
1. I nominate, constitute, and appoint my son, JULIAN VANCE, as Independent Executor of this my Last Will and Testament. If he fails or ceases to act, I appoint FIRST FIDELITY TRUST BANK, N.A., as Successor Corporate Executor.
2. I expressly direct that no Executor nominated herein shall be required to post any surety bond, oath, or other undertaking in any jurisdiction for the faithful performance of their fiduciary duties.

ARTICLE V: UNCHECKED FIDUCIARY POWERS & ACCOUNTING WAIVER
My Executor shall have full and absolute power and authority, exercisable in their sole and unchecked discretion without court approval, order, or confirmation:
(a) To sell, convey, mortgage, lease, or liquidate any real or personal property belonging to my estate upon such terms as my Executor deems proper;
(b) To invest estate proceeds in speculative or non-traditional assets without regard to statutory prudent investor rules;
(c) To make distribution of my estate in cash or in kind, or partly in each, without requiring a formal judicial appraisal;
(d) To settle, compromise, or abandon any claims in favor of or against my estate without filing an accounting in probate court.

ARTICLE VI: IN TERROREM / NO-CONTEST PENALTY CLAUSE
If any beneficiary, legatee, or devisee under this Will, or any person claiming through them, directly or indirectly contests or challenges the validity of this Will, or any provision hereof, in any legal proceeding, or seeks to compel an inventory, then any share, legacy, or interest provided for such person under this Will shall be completely revoked, forfeited, and annulled, and shall pass as though such contesting party had predeceased me without issue.

ARTICLE VII: ATTESTATION CLAUSE
Signed, published, and declared by Eleanor Margaret Vance, the Testatrix, as and for her Last Will and Testament, in the presence of us, who, at her request, in her presence, and in the presence of each other, have subscribed our names as attesting witnesses this 24th day of January, 2025.

Witness 1: Arthur Pendelton (Residing at 910 Maple Ave, Evanston, IL)
Witness 2: Sarah Lin (Residing at 1404 Chicago Ave, Evanston, IL)
State of Illinois, County of Cook: Subscribed and sworn to before me, a Notary Public in and for said County and State.`,
    precomputedAnalysis: {
      documentId: 'will-estate-planning',
      documentTitle: 'Last Will & Testament of Eleanor Vance',
      documentType: LegalDocumentType.WILL,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.WILL,
        subtype: 'Last Will & Testament',
        jurisdictionOrOffice: 'Cook County Surrogate / Probate Court (Illinois)',
        keyPartiesOrRoles: [
          { role: 'Testatrix', name: 'Eleanor Margaret Vance' },
          { role: 'Primary Independent Executor', name: 'Julian Vance (Son)' },
          { role: 'Successor Corporate Executor', name: 'First Fidelity Trust Bank, N.A.' },
          { role: 'Named Beneficiaries', name: 'Julian Vance & Clara Vance' },
          { role: 'Disinherited Party', name: 'Richard Vance (Stepson)' }
        ],
        domainSpecificChecklist: [
          { item: 'Revocation of Prior Instruments', status: 'pass', note: 'Clear revocation clause prevents contradictory prior testamentary dispositions from being admitted.' },
          { item: 'Residuary Estate Disposition', status: 'pass', note: 'Article III comprehensively allocates all rest, residue, and remainder, preventing partial intestacy.' },
          { item: 'In Terrorem / No-Contest Penalty Trap', status: 'alert', note: 'Article VI harshly strips inheritance from any beneficiary who challenges the will or seeks a formal court inventory.' },
          { item: 'Fiduciary Surety Bond Waiver', status: 'alert', note: 'Article IV waives all executor bonds, leaving beneficiaries unprotected if executor mismanages estate assets.' },
          { item: 'Unchecked Fiduciary Discretion', status: 'warning', note: 'Article V permits executor to liquidate property below market value and waives formal court accounting.' },
          { item: 'Pretermitted Heir Exclusion', status: 'pass', note: 'Article II(3) explicitly names and disinherits Richard Vance, preventing statutory omitted heir claims.' }
        ]
      },
      wordCount: 512,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 71,
        overallRating: 'high',
        unilateralObligationsScore: 78,
        harshIndemnitiesScore: 68,
        liquidatedDamagesScore: 75,
        autoRenewalTrapScore: 62,
        criticalFlagsCount: 3,
        summary: 'High estate planning vulnerability. The Will contains an aggressive in terrorem disinheritance penalty, waives fiduciary surety bonds, and grants the executor unchecked authority to liquidate estate assets without court appraisal or accounting.',
        documentType: LegalDocumentType.WILL,
        typeDimensions: [
          {
            key: 'probate_litigation',
            label: 'Probate Litigation & In Terrorem Trap',
            score: 84,
            status: 'critical',
            description: 'Article VI completely forfeits a beneficiary\'s share if they contest the will or demand a court inventory.'
          },
          {
            key: 'fiduciary_discretion',
            label: 'Unchecked Fiduciary / Executor Powers',
            score: 76,
            status: 'critical',
            description: 'Article V permits executor to sell property, waive court accounting, and ignore prudent investor rules without bond.'
          },
          {
            key: 'residuary_omissions',
            label: 'Beneficiary & Residuary Ambiguity',
            score: 35,
            status: 'safe',
            description: 'Article III residuary clause properly uses per stirpes distribution to prevent partial intestacy.'
          },
          {
            key: 'attestation_execution',
            label: 'Attestation & Formal Execution Defects',
            score: 28,
            status: 'safe',
            description: 'Properly signed by two independent witnesses with an attached notarial self-proving jurat.'
          }
        ]
      },
      clauses: [
        {
          id: 'will-c-1',
          sectionNumber: 'Article VI',
          title: 'In Terrorem / No-Contest Penalty Disinheritance',
          category: 'no_contest_probate_terms',
          domainTag: 'In Terrorem Penalty',
          riskLevel: 'high',
          riskScore: 86,
          originalText: 'If any beneficiary, legatee, or devisee under this Will... directly or indirectly contests or challenges the validity of this Will... or seeks to compel an inventory, then any share, legacy, or interest provided for such person under this Will shall be completely revoked, forfeited, and annulled...',
          plainEnglishText: 'This is a "no-contest" trap. If any family member or heir questions whether the will is genuine, or even asks the probate judge to inspect the executor\'s accounting receipts, that person automatically loses 100% of their inheritance.',
          executiveSummary: 'Punitive in terrorem clause enforcing absolute forfeiture of all bequests upon any legal challenge or demand for probate inventory.',
          riskReasons: [
            'Forfeits inheritance even if a beneficiary has valid probable cause to suspect undue influence or fraud.',
            'Penalizes heirs merely for requesting a standard court asset inventory.'
          ],
          impactOnUser: 'Beneficiaries are intimidated into accepting whatever Julian Vance chooses to distribute, with no legal safety check.',
          suggestedAction: 'Consult probate counsel regarding whether Illinois state law limits in terrorem clauses when "probable cause" or good-faith breach of fiduciary duty is shown.',
          questionForLawyer: 'Under Illinois probate law (755 ILCS 5/), will the court enforce an in terrorem penalty if a beneficiary challenges an executor for self-dealing in bad faith?',
          translations: {
            es: 'Si algún heredero cuestiona la validez del testamento o solicita un inventario, pierde automáticamente toda su herencia.',
            hi: 'यदि कोई वारिस वसीयत पर सवाल उठाता है या संपत्ति के हिसाब की मांग करता है, तो वह अपना सारा हिस्सा खो देगा।',
            ta: 'வாரிசுகளில் எவரேனும் உயிலின் உண்மைத்தன்மையை எதிர்த்தால் அவர்களின் பரம்பரை பங்கு பறிக்கப்படும்.'
          }
        },
        {
          id: 'will-c-2',
          sectionNumber: 'Article V',
          title: 'Unchecked Executor Discretion & Accounting Waiver',
          category: 'executor_fiduciary_powers',
          domainTag: 'Fiduciary Authority',
          riskLevel: 'high',
          riskScore: 78,
          originalText: 'My Executor shall have full and absolute power and authority, exercisable in their sole and unchecked discretion without court approval... (a) To sell, convey, mortgage, lease, or liquidate... (d) To settle, compromise, or abandon any claims... without filing an accounting in probate court.',
          plainEnglishText: 'The executor can sell family homes and heirlooms for whatever price he wants, without having to ask the probate judge for permission, and without having to show detailed bank statements to the other heirs.',
          executiveSummary: 'Broad fiduciary grant authorizing liquidation of estate assets at executor discretion while waiving formal probate accounting.',
          riskReasons: [
            'No requirement for independent appraisal before selling real estate or heirlooms.',
            'Waiver of formal accounting leaves non-executor siblings in the dark regarding total estate cash balance.'
          ],
          impactOnUser: 'Other beneficiaries have no transparent visibility into whether estate assets were sold at fair market value.',
          suggestedAction: 'Recommend amending to require annual informal written accounting statements to all named beneficiaries.',
          questionForLawyer: 'Can the waiver of court accounting in Article V(d) be superseded by a beneficiary petition for supervised administration?',
          translations: {
            es: 'El albacea tiene poder absoluto para vender propiedades sin aprobación judicial ni rendición de cuentas.',
            hi: 'कार्यकारी (Executor) को अदालत की मंजूरी या वारिसों को हिसाब दिए बिना संपत्ति बेचने का पूर्ण अधिकार है।',
            ta: 'நிர்வாகி நீதிமன்ற அனுமதியின்றி சொத்துக்களை விற்க முழு அதிகாரம் கொண்டுள்ளார்.'
          }
        },
        {
          id: 'will-c-3',
          sectionNumber: 'Article IV',
          title: 'Waiver of Executor Surety Bond',
          category: 'executor_fiduciary_powers',
          domainTag: 'Surety Bond Waiver',
          riskLevel: 'moderate',
          riskScore: 68,
          originalText: 'I expressly direct that no Executor nominated herein shall be required to post any surety bond, oath, or other undertaking in any jurisdiction for the faithful performance of their fiduciary duties.',
          plainEnglishText: 'Normally, an executor must purchase an insurance policy (a surety bond) so if they steal or mishandle estate money, the insurance pays the heirs back. This clause waives that insurance completely to save fees.',
          executiveSummary: 'Exemption from statutory fiduciary surety bond, eliminating third-party financial indemnity protection for heirs.',
          riskReasons: [
            'Saves estate administrative expenses, but removes financial insurance against executor mismanagement or bankruptcy.'
          ],
          impactOnUser: 'If the executor misplaces or wastes funds, beneficiaries cannot make a claim against an insurance surety bond.',
          suggestedAction: 'Acceptable if the executor is deeply trusted; otherwise, request a modest bond if significant liquid assets exist.',
          questionForLawyer: 'If beneficiaries suspect financial insolvency of the nominated executor, can we petition the probate court to require a bond despite this waiver?',
          translations: {
            es: 'Se exime al albacea de pagar una fianza de seguro, ahorrando dinero pero dejando a los herederos sin protección financiera.',
            hi: 'कार्यकारी को सुरक्षा बांड से छूट दी गई है, जिससे खर्च बचता है लेकिन वित्तीय सुरक्षा खत्म हो जाती है।',
            ta: 'நிர்வாகிக்கு பாதுகாப்பு பத்திரம் தேவையில்லை, இது நிதி பாதுகாப்பை குறைக்கிறது.'
          }
        },
        {
          id: 'will-c-4',
          sectionNumber: 'Article III',
          title: 'Residuary Estate Per Stirpes Distribution',
          category: 'testamentary_bequest_estate',
          domainTag: 'Residuary Clause',
          riskLevel: 'low',
          riskScore: 24,
          originalText: 'All the rest, residue, and remainder of my estate, real and personal, of whatsoever kind and wheresoever situated, including any lapsed legacies or devises, I give, devise, and bequeath in equal shares to my surviving children, per stirpes.',
          plainEnglishText: 'Everything left over that wasn\'t specifically named goes in equal halves to her children. If a child dies before Eleanor, that child\'s share automatically passes down to their own kids (per stirpes).',
          executiveSummary: 'Comprehensive residuary clause capturing all undisposed real and personal property with standard generational per stirpes rollover.',
          riskReasons: [],
          impactOnUser: 'Safely protects against property accidentally falling into government intestacy rules.',
          suggestedAction: 'Ensure titles to all non-probate assets (401ks, IRAs, bank accounts) have matching beneficiary designations.',
          questionForLawyer: 'Do our TOD (Transfer on Death) accounts properly integrate with this Article III residuary allocation?',
          translations: {
            es: 'Todo el patrimonio restante se divide en partes iguales entre los hijos supervivientes por estirpe.',
            hi: 'बाकी बची सारी संपत्ति जीवित बच्चों में समान रूप से विभाजित की जाएगी।',
            ta: 'மீதமுள்ள அனைத்து சொத்துக்களும் சமமாக பிரிக்கப்படும்.'
          }
        }
      ],
      obligations: [
        {
          id: 'will-ob-1',
          clauseId: 'will-c-2',
          section: 'Article I & IV',
          title: 'Petition for Letters of Office in Probate Court',
          description: 'Deliver original Will to Cook County Surrogate Court clerk and file petition for admission to probate within 30 days of death.',
          dueDateStr: 'Within 30 days of decedent passing',
          noticeDays: 30,
          penaltyWarning: 'Personal liability for intentional concealment of testamentary instrument under 755 ILCS 5/6-1',
          completed: false
        },
        {
          id: 'will-ob-2',
          clauseId: 'will-c-1',
          section: 'Article I',
          title: 'Publication of Notice to Creditors',
          description: 'Publish statutory notice to creditors in local Cook County legal newspaper and mail notices to known creditors.',
          dueDateStr: 'Within 14 days of opening probate',
          noticeDays: 180,
          penaltyWarning: 'Failure to publish leaves estate vulnerable to creditor claims for 2 full years',
          completed: false
        },
        {
          id: 'will-ob-3',
          clauseId: 'will-c-2',
          section: 'Article II',
          title: '30-Day Survivorship Cutoff for Real Estate',
          description: 'Verify beneficiary survivorship of 30 days before issuing executor deed for 1822 Sheridan Road.',
          dueDateStr: '30 days following date of death',
          noticeDays: 30,
          penaltyWarning: 'Improper title conveyance if beneficiary predeceases the survivorship window',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Last Will & Testament of Eleanor Vance',
        clientNamePlaceholder: 'Julian Vance (Executor) / Clara Vance (Beneficiary)',
        keyAmbiguities: [
          'Article II(2) jewelry bequest does not provide an itemized schedule, risking family dispute over specific heirloom values.',
          'Article V(b) permitting investment in speculative assets creates potential tension with statutory Illinois prudent fiduciary standards.'
        ],
        conflictingClauses: [
          'Article V(d) waiver of accounting conflicts with statutory beneficiary rights under Illinois Independent Administration Act to demand inventory.'
        ],
        factualTimeline: [
          { event: 'Execution Date of Instrument', triggerCondition: 'January 24, 2025', sectionRef: 'Article VII' },
          { event: 'Delivery to Probate Clerk', triggerCondition: 'Within 30 days of decedent demise', sectionRef: 'Article IV' },
          { event: 'Survivorship Condition Cutoff', triggerCondition: '30 days following demise', sectionRef: 'Article II' },
          { event: 'Statutory Creditor Bar Window', triggerCondition: '6 months following first newspaper publication', sectionRef: 'Article I' }
        ],
        targetedQuestions: [
          '1. Will the Cook County probate court enforce the Article VI in terrorem clause if a beneficiary petitions for an accounting based on suspected executor self-dealing?',
          '2. Does the intentional omission of Richard Vance in Article II(3) adequately bar elective share claims under Illinois law?',
          '3. What documentation should the executor preserve to protect against personal liability given the lack of formal court appraisals authorized under Article V(c)?',
          '4. Are all real property legal descriptions at 1822 Sheridan Road fully aligned with the county recorder deed?'
        ]
      },
      analyzedAt: '2026-09-14T11:20:00Z'
    }
  },
  {
    id: 'incorporation-delaware-corp',
    title: 'Delaware Certificate of Incorporation & Founders\' Agreement',
    category: 'Corporate Formation & Governance',
    documentType: LegalDocumentType.INCORPORATION,
    description: 'A Delaware C-Corp Certificate of Incorporation featuring blank-check preferred stock, 50/50 founder deadlock, drag-along rights without a valuation floor, and DGCL 102(b)(7) exculpation.',
    rawText: `CERTIFICATE OF INCORPORATION OF APEX NEXUS TECHNOLOGIES, INC.

FIRST: The name of the corporation is Apex Nexus Technologies, Inc. (the "Corporation").

SECOND: The address of the registered office of the Corporation in the State of Delaware is 1209 North Orange Street, Wilmington, County of New Castle, Delaware 19801. The name of its registered agent at such address is The Corporation Trust Company.

THIRD: The purpose of the Corporation is to engage in any lawful act or activity for which corporations may be organized under the General Corporation Law of the State of Delaware (the "DGCL").

FOURTH: AUTHORIZED CAPITAL STOCK & BLANK-CHECK PREFERRED
The total number of shares of all classes of stock which the Corporation shall have authority to issue is 12,500,000 shares, consisting of:
1. 10,000,000 shares of Common Stock, par value $0.0001 per share; and
2. 2,500,000 shares of Preferred Stock, par value $0.0001 per share.
The Board of Directors is expressly authorized, by resolution or resolutions, to issue shares of Preferred Stock in one or more series, and to establish the voting powers, full or limited, or no voting powers, and the designations, preferences, and relative, participating, optional, or other special rights, and qualifications or restrictions thereof ("Blank-Check Preferred"). Such Preferred Stock may be granted senior liquidation preferences and voting multipliers over Common Stock without any further vote of the Common Stockholders.

FIFTH: FOUNDER VOTING & 50/50 DEADLOCK PROVISION
The initial Common Stock is held equally (50% each) by Rachel Sterling and Vikram Patel. In the event the Board of Directors or Stockholders are unable to reach agreement on any fundamental corporate transaction, annual budget, or officer appointment, creating an operational impasse, neither party shall have a casting vote. If an impasse persists for sixty (60) days, either founder may petition the Delaware Court of Chancery for the appointment of a custodian or dissolution of the Corporation.

SIXTH: COMPULSORY DRAG-ALONG RIGHTS
If holders of a majority of the outstanding Common Stock and Preferred Stock approve a sale of the Corporation (whether by merger, consolidation, or sale of all or substantially all assets), all other stockholders (including minority founders and employee option holders) shall be compelled and obligated to vote in favor of such transaction and transfer all shares held by them on the same terms, regardless of whether the net proceeds yield zero distribution to Common Stockholders due to senior liquidation preferences, and without right to assert statutory appraisal rights under DGCL § 262.

SEVENTH: DIRECTOR LIABILITY EXCULPATION & MANDATORY EXPENSE ADVANCEMENT
Pursuant to DGCL § 102(b)(7), no director of the Corporation shall be personally liable to the Corporation or its stockholders for monetary damages for breach of fiduciary duty as a director, except for liability for (i) any breach of the director's duty of loyalty, (ii) acts or omissions not in good faith or involving intentional misconduct, or (iii) any transaction from which the director derived an improper personal benefit. The Corporation shall advance all legal expenses, including attorney's fees, incurred by any director in defending any proceeding prior to final disposition, upon receipt of an undertaking to repay if ultimately determined to be ineligible.

EIGHTH: SUPERMAJORITY BYLAWS AMENDMENT
The Board of Directors is authorized to adopt, amend, or repeal the Bylaws of the Corporation. Stockholders may only alter, amend, or repeal the Bylaws upon the affirmative vote of the holders of at least seventy-five percent (75%) of the voting power of all outstanding shares entitled to vote.

IN WITNESS WHEREOF, the undersigned Incorporator has executed this Certificate of Incorporation on February 10, 2025.
Rachel Sterling, Incorporator`,
    precomputedAnalysis: {
      documentId: 'incorporation-delaware-corp',
      documentTitle: 'Delaware Certificate of Incorporation & Founders\' Agreement',
      documentType: LegalDocumentType.INCORPORATION,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.INCORPORATION,
        subtype: 'Certificate of Incorporation (Delaware C-Corp)',
        jurisdictionOrOffice: 'Delaware Division of Corporations / Court of Chancery',
        keyPartiesOrRoles: [
          { role: 'Entity Name', name: 'Apex Nexus Technologies, Inc.' },
          { role: 'Incorporator & Co-Founder', name: 'Rachel Sterling (50% Common)' },
          { role: 'Co-Founder', name: 'Vikram Patel (50% Common)' },
          { role: 'Registered Agent', name: 'The Corporation Trust Company (Wilmington, DE)' }
        ],
        domainSpecificChecklist: [
          { item: 'Authorized Share Capitalization', status: 'pass', note: '10M Common stock ($0.0001 par) and 2.5M Preferred stock delineated.' },
          { item: 'Blank-Check Preferred Stock Dilution', status: 'alert', note: 'Article Fourth grants board unilateral authority to issue preferred stock with senior liquidation preferences and voting power without common shareholder approval.' },
          { item: '50/50 Founder Deadlock Vulnerability', status: 'alert', note: 'Article Fifth lacks a shotgun buy-sell or independent tiebreaker mechanism, leaving founders exposed to court-ordered corporate dissolution upon impasse.' },
          { item: 'Drag-Along Forced Sale Without Floor', status: 'alert', note: 'Article Sixth forces minority holders to sell equity even if senior preferred preferences leave common equity with zero dollars.' },
          { item: 'DGCL § 102(b)(7) Director Exculpation', status: 'warning', note: 'Eliminates personal monetary liability of directors for negligence and mandates immediate advance of legal defense expenses.' },
          { item: '75% Supermajority Amendment Barrier', status: 'warning', note: 'Article Eighth sets high 75% voting threshold, enabling a 26% minority investor to block stockholder reforms.' }
        ]
      },
      wordCount: 548,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 79,
        overallRating: 'high',
        unilateralObligationsScore: 82,
        harshIndemnitiesScore: 74,
        liquidatedDamagesScore: 80,
        autoRenewalTrapScore: 68,
        criticalFlagsCount: 4,
        summary: 'High corporate governance vulnerability. The Certificate authorizes Blank-Check Preferred shares with senior liquidation rights, includes a forced Drag-Along sale with zero valuation floor, creates a 50/50 founder deadlock risk, and requires a 75% supermajority to amend bylaws.',
        documentType: LegalDocumentType.INCORPORATION,
        typeDimensions: [
          {
            key: 'blank_check_dilution',
            label: 'Equity Dilution & Blank-Check Preferred',
            score: 85,
            status: 'critical',
            description: 'Article Fourth authorizes 2.5M preferred shares that the Board can endow with senior liquidation multipliers without common shareholder approval.'
          },
          {
            key: 'deadlock_risk',
            label: 'Founder Deadlock & Oppression Risk',
            score: 82,
            status: 'critical',
            description: 'Article Fifth provides no tie-breaker or buy-sell mechanism for 50/50 founders, resulting in court-ordered dissolution if disagreement occurs.'
          },
          {
            key: 'governance_hurdles',
            label: 'Governance & Supermajority Hurdles',
            score: 72,
            status: 'critical',
            description: 'Article Eighth mandates a 75% supermajority to amend bylaws, allowing a small minority to block governance changes.'
          },
          {
            key: 'transfer_drag_along',
            label: 'Transfer Restrictions & Drag-Along Exposure',
            score: 84,
            status: 'critical',
            description: 'Article Sixth compels minority shareholders to sell in an acquisition even if preferred stock wipes out common shareholder payout.'
          }
        ]
      },
      clauses: [
        {
          id: 'incorp-c-1',
          sectionNumber: 'Article Fourth',
          title: 'Blank-Check Preferred Stock Authorization',
          category: 'corporate_governance_equity',
          domainTag: 'Equity Dilution Trap',
          riskLevel: 'high',
          riskScore: 85,
          originalText: 'The Board of Directors is expressly authorized, by resolution or resolutions, to issue shares of Preferred Stock in one or more series... Such Preferred Stock may be granted senior liquidation preferences and voting multipliers over Common Stock without any further vote of the Common Stockholders.',
          plainEnglishText: 'The board of directors can create brand-new classes of preferred stock out of thin air and give outside investors massive financial advantages—like getting paid back 3x their money before founders or employees see a single cent—without common shareholders getting a vote.',
          executiveSummary: 'Unfettered blank-check preferred authorization enabling future investor series to establish senior liquidation preferences and voting multipliers.',
          riskReasons: [
            'Bypasses common stockholder voting approval when creating preferred share classes.',
            'Can subordinate founders\' economic payout in an acquisition or liquidity event.'
          ],
          impactOnUser: 'Future investors negotiated by the board could wipe out the financial value of your common stock in an exit.',
          suggestedAction: 'Add a protective provision requiring affirmative approval of a majority of Common Stockholders before issuing preferred shares senior to common.',
          questionForLawyer: 'Should we amend Article Fourth to include standard NVCA protective provisions requiring separate Common Stock class votes for senior preferred issuances?',
          translations: {
            es: 'La junta directiva puede emitir acciones preferentes con preferencias de liquidación superiores sin el voto de los accionistas comunes.',
            hi: 'बोर्ड सामान्य शेयरधारकों के वोट के बिना वरिष्ठ तरजीही शेयर जारी कर सकता है जो आपकी इक्विटी को कमजोर कर सकता है।',
            ta: 'பொது பங்குதாரர்களின் வாக்களிப்பின்றி மூத்த விருப்ப பங்குகளை வெளியிட வாரியத்திற்கு அதிகாரம் உள்ளது.'
          }
        },
        {
          id: 'incorp-c-2',
          sectionNumber: 'Article Sixth',
          title: 'Compulsory Drag-Along Without Valuation Floor',
          category: 'founder_vesting_transfer',
          domainTag: 'Drag-Along Forced Sale',
          riskLevel: 'high',
          riskScore: 84,
          originalText: 'If holders of a majority of the outstanding Common Stock and Preferred Stock approve a sale of the Corporation... all other stockholders... shall be compelled and obligated to vote in favor... regardless of whether the net proceeds yield zero distribution to Common Stockholders...',
          plainEnglishText: 'If big investors or a slight majority want to sell the company, you are legally forced to vote "yes" and sell all your shares, even if the sale price is so low that after investors take their cut, you receive literally zero dollars.',
          executiveSummary: 'Mandatory drag-along covenant compelling minority stockholders to consent to acquisitions without minimum valuation protections or appraisal rights.',
          riskReasons: [
            'No minimum per-share valuation floor required to trigger drag-along.',
            'Express waiver of statutory Delaware appraisal rights under DGCL § 262.'
          ],
          impactOnUser: 'You could build the company for years and be forced to sell your equity for $0 if investors push through a distressed fire-sale.',
          suggestedAction: 'Insist on a minimum enterprise valuation floor or a requirement that Common Stockholders receive at least a minimum guaranteed payout per share.',
          questionForLawyer: 'Can we add a minimum net proceeds floor to the Drag-Along provision so common holders cannot be forced into a zero-dollar transaction?',
          translations: {
            es: 'Se te puede obligar a vender todas tus acciones en una adquisición incluso si no recibes nada de dinero.',
            hi: 'आपको अपनी इक्विटी बेचने के लिए मजबूर किया जा सकता है, भले ही निवेशकों के तरजीही भुगतान के बाद आपको 0 रुपये मिले।',
            ta: 'முதலீட்டாளர்கள் ஒப்புதல் அளித்தால், உங்களுக்கு பணம் எதுவும் கிடைக்காவிட்டாலும் பங்குகளை விற்க நீங்கள் கடமைப்பட்டுள்ளீர்கள்.'
          }
        },
        {
          id: 'incorp-c-3',
          sectionNumber: 'Article Fifth',
          title: '50/50 Founder Deadlock & Court Dissolution Risk',
          category: 'corporate_governance_equity',
          domainTag: 'Deadlock & Impasse',
          riskLevel: 'high',
          riskScore: 80,
          originalText: 'The initial Common Stock is held equally (50% each) by Rachel Sterling and Vikram Patel. In the event the Board of Directors or Stockholders are unable to reach agreement... If an impasse persists for sixty (60) days, either founder may petition the Delaware Court of Chancery for the appointment of a custodian or dissolution of the Corporation.',
          plainEnglishText: 'Since the two founders own exactly 50% each, if they disagree on a major decision, neither person can break the tie. If the fight lasts 60 days, either founder can ask a Delaware judge to shut down the company and sell off the assets.',
          executiveSummary: '50/50 voting equality mechanism without internal buy-sell tiebreaker, exposing the entity to judicial dissolution under DGCL § 226.',
          riskReasons: [
            'No independent board tie-breaker or shotgun buy-sell (Russian roulette) resolution mechanism.',
            'Court-ordered corporate dissolution destroys enterprise goodwill and brand equity.'
          ],
          impactOnUser: 'A personal or tactical disagreement between founders can destroy the company through expensive Delaware Chancery Court litigation.',
          suggestedAction: 'Adopt a Founders\' Operating Agreement with a mutual shotgun buy-sell provision or designate a mutually agreed-upon independent advisor to cast a tie-breaking vote.',
          questionForLawyer: 'What shotgun buy-sell or mediation clause should we incorporate into the Stockholders\' Agreement to avoid statutory corporate dissolution under DGCL § 226?',
          deadlinesOrNotices: '60 days impasse window before judicial dissolution petition',
          translations: {
            es: 'La división 50/50 sin un mecanismo de desempate permite a un juez disolver la empresa si los fundadores no se ponen de acuerdo.',
            hi: '50/50 के समान बंटवारे के कारण मतभेद होने पर 60 दिनों में कंपनी बंद होने का गंभीर खतरा है।',
            ta: '50/50 சம பங்குகள் காரணமாக கருத்து வேறுபாடு ஏற்பட்டால் நிறுவனம் மூடப்படும் அபாயம் உள்ளது.'
          }
        },
        {
          id: 'incorp-c-4',
          sectionNumber: 'Article Seventh',
          title: 'Director Exculpation & Mandatory Expense Advancement',
          category: 'director_indemnification_liability',
          domainTag: 'Director Liability',
          riskLevel: 'moderate',
          riskScore: 68,
          originalText: 'Pursuant to DGCL § 102(b)(7), no director of the Corporation shall be personally liable to the Corporation or its stockholders for monetary damages for breach of fiduciary duty... The Corporation shall advance all legal expenses, including attorney\'s fees, incurred by any director...',
          plainEnglishText: 'Directors cannot be sued for monetary damages by stockholders for making negligent business mistakes, and the company must pay their high-priced defense lawyers in advance if they ever get sued.',
          executiveSummary: 'Standard Delaware corporate exculpation eliminating director personal liability for duty of care violations with mandatory expense advancement.',
          riskReasons: [
            'Mandatory advancement of attorney fees can drain corporate cash reserves during internal shareholder disputes.'
          ],
          impactOnUser: 'Protects you when serving on the board, but limits remedies if a co-director makes reckless commercial decisions.',
          suggestedAction: 'Standard for venture-backed startups; verify that the company obtains adequate Directors & Officers (D&O) liability insurance.',
          questionForLawyer: 'Does our indemnification policy require D&O insurance before mandatory defense advances kick in?',
          translations: {
            es: 'Los directores están protegidos de responsabilidad monetaria por negligencia y la empresa debe adelantar sus honorarios legales.',
            hi: 'निदेशकों को लापरवाही के लिए व्यक्तिगत रूप से उत्तरदायी नहीं ठहराया जा सकता है और कंपनी को उनके कानूनी खर्च का भुगतान करना होगा।',
            ta: 'இயக்குநர்கள் தனிப்பட்ட முறையில் பொறுப்பேற்க மாட்டார்கள் மற்றும் நிறுவனம் அவர்களின் வழக்கறிஞர் கட்டணங்களை செலுத்தும்.'
          }
        }
      ],
      obligations: [
        {
          id: 'incorp-ob-1',
          clauseId: 'incorp-c-1',
          section: 'Founder Equity',
          title: 'File Section 83(b) Tax Election with IRS',
          description: 'Mail certified IRS Section 83(b) election form within strictly 30 days of initial share issuance to avoid ordinary income tax on vesting shares.',
          dueDateStr: 'Strictly 30 days from share purchase date',
          noticeDays: 30,
          penaltyWarning: 'Fatal tax penalty: failure to file causes all vesting shares to be taxed as ordinary income at higher future valuations',
          completed: false
        },
        {
          id: 'incorp-ob-2',
          clauseId: 'incorp-c-4',
          section: 'Article Second',
          title: 'Annual Delaware Franchise Tax Report',
          description: 'File Delaware Annual Franchise Tax Report and pay franchise tax fees before March 1st.',
          dueDateStr: 'March 1 annually',
          noticeDays: 30,
          penaltyWarning: '$200 late penalty + 1.5% monthly compound interest and loss of Delaware good standing',
          completed: false
        },
        {
          id: 'incorp-ob-3',
          clauseId: 'incorp-c-3',
          section: 'Article Fifth',
          title: 'Adopt Founders\' Operating Agreement',
          description: 'Draft and execute bilateral Stockholders\' Agreement with shotgun buy-sell tiebreaker to neutralize 50/50 deadlock.',
          dueDateStr: 'Prior to first commercial revenue',
          penaltyWarning: 'Exposes company to involuntary judicial dissolution under DGCL § 226',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Delaware Certificate of Incorporation & Founders\' Agreement',
        clientNamePlaceholder: 'Rachel Sterling / Apex Nexus Technologies',
        keyAmbiguities: [
          'Article Fifth provides a 60-day impasse countdown but contains zero intermediate mediation or appraisal mechanisms prior to judicial dissolution.',
          'Article Sixth drag-along fails to define whether founder unvested equity accelerates upon acquisition.'
        ],
        conflictingClauses: [
          'Article Eighth sets a 75% supermajority for bylaws amendments, which conflicts with Article Fourth granting the board unilateral authority to amend share rights.'
        ],
        factualTimeline: [
          { event: 'Filing with Delaware Secretary of State', triggerCondition: 'Execution date (February 10, 2025)', sectionRef: 'Attestation' },
          { event: 'IRS 83(b) Election Filing Cutoff', triggerCondition: 'Strict 30 calendar days from share issuance', sectionRef: 'Stockholder Agreement' },
          { event: 'Delaware Franchise Tax Due Date', triggerCondition: 'March 1 of each subsequent year', sectionRef: 'Article Second' },
          { event: 'Founder Deadlock Dissolution Window', triggerCondition: '60 days following unresolved impasse', sectionRef: 'Article Fifth' }
        ],
        targetedQuestions: [
          '1. How can we implement a shotgun buy-sell mechanism in our separate Stockholders\' Agreement to prevent court-ordered liquidation under Article Fifth?',
          '2. What protective provisions should Common Stockholders retain to prevent Article Fourth Blank-Check Preferred from issuing 3x liquidation multiples without common consent?',
          '3. Are the drag-along provisions in Article Sixth enforceable under Delaware Chancery Court precedent if minority founders receive zero consideration?',
          '4. Does our founder stock purchase agreement include single-trigger or double-trigger vesting acceleration upon a forced sale?'
        ]
      },
      analyzedAt: '2026-09-14T11:25:00Z'
    }
  },
  {
    id: 'living-trust-revocable',
    title: 'Revocable Living Family Trust & Pour-Over Transfer',
    category: 'Wills & Estate Planning',
    documentType: LegalDocumentType.WILL,
    subtype: 'Revocable Living Trust Instrument',
    description: 'A comprehensive revocable living trust featuring spendthrift protections, successor trustee fiduciary powers, incapacity determination clauses, and no-contest provisions.',
    rawText: `THE STERLING FAMILY REVOCABLE LIVING TRUST AGREEMENT

This Trust Agreement is established on May 15, 2025, by and between Arthur Pendelton Sterling ("Grantor" and initial "Trustee"), and Arthur Pendelton Sterling as initial Trustee.

ARTICLE I: CREATION AND PROPERTY
The Grantor hereby transfers and delivers to the Trustee the initial property described in Schedule A. The Grantor reserves the right during Grantor's lifetime and capacity to revoke or amend this Trust in whole or in part by written instrument delivered to the Trustee.

ARTICLE II: INCAPACITY DETERMINATION
If Grantor becomes incapacitated, as determined in writing by two (2) licensed independent physicians certifying Grantor cannot manage financial affairs, the Successor Trustee shall immediately assume full fiduciary control. The Successor Trustee shall pay or apply net income and principal for Grantor's health, support, and medical maintenance.

ARTICLE III: SUCCESSOR TRUSTEES & BOND WAIVER
Upon Grantor's death or incapacity, Helena Sterling Vance shall serve as First Successor Trustee. If Helena is unable or unwilling to serve, Meridian Trust & Fiduciary Services NA shall serve as Corporate Successor Trustee. No Successor Trustee shall be required to post surety bond or account to any probate court in any jurisdiction.

ARTICLE IV: POST-DEATH RESIDUARY DISTRIBUTION & SPENDTHRIFT CLAUSE
Upon the death of Grantor, the Trustee shall distribute the remaining trust estate as follows:
1. Tangible Personal Property to surviving children in equal shares.
2. The Residuary Trust Estate shall be divided into separate shares for each surviving child. Each child's share shall be retained in trust until attaining age 35, with distributions permitted solely for education and healthcare.
No beneficiary shall have the power to anticipate, assign, alienate, or encumber any interest in principal or income. No trust assets shall be subject to claims of creditors, bankruptcy trustees, or divorcing spouses of any beneficiary prior to actual receipt.

ARTICLE V: STRICT NO-CONTEST (IN TERROREM) DISINHERITANCE
If any beneficiary under this Trust or legal heir directly or indirectly contests, challenges, or attacks this Trust Agreement, any amendment, or any disposition hereunder in any court or arbitration proceeding, such contesting beneficiary shall immediately forfeit all right, title, and interest in this Trust, and their share shall be distributed as if they had predeceased the Grantor without issue.

ARTICLE VI: GOVERNING LAW & FIDUCIARY EXCULPATION
This Trust Agreement shall be governed and construed in accordance with the laws of the State of California. The Trustee shall not be held personally liable to any beneficiary for any investment losses or depreciation in value, absent clear and convincing proof of willful fraud or gross misconduct.`,
    precomputedAnalysis: {
      documentId: 'living-trust-revocable',
      documentTitle: 'Revocable Living Family Trust & Pour-Over Transfer',
      documentType: LegalDocumentType.WILL,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.WILL,
        subtype: 'Revocable Living Trust Instrument',
        jurisdictionOrOffice: 'California Probate Code / Superior Court',
        keyPartiesOrRoles: [
          { role: 'Grantor & Initial Trustee', name: 'Arthur Pendelton Sterling' },
          { role: 'First Successor Trustee', name: 'Helena Sterling Vance' },
          { role: 'Corporate Successor Trustee', name: 'Meridian Trust & Fiduciary Services NA' }
        ],
        domainSpecificChecklist: [
          { item: 'Trust Funding & Asset Retitling', status: 'warning', note: 'Trust Agreement must be funded with deeded real estate and accounts retitled in trustee name to avoid ancillary probate.' },
          { item: 'Physician Incapacity Protocol', status: 'pass', note: 'Article II requires two independent physician certifications prior to fiduciary power transfer.' },
          { item: 'Surety Bond Exemption', status: 'warning', note: 'Article III waives fiduciary bonding, increasing beneficiary reliance on successor trustee integrity.' },
          { item: 'Spendthrift Creditor Shield', status: 'pass', note: 'Article IV protects child trusts from judgment creditors and bankruptcy attachments until age 35.' },
          { item: 'Strict No-Contest Forfeiture Trap', status: 'alert', note: 'Article V triggers complete disinheritance upon any legal challenge to trustee allocations.' }
        ]
      },
      wordCount: 520,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 62,
        overallRating: 'moderate',
        unilateralObligationsScore: 68,
        harshIndemnitiesScore: 55,
        liquidatedDamagesScore: 70,
        autoRenewalTrapScore: 30,
        criticalFlagsCount: 2,
        summary: 'Moderate estate risk profile. Features rigorous spendthrift protections and physician-certified incapacity protocols, but includes an absolute surety bond waiver and an aggressive in terrorem disinheritance clause.',
        documentType: LegalDocumentType.WILL,
        typeDimensions: [
          {
            key: 'in_terrorem_contest',
            label: 'No-Contest / In Terrorem Severity',
            score: 78,
            status: 'critical',
            description: 'Article V disinherits any heir contesting distributions without good-cause safe harbors.'
          },
          {
            key: 'fiduciary_discretion',
            label: 'Trustee Powers & Bond Waiver',
            score: 65,
            status: 'warning',
            description: 'Article III waives surety bonding and Article VI limits liability to gross misconduct.'
          }
        ]
      },
      clauses: [
        {
          id: 'trust-c-1',
          sectionNumber: 'Article II',
          title: 'Incapacity Determination & Control Transfer',
          category: 'executor_fiduciary_powers',
          riskLevel: 'moderate',
          riskScore: 54,
          originalText: 'If Grantor becomes incapacitated, as determined in writing by two (2) licensed independent physicians... Successor Trustee shall immediately assume full fiduciary control.',
          plainEnglishText: 'If two doctors put in writing that you can no longer handle your money, your chosen backup trustee takes over your finances without going to court.',
          executiveSummary: 'Springing fiduciary authority activated upon dual independent medical certification.',
          riskReasons: ['Immediate transfer of asset authority without judicial oversight'],
          impactOnUser: 'Provides rapid asset management if incapacitated, avoiding costly conservatorship proceedings.',
          suggestedAction: 'Ensure HIPPA release is attached so designated physicians can legally release medical opinions.',
          questionForLawyer: 'Does this trust include a standard HIPAA disclosure authorization matching California Probate Code § 4400 requirements?'
        },
        {
          id: 'trust-c-2',
          sectionNumber: 'Article V',
          title: 'Strict In Terrorem Disinheritance Clause',
          category: 'no_contest_probate_terms',
          riskLevel: 'high',
          riskScore: 82,
          originalText: 'If any beneficiary under this Trust or legal heir directly or indirectly contests... such contesting beneficiary shall immediately forfeit all right, title, and interest in this Trust.',
          plainEnglishText: 'If anyone challenges how the trustee divides the assets, they are kicked out completely and get zero dollars.',
          executiveSummary: 'Strict penalty clause disinheriting any challenging beneficiary without probable-cause exceptions.',
          riskReasons: ['Harsh zero-tolerance disinheritance', 'Suppresses legitimate inquiry into potential trustee self-dealing'],
          impactOnUser: 'Family members cannot question trustee accounting without risking complete loss of their inheritance.',
          suggestedAction: 'Insert a safe-harbor provision exempting petitions for trustee accounting or breach of fiduciary duty.',
          questionForLawyer: 'Under California Probate Code § 21311, is this no-contest clause limited solely to direct contests brought without probable cause?'
        }
      ],
      obligations: [
        {
          id: 'trust-ob-1',
          clauseId: 'trust-c-1',
          section: 'Article I & Schedule A',
          title: 'Execute Deeds for Real Estate Retitling',
          description: 'Transfer real property deeds into Arthur Pendelton Sterling as Trustee of the Trust.',
          dueDateStr: 'Within 60 days of trust execution',
          penaltyWarning: 'Untitled real estate will be forced into probate court upon Grantor passing',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Revocable Living Family Trust & Pour-Over Transfer',
        clientNamePlaceholder: 'Arthur Sterling',
        keyAmbiguities: [
          'Trust does not specify whether successor corporate trustee fees are subject to statutory court caps or institutional fee schedules.'
        ],
        conflictingClauses: [
          'Article IV spendthrift clause allows distributions for healthcare while Article V forfeits rights upon disputes with trustee interpretations.'
        ],
        factualTimeline: [
          { event: 'Execution Date', triggerCondition: 'May 15, 2025', sectionRef: 'Preamble' },
          { event: 'Real Estate Quitclaim Recording', triggerCondition: 'Immediate post-signing', sectionRef: 'Article I' }
        ],
        targetedQuestions: [
          '1. Can we amend Article V to ensure beneficiaries can request an annual formal accounting without triggering the no-contest forfeiture clause?'
        ]
      },
      analyzedAt: '2026-09-14T13:10:00Z'
    }
  },
  {
    id: 'patent-neuromorphic-ai',
    title: 'US Patent Application: Neuromorphic Edge Computing Accelerators',
    category: 'Patents & Intellectual Property',
    documentType: LegalDocumentType.PATENT,
    subtype: 'Utility Patent Specification & Claims',
    description: 'A cutting-edge USPTO utility patent application detailing memristor-based spiking neural network (SNN) hardware, 35 U.S.C. 101 subject-matter eligibility, and assignment covenants.',
    rawText: `SPECIFICATION AND CLAIMS FOR UNITED STATES LETTERS PATENT

TITLE: ASYNCHRONOUS SPIKING NEUROMORPHIC PROCESSOR ARCHITECTURE WITH PROGRAMMABLE MEMRISTIVE CROSSBAR ARRAYS

INVENTORS: Dr. Elena Rostova, Marcus Chen, and Dr. Aris Thorne
APPLICANT / ASSIGNEE: SynapseCore Semiconductor Inc. (Milpitas, CA)

CROSS-REFERENCE TO RELATED APPLICATIONS
This application claims priority to US Provisional Patent Application No. 63/589,112 filed August 14, 2024.

STATEMENT REGARDING FEDERALLY SPONSORED R&D
This invention was made with government support under Award No. HR0011-23-C-0089 awarded by the Defense Advanced Research Projects Agency (DARPA). The Government has certain rights in this invention under 35 U.S.C. § 200 et seq. (Bayh-Dole Act).

BACKGROUND AND SUMMARY OF THE INVENTION
Conventional von Neumann architectures suffer from memory-wall latency bottlenecks when executing deep artificial neural networks. The present invention solves this technical challenge in physical hardware by integrating a non-volatile titanium dioxide memristor crossbar array with asynchronous leaky-integrate-and-fire (LIF) spiking neuron silicon circuits.

WHAT IS CLAIMED IS:
1. An asynchronous neuromorphic computing integrated circuit comprising:
a physical silicon substrate;
a non-volatile crossbar array fabricated on said substrate comprising a plurality of conductive wordlines, a plurality of bitlines, and two-terminal memristive resistance switching elements disposed at intersections thereof;
a plurality of analog dendritic integrator nodes connected to said bitlines; and
a plurality of event-driven spiking output circuits configured to emit discrete temporal pulse packets when an integrated membrane voltage exceeds an adaptive programmatic firing threshold;
wherein synaptic weight matrix updates are executed entirely in-memory via physical conductance shifts without data movement to an external bus.

2. The integrated circuit of claim 1, further comprising:
means for dynamic threshold adaptation responsive to ambient thermal dissipation across said crossbar array.

3. The integrated circuit of claim 1, wherein said memristive elements comprise hafnium oxide thin films exhibiting continuous conductance modulation under bipolar electrical stress pulses.

INVENTOR ASSIGNMENT & DEFENSE MARCH-IN COVENANT
The inventors have irrevocably assigned all rights, titles, and interests to SynapseCore Semiconductor Inc. Assignee acknowledges that pursuant to the Bayh-Dole Act, DARPA retains a nonexclusive, nontransferable, irrevocable, paid-up worldwide license to practice the invention, and reserves march-in rights to license the patent to third parties if Assignee fails to achieve practical application within thirty-six (36) months.`,
    precomputedAnalysis: {
      documentId: 'patent-neuromorphic-ai',
      documentTitle: 'US Patent Application: Neuromorphic Edge Computing Accelerators',
      documentType: LegalDocumentType.PATENT,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.PATENT,
        subtype: 'Utility Patent Specification & Claims',
        jurisdictionOrOffice: 'USPTO / Art Unit 2129 (Computer Architecture)',
        keyPartiesOrRoles: [
          { role: 'Lead Inventor', name: 'Dr. Elena Rostova' },
          { role: 'Co-Inventor', name: 'Marcus Chen' },
          { role: 'Assignee Entity', name: 'SynapseCore Semiconductor Inc.' },
          { role: 'Federal Grantor Agency', name: 'DARPA (Award HR0011-23-C-0089)' }
        ],
        domainSpecificChecklist: [
          { item: '35 U.S.C. § 101 Subject Matter Eligibility', status: 'pass', note: 'Claim 1 explicitly recites physical silicon substrate and memristive hardware components, avoiding Alice/Mayo abstract idea rejections.' },
          { item: '35 U.S.C. § 112(f) Means-Plus-Function Trap', status: 'alert', note: 'Claim 2 recites "means for dynamic threshold adaptation" without corresponding algorithm in specification, creating indefiniteness invalidation exposure.' },
          { item: 'Bayh-Dole March-In Rights', status: 'warning', note: 'DARPA retains march-in rights and royalty-free federal license under award covenants.' },
          { item: 'Provisional Priority Continuity', status: 'pass', note: 'Properly references provisional 63/589,112 within 12-month statutory window.' }
        ]
      },
      wordCount: 490,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 68,
        overallRating: 'moderate',
        unilateralObligationsScore: 72,
        harshIndemnitiesScore: 60,
        liquidatedDamagesScore: 50,
        autoRenewalTrapScore: 40,
        criticalFlagsCount: 2,
        summary: 'Moderate patent exposure. Independent Claim 1 has solid hardware grounding, but Claim 2 triggers 35 U.S.C. 112(f) means-plus-function indefiniteness risk, and DARPA holds Bayh-Dole march-in covenants.',
        documentType: LegalDocumentType.PATENT,
        typeDimensions: [
          {
            key: 'claim_scope_indefiniteness',
            label: 'Claim Indefiniteness & 112(f) Traps',
            score: 75,
            status: 'critical',
            description: 'Claim 2 recites functional means without step-by-step algorithmic backing.'
          },
          {
            key: 'government_march_in',
            label: 'Bayh-Dole March-In Exposure',
            score: 70,
            status: 'warning',
            description: 'Federal government retains compulsory licensing powers if commercialization milestones are delayed.'
          }
        ]
      },
      clauses: [
        {
          id: 'patent-ai-c-1',
          sectionNumber: 'Claim 2',
          title: 'Functional Means-Plus-Function Vulnerability',
          category: 'patent_claims_scope',
          riskLevel: 'high',
          riskScore: 79,
          originalText: 'The integrated circuit of claim 1, further comprising: means for dynamic threshold adaptation responsive to ambient thermal dissipation across said crossbar array.',
          plainEnglishText: 'Claim 2 uses the words "means for" without explaining exactly how the math or chip logic works. Under patent law, examiners or competitors can get this claim thrown out as too vague.',
          executiveSummary: 'Invocation of 35 U.S.C. § 112(f) invoking strict structural disclosure requirements in the specification.',
          riskReasons: ['Vulnerable to 35 U.S.C. § 112 indefiniteness rejections during examination', 'Narrowed to exact disclosed embodiments during litigation'],
          impactOnUser: 'Weakens patent enforceability against competitors using slightly different adaptive cooling circuits.',
          suggestedAction: 'Amend claim 2 to recite a specific hardware circuit such as "a feedback thermistor sensor coupled to an analog comparator".',
          questionForLawyer: 'Can we replace the "means for" language in Claim 2 with structural circuit definitions before responding to the first USPTO Office Action?'
        }
      ],
      obligations: [
        {
          id: 'patent-ai-ob-1',
          clauseId: 'patent-ai-c-1',
          section: 'Federal March-In',
          title: 'Submit DARPA Annual Commercialization Report',
          description: 'Submit practical application metrics to DARPA to maintain federal exclusivity under Bayh-Dole.',
          dueDateStr: 'Annual by December 31',
          penaltyWarning: 'Risk of federal compulsory march-in license to competitor',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'US Patent Application: Neuromorphic Edge Computing Accelerators',
        clientNamePlaceholder: 'SynapseCore Semiconductor',
        keyAmbiguities: [
          'Claim 2 fails to provide structural backing for thermal adaptation, inviting 35 U.S.C. 112(f) rejections.'
        ],
        conflictingClauses: [
          'Exclusive commercial assignment to company conflicts with DARPA 36-month march-in trigger if volume production is delayed.'
        ],
        factualTimeline: [
          { event: 'Provisional Filing Date', triggerCondition: 'August 14, 2024', sectionRef: 'Cross-Reference' },
          { event: 'Non-Provisional Utility Filing', triggerCondition: 'May 2025', sectionRef: 'Preamble' }
        ],
        targetedQuestions: [
          '1. How can we restructure Claim 2 to eliminate 35 U.S.C. § 112(f) means-plus-function treatment while maintaining broad scope?'
        ]
      },
      analyzedAt: '2026-09-14T13:10:00Z'
    }
  },
  {
    id: 'llc-operating-agreement',
    title: 'Multi-Member Manager-Managed LLC Operating Agreement',
    category: 'Corporate Formation & Governance',
    documentType: LegalDocumentType.INCORPORATION,
    subtype: 'Delaware LLC Operating Agreement',
    description: 'A multi-member LLC agreement with capital call default dilution, manager exculpation, right of first refusal, and drag-along sales.',
    rawText: `LIMITED LIABILITY COMPANY OPERATING AGREEMENT OF NEXUS VENTURES LLC

This Limited Liability Company Agreement is entered into as of March 1, 2025, by and among the Members signatory hereto.

ARTICLE I: FORMATION AND PURPOSE
The Company was formed as a Delaware limited liability company pursuant to the Delaware Limited Liability Company Act (the "Delaware Act"). The Company is manager-managed.

ARTICLE II: MANDATORY CAPITAL CALLS & SQUEEZE-OUT DILUTION
If the Board of Managers determines additional capital is necessary, the Board may issue a Mandatory Capital Call notice to all Members pro-rata. If any Member fails to fund their share within fifteen (15) calendar days, the non-defaulting Members may fund the deficiency, and the defaulting Member's membership percentage shall be diluted at a 200% penalty ratio, reducing their equity and voting interests immediately.

ARTICLE III: MANAGER FIDUCIARY DUTY MODIFICATION
Pursuant to Section 18-1101(c) of the Delaware Act, all fiduciary duties (including duties of loyalty and care) of the Managers and Officers are hereby eliminated and disclaimed to the maximum extent permitted by law, except for the implied contractual covenant of good faith and fair dealing. Managers may invest in competing commercial enterprises without offering business opportunities to the Company.

ARTICLE IV: RESTRICTIONS ON TRANSFER & DRAG-ALONG
No Member may transfer, sell, or pledge any Units without prior written consent of the Majority-in-Interest. If Members holding at least sixty percent (60%) of the Units approve a sale of the Company, all Members shall be obligated to sell their Units upon identical terms and waive appraisal remedies.

ARTICLE V: GOVERNING LAW & EXCLUSIVE ARBITRATION
This Agreement is governed by Delaware law. Any dispute shall be resolved by confidential binding arbitration before JAMS in Wilmington, Delaware. The prevailing party shall be entitled to recover reasonable attorney's fees.`,
    precomputedAnalysis: {
      documentId: 'llc-operating-agreement',
      documentTitle: 'Multi-Member Manager-Managed LLC Operating Agreement',
      documentType: LegalDocumentType.INCORPORATION,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.INCORPORATION,
        subtype: 'Delaware LLC Operating Agreement',
        jurisdictionOrOffice: 'Delaware Chancery Court / LLC Act',
        keyPartiesOrRoles: [
          { role: 'Entity', name: 'Nexus Ventures LLC' },
          { role: 'Management Structure', name: 'Board of Managers' },
          { role: 'Governing Statute', name: 'Delaware LLC Act § 18-1101' }
        ],
        domainSpecificChecklist: [
          { item: '200% Capital Call Squeeze-Out Penalty', status: 'alert', note: 'Article II allows majority managers to issue 15-day emergency capital calls that heavily dilute members unable to inject fresh cash.' },
          { item: 'Elimination of Manager Duty of Loyalty', status: 'alert', note: 'Article III explicitly disclaims the duty of loyalty, allowing managers to compete with the LLC and seize corporate opportunities.' },
          { item: '60% Drag-Along Forced Sale', status: 'warning', note: 'Article IV forces minority members to sell units on majority terms without appraisal rights.' }
        ]
      },
      wordCount: 460,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 81,
        overallRating: 'high',
        unilateralObligationsScore: 86,
        harshIndemnitiesScore: 78,
        liquidatedDamagesScore: 82,
        autoRenewalTrapScore: 40,
        criticalFlagsCount: 4,
        summary: 'Severe member governance exposure. Managers disclaim all fiduciary duties of loyalty, can compete directly against the LLC, and can dilute minority members at a 200% penalty through 15-day mandatory capital calls.',
        documentType: LegalDocumentType.INCORPORATION,
        typeDimensions: [
          {
            key: 'capital_call_dilution',
            label: 'Mandatory Capital Call & Dilution Squeeze-Out',
            score: 88,
            status: 'critical',
            description: '15-day capital call window with 200% punitive dilution of minority members.'
          },
          {
            key: 'fiduciary_waiver',
            label: 'Fiduciary Duty Elimination',
            score: 84,
            status: 'critical',
            description: 'Complete elimination of duty of loyalty under Delaware LLC Act § 18-1101(c).'
          }
        ]
      },
      clauses: [
        {
          id: 'llc-c-1',
          sectionNumber: 'Article II',
          title: 'Mandatory Capital Call Penalty Dilution',
          category: 'corporate_governance_equity',
          riskLevel: 'high',
          riskScore: 86,
          originalText: 'If any Member fails to fund their share within fifteen (15) calendar days... defaulting Member\'s membership percentage shall be diluted at a 200% penalty ratio.',
          plainEnglishText: 'If the managers ask for extra cash and you cannot pay within 15 days, other partners can put in your share and take away double your ownership percentage.',
          executiveSummary: 'Punitive squeeze-out mechanism enforcing pro-rata capital calls with rapid forfeit window.',
          riskReasons: ['15 days is an extremely short timeframe to assemble capital', '200% penalty ratio strips minority equity rapidly'],
          impactOnUser: 'A cash crunch could cost you control or wipe out your entire investment stake.',
          suggestedAction: 'Require unanimous consent for capital calls, extend cure period to 60 days, and cap dilution at 100% (straight pro-rata).',
          questionForLawyer: 'Is a 200% dilution penalty enforceable under Delaware Chancery Court equity standards without an independent appraisal mechanism?'
        }
      ],
      obligations: [
        {
          id: 'llc-ob-1',
          clauseId: 'llc-c-1',
          section: 'Article II',
          title: 'Respond to Capital Call Notice',
          description: 'Fund pro-rata capital contribution within 15 days of manager issuance.',
          dueDateStr: '15 days from notice',
          penaltyWarning: '200% punitive dilution of membership interest',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Multi-Member Manager-Managed LLC Operating Agreement',
        clientNamePlaceholder: 'Minority Member',
        keyAmbiguities: ['No definition of what constitutes a genuine emergency justifying a capital call.'],
        conflictingClauses: ['Right of first refusal is overridden by the 60% drag-along forced sale clause.'],
        factualTimeline: [{ event: 'Capital Call Due Date', triggerCondition: '15 days from written notice', sectionRef: 'Article II' }],
        targetedQuestions: ['1. Can we insert a provision requiring an independent fairness opinion before managers can dilute non-funding members?']
      },
      analyzedAt: '2026-09-14T13:10:00Z'
    }
  },
  {
    id: 'convertible-note-seed',
    title: 'Convertible Promissory Note & Seed SAFE Financing',
    category: 'Corporate Formation & Governance',
    documentType: LegalDocumentType.INCORPORATION,
    subtype: 'Convertible Seed Note Instrument',
    description: 'A seed-stage convertible promissory note with an 8% compounding interest coupon, $6M valuation cap, 20% discount rate, and maturity acceleration clauses.',
    rawText: `SUBORDINATED CONVERTIBLE PROMISSORY NOTE

FOR VALUE RECEIVED, Apex Nexus Technologies, Inc., a Delaware corporation (the "Company"), promises to pay to Aurelius Angel Syndicate LP (the "Holder"), the principal sum of Five Hundred Thousand Dollars ($500,000.00), together with accrued interest at the rate of eight percent (8.0%) per annum, compounded annually.

1. MATURITY & ACCELERATION
The principal and all accrued but unpaid interest shall be due and payable in full on May 1, 2027 (the "Maturity Date"). If an Event of Default occurs (including failure to close a Qualified Financing within 18 months), Holder may declare the entire outstanding balance immediately due and payable.

2. QUALIFIED FINANCING AUTOMATIC CONVERSION
If the Company issues and sells shares of Preferred Stock in an equity financing resulting in gross proceeds of not less than $2,000,000 (excluding conversion of Notes), the outstanding balance of this Note shall automatically convert into shares of Financing Preferred Stock at a conversion price equal to the lesser of:
(a) Eighty percent (80%) of the per share price paid by cash investors in the Qualified Financing (a 20% discount); or
(b) The price per share obtained by dividing a Valuation Cap of Six Million Dollars ($6,000,000.00) by the fully diluted company capitalization immediately prior to closing.

3. CORPORATE TRANSACTION / CHANGE OF CONTROL
In the event of a merger, sale of substantially all assets, or change of control prior to conversion, Holder shall be entitled to receive, at Holder's sole option, either:
(i) Two times (2.0x) the outstanding principal balance in cash immediately prior to closing; or
(ii) Conversion into Common Stock at the Valuation Cap.

4. SUBORDINATION & JURY WAIVER
This Note is unsecured and subordinated to all Senior Bank Debt. The Company and Holder expressly waive any right to trial by jury in any litigation arising hereunder.`,
    precomputedAnalysis: {
      documentId: 'convertible-note-seed',
      documentTitle: 'Convertible Promissory Note & Seed SAFE Financing',
      documentType: LegalDocumentType.INCORPORATION,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.INCORPORATION,
        subtype: 'Convertible Seed Note Instrument',
        jurisdictionOrOffice: 'Delaware General Corporation Law (DGCL)',
        keyPartiesOrRoles: [
          { role: 'Borrower / Issuer', name: 'Apex Nexus Technologies, Inc.' },
          { role: 'Holder / Investor', name: 'Aurelius Angel Syndicate LP ($500,000 Principal)' }
        ],
        domainSpecificChecklist: [
          { item: 'Valuation Cap Setting ($6M)', status: 'pass', note: 'Provides upside equity participation for early investors.' },
          { item: '2.0x Change of Control Liquidity Drain', status: 'alert', note: 'Section 3 mandates a 200% cash liquidation payout if founders accept an early acquisition, draining founder proceeds.' },
          { item: '18-Month Default Acceleration', status: 'warning', note: 'Failure to close a $2M round within 18 months triggers default and debt maturity.' }
        ]
      },
      wordCount: 410,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 74,
        overallRating: 'high',
        unilateralObligationsScore: 78,
        harshIndemnitiesScore: 65,
        liquidatedDamagesScore: 80,
        autoRenewalTrapScore: 35,
        criticalFlagsCount: 3,
        summary: 'High investor leverage. Features an aggressive 2.0x change of control cash payout penalty that could wipe out founder common equity upon early sale, and an 18-month acceleration trigger.',
        documentType: LegalDocumentType.INCORPORATION,
        typeDimensions: [
          {
            key: 'liquidity_drain',
            label: 'Change of Control 2x Cash Drain',
            score: 82,
            status: 'critical',
            description: '2x cash liquidation preference upon acquisition before common stockholders receive funds.'
          }
        ]
      },
      clauses: [
        {
          id: 'note-c-1',
          sectionNumber: 'Section 3',
          title: '2.0x Change of Control Cash Multiplier',
          category: 'corporate_governance_equity',
          riskLevel: 'high',
          riskScore: 84,
          originalText: 'In the event of a merger... Holder shall be entitled to receive... Two times (2.0x) the outstanding principal balance in cash immediately prior to closing.',
          plainEnglishText: 'If you sell your startup before the note converts, the investor gets $1,000,000 in cash off the top for a $500,000 investment before founders get anything.',
          executiveSummary: 'Senior double-cash liquidation entitlement upon corporate merger or asset acquisition.',
          riskReasons: ['Consumes sale proceeds, leaving common founders with diminished returns'],
          impactOnUser: 'An acquihire or early strategic sale might pay only the investor and leave founders with nothing.',
          suggestedAction: 'Negotiate down to 1.0x cash return plus interest or conversion at the cap.',
          questionForLawyer: 'Can we cap the change-of-control payout at 1.0x or require investor to convert to equity rather than drain transaction cash?'
        }
      ],
      obligations: [
        {
          id: 'note-ob-1',
          clauseId: 'note-c-1',
          section: 'Section 1',
          title: 'Track Note Maturity Date',
          description: 'Refinance or close $2M Qualified Financing before May 1, 2027.',
          dueDateStr: 'May 1, 2027',
          penaltyWarning: 'Holder can demand immediate repayment of $500,000 plus 8% compound interest',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Convertible Promissory Note & Seed SAFE Financing',
        clientNamePlaceholder: 'Apex Nexus Technologies Founder',
        keyAmbiguities: ['Does not define whether unvested options count toward the pre-money fully diluted capitalization calculation.'],
        conflictingClauses: ['Subordination to senior debt may conflict with acceleration remedy upon failure to close $2M round.'],
        factualTimeline: [{ event: 'Note Maturity Date', triggerCondition: 'May 1, 2027', sectionRef: 'Section 1' }],
        targetedQuestions: ['1. How does the $6M valuation cap interact with subsequent SAFEs issued on post-money terms?']
      },
      analyzedAt: '2026-09-14T13:10:00Z'
    }
  },
  {
    id: 'dpa-gdpr-privacy',
    title: 'Cross-Border Data Processing Addendum (GDPR & CCPA)',
    category: 'Commercial / Privacy',
    documentType: LegalDocumentType.CONTRACT,
    subtype: 'Data Processing Addendum (DPA)',
    description: 'An international data protection addendum with 24-hour breach notification, sub-processor veto rights, and unlimited regulatory indemnification.',
    rawText: `DATA PROCESSING ADDENDUM (GDPR & CCPA COMPLIANCE)

This Data Processing Addendum ("DPA") supplements the Master Services Agreement between CloudAnalytics International B.V. ("Controller") and SecureByte Systems Inc. ("Processor").

1. SCOPE AND NATURE OF PROCESSING
Processor shall process Personal Data strictly on documented instructions from Controller, including with respect to transfers outside the European Economic Area (EEA), which shall be governed by the EU Standard Contractual Clauses (Module 2).

2. 24-HOUR SECURITY INCIDENT NOTIFICATION
Processor shall notify Controller in writing without undue delay, and in no event later than twenty-four (24) hours, after becoming aware of any confirmed or suspected Personal Data breach. The notice shall detail the nature of the breach, affected data subject categories, and mitigation steps taken.

3. SUB-PROCESSOR ENGAGEMENT & VETO
Processor shall not engage any third-party sub-processor without sixty (60) days prior written notice to Controller. Controller reserves the absolute unilateral right to object to any new sub-processor for any reason, upon which Processor must either terminate the sub-processor or allow Controller to immediately terminate the Agreement without penalty.

4. AUDIT RIGHTS & REGULATORY INDEMNITY
Upon thirty (30) days notice, Controller or an independent accredited auditor may conduct on-site physical audits of Processor's data centers. Processor shall defend and indemnify Controller against any and all administrative fines levied by European Data Protection Authorities (under GDPR Article 83 up to €20M or 4% of global turnover) resulting from Processor's non-compliance, without limitation of liability.`,
    precomputedAnalysis: {
      documentId: 'dpa-gdpr-privacy',
      documentTitle: 'Cross-Border Data Processing Addendum (GDPR & CCPA)',
      documentType: LegalDocumentType.CONTRACT,
      documentTypeMetadata: {
        detectedType: LegalDocumentType.CONTRACT,
        subtype: 'Data Processing Addendum (DPA)',
        jurisdictionOrOffice: 'EU GDPR / Irish Data Protection Commission',
        keyPartiesOrRoles: [
          { role: 'Data Controller', name: 'CloudAnalytics International B.V. (Amsterdam)' },
          { role: 'Data Processor', name: 'SecureByte Systems Inc. (San Francisco)' }
        ],
        domainSpecificChecklist: [
          { item: '24-Hour Breach Notification Deadline', status: 'alert', note: 'Exceeds GDPR 72-hour statutory window, creating extreme operational SLA pressure.' },
          { item: 'Uncapped GDPR Regulatory Fine Indemnification', status: 'alert', note: 'Section 4 requires processor to indemnify controller for GDPR Article 83 fines up to €20,000,000 without liability caps.' },
          { item: '60-Day Sub-Processor Veto Notice', status: 'warning', note: 'Restricts processor from deploying standard cloud infrastructure updates without long advance notice.' }
        ]
      },
      wordCount: 440,
      rawText: '',
      redactedText: '',
      piiRedacted: false,
      redactionMap: {},
      riskBreakdown: {
        overallScore: 82,
        overallRating: 'high',
        unilateralObligationsScore: 88,
        harshIndemnitiesScore: 94,
        liquidatedDamagesScore: 75,
        autoRenewalTrapScore: 30,
        criticalFlagsCount: 3,
        summary: 'Severe compliance risk profile. Imposes an aggressive 24-hour breach disclosure obligation and uncapped indemnification for European GDPR regulatory penalties up to €20 million.',
        documentType: LegalDocumentType.CONTRACT
      },
      clauses: [
        {
          id: 'dpa-c-1',
          sectionNumber: 'Section 4',
          title: 'Uncapped GDPR Administrative Fine Indemnity',
          category: 'liabilities_indemnities',
          riskLevel: 'high',
          riskScore: 94,
          originalText: 'Processor shall defend and indemnify Controller against any and all administrative fines levied by European Data Protection Authorities... without limitation of liability.',
          plainEnglishText: 'If European regulators fine the customer up to 20 million euros due to a data issue, your company has to pay the entire fine with no financial cap.',
          executiveSummary: 'Unlimited indemnity exposing Processor to statutory GDPR Article 83 administrative penalties.',
          riskReasons: ['Uncapped liability for statutory fines', 'Disproportionate financial catastrophe risk for SaaS vendors'],
          impactOnUser: 'Could bankrupt a mid-market technology provider in the event of an overseas regulatory investigation.',
          suggestedAction: 'Insist that DPA liabilities remain strictly subject to the overall limitation of liability and 12-month fee cap in the main MSA.',
          questionForLawyer: 'Can we cap DPA indemnification obligations to a super-cap (e.g., 2x annual contract value) and carve out uninsurable fines?'
        }
      ],
      obligations: [
        {
          id: 'dpa-ob-1',
          clauseId: 'dpa-c-1',
          section: 'Section 2',
          title: '24-Hour Breach Notification Protocol',
          description: 'Establish internal incident response alerting to notify Controller within 24 hours of suspected breach.',
          dueDateStr: '24 hours from security event',
          penaltyWarning: 'Immediate material breach of DPA and uncapped liability',
          completed: false
        }
      ],
      lawyerDossier: {
        documentTitle: 'Cross-Border Data Processing Addendum (GDPR & CCPA)',
        clientNamePlaceholder: 'SecureByte Systems Inc.',
        keyAmbiguities: ['Does not define what constitutes a "suspected" breach versus a confirmed material security incident.'],
        conflictingClauses: ['Section 4 uncapped indemnity directly conflicts with the $100k limitation of liability in the Master Services Agreement.'],
        factualTimeline: [{ event: 'Security Incident Reporting Window', triggerCondition: 'Strict 24 hours from awareness', sectionRef: 'Section 2' }],
        targetedQuestions: ['1. Are European administrative fines insurable under US errors and omissions cybersecurity insurance policies?']
      },
      analyzedAt: '2026-09-14T13:10:00Z'
    }
  }
];

export const SYNTHETIC_TEMPLATES = SAMPLE_DOCUMENTS;

export const COMPARISON_SAMPLE_PRESETS = [
  ...INDIAN_COMPARISON_PRESETS,
  {
    id: 'nda-diff',
    title: 'Standard Bilateral NDA vs. Aggressive Vendor NDA',
    docAName: 'Standard Mutual NDA (v1)',
    docBName: 'Aggressive Vendor NDA (v2 Revised)',
    textA: `1. CONFIDENTIALITY: Both parties agree to protect each other's Confidential Information with reasonable care for a period of two (2) years.
2. PERMITTED USE: Information shall only be used for evaluating the commercial partnership.
3. RETURN OF MATERIALS: Upon request, each party shall return or destroy confidential materials within thirty (30) days.
4. JURISDICTION: This Agreement is governed by the laws of California.`,
    textB: `1. UNILATERAL CONFIDENTIALITY: Recipient shall hold Discloser's information in perpetual confidence indefinitely. Discloser owes no reciprocal obligations.
2. PERMITTED USE: Discloser may use Recipient's operational metrics to train commercial machine learning models.
3. RETURN OF MATERIALS & AUDIT: Recipient must return materials within five (5) days and permit Discloser to audit Recipient's physical servers at Recipient's expense.
4. LIQUIDATED DAMAGES: Any breach by Recipient triggers liquidated damages of $50,000 per occurrence.
5. JURISDICTION & VENUE: Mandatory binding arbitration in Delaware with Recipient paying all filing fees.`
  },
  {
    id: 'patent-claims-diff',
    title: 'Patent Application Claims: Original vs. USPTO Office Action Amendment',
    docAName: 'Original Broad Claim 1 (v1)',
    docBName: 'Office Action Narrowed Claim 1 (v2 Amended)',
    textA: `CLAIM 1 (ORIGINAL AS-FILED):
A cryptographic sharding system comprising:
one or more processors configured to:
(a) ingest a raw data payload and partition said payload into a plurality of polynomial coefficients;
(b) execute means for lattice-based cryptographic permutation on said plurality of coefficients; and
(c) distribute shards across a network without exposing intermediate keys.`,
    textB: `CLAIM 1 (AMENDED RESPONSE TO 35 U.S.C. 102/103 REJECTION):
A distributed cryptographic sharding system comprising:
one or more physical hardware processors executing a module-learning-with-errors (M-LWE) matrix transform engine;
wherein said processors are configured to:
(a) partition an arbitrary byte payload into a plurality of polynomial coefficients over a ring dimension of at least 256;
(b) perform deterministic module-lattice permutation using a public seed matrix A to produce exactly n discrete cryptographic shards;
(c) distribute each shard to distinct asynchronous compute nodes governed by Byzantine fault-tolerant consensus; and
(d) reconstruct the payload only upon quorum receipt of at least k shards without central reconstruction.`
  },
  {
    id: 'bylaws-investor-diff',
    title: 'Corporate Formation: Founder Bylaws vs. VC Series Seed Term Sheet',
    docAName: 'Founders\' Standard Bylaws (v1)',
    docBName: 'Investor Series Seed Charter (v2 Revised)',
    textA: `1. AUTHORIZED CAPITAL: 10,000,000 shares of Common Stock.
2. BOARD COMPOSITION: Two (2) directors elected by a majority of Common Stock.
3. LIQUIDATION: In the event of any liquidation or merger, all assets distributed pro-rata to Common Stockholders.
4. SHARE TRANSFERS: Standard 30-day right of first refusal.`,
    textB: `1. AUTHORIZED CAPITAL: 10,000,000 Common Shares, plus 2,500,000 Series Seed Preferred Stock.
2. LIQUIDATION PREFERENCE: Series Seed Preferred receives a 1x non-participating senior liquidation preference with 8% cumulative dividend before any payment to Common.
3. BOARD COMPOSITION: Three (3) directors: One (1) common founder seat, one (1) investor representative, one (1) independent.
4. PROTECTIVE PROVISIONS: Affirmative vote of Series Seed required for any new share issuance, debt exceeding $100k, or CEO hiring.
5. DRAG-ALONG: Investor can compel sale of company if approved by Series Seed majority.`
  }
];
