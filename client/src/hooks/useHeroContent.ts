import { useEffect, useState } from 'react';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

export interface HeroContent {
  id?: string;
  badge_text?: string;
  headline?: string;
  subtitle?: string;
  cta_primary?: string;
  cta_secondary?: string;
  feature_image?: string;
  updated_at?: string;
}

// Last-known-good cache — used only as the initial render value so there is no
// fallback-content flash on load. Every poll does a real network request.
let cachedHero: HeroContent | null = null;

async function loadHero(): Promise<HeroContent | null> {
  try {
    const res = await fetch(`${BASE}/api/hero/content`);
    if (!res.ok) return null;
    const data = await res.json();
    cachedHero = data;
    return data;
  } catch {
    return null;
  }
}

export function useHeroContent(): HeroContent | null {
  const [hero, setHero] = useState<HeroContent | null>(cachedHero);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await loadHero();
      if (!cancelled && data) setHero(data);
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

  return hero;
}
