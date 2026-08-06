import { useMemo } from 'react';
import { TRADE_HUBS, TradeHub } from '../components/ThreeBackground';
import { useHomepageSections } from './useHomepageSections';
import { useLanguage } from '../i18n/LanguageContext';

const KHMER_DIGITS: Record<string, string> = {
  '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4',
  '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9',
};

function localizedNumber(value: unknown) {
  const normalized = String(value ?? '')
    .replace(/[០-៩]/g, (digit) => KHMER_DIGITS[digit] ?? digit)
    .replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function useTradeHubs(): TradeHub[] {
  const tradeHubsSection = useHomepageSections().trade_hubs;
  const { language } = useLanguage();
  return useMemo(() => {
    const hubs = tradeHubsSection?.hubs;
    if (!Array.isArray(hubs) || hubs.length === 0) return language === 'en' ? TRADE_HUBS : [];
    return hubs.map((hub: any) => ({
      ...hub,
      lat: localizedNumber(hub.lat),
      lon: localizedNumber(hub.lon),
    })) as TradeHub[];
  }, [language, tradeHubsSection]);
}
