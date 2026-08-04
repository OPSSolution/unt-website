import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { ImageField } from '../components/ImageField';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS = {
  badge: 'About UNT Company',
  headline: 'The Bridge to Global Trade',
  subheadline: 'Unique Noble Trading Co., Ltd. (UNT Company) is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.',
  mission_badge: 'Our Purpose & Mission',
  mission_heading: 'Connecting World-Class Manufacturers with Emerging ASEAN Markets',
  mission_p1: 'Founded with the vision of modernizing Cambodian import commerce, UNT Company acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners.',
  mission_p2: 'Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.',
  mission_image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
  hq_label: 'Phnom Penh Corporate Headquarters',
  hq_address: 'Phnom Penh Tower, Monivong Blvd, Doun Penh, Phnom Penh',
  stat1_value: '100%', stat1_label: 'Regulatory & Tax Audit Compliant',
  stat2_value: '1,200+', stat2_label: 'Trade & Sales Professionals Trained',
  adv_badge: 'Why Business Leaders Choose UNT',
  adv_heading: 'The UNT Advantage',
  adv1_title: 'Direct Factory Audit', adv1_desc: 'We physically audit ISO and GMP facilities across Thailand, Vietnam, Korea, Japan, and China.',
  adv2_title: 'In-House Customs Brokerage', adv2_desc: 'Licensed GDCE customs brokers handle tax classification, ASYCUDA filings, and ministry permits.',
  adv3_title: 'Cold Chain & Logistics', adv3_desc: 'Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate products.',
  adv4_title: 'Sales & Capacity Building', adv4_desc: "We train client commercial teams in consultative selling, buyer psychology, and key account growth.",
  net_badge: 'Strategic Infrastructure',
  net_heading: 'Our Global Network & Operations Hubs',
  net_sub: 'Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.',
  hub1_flags: '🇹🇭 🇻🇳', hub1_title: 'Bangkok & Ho Chi Minh Corridors', hub1_desc: 'Cross-border overland logistics hub for rapid F&B, organic coconut water, teas, and household consumer product shipments into Cambodia.',
  hub2_flags: '🇰🇷 🇯🇵', hub2_title: 'Seoul & Tokyo OEM Laboratories', hub2_desc: 'Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare lines.',
  hub3_flags: '🇨🇳 🇰🇭', hub3_title: 'Guangzhou & Phnom Penh Central', hub3_desc: 'Bulk manufacturing, custom eco packaging, and central distribution warehouse in Phnom Penh.',
  cta: 'Partner with UNT Company',
};

const TABS = ['Header', 'Mission', 'Advantages', 'Network'] as const;
type Tab = typeof TABS[number];

export function AboutEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHomepageSection('about_page')
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    setSaving(true); setError('');
    try {
      await api.updateHomepageSection('about_page', data, token);
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  return (
    <EditorShell
      title="About Page"
      description="Edit all content shown on the About Us page."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Header' && (
        <Card>
          <div className="space-y-4 max-w-2xl">
            <SectionDivider label="Page Header" />
            <Field label="Badge" value={data.badge} onChange={set('badge')} />
            <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
            <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={4} />
          </div>
        </Card>
      )}

      {activeTab === 'Mission' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Mission Content" />
              <Field label="Section Badge" value={data.mission_badge} onChange={set('mission_badge')} />
              <Field label="Heading" value={data.mission_heading} onChange={set('mission_heading')} multiline />
              <Field label="Paragraph 1" value={data.mission_p1} onChange={set('mission_p1')} multiline rows={4} />
              <Field label="Paragraph 2" value={data.mission_p2} onChange={set('mission_p2')} multiline rows={4} />
            </div>
          </Card>
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <SectionDivider label="Stats" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2].map((n) => (
                    <div key={n} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Stat {n}</p>
                      <Field label="Value" value={data[`stat${n}_value`]} onChange={set(`stat${n}_value`)} />
                      <Field label="Label" value={data[`stat${n}_label`]} onChange={set(`stat${n}_label`)} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card>
              <div className="space-y-4">
                <SectionDivider label="HQ Info & Image" />
                <ImageField label="Mission Image" value={data.mission_image} onChange={set('mission_image')} />
                <Field label="HQ Label" value={data.hq_label} onChange={set('hq_label')} />
                <Field label="HQ Address" value={data.hq_address} onChange={set('hq_address')} multiline />
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'Advantages' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Section Header" />
              <Field label="Section Badge" value={data.adv_badge} onChange={set('adv_badge')} />
              <Field label="Section Heading" value={data.adv_heading} onChange={set('adv_heading')} />
            </div>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <Card key={n}>
                <div className="space-y-3">
                  <SectionDivider label={`Advantage ${n}`} />
                  <Field label="Title" value={data[`adv${n}_title`]} onChange={set(`adv${n}_title`)} />
                  <Field label="Description" value={data[`adv${n}_desc`]} onChange={set(`adv${n}_desc`)} multiline />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Network' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Section Header" />
              <Field label="Section Badge" value={data.net_badge} onChange={set('net_badge')} />
              <Field label="Section Heading" value={data.net_heading} onChange={set('net_heading')} multiline />
              <Field label="Section Subtext" value={data.net_sub} onChange={set('net_sub')} multiline />
              <Field label="CTA Button Text" value={data.cta} onChange={set('cta')} />
            </div>
          </Card>
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <Card key={n}>
                <div className="space-y-3">
                  <SectionDivider label={`Hub ${n}`} />
                  <Field label="Flag Emojis" value={data[`hub${n}_flags`]} onChange={set(`hub${n}_flags`)} />
                  <Field label="Title" value={data[`hub${n}_title`]} onChange={set(`hub${n}_title`)} />
                  <Field label="Description" value={data[`hub${n}_desc`]} onChange={set(`hub${n}_desc`)} multiline />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </EditorShell>
  );
}
