import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS = {
  badge: 'End-to-End Procurement Infrastructure',
  headline: 'Integrated Global Trading Solutions',
  subheadline: 'From factory-direct auditing and private label OEM formulation to Ministry permits, GDCE customs clearance, and door-to-door logistics in Cambodia.',
  steps_badge: 'Methodology',
  steps_heading: 'The UNT Sourcing-as-a-Service Process',
  steps_sub: 'We simplify global procurement into five fully transparent, risk-managed stages.',
  oem_title: 'Turnkey OEM & Private Label Formulations',
  oem_desc: 'Launch proprietary brand lines with minimal upfront R&D costs. We handle formula matching, stability testing, custom bottle/jar selection, foil printing, and multi-lingual packaging.',
  oem_cta: 'Discuss Private Label Project',
  customs_title: 'GDCE Customs Brokerage & Ministry Registration',
  customs_desc: 'Avoid port fines and shipping delays. Our dedicated customs unit files ASYCUDA manifests, secures Ministry of Health product notifications, and manages Ministry of Commerce import audits.',
  customs_cta: 'Consult Customs Specialist',
};

const TABS = ['Header', 'OEM & Customs'] as const;
type Tab = typeof TABS[number];

export function ServicesEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHomepageSection('services_page')
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    setSaving(true); setError('');
    try {
      await api.updateHomepageSection('services_page', data, token);
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  return (
    <EditorShell
      title="Services & Sourcing Page"
      description="Edit content shown on the Services & Sourcing page."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Header' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Page Header" />
              <Field label="Badge" value={data.badge} onChange={set('badge')} />
              <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
              <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={4} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Sourcing Steps Section" />
              <Field label="Badge" value={data.steps_badge} onChange={set('steps_badge')} />
              <Field label="Heading" value={data.steps_heading} onChange={set('steps_heading')} multiline />
              <Field label="Subtext" value={data.steps_sub} onChange={set('steps_sub')} multiline />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'OEM & Customs' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="OEM & Private Label Box" />
              <Field label="Title" value={data.oem_title} onChange={set('oem_title')} multiline />
              <Field label="Description" value={data.oem_desc} onChange={set('oem_desc')} multiline rows={4} />
              <Field label="CTA Button" value={data.oem_cta} onChange={set('oem_cta')} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Customs Brokerage Box" />
              <Field label="Title" value={data.customs_title} onChange={set('customs_title')} multiline />
              <Field label="Description" value={data.customs_desc} onChange={set('customs_desc')} multiline rows={4} />
              <Field label="CTA Button" value={data.customs_cta} onChange={set('customs_cta')} />
            </div>
          </Card>
        </div>
      )}
    </EditorShell>
  );
}
