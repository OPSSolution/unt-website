import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';
import { Plus, Trash2 } from 'lucide-react';

interface ProductSalesTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
  selectedCountryIndex: number;
  setSelectedCountryIndex: React.Dispatch<React.SetStateAction<number>>;
  addCountry: () => void;
  removeCountry: (index: number) => void;
  updateCountry: (key: string, value: string | string[]) => void;
  updateCategory: (index: number, key: 'title' | 'count', value: string) => void;
  updateBenefit: (index: number, key: 'title' | 'desc', value: string) => void;
}

export function ProductSalesTab({
  data,
  set,
  selectedCountryIndex,
  setSelectedCountryIndex,
  addCountry,
  removeCountry,
  updateCountry,
  updateCategory,
  updateBenefit,
}: ProductSalesTabProps) {
  const countryList = Array.isArray(data.origin_countries) ? data.origin_countries : [];
  const country = countryList[selectedCountryIndex];

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Service 01 — Product Sales" />
          <Field label="Badge" value={data.product_badge ?? ''} onChange={set('product_badge')} />
          <Field label="Title" value={data.product_title ?? ''} onChange={set('product_title')} />
          <Field label="Highlighted Title" value={data.product_highlight ?? ''} onChange={set('product_highlight')} />
          <Field label="Description" value={data.product_desc ?? ''} onChange={set('product_desc')} multiline rows={4} />
          <Field label="CTA Button" value={data.product_cta ?? ''} onChange={set('product_cta')} />
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <SectionDivider label="Origin Country Labels" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <Field label="Selector Label" value={data.origin_selector_label ?? ''} onChange={set('origin_selector_label')} />
            <Field label="Source Button Prefix" value={data.source_from_label ?? ''} onChange={set('source_from_label')} />
            <Field label="Corridor Overview Label" value={data.corridor_overview_label ?? ''} onChange={set('corridor_overview_label')} />
            <Field label="Compliance Label" value={data.compliance_standards_label ?? ''} onChange={set('compliance_standards_label')} />
            <Field label="Top Products Label" value={data.top_products_label ?? ''} onChange={set('top_products_label')} />
            <Field label="Stock Categories Label" value={data.stock_categories_label ?? ''} onChange={set('stock_categories_label')} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <SectionDivider label="Country Corridors" />
            <button
              type="button"
              onClick={addCountry}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Country Corridor
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {countryList.map((item: any, index: number) => (
              <div key={`${item.code}-${index}`} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedCountryIndex(index)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedCountryIndex === index
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm scale-105'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.name || item.code || `Country ${index + 1}`}
                </button>
                {countryList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete corridor for "${item.name || item.code}"?`)) {
                        removeCountry(index);
                      }
                    }}
                    title={`Delete ${item.name || item.code}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {!country ? (
            <p className="text-sm text-slate-500">No country content is available for this language.</p>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Editing Corridor: <strong className="text-emerald-600 dark:text-emerald-400">{country.name || country.code}</strong>
                </span>
                {countryList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete corridor for "${country.name || country.code}"?`)) {
                        removeCountry(selectedCountryIndex);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-bold px-3 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/40 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Corridor
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Country Name" value={country.name ?? ''} onChange={(v) => updateCountry('name', v)} />
                <Field label="Country Code" value={country.code ?? ''} onChange={(v) => updateCountry('code', v.toUpperCase())} />
                <div className="md:col-span-2">
                  <Field label="Specialty / Niche" value={country.niche ?? ''} onChange={(v) => updateCountry('niche', v)} />
                </div>
                <Field label="Sea / Land Transit" value={country.seaTransit ?? ''} onChange={(v) => updateCountry('seaTransit', v)} />
                <Field label="Air Transit" value={country.airTransit ?? ''} onChange={(v) => updateCountry('airTransit', v)} />
                <div className="md:col-span-2">
                  <Field label="Corridor Description" value={country.desc ?? ''} onChange={(v) => updateCountry('desc', v)} multiline rows={4} />
                </div>
                <Field
                  label="Compliance Standards (one per line)"
                  value={(country.standards ?? []).join('\n')}
                  onChange={(v) => updateCountry('standards', v.split('\n').map((item) => item.trim()).filter(Boolean))}
                  multiline
                  rows={5}
                />
                <Field
                  label="Top Sourced Products (one per line)"
                  value={(country.topProducts ?? []).join('\n')}
                  onChange={(v) => updateCountry('topProducts', v.split('\n').map((item) => item.trim()).filter(Boolean))}
                  multiline
                  rows={5}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <SectionDivider label="Product Categories in Stock" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(Array.isArray(data.product_categories) ? data.product_categories : []).map((category: any, index: number) => (
              <div key={index} className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                <Field label="Category" value={category.title ?? ''} onChange={(v) => updateCategory(index, 'title', v)} />
                <Field label="Product Count" value={category.count ?? ''} onChange={(v) => updateCategory(index, 'count', v)} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <SectionDivider label="Product Sales Benefits" />
          <div className="space-y-4">
            {(Array.isArray(data.product_benefits) ? data.product_benefits : []).map((benefit: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <Field label={`Benefit ${index + 1} Title`} value={benefit.title ?? ''} onChange={(v) => updateBenefit(index, 'title', v)} />
                <Field label="Description" value={benefit.desc ?? ''} onChange={(v) => updateBenefit(index, 'desc', v)} multiline rows={3} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
