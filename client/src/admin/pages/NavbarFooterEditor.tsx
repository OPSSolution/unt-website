import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS = {
  // Navbar
  company_name: 'UNT COMPANY',
  company_tagline: 'Trusted Global Trading Partner',
  company_legal: 'Unique Noble Trading Co., Ltd.',
  navbar_cta: 'Get a Quote',
  mobile_cta: 'Request B2B Sourcing Quote',
  // Footer callout banner
  footer_callout_badge: 'Ready to Expand Your Wholesale Supply Chain?',
  footer_callout_heading: "Partner with Cambodia's Leading Sourcing Ecosystem",
  footer_callout_desc: 'From verified factory matching to door-to-door customs clearance and private label formulation — we deliver reliability at scale.',
  // Footer brand block
  footer_desc: 'Empowering Asian commerce by bridging world-class manufacturers with retail networks, wholesale distributors, and emerging brands in Cambodia and ASEAN.',
  footer_copyright: 'Unique Noble Trading Co., Ltd. (UNT Company). All rights reserved.',
};

const TABS = ['Navbar', 'Footer'] as const;
type Tab = typeof TABS[number];

export function NavbarFooterEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Navbar');
  const [loading, setLoading] = useState(true);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'navbar_footer',
    data,
    async (d) => {
      if (!token) return;
      await api.updateHomepageSection('navbar_footer', d, token);
    },
    1500,
    !loading
  );

  useEffect(() => {
    api.getHomepageSection('navbar_footer')
      .then((r) => { if (r.data) setData({ ...DEFAULTS, ...r.data }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    try {
      await api.updateHomepageSection('navbar_footer', data, token);
    } catch (e: any) { /* auto-save will show errors */ }
  };

  return (
    <EditorShell
      title="Navbar & Footer"
      description="Control company branding, CTA button labels, footer callout content, and copyright text. Changes are saved automatically."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Navbar' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Brand Identity (top-left logo area)" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                These appear in the logo section visible on wide screens (&gt;xl breakpoint) and in the Footer.
              </p>
              <Field label="Company Name" value={data.company_name} onChange={set('company_name')} />
              <Field label="Tagline (small text below name)" value={data.company_tagline} onChange={set('company_tagline')} />
              <Field label="Legal Name (shown in Footer)" value={data.company_legal} onChange={set('company_legal')} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="CTA Buttons" />
              <Field label='Desktop "Get a Quote" Button' value={data.navbar_cta} onChange={set('navbar_cta')} />
              <Field label="Mobile Drawer CTA Button" value={data.mobile_cta} onChange={set('mobile_cta')} />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Footer' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Callout Banner (top of footer)" />
              <Field label="Badge Text" value={data.footer_callout_badge} onChange={set('footer_callout_badge')} />
              <Field label="Heading" value={data.footer_callout_heading} onChange={set('footer_callout_heading')} multiline />
              <Field label="Description" value={data.footer_callout_desc} onChange={set('footer_callout_desc')} multiline rows={3} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Brand Block & Copyright" />
              <Field label="Footer Brand Description" value={data.footer_desc} onChange={set('footer_desc')} multiline rows={4} />
              <Field label="Copyright Text (after ©year)" value={data.footer_copyright} onChange={set('footer_copyright')} multiline />
            </div>
          </Card>
        </div>
      )}
    </EditorShell>
  );
}
