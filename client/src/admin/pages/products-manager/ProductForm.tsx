import { useState } from 'react';
import { Save, X } from 'lucide-react';
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
  <Field label={`${label} (comma separated)`} value={value.join(', ')} onChange={(value) => onChange(value.split(',').map((item) => item.trim()).filter(Boolean))} />
);

export function ProductForm({ initial, onSave, onCancel, saving }: ProductFormProps) {
  const [form, setForm] = useState<ProductDraft>(() => ({ ...initial }));
  const set = <Key extends keyof ProductDraft>(key: Key, value: ProductDraft[Key]) =>
    setForm((current) => ({ ...current, [key]: value }));
  const selectClass = 'w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors';

  return (
    <form onSubmit={(event) => { event.preventDefault(); onSave(form); }} className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="sm:col-span-2 xl:col-span-1"><Field label="Product Name" value={form.name} onChange={(value) => set('name', value)} /></div>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ImageField label="Product Image" value={form.image} onChange={(value) => set('image', value)} />
        <div className="space-y-4">
          <Field label="Description" value={form.description} onChange={(value) => set('description', value)} multiline rows={3} />
          <ArrayField label="Specifications" value={form.specifications} onChange={(value) => set('specifications', value)} />
          <ArrayField label="Certifications" value={form.certifications} onChange={(value) => set('certifications', value)} />
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={form.oem_available} onChange={(event) => set('oem_available', event.target.checked)} className="accent-emerald-500 w-4 h-4" /> OEM Available
          </label>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold transition-colors"><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Product'}</button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-sm font-medium transition-colors"><X className="w-4 h-4" />Cancel</button>
      </div>
    </form>
  );
}
