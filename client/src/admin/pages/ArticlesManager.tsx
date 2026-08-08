import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Plus, Pencil, Trash2, X, Save, Loader, FileText, Image as ImageIcon, Eye, Clock3 } from 'lucide-react';
import { ImageField } from '../components/ImageField';
import { Field } from '../components/EditorShell';

const CATEGORIES = ['Market Trends', 'Regulatory Updates', 'Supply Chain', 'Retail Strategy', 'OEM Case Studies'];

const EMPTY = {
  title: '', category: 'Market Trends', date: '', read_time: '',
  author_name: '', author_role: '', author_avatar: '',
  image: '', excerpt: '', content: [], tags: [], featured: false,
};

function ArticleForm({ initial, onSave, onCancel, saving }: {
  initial: any; onSave: (data: any) => void; onCancel: () => void; saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (key: string, val: any) => setForm((f: any) => ({ ...f, [key]: val }));
  const sel = 'w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors';
  const wordCount = form.content.join(' ').trim().split(/\s+/).filter(Boolean).length;
  const sectionTitle = (icon: React.ReactNode, title: string, description: string) => (
    <div className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">{icon}</div>
      <div><h3 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h3><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p></div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 space-y-7 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
      <div className="flex items-center justify-between gap-4">
        <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">{initial.id ? 'Edit article' : 'Create a new article'}</h2><p className="text-xs text-slate-500 mt-1">Complete the story, media, and author details before publishing.</p></div>
        <span className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">{wordCount} words</span>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-4">
          {sectionTitle(<FileText className="w-4 h-4" />, 'Story details', 'The information readers see on article cards and filters.')}
          <Field label="Title" value={form.title} onChange={(v) => set('title', v)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className={sel}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Date (e.g. Feb 12, 2026)" value={form.date} onChange={(v) => set('date', v)} />
            <Field label="Read Time (e.g. 5 min read)" value={form.read_time} onChange={(v) => set('read_time', v)} />
            <Field label="Author Name" value={form.author_name} onChange={(v) => set('author_name', v)} />
            <Field label="Author Role" value={form.author_role} onChange={(v) => set('author_role', v)} />
          </div>
          <Field label="Short Excerpt" value={form.excerpt} onChange={(v) => set('excerpt', v)} multiline rows={4} />
          <Field
            label="Tags (comma separated)"
            value={form.tags.join(', ')}
            onChange={(v) => set('tags', v.split(',').map((s: string) => s.trim()).filter(Boolean))}
          />
          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="accent-emerald-500 w-4 h-4" />
            <label htmlFor="featured" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Feature this article at the top of Market Insights</label>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {sectionTitle(<ImageIcon className="w-4 h-4" />, 'Media & article body', 'Upload clear imagery and write one paragraph per line.')}
          <ImageField label="Article Cover Image" value={form.image} onChange={(v) => set('image', v)} />
          <ImageField label="Author Avatar" value={form.author_avatar} onChange={(v) => set('author_avatar', v)} />
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3"><label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Article paragraphs</label><span className="text-[11px] text-slate-400">{form.content.length} paragraphs · {wordCount} words</span></div>
            <textarea
              rows={12}
              value={form.content.join('\n')}
              onChange={(e) => set('content', e.target.value.split('\n').filter(Boolean))}
              placeholder={'Write the opening paragraph here.\nAdd each new paragraph on a separate line.'}
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm leading-7 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-y"
            />
          </div>
        </div>
      </div>

      {(form.title || form.image) && <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3"><Eye className="w-4 h-4" />Live card preview</div>
        <div className="max-w-xl flex gap-4 items-center"><div className="w-28 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">{form.image && <img src={form.image} alt="" className="w-full h-full object-cover" />}</div><div className="min-w-0"><span className="text-[10px] font-bold text-emerald-600 uppercase">{form.category}</span><h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mt-1">{form.title || 'Article title'}</h3><p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock3 className="w-3 h-3" />{form.read_time || 'Reading time'}</p></div></div>
      </div>}

      <div className="sticky bottom-3 z-10 flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <button onClick={() => onSave(form)} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold transition-colors">
          <Save className="w-4 h-4" /><span>{saving ? 'Saving...' : 'Save Article'}</span>
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-sm font-medium transition-colors">
          <X className="w-4 h-4" /><span>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export function ArticlesManager() {
  const { token } = useAdminAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const editingArticle = articles.find((article) => article.id === editingId);

  const load = () => {
    setLoading(true);
    api.getArticles().then(setArticles).catch(() => setError('Failed to load articles.')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (data: any) => {
    if (!token) return;
    setSaving(true);
    try { await api.createArticle(data, token); setAdding(false); load(); }
    catch (e: any) { setError(e.message); } finally { setSaving(false); }
  };

  const handleUpdate = async (id: string, data: any) => {
    if (!token) return;
    setSaving(true);
    try { await api.updateArticle(id, data, token); setEditingId(null); load(); }
    catch (e: any) { setError(e.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this article?')) return;
    try { await api.deleteArticle(id, token); load(); }
    catch (e: any) { setError(e.message); }
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Articles</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{articles.length} articles published</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Article</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>}

      {adding && <ArticleForm initial={EMPTY} onSave={handleCreate} onCancel={() => setAdding(false)} saving={saving} />}

      {editingArticle && (
        <ArticleForm
          key={editingArticle.id}
          initial={editingArticle}
          onSave={(data) => handleUpdate(editingArticle.id, data)}
          onCancel={() => setEditingId(null)}
          saving={saving}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader className="w-6 h-6 text-emerald-500 animate-spin" /></div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">No articles yet. Click "Add Article" to get started.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {articles.map((a) => (
            <div key={a.id} className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-800 transition-all ${editingId === a.id ? 'border-emerald-400 ring-2 ring-emerald-500/15' : 'border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center gap-4 p-4">
                  {a.image ? (
                    <img src={a.image} alt={a.title} className="w-24 h-20 rounded-xl object-cover bg-slate-800 shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div className="w-24 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center text-[10px] text-slate-400">No image</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-900 dark:text-white font-semibold text-sm truncate">{a.title}</span>
                      {a.featured && <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-400 text-[10px] font-bold rounded-full shrink-0">Featured</span>}
                    </div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">{a.category} · {a.date} · {a.read_time}</div>
                    <div className="text-slate-400 dark:text-slate-600 text-xs mt-0.5">By {a.author_name}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => { setEditingId(a.id); setAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
