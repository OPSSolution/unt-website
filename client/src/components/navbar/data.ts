import { Package, Sparkles, Truck } from 'lucide-react';
import type { PageTab } from '../../types';

export interface NavLink {
  id: PageTab;
  label: string;
  labelKhmer?: string;
  hasMegaMenu?: 'products' | 'services';
}

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', labelKhmer: 'ទំព័រដើម' },
  { id: 'about', label: 'About', labelKhmer: 'អំពីយើង' },
  { id: 'services', label: 'Services', labelKhmer: 'សេវាកម្ម', hasMegaMenu: 'services' },
  { id: 'products', label: 'Wholesale Catalog', labelKhmer: 'ទំនិញបោះដុំ', hasMegaMenu: 'products' },
  { id: 'training', label: 'Sales Training', labelKhmer: 'វគ្គបណ្ដុះបណ្ដាល' },
  { id: 'blog', label: 'Market Insights', labelKhmer: 'ព័ត៌មានទីផ្សារ' },
  { id: 'contact', label: 'Contact', labelKhmer: 'ទំនាក់ទំនង' },
];

export const PRODUCT_CATEGORIES = [
  { title: 'Food & Beverage', desc: 'Organic NFC coconut water, specialty teas', flag: '🥥' },
  { title: 'Skincare & Beauty', desc: 'K-Beauty & J-Beauty brightening serums', flag: '✨' },
  { title: 'Health Supplements', desc: 'Liposomal Vitamin C, Zinc & immunity', flag: '💊' },
  { title: 'Personal Hygiene', desc: 'Salon-grade Keratin & Argan oil sets', flag: '🌿' },
];

export const SERVICE_ITEMS = [
  { title: 'Custom OEM & Private Labeling', desc: 'Turnkey cosmetic & beverage manufacturing in Korea & Japan', icon: Sparkles },
  { title: 'Ministry Permit & GDCE Clearance', desc: '100% compliant Cambodian MoC, HACCP & Khmer packaging labels', icon: Truck },
  { title: 'Cold-Chain & Cross-Border Logistics', desc: 'Refrigerated overland trucking & ocean freight to Phnom Penh', icon: Package },
];

export type MegaMenuName = 'products' | 'services' | null;

