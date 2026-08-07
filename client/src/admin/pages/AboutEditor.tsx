import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { ImageField } from '../components/ImageField';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';
import { Plus, Trash2 } from 'lucide-react';
import { AboutPageData, Advantage, NetworkHub, normalizeAboutData } from './about-editor/data';
import { HeaderTab } from './about-editor/HeaderTab';

const DEFAULTS = {
  badge: 'About Unique Noble Trading Co., Ltd.',
  headline: 'The Bridge to Global Trade',
  subheadline: 'Unique Noble Trading Co., Ltd. is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.',
  mission_badge: 'Our Purpose & Mission',
  mission_heading: 'Connecting World-Class Manufacturers with Emerging ASEAN Markets',
  mission_p1: 'Founded with the vision of modernizing Cambodian import commerce, Unique Noble Trading Co., Ltd. acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners.',
  mission_p2: 'Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.',
  mission_image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
  hq_label: 'Phnom Penh Corporate Headquarters',
  hq_address: 'Phnom Penh Tower, Monivong Blvd, Doun Penh, Phnom Penh',
  stat1_value: '100%', stat1_label: 'Regulatory & Tax Audit Compliant',
  stat2_value: '1,200+', stat2_label: 'Trade & Sales Professionals Trained',
  adv_badge: 'Why Business Leaders Choose UNT',
  adv_heading: 'The UNT Advantage',
  adv1_title: 'Direct Factory Audit', adv1_desc: 'We physically audit ISO and GMP facilities across Thailand, Vietnam, Korea, Japan, and China.',
  adv3_title: 'Cold Chain & Logistics', adv3_desc: 'Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate products.',
  adv4_title: 'Sales & Capacity Building', adv4_desc: "We train client commercial teams in consultative selling, buyer psychology, and key account growth.",
  net_badge: 'Strategic Infrastructure',
  net_heading: 'Our Global Network & Operations Hubs',
  net_sub: 'Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.',
  hub1_flags: '🇹🇭 🇻🇳', hub1_title: 'Bangkok & Ho Chi Minh Corridors', hub1_desc: 'Cross-border overland logistics hub for rapid F&B, organic coconut water, teas, and household consumer product shipments into Cambodia.',
  hub2_flags: '🇰🇷 🇯🇵', hub2_title: 'Seoul & Tokyo OEM Laboratories', hub2_desc: 'Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare lines.',
  hub3_flags: '🇨🇳 🇰🇭', hub3_title: 'Guangzhou & Phnom Penh Central', hub3_desc: 'Bulk manufacturing, custom eco packaging, and central distribution warehouse in Phnom Penh.',
  cta: 'Partner with Unique Noble Trading Co., Ltd.',
};

const TABS = ['Header', 'Mission', 'Advantages', 'Network'] as const;
type Tab = typeof TABS[number];

