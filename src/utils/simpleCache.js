const cache = new Map();

export function getCachedValue(key) {
  const item = cache.get(key);
  if (!item) return null;

  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.value;
}

export function setCachedValue(key, value, ttlMs = 30_000) {
  cache.set(key, {
    value,
    expiry: Date.now() + ttlMs
  });
}
