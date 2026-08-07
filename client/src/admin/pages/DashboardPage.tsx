import React, { useEffect, useState } from 'react';
import { Package, FileText, Users, Sparkles, ArrowRight, Inbox } from 'lucide-react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import type { AdminPage } from '../components/Sidebar';

interface Props {
  onNavigate: (page: AdminPage) => void;
}

export function DashboardPage({ onNavigate }: Props) {
  const { token } = useAdminAuth();
  const [counts, setCounts] = useState({ products: 0, articles: 0, partners: 0, quotes: 0 });

  useEffect(() => {
    Promise.all([api.getProducts(), api.getArticles(), api.getPartners()])
      .then(([products, articles, partners]) => {
        setCounts({
          products: products?.length ?? 0,
          articles: articles?.length ?? 0,
          partners: partners?.length ?? 0,
          quotes: 0,
        });
      })
      .catch(() => {});
    if (token) {
      api.getQuotes(token)
        .then((quotes) => setCounts((c) => ({ ...c, quotes: quotes?.length ?? 0 })))
        .catch(() => {});
    }
  }, [token]);

  const cards = [
    { id: 'homepage' as AdminPage,      label: 'Homepage Editor',   desc: 'Hero, pillars, heritage, OEM…',   icon: <Sparkles className="w-5 h-5" />, count: null },
    { id: 'trade_hubs' as AdminPage,    label: 'World Map Hubs',    desc: 'Globe countries & trade data',    icon: <Sparkles className="w-5 h-5" />, count: null },
    { id: 'about' as AdminPage,         label: 'About Page',        desc: 'Mission, pillars, network hubs',   icon: <Sparkles className="w-5 h-5" />, count: null },
    { id: 'services' as AdminPage,      label: 'Services Page',     desc: 'Sourcing steps, OEM, customs',     icon: <Sparkles className="w-5 h-5" />, count: null },
    { id: 'products' as AdminPage,      label: 'Products',          desc: 'Manage product catalog',           icon: <Package className="w-5 h-5" />,  count: counts.products },
    { id: 'articles' as AdminPage,      label: 'Articles',          desc: 'Manage blog & insights',           icon: <FileText className="w-5 h-5" />, count: counts.articles },
    { id: 'partners' as AdminPage,      label: 'Partners',          desc: 'Manage partner logos',             icon: <Users className="w-5 h-5" />,    count: counts.partners },
    { id: 'training' as AdminPage,      label: 'Training Page',     desc: 'Training hero & CTA banner',       icon: <Sparkles className="w-5 h-5" />, count: null },
    { id: 'contact' as AdminPage,       label: 'Contact Page',      desc: 'Address, phone, email info',       icon: <Sparkles className="w-5 h-5" />, count: null },
    { id: 'quotes' as AdminPage,        label: 'Quote Requests',    desc: 'Client B2B quote form submissions', icon: <Inbox className="w-5 h-5" />,     count: counts.quotes },
    { id: 'navbar_footer' as AdminPage, label: 'Navbar & Footer',   desc: 'Brand name, CTAs, copyright',      icon: <Sparkles className="w-5 h-5" />, count: null },
  ];

  return (
    <div className="w-full space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage all website content sections from here.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="group text-left p-6 rounded-2xl stripe-glass-card stripe-card-tilt hover:border-emerald-400 dark:hover:border-emerald-500/60 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                {card.icon}
              </div>
              {card.count !== null ? (
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{card.count}</span>
              ) : (
                <span className="live-pulse-badge">
                  <span className="live-pulse-dot" />
                  <span>Live</span>
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="text-slate-900 dark:text-white font-semibold">{card.label}</div>
              <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{card.desc}</div>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300">
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
