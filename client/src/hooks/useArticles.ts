import { Article } from '../types';
import { ARTICLES as MOCK_ARTICLES } from '../data/mockData';
import { useSharedResource } from './sharedResource';
import { API_BASE } from '../lib/apiBase';
import { useLanguage, type ContentLanguage } from '../i18n/LanguageContext';
import { mergeStaticData } from './mergeStaticData';


function mapRow(row: any): Article {
  return {
    id: row.id, title: row.title, category: row.category, date: row.date,
    readTime: row.read_time,
    author: { name: row.author_name, role: row.author_role, avatar: row.author_avatar },
    image: row.image, excerpt: row.excerpt, content: row.content ?? [],
    tags: row.tags ?? [], featured: row.featured,
  };
}

async function loadArticles(language: ContentLanguage): Promise<Article[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/articles?lang=${language}`);
    if (!res.ok) return null;
    const rows = await res.json();
    const databaseArticles = Array.isArray(rows) ? rows.map(mapRow) : [];
    return language === 'en'
      ? mergeStaticData(databaseArticles, MOCK_ARTICLES, (article) => article.title)
      : databaseArticles;
  } catch { return language === 'en' ? MOCK_ARTICLES : []; }
}

export function useArticles(): Article[] {
  const { language } = useLanguage();
  return useSharedResource(`articles-${language}`, () => loadArticles(language), language === 'en' ? MOCK_ARTICLES : []);
}
