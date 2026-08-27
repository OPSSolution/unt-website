import { Article } from '../types';
import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';
import { useLanguage, type ContentLanguage } from '../i18n/LanguageContext';


function mapRow(row: any): Article {
  return {
    id: row.id, title: row.title, category: row.category, date: row.date,
    readTime: row.read_time,
    author: { name: row.author_name, role: row.author_role, avatar: row.author_avatar },
    image: row.image, excerpt: row.excerpt, content: row.content ?? [],
    tags: row.tags ?? [], featured: row.featured, views: row.views ?? 0,
  };
}

async function loadArticles(language: ContentLanguage): Promise<Article[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/articles?lang=${language}`);
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) ? rows.map(mapRow) : [];
  } catch { return []; }
}

export function useArticles(): Article[] {
  const { language } = useLanguage();
  return useSharedResource(`articles-${language}`, () => loadArticles(language), []);
}

export async function registerArticleView(articleId: string): Promise<number | null> {
  const storageKey = `article-viewed-${articleId}`;
  if (sessionStorage.getItem(storageKey)) return null;
  try {
    const res = await fetch(`${API_BASE}/api/articles/${articleId}/view`, { method: 'POST' });
    if (!res.ok) return null;
    sessionStorage.setItem(storageKey, '1');
    const { views } = await res.json();
    return typeof views === 'number' ? views : null;
  } catch { return null; }
}
