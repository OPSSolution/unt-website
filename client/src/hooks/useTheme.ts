import { useEffect, useState } from 'react';

const STORAGE_KEY = 'unt_theme';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem(STORAGE_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return { darkMode, setDarkMode };
}

