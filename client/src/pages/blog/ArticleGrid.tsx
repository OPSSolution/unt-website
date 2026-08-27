import { ArrowRight, Eye } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import type { Article } from '../../types';

interface Props {
  articles: Article[];
  onOpen: (article: Article) => void;
  content: Record<string, string>;
}

export function ArticleGrid({ articles, onOpen, content }: Props) {
  if (articles.length === 0) {
    return (
      <div className="py-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
        {content.empty_message ?? 'No trade insights match your search.'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {articles.map((article) => (
        <Card3D key={article.id} intensity={10} onClick={() => onOpen(article)}>
          <article className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white text-left shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950">
                {article.image ? (
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-500">No cover image</div>
                )}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/10 pointer-events-none dark:from-slate-950/60 dark:to-slate-950/40" />
                <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-white">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] uppercase tracking-wider text-slate-700 dark:text-slate-200">{article.category}</span>
                </div>
                <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-500/40 dark:bg-emerald-950/90 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span>{content.card_verified ?? 'Verified Briefing'}</span>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <span className="inline-block rounded-md border border-emerald-200/50 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/60 dark:text-emerald-400">
                  Market Insights
                </span>
                <h3 className="min-h-[3.25rem] text-base font-display font-bold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                  {article.title}
                </h3>
                <p className="min-h-[3rem] text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-300">
                  {article.excerpt}
                </p>

                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-xs dark:border-slate-800/80">
                  <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-2 dark:border-slate-800/80 dark:bg-slate-800/50">
                    <span className="block truncate text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Published</span>
                    <strong className="block truncate text-[11px] font-bold text-slate-900 dark:text-white" title={article.date}>{article.date}</strong>
                  </div>
                  <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-2 dark:border-slate-800/80 dark:bg-slate-800/50">
                    <span className="block truncate text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Read Time</span>
                    <strong className="block truncate text-[11px] font-bold text-slate-900 dark:text-white" title={article.readTime}>{article.readTime}</strong>
                  </div>
                  <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-2 text-right dark:border-slate-800/80 dark:bg-slate-800/50">
                    <span className="block truncate text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Views</span>
                    <strong className="flex items-center justify-end gap-1 truncate text-[11px] font-bold text-slate-900 dark:text-white" title={`${article.views ?? 0} views`}>
                      <Eye className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      {(article.views ?? 0).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-5 mb-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-emerald-700 dark:border-slate-800 dark:text-emerald-400">
              <span>{content.card_read ?? 'Read Trade Analysis'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        </Card3D>
      ))}
    </div>
  );
}
