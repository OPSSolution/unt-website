import React, { useEffect, useState } from 'react';
import type { Article, PageTab, Product } from '../types';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { QuickCalcModal } from './QuickCalcModal';
import { QuickSearchModal } from './QuickSearchModal';
import { DesktopNav } from './navbar/DesktopNav';
import { MobileNav } from './navbar/MobileNav';
import { NavbarActions } from './navbar/NavbarActions';
import type { MegaMenuName } from './navbar/data';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  darkMode?: boolean;
  setDarkMode?: (dark: boolean | ((previous: boolean) => boolean)) => void;
  onOpenQuoteModal: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectArticle?: (article: Article) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode = false,
  setDarkMode,
  onOpenQuoteModal,
  onSelectProduct,
  onSelectArticle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuName>(null);
  const navbarContent = useHomepageSections().navbar_footer ?? {};

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setSearchModalOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openSearch = () => {
    setMobileMenuOpen(false);
    setSearchModalOpen(true);
  };
  const openCalculator = () => {
    setMobileMenuOpen(false);
    setCalcModalOpen(true);
  };
  const openQuote = () => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    onOpenQuoteModal();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full pointer-events-none px-3 sm:px-6 pt-3 sm:pt-4">
        <div className={`pointer-events-auto relative mx-auto max-w-[1700px] w-full nav-pill transition-all duration-300 ${
          isScrolled ? 'nav-pill-scrolled py-1.5' : 'py-2'
        } ${mobileMenuOpen ? 'rounded-[2rem]' : 'rounded-full'}`}>
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none rounded-full" />
          <div className={`flex items-center justify-between gap-2 pl-3 sm:pl-4 pr-2 sm:pr-3 transition-all duration-300 ${isScrolled ? 'h-12 xl:h-14' : 'h-14 xl:h-16'}`}>
            <button onClick={() => handleNavigate('home')} className="flex items-center space-x-2.5 text-left group focus:outline-none shrink-0" aria-label="UNT Company home">
              <div className="relative w-10 h-10 rounded-xl bg-white border border-emerald-200 shadow-sm p-1 group-hover:scale-105 transition-all duration-300 shrink-0">
                <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
              </div>
              <div className="hidden xl:block shrink-0">
                <div className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-none">{navbarContent.company_name ?? 'UNT COMPANY'}</div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide mt-1 leading-none">{navbarContent.company_tagline ?? 'Trusted Global Trading Partner'}</div>
              </div>
            </button>

            <DesktopNav
              activeTab={activeTab}
              activeMegaMenu={activeMegaMenu}
              setActiveMegaMenu={setActiveMegaMenu}
              onNavigate={handleNavigate}
              onQuote={openQuote}
            />
            <NavbarActions
              darkMode={darkMode}
              mobileMenuOpen={mobileMenuOpen}
              ctaLabel={navbarContent.navbar_cta ?? 'Get a Quote'}
              setDarkMode={setDarkMode}
              onSearch={openSearch}
              onCalculate={openCalculator}
              onQuote={openQuote}
              onToggleMobile={() => setMobileMenuOpen((open) => !open)}
            />
          </div>

          {mobileMenuOpen && (
            <MobileNav
              activeTab={activeTab}
              darkMode={darkMode}
              ctaLabel={navbarContent.mobile_cta ?? 'Request B2B Sourcing Quote'}
              setDarkMode={setDarkMode}
              onNavigate={handleNavigate}
              onSearch={openSearch}
              onCalculate={openCalculator}
              onQuote={openQuote}
            />
          )}
        </div>
      </header>

      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={onSelectProduct}
        onSelectArticle={onSelectArticle}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenCalcModal={() => setCalcModalOpen(true)}
        onSelectTab={handleNavigate}
      />
      <QuickCalcModal
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};
