import React from 'react';
import { X, Calendar, Tag, Share2, Check, ArrowRight } from 'lucide-react';
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

  if (!article) return null;

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-white dark:bg-slate-900 p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-slate-900 dark:text-white">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">{article.readTime}</span>
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100 text-left">
          {/* Article Title & Meta */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
              {article.title}
            </h2>

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

          {/* Hero Banner Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-800">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p className="text-slate-900 dark:text-white font-semibold text-base sm:text-lg border-l-4 border-emerald-600 dark:border-emerald-400 pl-4 py-1 bg-emerald-50/50 dark:bg-emerald-950/40 rounded-r-xl">
              {article.excerpt}
            </p>

            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
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
  );
};
