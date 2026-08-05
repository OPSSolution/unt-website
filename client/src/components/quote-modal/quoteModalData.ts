import { GraduationCap, Package, ShoppingCart, Sparkles } from 'lucide-react';

export const SERVICE_TYPES = [
  { value: 'Product Sourcing', label: 'Product Sourcing', icon: Package, desc: 'Find verified products from overseas factories' },
  { value: 'OEM / Private Label', label: 'OEM / Private Label', icon: Sparkles, desc: 'Custom branding & manufacturing' },
  { value: 'Wholesale Purchase', label: 'Wholesale Purchase', icon: ShoppingCart, desc: 'Bulk orders at direct factory pricing' },
  { value: 'Sales Training', label: 'Sales Training', icon: GraduationCap, desc: 'Upskill your commercial teams' },
];

export const CATEGORIES = [
  'Food & Beverage (F&B)',
  'Skincare & Cosmetics',
  'Personal Care & Hair',
  'Health & Wellness Supplements',
  'Household Goods & Cleaners',
  'Other / Custom Category',
];

export const ORIGINS = [
  { value: 'South Korea', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png' },
  { value: 'Japan', flagUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png' },
  { value: 'Vietnam', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png' },
  { value: 'China', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  { value: 'Laos', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/250px-Flag_of_Laos.svg.png' },
  { value: 'Malaysia', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/250px-Flag_of_Malaysia.svg.png' },
  { value: 'Global / Best Price', flagUrl: '' },
];

export const VOLUMES = [
  'Trial Batch (500 - 1,000 units)',
  'Medium Order (1,000 - 5,000 units)',
  'Large Wholesale (5,000 - 20,000 units)',
  'Full Container Load (FCL 20ft/40ft)',
];

export const STEPS = [
  { label: 'Service', number: 1 },
  { label: 'Details', number: 2 },
  { label: 'Contact', number: 3 },
];

