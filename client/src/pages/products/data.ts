export const PRODUCT_CATEGORIES = [
  'All',
  'Food & Beverage',
  'Skincare & Beauty',
  'Personal Care',
  'Health Supplements',
  'Household Goods',
];

export const PRODUCT_ORIGINS = ['All', 'Cambodia', 'Thailand', 'Vietnam', 'Laos', 'Malaysia', 'China', 'South Korea', 'Japan'];

export const COUNTRY_FLAG_EMOJIS: Record<string, string> = {
  Cambodia: '🇰🇭',
  Thailand: '🇹🇭',
  'South Korea': '🇰🇷',
  Japan: '🇯🇵',
  China: '🇨🇳',
  Vietnam: '🇻🇳',
  Laos: '🇱🇦',
  Malaysia: '🇲🇾',
};

export const COUNTRY_FLAGS: Record<string, string> = {
  Cambodia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/250px-Flag_of_Cambodia.svg.png',
  Thailand: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/250px-Flag_of_Thailand.svg.png',
  'South Korea': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png',
  Japan: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png',
  China: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png',
  Vietnam: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png',
  Laos: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/250px-Flag_of_Laos.svg.png',
  Malaysia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/250px-Flag_of_Malaysia.svg.png',
};

const COUNTRY_CODE_NAMES: Record<string, string> = {
  KH: 'Cambodia', KHM: 'Cambodia',
  TH: 'Thailand', THA: 'Thailand',
  VN: 'Vietnam', VNM: 'Vietnam',
  LA: 'Laos', LAO: 'Laos',
  MY: 'Malaysia', MYS: 'Malaysia',
  CN: 'China', CHN: 'China',
  KR: 'South Korea', KOR: 'South Korea', SK: 'South Korea',
  JP: 'Japan', JPN: 'Japan',
};

export function countryFlagUrl(origin: string, emoji: string): string | undefined {
  if (COUNTRY_FLAGS[origin]) return COUNTRY_FLAGS[origin];
  const countryFromCode = COUNTRY_CODE_NAMES[emoji.trim().toUpperCase()];
  if (countryFromCode) return COUNTRY_FLAGS[countryFromCode];
  const englishOrigin = Object.keys(COUNTRY_FLAG_EMOJIS).find((country) => COUNTRY_FLAG_EMOJIS[country] === emoji);
  return englishOrigin ? COUNTRY_FLAGS[englishOrigin] : undefined;
}

export function countryNameFromFlag(flag: string): string {
  const normalizedFlag = flag.trim();
  const countryFromCode = COUNTRY_CODE_NAMES[normalizedFlag.toUpperCase()];
  if (countryFromCode) return countryFromCode;
  return Object.keys(COUNTRY_FLAG_EMOJIS).find((country) => COUNTRY_FLAG_EMOJIS[country] === normalizedFlag) ?? '';
}

