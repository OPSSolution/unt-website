import type { Article, PageTab, Product } from '../types';
import { AboutPage } from '../pages/AboutPage';
import { BlogPage } from '../pages/BlogPage';
import { ContactPage } from '../pages/ContactPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ServicesPage } from '../pages/ServicesPage';
import { TrainingPage } from '../pages/TrainingPage';

interface Props {
  activeTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onOpenQuote: (productName?: string) => void;
  onOpenProduct: (product: Product) => void;
  onOpenArticle: (article: Article) => void;
}

export function AppPageContent({ activeTab, onNavigate, onOpenQuote, onOpenProduct, onOpenArticle }: Props) {
  switch (activeTab) {
    case 'home':
      return <HomePage setActiveTab={onNavigate} onOpenQuoteModal={() => onOpenQuote()} onOpenProductModal={onOpenProduct} onOpenArticleModal={onOpenArticle} />;
    case 'about':
      return <AboutPage onOpenQuoteModal={() => onOpenQuote()} onOpenProduct={onOpenProduct} />;
    case 'services':
      return <ServicesPage onOpenQuoteModal={() => onOpenQuote()} />;
    case 'products':
      return <ProductsPage onOpenProductModal={onOpenProduct} onOpenQuoteWithProduct={onOpenQuote} />;
    case 'training':
      return <TrainingPage onOpenQuoteModal={() => onOpenQuote()} />;
    case 'blog':
      return <BlogPage onOpenArticleModal={onOpenArticle} />;
    case 'contact':
      return <ContactPage />;
  }
}