export function AboutEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<AboutPageData>(() => normalizeAboutData(DEFAULTS));
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [loading, setLoading] = useState(true);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'about_page',
    data,
    async (d) => {
      if (!token) return;
      await api.updateHomepageSection('about_page', d, token);
    },
    1500,
    !loading
  );

  useEffect(() => {
    api.getHomepageSection('about_page')
      .then((r) => { 
        if (r.data) {
          const d = { ...r.data };
          // Migration for Advantages
          if (!d.advantages) {
            d.advantages = [1, 2, 3, 4].map(n => ({
              title: d[`adv${n}_title`] || DEFAULTS[`adv${n}_title` as keyof typeof DEFAULTS],
              desc: d[`adv${n}_desc`] || DEFAULTS[`adv${n}_desc` as keyof typeof DEFAULTS],
              icon: ['ShieldCheck', 'Building2', 'Truck', 'Users'][n - 1]
            }));
          }
          // Migration for Network Hubs
          if (!d.network_hubs) {
            d.network_hubs = [1, 2, 3].map(n => ({
              flags: d[`hub${n}_flags`] || DEFAULTS[`hub${n}_flags` as keyof typeof DEFAULTS],
              title: d[`hub${n}_title`] || DEFAULTS[`hub${n}_title` as keyof typeof DEFAULTS],
              desc: d[`hub${n}_desc`] || DEFAULTS[`hub${n}_desc` as keyof typeof DEFAULTS]
            }));
          }
          setData(normalizeAboutData(d));
        } 
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (value: string) => setData((current) => ({ ...current, [key]: value }));
  const updateAdvantage = (index: number, changes: Partial<Advantage>) => setData((current) => ({
    ...current,
    advantages: current.advantages.map((advantage, itemIndex) => itemIndex === index ? { ...advantage, ...changes } : advantage),
  }));
  const updateHub = (index: number, changes: Partial<NetworkHub>) => setData((current) => ({
    ...current,
    network_hubs: current.network_hubs.map((hub, itemIndex) => itemIndex === index ? { ...hub, ...changes } : hub),
  }));

  const handleSave = async () => {
    if (!token) return;
    try {
      await api.updateHomepageSection('about_page', data, token);
    } catch { /* Auto-save reports the error in the editor shell. */ }
  };

  return (
    <EditorShell
      title="About Page"
      description="Edit all content shown on the About Us page. Changes are saved automatically."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Header' && <HeaderTab data={data} setField={set} />}

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
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4">
            <Card>
              <div className="space-y-4">
                <SectionDivider label="Section Header" />
                <Field label="Section Badge" value={data.adv_badge} onChange={set('adv_badge')} />
                <Field label="Section Heading" value={data.adv_heading} onChange={set('adv_heading')} />
                <button
                  onClick={() => {
                    setData((current) => ({ ...current, advantages: [...current.advantages, { title: 'New Advantage', desc: 'Description', icon: 'Star' }] }));
                  }}
                  className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Advantage
                </button>
              </div>
            </Card>
          </div>
          <div className="xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.advantages.map((adv, i) => (
                <Card key={i}>
                  <div className="space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <SectionDivider label={`Advantage ${i + 1}`} />
                      <button
                        onClick={() => {
                          setData((current) => ({ ...current, advantages: current.advantages.filter((_, index) => index !== i) }));
                        }}
                        className="text-red-400 hover:text-red-500 transition-colors p-1"
                        title="Remove Advantage"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Icon</label>
                      <select 
                        value={adv.icon || 'Star'} 
                        onChange={(e) => {
                          updateAdvantage(i, { icon: e.target.value });
                        }}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                      >
                        {['ShieldCheck', 'Building2', 'Truck', 'Users', 'Globe', 'CheckCircle2', 'TrendingUp', 'Anchor', 'Target', 'Award', 'Box', 'Package', 'Star'].map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>

                    <Field 
                      label="Title" 
                      value={adv.title} 
                      onChange={(val) => {
                        updateAdvantage(i, { title: val });
                      }} 
                    />
                    <Field 
                      label="Description" 
                      value={adv.desc} 
                      onChange={(val) => {
                        updateAdvantage(i, { desc: val });
                      }} 
                      multiline 
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Network' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4">
            <Card>
              <div className="space-y-4">
                <SectionDivider label="Section Header" />
                <Field label="Section Badge" value={data.net_badge} onChange={set('net_badge')} />
                <Field label="Section Heading" value={data.net_heading} onChange={set('net_heading')} multiline />
                <Field label="Section Subtext" value={data.net_sub} onChange={set('net_sub')} multiline />
                <Field label="CTA Button Text" value={data.cta} onChange={set('cta')} />
                <button
                  onClick={() => {
                    const newHubs = [...(data.network_hubs || []), { flags: '🏳️', title: 'New Hub', desc: 'Description' }];
                    setData({ ...data, network_hubs: newHubs });
                  }}
                  className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Hub
                </button>
              </div>
            </Card>
          </div>
          <div className="xl:col-span-8">
            <div className="space-y-4">
              {data.network_hubs.map((hub, i) => (
                <Card key={i}>
                  <div className="space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <SectionDivider label={`Hub ${i + 1}`} />
                      <button
                        onClick={() => {
                          setData((current) => ({ ...current, network_hubs: current.network_hubs.filter((_, index) => index !== i) }));
                        }}
                        className="text-red-400 hover:text-red-500 transition-colors p-1"
                        title="Remove Hub"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <Field 
                      label="Flag Emojis" 
                      value={hub.flags} 
                      onChange={(val) => {
                        updateHub(i, { flags: val });
                      }} 
                    />
                    <Field 
                      label="Title" 
                      value={hub.title} 
                      onChange={(val) => {
                        updateHub(i, { title: val });
                      }} 
                    />
                    <Field 
                      label="Description" 
                      value={hub.desc} 
                      onChange={(val) => {
                        updateHub(i, { desc: val });
                      }} 
                      multiline 
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </EditorShell>
  );
}
