import { useSharedResource } from './sharedResource';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
export interface HeroStat { id: string; value: string; label: string; sort_order: number }

async function loadStats(): Promise<HeroStat[] | null> {
  try {
    const res = await fetch(`${BASE}/api/hero/stats`);
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export function useHeroStats(): HeroStat[] {
  return useSharedResource('hero-stats', loadStats, []);
}
