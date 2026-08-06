import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';

export type HomepageSections = Record<string, any>;
const EMPTY_SECTIONS: HomepageSections = {};

const SECTION_KEYS = [
  'pillars', 'heritage', 'products_section', 'oem_banner', 'partners_section',
  'insights_section', 'about_page', 'services_page', 'training_page',
  'contact_page', 'trade_hubs', 'blog_page', 'products_page', 'navbar_footer', 'hero_globe',
];

async function loadSections(): Promise<HomepageSections | null> {
  try {
    const res = await fetch(`${API_BASE}/api/homepage`);
    if (!res.ok) return null;
    const rows = await res.json();
    if (!Array.isArray(rows)) return null;
    const sections: HomepageSections = {};
    SECTION_KEYS.forEach((key) => { sections[key] = null; });
    rows.forEach((row) => {
      if (row?.section_key && SECTION_KEYS.includes(row.section_key)) {
        sections[row.section_key] = row.data ?? null;
      }
    });
    return sections;
  } catch { return null; }
}

export function useHomepageSections(): HomepageSections {
  return useSharedResource('homepage-sections', loadSections, EMPTY_SECTIONS);
}
