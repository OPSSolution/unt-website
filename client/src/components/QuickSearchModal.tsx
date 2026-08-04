import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Package, Newspaper, Calculator, FileText, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { PRODUCTS, ARTICLES } from '../data/mockData';
import { Product, Article, PageTab } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectArticle?: (article: Article) => void;
  onOpenQuoteModal: () => void;
  onOpenCalcModal: () => void;
  onSelectTab: (tab: PageTab) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectArticle,
  onOpenQuoteModal,
  onOpenCalcModal,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'products' | 'articles' | 'actions'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.origin.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = ARTICLES.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const quickActions = [
    {
      id: 'quote',
      title: 'Get a B2B Sourcing Quote',
      desc: 'Request official pricing, MOQs & freight breakdown in 24 hrs',
      icon: FileText,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      action: () => {
        onClose();
        onOpenQuoteModal();
      }
    },
    {
      id: 'calc',
      title: 'Open Interactive Sourcing Estimator',
      desc: 'Calculate import duties, shipping lead times & Cambodian permits',
      icon: Calculator,
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      action: () => {
        onClose();
        onOpenCalcModal();
      }
    },
    {
      id: 'catalog',
      title: 'View Full Wholesale Catalog',
      desc: 'Browse 500+ ASEAN certified FMCG, cosmetics & food products',
      icon: Package,
      color: 'text-amber-800 bg-amber-50 border-amber-200',
      action: () => {
        onClose();
        onSelectTab('products');
      }
    },
    {
      id: 'services',
      title: 'Explore Sourcing & OEM Solutions',
      desc: 'Custom formulation, Cambodian Ministry compliance & cold-chain',
      icon: Sparkles,
      color: 'text-purple-800 bg-purple-50 border-purple-200',
      action: () => {
        onClose();
        onSelectTab('services');
      }
    }
  ].filter(act => query === '' || act.title.toLowerCase().includes(query.toLowerCase()) || act.desc.toLowerCase().includes(query.toLowerCase()));

  const totalResults = (activeCategory === 'all' || activeCategory === 'products' ? filteredProducts.length : 0) +
                       (activeCategory === 'all' || activeCategory === 'articles' ? filteredArticles.length : 0) +
                       (activeCategory === 'all' || activeCategory === 'actions' ? quickActions.length : 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md transition-opacity">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150 z-10 text-slate-800">
        
        {/* Top Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-emerald-600 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, OEM services, articles, or type a command..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')} 
              className="text-slate-400 hover:text-slate-600 p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 bg-white text-slate-500 text-[11px] font-mono rounded border border-slate-300">
            ESC
          </kbd>
        </div>

        {/* Filter Pills Header */}
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-white border-b border-slate-200 text-xs overflow-x-auto">
          <span className="text-slate-500 font-medium shrink-0 mr-1">Filter:</span>
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
              activeCategory === 'all'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Results ({filteredProducts.length + filteredArticles.length + quickActions.length})
          </button>
          <button
            onClick={() => setActiveCategory('products')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 flex items-center space-x-1 ${
              activeCategory === 'products'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products ({filteredProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory('articles')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 flex items-center space-x-1 ${
              activeCategory === 'articles'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Market Insights ({filteredArticles.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory('actions')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 flex items-center space-x-1 ${
              activeCategory === 'actions'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quick Actions ({quickActions.length})</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1 custom-scrollbar">

          {totalResults === 0 && (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <p className="text-sm font-medium text-slate-600">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "Coconut", "Serum", "OEM", "Customs", or "Calculator"</p>
            </div>
          )}

          {/* Quick Actions Group */}
          {(activeCategory === 'all' || activeCategory === 'actions') && quickActions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quick Tools & B2B Actions</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickActions.map(act => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.id}
                      onClick={act.action}
                      className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 transition-all text-left group"
                    >
                      <div className={`p-2.5 rounded-xl border ${act.color} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                          <span>{act.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-emerald-600" />
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">{act.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Products Group */}
          {(activeCategory === 'all' || activeCategory === 'products') && filteredProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-2 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Package className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Wholesale Products ({filteredProducts.length})</span>
                </span>
                {filteredProducts.length > 3 && (
                  <button 
                    onClick={() => { onClose(); onSelectTab('products'); }}
                    className="text-[11px] text-emerald-600 hover:underline flex items-center space-x-1 font-semibold"
                  >
                    <span>View All Catalog</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 transition-all group"
                  >
                    <div 
                      className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        if (onSelectProduct) onSelectProduct(product);
                        else onSelectTab('products');
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate flex items-center">
                          <span className="mr-1.5">{product.originFlag}</span>
                          <span className="truncate">{product.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-semibold rounded text-[10px] border border-emerald-200">
                            {product.category}
                          </span>
                          <span>•</span>
                          <span>MOQ: {product.moq}</span>
                          <span>•</span>
                          <span>{product.leadTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 ml-3">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectProduct) onSelectProduct(product);
                          else onSelectTab('products');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenQuoteModal();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Group */}
          {(activeCategory === 'all' || activeCategory === 'articles') && filteredArticles.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-2 flex items-center space-x-1.5">
                <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
                <span>Market Insights & Regulatory Updates</span>
              </div>
              <div className="space-y-2">
                {filteredArticles.map(article => (
                  <button
                    key={article.id}
                    onClick={() => {
                      onClose();
                      if (onSelectArticle) onSelectArticle(article);
                      else onSelectTab('blog');
                    }}
                    className="w-full flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 transition-all text-left group"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {article.title}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{article.excerpt}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1">
                        <span className="text-emerald-700 font-bold">{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info bar */}
        <div className="p-3 px-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>UNT Trade Intelligence Platform</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px]">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white text-slate-700 rounded font-mono text-[10px] border border-slate-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white text-slate-700 rounded font-mono text-[10px] border border-slate-300">K</kbd> anywhere</span>
          </div>
        </div>

      </div>
    </div>
  );
};
