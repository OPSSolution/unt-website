import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS = {
  badge: 'Phnom Penh HQ & Regional Hubs',
  headline: "Let's Bridge the Gap Between Agriculture & Logistics",
  subheadline: "Get in touch with Unique Noble Trading Co., Ltd.'s sourcing specialists, customs brokers, and commercial training leads.",
  section_badge: 'Direct Channels',
  section_heading: 'Connect With Our Team',
  section_desc: 'Whether you require urgent customs clearance support, bulk wholesale pricing, or custom OEM formulation — we respond within 4 business hours.',
  hq_address: 'Phnom Penh Tower, Level 14, Monivong Blvd, Sangkat Boeung Keng Kang 1, Doun Penh, Phnom Penh, Kingdom of Cambodia.',
  phone_landline: '+855 23 999 888',
  phone_telegram: '@untsourcing',
  phone_whatsapp: '+855 12 345 678',
  email_general: 'info@untcompany.com',
  email_customs: 'customs@untcompany.com',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
};

const TABS = ['Header', 'Contact Info'] as const;
type Tab = typeof TABS[number];

export function ContactEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [loading, setLoading] = useState(true);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'contact_page',
    data,
    async (d) => {
      if (!token) return;
      await api.updateHomepageSection('contact_page', d, token);
    },
    1500,
    !loading
  );

  useEffect(() => {
    api.getHomepageSection('contact_page')
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    try {
      await api.updateHomepageSection('contact_page', data, token);
    } catch (e: any) { /* auto-save will show errors */ }
  };

  return (
    <EditorShell
      title="Contact Page"
      description="Edit contact info, address, phone, and email shown on the Contact page. Changes are saved automatically."
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
              <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={3} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Left Column" />
              <Field label="Section Badge" value={data.section_badge} onChange={set('section_badge')} />
              <Field label="Section Heading" value={data.section_heading} onChange={set('section_heading')} />
              <Field label="Section Description" value={data.section_desc} onChange={set('section_desc')} multiline rows={4} />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Contact Info' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Address" />
              <Field label="HQ Address" value={data.hq_address} onChange={set('hq_address')} multiline rows={3} />
              <Field label="Working Hours" value={data.hours} onChange={set('hours')} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Phone & Email" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Landline" value={data.phone_landline} onChange={set('phone_landline')} />
                <Field label="Telegram Handle" value={data.phone_telegram} onChange={set('phone_telegram')} />
                <Field label="WhatsApp / Mobile" value={data.phone_whatsapp} onChange={set('phone_whatsapp')} />
                <Field label="General Email" value={data.email_general} onChange={set('email_general')} />
                <Field label="Customs Email" value={data.email_customs} onChange={set('email_customs')} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </EditorShell>
  );
}
