import React, { useState } from 'react';
import { Sidebar, type AdminPage } from './Sidebar';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useTheme } from './ThemeContext';
import { DashboardPage } from '../pages/DashboardPage';
import { HomepageEditor } from '../pages/HomepageEditor';
import { AboutEditor } from '../pages/AboutEditor';
import { ServicesEditor } from '../pages/ServicesEditor';
import { ProductsManager } from '../pages/ProductsManager';
import { ProductsPageEditor } from '../pages/ProductsPageEditor';
import { PartnersManager } from '../pages/PartnersManager';
import { TrainingEditor } from '../pages/TrainingEditor';
import { ArticlesManager } from '../pages/ArticlesManager';
import { BlogEditor } from '../pages/BlogEditor';
import { TradeHubsEditor } from '../pages/TradeHubsEditor';
import { ContactEditor } from '../pages/ContactEditor';
import { NavbarFooterEditor } from '../pages/NavbarFooterEditor';
import { QuotesManager } from '../pages/QuotesManager';
import { Menu, Sun, Moon } from 'lucide-react';
import { LanguageToggle, useLanguage } from '../../i18n/LanguageContext';

const PAGE_LABELS: Record<AdminPage, string> = {
  dashboard: 'Dashboard',
  homepage: 'Homepage Editor',
  trade_hubs: 'World Map Hubs',
  about: 'About Page',
  services: 'Services Page',
  products: 'Products',
  products_page: 'Catalog Page Header',
  partners: 'Partners',
  training: 'Training Page',
  articles: 'Articles',
  blog: 'Blog Page Header',
  contact: 'Contact Page',
  navbar_footer: 'Navbar & Footer',
  quotes: 'Quote Requests',
};

export function Layout() {
  const [page, setPage] = useState<AdminPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAdminAuth();
  const { theme, toggle } = useTheme();
  const { language } = useLanguage();

  const renderPage = () => {
    switch (page) {
      case 'dashboard':     return <DashboardPage onNavigate={setPage} />;
      case 'homepage':      return <HomepageEditor />;
      case 'trade_hubs':    return <TradeHubsEditor />;
      case 'about':         return <AboutEditor />;
      case 'services':      return <ServicesEditor />;
      case 'products':      return <ProductsManager />;
      case 'products_page':  return <ProductsPageEditor />;
      case 'partners':      return <PartnersManager />;
      case 'training':      return <TrainingEditor />;
      case 'articles':      return <ArticlesManager />;
      case 'blog':          return <BlogEditor />;
      case 'contact':       return <ContactEditor />;
      case 'navbar_footer': return <NavbarFooterEditor />;
      case 'quotes':        return <QuotesManager />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar
        active={page}
        onChange={setPage}
        adminEmail={user?.email ?? ''}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 h-full">
        {/* Top bar — mobile hamburger + theme toggle */}
        <header className="flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm text-slate-900 dark:text-white lg:hidden">{PAGE_LABELS[page]}</span>
            {/* Desktop breadcrumb */}
            <span className="hidden lg:block font-semibold text-sm text-slate-500 dark:text-slate-400">
              UNT Admin &rsaquo; <span className="text-slate-900 dark:text-white">{PAGE_LABELS[page]}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="btn-shine flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#090D16] bg-ambient-mesh" id="admin-scroll">
            <div className="p-4 sm:p-6 lg:p-8">
              <div key={`${page}-${language}`} className={language === 'km' ? 'font-khmer' : ''}>{renderPage()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
