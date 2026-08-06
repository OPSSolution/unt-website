import { useMemo } from 'react';
import { TRADE_HUBS, TradeHub } from '../components/ThreeBackground';
import { useHomepageSections } from './useHomepageSections';

export function useTradeHubs(): TradeHub[] {
  const tradeHubsSection = useHomepageSections().trade_hubs;
  return useMemo(() => {
    const hubs = tradeHubsSection?.hubs;
    if (!Array.isArray(hubs) || hubs.length === 0) return TRADE_HUBS;
    const fetchedHubs: TradeHub[] = hubs.map((hub: any) => ({
      ...hub,
      lat: Number(hub.lat),
      lon: Number(hub.lon),
    }));
    const existingIds = new Set(fetchedHubs.map((hub) => hub.id));
    return [...fetchedHubs, ...TRADE_HUBS.filter((hub) => !existingIds.has(hub.id))];
  }, [tradeHubsSection]);
}
