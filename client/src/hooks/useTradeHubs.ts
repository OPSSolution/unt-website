import { useMemo } from 'react';
import { TRADE_HUBS, TradeHub } from '../components/ThreeBackground';
import { useHomepageSections } from './useHomepageSections';
import { useLanguage } from '../i18n/LanguageContext';

const KHMER_DIGITS: Record<string, string> = {
  '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4',
  '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9',
};

const KHMER_COUNTRY_NAMES: Record<string, string> = {
  cambodia: 'កម្ពុជា', korea: 'កូរ៉េខាងត្បូង', japan: 'ជប៉ុន', china: 'ចិន',
  vietnam: 'វៀតណាម', laos: 'ឡាវ', malaysia: 'ម៉ាឡេស៊ី',
};

function localizedNumber(value: unknown) {
  const normalized = String(value ?? '')
    .replace(/[០-៩]/g, (digit) => KHMER_DIGITS[digit] ?? digit)
    .replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeHub(hub: TradeHub, language: 'en' | 'km'): TradeHub {
  const id = String(hub.id ?? '').trim().toLowerCase();
  return {
    ...hub,
    id,
    name: hub.name || (language === 'km' ? KHMER_COUNTRY_NAMES[id] ?? '' : ''),
    lat: localizedNumber(hub.lat),
    lon: localizedNumber(hub.lon),
  };
}

export function useTradeHubs(): TradeHub[] {
  const tradeHubsSection = useHomepageSections().trade_hubs;
  const { language } = useLanguage();
  return useMemo(() => {
    const hubs = tradeHubsSection?.hubs;
    if (!Array.isArray(hubs) || hubs.length === 0) {
      return TRADE_HUBS.map((hub) => normalizeHub(
        language === 'km' ? { ...hub, name: '' } : hub,
        language,
      ));
    }
    return hubs.map((hub: TradeHub) => normalizeHub(hub, language));
  }, [language, tradeHubsSection]);
}
