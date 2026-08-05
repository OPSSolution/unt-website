import { Globe, Search } from 'lucide-react';
import { COUNTRY_FLAGS, PRODUCT_CATEGORIES, PRODUCT_ORIGINS } from './data';

interface Props {
  category: string;
  origin: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onOriginChange: (origin: string) => void;
  onSearchChange: (query: string) => void;
}

export function CatalogFilters({ category, origin, searchQuery, onCategoryChange, onOriginChange, onSearchChange }: Props) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search products by name, formula, category, or origin..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl pl-12 pr-14 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        {searchQuery && <button type="button" onClick={() => onSearchChange('')} className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Clear</button>}
      </div>
      <FilterGroup label="Filter Category">
        {PRODUCT_CATEGORIES.map((item) => <FilterChip key={item} active={category === item} onClick={() => onCategoryChange(item)}>{item}</FilterChip>)}
      </FilterGroup>
      <FilterGroup label="Filter Country of Origin" divided>
        {PRODUCT_ORIGINS.map((item) => {
          const selected = origin === item;
          return (
            <FilterChip key={item} active={selected} onClick={() => onOriginChange(item)} rounded>
              {item === 'All' ? <Globe className={`w-4 h-4 ${selected ? 'animate-spin' : 'text-emerald-500'}`} /> : <img src={COUNTRY_FLAGS[item]} alt="" className="w-4 h-3 object-cover rounded-sm" />}
              <span>{item === 'All' ? 'All Countries' : item}</span>
            </FilterChip>
          );
        })}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, divided = false, children }: { label: string; divided?: boolean; children: React.ReactNode }) {
  return <div className={`space-y-2 ${divided ? 'pt-2 border-t border-slate-100 dark:border-slate-800' : ''}`}><span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">{label}</span><div className="flex flex-wrap gap-2">{children}</div></div>;
}

function FilterChip({ active, onClick, rounded = false, children }: { active: boolean; onClick: () => void; rounded?: boolean; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`${rounded ? 'rounded-full h-9 flex items-center gap-2' : 'rounded-xl'} px-3.5 py-2 text-xs font-semibold transition-all ${active ? 'bg-emerald-600 text-white font-bold shadow-sm scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{children}</button>;
}
