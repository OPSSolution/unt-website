import { Search } from 'lucide-react';

export const BLOG_CATEGORIES = ['All', 'Regulatory Updates', 'OEM Case Studies', 'Supply Chain', 'Retail Strategy'];

interface Props {
  selectedCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
}

export function BlogFilters({ selectedCategory, searchQuery, onCategoryChange, onSearchChange }: Props) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <input
          type="search"
          aria-label="Search trade insights"
          placeholder="Search trade reports, customs guides, or supply chain analysis..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 transition-colors"
        />
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Article categories">
        {BLOG_CATEGORIES.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

