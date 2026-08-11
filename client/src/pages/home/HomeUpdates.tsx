import { ArrowRight, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';
import type { Article, PageTab, PartnerLogo } from '../../types';

export function HomePartners({ partners }: { partners: PartnerLogo[] }) {
  const partnerCards = (copy: number) => partners.map((partner) => (
    <article
      key={`${partner.id}-${copy}`}
      className="w-48 sm:w-64 min-h-28 sm:min-h-32 p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-md shrink-0"
    >
      <div className="relative h-10 sm:h-14 mb-2 sm:mb-3 flex items-center justify-center overflow-hidden">
        <div className="font-display text-base sm:text-xl font-black text-slate-900 dark:text-white">
          {partner.logoText || partner.name}
        </div>
        {partner.image && (
          <img
            src={partner.image}
            alt={`${partner.name} logo`}
            className="absolute inset-0 w-full h-full object-contain bg-slate-50 dark:bg-slate-900"
            loading="lazy"
            onError={(event) => { event.currentTarget.style.display = 'none'; }}
          />
        )}
      </div>
      <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">{partner.name}</h3>
      <div className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold">{partner.category}</div>
      <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">✦ {partner.country}</div>
    </article>
  ));

  return (
    <section className="bg-white dark:bg-[#0c1322] border-y border-slate-200 dark:border-slate-800 py-8 sm:py-12 overflow-hidden">
      <ScrollReveal animation="up">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center flex items-center justify-center space-x-2 px-4">
            <span className="live-pulse-dot" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider sm:tracking-widest">
              Trusted Global Manufacturing Partners & Supplier Alliances
            </span>
          </div>
          <div className="marquee-mask overflow-hidden py-2">
            <div className="marquee-track flex w-max">
              <div className="flex gap-3 sm:gap-5 pr-3 sm:pr-5">{partnerCards(0)}</div>
              <div className="flex gap-3 sm:gap-5 pr-3 sm:pr-5" aria-hidden="true">{partnerCards(1)}</div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

interface InsightsProps {
  articles: Article[];
  content: Record<string, string>;
  onNavigate: (tab: PageTab) => void;
  onOpenArticle: (article: Article) => void;
}

export function HomeInsights({ articles, content, onNavigate, onOpenArticle }: InsightsProps) {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-6 sm:space-y-8">
      <ScrollReveal animation="up"><div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4"><div className="text-left"><span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.badge ?? 'Market Intelligence'}</span><h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-2"><ScrollTextReveal text={content.heading ?? 'Latest Regulatory & Trade Insights'} mode="codepen-title" /></h2></div><button onClick={() => onNavigate('blog')} className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline"><span>{content.cta ?? 'View All Articles'}</span><ChevronRight className="w-4 h-4" /></button></div></ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">{articles.slice(0, 3).map((article, index) => <ScrollReveal key={article.id} animation="up" delay={index * 150}><button onClick={() => onOpenArticle(article)} className="group w-full cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-md text-left h-full"><div className="relative aspect-video rounded-2xl overflow-hidden bg-white dark:bg-slate-800"><img src={article.image} alt={article.title} className="w-full h-full object-contain p-3 group-hover:scale-[1.02] transition-transform" /><div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full">{article.category}</div></div><div className="space-y-2 mt-4"><div className="text-xs text-slate-500">{article.date} • {article.readTime}</div><h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white leading-snug">{article.title}</h3><p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2">{article.excerpt}</p></div><div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400"><span>Read Full Analysis</span><ArrowRight className="w-4 h-4" /></div></button></ScrollReveal>)}</div>
    </section>
  );
}
