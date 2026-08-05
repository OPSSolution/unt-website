export const PRODUCT_CATEGORIES = [
  'Food & Beverage', 'Skincare & Beauty', 'Personal Care',
  'Health Supplements', 'Household Goods',
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export interface AdminProduct {
  id: string;
  name: string;
  category: ProductCategory;
  origin: string;
  origin_flag: string;
  moq: string;
  lead_time: string;
  image: string;
  description: string;
  oem_available: boolean;
  specifications: string[];
  certifications: string[];
  shelf_life: string;
}

export type ProductDraft = Omit<AdminProduct, 'id'>;

export const EMPTY_PRODUCT: ProductDraft = {
  name: '', category: 'Food & Beverage', origin: '', origin_flag: '',
  moq: '', lead_time: '', image: '', description: '', oem_available: false,
  specifications: [], certifications: [], shelf_life: '',
};
