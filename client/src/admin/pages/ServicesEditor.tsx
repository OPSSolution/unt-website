import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';
import { useLanguage } from '../../i18n/LanguageContext';

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
const EMPTY_TRANSLATIONS = Object.fromEntries(Object.keys(DEFAULTS).map((key) => [key, '']));

const TABS = ['Header', 'Product Sales', 'Sourcing', 'Sales Training'] as const;
type Tab = typeof TABS[number];

export function ServicesEditor() {
  const { token } = useAdminAuth();
  const { language } = useLanguage();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [loading, setLoading] = useState(true);

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
        <Card><div className="space-y-4">
          <SectionDivider label="Service 01 — Product Sales" />
          <Field label="Badge" value={data.product_badge} onChange={set('product_badge')} />
          <Field label="Title" value={data.product_title} onChange={set('product_title')} />
          <Field label="Highlighted Title" value={data.product_highlight} onChange={set('product_highlight')} />
          <Field label="Description" value={data.product_desc} onChange={set('product_desc')} multiline rows={4} />
          <Field label="CTA Button" value={data.product_cta} onChange={set('product_cta')} />
        </div></Card>
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
