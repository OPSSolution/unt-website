import { Product } from '../types';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/mockData';
import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';


function mapRow(row: any): Product {
  return {
    id: row.id, name: row.name, category: row.category, origin: row.origin,
    originFlag: row.origin_flag, moq: row.moq, leadTime: row.lead_time,
    image: row.image, description: row.description, oemAvailable: row.oem_available,
    specifications: row.specifications ?? [], certifications: row.certifications ?? [],
    shelfLife: row.shelf_life ?? undefined,
  };
}

async function loadProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0 ? rows.map(mapRow) : MOCK_PRODUCTS;
  } catch { return MOCK_PRODUCTS; }
}

export function useProducts(): Product[] {
  return useSharedResource('products', loadProducts, MOCK_PRODUCTS);
}
