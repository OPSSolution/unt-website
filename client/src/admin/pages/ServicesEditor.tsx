import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';
import { useLanguage } from '../../i18n/LanguageContext';
import { countryContentDefaults, productBenefits, productCategories } from '../../pages/services/servicesData';

const DEFAULTS = {
  badge: 'End-to-End Procurement Infrastructure',
  headline: 'Integrated Global Trading Solutions',
  subheadline: 'From factory-direct auditing and private label OEM formulation to Ministry permits, GDCE customs clearance, and door-to-door logistics in Cambodia.',
  headline_highlight: 'Your Enterprise',
  tab_all: 'All Services',
  tab_product: '01. Product Sales',
  tab_sourcing: '02. Sourcing-as-a-Service',
  tab_training: '03. Sales Training',
  product_badge: 'Service 01 — Local Stock Distribution',
  product_title: 'Product Sales',
  product_highlight: '(Local Cambodian Inventory)',
  product_desc: 'Skip foreign supplier risk and international freight delays. We import premium goods directly, verify quality, and hold local stock in Phnom Penh ready for immediate delivery.',
  product_cta: 'Browse Live Wholesale Stock',
  origin_selector_label: 'Select Origin Country',
  source_from_label: 'Source from',
  corridor_overview_label: 'Corridor Overview',
  compliance_standards_label: 'Compliance Standards',
  top_products_label: 'Top Sourced Products',
  stock_categories_label: 'Product Categories Available in Stock',
  origin_countries: countryContentDefaults,
  product_categories: productCategories,
  product_benefits: productBenefits,
  sourcing_badge: 'Service 02 — Custom B2B Procurement Desk',
  sourcing_title: 'Sourcing-as-a-Service',
  sourcing_highlight: '(Factory Procurement)',
  sourcing_desc: 'Need a custom product made abroad? UNT acts as your external procurement team — handling factory audits, price negotiation, sample inspection, freight, and GDCE customs clearance.',
  sourcing_cta: 'Request Custom B2B Sourcing',
  training_badge: 'Service 03 — Sales Academy & Ecosystem',
  training_title: 'Sales Training &',
  training_highlight: 'Ecosystem Enablement',
  training_desc: "Transform your sales team into high-revenue closer teams. We teach real-world customer psychology, objection handling, and negotiation — backed by UNT's complete sourcing and digital branding ecosystem.",
  training_cta: 'Book Team Consultation',
};
const EMPTY_TRANSLATIONS = Object.fromEntries(Object.entries(DEFAULTS).map(([key, value]) => [key, Array.isArray(value) ? [] : '']));

const TABS = ['Header', 'Product Sales', 'Sourcing', 'Sales Training'] as const;
type Tab = typeof TABS[number];

