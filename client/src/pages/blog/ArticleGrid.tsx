import { ArrowRight } from 'lucide-react';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card3D key={article.id} intensity={12} onClick={() => onOpen(article)}>
          <article className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between text-left h-full">
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                {article.image ? (
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-500">No cover image</div>
                )}
                <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-md">{article.category}</div>
                <div className="absolute top-3 right-3 live-pulse-badge bg-slate-900/90 backdrop-blur-md border-emerald-500/40 text-emerald-300">
                  <span className="live-pulse-dot" /><span>{content.card_verified ?? 'Verified Briefing'}</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2"><span>{article.date}</span><span>•</span><span>{article.readTime}</span></div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">{article.excerpt}</p>
              </div>
            </div>
            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-3">
              <span>{content.card_read ?? 'Read Trade Analysis'}</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        </Card3D>
      ))}
    </div>
  );
}
