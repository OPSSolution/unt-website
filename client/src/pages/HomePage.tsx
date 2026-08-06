import React, { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { useHeroContent } from '../hooks/useHeroContent';
import { useHeroStats } from '../hooks/useHeroStats';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { usePartners } from '../hooks/usePartners';
import { useProducts } from '../hooks/useProducts';
import { useTradeHubs } from '../hooks/useTradeHubs';
import type { Article, PageTab, Product } from '../types';
import { HomeHero } from './home/HomeHero';
import { HomeHeritage } from './home/HomeHeritage';
import { HomeOem } from './home/HomeOem';
import { HomeProducts } from './home/HomeProducts';
import { HomeSolutions } from './home/HomeSolutions';
import { HomeInsights, HomePartners } from './home/HomeUpdates';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
  onOpenProductModal: (product: Product) => void;
  onOpenArticleModal: (article: Article) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onOpenQuoteModal, onOpenProductModal, onOpenArticleModal }) => {
  const hubs = useTradeHubs();
  const hero = useHeroContent();
  const heroStats = useHeroStats();
  const sections = useHomepageSections();
  const products = useProducts();
  const articles = useArticles();
  const partners = usePartners();
  const [selectedOrigin, setSelectedOrigin] = useState('all');

  return (
    <div className="space-y-20 pb-16 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh stripe-mesh-glow">
      <HomeHero hero={hero} stats={heroStats} hubs={hubs} selectedOrigin={selectedOrigin} globeLabel={sections.hero_globe?.globe_label} globeAllLabel={sections.hero_globe?.globe_all_label} onSelectOrigin={setSelectedOrigin} onNavigate={setActiveTab} onQuote={onOpenQuoteModal} />
      <HomeSolutions onNavigate={setActiveTab} />
      <HomeHeritage />
      <HomeProducts hubs={hubs} products={products} content={sections.products_section ?? {}} onSelectOrigin={setSelectedOrigin} onNavigate={setActiveTab} onOpenProduct={onOpenProductModal} />
      <HomeOem onQuote={onOpenQuoteModal} />
      <HomePartners partners={partners} />
      <HomeInsights articles={articles} content={sections.insights_section ?? {}} onNavigate={setActiveTab} onOpenArticle={onOpenArticleModal} />
    </div>
  );
};
