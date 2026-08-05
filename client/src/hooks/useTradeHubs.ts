import { useEffect, useState } from 'react';
import { TRADE_HUBS, TradeHub } from '../components/ThreeBackground';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

// Module-level cache — fetched once for the entire app session
let cachedHubs: TradeHub[] | null = null;
let fetchPromise: Promise<void> | null = null;

function loadHubs(): Promise<void> {
  if (cachedHubs || fetchPromise) return fetchPromise ?? Promise.resolve();
  fetchPromise = fetch(`${BASE}/api/homepage/trade_hubs`)
    .then((r) => r.ok ? r.json() : null)
    .then((r) => {
      if (r?.data?.hubs?.length) {
        cachedHubs = r.data.hubs.map((h: any) => ({
          ...h,
          lat: Number(h.lat),
          lon: Number(h.lon),
        }));
      }
    })
    .catch(() => {});
  return fetchPromise;
}

export function useTradeHubs(): TradeHub[] {
  const [hubs, setHubs] = useState<TradeHub[]>(cachedHubs ?? TRADE_HUBS);

  useEffect(() => {
    if (cachedHubs) { setHubs(cachedHubs); return; }
    loadHubs().then(() => { if (cachedHubs) setHubs(cachedHubs); });
  }, []);

  return hubs;
}
