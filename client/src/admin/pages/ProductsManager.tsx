import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Plus, Pencil, Trash2, X, Save, Loader } from 'lucide-react';
import { ImageField } from '../components/ImageField';
import { Field } from '../components/EditorShell';

const CATEGORIES = ['Food & Beverage', 'Skincare & Beauty', 'Personal Care', 'Health Supplements', 'Household Goods'];

const EMPTY = {
  name: '', category: 'Food & Beverage', origin: '', origin_flag: '',
  moq: '', lead_time: '', image: '', description: '',
  oem_available: false, specifications: [], certifications: [], shelf_life: '',
};

function ArrayField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <Field
      label={`${label} (comma separated)`}
      value={value.join(', ')}
      onChange={(v) => onChange(v.split(',').map((s) => s.trim()).filter(Boolean))}
    />
  );
}

function ProductForm({ initial, onSave, onCancel, saving }: {
  initial: any; onSave: (data: any) => void; onCancel: () => void; saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (key: string, val: any) => setForm((f: any) => ({ ...f, [key]: val }));
  const sel = 'w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors';

  return (
    <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="sm:col-span-2 xl:col-span-1">
          <Field label="Product Name" value={form.name} onChange={(v) => set('name', v)} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Category</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className={sel}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <Field label="Origin Country" value={form.origin} onChange={(v) => set('origin', v)} />
        <Field label="Origin Flag Emoji" value={form.origin_flag} onChange={(v) => set('origin_flag', v)} />
        <Field label="MOQ" value={form.moq} onChange={(v) => set('moq', v)} />
        <Field label="Lead Time" value={form.lead_time} onChange={(v) => set('lead_time', v)} />
        <Field label="Shelf Life" value={form.shelf_life ?? ''} onChange={(v) => set('shelf_life', v)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ImageField label="Product Image" value={form.image} onChange={(v) => set('image', v)} />
        <div className="space-y-4">
          <Field label="Description" value={form.description} onChange={(v) => set('description', v)} multiline rows={3} />
          <ArrayField label="Specifications" value={form.specifications} onChange={(v) => set('specifications', v)} />
          <ArrayField label="Certifications" value={form.certifications} onChange={(v) => set('certifications', v)} />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="oem" checked={form.oem_available} onChange={(e) => set('oem_available', e.target.checked)} className="accent-emerald-500 w-4 h-4" />
            <label htmlFor="oem" className="text-sm text-slate-700 dark:text-slate-300">OEM Available</label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => onSave(form)} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold transition-colors">
          <Save className="w-4 h-4" /><span>{saving ? 'Saving...' : 'Save Product'}</span>
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-sm font-medium transition-colors">
          <X className="w-4 h-4" /><span>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export function ProductsManager() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.getProducts().then(setProducts).catch(() => setError('Failed to load products.')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (data: any) => {
    if (!token) return;
    setSaving(true);
    try { await api.createProduct(data, token); setAdding(false); load(); }
    catch (e: any) { setError(e.message); } finally { setSaving(false); }
  };

  const handleUpdate = async (id: string, data: any) => {
    if (!token) return;
    setSaving(true);
    try { await api.updateProduct(id, data, token); setEditingId(null); load(); }
    catch (e: any) { setError(e.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this product?')) return;
    try { await api.deleteProduct(id, token); load(); }
    catch (e: any) { setError(e.message); }
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Products</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{products.length} products in catalog</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>}

      {adding && <ProductForm initial={EMPTY} onSave={handleCreate} onCancel={() => setAdding(false)} saving={saving} />}

      {loading ? (
        <div className="flex justify-center py-16"><Loader className="w-6 h-6 text-emerald-500 animate-spin" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">No products yet. Click "Add Product" to get started.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              {editingId === p.id ? (
                <div className="p-4">
                  <ProductForm initial={p} onSave={(data) => handleUpdate(p.id, data)} onCancel={() => setEditingId(null)} saving={saving} />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover bg-slate-800 shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-900 dark:text-white font-semibold text-sm truncate">{p.name}</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">{p.category} · {p.origin_flag} {p.origin}</div>
                    <div className="text-slate-400 dark:text-slate-600 text-xs mt-0.5">MOQ: {p.moq} · Lead: {p.lead_time}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => { setEditingId(p.id); setAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
