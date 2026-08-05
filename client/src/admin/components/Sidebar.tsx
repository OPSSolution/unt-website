import React from 'react';
import { LayoutDashboard, Package, FileText, Users, Sparkles, LogOut, Globe, Home, Info, Wrench, GraduationCap, Newspaper, Phone, X } from 'lucide-react';
import { supabase } from '../../supabaseClient';

export type AdminPage =
  | 'dashboard'
  | 'home_hero' | 'home_sections' | 'trade_hubs'
  | 'about'
  | 'services'
  | 'products' | 'partners'
  | 'training'
  | 'articles'
  | 'contact';

interface Props {
  active: AdminPage;
  onChange: (page: AdminPage) => void;
  adminEmail: string;
}

type NavGroup = { label: string; items: { id: AdminPage; label: string; icon: React.ReactNode }[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'General',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> }],
  },
  {
    label: 'Home',
    items: [
      { id: 'home_hero',     label: 'Hero Section',  icon: <Sparkles className="w-4 h-4" /> },
      { id: 'home_sections', label: 'Page Sections', icon: <Home className="w-4 h-4" /> },
      { id: 'trade_hubs',   label: 'World Map Hubs', icon: <Globe className="w-4 h-4" /> },
    ],
  },
  {
    label: 'About Us',
    items: [{ id: 'about', label: 'About Page', icon: <Info className="w-4 h-4" /> }],
  },
  {
    label: 'Services & Sourcing',
    items: [{ id: 'services', label: 'Services Page', icon: <Wrench className="w-4 h-4" /> }],
  },
  {
    label: 'Wholesale Catalog',
    items: [
      { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
      { id: 'partners', label: 'Partners', icon: <Users className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Sales Training',
    items: [{ id: 'training', label: 'Training Page', icon: <GraduationCap className="w-4 h-4" /> }],
  },
  {
    label: 'Market Insights',
    items: [{ id: 'articles', label: 'Articles', icon: <Newspaper className="w-4 h-4" /> }],
  },
  {
    label: 'Contact',
    items: [{ id: 'contact', label: 'Contact Page', icon: <Phone className="w-4 h-4" /> }],
  },
];

interface SidebarProps extends Props {
  open: boolean;
  onClose: () => void;
}

function SidebarContent({ active, onChange, adminEmail, onClose }: SidebarProps) {
  const handleLogout = async () => { await supabase?.auth.signOut(); };
  const handleNav = (id: AdminPage) => { onChange(id); onClose(); };

  return (
    <div className="flex flex-col h-full bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200 dark:border-white/10">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white border border-emerald-200 shadow-sm p-0.5 shrink-0">
            <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-slate-900 dark:text-white font-bold text-sm leading-none">UNT Admin</div>
            <div className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">Content Panel</div>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {group.label}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {active === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10">
          <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Logged in as</div>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate mt-0.5">{adminEmail}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <aside className="hidden lg:flex w-60 shrink-0 flex-col min-h-screen">
        <SidebarContent {...props} />
      </aside>

      {props.open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/60" onClick={props.onClose} />
          <aside className="relative z-50 w-64 flex flex-col">
            <SidebarContent {...props} />
          </aside>
        </div>
      )}
    </>
  );
}
