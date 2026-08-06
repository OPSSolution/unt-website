import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';
import { useLanguage, type ContentLanguage } from '../i18n/LanguageContext';

export interface HeroContent {
  id?: string; badge_text?: string; headline?: string; subtitle?: string;
  cta_primary?: string; cta_secondary?: string; feature_image?: string; updated_at?: string;
}

async function loadHero(language: ContentLanguage): Promise<HeroContent | null> {
  try {
    const res = await fetch(`${API_BASE}/api/hero/content?lang=${language}`);
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export function useHeroContent(): HeroContent | null {
  const { language } = useLanguage();
  return useSharedResource<HeroContent | null>(`hero-content-${language}`, () => loadHero(language), null);
}
