export interface TradeHub {
  id: string;
  name: string;
  flag: string;
  flagUrl: string;
  lat: number;
  lon: number;
  leadTime: string;
  categories: string;
  moq: string;
  type: 'factory' | 'warehouse' | 'port';
}

export const TRADE_HUBS: TradeHub[] = [
  { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/250px-Flag_of_Cambodia.svg.png', lat: 11.55, lon: 104.91, leadTime: '1-2 Days', categories: 'Local Distribution & GI Produce', moq: '100 Units', type: 'warehouse' },
  { id: 'korea', name: 'South Korea', flag: '🇰🇷', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png', lat: 37.56, lon: 126.97, leadTime: '5-7 Days', categories: 'K-Beauty & OEM Supplements', moq: '1,000 Units', type: 'warehouse' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', flagUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png', lat: 35.67, lon: 139.65, leadTime: '6-9 Days', categories: 'Personal Care & Health', moq: '800 Units', type: 'port' },
  { id: 'china', name: 'China', flag: '🇨🇳', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png', lat: 23.12, lon: 113.26, leadTime: '4-6 Days', categories: 'Packaging & Wholesale Goods', moq: '2,000 Units', type: 'factory' },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png', lat: 10.82, lon: 106.62, leadTime: '1-3 Days', categories: 'Food Processing & Agribusiness', moq: '300 Units', type: 'port' },
  { id: 'laos', name: 'Laos', flag: '🇱🇦', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/250px-Flag_of_Laos.svg.png', lat: 17.97, lon: 102.63, leadTime: '2-4 Days', categories: 'Agricultural & Organic Goods', moq: '500 Units', type: 'warehouse' },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/250px-Flag_of_Malaysia.svg.png', lat: 3.13, lon: 101.68, leadTime: '3-5 Days', categories: 'Halal Certified F&B & Cosmetics', moq: '600 Units', type: 'factory' },
];
