import { useState } from 'react';
import { Save, X, Package, Image as ImageIcon, ListChecks, Eye, Clock3, Boxes } from 'lucide-react';
import { ImageField } from '../../components/ImageField';
import { Field } from '../../components/EditorShell';
import { AdminProduct, PRODUCT_CATEGORIES, ProductDraft } from './types';

interface ProductFormProps {
  initial: ProductDraft | AdminProduct;
  onSave: (data: ProductDraft) => void;
  onCancel: () => void;
  saving: boolean;
}

const ArrayField = ({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) => (
  <div className="space-y-2">
    <Field label={`${label} (one per line)`} multiline rows={4} value={value.join('\n')} onChange={(text) => onChange(text.split('\n').map((item) => item.trim()).filter(Boolean))} />
    {value.length > 0 && <div className="flex flex-wrap gap-1.5">{value.map((item, index) => <span key={`${item}-${index}`} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300">{item}</span>)}</div>}
  </div>
);

export function ProductForm({ initial, onSave, onCancel, saving }: ProductFormProps) {
  const [form, setForm] = useState<ProductDraft>(() => ({ ...initial }));
  const set = <Key extends keyof ProductDraft>(key: Key, value: ProductDraft[Key]) =>
    setForm((current) => ({ ...current, [key]: value }));
  const selectClass = 'w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors';
  const sectionTitle = (icon: React.ReactNode, title: string, description: string) => (
    <div className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">{icon}</div>
      <div><h3 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h3><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p></div>
    </div>
  );

  return (
    <form onSubmit={(event) => { event.preventDefault(); onSave(form); }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 space-y-7 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
      <div className="flex items-center justify-between gap-4">
        <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {'id' in initial ? 'Edit Product' : 'Add Product'}
        </h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Complete the product identity, logistics, media, and technical details.</p></div>
        <span className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">{form.specifications.length} specifications</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="space-y-4">
        {sectionTitle(<Package className="w-4 h-4" />, 'Product identity', 'Core catalog information shown to wholesale buyers.')}
        <Field label="Product Name" value={form.name} onChange={(value) => set('name', value)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="product-category" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Category</label>
          <select id="product-category" value={form.category} onChange={(event) => set('category', event.target.value as ProductDraft['category'])} className={selectClass}>
            {PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
        </div>
        <Field label="Origin Country" value={form.origin} onChange={(value) => set('origin', value)} />
        <Field label="Origin Flag Emoji" value={form.origin_flag} onChange={(value) => set('origin_flag', value)} />
        <Field label="MOQ" value={form.moq} onChange={(value) => set('moq', value)} />
        <Field label="Lead Time" value={form.lead_time} onChange={(value) => set('lead_time', value)} />
        <Field label="Shelf Life" value={form.shelf_life} onChange={(value) => set('shelf_life', value)} />
        </div>
        <Field label="Description" value={form.description} onChange={(value) => set('description', value)} multiline rows={5} />
        <label className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <input type="checkbox" checked={form.oem_available} onChange={(event) => set('oem_available', event.target.checked)} className="accent-emerald-500 w-4 h-4" /> OEM / private label is available for this product
        </label>
      </div>

      <div className="space-y-4">
        {sectionTitle(<ImageIcon className="w-4 h-4" />, 'Media & technical details', 'Use a clean product image and list each item on a separate line.')}
        <ImageField label="Product Image" value={form.image} onChange={(value) => set('image', value)} />
        <div className="grid grid-cols-1 gap-4">
          <ArrayField label="Specifications" value={form.specifications} onChange={(value) => set('specifications', value)} />
          <ArrayField label="Certifications" value={form.certifications} onChange={(value) => set('certifications', value)} />
        </div>
      </div>
      </div>

      {(form.name || form.image) && <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3"><Eye className="w-4 h-4" />Live catalog preview</div>
        <div className="max-w-2xl grid grid-cols-[112px_1fr] gap-4 items-center">
          <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">{form.image && <img src={form.image} alt="" className="w-full h-full object-cover" />}</div>
          <div className="min-w-0"><span className="text-[10px] font-bold text-emerald-600 uppercase">{form.category}</span><h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 mt-1">{form.name || 'Product name'}</h3><p className="text-xs text-slate-500 mt-1">{form.origin_flag} {form.origin || 'Origin country'}</p><div className="flex flex-wrap gap-3 mt-3 text-[11px] text-slate-600 dark:text-slate-300"><span className="flex items-center gap-1"><Boxes className="w-3.5 h-3.5 text-emerald-500" />MOQ {form.moq || '—'}</span><span className="flex items-center gap-1"><Clock3 className="w-3.5 h-3.5 text-emerald-500" />{form.lead_time || 'Lead time'}</span>{form.certifications.length > 0 && <span className="flex items-center gap-1"><ListChecks className="w-3.5 h-3.5 text-emerald-500" />{form.certifications.length} certifications</span>}</div></div>
        </div>
      </div>}

      <div className="sticky bottom-3 z-10 flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold transition-colors"><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Product'}</button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-sm font-medium transition-colors"><X className="w-4 h-4" />Cancel</button>
      </div>
    </form>
  );
}
