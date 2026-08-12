import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Plus, Pencil, Trash2, Loader, Sparkles } from 'lucide-react';
import { ProductForm } from './products-manager/ProductForm';
import { AdminProduct, EMPTY_PRODUCT, ProductDraft } from './products-manager/types';

const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong.';

export function ProductsManager() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const editingProduct = products.find((product) => product.id === editingId);
  const showcaseReadyCount = products.filter((product) => Boolean(product.showcase_image?.trim())).length;

  const load = () => {
    setLoading(true);
    setError('');
    api.getProducts().then(setProducts).catch(() => setError('Failed to load products.')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (data: ProductDraft) => {
    if (!token) return;
    setSaving(true);
    try { await api.createProduct(data, token); setAdding(false); load(); }
    catch (error: unknown) { setError(errorMessage(error)); } finally { setSaving(false); }
  };

  const handleUpdate = async (id: string, data: ProductDraft) => {
    if (!token) return;
    setSaving(true);
    try { await api.updateProduct(id, data, token); setEditingId(null); load(); }
    catch (error: unknown) { setError(errorMessage(error)); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this product?')) return;
    try { await api.deleteProduct(id, token); load(); }
    catch (error: unknown) { setError(errorMessage(error)); }
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Products</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{products.length} products in catalog · {showcaseReadyCount} ready for spinning showcase</p>
        </div>
        <button
          onClick={() => { setError(''); setAdding(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>}

      {adding && <ProductForm initial={EMPTY_PRODUCT} onSave={handleCreate} onCancel={() => setAdding(false)} saving={saving} />}

      {editingProduct && (
        <ProductForm
          key={editingProduct.id}
          initial={editingProduct}
          onSave={(data) => handleUpdate(editingProduct.id, data)}
          onCancel={() => setEditingId(null)}
          saving={saving}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader className="w-6 h-6 text-emerald-500 animate-spin" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">No products yet. Click "Add Product" to get started.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-800 transition-all">
                <div className={`flex items-center gap-4 p-4 ${editingId === p.id ? 'ring-2 ring-inset ring-emerald-500/70' : ''}`}>
                  <img src={p.showcase_image || p.image} alt={p.name} className="w-24 h-20 rounded-xl object-contain bg-slate-800 shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-900 dark:text-white font-semibold text-sm truncate">{p.name}</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">{p.category} · {p.origin_flag} {p.origin}</div>
                    <div className="text-slate-400 dark:text-slate-600 text-xs mt-0.5">MOQ: {p.moq} · Lead: {p.lead_time}</div>
                    <div className={`mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${p.showcase_image?.trim() ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                      <Sparkles className="w-3 h-3" />
                      {p.showcase_image?.trim() ? 'Showcase ready' : 'Needs transparent image'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button aria-label={`Edit ${p.name}`} onClick={() => { setError(''); setEditingId(p.id); setAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button aria-label={`Delete ${p.name}`} onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
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
