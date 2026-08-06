import React from 'react';
import { FlagJapan, FlagKorea, FlagMalaysia, FlagVietnam, FlagLaos, FlagChina } from './FlagIcons';

export interface CountryData {
  name: string;
  code: string;
  FlagComponent: React.FC<{ className?: string }>;
  niche: string;
  seaTransit: string;
  airTransit: string;
  standards: string[];
  topProducts: string[];
  desc: string;
}

export const countryDetails: Record<string, CountryData> = {
  'Japan': {
    name: 'Japan',
    code: 'JP',
    FlagComponent: FlagJapan,
    niche: 'High-End Skincare, Collagen & Functional Beverages',
    seaTransit: '12 – 14 Days',
    airTransit: '3 – 5 Days',
    standards: ['PMDA Approved', 'ISO 22000', 'GMP Certified'],
    topProducts: ['Anti-aging Collagen Serums', 'Matcha Powder & Functional Teas', 'Placenta & NMN Supplements'],
    desc: 'Direct factory partnerships in Tokyo, Osaka, and Fukuoka. Japanese manufacturing guarantees unmatched formulation purity and strict quality control.'
  },
  'South Korea': {
    name: 'South Korea',
    code: 'KR',
    FlagComponent: FlagKorea,
    niche: 'K-Beauty, Derma Skincare & Trendy Wellness',
    seaTransit: '10 – 12 Days',
    airTransit: '2 – 4 Days',
    standards: ['MFDS (KFDA)', 'CGMP Standards', 'ISO 22716'],
    topProducts: ['Hydrating Cica Serums', 'Glass-Skin Sunscreen SPF50+', 'Red Ginseng Extract Sticks'],
    desc: 'On-site sourcing teams in Seoul and Incheon. Fast access to trending K-Beauty formulas and private label cosmetic OEM/ODM facilities.'
  },
  'Malaysia': {
    name: 'Malaysia',
    code: 'MY',
    FlagComponent: FlagMalaysia,
    niche: 'Halal Certified Foods, Oils & Personal Hygiene',
    seaTransit: '7 – 9 Days',
    airTransit: '2 – 3 Days',
    standards: ['JAKIM Halal', 'MPOB Certified', 'HACCP & GMP'],
    topProducts: ['Instant 3-in-1 White Coffee', 'Edible Palm Oil Derivatives', 'Gentle Organic Body Washes'],
    desc: 'Strong logistics links between Port Klang and Sihanoukville. Premier source for certified Halal consumer goods and personal care essentials.'
  },
  'Vietnam': {
    name: 'Vietnam',
    code: 'VN',
    FlagComponent: FlagVietnam,
    niche: 'Specialty Agro, Coffee, Spices & Packaging',
    seaTransit: '3 – 5 Days',
    airTransit: '1 – 2 Days',
    standards: ['VFA Certified', 'ISO 9001', 'VietGAP Standard'],
    topProducts: ['Premium Robusta Coffee Beans', 'Dried Mango & Tropical Snacks', 'Eco-friendly Box Packaging'],
    desc: 'Cross-border trucking and short sea routes. Fastest transit speed and cost-effective agricultural and packaged food items.'
  },
  'Laos': {
    name: 'Laos',
    code: 'LA',
    FlagComponent: FlagLaos,
    niche: 'Organic Agricultural Produce, Teas, Minerals & Craft Goods',
    seaTransit: '2 – 4 Days (Overland Rail & Trucking)',
    airTransit: '1 – 2 Days',
    standards: ['Lao FDA Approved', 'ISO 9001', 'ASEAN Trade Compliance'],
    topProducts: ['Specialty Mountain Coffee Beans', 'Organic Herbal Teas & Spices', 'Handcrafted Silk & Eco Textiles'],
    desc: 'Direct overland trade corridor via Vientiane. Fast cross-border logistics link connecting Cambodia with Lao agricultural and specialty producers.'
  },
  'China': {
    name: 'China',
    code: 'CN',
    FlagComponent: FlagChina,
    niche: 'OEM Beauty Packaging, Electronics & Mass Retail',
    seaTransit: '7 – 10 Days',
    airTransit: '2 – 4 Days',
    standards: ['NMPA Registered', 'ISO 13485', 'CE & CCC Compliance'],
    topProducts: ['Airless Cosmetic Bottles', 'LED Light Therapy Devices', 'Custom Printed Rigid Boxes'],
    desc: 'Direct factory audits in Guangdong, Zhejiang, and Jiangsu. Premier source for custom OEM packaging molds and volume retail merchandise.'
  }
};

