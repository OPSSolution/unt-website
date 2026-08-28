import React, { useState, useEffect } from 'react';
import { PageTab, Product, Article } from './types';
import { useTheme } from './hooks/useTheme';
import { AppPageContent } from './components/AppPageContent';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { registerSiteVisit } from './hooks/useSiteStats';
import { ViewCounterWidget } from './components/ViewCounterWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string>('');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => { registerSiteVisit(); }, []);

  // Reset immediately when the rendered page changes. Smooth scrolling here
  // briefly exposes the new page at the previous page's scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  const handleOpenQuoteModal = (productName?: string) => {
    if (productName) {
      setPreselectedProduct(productName);
    } else {
      setPreselectedProduct('');
    }
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        <AppPageContent
          activeTab={activeTab}
          onNavigate={setActiveTab}
          onOpenQuote={handleOpenQuoteModal}
          onOpenProduct={setSelectedProduct}
          onOpenArticle={setSelectedArticle}
        />
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={preselectedProduct}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenQuoteWithProduct={(prodName) => handleOpenQuoteModal(prodName)}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      <ViewCounterWidget />
    </div>
  );
}
