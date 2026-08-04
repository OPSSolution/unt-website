import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { Search, ArrowRight, Layers } from 'lucide-react';

interface ProductsPageProps {
  onOpenProductModal: (product: Product) => void;
  onOpenQuoteWithProduct: (productName: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenProductModal,
  onOpenQuoteWithProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Food & Beverage', 'Skincare & Beauty', 'Personal Care', 'Health Supplements', 'Household Goods'];
  const origins = ['All', 'Thailand', 'South Korea', 'Japan', 'Vietnam', 'China'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesOrigin = selectedOrigin === 'All' || p.origin === selectedOrigin;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesOrigin && matchesSearch;
    });
  }, [selectedCategory, selectedOrigin, searchQuery]);

  return (
    <div className="space-y-12 pb-16 animate-fade-in bg-slate-50 text-slate-900">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-white border-b border-slate-200">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="px-3.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
            Verified B2B Wholesale & OEM Products
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900">
            Verified Global <span className="emerald-gradient-text">Wholesale Catalog</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Direct-from-factory imported goods pre-audited for Cambodian Ministry compliance, Khmer labeling standards, and volume trade distribution.
          </p>
        </div>
      </section>

      {/* 2. Controls & Search Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-left">
          {/* Top Row: Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-600" />
            <input
              type="text"
              placeholder="Search products by name, formula, category, or origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Chips: Categories */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Filter Category</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Chips: Origin */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Filter Country of Origin</span>
            <div className="flex flex-wrap gap-2">
              {origins.map((orig) => (
                <button
                  key={orig}
                  onClick={() => setSelectedOrigin(orig)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedOrigin === orig
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {orig === 'All' ? '🌐 All Countries' : orig}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-slate-600">
              Showing <strong className="text-emerald-700">{filteredProducts.length}</strong> catalog items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
              <Layers className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-display font-bold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search query or reset category filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedOrigin('All');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Visual Banner */}
                    <div 
                      onClick={() => onOpenProductModal(product)}
                      className="relative aspect-video overflow-hidden bg-slate-100 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold rounded-lg flex items-center space-x-1.5 border border-slate-200 shadow-sm">
                        <span>{product.originFlag}</span>
                        <span>{product.origin}</span>
                      </div>
                      {product.oemAvailable && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-full shadow-sm">
                          OEM Ready
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                        {product.category}
                      </div>
                      <h3 
                        onClick={() => onOpenProductModal(product)}
                        className="text-lg font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                        <div>
                          <span className="block text-[10px] uppercase font-semibold text-slate-400">Minimum Order</span>
                          <span className="font-semibold text-slate-900">{product.moq}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] uppercase font-semibold text-slate-400">Est. Lead Time</span>
                          <span className="font-semibold text-slate-900">{product.leadTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 pb-6 pt-2 flex items-center space-x-2">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold text-xs border border-slate-200 transition-colors text-center"
                    >
                      Technical Specs
                    </button>
                    <button
                      onClick={() => onOpenQuoteWithProduct(product.name)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all text-center flex items-center justify-center space-x-1"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
