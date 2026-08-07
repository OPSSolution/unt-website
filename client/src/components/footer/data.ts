import { PageTab } from '../../types';

export const footerNavigation: ReadonlyArray<{ label: string; tab: PageTab }> = [
  { label: 'Home', tab: 'home' },
  { label: 'About Unique Noble Trading Co., Ltd.', tab: 'about' },
  { label: 'Sourcing-as-a-Service', tab: 'services' },
  { label: 'Wholesale Catalog', tab: 'products' },
  { label: 'Sales Capacity Training', tab: 'training' },
  { label: 'Market Insights & Reports', tab: 'blog' },
  { label: 'Contact & Location', tab: 'contact' },
];

export const tradingSolutions = [
  'OEM & Private Label Manufacturing',
  'FMCG Distribution (F&B, Skincare)',
  'Customs Clearance & Brokerage',
  'Cold Chain & Warehousing',
  'Quality Control & Audit Inspection',
  'Corporate Sales Masterclasses',
] as const;

export const legalLinks = ['Privacy Policy', 'Terms of Service', 'GDCE Compliance'] as const;
