import { useEffect, useState } from 'react';
import { TRADE_HUBS, TradeHub } from '../components/ThreeBackground';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

// Last-known-good cache — used only as the initial render value.
let cachedHubs: TradeHub[] | null = null;

async function loadHubs(): Promise<TradeHub[] | null> {
  try {
    const res = await fetch(`${BASE}/api/homepage/trade_hubs`);
    if (!res.ok) return null;
    const row = await res.json();
    const hubs = row?.data?.hubs;
    if (!Array.isArray(hubs) || hubs.length === 0) return TRADE_HUBS;
    return hubs.map((h: any) => ({
      ...h,
      lat: Number(h.lat),
      lon: Number(h.lon),
    }));
  } catch {
    return TRADE_HUBS;
  }
}

export function useTradeHubs(): TradeHub[] {
  const [hubs, setHubs] = useState<TradeHub[]>(cachedHubs ?? TRADE_HUBS);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await loadHubs();
      if (!cancelled && data) {
        cachedHubs = data;
        setHubs(data);
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

  return hubs;
}
