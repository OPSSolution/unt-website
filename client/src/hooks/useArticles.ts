import { useEffect, useState } from 'react';
import { Article } from '../types';
import { ARTICLES as MOCK_ARTICLES } from '../data/mockData';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const REFRESH_MS = 15000;

// Last-known-good cache — used only as the initial render value.
let cached: Article[] | null = null;

function mapRow(row: any): Article {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    date: row.date,
    readTime: row.read_time,
    author: {
      name: row.author_name,
      role: row.author_role,
      avatar: row.author_avatar,
    },
    image: row.image,
    excerpt: row.excerpt,
    content: row.content ?? [],
    tags: row.tags ?? [],
    featured: row.featured,
  };
}

async function loadArticles(): Promise<Article[] | null> {
  try {
    const res = await fetch(`${BASE}/api/articles`);
    if (!res.ok) return null;
    const rows = await res.json();
    // Fall back to the demo articles while the database table is empty so the
    // public site never renders a blank blog.
    if (!Array.isArray(rows) || rows.length === 0) return MOCK_ARTICLES;
    return rows.map(mapRow);
  } catch {
    return MOCK_ARTICLES;
  }
}

export function useArticles(): Article[] {
  const [articles, setArticles] = useState<Article[]>(cached ?? MOCK_ARTICLES);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await loadArticles();
      if (!cancelled && data) {
        cached = data;
        setArticles(data);
      }
    };

    load();
    const intervalId = window.setInterval(load, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    const onFocus = () => load();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return articles;
}
