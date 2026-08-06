import { ArrowRight, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import type { Article, PageTab, PartnerLogo } from '../../types';

export function HomePartners({ partners }: { partners: PartnerLogo[] }) {
  return (
    <section className="bg-white dark:bg-[#0c1322] border-y border-slate-200 dark:border-slate-800 py-12 overflow-hidden">
      <ScrollReveal animation="up">
        <div className="space-y-6">
          <div className="text-center flex items-center justify-center space-x-2">
            <span className="live-pulse-dot" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Trusted Global Manufacturing Partners & Supplier Alliances
            </span>
          </div>
          <div className="marquee-mask overflow-hidden py-2">
            <div className="marquee-track flex space-x-5 w-max">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <article
                  key={`${partner.id}-${index}`}
                  className="w-64 min-h-32 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-md shrink-0"
                >
                  <div className="h-14 mb-3 flex items-center justify-center">
                    <div className="font-display text-xl font-black text-slate-900 dark:text-white">
                      {partner.logoText || partner.name}
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{partner.name}</h3>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{partner.category}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">✦ {partner.country}</div>
                </article>
              ))}
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
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
      <ScrollReveal animation="up"><div className="flex items-end justify-between"><div className="text-left"><span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.badge ?? 'Market Intelligence'}</span><h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">{content.heading ?? 'Latest Regulatory & Trade Insights'}</h2></div><button onClick={() => onNavigate('blog')} className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center"><span>{content.cta ?? 'View All Articles'}</span><ChevronRight className="w-4 h-4" /></button></div></ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{articles.slice(0, 3).map((article, index) => <ScrollReveal key={article.id} animation="up" delay={index * 150}><button onClick={() => onOpenArticle(article)} className="group w-full cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md text-left h-full"><div className="relative aspect-video rounded-2xl overflow-hidden"><img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /><div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full">{article.category}</div></div><div className="space-y-2 mt-4"><div className="text-xs text-slate-500">{article.date} • {article.readTime}</div><h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">{article.title}</h3><p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2">{article.excerpt}</p></div><div className="pt-4 mt-4 border-t flex justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400"><span>Read Full Analysis</span><ArrowRight className="w-4 h-4" /></div></button></ScrollReveal>)}</div>
    </section>
  );
}