export const productCategories = [
  { title: 'Food & Beverage', count: '120+ Products' },
  { title: 'Health & Supplements', count: '85+ Products' },
  { title: 'Skincare & Cosmetics', count: '140+ Products' },
  { title: 'Hair Care & Salon', count: '60+ Products' },
  { title: 'Personal Wellness', count: '90+ Products' },
  { title: 'Household Essentials', count: '75+ Products' },
];

export const sourcingSteps = [
  { num: '01', title: 'Product Spec & Request', subtitle: 'You tell us what you need', desc: 'Share your exact product specifications, desired volume, target pricing, and custom packaging requirements.' },
  { num: '02', title: 'Overseas Factory Audit', subtitle: 'We vet global suppliers', desc: 'Our regional teams in Japan, Korea, Vietnam, and China inspect factories for ISO/GMP standards.' },
  { num: '03', title: 'Price Lock & Sample Check', subtitle: 'Zero risk sampling', desc: 'We negotiate direct factory rates and send physical samples to Phnom Penh for your approval.' },
  { num: '04', title: 'GDCE Freight & Customs', subtitle: 'We handle 100% legal clearance', desc: 'Our licensed customs brokers manage Ministry permits, health certificates, and tariff classifications.' },
  { num: '05', title: 'Doorstep Delivery', subtitle: 'Delivered in Cambodia', desc: 'Receive your verified cargo directly at your Phnom Penh or provincial warehouse ready for market.' },
];

export const faqList = [
  {
    category: 'customs',
    q: 'How does UNT ensure imported goods meet GDCE and Cambodian Ministry regulations?',
    a: 'We operate with in-house licensed customs brokers and legal specialists in Phnom Penh. Before shipment, we pre-verify all ingredient lists against Ministry of Health (MoH) and Ministry of Commerce (MoC) guidelines, obtain required import permits, and manage formal GDCE duty tax assessment to guarantee 100% compliant market entry.'
  },
  {
    category: 'sourcing',
    q: 'What is the typical Minimum Order Quantity (MOQ) for custom Sourcing-as-a-Service?',
    a: 'MOQs vary by product line and factory tier. Because UNT aggregates order volumes across our B2B network, we can negotiate significantly lower MOQs with manufacturers in Japan, Korea, and China—often starting at just 500 to 1,000 units compared to standard factory requirements of 5,000+ units.'
  },
  {
    category: 'sourcing',
    q: 'Can UNT manage private label packaging and custom OEM branding?',
    a: 'Yes! Our custom procurement service includes complete OEM/ODM private labeling. We handle artwork adaptation, English/Khmer compliant label translation, packaging die-lines, sample printing, and quality inspection at the factory before bulk production.'
  },
  {
    category: 'delivery',
    q: 'How fast can local warehouse inventory be dispatched to Phnom Penh and provinces?',
    a: 'Products held in our local Phnom Penh inventory are dispatched same-day for orders placed before 12:00 PM. Deliveries within Phnom Penh take 2–4 hours via our logistics team, while provincial shipments to Siem Reap, Battambang, Sihanoukville, etc. arrive within 24–48 hours.'
  },
  {
    category: 'training',
    q: 'What makes UNT Sales Training different from standard coaching programs?',
    a: 'UNT Sales Training is built directly on real commercial data from our active wholesale distribution network. Your sales team learns practical objection handling, B2B pricing negotiation scripts, and customer psychology—using live products and verified marketing collaterals from UNT\'s ecosystem.'
  },
  {
    category: 'customs',
    q: 'What documents do I receive when UNT delivers an imported shipment?',
    a: 'Every completed shipment comes with a complete compliance binder including GDCE customs declarations, official duty receipts, Ministry registration permits, Certificate of Origin (CO), Certificate of Analysis (COA), and commercial tax invoices.'
  }
];
