import { Globe, Search } from 'lucide-react';
import { countryFlagUrl, PRODUCT_CATEGORIES } from './data';
import { useLanguage } from '../../i18n/LanguageContext';

const CATEGORY_KM: Record<string, string> = {
  All: 'ទាំងអស់',
  'Food & Beverage': 'អាហារ និងភេសជ្ជៈ',
  'Skincare & Beauty': 'ថែរក្សាស្បែក និងសម្រស់',
  'Personal Care': 'ថែទាំផ្ទាល់ខ្លួន',
  'Health Supplements': 'អាហារបំប៉នសុខភាព',
  'Household Goods': 'សម្ភារៈប្រើប្រាស់ក្នុងផ្ទះ',
};

const COUNTRY_KM: Record<string, string> = {
  Cambodia: 'កម្ពុជា', Thailand: 'ថៃ', Vietnam: 'វៀតណាម', Laos: 'ឡាវ',
  Malaysia: 'ម៉ាឡេស៊ី', China: 'ចិន', 'South Korea': 'កូរ៉េខាងត្បូង', Japan: 'ជប៉ុន',
};

interface Props {
  category: string;
  origin: string;
  searchQuery: string;
  origins: Array<{ name: string; flag: string }>;
  onCategoryChange: (category: string) => void;
  onOriginChange: (origin: string) => void;
  onSearchChange: (query: string) => void;
}

export function CatalogFilters({ category, origin, searchQuery, origins, onCategoryChange, onOriginChange, onSearchChange }: Props) {
  const { language } = useLanguage();
  const isKm = language === 'km';
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <input
          type="search"
          aria-label="Search products"
          placeholder={isKm ? 'ស្វែងរកផលិតផលតាមឈ្មោះ រូបមន្ត ប្រភេទ ឬប្រទេសដើម...' : 'Search products by name, formula, category, or origin...'}
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl pl-12 pr-14 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        {searchQuery && <button type="button" onClick={() => onSearchChange('')} className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">{isKm ? 'សម្អាត' : 'Clear'}</button>}
      </div>
      <FilterGroup label={isKm ? 'តម្រងតាមប្រភេទ' : 'Filter Category'}>
        {PRODUCT_CATEGORIES.map((item) => <FilterChip key={item} active={category === item} onClick={() => onCategoryChange(item)}>{isKm ? CATEGORY_KM[item] ?? item : item}</FilterChip>)}
      </FilterGroup>
      <FilterGroup label={isKm ? 'តម្រងតាមប្រទេសដើម' : 'Filter Country of Origin'} divided>
        {[{ name: 'All', flag: '' }, ...origins].map((item) => {
          const selected = origin === item.name;
          const flagUrl = countryFlagUrl(item.name, item.flag);
          return (
            <FilterChip key={item.name} active={selected} onClick={() => onOriginChange(item.name)} rounded>
              {item.name === 'All' ? (
                <Globe className={`w-4 h-4 ${selected ? 'animate-spin' : 'text-emerald-500'}`} />
              ) : flagUrl ? (
                <span className="relative w-5 h-4 shrink-0 overflow-hidden rounded-sm bg-slate-200 flex items-center justify-center text-xs">
                  <span aria-hidden="true">{item.flag}</span>
                  <img src={flagUrl} alt="" className="absolute inset-0 w-full h-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                </span>
              ) : (
                <span className="text-base leading-none" aria-hidden="true">{item.flag}</span>
              )}
              <span>{item.name === 'All' ? (isKm ? 'ប្រទេសទាំងអស់' : 'All Countries') : (isKm ? COUNTRY_KM[item.name] ?? item.name : item.name)}</span>
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
