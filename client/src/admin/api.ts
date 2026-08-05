const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? 'Request failed');
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  // Products
  getProducts: () => request<any[]>('/api/products'),
  createProduct: (body: any, token: string) =>
    request('/api/products', { method: 'POST', body: JSON.stringify(body) }, token),
  updateProduct: (id: string, body: any, token: string) =>
    request(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),
  deleteProduct: (id: string, token: string) =>
    request(`/api/products/${id}`, { method: 'DELETE' }, token),

  // Articles
  getArticles: () => request<any[]>('/api/articles'),
  createArticle: (body: any, token: string) =>
    request('/api/articles', { method: 'POST', body: JSON.stringify(body) }, token),
  updateArticle: (id: string, body: any, token: string) =>
    request(`/api/articles/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),
  deleteArticle: (id: string, token: string) =>
    request(`/api/articles/${id}`, { method: 'DELETE' }, token),

  // Partners
  getPartners: () => request<any[]>('/api/partners'),
  createPartner: (body: any, token: string) =>
    request('/api/partners', { method: 'POST', body: JSON.stringify(body) }, token),
  updatePartner: (id: string, body: any, token: string) =>
    request(`/api/partners/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),
  deletePartner: (id: string, token: string) =>
    request(`/api/partners/${id}`, { method: 'DELETE' }, token),

  // Hero
  getHeroContent: () => request<any>('/api/hero/content'),
  updateHeroContent: (body: any, token: string) =>
    request('/api/hero/content', { method: 'PUT', body: JSON.stringify(body) }, token),
  getHeroStats: () => request<any[]>('/api/hero/stats'),
  updateHeroStat: (id: string, body: any, token: string) =>
    request(`/api/hero/stats/${id}`, { method: 'PUT', body: JSON.stringify(body) }, token),

  // Homepage Sections
  getHomepageSection: (key: string) => request<any>(`/api/homepage/${key}`),
  updateHomepageSection: (key: string, body: any, token: string) =>
    request(`/api/homepage/${key}`, { method: 'PUT', body: JSON.stringify(body) }, token),
};
