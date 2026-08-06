import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';
import { useLanguage, type ContentLanguage } from '../i18n/LanguageContext';

export interface HeroStat { id: string; value: string; label: string; sort_order: number }

async function loadStats(language: ContentLanguage): Promise<HeroStat[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/hero/stats?lang=${language}`);
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export function useHeroStats(): HeroStat[] {
  const { language } = useLanguage();
  return useSharedResource(`hero-stats-${language}`, () => loadStats(language), []);
}
