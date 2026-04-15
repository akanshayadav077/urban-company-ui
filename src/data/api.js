import { API_DELAY_MS, BOOKINGS, SERVICE_CATEGORIES } from '../constants';
import { getCachedValue, setCachedValue } from '../utils/simpleCache';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithCache(key, producer) {
  const cached = getCachedValue(key);
  if (cached) return cached;

  const freshValue = await producer();
  setCachedValue(key, freshValue);
  return freshValue;
}

export async function getServices() {
  return fetchWithCache('services', async () => {
    await delay(API_DELAY_MS);
    return SERVICE_CATEGORIES;
  });
}

export async function getBookings() {
  return fetchWithCache('bookings', async () => {
    await delay(API_DELAY_MS + 200);
    return BOOKINGS;
  });
}
