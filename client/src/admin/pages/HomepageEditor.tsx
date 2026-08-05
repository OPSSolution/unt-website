import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { ImageField } from '../components/ImageField';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

// ── Tabs mirror the 7 sections in HomePage.tsx ──────────────────────────────
const TABS = [
  '1. Hero',
  '2. Pillars',
  '3. Heritage',
  '4. Products Section',
  '5. OEM Banner',
  '6. Partners',
  '7. Market Insights',
] as const;
type Tab = typeof TABS[number];

export function HomepageEditor() {
  const { token } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<Tab>('1. Hero');

  // Section data states
  const [hero, setHero] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [pillars, setPillars] = useState<any>(null);
  const [heritage, setHeritage] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const [oem, setOem] = useState<any>(null);
  const [partners, setPartners] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);

  const [heroGlobe, setHeroGlobe] = useState<any>(null);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.getHeroContent(),
      api.getHeroStats(),
      api.getHomepageSection('pillars'),
      api.getHomepageSection('heritage'),
      api.getHomepageSection('products_section'),
      api.getHomepageSection('oem_banner'),
      api.getHomepageSection('partners_section'),
      api.getHomepageSection('insights_section'),
      api.getHomepageSection('hero_globe'),
    ]).then(([h, s, p, he, pr, o, pa, ins, hg]) => {
      setHero(h);
      setStats(s);
      setPillars(p.data);
      setHeritage(he.data);
      setProducts(pr.data ?? {
        badge: 'Wholesale & OEM Catalog',
        heading: 'Featured Import Catalog Items',
        subheading: 'Verified quality products ready for immediate Cambodian distribution or custom private label rebranding.',
        cta: 'View Full Catalog',
      });
      setOem(o.data);
      setPartners(pa.data ?? { label: 'Trusted Global Manufacturing Partners & Supplier Alliances' });
      setInsights(ins.data ?? {
        badge: 'Market Intelligence',
        heading: 'Latest Regulatory & Trade Insights',
        cta: 'View All Articles',
      });
      setHeroGlobe(hg.data ?? {
        globe_label: 'Interactive 3D Trade Hub Focus: Select Origin to Rotate 3D Globe',
        globe_all_label: 'Global ASEAN Network',
      });
    }).catch(() => setError('Failed to load. Make sure the server is running.'));
  }, []);

  const handleSave = async () => {
    if (!token) return;
    setSaving(true); setError('');
    try {
      await Promise.all([
        api.updateHeroContent(hero, token),
        ...stats.map((s) => api.updateHeroStat(s.id, s, token)),
        api.updateHomepageSection('pillars', pillars, token),
        api.updateHomepageSection('heritage', heritage, token),
        api.updateHomepageSection('products_section', products, token),
        api.updateHomepageSection('oem_banner', oem, token),
        api.updateHomepageSection('partners_section', partners, token),
        api.updateHomepageSection('insights_section', insights, token),
        api.updateHomepageSection('hero_globe', heroGlobe, token),
      ]);
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  const sh = (key: string) => (v: string) => setHero((c: any) => ({ ...c, [key]: v }));
  const shg = (key: string) => (v: string) => setHeroGlobe((c: any) => ({ ...c, [key]: v }));
  const sp = (key: string) => (v: string) => setPillars((c: any) => ({ ...c, [key]: v }));
  const she = (key: string) => (v: string) => setHeritage((c: any) => ({ ...c, [key]: v }));
  const spr = (key: string) => (v: string) => setProducts((c: any) => ({ ...c, [key]: v }));
  const so = (key: string) => (v: string) => setOem((c: any) => ({ ...c, [key]: v }));
  const spa = (key: string) => (v: string) => setPartners((c: any) => ({ ...c, [key]: v }));
  const sins = (key: string) => (v: string) => setInsights((c: any) => ({ ...c, [key]: v }));

  const isLoaded = hero && pillars && heritage && oem;

  return (
    <EditorShell
      title="Homepage Editor"
      description="Edit every section of the homepage — follows the exact page structure."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={!isLoaded && !error}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {isLoaded && (
        <>
          {/* ── Section 1: Hero ─────────────────────────────────────────── */}
          {activeTab === '1. Hero' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <div className="space-y-4">
                    <SectionDivider label="Hero Badge & Copy" />
                    <Field label="Badge Text" value={hero.badge_text ?? ''} onChange={sh('badge_text')} />
                    <Field label="Headline" value={hero.headline ?? ''} onChange={sh('headline')} multiline rows={3} />
                    <Field label="Subtitle" value={hero.subtitle ?? ''} onChange={sh('subtitle')} multiline rows={3} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Primary CTA" value={hero.cta_primary ?? ''} onChange={sh('cta_primary')} />
                      <Field label="Secondary CTA" value={hero.cta_secondary ?? ''} onChange={sh('cta_secondary')} />
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="space-y-4">
                    <SectionDivider label="Globe Selector Label" />
                    <Field label="Globe Instruction Text" value={heroGlobe.globe_label ?? 'Interactive 3D Trade Hub Focus: Select Origin to Rotate 3D Globe'} onChange={shg('globe_label')} />
                    <Field label='"All" Button Label' value={heroGlobe.globe_all_label ?? 'Global ASEAN Network'} onChange={shg('globe_all_label')} />
                  </div>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <div className="space-y-4">
                    <SectionDivider label="Stats Cards (4 cards below hero)" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stats.map((stat, i) => (
                        <div key={stat.id} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Stat {i + 1}</p>
                          <Field label="Value" value={stat.value} onChange={(v) => setStats(stats.map((s, idx) => idx === i ? { ...s, value: v } : s))} />
                          <Field label="Label" value={stat.label} onChange={(v) => setStats(stats.map((s, idx) => idx === i ? { ...s, label: v } : s))} />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="space-y-4">
                    <SectionDivider label="Feature Image (Heritage section)" />
                    <ImageField label="Image" value={hero.feature_image ?? ''} onChange={sh('feature_image')} />
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ── Section 2: Three Pillars ─────────────────────────────────── */}
          {activeTab === '2. Pillars' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Section Header" />
                  <Field label="Badge" value={pillars.badge ?? ''} onChange={sp('badge')} />
                  <Field label="Heading" value={pillars.heading ?? ''} onChange={sp('heading')} multiline />
                  <Field label="Subheading" value={pillars.subheading ?? ''} onChange={sp('subheading')} multiline />
                </div>
              </Card>
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <Card key={n}>
                    <div className="space-y-3">
                      <SectionDivider label={`Pillar ${n}`} />
                      <Field label="Title" value={pillars[`pillar${n}_title`] ?? ''} onChange={sp(`pillar${n}_title`)} />
                      <Field label="Description" value={pillars[`pillar${n}_desc`] ?? ''} onChange={sp(`pillar${n}_desc`)} multiline />
                      <Field label="CTA Link Text" value={pillars[`pillar${n}_cta`] ?? ''} onChange={sp(`pillar${n}_cta`)} />
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((b) => (
                          <Field key={b} label={`Bullet ${b}`} value={pillars[`pillar${n}_bullet${b}`] ?? ''} onChange={sp(`pillar${n}_bullet${b}`)} />
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── Section 3: Heritage & Efficiency ────────────────────────── */}
          {activeTab === '3. Heritage' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Section Header" />
                  <Field label="Badge" value={heritage.badge ?? ''} onChange={she('badge')} />
                  <Field label="Heading" value={heritage.heading ?? ''} onChange={she('heading')} multiline />
                  <Field label="Paragraph" value={heritage.paragraph ?? ''} onChange={she('paragraph')} multiline rows={4} />
                  <SectionDivider label="Quality Badge (image overlay)" />
                  <Field label="Quality Badge Title" value={heritage.quality_badge ?? ''} onChange={she('quality_badge')} />
                  <Field label="Quality Description" value={heritage.quality_desc ?? ''} onChange={she('quality_desc')} multiline />
                </div>
              </Card>
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <Card key={n}>
                    <div className="space-y-3">
                      <SectionDivider label={`Feature Row ${n}`} />
                      <Field label="Title" value={heritage[`feature${n}_title`] ?? ''} onChange={she(`feature${n}_title`)} />
                      <Field label="Description" value={heritage[`feature${n}_desc`] ?? ''} onChange={she(`feature${n}_desc`)} multiline />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── Section 4: Products Preview ──────────────────────────────── */}
          {activeTab === '4. Products Section' && products && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Section Header" />
                  <Field label="Badge" value={products.badge ?? ''} onChange={spr('badge')} />
                  <Field label="Heading" value={products.heading ?? ''} onChange={spr('heading')} multiline />
                  <Field label="Subheading" value={products.subheading ?? ''} onChange={spr('subheading')} multiline />
                  <Field label="CTA Button Text" value={products.cta ?? ''} onChange={spr('cta')} />
                </div>
              </Card>
              <Card>
                <div className="space-y-3">
                  <SectionDivider label="Country Banner Labels" />
                  <Field label='"All Origins" Active Label' value={products.all_origins_label ?? '✦ All Origins'} onChange={spr('all_origins_label')} />
                  <Field label='"All Origins" Inactive Label' value={products.all_origins_inactive ?? 'All Origins'} onChange={spr('all_origins_inactive')} />
                  <Field label="All Origins Banner Text" value={products.all_origins_banner ?? 'Full product catalog from South Korea, Japan, China & Vietnam'} onChange={spr('all_origins_banner')} />
                  <SectionDivider label="Banner Labels" />
                  <Field label='"Lead Time" Label' value={products.lead_time_label ?? 'Lead Time'} onChange={spr('lead_time_label')} />
                  <Field label='"Min. Order" Label' value={products.min_order_label ?? 'Min. Order'} onChange={spr('min_order_label')} />
                </div>
              </Card>
            </div>
          )}

          {/* ── Section 5: OEM Banner ────────────────────────────────────── */}
          {activeTab === '5. OEM Banner' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Banner Content" />
                  <Field label="Badge" value={oem.badge ?? ''} onChange={so('badge')} />
                  <Field label="Heading" value={oem.heading ?? ''} onChange={so('heading')} multiline />
                  <Field label="Paragraph" value={oem.paragraph ?? ''} onChange={so('paragraph')} multiline rows={4} />
                  <Field label="CTA Button Text" value={oem.cta ?? ''} onChange={so('cta')} />
                </div>
              </Card>
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="4 Feature Chips" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Chip {n}</p>
                        <Field label="Title" value={oem[`chip${n}_title`] ?? ''} onChange={so(`chip${n}_title`)} />
                        <Field label="Subtitle" value={oem[`chip${n}_sub`] ?? ''} onChange={so(`chip${n}_sub`)} />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ── Section 6: Partners ──────────────────────────────────────── */}
          {activeTab === '6. Partners' && partners && (
            <Card>
              <div className="space-y-4 max-w-xl">
                <SectionDivider label="Partners Strip Label" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This section displays the partners list. To add/edit partners go to <strong>Wholesale Catalog → Partners</strong> in the sidebar.
                </p>
                <Field label="Section Label Text" value={partners.label ?? ''} onChange={spa('label')} />
              </div>
            </Card>
          )}

          {/* ── Section 7: Market Insights ───────────────────────────────── */}
          {activeTab === '7. Market Insights' && insights && (
            <Card>
              <div className="space-y-4 max-w-xl">
                <SectionDivider label="Section Header" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This section displays the latest 2 articles. To add/edit articles go to <strong>Market Insights → Articles</strong> in the sidebar.
                </p>
                <Field label="Badge" value={insights.badge ?? ''} onChange={sins('badge')} />
                <Field label="Heading" value={insights.heading ?? ''} onChange={sins('heading')} multiline />
                <Field label="CTA Link Text" value={insights.cta ?? ''} onChange={sins('cta')} />
              </div>
            </Card>
          )}
        </>
      )}
    </EditorShell>
  );
}
