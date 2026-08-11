import { CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Product } from '../../types';
import type { CSSProperties } from 'react';
import { TRADE_HUBS } from '../../components/ThreeBackground';

export function AboutHero({ content }: { content: Record<string, any> }) {
  const { language } = useLanguage();
  const isKm = language === 'km';

  return (
    <section className="relative z-10 py-20 lg:py-24 bg-transparent border-b border-emerald-500/10 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md animate-gentle-float">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>{content.badge || (isKm ? 'ក្រុមហ៊ុន Unique Noble Trading Co., Ltd.' : 'Unique Noble Trading Co., Ltd.')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-5xl mx-auto">
            <ScrollTextReveal text={content.headline || (isKm ? 'ដៃគូពាណិជ្ជកម្មពិភពលោកដែលលោកអ្នកទុកចិត្ត' : 'Your Trusted Global Trade & Sourcing Partner')} mode="codepen-title" />
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            {content.subheadline || (isKm ? 'UNT ភ្ជាប់អ្នកទិញកម្ពុជាជាមួយផលិតផលគុណភាពពីបរទេស និងជួយអាជីវកម្មស្វែងរកទំនិញដែលត្រូវការ។' : 'UNT connects Cambodian buyers with quality products from abroad, helps businesses source what they need, and trains sales teams.')}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

const MISSION_CHIPS = ['Factory Audits', 'OEM Manufacturing', 'Customs Brokerage', 'Sales Training', 'Cold Chain Logistics'];

export function AboutMission({ content, products, onOpenProduct }: { content: Record<string, any>; products: Product[]; onOpenProduct: (product: Product) => void }) {
  const { language } = useLanguage();
  const isKm = language === 'km';

  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-left">
      <ScrollReveal animation="right">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            {content.mission_badge || (isKm ? 'បេសកកម្មរបស់យើង' : 'OUR MISSION & CORE FOCUS')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 dark:text-white leading-tight">
            {content.mission_heading || (isKm ? 'ការត្រួសត្រាយផ្លូវនៃការរីកចម្រើនពាណិជ្ជកម្ម' : 'Pioneering Commercial Growth Across ASEAN')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{content.mission_p1 || (isKm ? 'បេសកកម្មរបស់យើងគឺសម្រួលដល់ការពង្រីកអាជីវកម្មរបស់អ្នក។' : 'Our mission is to simplify global trade for Cambodian enterprises.')}</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{content.mission_p2 || (isKm ? 'យើងផ្តល់ជូននូវដំណោះស្រាយគ្រប់ជ្រុងជ្រោយសម្រាប់ការនាំចូលទំនិញ។' : 'We deliver end-to-end sourcing, logistics, and supply chain solutions.')}</p>
          {language === 'en' && <div className="flex flex-wrap gap-2 pt-2">
            {MISSION_CHIPS.map((chip, idx) => (
              <span
                key={chip}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="animate-fade-in inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:border-emerald-500 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{chip}</span>
              </span>
            ))}
          </div>}
        </div>
      </ScrollReveal>

      <ScrollReveal animation="left" delay={200}>
        <div className="catalog-wheel-shell about-product-wheel">
          <div className="catalog-wheel" aria-label="Rotating product showcase">
            <div className="catalog-wheel-rings" aria-hidden="true" />
            <div className="catalog-orbit">
              {products.slice(0, 8).map((product, index, wheelProducts) => {
                const angle = (360 / wheelProducts.length) * index - 90;
                // Product origins can be translated (or intentionally blank) in
                // Khmer, while the flag is shared across languages. Match either
                // value so the orbit badge remains visible in both modes.
                const flagHub = TRADE_HUBS.find((hub) =>
                  hub.name === product.origin || hub.flag === product.originFlag
                );
                const flagUrl = flagHub?.flagUrl;
                const flagEmoji = flagHub?.flag || product.originFlag;
                return <div key={product.id} className="catalog-wheel-item" style={{ '--orbit-angle': `${angle}deg`, '--counter-angle': `${-angle}deg` } as CSSProperties}>
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="catalog-wheel-product"
                    aria-label={`View ${product.name}`}
                  >
                    <img src={product.image} alt={product.name} />
                    {(flagUrl || flagEmoji) && (
                      <span aria-label={product.origin || 'Product origin'}>
                        <b aria-hidden="true">{flagEmoji}</b>
                        {flagUrl && <img src={flagUrl} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} />}
                      </span>
                    )}
                  </button>
                </div>;
              })}
            </div>
            <div className="catalog-wheel-center">
              <div className="catalog-wheel-logo"><img src="/images/logos/image.png" alt="Unique Noble Trading" /></div>
              <p>UNT Wholesale</p>
              <strong>Product Showcase</strong>
              <span className="catalog-wheel-center-note">Click a product to explore</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
