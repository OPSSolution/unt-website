import { ArrowRight, ChevronRight } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {articles.slice(0, 3).map((article, index) => (
          <ScrollReveal key={article.id} animation="up" delay={index * 150}>
            <Card3D intensity={10} onClick={() => onOpenArticle(article)}>
              <article className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white text-left shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50">
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/10 pointer-events-none dark:from-slate-950/60 dark:to-slate-950/40" />
                  <img
                    src={article.image}
                    alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                    <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-white">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] uppercase tracking-wider text-slate-700 dark:text-slate-200">Market Intelligence</span>
                    </div>

                    <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50/95 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-500/40 dark:bg-emerald-950/90 dark:text-emerald-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      <span>{content.card_verified ?? 'Verified Briefing'}</span>
                    </div>
                  </div>

                  <div className="space-y-3 p-5">
                    <span className="inline-block rounded-md border border-emerald-200/50 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/60 dark:text-emerald-400">
                      {article.category}
                    </span>
                    <h3 className="min-h-[3.25rem] text-base font-display font-bold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {article.title}
                    </h3>
                    <p className="min-h-[3rem] text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-300">
                      {article.excerpt}
                    </p>

                    <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs dark:border-slate-800/80">
                      <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-2 dark:border-slate-800/80 dark:bg-slate-800/50">
                        <span className="block truncate text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Published
                        </span>
                        <strong className="block truncate text-[11px] font-bold text-slate-900 dark:text-white" title={article.date}>
                          {article.date}
                        </strong>
                      </div>
                      <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-2 text-right dark:border-slate-800/80 dark:bg-slate-800/50">
                        <span className="block truncate text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Read Time
                        </span>
                        <strong className="block truncate text-[11px] font-bold text-slate-900 dark:text-white" title={article.readTime}>
                          {article.readTime}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-5 mb-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-emerald-700 dark:border-slate-800 dark:text-emerald-400">
                  <span>{content.card_read ?? 'Read Trade Analysis'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </Card3D>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
