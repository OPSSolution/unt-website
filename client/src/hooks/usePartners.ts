import { PartnerLogo } from '../types';
import { PARTNERS as MOCK_PARTNERS } from '../data/mockData';
import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';
import { useLanguage, type ContentLanguage } from '../i18n/LanguageContext';


function mapRow(row: any): PartnerLogo {
  return {
    id: row.id, name: row.name, category: row.category, country: row.country,
    logoText: row.logo_text, image: row.image ?? undefined,
    description: row.description ?? undefined,
  };
}

async function loadPartners(language: ContentLanguage): Promise<PartnerLogo[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/partners?lang=${language}`);
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0 ? rows.map(mapRow) : MOCK_PARTNERS;
  } catch { return MOCK_PARTNERS; }
}

export function usePartners(): PartnerLogo[] {
  const { language } = useLanguage();
  return useSharedResource(`partners-${language}`, () => loadPartners(language), MOCK_PARTNERS);
}
