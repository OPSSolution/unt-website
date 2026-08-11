import { ArrowRight, Globe, Sparkles } from 'lucide-react';
import { ThreeBackground, type TradeHub } from '../../components/ThreeBackground';
import { HeroAnimatedCounter } from '../../components/HeroAnimatedCounter';
import type { HeroContent } from '../../hooks/useHeroContent';
import type { HeroStat } from '../../hooks/useHeroStats';
import type { PageTab } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  hero: HeroContent | null;
  stats: HeroStat[];
  hubs: TradeHub[];
  selectedOrigin: string;
  globeLabel?: string;
  globeAllLabel?: string;
  onSelectOrigin: (origin: string) => void;
  onNavigate: (tab: PageTab) => void;
  onQuote: () => void;
}

const FALLBACK_STATS: HeroStat[] = [
  { id: 'volume', value: '$50M+', label: 'Annual Trade Volume', sort_order: 1 },
  { id: 'factories', value: '500+', label: 'Audited Factories', sort_order: 2 },
  { id: 'origins', value: '15+', label: 'Global Trade Origins', sort_order: 3 },
  { id: 'clearance', value: '99.4%', label: 'On-Time Customs Clearance', sort_order: 4 },
];

export function HomeHero({ hero, stats, hubs, selectedOrigin, globeLabel, globeAllLabel, onSelectOrigin, onNavigate, onQuote }: Props) {
  const { language } = useLanguage();
  const selectedHub = hubs.find((hub) => hub.id === selectedOrigin);
  const visibleStats = stats.length > 0 ? stats : FALLBACK_STATS;
  return (
    <section className="relative py-10 sm:py-16 lg:py-28 flex items-center justify-center overflow-hidden bg-white/80 dark:bg-[#0B0F17]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <ThreeBackground activeOrigin={selectedOrigin} hubs={hubs} />
      <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/20 via-cyan-500/10 to-transparent" /></div>
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/10 max-w-full truncate">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 animate-pulse shrink-0" /><span className="truncate">{hero?.badge_text ?? "Cambodia's Premier Trading & Sourcing Ecosystem"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black text-slate-900 dark:text-white tracking-tight max-w-5xl mx-auto leading-[1.15] sm:leading-[1.1]">{hero?.headline ?? 'Your Trusted Sourcing Partner'}</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">{hero?.subtitle ?? 'UNT connects Cambodian buyers with quality products from abroad, helps businesses source what they need, and trains sales teams to sell better.'}</p>
        <div className="pt-2 max-w-4xl mx-auto space-y-4">
          <div className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-center space-x-2"><Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 animate-spin shrink-0" /><span className="text-center">{globeLabel ?? (language === 'en' ? 'Interactive 3D Trade Hub Focus: Select Origin to Rotate 3D Globe' : '')}</span></div>
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg max-w-full overflow-x-auto scrollbar-none">
              <OriginButton active={selectedOrigin === 'all'} onClick={() => onSelectOrigin('all')} title={globeAllLabel || (language === 'km' ? 'បណ្តាញអាស៊ានសកល' : 'Global ASEAN Network')}>
                <Globe className={`w-4 h-4 shrink-0 ${selectedOrigin === 'all' ? 'text-white' : 'text-emerald-500'}`} />
              </OriginButton>
              {hubs.map((hub) => (
                <OriginButton key={hub.id} active={selectedOrigin === hub.id} onClick={() => onSelectOrigin(hub.id)} title={hub.name}>
                  <img src={hub.flagUrl} alt={hub.name} className="w-5 h-3.5 object-cover rounded-sm shrink-0" />
                </OriginButton>
              ))}
            </div>
          </div>
          {selectedHub && <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white text-left shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-500/30"><div><div className="text-emerald-400 font-bold text-xs">{selectedHub.name} ➜ {language === 'km' ? 'ភ្នំពេញ កម្ពុជា' : 'Phnom Penh, Cambodia'}</div><div className="text-sm font-semibold">{language === 'km' ? 'ពាណិជ្ជកម្មចម្បង' : 'Primary Trade'}: <span className="text-emerald-200">{selectedHub.categories}</span></div></div><div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 text-xs w-full sm:w-auto"><Metric label={language === 'km' ? 'ល្បឿនដឹកជញ្ជូន' : 'Logistics Speed'} value={selectedHub.leadTime} /><Metric label={language === 'km' ? 'ការបញ្ជាទិញអប្បបរមា' : 'Min. Wholesale Order'} value={selectedHub.moq} /><button onClick={onQuote} className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-center">{language === 'km' ? 'ស្នើសុំតម្លៃ' : 'Get Quote'}</button></div></div>}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"><button onClick={() => onNavigate('services')} className="btn-shine group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-bold shadow-xl flex items-center justify-center space-x-2"><span>{hero?.cta_primary ?? 'Explore Sourcing Solutions'}</span><ArrowRight className="w-5 h-5" /></button><button onClick={onQuote} className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-slate-900 text-white font-bold border border-slate-700">{hero?.cta_secondary ?? 'Request B2B Quote'}</button></div>
        <HeroAnimatedCounter stats={visibleStats} onQuote={onQuote} className="pt-6 sm:pt-10 max-w-5xl mx-auto" />
      </div>
    </section>
  );
}

function OriginButton({ active, onClick, title, children }: { active: boolean; onClick: () => void; title?: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full text-xs font-bold transition-all flex items-center justify-center shrink-0 ${active
          ? 'bg-emerald-600 text-white shadow-md scale-110 ring-2 ring-emerald-400/50'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
    >
      {children}
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20"><span className="text-emerald-300 font-semibold block text-[10px]">{label}</span><span className="font-bold">{value}</span></div>;
}
