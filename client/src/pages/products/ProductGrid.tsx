import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import type { Product } from '../../types';
import { countryFlagUrl } from './data';
import { useLanguage } from '../../i18n/LanguageContext';

const CATEGORY_KM: Record<string, string> = {
  'Food & Beverage': 'អាហារ និងភេសជ្ជៈ',
  'Skincare & Beauty': 'ថែរក្សាស្បែក និងសម្រស់',
  'Personal Care': 'ថែទាំផ្ទាល់ខ្លួន',
  'Health Supplements': 'អាហារបំប៉នសុខភាព',
  'Household Goods': 'សម្ភារៈប្រើប្រាស់ក្នុងផ្ទះ',
};

interface Props {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onQuote: (productName: string) => void;
  onReset: () => void;
}

export function ProductGrid({ products, onOpenProduct, onQuote, onReset }: Props) {
  const { language } = useLanguage();
  const isKm = language === 'km';
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const pageProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [products]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{isKm ? 'បង្ហាញ' : 'Showing'} <strong className="text-emerald-700 dark:text-emerald-400">{pageProducts.length}</strong> {isKm ? `ក្នុងចំណោម ${products.length} ផលិតផល` : `of ${products.length} catalog items`}</span>
      </div>
      {products.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <Layers className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">{isKm ? 'រកមិនឃើញផលិតផល' : 'No products found'}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{isKm ? 'សូមកែសម្រួលការស្វែងរក ឬកំណត់តម្រងឡើងវិញ។' : 'Try adjusting your search query or reset category filters.'}</p>
          <button type="button" onClick={onReset} className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm">{isKm ? 'កំណត់តម្រងឡើងវិញ' : 'Reset Filters'}</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pageProducts.map((product) => <ProductCard key={product.id} product={product} isKm={isKm} onOpen={() => onOpenProduct(product)} onQuote={() => onQuote(product.name)} />)}
        </div>
      )}
      {products.length > itemsPerPage && <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Catalog pagination">
        <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="w-4 h-4" /></button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} aria-current={page === pageNumber ? 'page' : undefined} className={`min-w-10 h-10 rounded-xl text-xs font-bold transition-colors ${page === pageNumber ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{pageNumber}</button>)}
        <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-40" aria-label="Next page"><ChevronRight className="w-4 h-4" /></button>
      </nav>}
    </div>
  );
}

function ProductCard({ product, isKm, onOpen, onQuote }: { product: Product; isKm: boolean; onOpen: () => void; onQuote: () => void }) {
  const flagUrl = countryFlagUrl(product.origin, product.originFlag);

  return (
    <Card3D intensity={10}>
      <article className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between h-full text-left">
        <div>
          {/* Image Container with full-bleed image display */}
          <button type="button" onClick={onOpen} className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-950 cursor-pointer w-full text-left group/img block border-b border-slate-100 dark:border-slate-800/80">
            {/* Subtle Gradient Scrim for Badge Contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/10 dark:from-slate-950/60 dark:to-slate-950/40 pointer-events-none z-10" />

            {/* Crisp Full-Body Edge-to-Edge Product Image */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
            />

            {/* Country Flag Badge */}
            {product.originFlag && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-700/80 rounded-xl shadow-sm flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white z-20" title={product.origin}>
                {flagUrl ? (
                  <img src={flagUrl} alt={product.origin} className="w-4.5 h-3.5 object-cover rounded-sm" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                ) : (
                  <span>{product.originFlag}</span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-slate-700 dark:text-slate-200">{product.origin}</span>
              </div>
            )}

            {/* OEM / Active Badge */}
            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border shadow-sm flex items-center gap-1.5 z-20 ${
              product.oemAvailable 
                ? 'bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40' 
                : 'bg-white/95 dark:bg-slate-900/90 text-cyan-700 dark:text-cyan-300 border-slate-200 dark:border-cyan-500/40'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${product.oemAvailable ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
              <span>{product.oemAvailable ? (isKm ? 'OEM Private Label' : 'OEM Ready') : (isKm ? 'មានក្នុងស្តុក' : 'Stock Active')}</span>
            </div>
          </button>

          {/* Details Body */}
          <div className="p-5 space-y-3">
            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/50">
                {isKm ? CATEGORY_KM[product.category] ?? product.category : product.category}
              </span>
            </div>

            {/* Product Title */}
            <button 
              type="button" 
              onClick={onOpen} 
              className="text-base text-left font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 min-h-[2.75rem] leading-snug transition-colors"
            >
              {product.name}
            </button>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 min-h-[2.25rem] leading-relaxed">
              {product.description}
            </p>

            {/* Trade Specs Box */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 min-w-0">
                <span className="block text-[9px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 truncate">
                  {isKm ? 'ការបញ្ជាទិញអប្បបរមា' : 'Minimum Order'}
                </span>
                <strong className="text-slate-900 dark:text-white font-bold text-[11px] truncate block" title={product.moq}>
                  {product.moq}
                </strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 min-w-0 text-right">
                <span className="block text-[9px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 truncate">
                  {isKm ? 'រយៈពេលដឹកជញ្ជូន' : 'Lead Time'}
                </span>
                <strong className="text-slate-900 dark:text-white font-bold text-[11px] truncate block" title={product.leadTime}>
                  {product.leadTime}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-5 pt-0 flex items-center gap-2">
          <button 
            type="button" 
            onClick={onOpen} 
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{isKm ? 'លក្ខណៈបច្ចេកទេស' : 'Specs'}</span>
          </button>
          <button 
            type="button" 
            onClick={onQuote} 
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-emerald-500/25 transition-all flex items-center gap-1 shrink-0"
          >
            <span>{isKm ? 'សាកសួរ' : 'Inquire'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>
    </Card3D>
  );
}

