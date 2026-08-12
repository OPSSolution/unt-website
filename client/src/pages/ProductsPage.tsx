import React, { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { useProducts } from '../hooks/useProducts';
import { CatalogFilters } from './products/CatalogFilters';
import { ProductGrid } from './products/ProductGrid';
import { ProductsHero } from './products/ProductsHero';
import { InteractiveProductShowcase } from './products/InteractiveProductShowcase';
import { PageAnimatedBackground } from '../components/PageAnimatedBackground';
import { countryNameFromFlag } from './products/data';

interface ProductsPageProps {
  onOpenProductModal: (product: Product) => void;
  onOpenQuoteWithProduct: (productName: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenProductModal, onOpenQuoteWithProduct }) => {
  const products = useProducts();
  const content = useHomepageSections().products_page ?? {};
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const productOrigins = useMemo(() => {
    const origins = new Map<string, string>();
    products.forEach((product) => {
      const origin = product.origin.trim() || countryNameFromFlag(product.originFlag);
      if (origin && !origins.has(origin)) origins.set(origin, product.originFlag);
    });
    return Array.from(origins, ([name, flag]) => ({ name, flag }));
  }, [products]);

  useEffect(() => {
    if (selectedOrigin !== 'All' && !productOrigins.some((item) => item.name === selectedOrigin)) {
      setSelectedOrigin('All');
    }
  }, [productOrigins, selectedOrigin]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const productOrigin = product.origin.trim() || countryNameFromFlag(product.originFlag);
      const matchesOrigin = selectedOrigin === 'All' || productOrigin === selectedOrigin;
      const matchesSearch = normalizedQuery === '' || [product.name, product.description, product.category, product.origin]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesOrigin && matchesSearch;
    });
  }, [products, selectedCategory, selectedOrigin, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedOrigin('All');
    setSearchQuery('');
  };

  return (
    <div className="relative isolate space-y-6 sm:space-y-8 pb-16 animate-fade-in bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden min-h-screen">
      
      {/* 3D Hex-Grid Canvas Background for Wholesale Products Catalog */}
      <PageAnimatedBackground />

      <ProductsHero badge={content.badge} headline={content.headline} subheadline={content.subheadline} />

      {/* 3D Live Interactive Product Showcase (Nike Pinterest E-Commerce Concept) */}
      <InteractiveProductShowcase
        products={products}
        onOpenProduct={onOpenProductModal}
        onQuote={onOpenQuoteWithProduct}
      />

      <section className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-6">
        <CatalogFilters
          category={selectedCategory}
          origin={selectedOrigin}
          searchQuery={searchQuery}
          origins={productOrigins}
          onCategoryChange={setSelectedCategory}
          onOriginChange={setSelectedOrigin}
          onSearchChange={setSearchQuery}
        />
        <ProductGrid
          products={filteredProducts}
          onOpenProduct={onOpenProductModal}
          onQuote={onOpenQuoteWithProduct}
          onReset={resetFilters}
        />
      </section>
    </div>
  );
};
