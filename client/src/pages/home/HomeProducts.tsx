import { useMemo, useState } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';
import type { TradeHub } from '../../components/ThreeBackground';
import type { PageTab, Product } from '../../types';
import { countryFlagUrl } from '../products/data';

interface Props {
  hubs: TradeHub[];
  products: Product[];
  content: Record<string, string>;
  onSelectOrigin: (origin: string) => void;
  onNavigate: (tab: PageTab) => void;
  onOpenProduct: (product: Product) => void;
}

export function HomeProducts({ hubs, products, content, onSelectOrigin, onNavigate, onOpenProduct }: Props) {
  const [countryId, setCountryId] = useState(hubs[0]?.id ?? 'all');
  const [animationKey, setAnimationKey] = useState(0);
  const allOrigins = countryId === 'all';
  const hubsKey = hubs.map((hub) => hub.id).join('|');
  const normalizeOrigin = (value: string) => value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^republic of korea$|^korea,? south$|^korea$/g, 'south korea')
    .replace(/^កូរ៉េខាងត្បូង$/g, 'south korea')
    .replace(/^កម្ពុជា$/g, 'cambodia')
    .replace(/^ជប៉ុន$/g, 'japan')
    .replace(/^ចិន$/g, 'china')
    .replace(/^វៀតណាម$/g, 'vietnam')
    .replace(/^ឡាវ$/g, 'laos')
    .replace(/^ម៉ាឡេស៊ី$/g, 'malaysia');
  const productsByCountry = useMemo(() => {
    const grouped: Record<string, Product[]> = { all: products.slice(0, 4) };
    hubs.forEach((hub) => {
      const hubOrigins = new Set([normalizeOrigin(hub.name), normalizeOrigin(hub.id)]);
      grouped[hub.id] = products
        .filter((product) => hubOrigins.has(normalizeOrigin(product.origin)))
        .slice(0, 4);
    });
    return grouped;
  }, [products, hubsKey]);

  const selectCountry = (id: string) => {
    setCountryId(id);
    setAnimationKey((key) => key + 1);
    onSelectOrigin(id);
  };
  const activeHub = hubs.find((hub) => hub.id === countryId);
  // Never substitute products from another country. An empty selected origin
  // should show an empty state instead of a misleading all-origin result.
  const visibleProducts = allOrigins ? productsByCountry.all : (productsByCountry[countryId] ?? []);

  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-6 sm:space-y-8">
      <ScrollReveal animation="up"><div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"><div className="text-left"><span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.badge ?? 'Wholesale & OEM Catalog'}</span><h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-2"><ScrollTextReveal text={content.heading ?? 'Featured Import Catalog Items'} mode="codepen-title" /></h2><p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">{content.subheading ?? 'Verified quality products ready for Cambodian distribution or private label rebranding.'}</p></div><button onClick={() => onNavigate('products')} className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"><span>{content.cta ?? 'View Full Catalog'}</span><ArrowRight className="w-4 h-4" /></button></div></ScrollReveal>
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
        <button
          onClick={() => selectCountry('all')}
          title="All Origins — Global ASEAN Network"
          aria-label="All Origins"
          className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap shrink-0 transition-all ${allOrigins ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <Globe className={`w-4 h-4 shrink-0 ${allOrigins ? 'text-white' : 'text-emerald-500'}`} />
          <span className="hidden sm:inline">All Origins</span>
        </button>
        {hubs.map((hub) => (
          <button
            key={hub.id}
            onClick={() => selectCountry(hub.id)}
            title={hub.name}
            aria-label={hub.name}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap shrink-0 transition-all ${!allOrigins && countryId === hub.id ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
          >
            <img src={hub.flagUrl} alt={hub.name} className="w-4.5 h-3 sm:w-4 sm:h-3 object-cover rounded-sm shrink-0" />
            <span className="hidden sm:inline">{hub.name}</span>
          </button>
        ))}
      </div>
      {visibleProducts.length > 0 ? (
        <div key={`cards-${animationKey}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleProducts.map((product) => {
            const flagUrl = countryFlagUrl(product.origin, product.originFlag);
            return (
              <Card3D key={product.id} intensity={10} onClick={() => onOpenProduct(product)}>
                <article className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between h-full text-left">
                  <div>
                    {/* Image Container with full-bleed image display */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-950 block border-b border-slate-100 dark:border-slate-800/80">
                      {/* Subtle Gradient Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/10 dark:from-slate-950/60 dark:to-slate-950/40 pointer-events-none z-10" />

                      {/* Crisp Full-Body Edge-to-Edge Product Image */}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />

                      {/* Origin Flag Badge */}
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

                      {/* OEM Status Badge */}
                      <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border shadow-sm flex items-center gap-1.5 z-20 ${
                        product.oemAvailable 
                          ? 'bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40' 
                          : 'bg-white/95 dark:bg-slate-900/90 text-cyan-700 dark:text-cyan-300 border-slate-200 dark:border-cyan-500/40'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${product.oemAvailable ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
                        <span>{product.oemAvailable ? 'OEM Ready' : 'Stock Active'}</span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-3">
                      <span className="inline-block text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/50">
                        {product.category}
                      </span>
                      <h3 className="text-base font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 min-h-[2.75rem] leading-snug transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 min-h-[2.25rem] leading-relaxed">
                        {product.description}
                      </p>

                      {/* Specs Mini Grid */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80 min-w-0">
                          <span className="block text-[9px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 truncate">
                            Minimum Order
                          </span>
                          <strong className="text-slate-900 dark:text-white font-bold text-[11px] truncate block" title={product.moq}>
                            {product.moq}
                          </strong>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80 min-w-0 text-right">
                          <span className="block text-[9px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 truncate">
                            Lead Time
                          </span>
                          <strong className="text-slate-900 dark:text-white font-bold text-[11px] truncate block" title={product.leadTime}>
                            {product.leadTime}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Card3D>
            );
          })}
        </div>
      ) : (
        <div key={`empty-${animationKey}`} className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">No products are currently listed for {activeHub?.name ?? 'this origin'}.</p>
          <p className="mt-1 text-xs text-slate-500">Choose another origin or view the full wholesale catalog.</p>
        </div>
      )}
    </section>
  );
}
