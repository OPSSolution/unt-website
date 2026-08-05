export type HomepageSection = Record<string, string>;

export interface HeroStat extends HomepageSection {
  id: string;
  value: string;
  label: string;
}

export const HOMEPAGE_TABS = [
  '1. Hero',
  '2. Pillars',
  '3. Heritage',
  '4. Products Section',
  '5. OEM Banner',
  '6. Partners',
  '7. Market Insights',
] as const;

export type HomepageTab = typeof HOMEPAGE_TABS[number];
export type SetField = (key: string) => (value: string) => void;
