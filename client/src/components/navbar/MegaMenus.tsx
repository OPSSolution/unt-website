import { Package, Sparkles } from 'lucide-react';
import { PRODUCT_CATEGORIES, SERVICE_ITEMS } from './data';

interface CommonProps {
  onNavigate: () => void;
}

interface ProductsProps extends CommonProps {
  onQuote: () => void;
}

const MENU_CLASS = 'absolute top-full bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-[0_40px_80px_-20px_rgba(15,23,42,0.25)] p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left mt-4 dark:bg-slate-900/95 dark:border-slate-700/80 dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_-12px_rgba(16,185,129,0.18)]';

export function ProductsMegaMenu({ onNavigate, onQuote }: ProductsProps) {
  return (
    <div className={`${MENU_CLASS} -left-20 w-[560px]`}>
      <div className="mega-caret" />
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400">
            <Package className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Wholesale Categories & Sourcing</span>
        </div>
        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">500+ ASEAN Certified Products</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            type="button"
            key={category.title}
            onClick={onNavigate}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-400/60 transition-all text-left group dark:bg-slate-800/60 dark:hover:bg-emerald-950/40 dark:border-slate-700/80 dark:hover:border-emerald-500/40"
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors dark:text-white dark:group-hover:text-emerald-300">
              <span>{category.flag}</span><span className="whitespace-nowrap">{category.title}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 line-clamp-1 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">{category.desc}</div>
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-200 flex items-center justify-between gap-3 dark:from-emerald-950/80 dark:to-slate-800/80 dark:border-emerald-500/30">
        <div className="text-xs text-slate-900 dark:text-white font-semibold">Looking for Turnkey OEM / Custom Formulation?</div>
        <button onClick={onQuote} className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 shrink-0">OEM Inquiry</button>
      </div>
    </div>
  );
}

export function ServicesMegaMenu({ onNavigate }: CommonProps) {
  return (
    <div className={`${MENU_CLASS} -left-8 w-[480px]`}>
      <div className="mega-caret" />
      <div className="flex items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400"><Sparkles className="w-4 h-4" /></div>
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">End-to-End Trade Solutions</span>
        </div>
      </div>
      <div className="space-y-2">
        {SERVICE_ITEMS.map((service) => {
          const Icon = service.icon;
          return (
            <button type="button" key={service.title} onClick={onNavigate} className="w-full flex items-start space-x-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-400/60 transition-all text-left group dark:bg-slate-800/60 dark:hover:bg-emerald-950/40 dark:border-slate-700/80 dark:hover:border-emerald-500/40">
              <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 shrink-0 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400"><Icon className="w-4 h-4" /></div>
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">{service.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">{service.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
