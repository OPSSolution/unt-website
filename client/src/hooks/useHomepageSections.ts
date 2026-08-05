import { useEffect, useState } from 'react';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

export type HomepageSections = Record<string, any>;

// Last-known-good cache — used only as the initial render value so there is no
// fallback-content flash on load. Every poll does a real network request.
let cachedSections: HomepageSections | null = null;

const SECTION_KEYS = [
  'pillars',
  'heritage',
  'products_section',
  'oem_banner',
  'partners_section',
  'insights_section',
  'about_page',
  'services_page',
  'training_page',
  'contact_page',
  'trade_hubs',
  'blog_page',
  'products_page',
  'navbar_footer',
  'hero_globe',
];

async function loadSections(): Promise<HomepageSections | null> {
  try {
    const rows = await Promise.all(
      SECTION_KEYS.map(async (key) => {
        const res = await fetch(`${BASE}/api/homepage/${key}`);
        if (!res.ok) return null;
        const row = await res.json();
        return { key, data: row.data ?? null };
      })
    );
    const sections: HomepageSections = {};
    rows.forEach((row) => { if (row) sections[row.key] = row.data; });
    cachedSections = sections;
    return sections;
  } catch {
    return null;
  }
}

export function useHomepageSections(): HomepageSections {
  const [sections, setSections] = useState<HomepageSections>(cachedSections ?? {});

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await loadSections();
      if (!cancelled && data) setSections(data);
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

  return sections;
}
