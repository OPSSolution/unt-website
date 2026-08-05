export interface Product {
  id?: string;
  name: string;
  category: "Food & Beverage" | "Skincare & Beauty" | "Personal Care" | "Health Supplements" | "Household Goods";
  origin: string;
  origin_flag: string;
  moq: string;
  lead_time: string;
  image: string;
  description: string;
  oem_available: boolean;
  specifications: string[];
  certifications: string[];
  shelf_life?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Article {
  id?: string;
  title: string;
  category: "Market Trends" | "Regulatory Updates" | "Supply Chain" | "Retail Strategy" | "OEM Case Studies";
  date: string;
  read_time: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Partner {
  id?: string;
  name: string;
  category: string;
  country: string;
  logo_text: string;
  image?: string;
  description?: string;
  created_at?: string;
}

export interface HeroStat {
  id?: string;
  label: string;
  value: string;
  sort_order: number;
}

export interface HeroContent {
  id?: string;
  badge_text: string;
  headline: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  feature_image?: string;
  updated_at?: string;
}
