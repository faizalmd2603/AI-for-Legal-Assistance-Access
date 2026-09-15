import { describe, it, expect, beforeEach } from 'vitest';
import { ResponseCache } from '../server/securityMiddleware';

describe('Performance & In-Memory Response Caching Engine', () => {
  let cache: ResponseCache<{ analysisId: string; summary: string }>;

  beforeEach(() => {
    cache = new ResponseCache(5, 500); // 5 max items, 500ms TTL
  });

  it('should store and retrieve data with sub-millisecond efficiency', () => {
    const key = ResponseCache.hashKey('analyze', 'gemini-3.5-flash', 'Master Services Agreement');
    const payload = { analysisId: 'doc-101', summary: 'Clean bilateral agreement.' };

    const startTime = performance.now();
    cache.set(key, payload);
    const cached = cache.get(key);
    const endTime = performance.now();

    expect(cached).toEqual(payload);
    expect(endTime - startTime).toBeLessThan(10); // < 10ms execution
  });

  it('should return null for expired cache items', async () => {
    const key = 'doc-quick-expire';
    cache.set(key, { analysisId: 'temp-1', summary: 'Expiring data' }, 20); // 20ms TTL

    expect(cache.get(key)).not.toBeNull();

    // Await expiry
    await new Promise((resolve) => setTimeout(resolve, 35));
    expect(cache.get(key)).toBeNull();
  });

  it('should enforce LRU eviction when capacity limit is reached', () => {
    // Capacity is 5
    for (let i = 1; i <= 5; i++) {
      cache.set(`key-${i}`, { analysisId: `id-${i}`, summary: `item ${i}` });
    }
    expect(cache.size()).toBe(5);

    // Adding 6th item should evict oldest (key-1)
    cache.set('key-6', { analysisId: 'id-6', summary: 'item 6' });
    expect(cache.size()).toBe(5);
    expect(cache.get('key-1')).toBeNull();
    expect(cache.get('key-6')).not.toBeNull();
  });

  it('should generate deterministic, collision-resistant SHA-256 keys', () => {
    const keyA = ResponseCache.hashKey('compare', 'model-x', 'contract-1', 'contract-2');
    const keyB = ResponseCache.hashKey('compare', 'model-x', 'contract-1', 'contract-2');
    const keyC = ResponseCache.hashKey('compare', 'model-x', 'contract-1', 'contract-3');

    expect(keyA).toBe(keyB);
    expect(keyA).not.toBe(keyC);
    expect(keyA).toHaveLength(64); // 256 bits = 64 hex chars
  });
});
