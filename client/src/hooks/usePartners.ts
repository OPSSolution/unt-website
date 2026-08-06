import { PartnerLogo } from '../types';
import { PARTNERS as MOCK_PARTNERS } from '../data/mockData';
import { useSharedResource } from './sharedResource';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

function mapRow(row: any): PartnerLogo {
  return {
    id: row.id, name: row.name, category: row.category, country: row.country,
    logoText: row.logo_text, image: row.image ?? undefined,
    description: row.description ?? undefined,
  };
}

async function loadPartners(): Promise<PartnerLogo[] | null> {
  try {
    const res = await fetch(`${BASE}/api/partners`);
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0 ? rows.map(mapRow) : MOCK_PARTNERS;
  } catch { return MOCK_PARTNERS; }
}

export function usePartners(): PartnerLogo[] {
  return useSharedResource('partners', loadPartners, MOCK_PARTNERS);
}
