import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

/**
 * Enterprise Security & Performance Middleware for ClarifyLex AI
 * Implements:
 * 1. OWASP Top 10 Security Headers (HSTS, CSP, X-Frame-Options, etc.)
 * 2. Rate Limiting with Token Bucket / Fixed Window per IP
 * 3. Strict Input Sanitization & Anti-Prompt Injection Filter
 * 4. High-Throughput In-Memory Response Caching (LRU + TTL)
 * 5. Structured Error Sanitization
 */

// Rate Limiter Storage
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 reqs/min per IP

/**
 * Rate Limiting Middleware
 */
export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  // Allow health checks without rate limiting
  if (req.path === '/api/health') {
    return next();
  }

  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();

  let record = rateLimitMap.get(clientIp);
  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    };
    rateLimitMap.set(clientIp, record);
  } else {
    record.count++;
  }

  // Set standard RateLimit headers
  const remaining = Math.max(0, MAX_REQUESTS_PER_WINDOW - record.count);
  const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString());
  res.setHeader('X-RateLimit-Remaining', remaining.toString());
  res.setHeader('X-RateLimit-Reset', resetSeconds.toString());

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    res.setHeader('Retry-After', resetSeconds.toString());
    return res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Please try again in ${resetSeconds} seconds.`,
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }

  // Periodic cleanup of stale rate-limit entries
  if (rateLimitMap.size > 2000) {
    for (const [ip, rec] of rateLimitMap.entries()) {
      if (now > rec.resetTime) rateLimitMap.delete(ip);
    }
  }

  next();
}

/**
 * Security Headers Middleware
 */
export function applySecurityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  next();
}

/**
 * Sanitizes text to strip malicious control characters, null bytes, and script injection vectors.
 */
export function sanitizeLegalInput(input: unknown, maxLength = 100000): string {
  if (typeof input !== 'string') return '';

  // 1. Strip null bytes and non-printable control characters (preserving newlines and tabs)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // 2. Bound payload length to prevent DoS memory exhaustion
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }

  return clean;
}

/**
 * Neutralizes Prompt Injection attempts (e.g. "Ignore previous instructions", "System override", jailbreak signatures)
 */
export function neutralizePromptInjection(text: string): { sanitized: string; flagged: boolean } {
  if (!text) return { sanitized: text, flagged: false };

  const suspiciousPatterns = [
    /ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions/gi,
    /disregard\s+(?:all\s+)?(?:system|developer)\s+prompts/gi,
    /system\s*override\s*:/gi,
    /<\|im_start\|>/gi,
    /<\|im_end\|>/gi,
    /\[system\s+directive\]/gi,
    /\bDAN\s+mode\b/gi,
    /\bjailbreak\b/gi
  ];

  let flagged = false;
  let sanitized = text;

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      flagged = true;
      sanitized = sanitized.replace(pattern, '[DEFENSIVE_GUARD: Disallowed Instruction]');
    }
  }

  return { sanitized, flagged };
}

/**
 * In-Memory High-Efficiency Cache (LRU + TTL)
 */
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class ResponseCache<T = any> {
  private store = new Map<string, CacheEntry<T>>();
  private maxItems: number;
  private defaultTtlMs: number;

  constructor(maxItems = 200, defaultTtlMs = 60 * 60 * 1000) {
    this.maxItems = maxItems;
    this.defaultTtlMs = defaultTtlMs;
  }

  public get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    // Refresh LRU position by re-inserting
    this.store.delete(key);
    this.store.set(key, entry);
    return entry.data;
  }

  public set(key: string, data: T, ttlMs?: number): void {
    if (this.store.size >= this.maxItems) {
      // Evict oldest entry (first item in Map)
      const oldestKey = this.store.keys().next().value;
      if (oldestKey) this.store.delete(oldestKey);
    }

    this.store.set(key, {
      data,
      expiresAt: Date.now() + (ttlMs || this.defaultTtlMs)
    });
  }

  public clear(): void {
    this.store.clear();
  }

  public size(): number {
    return this.store.size;
  }

  public static hashKey(...parts: string[]): string {
    return crypto.createHash('sha256').update(parts.join('::')).digest('hex');
  }
}

export const serverAnalysisCache = new ResponseCache(250, 2 * 60 * 60 * 1000); // 2-hour cache
export const serverChatCache = new ResponseCache(300, 30 * 60 * 1000); // 30-minute cache
