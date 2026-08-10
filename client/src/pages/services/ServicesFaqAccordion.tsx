import React, { useState, useMemo } from 'react';
import { HelpCircle, Search, X, ChevronDown, RefreshCw, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Card3D } from '../../components/Card3D';
import { faqList } from './servicesData';

interface ServicesFaqAccordionProps {
  delay?: number;
  content: Record<string, any>;
}

export const ServicesFaqAccordion: React.FC<ServicesFaqAccordionProps> = ({ delay = 0, content }) => {
  const [faqCategory, setFaqCategory] = useState<'all' | 'sourcing' | 'customs' | 'training' | 'delivery'>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = Array.isArray(content.faq_items) && content.faq_items.length ? content.faq_items : faqList;
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item: any) => {
      const matchCat = faqCategory === 'all' || item.category === faqCategory;
      const matchSearch = faqSearch === '' ||
        item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.a.toLowerCase().includes(faqSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [faqs, faqCategory, faqSearch]);

  return (
    <section className="space-y-6">

      {/* ─── Section Header ─── */}
      <ScrollReveal animation="up" delay={delay}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
            {content.faq_badge ?? 'Frequently Asked Questions'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {content.faq_title ?? 'Got Questions About'} <span className="text-emerald-600 dark:text-emerald-400">{content.faq_highlight ?? 'UNT Services?'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {content.faq_desc ?? 'Search or select a category below for instant answers regarding custom sourcing, GDCE customs clearance, local stock delivery, and sales workshops.'}
          </p>
        </div>
      </ScrollReveal>

      {/* ─── Search & Category Filters Row ─── */}
      <ScrollReveal animation="up" delay={delay + 60}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder={content.faq_search_placeholder ?? 'Search FAQs (e.g. GDCE, MOQ, delivery, training)...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
            />
            {faqSearch && (
              <button onClick={() => setFaqSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: content.faq_tab_all ?? 'All FAQs' },
              { id: 'customs', label: content.faq_tab_customs ?? 'GDCE & Customs' },
              { id: 'sourcing', label: content.faq_tab_sourcing ?? 'Sourcing & MOQs' },
              { id: 'delivery', label: content.faq_tab_delivery ?? 'Local Delivery' },
              { id: 'training', label: content.faq_tab_training ?? 'Sales Training' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFaqCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${faqCategory === cat.id
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500 shadow-sm'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-emerald-500'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ─── FAQ Cards List ─── */}
      <ScrollReveal animation="up" delay={delay + 120}>
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <Card3D key={idx} intensity={4}>
                  <div
                    style={{ animationDelay: `${idx * 50}ms` }}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden animate-fade-in ${isOpen
                        ? 'bg-white dark:bg-emerald-950/40 border-emerald-500/40 shadow-md'
                        : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-emerald-500/50'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4"
                    >
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-transform ${isOpen ? 'rotate-180 bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-emerald-500/10 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Card3D>
              );
            })
          ) : (
            <div className="p-8 text-center space-y-3 bg-white dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/20">
              <p className="text-xs text-slate-500 dark:text-slate-400">No matching FAQs found for "{faqSearch}".</p>
              <button
                onClick={() => { setFaqSearch(''); setFaqCategory('all'); }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 font-bold text-xs flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>

    </section>
  );
};
