import React, { useState } from 'react';
import { PageTab, Product, Article } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { TrainingPage } from './pages/TrainingPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string>('');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleOpenQuoteModal = (productName?: string) => {
    if (productName) {
      setPreselectedProduct(productName);
    } else {
      setPreselectedProduct('');
    }
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
            onOpenProductModal={(product) => setSelectedProduct(product)}
            onOpenArticleModal={(article) => setSelectedArticle(article)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            setActiveTab={setActiveTab}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            setActiveTab={setActiveTab}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            onOpenProductModal={(product) => setSelectedProduct(product)}
            onOpenQuoteWithProduct={(prodName) => handleOpenQuoteModal(prodName)}
          />
        )}

        {activeTab === 'training' && (
          <TrainingPage
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activeTab === 'blog' && (
          <BlogPage
            onOpenArticleModal={(article) => setSelectedArticle(article)}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activeTab === 'contact' && <ContactPage />}
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
    </div>
  );
}
