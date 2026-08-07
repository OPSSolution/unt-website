import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Clock, ShieldCheck, Download } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import type { Article } from '../../types';

interface Props {
  article: Article;
  onOpen: (article: Article) => void;
  content: Record<string, string>;
}

export function FeaturedArticle({ article, onOpen, content }: Props) {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 my-6">
      <Card3D intensity={10} onClick={() => onOpen(article)}>
        <article className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch text-left">
          
          {/* Image Thumbnail Column */}
          <div className="lg:col-span-6 relative aspect-video lg:aspect-auto overflow-hidden bg-slate-950 min-h-[300px]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.featured_badge ?? 'Featured Trade Analysis'}</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
              <span className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{content.featured_verified ?? 'GDCE Verified Briefing'}</span>
              </span>
            </div>
          </div>

          {/* Article Info Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 text-slate-900 dark:text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                {article.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Author Meta & Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-md"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{article.author.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{article.author.role}</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-all">
                <span>{content.featured_read ?? 'Read Full Briefing'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </article>
      </Card3D>
    </section>
  );
}
