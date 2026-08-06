import { useSharedResource } from './sharedResource';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
export interface HeroContent {
  id?: string; badge_text?: string; headline?: string; subtitle?: string;
  cta_primary?: string; cta_secondary?: string; feature_image?: string; updated_at?: string;
}

async function loadHero(): Promise<HeroContent | null> {
  try {
    const res = await fetch(`${BASE}/api/hero/content`);
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export function useHeroContent(): HeroContent | null {
  return useSharedResource<HeroContent | null>('hero-content', loadHero, null);
}
