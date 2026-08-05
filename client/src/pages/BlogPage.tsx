import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { useArticles } from '../hooks/useArticles';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { Search, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card3D } from '../components/Card3D';

interface BlogPageProps {
  onOpenArticleModal: (article: Article) => void;
  onOpenQuoteModal: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenArticleModal }) => {
  const ARTICLES = useArticles();
  const sections = useHomepageSections();
  const data = sections.blog_page ?? {};
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Regulatory Updates', 'OEM Case Studies', 'Supply Chain', 'Retail Strategy'];

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      {/* 1. Hero */}
      <section className="relative py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <ScrollReveal animation="up">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
              {data.badge ?? 'Cambodia & ASEAN Trade Intelligence'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">
              {data.headline
                ? data.headline
                : <>Market Insights &amp; <span className="emerald-gradient-text">Regulatory News</span></>}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              {data.subheadline ?? 'Stay informed on GDCE customs updates, Ministry of Commerce regulations, regional FMCG trends, and OEM private label innovations.'}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Featured Article Banner */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => onOpenArticleModal(featuredArticle)}
            className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all grid grid-cols-1 lg:grid-cols-2 items-center text-left"
          >
            <div className="relative aspect-video lg:aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-md">
                Featured Analysis
              </div>
            </div>

            <div className="p-8 space-y-4 text-slate-900 dark:text-white">
              <div className="flex items-center space-x-3 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>{featuredArticle.category}</span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center space-x-3 pt-2">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{featuredArticle.author.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{featuredArticle.author.role}</div>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>Read Full Briefing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <input
              type="text"
              placeholder="Search trade reports, customs guides, or supply chain analysis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card3D key={article.id} intensity={12} onClick={() => onOpenArticleModal(article)}>
              <div
                className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between text-left h-full"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-md">
                      {article.category}
                    </div>
                    <div className="absolute top-3 right-3 live-pulse-badge bg-slate-900/90 backdrop-blur-md border-emerald-500/40 text-emerald-300">
                      <span className="live-pulse-dot" />
                      <span>Verified Briefing</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-3">
                  <span>Read Trade Analysis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>
    </div>
  );
};
