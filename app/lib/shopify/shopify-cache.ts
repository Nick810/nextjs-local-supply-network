type CachedItem<T> = {
  data: T;
  expiry: number;
};

const cache = new Map<string, CachedItem<unknown>>();

export function setCache<T>(key: string, data: T, ttl = 60): void {
  cache.set(key, { data, expiry: Date.now() + ttl * 1000 });
}

export function getCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached || Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }
  return cached.data as T;
}

export function clearCache(key?: string): void {
  if (key) cache.delete(key);
  else cache.clear();
}
