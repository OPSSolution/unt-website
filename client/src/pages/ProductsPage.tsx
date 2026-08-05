import React, { useMemo, useState } from 'react';
import type { Product } from '../types';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { useProducts } from '../hooks/useProducts';
import { CatalogFilters } from './products/CatalogFilters';
import { ProductGrid } from './products/ProductGrid';
import { ProductsHero } from './products/ProductsHero';

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

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesOrigin = selectedOrigin === 'All' || product.origin === selectedOrigin;
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
    <div className="space-y-12 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      <ProductsHero badge={content.badge} headline={content.headline} subheadline={content.subheadline} />
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-6">
        <CatalogFilters
          category={selectedCategory}
          origin={selectedOrigin}
          searchQuery={searchQuery}
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
