import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Enable CORS for Vercel and all preview deployments
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-gemini-key, x-groq-key');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Helper to get or instantiate GoogleGenAI
function getGeminiClient(customKey?: string): GoogleGenAI | null {
  const key = customKey || process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// 1. Health & Config endpoint
app.get('/api/config', (req: Request, res: Response) => {
  res.json({
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasGroqKey: Boolean(process.env.GROQ_API_KEY),
    serverEnv: 'production-ready',
    supportedModels: ['gemini-3.1-pro-preview', 'gemini-3.5-flash', 'gemini-3.1-flash-lite']
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Document Risk & Clause Analysis
app.post('/api/analyze', async (req: Request, res: Response) => {
  const customKey = req.headers['x-gemini-key'] as string | undefined;
  const { text, title, model, pdfBase64 } = req.body;

  if ((!text || typeof text !== 'string') && !pdfBase64) {
    return res.status(400).json({ error: 'Valid text payload or pdfBase64 is required.' });
  }

  const ai = getGeminiClient(customKey);
  if (!ai) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on server and no custom key provided. Using fallback.'
    });
  }

  try {
    const selectedModel = model || 'gemini-2.5-flash';

    const systemInstruction = `You are ClarifyLex AI, an elite legal intelligence and statutory analysis engine.
You analyze legal documents with the jurisprudential rigor, analytical precision, and statutory grounding of a senior appellate legal scholar and corporate counsel.
Border all responses strictly within established legal terms, contractual doctrines, and governing statutory acts.

Document Categories & Statutory Frameworks:
1. Indian Statutory & Commercial Instruments (Amended Acts & Judicial Precedents):
   - Digital Personal Data Protection Act, 2023 (DPDPA 2023): Isolate Data Fiduciary obligations (Sec 8), Consent Notices (Sec 6), Data Principal statutory rights of correction/erasure/grievance (Sec 12), Significant Data Fiduciary mandates, 72-hour DPBI breach reporting, and statutory penalties up to ₹250 Crores under Schedule 1.
   - Indian Contract Act, 1872: Section 27 (Agreements in restraint of trade are VOID ab initio; post-termination non-competes are strictly unenforceable in India per Supreme Court in Percept D'Mark v. Zaheer Khan and Niranjan Shankar Golikari), Section 28 (Restraint of legal proceedings), Sections 73 & 74 (Liquidated damages vs penalty; reasonable compensation rule per Kailash Nath Associates v. DDA).
   - Bharatiya Nyaya Sanhita, 2023 (BNS 2023) & Bharatiya Sakshya Adhiniyam, 2023 (BSA 2023): Isolate criminal breach of trust (Sec 316 BNS) exposures and electronic record admissibility/certificate requirements (Sec 63 BSA replacing Sec 65B Indian Evidence Act).
   - Real Estate (Regulation and Development) Act, 2016 (RERA): Mandatory Section 2(k) carpet area enforcement, Section 4(2)(l)(D) 70% escrow maintenance, Section 14(3) 5-year structural defect liability, and Section 18 mandatory delay interest pegged at SBI Highest MCLR + 2% per annum.
   - Arbitration and Conciliation Act, 1996 (as amended): Seat vs Venue distinction (BALCO doctrine), Section 9 interim relief, Section 34 challenge thresholds, and Supreme Court 7-Judge Constitution Bench doctrine on stamping of arbitration agreements.
   - Patents Act, 1970 & Patents (Amendment) Rules, 2024: Section 3(k) bar on software/algorithms per se (requiring demonstrated technical effect/hardware interface per Ferid Allani v. Union of India), Section 3(d) therapeutic efficacy standards, and Form 27 triennial commercial working requirements.
   - Companies Act, 2013: Share transfer restrictions enforceability (VB Rangaraj doctrine requiring entrenchment in Articles of Association), Section 188 related party transactions, and board governance resolutions.
   - Indian Succession Act, 1925 & Hindu Succession Act, 1956 (amended 2005): Coparcenary vs self-acquired property under Vineeta Sharma v. Rakesh Sharma, Section 63 two-witness attestation mandate, and Section 213 probate requirement in presidency towns (Mumbai, Kolkata, Chennai).

2. International Commercial Contracts & General Agreements:
   - Unilateral indemnity obligations, uncapped direct/consequential damages, liquidated damages reasonableness, auto-renewal traps, unilateral termination covenants, and choice of law / dispute escalation clauses.

3. Patent Specifications & Applications:
   - Independent Claim scope, dependent claim limitations, 35 U.S.C. 112 / Section 10(4) enablement and definiteness, prior art vulnerability, inventor assignment sweeps, and statutory maintenance clocks.

4. Wills & Testamentary Instruments:
   - Testamentary capacity recitals, specific devises vs residuary disposition, executor fiduciary immunities, bond waivers, and in terrorem (no-contest) penalty clauses.

5. Corporate Formation & Governance:
   - Blank-check preferred stock, drag-along / tag-along forced liquidation, founder vesting acceleration, 50/50 deadlock remedies, and director exculpation / indemnification.

Analytical Standards:
- Ground every assessment in established legal terms: doctrine of unconscionability, void ab initio, contra proferentem, force majeure, quantum meruit, statutory preemption, severability, and estoppel.
- For EVERY clause provide:
  1. "plainEnglishText": Clear, jargon-free explanation for business executives or citizens without losing statutory accuracy.
  2. "executiveSummary": Concise 1-2 sentence commercial risk/statutory assessment.
  3. "originalText": Exact verbatim excerpt from the document.
- Provide vernacular translations in Hindi (hi), Spanish (es), and Tamil (ta).
- Flag strict statutory deadlines, notice periods, or compliance triggers.
- Formulate a tailored Lawyer Briefing Dossier with tactical, legally bounded questions.`;

    const contents: any[] = [];
    if (pdfBase64 && typeof pdfBase64 === 'string') {
      contents.push({
        inlineData: {
          mimeType: 'application/pdf',
          data: pdfBase64
        }
      });
      contents.push({
        text: `Document Title: ${title || 'Legal Document'}\n\nTask: Visually read this legal PDF, OCR all pages, transcribe all text, and perform full clause-by-clause statutory analysis.`
      });
    } else {
      contents.push({
        text: `Document Title: ${title || 'Legal Document'}\n\nDocument Text:\n${(text || '').slice(0, 30000)}`
      });
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0,
        seed: 42,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            documentTitle: { type: Type.STRING },
            extractedDocumentText: { type: Type.STRING, description: 'Full verbatim transcription of the document text' },
            documentType: { type: Type.STRING, description: "One of: 'contract', 'patent', 'will', 'incorporation', 'regulatory', 'other'" },
            documentTypeMetadata: {
              type: Type.OBJECT,
              properties: {
                detectedType: { type: Type.STRING },
                subtype: { type: Type.STRING },
                jurisdictionOrOffice: { type: Type.STRING },
                keyPartiesOrRoles: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      role: { type: Type.STRING },
                      name: { type: Type.STRING }
                    },
                    required: ['role', 'name']
                  }
                },
                domainSpecificChecklist: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      item: { type: Type.STRING },
                      status: { type: Type.STRING },
                      note: { type: Type.STRING }
                    },
                    required: ['item', 'status', 'note']
                  }
                }
              },
              required: ['detectedType', 'subtype', 'keyPartiesOrRoles', 'domainSpecificChecklist']
            },
            riskBreakdown: {
              type: Type.OBJECT,
              properties: {
                overallScore: { type: Type.NUMBER },
                overallRating: { type: Type.STRING },
                unilateralObligationsScore: { type: Type.NUMBER },
                harshIndemnitiesScore: { type: Type.NUMBER },
                liquidatedDamagesScore: { type: Type.NUMBER },
                autoRenewalTrapScore: { type: Type.NUMBER },
                criticalFlagsCount: { type: Type.NUMBER },
                summary: { type: Type.STRING },
                documentType: { type: Type.STRING },
                typeDimensions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      key: { type: Type.STRING },
                      label: { type: Type.STRING },
                      score: { type: Type.NUMBER },
                      status: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ['key', 'label', 'score', 'status', 'description']
                  }
                }
              },
              required: ['overallScore', 'overallRating', 'summary']
            },
            clauses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  sectionNumber: { type: Type.STRING },
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  domainTag: { type: Type.STRING },
                  riskLevel: { type: Type.STRING },
                  riskScore: { type: Type.NUMBER },
                  originalText: { type: Type.STRING },
                  plainEnglishText: { type: Type.STRING },
                  executiveSummary: { type: Type.STRING },
                  riskReasons: { type: Type.ARRAY, items: { type: Type.STRING } },
                  impactOnUser: { type: Type.STRING },
                  suggestedAction: { type: Type.STRING },
                  questionForLawyer: { type: Type.STRING },
                  deadlinesOrNotices: { type: Type.STRING }
                },
                required: ['id', 'sectionNumber', 'title', 'category', 'riskLevel', 'riskScore', 'originalText', 'plainEnglishText', 'executiveSummary']
              }
            },
            obligations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  clauseId: { type: Type.STRING },
                  section: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  dueDateStr: { type: Type.STRING },
                  noticeDays: { type: Type.NUMBER },
                  penaltyWarning: { type: Type.STRING },
                  completed: { type: Type.BOOLEAN }
                },
                required: ['id', 'section', 'title', 'description', 'completed']
              }
            },
            lawyerDossier: {
              type: Type.OBJECT,
              properties: {
                documentTitle: { type: Type.STRING },
                clientNamePlaceholder: { type: Type.STRING },
                keyAmbiguities: { type: Type.ARRAY, items: { type: Type.STRING } },
                conflictingClauses: { type: Type.ARRAY, items: { type: Type.STRING } },
                factualTimeline: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      event: { type: Type.STRING },
                      triggerCondition: { type: Type.STRING },
                      sectionRef: { type: Type.STRING }
                    },
                    required: ['event', 'triggerCondition', 'sectionRef']
                  }
                },
                targetedQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['documentTitle', 'keyAmbiguities', 'conflictingClauses', 'targetedQuestions']
            }
          },
          required: ['documentTitle', 'riskBreakdown', 'clauses', 'obligations', 'lawyerDossier']
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error('Empty response from Gemini model');
    }

    const parsed = JSON.parse(outputText);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini /api/analyze error:', error);
    return res.status(500).json({
      error: 'Failed to analyze legal document with AI: ' + (error?.message || String(error))
    });
  }
});

