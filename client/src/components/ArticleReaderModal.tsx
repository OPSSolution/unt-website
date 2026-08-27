import React, { useEffect } from 'react';
import { X, Calendar, Tag, Share2, Check, ArrowRight, Clock3, BookOpen, ShieldCheck, Eye } from 'lucide-react';
import { Article } from '../types';
import { registerArticleView } from '../hooks/useArticles';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onOpenQuoteModal,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [views, setViews] = React.useState<number>(article?.views ?? 0);

  useEffect(() => {
    if (!article) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [article, onClose]);

  useEffect(() => {
    if (!article) return;
    setViews(article.views ?? 0);
    registerArticleView(article.id).then((updated) => { if (updated !== null) setViews(updated); });
  }, [article]);

  if (!article) return null;

  const handleShare = async () => {
    const shareData = { title: article.title, text: article.excerpt, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch { /* The user can cancel the native share sheet. */ }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div 
        role="dialog" aria-modal="true" aria-label={article.title}
        className="relative w-full max-w-6xl bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden h-auto max-h-[94vh] sm:max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-slate-900 dark:text-white">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-full shadow-sm">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-1"><Clock3 className="w-3.5 h-3.5 text-emerald-600" />{article.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 text-slate-800 dark:text-slate-100 text-left bg-[linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:44px_44px]">
          {/* Editorial hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9 p-5 sm:p-7 lg:p-9 bg-white/92 dark:bg-slate-900/94 border-b border-slate-200 dark:border-slate-800 items-stretch">
            <div className="lg:col-span-6 relative min-h-[320px] overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 shadow-sm">
              {article.image ? (
                <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <span className="px-6 text-center text-sm font-medium text-slate-500 dark:text-slate-500">No cover image</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />
              <div className="absolute left-4 top-4 rounded-xl border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-800 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:text-white">
                Market Insights
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/70 bg-emerald-50/95 px-3 py-1.5 text-[11px] font-bold text-emerald-800 shadow-sm backdrop-blur dark:border-emerald-500/40 dark:bg-emerald-950/90 dark:text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Briefing
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
                  Trade Analysis
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/95 p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-950/70">
              <div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <span>{article.category}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 normal-case tracking-normal font-medium">
                  <Clock3 className="w-3.5 h-3.5" />{article.readTime}
                </span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl font-display font-black leading-tight text-slate-900 dark:text-white">
                {article.title}
              </h2>

              <p className="mt-5 text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-300">
                {article.excerpt}
              </p>

              {article.content[0] && (
                <p className="mt-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/70 px-4 py-3 text-sm sm:text-base leading-7 text-slate-700 dark:bg-emerald-950/25 dark:text-slate-200">
                  {article.content[0]}
                </p>
              )}
              </div>

              <div className="mt-7 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-md">
                  <span aria-hidden="true">{article.author.name.trim().charAt(0).toUpperCase() || 'A'}</span>
                  {article.author.avatar && (
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(event) => { event.currentTarget.style.display = 'none'; }}
                    />
                  )}
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{article.author.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{article.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:ml-0 xl:ml-auto">
                <div className="flex items-center space-x-1 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center space-x-1 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="max-w-5xl mx-auto p-6 sm:px-10 sm:py-10 space-y-9 bg-white/88 dark:bg-slate-900/88">
          {/* Article Paragraphs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 space-y-6 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-8">
            {article.content.slice(1).map((paragraph, idx) => (
              <p key={idx} className="leading-8">{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">Related Topics</span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 flex items-center space-x-1 shadow-sm">
                  <Tag className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Need Regulatory Assistance or Sourcing Advice?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Our trade team handles GDCE import filings, HACCP permits & Khmer label registration.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shrink-0 flex items-center space-x-2"
            >
              <span>Consult Trade Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
