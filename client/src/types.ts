export type PageTab = 'home' | 'about' | 'services' | 'products' | 'training' | 'blog' | 'contact';

export interface Product {
  id: string;
  name: string;
  category: 'Food & Beverage' | 'Skincare & Beauty' | 'Personal Care' | 'Health Supplements' | 'Household Goods';
  origin: string;
  originFlag: string;
  moq: string;
  leadTime: string;
  image: string;
  showcaseImage?: string;
  description: string;
  oemAvailable: boolean;
  specifications: string[];
  certifications: string[];
  shelfLife?: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Market Trends' | 'Regulatory Updates' | 'Supply Chain' | 'Retail Strategy' | 'OEM Case Studies';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featured?: boolean;
}

export interface TrainingTrack {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  level: string;
  icon: string;
  description: string;
  keyTakeaways: string[];
  targetAudience: string;
  curriculum: { module: string; topics: string[] }[];
}

export interface PartnerLogo {
  id: string;
  name: string;
  category: string;
  country: string;
  logoText: string;
  image?: string;
  description?: string;
}

export interface QuoteRequestState {
  serviceType: string;
  productName?: string;
  productCategory: string;
  originPreference: string;
  estimatedVolume: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
}