// 3. Contract Comparator
app.post('/api/compare', async (req: Request, res: Response) => {
  const customKey = req.headers['x-gemini-key'] as string | undefined;
  const { textA, textB, nameA, nameB, model } = req.body;

  const ai = getGeminiClient(customKey);
  if (!ai) {
    return res.status(503).json({ error: 'AI key not available' });
  }

  try {
    const selectedModel = model || 'gemini-3.5-flash';

    const systemInstruction = `You are ClarifyLex Comparator, an expert legal contract diff and statutory risk analyst.
Compare Document A and Document B with strict legal rigor.
Analyze added, omitted, and amended covenants.
Quantify and evaluate:
1. Statutory rights surrendered or secured (including statutory protections under Indian Contract Act 1872, DPDPA 2023, RERA 2016, Companies Act 2013, or UCC).
2. Shifts in liability exposure (indemnity expansions, liability caps, liquidated damages vs penalty thresholds).
3. Procedural and dispute escalation changes (arbitral seat vs venue, governing law, interim relief waivers).
Provide precise legal commentary for each modified clause.`;

    const prompt = `Compare the following two legal texts:
=== DOCUMENT A (${nameA || 'Original'}) ===
${textA.slice(0, 15000)}

=== DOCUMENT B (${nameB || 'Revised'}) ===
${textB.slice(0, 15000)}`;

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0,
        seed: 42,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            docAName: { type: Type.STRING },
            docBName: { type: Type.STRING },
            summaryOfKeyChanges: { type: Type.STRING },
            rightsSurrenderedSummary: { type: Type.ARRAY, items: { type: Type.STRING } },
            rightsGainedSummary: { type: Type.ARRAY, items: { type: Type.STRING } },
            riskShiftScore: { type: Type.NUMBER },
            changes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  sectionA: { type: Type.STRING },
                  sectionB: { type: Type.STRING },
                  title: { type: Type.STRING },
                  contentA: { type: Type.STRING },
                  contentB: { type: Type.STRING },
                  rightsCommentary: { type: Type.STRING }
                },
                required: ['type', 'title', 'rightsCommentary']
              }
            }
          },
          required: ['docAName', 'docBName', 'summaryOfKeyChanges', 'rightsSurrenderedSummary', 'rightsGainedSummary', 'riskShiftScore', 'changes']
        }
      }
    });

    const outputText = response.text;
    if (!outputText) throw new Error('No output from comparator model');
    return res.json(JSON.parse(outputText));
  } catch (err: any) {
    console.error('Gemini compare error:', err);
    return res.status(500).json({ error: err?.message || 'Compare failed' });
  }
});

