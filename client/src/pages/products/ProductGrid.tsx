import { ArrowRight, Layers } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import type { Product } from '../../types';

interface Props {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onQuote: (productName: string) => void;
  onReset: () => void;
}

export function ProductGrid({ products, onOpenProduct, onQuote, onReset }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Showing <strong className="text-emerald-700 dark:text-emerald-400">{products.length}</strong> catalog items</span>
      </div>
      {products.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <Layers className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">No products found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Try adjusting your search query or reset category filters.</p>
          <button type="button" onClick={onReset} className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm">Reset Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => <ProductCard key={product.id} product={product} onOpen={() => onOpenProduct(product)} onQuote={() => onQuote(product.name)} />)}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onOpen, onQuote }: { product: Product; onOpen: () => void; onQuote: () => void }) {
  return (
    <Card3D intensity={12}>
      <article className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between text-left h-full">
        <div>
          <button type="button" onClick={onOpen} className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer w-full text-left">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold rounded-lg">{product.originFlag} {product.origin}</div>
            <div className={`absolute top-3 right-3 live-pulse-badge bg-slate-900/90 ${product.oemAvailable ? 'text-emerald-300' : 'text-cyan-300'}`}><span className="live-pulse-dot" /><span>{product.oemAvailable ? 'OEM Ready' : 'Stock Active'}</span></div>
          </button>
          <div className="p-6 space-y-3">
            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">{product.category}</div>
            <button type="button" onClick={onOpen} className="text-lg text-left font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 line-clamp-2">{product.name}</button>
            <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">{product.description}</p>
            <div className="pt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <div><span className="block text-[10px] uppercase text-slate-400">Minimum Order</span><strong className="text-slate-900 dark:text-white">{product.moq}</strong></div>
              <div className="text-right"><span className="block text-[10px] uppercase text-slate-400">Lead Time</span><strong className="text-slate-900 dark:text-white">{product.leadTime}</strong></div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex items-center gap-2">
          <button type="button" onClick={onOpen} className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700">Specs & Certificate</button>
          <button type="button" onClick={onQuote} className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"><span>Inquire</span><ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
      </article>
    </Card3D>
  );
}
