import { Article } from '../types';
import { ARTICLES as MOCK_ARTICLES } from '../data/mockData';
import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';


function mapRow(row: any): Article {
  return {
    id: row.id, title: row.title, category: row.category, date: row.date,
    readTime: row.read_time,
    author: { name: row.author_name, role: row.author_role, avatar: row.author_avatar },
    image: row.image, excerpt: row.excerpt, content: row.content ?? [],
    tags: row.tags ?? [], featured: row.featured,
  };
}

async function loadArticles(): Promise<Article[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/articles`);
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0 ? rows.map(mapRow) : MOCK_ARTICLES;
  } catch { return MOCK_ARTICLES; }
}

export function useArticles(): Article[] {
  return useSharedResource('articles', loadArticles, MOCK_ARTICLES);
}