// 4. Grounded Contextual Document Chat (RAG)
app.post('/api/chat', async (req: Request, res: Response) => {
  const customKey = req.headers['x-gemini-key'] as string | undefined;
  const { question, documentText, history, model } = req.body;

  const ai = getGeminiClient(customKey);
  if (!ai) {
    return res.status(503).json({ error: 'AI key not available' });
  }

  try {
    const selectedModel = model || 'gemini-3.5-flash';

    const systemInstruction = `You are ClarifyLex AI Legal Intelligence Assistant, a specialized legal LLM engine.
You answer questions with analytical rigor, authoritative precision, and strict doctrinal grounding.
Border all responses strictly within established legal terms and statutory jurisprudence (including Indian Acts and international contract law).

Core Operational Rules:
1. Grounding & Citations: Base every answer strictly on the provided document text. Always cite the exact section number, clause title, or paragraph (e.g. "[Section 4.1 - Non-Compete]", "[Clause 12.3 - Limitation of Liability]").
2. Legal Analytical Structure:
   - Statutory Anchor & Legal Characterization: Identify the relevant legal doctrine and applicable statutory act (e.g., Section 27 Indian Contract Act 1872 for restraint of trade, DPDPA 2023 for data principal rights, RERA 2016 for carpet area/delay interest, or 35 U.S.C. 112 for patent claim definiteness).
   - Textual Construction: Quote and dissect the specific contractual covenant.
   - Enforceability & Liability Assessment: Objectively evaluate whether the covenant is legally binding, void ab initio, unconscionable, or poses asymmetric financial/penal risk.
   - Tactical Countermeasure / Drafting Redline: Provide exact contractual redline suggestions or key inquiries for retained counsel.
3. Absence of Provision: If a term, right, or remedy is omitted from the agreement, state explicitly: "This document does not contain any covenant regarding [topic], meaning statutory default rules apply."
4. Tone & Boundaries: Authoritative, exact, and bounded strictly within legal and statutory terms. No conversational filler or generic disclaimers.`;

    const contents = [
      `DOCUMENT CONTEXT:\n${documentText.slice(0, 20000)}`,
      ...(Array.isArray(history) ? history.map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`) : []),
      `User Question: ${question}`
    ].join('\n\n');

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0,
        seed: 42,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING },
            citations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  clauseId: { type: Type.STRING },
                  excerpt: { type: Type.STRING }
                },
                required: ['section', 'excerpt']
              }
            }
          },
          required: ['content', 'citations']
        }
      }
    });

    const outputText = response.text;
    if (!outputText) throw new Error('No output from chat model');
    return res.json(JSON.parse(outputText));
  } catch (err: any) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({ error: err?.message || 'Chat query failed' });
  }
});

// Vite Middleware & SPA Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ClarifyLex AI Server running on http://0.0.0.0:${PORT}`);
  });
}

export default app;

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Server startup error:', err);
  });
}
