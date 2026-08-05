import { useEffect, useState } from 'react';
import { PartnerLogo } from '../types';
import { PARTNERS as MOCK_PARTNERS } from '../data/mockData';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

// Last-known-good cache — used only as the initial render value.
let cached: PartnerLogo[] | null = null;

function mapRow(row: any): PartnerLogo {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    country: row.country,
    logoText: row.logo_text,
    image: row.image ?? undefined,
    description: row.description ?? undefined,
  };
}

async function loadPartners(): Promise<PartnerLogo[] | null> {
  try {
    const res = await fetch(`${BASE}/api/partners`);
    if (!res.ok) return null;
    const rows = await res.json();
    // Fall back to the demo partners while the database table is empty so the
    // public site never renders a blank partner strip.
    if (!Array.isArray(rows) || rows.length === 0) return MOCK_PARTNERS;
    return rows.map(mapRow);
  } catch {
    return MOCK_PARTNERS;
  }
}

export function usePartners(): PartnerLogo[] {
  const [partners, setPartners] = useState<PartnerLogo[]>(cached ?? MOCK_PARTNERS);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await loadPartners();
      if (!cancelled && data) {
        cached = data;
        setPartners(data);
      }
    };

    load();
    const intervalId = window.setInterval(load, REFRESH_MS);
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

  return partners;
}
