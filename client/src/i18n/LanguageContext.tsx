import React, { createContext, useContext, useEffect, useState } from 'react';

export type ContentLanguage = 'en' | 'km';
let activeLanguage: ContentLanguage = 'en';
const LanguageContext = createContext<{ language: ContentLanguage; setLanguage: (value: ContentLanguage) => void }>({
  language: 'en', setLanguage: () => {},
});

export function storedLanguage(): ContentLanguage {
  return activeLanguage;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<ContentLanguage>('en');
  const setLanguage = (value: ContentLanguage) => {
    activeLanguage = value;
    setLanguageState(value);
  };
  useEffect(() => {
    activeLanguage = language;
    document.documentElement.lang = language === 'km' ? 'km' : 'en';
    document.documentElement.classList.toggle('font-khmer', language === 'km');
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex items-center rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 p-1" aria-label="Content language">
      {(['en', 'km'] as const).map((value) => (
        <button key={value} type="button" onClick={() => setLanguage(value)}
          className={`${compact ? 'px-2' : 'px-3'} py-1.5 rounded-full text-xs font-bold transition-colors ${language === value ? 'bg-emerald-600 text-white' : 'text-slate-500 dark:text-slate-300'}`}>
          {value === 'en' ? 'English' : 'ខ្មែរ'}
        </button>
      ))}
    </div>
  );
}
