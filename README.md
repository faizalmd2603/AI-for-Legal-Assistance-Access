# ClarifyLex AI — Legal Document Comprehension & Risk Intelligence Platform

[![Live Application](https://img.shields.io/badge/Live_App-Preview_Ready-0ea5e9?style=for-the-badge&logo=google-cloud&logoColor=white)](https://ais-pre-rjgjvvxwx2xtxf3b6bn3cy-487136188765.asia-east1.run.app)
[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel_Ready-black?style=for-the-badge&logo=vercel&logoColor=white)](https://clarifylex-ai.vercel.app)
[![Gemini 2.5 / 3.5](https://img.shields.io/badge/Powered_by-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=for-the-badge)](LICENSE)

> **ClarifyLex AI** is an AI-powered legal document comprehension, statutory risk intelligence, and contract negotiation co-pilot. It decodes complex, opaque legal agreements into plain language, benchmarks clauses against statutory frameworks and judicial precedents, highlights asymmetric liabilities, and equips non-lawyers with structured consultation dossiers for retained legal counsel.

---

## 🌐 Live Access & Testing Links

| Environment | Access Link | Description |
| :--- | :--- | :--- |
| 🚀 **Live Production App** | [**Launch ClarifyLex AI (Cloud Run)**](https://ais-pre-rjgjvvxwx2xtxf3b6bn3cy-487136188765.asia-east1.run.app) | Fully functional, cloud-hosted production instance with server-side Gemini AI processing. |
| ⚡ **Vercel Deployment** | [**ClarifyLex on Vercel**](https://clarifylex-ai.vercel.app) | Vercel-optimized client & serverless deployment target. *(See [Vercel Setup](#-deploy-to-vercel) below to launch your own)* |
| 🛠️ **Dev Sandbox** | [**Development Sandbox**](https://ais-dev-rjgjvvxwx2xtxf3b6bn3cy-487136188765.asia-east1.run.app) | Live hot-reloading development preview environment. |

*Zero-setup testing: You do not need an API key to evaluate the application. ClarifyLex AI includes an extensive library of precomputed synthetic legal documents for immediate, zero-latency testing.*

---

## 📌 Brief Overview

Every day, individuals, freelance developers, startup founders, and small businesses sign dense legal agreements—employment bonds, non-disclosure agreements, data protection addenda, commercial leases, and software licenses—without understanding their hidden legal risks. Traditional legal counsel is prohibitively expensive, while generic consumer AI chatbots frequently hallucinate legal doctrines or fail to recognize statutory exclusions.

**ClarifyLex AI** bridges this critical access-to-justice gap:
1. **Ingests & Pre-Screens**: Sanitizes documents locally using client-side pre-flight PII redaction to protect confidential client data.
2. **Evaluates & Quantifies**: Calculates a composite 5-vector risk score (unilateral covenants, uncapped indemnities, liquidated damages penalties, renewal traps, statutory enforceability).
3. **Translates & Educates**: Provides clause-by-clause plain English explanations along with vernacular translations in **Hindi (हिन्दी)** and **Tamil (தமிழ்)**.
4. **Validates Against Real Law**: Tests covenants against governing statutes (such as Section 27 of the Indian Contract Act, DPDPA 2023, RERA 2016, and BNS 2023) and landmark judicial rulings.
5. **Arms the User**: Generates side-by-side contract diff comparisons, interactive citation-grounded RAG chat, and an **Action Pack Dossier** for consultation with real attorneys.

---

## 🌟 Key Features

### 1. 🔍 Comprehensive Document Risk & Clause Analyzer
- **Multi-Vector Risk Breakdown**: Real-time evaluation across 5 critical dimensions:
  - Unilateral & Asymmetric Obligations
  - Harsh Indemnities & Uncapped Liabilities
  - Liquidated Damages vs. Unenforceable Penalties
  - Auto-Renewal Traps & Inflexible Termination
  - Statutory Non-Compliance & Void Provisions
- **Clause-by-Clause Forensic Breakdown**:
  - **Plain-English Translation**: Eliminates Latin jargon and legalese.
  - **Executive Summary**: One-sentence core takeaway for business stakeholders.
  - **Statutory Impact**: Highlights whether a clause is void *ab initio* or unconscionable.
  - **Actionable Countermeasure**: Exact redline drafting guidance to propose during negotiation.
  - **Targeted Lawyer Inquiries**: Specific questions to ask an attorney before signing.
- **Multilingual Vernacular Support**:
  - Explanations available in **English**, **Hindi (हिन्दी)**, and **Tamil (தமிழ்)**, lowering barriers for non-English speakers.

### 2. ⚖️ Side-by-Side Contract Comparator (Semantic Diff Engine)
- Compare standard template contracts against aggressive counter-party counter-proposals.
- Detects subtle covenant alterations, added unilateral provisions, and deleted statutory protections.
- Automatically calculates a **Risk Shift Score** and provides a bulleted breakdown of:
  - Statutory rights surrendered by you.
  - New liabilities or warranties imposed on you.
  - Procedural shifts in arbitral seats, venues, and governing jurisdictions.

### 3. 💬 Grounded AI Legal Chat (RAG with Section Citations)
- Context-aware chat anchored strictly to the ingested document text.
- Every response includes direct section citations (e.g., `[Section 2 - Post-Termination Non-Compete]`).
- Prohibits hallucinated non-legal filler; provides doctrinal statutory grounding, enforceability assessments, and redline replacement phrasing.

### 4. 📋 Executive Briefing & Lawyer Dossier (Action Pack)
- Generates an executive briefing printable or exportable as a structured legal brief.
- Automatically identifies:
  - **Key Ambiguities**: Vague clauses lacking materiality thresholds.
  - **Conflicting Covenants**: Internally inconsistent clauses or non-arbitrable disputes.
  - **Factual Timeline**: Ordered milestone triggers and statutory notice deadlines.
  - **Structured Questions for Retained Counsel**: Specific, high-leverage questions to optimize attorney consultation time and save legal fees.

### 5. 🛡️ Client-Side Zero-PII Pre-Flight Redactor
- Protects confidential personal, commercial, and financial information **before** it ever leaves the user's browser.
- Automatically detects and replaces with deterministic tokens:
  - Names, Emails, Phone Numbers
  - Indian Aadhaar Numbers, PAN Card Numbers
  - US Social Security Numbers (SSN), Bank Account / IBAN Numbers
  - Dates and Physical Street Addresses
- Dedicated **PII Inspector Modal** allows users to review the sanitized text alongside the secure redaction map.

### 6. 📚 Curated Synthetic Legal Document Library
Pre-loaded with realistic, production-grade legal instruments across multiple jurisdictions:
- **DPDPA 2023 Statutory Addendum**: Section 6 multilingual consent notices, Section 12 Data Principal statutory rights, 72-hour DPBI breach reporting, and ₹250 Crore penalty indemnities.
- **Indian IT Employment & Service Bond**: 24-month non-compete (void under Sec 27 ICA 1872 per *Percept D'Mark v. Zaheer Khan*), ₹5,00,000 training bond penalty (Sec 74 ICA), and criminal breach of trust covenants (Sec 316 BNS 2023).
- **RERA Real Estate Allotment Agreement**: Section 2(k) carpet area pricing, 70% escrow compliance, SBI MCLR + 2% delayed possession interest, and 5-year structural defect warranty under Section 14(3).
- **Indian Patent Specification (2024 Amendment Rules)**: Hardware-anchored identity claims overcoming Section 3(k) computer programme per se bars per *Ferid Allani v. Union of India*, and Form 27 triennial commercial working statements.
- **Indian Testamentary Will & Estate Disposition**: Coparcenary ancestral property vs self-acquired estate under Hindu Succession Act (*Vineeta Sharma v. Rakesh Sharma*), Section 63 two-witness attestation.
- **Indian Shareholders' Agreement (Companies Act 2013)**: ROFR, Tag-Along, Drag-Along, and Articles of Association entrenchment (*V.B. Rangaraj*).
- **Standard SaaS Terms & Mutual Non-Disclosure Agreements (NDA)**: Unilateral IP assignments, automatic renewals, and standard indemnities.

---

## 💎 Uniqueness: Why ClarifyLex AI Stands Out

| Dimension | Generic LLMs / Chatbots | Standard Contract SaaS | ClarifyLex AI |
| :--- | :--- | :--- | :--- |
| **Statutory Grounding** | Vague, generic summarization; prone to hallucinated doctrines. | Merely searches keywords or flags standard clauses. | **Strictly grounds analysis in governing statutory acts** (ICA 1872, DPDPA 2023, RERA 2016, BNS 2023, Companies Act 2013) and landmark case law. |
| **Privacy & Security** | Raw text sent directly to third-party cloud APIs. | Requires cloud account and stores unencrypted documents. | **Client-side zero-PII sanitization** masks personal and financial identifiers *before* network transmission. |
| **Vernacular Accessibility** | English-only or low-quality automated translations. | English-only enterprise focus. | **Trilingual vernacular explanations** in English, Hindi (हिन्दी), and Tamil (தமிழ்). |
| **Actionable Output** | Walls of conversational text without structure. | Requires expensive legal specialist subscription. | **Automated Lawyer Dossier** with factual timelines, conflicting covenants, and redline clauses ready for retained counsel. |
| **Zero-Setup Evaluation** | Requires API keys or immediate payment. | Requires corporate email and sales demo booking. | **Instant synthetic library** with precomputed forensic analyses for immediate testing. |

---

## ✅ Challenge & Hackathon Guidelines Adherence

ClarifyLex AI was engineered from the ground up to comply with best practices for AI application design:

- [x] **Server-Side API Security**: Uses an Express + Vite full-stack architecture (`server.ts`). Secret API keys (`GEMINI_API_KEY`, `GROQ_API_KEY`) are kept exclusively on the server and are never exposed to the client browser.
- [x] **Modern Google GenAI SDK**: Implements the official `@google/genai` TypeScript SDK with structured JSON schemas (`responseSchema`) for deterministic, type-safe AI outputs.
- [x] **Zero Mock Fallback Failure**: Includes built-in precomputed fallback datasets across all 6 synthetic document categories, ensuring the app remains 100% interactive and demonstrable even without network connectivity or API quotas.
- [x] **Mandatory Ethical Disclaimers**: Features a persistent banner and a first-use interactive consent modal clearly stating that ClarifyLex AI is an educational tool, not formal legal counsel, and does not establish an attorney-client relationship.
- [x] **Anti-Slop Clean Design**: Built with clean, accessible styling following strict typographic hierarchies, contrast ratios (WCAG AA), mathematical container paddings, and smooth transition animations (`motion`).
- [x] **Responsive & Accessible**: Fully optimized for desktop, tablet, and mobile viewing with accessible button targets (>= 44px) and keyboard navigable workflows.

---

## 🏗️ Architecture & Tech Stack

```
clarifylex-ai/
├── server.ts                    # Express backend: Gemini API proxy, comparator, chat RAG
├── src/
│   ├── main.tsx                 # React DOM root
│   ├── App.tsx                  # Master application controller & tab navigator
│   ├── types.ts                 # Shared TypeScript interfaces, types & enums
│   ├── components/
│   │   ├── analyzer/            # Document risk & clause-by-clause analyzer UI
│   │   ├── comparator/          # Side-by-side contract diff comparison engine
│   │   ├── chat/                # Contextual grounded legal chat assistant (RAG)
│   │   ├── briefing/            # Action Pack & Lawyer Dossier briefing generator
│   │   └── layout/              # Navbar, Disclaimer banners, Settings & PII Modals
│   ├── data/
│   │   ├── sampleDocuments.ts       # Standard commercial contracts & NDAs
│   │   └── indianSampleDocuments.ts # Indian statutory synthetic document library
│   ├── services/
│   │   ├── aiService.ts         # Dual provider orchestrator (Server Gemini / Groq / Fallback)
│   │   ├── piiRedactor.ts       # Client-side regex PII masking & token mapping
│   │   └── legalEvaluator.ts    # Client-side heuristic legal risk scoring
│   └── utils/                   # Formatting, export, and utility helpers
├── package.json                 # Dependencies & scripts (React 19, Tailwind v4, Vite)
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── metadata.json                # AI Studio application metadata
└── .env.example                 # Template for environment variables
```

### Technologies Used
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion (Framer Motion).
- **Backend**: Express, Node.js, esbuild, `@google/genai` TypeScript SDK.
- **Diff Engine**: `diff` library for lexical token diffing + Gemini for semantic covenant shift scoring.
- **Privacy Engine**: Client-side regex-driven PII identification and deterministic token replacement.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- *(Optional)* A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/clarifylex-ai.git
cd clarifylex-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env` and add your Gemini API key:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```
*(Note: ClarifyLex AI will still function in offline demo mode with precomputed analyses if no API key is supplied!)*

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## ☁️ Deploy to Vercel

ClarifyLex AI is fully configured for turnkey Vercel deployment with hybrid architecture support (Serverless API + Direct Client Fallback):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/clarifylex-ai&env=GEMINI_API_KEY)

### Two Ways to Configure Gemini on Vercel:

#### Option A: Serverless Environment Variable (Recommended)
1. Fork or push this repository to GitHub.
2. In your [Vercel Dashboard](https://vercel.com/), go to **Project Settings → Environment Variables**.
3. Add:
   - `GEMINI_API_KEY`: Your Google AI Studio API key (`AIzaSy...`).
4. Re-deploy. The included `vercel.json` and `/api/index.ts` will route analysis requests to the serverless backend.

#### Option B: Direct Client-Side Key / Zero-Configuration
- If deployed without server environment variables, ClarifyLex AI automatically engages its **Direct Client-Side Gemini Engine**:
  - Users can enter their Gemini API key directly into the UI (in the **Settings Modal** or in the **In-App API Key Banner**).
  - The key is saved locally in browser `localStorage` and executes direct multimodal PDF OCR and statutory risk analysis via Google Gemini REST endpoints.
  - Or users can set `VITE_GEMINI_API_KEY` in Vercel to pre-configure it for all users without serverless backend costs.

For single-command CLI deployment:
```bash
npm install -g vercel
vercel
```

---

## ⚖️ Ethical & Legal Disclaimer

> **IMPORTANT NOTICE**: ClarifyLex AI is an AI-powered educational and document comprehension tool. It is designed to assist users in understanding complex contractual terminology, identifying potential ambiguities, and preparing for informed discussions with qualified legal professionals.
> 
> **ClarifyLex AI does NOT provide formal legal advice, legal representation, or statutory opinions, and its outputs do NOT create an attorney-client relationship.** Legal agreements involve nuanced jurisdiction-specific rules and facts. Always consult a licensed advocate or attorney in your jurisdiction before executing binding legal agreements or waiving legal rights.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute this codebase for educational and commercial projects.
