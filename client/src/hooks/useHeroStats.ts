import { useEffect, useState } from 'react';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

export interface HeroStat {
  id: string;
  value: string;
  label: string;
  sort_order: number;
}

// Last-known-good cache — used only as the initial render value so there is no
// fallback-content flash on load. Every poll does a real network request.
let cachedStats: HeroStat[] | null = null;

async function loadStats(): Promise<HeroStat[] | null> {
  try {
    const res = await fetch(`${BASE}/api/hero/stats`);
    if (!res.ok) return null;
    const data = await res.json();
    cachedStats = data;
    return data;
  } catch {
    return null;
  }
}

export function useHeroStats(): HeroStat[] {
  const [stats, setStats] = useState<HeroStat[]>(cachedStats ?? []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await loadStats();
      if (!cancelled && data) setStats(data);
    };

    load();
    const intervalId = window.setInterval(load, REFRESH_MS);

    // Refetch immediately when the tab becomes visible / window regains focus,
    // so admin edits appear without a manual page reload.
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    const onFocus = () => load();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return stats;
}
