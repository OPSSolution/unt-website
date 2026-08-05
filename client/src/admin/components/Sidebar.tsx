import { LogOut, X } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { AdminPage, NAV_GROUPS } from './sidebar/navigation';

export type { AdminPage } from './sidebar/navigation';

interface Props {
  active: AdminPage;
  onChange: (page: AdminPage) => void;
  adminEmail: string;
}


interface SidebarProps extends Props {
  open: boolean;
  onClose: () => void;
}

function SidebarContent({ active, onChange, adminEmail, onClose }: SidebarProps) {
  const handleLogout = async () => {
    // Clear local session immediately so UI redirects to login without waiting
    await supabase?.auth.signOut();
  };
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
        <button aria-label="Close navigation" onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-white">
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
            {group.items.map((item) => {
              const Icon = item.icon;
              return <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                aria-current={active === item.id ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {active === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                )}
              </button>;
            })}
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
        <div className="lg:hidden fixed inset-0 z-40 flex" role="dialog" aria-modal="true" aria-label="Admin navigation">
          <button aria-label="Close navigation" className="fixed inset-0 bg-black/60" onClick={props.onClose} />
          <aside className="relative z-50 w-64 flex flex-col">
            <SidebarContent {...props} />
          </aside>
        </div>
      )}
    </>
  );
}
