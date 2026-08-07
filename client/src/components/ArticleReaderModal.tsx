import React, { useEffect } from 'react';
import { X, Calendar, Tag, Share2, Check, ArrowRight, Clock3 } from 'lucide-react';
import { Article } from '../types';

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

  useEffect(() => {
    if (!article) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [article, onClose]);

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
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div 
        role="dialog" aria-modal="true" aria-label={article.title}
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-slate-900 dark:text-white">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" />{article.readTime}</span>
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
        <div className="overflow-y-auto flex-1 text-slate-800 dark:text-slate-100 text-left">
          <div className="relative aspect-[16/7] min-h-56 overflow-hidden bg-slate-950">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black leading-tight max-w-4xl">{article.title}</h2>
            </div>
          </div>
          <div className="max-w-3xl mx-auto p-6 sm:p-10 space-y-7">
          {/* Article Title & Meta */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{article.author.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{article.author.role}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-auto">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-6 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-8">
            <p className="text-slate-900 dark:text-white font-semibold text-lg sm:text-xl leading-8 border-l-4 border-emerald-600 dark:border-emerald-400 pl-5 py-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-r-2xl">
              {article.excerpt}
            </p>

            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-8">{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">Related Topics</span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-1">
                  <Tag className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