export function ServicesEditor() {
  const { token } = useAdminAuth();
  const { language } = useLanguage();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [loading, setLoading] = useState(true);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'services_page',
    data,
    async (d) => {
      if (!token) return;
      await api.updateHomepageSection('services_page', d, token);
    },
    1500,
    !loading
  );

  useEffect(() => {
    setLoading(true);
    api.getHomepageSection('services_page')
      .then((r) => setData({ ...(language === 'km' ? EMPTY_TRANSLATIONS : DEFAULTS), ...(r.data ?? {}) }))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [language]);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));
  const updateCountry = (key: string, value: string | string[]) => setData((current: any) => ({
    ...current,
    origin_countries: (Array.isArray(current.origin_countries) ? current.origin_countries : []).map((country: any, index: number) =>
      index === selectedCountryIndex ? { ...country, [key]: value } : country),
  }));
  const updateCategory = (index: number, key: 'title' | 'count', value: string) => setData((current: any) => ({
    ...current,
    product_categories: (Array.isArray(current.product_categories) ? current.product_categories : []).map((category: any, itemIndex: number) =>
      itemIndex === index ? { ...category, [key]: value } : category),
  }));
  const updateBenefit = (index: number, key: 'title' | 'desc', value: string) => setData((current: any) => ({
    ...current,
    product_benefits: (Array.isArray(current.product_benefits) ? current.product_benefits : []).map((benefit: any, itemIndex: number) =>
      itemIndex === index ? { ...benefit, [key]: value } : benefit),
  }));

  const handleSave = async () => {
    if (!token) return;
    try {
      await api.updateHomepageSection('services_page', data, token);
    } catch (e: any) { /* auto-save will show errors */ }
  };

  return (
    <EditorShell
      title="Services & Sourcing Page"
      description="Edit content shown on the Services & Sourcing page. Changes are saved automatically."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Header' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Page Header" />
              <Field label="Badge" value={data.badge} onChange={set('badge')} />
              <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
              <Field label="Highlighted Headline" value={data.headline_highlight} onChange={set('headline_highlight')} />
              <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={4} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Service Filter Buttons" />
              <Field label="All Services" value={data.tab_all} onChange={set('tab_all')} />
              <Field label="Product Sales" value={data.tab_product} onChange={set('tab_product')} />
              <Field label="Sourcing" value={data.tab_sourcing} onChange={set('tab_sourcing')} />
              <Field label="Sales Training" value={data.tab_training} onChange={set('tab_training')} />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Product Sales' && (
        <div className="space-y-6">
          <Card><div className="space-y-4">
            <SectionDivider label="Service 01 — Product Sales" />
            <Field label="Badge" value={data.product_badge ?? ''} onChange={set('product_badge')} />
            <Field label="Title" value={data.product_title ?? ''} onChange={set('product_title')} />
            <Field label="Highlighted Title" value={data.product_highlight ?? ''} onChange={set('product_highlight')} />
            <Field label="Description" value={data.product_desc ?? ''} onChange={set('product_desc')} multiline rows={4} />
            <Field label="CTA Button" value={data.product_cta ?? ''} onChange={set('product_cta')} />
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Origin Country Labels" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <Field label="Selector Label" value={data.origin_selector_label ?? ''} onChange={set('origin_selector_label')} />
              <Field label="Source Button Prefix" value={data.source_from_label ?? ''} onChange={set('source_from_label')} />
              <Field label="Corridor Overview Label" value={data.corridor_overview_label ?? ''} onChange={set('corridor_overview_label')} />
              <Field label="Compliance Label" value={data.compliance_standards_label ?? ''} onChange={set('compliance_standards_label')} />
              <Field label="Top Products Label" value={data.top_products_label ?? ''} onChange={set('top_products_label')} />
              <Field label="Stock Categories Label" value={data.stock_categories_label ?? ''} onChange={set('stock_categories_label')} />
            </div>
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Country Corridors" />
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(data.origin_countries) ? data.origin_countries : []).map((country: any, index: number) => (
                <button key={`${country.code}-${index}`} type="button" onClick={() => setSelectedCountryIndex(index)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${selectedCountryIndex === index ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>{country.name || country.code || `Country ${index + 1}`}</button>
              ))}
            </div>
            {(() => {
              const country = (Array.isArray(data.origin_countries) ? data.origin_countries : [])[selectedCountryIndex];
              if (!country) return <p className="text-sm text-slate-500">No country content is available for this language.</p>;
              return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Country Name" value={country.name ?? ''} onChange={(v) => updateCountry('name', v)} />
                <Field label="Country Code" value={country.code ?? ''} onChange={(v) => updateCountry('code', v.toUpperCase())} />
                <div className="md:col-span-2"><Field label="Specialty / Niche" value={country.niche ?? ''} onChange={(v) => updateCountry('niche', v)} /></div>
                <Field label="Sea / Land Transit" value={country.seaTransit ?? ''} onChange={(v) => updateCountry('seaTransit', v)} />
                <Field label="Air Transit" value={country.airTransit ?? ''} onChange={(v) => updateCountry('airTransit', v)} />
                <div className="md:col-span-2"><Field label="Corridor Description" value={country.desc ?? ''} onChange={(v) => updateCountry('desc', v)} multiline rows={4} /></div>
                <Field label="Compliance Standards (one per line)" value={(country.standards ?? []).join('\n')} onChange={(v) => updateCountry('standards', v.split('\n').map((item) => item.trim()).filter(Boolean))} multiline rows={5} />
                <Field label="Top Sourced Products (one per line)" value={(country.topProducts ?? []).join('\n')} onChange={(v) => updateCountry('topProducts', v.split('\n').map((item) => item.trim()).filter(Boolean))} multiline rows={5} />
              </div>;
            })()}
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Product Categories in Stock" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(Array.isArray(data.product_categories) ? data.product_categories : []).map((category: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                  <Field label="Category" value={category.title ?? ''} onChange={(v) => updateCategory(index, 'title', v)} />
                  <Field label="Product Count" value={category.count ?? ''} onChange={(v) => updateCategory(index, 'count', v)} />
                </div>
              ))}
            </div>
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Product Sales Benefits" />
            <div className="space-y-4">
              {(Array.isArray(data.product_benefits) ? data.product_benefits : []).map((benefit: any, index: number) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                  <Field label={`Benefit ${index + 1} Title`} value={benefit.title ?? ''} onChange={(v) => updateBenefit(index, 'title', v)} />
                  <Field label="Description" value={benefit.desc ?? ''} onChange={(v) => updateBenefit(index, 'desc', v)} multiline rows={3} />
                </div>
              ))}
            </div>
          </div></Card>
        </div>
      )}

      {activeTab === 'Sourcing' && (
        <Card><div className="space-y-4">
          <SectionDivider label="Service 02 — Custom Sourcing" />
          <Field label="Badge" value={data.sourcing_badge} onChange={set('sourcing_badge')} />
          <Field label="Title" value={data.sourcing_title} onChange={set('sourcing_title')} />
          <Field label="Highlighted Title" value={data.sourcing_highlight} onChange={set('sourcing_highlight')} />
          <Field label="Description" value={data.sourcing_desc} onChange={set('sourcing_desc')} multiline rows={4} />
          <Field label="CTA Button" value={data.sourcing_cta} onChange={set('sourcing_cta')} />
        </div></Card>
      )}

      {activeTab === 'Sales Training' && (
        <Card><div className="space-y-4">
          <SectionDivider label="Service 03 — Sales Training" />
          <Field label="Badge" value={data.training_badge} onChange={set('training_badge')} />
          <Field label="Title" value={data.training_title} onChange={set('training_title')} />
          <Field label="Highlighted Title" value={data.training_highlight} onChange={set('training_highlight')} />
          <Field label="Description" value={data.training_desc} onChange={set('training_desc')} multiline rows={4} />
          <Field label="CTA Button" value={data.training_cta} onChange={set('training_cta')} />
        </div></Card>
      )}

    </EditorShell>
  );
}
