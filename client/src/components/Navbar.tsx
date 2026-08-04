import React, { useState, useEffect } from 'react';
import { PageTab, Product, Article } from '../types';
import { 
  Phone, Menu, X, ArrowRight, ShieldCheck, Globe, Search, 
  Calculator, ChevronDown, Sparkles, Package, Truck, 
  MessageCircle, ChevronRight 
} from 'lucide-react';
import { QuickSearchModal } from './QuickSearchModal';
import { QuickCalcModal } from './QuickCalcModal';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectArticle?: (article: Article) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenQuoteModal,
  onSelectProduct,
  onSelectArticle
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  
  // State for language and currency selectors
  const [language, setLanguage] = useState<'EN' | 'KH' | 'ZH'>('EN');
  const [currency, setCurrency] = useState<'USD' | 'KHR' | 'CNY'>('USD');
  const [showHotlineMenu, setShowHotlineMenu] = useState(false);

  // Mega-menu hover states
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'services' | null>(null);

  // Listen for Ctrl+K or Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks: { id: PageTab; label: string; labelKhmer?: string; hasMegaMenu?: 'products' | 'services' }[] = [
    { id: 'home', label: 'Home', labelKhmer: 'ទំព័រដើម' },
    { id: 'about', label: 'About Us', labelKhmer: 'អំពីយើង' },
    { id: 'services', label: 'Services & Sourcing', labelKhmer: 'សេវាកម្ម', hasMegaMenu: 'services' },
    { id: 'products', label: 'Wholesale Catalog', labelKhmer: 'ទំនិញបោះដុំ', hasMegaMenu: 'products' },
    { id: 'training', label: 'Sales Training', labelKhmer: 'វគ្គបណ្តុះបណ្តាល' },
    { id: 'blog', label: 'Market Insights', labelKhmer: 'ព័ត៌មានទីផ្សារ' },
    { id: 'contact', label: 'Contact', labelKhmer: 'ទំនាក់ទំនង' },
  ];

  const handleNavClick = (id: PageTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-slate-200 text-slate-800 transition-all shadow-sm">
        
        {/* Top Micro Intelligence Bar - Clean Light Theme */}
        <div className="bg-slate-100 text-slate-600 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-200 flex justify-between items-center relative z-20">
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Live Logistics Route Status Indicator */}
            <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-800">
                <span className="hidden sm:inline">ASEAN Routes & GDCE Customs: </span>Normal Clearance
              </span>
            </div>

            {/* Official Certification Tag */}
            <div className="hidden lg:flex items-center space-x-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px]">ISO Certified & Ministry Compliant Partner</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5 text-xs">
            {/* Currency Selector Pill */}
            <div className="flex items-center space-x-1 bg-white border border-slate-300 rounded-lg px-2 py-0.5 text-[11px] shadow-xs">
              <span className="text-slate-500 font-medium">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-emerald-700 font-bold focus:outline-none cursor-pointer"
              >
                <option value="USD" className="bg-white text-slate-900">$ USD</option>
                <option value="KHR" className="bg-white text-slate-900">៛ KHR</option>
                <option value="CNY" className="bg-white text-slate-900">¥ CNY</option>
              </select>
            </div>

            {/* Language Selector Pill */}
            <div className="flex items-center space-x-1 bg-white border border-slate-300 rounded-lg px-2 py-0.5 text-[11px] shadow-xs">
              <Globe className="w-3 h-3 text-slate-500 mr-0.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="EN" className="bg-white text-slate-900">English 🇬🇧</option>
                <option value="KH" className="bg-white text-slate-900">ភាសាខ្មែរ 🇰🇭</option>
                <option value="ZH" className="bg-white text-slate-900">中文 🇨🇳</option>
              </select>
            </div>

            {/* Quick Contact & Hotline */}
            <div className="relative">
              <button 
                onClick={() => setShowHotlineMenu(!showHotlineMenu)}
                className="flex items-center space-x-1 hover:text-emerald-700 transition-colors text-slate-700 font-mono text-[11px]"
              >
                <Phone className="w-3 h-3 text-emerald-600" />
                <span className="hidden sm:inline">+855 23 999 888</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Hotline Dropdown Menu */}
              {showHotlineMenu && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100 text-slate-800"
                  onMouseLeave={() => setShowHotlineMenu(false)}
                >
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
                    B2B Support & Sales Desk
                  </div>
                  <a
                    href="tel:+85523999888"
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-200">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        Phnom Penh HQ Hotline
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">+855 23 999 888</div>
                    </div>
                  </a>
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group mt-1"
                  >
                    <div className="p-2 bg-sky-50 rounded-lg text-sky-600 border border-sky-200">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        Telegram B2B Desk
                      </div>
                      <div className="text-[11px] text-slate-500">Instant RFQ & Live Tracking</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Main White Navbar Header Row */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo Badge - White Background & Emerald Accent */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2.5 sm:space-x-3 text-left group focus:outline-none shrink-0"
          >
            {/* UNT Circular Logo Badge */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-emerald-500 p-0.5 shadow-md shadow-emerald-500/15 group-hover:scale-105 transition-all duration-200">
              <div className="w-full h-full bg-emerald-50/50 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* twin leaves SVG */}
                <div className="flex items-center justify-center leading-none">
                  <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 3C14.5 3 12 5.5 12 8.5C12 7 10 5.5 7.5 5.5C4.5 5.5 2 8 2 11C2 15 6 18 12 21C18 18 22 15 22 11C22 6.5 19.5 3 17.5 3ZM7.5 14C5.5 14 4 12.5 4 11C4 9.5 5.5 8 7.5 8C9 8 10.5 9 11 10.5C9.5 11.5 8.5 12.8 7.5 14ZM16.5 14.5C15 13.5 13.5 11.5 13 9.5C14 8 15.5 7 17.5 7C19.5 7 20 9 20 11C20 12.5 18.5 14 16.5 14.5Z" />
                  </svg>
                </div>
                {/* UNT Text */}
                <span className="font-display font-black text-[9px] sm:text-[10px] tracking-tight text-slate-900 -mt-0.5 leading-none">
                  UNT
                </span>
              </div>
            </div>

            {/* UNT Titles */}
            <div className="shrink-0">
              <div className="font-display font-bold text-sm sm:text-base tracking-tight text-slate-900 flex items-center space-x-1.5">
                <span className="whitespace-nowrap">UNT COMPANY</span>
                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] uppercase tracking-wider font-extrabold rounded whitespace-nowrap">
                  Sales Team
                </span>
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold tracking-wide whitespace-nowrap">
                {language === 'KH' ? 'យូនីក ណូបិល ត្រេឌីង ឯ.ក' : 'Unique Noble Trading Co., Ltd.'}
              </div>
            </div>
          </button>

          {/* Quick Command Search Trigger Bar */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all text-xs w-36 lg:w-44 xl:w-52 shrink group shadow-inner"
          >
            <Search className="w-3.5 h-3.5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate flex-1 text-left">Search catalog...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white group-hover:bg-slate-50 text-slate-500 text-[10px] font-mono rounded border border-slate-300 shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* Desktop Nav Links Bar - Clean White Styling */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 relative">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const hasMega = link.hasMegaMenu;

              return (
                <div 
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => hasMega && setActiveMegaMenu(hasMega)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`px-2.5 py-2 xl:px-3.5 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 flex items-center space-x-1 whitespace-nowrap ${
                      isActive
                        ? 'text-emerald-800 bg-emerald-100/80 font-extrabold border border-emerald-300 shadow-sm'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{language === 'KH' && link.labelKhmer ? link.labelKhmer : link.label}</span>
                    {hasMega && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                        activeMegaMenu === hasMega ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                      }`} />
                    )}
                  </button>

                  {/* Mega Menu Dropdown for Wholesale Catalog (White Card) */}
                  {activeMegaMenu === 'products' && link.id === 'products' && (
                    <div className="absolute top-full -left-20 w-[480px] bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left text-slate-800">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Wholesale Product Categories
                          </span>
                        </div>
                        <button 
                          onClick={() => handleNavClick('products')}
                          className="text-[11px] text-emerald-600 hover:underline flex items-center space-x-0.5 font-semibold"
                        >
                          <span>Explore All</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { title: 'Food & Beverage', desc: 'Organic NFC Coconut water, Specialty teas', flag: '🥥' },
                          { title: 'Skincare & Beauty', desc: 'K-Beauty & J-Beauty brightening serums', flag: '✨' },
                          { title: 'Health Supplements', desc: 'Liposomal Vitamin C, Zinc & Immunity', flag: '💊' },
                          { title: 'Personal Care & Hair', desc: 'Salon grade Keratin & Argan oil sets', flag: '🌿' },
                        ].map((cat, i) => (
                          <div 
                            key={i}
                            onClick={() => handleNavClick('products')}
                            className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              <span>{cat.flag}</span>
                              <span className="whitespace-nowrap">{cat.title}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{cat.desc}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                        <div className="text-xs text-emerald-900 font-semibold">
                          Looking for OEM / Custom Formulation?
                        </div>
                        <button
                          onClick={() => {
                            setActiveMegaMenu(null);
                            onOpenQuoteModal();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          OEM Inquiry
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mega Menu Dropdown for Services & Sourcing (White Card) */}
                  {activeMegaMenu === 'services' && link.id === 'services' && (
                    <div className="absolute top-full -left-12 w-[440px] bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left text-slate-800">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Sourcing & Import Solutions
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { title: 'Custom OEM & Private Labeling', desc: 'Turnkey cosmetic & beverage manufacturing in Korea & Japan', icon: Sparkles },
                          { title: 'Ministry Permit & GDCE Clearance', desc: '100% compliant Cambodian MoC, HACCP & Khmer packaging labels', icon: ShieldCheck },
                          { title: 'Cold-Chain & Cross-Border Logistics', desc: 'Refrigerated overland trucking & ocean freight to Phnom Penh', icon: Truck },
                        ].map((srv, idx) => {
                          const Icon = srv.icon;
                          return (
                            <div
                              key={idx}
                              onClick={() => handleNavClick('services')}
                              className="flex items-start space-x-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 transition-all cursor-pointer group"
                            >
                              <div className="p-2 rounded-xl bg-emerald-100/80 border border-emerald-200 text-emerald-700 shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                  {srv.title}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5">{srv.desc}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </nav>

          {/* Productivity Actions Group (Quick Calc & Get Quote) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Quick Sourcing Calculator Launcher Pill */}
            <button
              onClick={() => setCalcModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs transition-all shadow-xs group whitespace-nowrap shrink-0"
              title="Calculate duties, lead times & permits"
            >
              <Calculator className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform shrink-0" />
              <span className="hidden xl:inline">Quick Calc</span>
            </button>

            {/* Primary Get Quote CTA Button */}
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            {/* Mobile Menu Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors border border-slate-300 shrink-0"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-600" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Drawer Menu (White Theme) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 text-left text-slate-800">
            
            {/* Search Input Trigger in Mobile Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium"
            >
              <Search className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Search products, OEM services & articles...</span>
            </button>

            {/* Quick Calculator Drawer Pill */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCalcModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold"
            >
              <span className="flex items-center space-x-2">
                <Calculator className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Interactive Sourcing & Duty Estimator</span>
              </span>
              <ChevronRight className="w-4 h-4 shrink-0 text-emerald-600" />
            </button>

            {/* Nav Links */}
            <div className="space-y-1 pt-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50 font-bold border-l-4 border-emerald-600'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-400">{link.labelKhmer}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Quote CTA */}
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-sm shadow-md"
              >
                <span>Request B2B Sourcing Quote</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

          </div>
        )}

      </header>

      {/* Command Search Palette Modal */}
      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={onSelectProduct}
        onSelectArticle={onSelectArticle}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenCalcModal={() => setCalcModalOpen(true)}
        onSelectTab={handleNavClick}
      />

      {/* Sourcing Estimator Modal */}
      <QuickCalcModal
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};
