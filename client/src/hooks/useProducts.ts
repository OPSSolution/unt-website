import { Product } from '../types';
import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';
import { useLanguage, type ContentLanguage } from '../i18n/LanguageContext';


function mapRow(row: any): Product {
  return {
    id: row.id, name: row.name, category: row.category, origin: row.origin,
    originFlag: row.origin_flag, moq: row.moq, leadTime: row.lead_time,
    image: row.image, showcaseImage: row.showcase_image || row.showcaseImage || undefined, description: row.description, oemAvailable: row.oem_available,
    specifications: row.specifications ?? [], certifications: row.certifications ?? [],
    shelfLife: row.shelf_life ?? undefined,
  };
}

async function loadProducts(language: ContentLanguage): Promise<Product[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products?lang=${language}`);
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) ? rows.map(mapRow) : [];
  } catch { return []; }
}

export function useProducts(): Product[] {
  const { language } = useLanguage();
  return useSharedResource(`products-${language}`, () => loadProducts(language), []);
}
