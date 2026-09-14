import { useState, useRef, useEffect } from 'react';
import { AISettings, ChatMessage, DocumentAnalysisResult } from '../../types';
import { askDocumentQuestion } from '../../services/aiService';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  Bookmark,
  RefreshCw,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

import { LegalDocumentType } from '../../types';

interface DocumentChatProps {
  currentAnalysis: DocumentAnalysisResult | null;
  settings: AISettings;
  onSelectClauseId?: (clauseId: string) => void;
  onNavigateToAnalyzer?: () => void;
}

const GENERAL_SUGGESTED_QUERIES = [
  'What are the termination notice windows and penalty traps?',
  'Does this contract contain non-compete or non-solicitation restrictions?',
  'Are the indemnification obligations mutual or strictly one-sided?',
  'What happens to intellectual property created during this engagement?',
  'Are there automatic renewal clauses that require advance cancellation?'
];

const INDIAN_SUGGESTED_QUERIES = [
  'Is the non-compete clause enforceable under Section 27 of the Indian Contract Act, 1872?',
  'What are the DPDPA 2023 compliance obligations and regulatory penalty exposures?',
  'Does this meet RERA Section 2(k) carpet area & Section 18 SBI MCLR delay compensation?',
  'Is the service bond penalty enforceable under Section 74 without proof of actual loss?',
  'What are the BNS 2023 criminal breach of trust (Sec 316) implications?'
];

export function DocumentChat({ currentAnalysis, settings, onSelectClauseId, onNavigateToAnalyzer }: DocumentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const isIndianDoc = currentAnalysis?.documentType === LegalDocumentType.INDIAN_LAW ||
    currentAnalysis?.riskBreakdown?.documentType === LegalDocumentType.INDIAN_LAW ||
    currentAnalysis?.documentTypeMetadata?.detectedType === LegalDocumentType.INDIAN_LAW ||
    /india|dpdpa|rera|indian contract|bns|bharatiya/i.test(currentAnalysis?.rawText || '') ||
    /india|dpdpa|rera|bns/i.test(currentAnalysis?.documentTitle || '');

  const suggestedQueries = isIndianDoc ? INDIAN_SUGGESTED_QUERIES : GENERAL_SUGGESTED_QUERIES;

  useEffect(() => {
    if (currentAnalysis) {
      setMessages([
        {
          id: 'welcome-1',
          role: 'assistant',
          content: `Hello! I am your ClarifyLex legal assistant. I have digested **${currentAnalysis.documentTitle}** and am ready to answer your questions strictly grounded in this document's text. Ask me about obligations, liabilities, renewal deadlines, or penalties.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: [
            { section: 'Preamble', excerpt: 'Contextual legal analysis ready' }
          ]
        }
      ]);
    } else {
      setMessages([]);
    }
  }, [currentAnalysis?.documentTitle]);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isSending || !currentAnalysis) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsSending(true);

    try {
      const assistantMessage = await askDocumentQuestion(
        textToSend,
        currentAnalysis.rawText,
        [...messages, userMessage],
        settings
      );
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Unable to reach the legal intelligence service. Please verify your network connection or configure an API key in Settings.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  if (!currentAnalysis) {
    return (
      <div id="document-chat-view" className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <MessageSquare className="w-7 h-7" />
        </div>
        <div className="max-w-md mx-auto space-y-1.5">
          <h3 className="text-base font-bold text-white">No Document Ingested for Chat</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Please analyze a legal document or select a template from the Synthetic Document Library first to begin asking grounded questions.
          </p>
        </div>
        {onNavigateToAnalyzer && (
          <div className="pt-2">
            <button
              id="btn-chat-go-to-analyzer"
              onClick={onNavigateToAnalyzer}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer"
            >
              Go to Document Ingestion
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="document-chat-view" className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[760px]">
      {/* Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              Contextual Document Assistant (RAG)
              <span className="text-[10px] bg-teal-500/10 border border-teal-500/30 text-teal-400 px-2 py-0.2 rounded-full font-mono">
                Grounded Q&amp;A
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Anchored strictly to: <span className="text-slate-200 font-medium">{currentAnalysis.documentTitle}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Section-level citations required</span>
        </div>
      </div>

      {/* Suggested Inquiries Pill Carousel */}
      <div className="bg-slate-950/50 px-4 py-2.5 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] uppercase font-bold text-slate-500 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-teal-400" /> Suggestions:
        </span>
        {suggestedQueries.map((query, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(query)}
            disabled={isSending}
            className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white whitespace-nowrap transition-colors"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl p-4 shadow-sm space-y-2 ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 pb-1 border-b border-white/10">
                  <span className="font-semibold text-xs text-slate-300">
                    {isUser ? 'You' : 'ClarifyLex Legal Assistant'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                </div>

                <div className="leading-relaxed whitespace-pre-wrap text-xs sm:text-sm">
                  {msg.content}
                </div>

                {/* Verified Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider flex items-center gap-1">
                      <Bookmark className="w-3 h-3" /> Anchored Citations:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {msg.citations.map((cite, cIdx) => (
                        <span
                          key={cIdx}
                          onClick={() => cite.clauseId && onSelectClauseId?.(cite.clauseId)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-teal-300 cursor-pointer hover:border-teal-500/50 transition-colors"
                          title={cite.excerpt}
                        >
                          <strong>{cite.section}</strong> &bull; {cite.excerpt.slice(0, 40)}...
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-3 max-w-3xl mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-950 border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
              <span>Verifying clause semantics and citing sections...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="input-chat-query"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about liabilities, termination, fees, or IP..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            id="btn-send-chat"
            disabled={isSending || !inputQuery.trim()}
            className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white disabled:text-slate-500 transition-all shadow-md shadow-teal-950/40 cursor-pointer"
            aria-label="Send Inquiry"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-slate-500 text-center mt-2">
          Responses generated strictly from uploaded document context &bull; Not formal legal counsel.
        </p>
      </div>
    </div>
  );
}
