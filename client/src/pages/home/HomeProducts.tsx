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
  const productsByCountry = useMemo(() => {
    const grouped: Record<string, Product[]> = { all: products.slice(0, 4) };
    hubs.forEach((hub) => { grouped[hub.id] = products.filter((product) => product.origin.toLowerCase() === hub.name.toLowerCase()).slice(0, 4); });
    return grouped;
  }, [products, hubsKey]);

  const selectCountry = (id: string) => {
    setCountryId(id);
    setAnimationKey((key) => key + 1);
    onSelectOrigin(id);
  };
  const activeHub = hubs.find((hub) => hub.id === countryId);
  const countryProducts = productsByCountry[countryId];
  const displayedProducts = countryProducts?.length ? countryProducts : productsByCountry.all;
  const visibleProducts = displayedProducts;

  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
      <ScrollReveal animation="up"><div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"><div className="text-left"><span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.badge ?? 'Wholesale & OEM Catalog'}</span><h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2"><ScrollTextReveal text={content.heading ?? 'Featured Import Catalog Items'} mode="codepen-title" /></h2><p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{content.subheading ?? 'Verified quality products ready for Cambodian distribution or private label rebranding.'}</p></div><button onClick={() => onNavigate('products')} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2"><span>{content.cta ?? 'View Full Catalog'}</span><ArrowRight className="w-4 h-4" /></button></div></ScrollReveal>
      <div className="flex flex-wrap gap-2">{hubs.map((hub) => <button key={hub.id} onClick={() => selectCountry(hub.id)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${!allOrigins && countryId === hub.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}><img src={hub.flagUrl} alt="" className="w-4 h-3 object-cover" />{hub.name}</button>)}<button onClick={() => selectCountry('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${allOrigins ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'}`}>All Origins</button></div>
      <div key={`banner-${animationKey}`} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-900/90 to-slate-900/90 border border-emerald-500/30 text-white">{activeHub ? <img src={activeHub.flagUrl} alt={`${activeHub.name} flag`} className="w-8 h-6 object-cover rounded" /> : <Globe className="w-8 h-8 text-emerald-400" />}<div><span className="text-emerald-400 font-bold text-xs">{allOrigins ? 'ALL ORIGINS — ASEAN Network' : `${activeHub?.name ?? 'Global'} ➜ Phnom Penh, Cambodia`}</span><div className="text-sm font-semibold">{allOrigins ? 'Full multi-origin product catalog' : `Featured: ${activeHub?.categories ?? 'All Categories'}`}</div></div></div>
      <div key={`cards-${animationKey}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{visibleProducts.map((product) => { const flagUrl = countryFlagUrl(product.origin, product.originFlag); return <Card3D key={product.id} intensity={12} onClick={() => onOpenProduct(product)}><article className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md h-full"><div className="relative aspect-video bg-white dark:bg-slate-800"><img src={product.image} alt={product.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform" /><div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 dark:bg-slate-900/95 text-xs font-bold rounded-lg flex items-center gap-1.5">{flagUrl ? <img src={flagUrl} alt={`${product.origin} flag`} className="w-5 h-3.5 object-cover rounded-sm" onError={(event) => { event.currentTarget.style.display = 'none'; }} /> : <span>{product.originFlag}</span>}<span>{product.origin}</span></div></div><div className="p-6 space-y-3 text-left"><div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">{product.category}</div><h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">{product.name}</h3><p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2">{product.description}</p><div className="pt-2 flex justify-between text-xs border-t border-slate-100 dark:border-slate-800"><span>MOQ: <b>{product.moq}</b></span><span>{product.leadTime}</span></div></div></article></Card3D>; })}</div>
    </section>
  );
}
