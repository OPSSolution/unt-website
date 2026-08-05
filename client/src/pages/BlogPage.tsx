import React, { useMemo, useState } from 'react';
import type { Article } from '../types';
import { useArticles } from '../hooks/useArticles';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { ArticleGrid } from './blog/ArticleGrid';
import { BlogFilters } from './blog/BlogFilters';
import { BlogHero } from './blog/BlogHero';
import { FeaturedArticle } from './blog/FeaturedArticle';

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
    <div className="space-y-12 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      <BlogHero badge={content.badge} headline={content.headline} subheadline={content.subheadline} />
      {featuredArticle && <FeaturedArticle article={featuredArticle} onOpen={onOpenArticleModal} />}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-6">
        <BlogFilters
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
        />
        <ArticleGrid articles={filteredArticles} onOpen={onOpenArticleModal} />
      </section>
    </div>
  );
};
