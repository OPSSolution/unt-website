import { API_BASE } from '../lib/apiBase';
import { storedLanguage } from '../i18n/LanguageContext';
import { supabase } from '../supabaseClient';

async function currentAccessToken(fallback?: string, forceRefresh = false) {
  if (!supabase || !fallback) return fallback;

  if (forceRefresh) {
    const { data, error } = await supabase.auth.refreshSession();
    if (error || !data.session) {
      await supabase.auth.signOut({ scope: 'local' });
      throw new Error('Your admin session expired. Please sign in again.');
    }
    return data.session.access_token;
  }

  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (!session) return fallback;
  const expiresSoon = (session.expires_at ?? 0) * 1000 <= Date.now() + 60_000;
  if (expiresSoon) return currentAccessToken(fallback, true);
  return session.access_token;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  let accessToken = await currentAccessToken(token);
  const send = (authToken?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Content-Language': storedLanguage(),
      ...(options.headers as Record<string, string>),
    };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    return fetch(`${API_BASE}${path}`, { ...options, headers });
  };

  let res = await send(accessToken);
  if (res.status === 401 && token && supabase) {
    accessToken = await currentAccessToken(token, true);
    res = await send(accessToken);
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? 'Request failed');
  }
  if (res.status === 204) return undefined as T;
  const result = await res.json();
  if (options.method && options.method !== 'GET') {
    localStorage.setItem('unt-content-updated', String(Date.now()));
    // The native storage event is only delivered to other tabs. Notify this
    // tab as well so a public preview does not retain stale training media.
    window.dispatchEvent(new Event('unt-content-updated'));
  }
  return result;
}

export const api = {
  // Products
  getProducts: () => request<any[]>('/api/products'),
  createProduct: (body: any, token: string) =>
    request('/api/admin/products', { method: 'POST', body: JSON.stringify(body) }, token),
  updateProduct: (id: string, body: any, token: string) =>
    request(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),
  deleteProduct: (id: string, token: string) =>
    request(`/api/admin/products/${id}`, { method: 'DELETE' }, token),

  // Articles
  getArticles: () => request<any[]>('/api/articles'),
  createArticle: (body: any, token: string) =>
    request('/api/admin/articles', { method: 'POST', body: JSON.stringify(body) }, token),
  updateArticle: (id: string, body: any, token: string) =>
    request(`/api/admin/articles/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),
  deleteArticle: (id: string, token: string) =>
    request(`/api/admin/articles/${id}`, { method: 'DELETE' }, token),

  // Partners
  getPartners: () => request<any[]>('/api/partners'),
  createPartner: (body: any, token: string) =>
    request('/api/admin/partners', { method: 'POST', body: JSON.stringify(body) }, token),
  updatePartner: (id: string, body: any, token: string) =>
    request(`/api/admin/partners/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),
  deletePartner: (id: string, token: string) =>
    request(`/api/admin/partners/${id}`, { method: 'DELETE' }, token),

  // Hero
  getHeroContent: () => request<any>('/api/hero/content'),
  updateHeroContent: (body: any, token: string) =>
    request('/api/admin/hero/content', { method: 'PUT', body: JSON.stringify(body) }, token),
  getHeroStats: () => request<any[]>('/api/hero/stats'),
  updateHeroStat: (id: string, body: any, token: string) =>
    request(`/api/admin/hero/stats/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),

  // Homepage Sections
  getHomepageSection: (key: string, language?: 'en' | 'km') => request<any>(
    `/api/homepage/${key}${language ? `?lang=${language}` : ''}`,
    language ? { headers: { 'X-Content-Language': language } } : {},
  ),
  updateHomepageSection: (key: string, body: any, token: string, language?: 'en' | 'km') =>
    request(`/api/admin/homepage/${key}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...(language ? { headers: { 'X-Content-Language': language } } : {}),
    }, token),

  // Quote Requests (admin)
  getQuotes: (token: string) => request<any[]>('/api/admin/quotes', {}, token),
  testQuoteEmail: (token: string) => request<{ sent: boolean }>('/api/admin/quotes/test-email', { method: 'POST' }, token),
  updateQuoteStatus: (id: string, status: 'new' | 'in_progress' | 'completed', token: string) =>
    request(`/api/admin/quotes/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }, token),
  deleteQuote: (id: string, token: string) =>
    request(`/api/admin/quotes/${id}`, { method: 'DELETE' }, token),
};
