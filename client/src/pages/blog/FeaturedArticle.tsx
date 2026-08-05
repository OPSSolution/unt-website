import { ArrowRight } from 'lucide-react';
import type { Article } from '../../types';

interface Props {
  article: Article;
  onOpen: (article: Article) => void;
}

export function FeaturedArticle({ article, onOpen }: Props) {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
      <button
        type="button"
        onClick={() => onOpen(article)}
        className="group w-full cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all grid grid-cols-1 lg:grid-cols-2 items-center text-left"
      >
        <div className="relative aspect-video lg:aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-md">Featured Analysis</div>
        </div>
        <div className="p-8 space-y-4 text-slate-900 dark:text-white">
          <div className="flex items-center space-x-3 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
            <span>{article.category}</span><span>•</span><span>{article.date}</span><span>•</span><span>{article.readTime}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight">{article.title}</h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center space-x-3 pt-2">
            <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700" />
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">{article.author.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{article.author.role}</div>
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <span>Read Full Briefing</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </button>
    </section>
  );
}
