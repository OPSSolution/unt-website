import React, { useState } from 'react';
import { PageTab } from '../types';
import { Mail, Phone, MapPin, Send, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navigateTo = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200 pt-16 pb-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Callout Banner */}
        <div className="mb-16 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-emerald-500/10 border border-emerald-200 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl text-left">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold tracking-wider uppercase rounded-full mb-3">
              Ready to Expand Your Wholesale Supply Chain?
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Partner with Cambodia’s Leading Sourcing Ecosystem
            </h3>
            <p className="mt-2 text-slate-600 text-sm">
              From verified factory matching to door-to-door customs clearance and private label formulation — we deliver reliability at scale.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Request Sourcing Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-300 transition-all flex items-center justify-center"
            >
              Contact Phnom Penh Office
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 shadow-sm p-1 shrink-0">
                <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-slate-900 block">UNT COMPANY</span>
                <span className="text-xs text-emerald-600 font-semibold">Unique Noble Trading Co., Ltd.</span>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Empowering Asian commerce by bridging world-class manufacturers with retail networks, wholesale distributors, and emerging brands in Cambodia and ASEAN.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Ministry of Commerce & GDCE Import Audit Compliant</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-emerald-600 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-emerald-600 transition-colors">
                  About UNT Company
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-emerald-600 transition-colors">
                  Sourcing-as-a-Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products')} className="hover:text-emerald-600 transition-colors">
                  Wholesale Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('training')} className="hover:text-emerald-600 transition-colors">
                  Sales Capacity Training
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-emerald-600 transition-colors">
                  Market Insights & Reports
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-emerald-600 transition-colors">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Solutions */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Trading Solutions</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>OEM & Private Label Manufacturing</li>
              <li>FMCG Distribution (F&B, Skincare)</li>
              <li>Customs Clearance & Brokerage</li>
              <li>Cold Chain & Warehousing</li>
              <li>Quality Control & Audit Inspection</li>
              <li>Corporate Sales Masterclasses</li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Market Intelligence</h4>
            <p className="text-xs text-slate-600">
              Subscribe to our bi-weekly ASEAN trade regulatory updates and wholesale tariff briefings.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Subscribed successfully! Briefings sent bi-weekly.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter business email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-xs space-y-1.5 text-slate-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Phnom Penh Tower, Monivong Blvd, Phnom Penh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>+855 23 999 888 / +855 12 345 678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>info@untcompany.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Unique Noble Trading Co., Ltd. (UNT Company). All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigateTo('contact')} className="hover:text-slate-700 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-slate-700 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-slate-700 transition-colors">
              GDCE Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
