import { ChevronDown } from 'lucide-react';
import type { PageTab } from '../../types';
import { NAV_LINKS, type MegaMenuName } from './data';
import { ProductsMegaMenu, ServicesMegaMenu } from './MegaMenus';

interface Props {
  activeTab: PageTab;
  activeMegaMenu: MegaMenuName;
  setActiveMegaMenu: (menu: MegaMenuName) => void;
  onNavigate: (tab: PageTab) => void;
  onQuote: () => void;
}

export function DesktopNav({ activeTab, activeMegaMenu, setActiveMegaMenu, onNavigate, onQuote }: Props) {
  return (
    <nav className="hidden lg:flex items-center xl:space-x-0.5 relative">
      {NAV_LINKS.map((link) => {
        const isActive = activeTab === link.id;
        const megaOpen = Boolean(link.hasMegaMenu && activeMegaMenu === link.hasMegaMenu);
        return (
          <div
            key={link.id}
            className="relative"
            onMouseEnter={() => link.hasMegaMenu && setActiveMegaMenu(link.hasMegaMenu)}
            onMouseLeave={() => link.hasMegaMenu && setActiveMegaMenu(null)}
          >
            <button
              onClick={() => onNavigate(link.id)}
              className={`relative px-2.5 xl:px-3.5 py-2 rounded-full text-xs 2xl:text-[13px] font-semibold transition-all flex items-center gap-1 group ${
                isActive
                  ? 'text-emerald-700 font-bold bg-emerald-50 dark:text-emerald-300 dark:bg-white/10'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-white/75 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              <span className="whitespace-nowrap">{link.label}</span>
              {link.hasMegaMenu && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-300' : 'text-slate-400'}`} />}
            </button>
            {megaOpen && link.id === 'products' && (
              <ProductsMegaMenu onNavigate={() => onNavigate('products')} onQuote={onQuote} />
            )}
            {megaOpen && link.id === 'services' && (
              <ServicesMegaMenu onNavigate={() => onNavigate('services')} />
            )}
          </div>
        );
      })}
    </nav>
  );
}

