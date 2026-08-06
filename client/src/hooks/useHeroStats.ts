import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';

export interface HeroStat { id: string; value: string; label: string; sort_order: number }

async function loadStats(): Promise<HeroStat[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/hero/stats`);
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export function useHeroStats(): HeroStat[] {
  return useSharedResource('hero-stats', loadStats, []);
}
