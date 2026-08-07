import React, { useMemo, useState } from 'react';
import type { Article } from '../types';
import { useArticles } from '../hooks/useArticles';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { BlogHero } from './blog/BlogHero';
import { FeaturedArticle } from './blog/FeaturedArticle';
import { BlogFilters } from './blog/BlogFilters';
import { ArticleGrid } from './blog/ArticleGrid';
import { PageAnimatedBackground } from '../components/PageAnimatedBackground';

interface BlogPageProps {
  onOpenArticleModal: (article: Article) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenArticleModal }) => {
  const articles = useArticles();
  const content = useHomepageSections().blog_page ?? {};
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const featuredArticle = articles.find((article) => article.featured) ?? articles[0];

  const filteredArticles = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch = normalizedQuery === '' || [
        article.title,
        article.excerpt,
        ...article.tags,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="relative isolate space-y-12 pb-24 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden min-h-screen">
      <PageAnimatedBackground />
      {/* Upgraded Hero Section with CodePen Title Reveal & Uniform 3D Hex-Grid Canvas */}
      <BlogHero badge={content.badge} headline={content.headline} subheadline={content.subheadline} />

      {/* Main Content Area */}
      <section className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-10">
        {/* Search & Category Filter Toolbar */}
        <BlogFilters
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          totalResultsCount={filteredArticles.length}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
        />

        {/* Featured Trade Analysis Article */}
        {featuredArticle && <FeaturedArticle article={featuredArticle} onOpen={onOpenArticleModal} />}

        {/* Article Cards Grid */}
        <ArticleGrid articles={filteredArticles} onOpen={onOpenArticleModal} />
      </section>
    </div>
  );
};
