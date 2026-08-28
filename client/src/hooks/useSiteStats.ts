import { API_BASE } from '../lib/apiBase';
import { useSharedResource } from './sharedResource';

function getVisitorId(): string {
  const key = 'unt-visitor-id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function registerSiteVisit(): void {
  const storageKey = 'site-visited';
  if (sessionStorage.getItem(storageKey)) return;
  sessionStorage.setItem(storageKey, '1');
  fetch(`${API_BASE}/api/site-stats/visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitorId: getVisitorId() }),
  }).catch(() => {});
}

async function loadTotalVisits(): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}/api/site-stats`);
    if (!res.ok) return null;
    const { totalVisits } = await res.json();
    return typeof totalVisits === 'number' ? totalVisits : null;
  } catch { return null; }
}

export function useTotalVisits(): number | null {
  return useSharedResource('site-stats-total-visits', loadTotalVisits, null, 15_000);
}
