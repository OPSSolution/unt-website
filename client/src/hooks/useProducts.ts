import { useEffect, useState } from 'react';
import { Product } from '../types';
import { PRODUCTS as MOCK_PRODUCTS } from '../data/mockData';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

// Last-known-good cache — used only as the initial render value.
let cached: Product[] | null = null;

function mapRow(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    origin: row.origin,
    originFlag: row.origin_flag,
    moq: row.moq,
    leadTime: row.lead_time,
    image: row.image,
    description: row.description,
    oemAvailable: row.oem_available,
    specifications: row.specifications ?? [],
    certifications: row.certifications ?? [],
    shelfLife: row.shelf_life ?? undefined,
  };
}

async function loadProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${BASE}/api/products`);
    if (!res.ok) return null;
    const rows = await res.json();
    // Fall back to the demo catalog while the database table is empty so the
    // public site never renders a blank catalog.
    if (!Array.isArray(rows) || rows.length === 0) return MOCK_PRODUCTS;
    return rows.map(mapRow);
  } catch {
    return MOCK_PRODUCTS;
  }
}

export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(cached ?? MOCK_PRODUCTS);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await loadProducts();
      if (!cancelled && data) {
        cached = data;
        setProducts(data);
      }
    };

    load();
    const intervalId = window.setInterval(load, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    const onFocus = () => load();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return products;
}
