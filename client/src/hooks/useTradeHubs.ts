import { useEffect, useState } from 'react';
import { TRADE_HUBS, TradeHub } from '../components/ThreeBackground';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

// Last-known-good cache — used only as the initial render value.
let cachedHubs: TradeHub[] | null = null;

const hubsAreEqual = (left: TradeHub[], right: TradeHub[]) =>
  left.length === right.length && left.every((hub, index) => {
    const other = right[index];
    return other != null
      && hub.id === other.id
      && hub.name === other.name
      && hub.flag === other.flag
      && hub.flagUrl === other.flagUrl
      && hub.lat === other.lat
      && hub.lon === other.lon
      && hub.leadTime === other.leadTime
      && hub.categories === other.categories
      && hub.moq === other.moq
      && hub.type === other.type;
  });

async function loadHubs(): Promise<TradeHub[] | null> {
  try {
    const res = await fetch(`${BASE}/api/homepage/trade_hubs`);
    if (!res.ok) return null;
    const row = await res.json();
    const hubs = row?.data?.hubs;
    if (!Array.isArray(hubs) || hubs.length === 0) return TRADE_HUBS;
    const fetchedHubs = hubs.map((h: any) => ({
      ...h,
      lat: Number(h.lat),
      lon: Number(h.lon),
    }));
    const existingIds = new Set(fetchedHubs.map((h: TradeHub) => h.id));
    const missingHubs = TRADE_HUBS.filter((h) => !existingIds.has(h.id));
    return [...fetchedHubs, ...missingHubs];
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
        // Keep the existing array when a focus/poll refresh returns the same
        // hubs. ThreeBackground uses this value to build its Three.js scene,
        // so replacing it unnecessarily would restart every animation clock.
        setHubs((current) => hubsAreEqual(current, data) ? current : data);
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
