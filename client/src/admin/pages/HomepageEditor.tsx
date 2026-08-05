import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const TABS = ['Pillars', 'Heritage', 'OEM Banner'] as const;
type Tab = typeof TABS[number];

export function HomepageEditor() {
  const { token } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<Tab>('Pillars');
  const [pillars, setPillars] = useState<any>(null);
  const [heritage, setHeritage] = useState<any>(null);
  const [oem, setOem] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.getHomepageSection('pillars'),
      api.getHomepageSection('heritage'),
      api.getHomepageSection('oem_banner'),
    ]).then(([p, h, o]) => {
      setPillars(p.data); setHeritage(h.data); setOem(o.data);
    }).catch(() => setError('Failed to load. Make sure the server is running.'));
  }, []);

  const handleSave = async () => {
    if (!token) return;
    setSaving(true); setError('');
    try {
      await Promise.all([
        api.updateHomepageSection('pillars', pillars, token),
        api.updateHomepageSection('heritage', heritage, token),
        api.updateHomepageSection('oem_banner', oem, token),
      ]);
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  const f = (obj: any, set: (v: any) => void, key: string) => (v: string) => set({ ...obj, [key]: v });

  return (
    <EditorShell
      title="Homepage Sections"
      description="Edit homepage content section by section — Pillars, Heritage & OEM Banner."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={!pillars && !heritage && !oem && !error}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {pillars && heritage && oem && (
        <>
          {activeTab === 'Pillars' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Section Header" />
                  <Field label="Badge" value={pillars.badge} onChange={f(pillars, setPillars, 'badge')} />
                  <Field label="Heading" value={pillars.heading} onChange={f(pillars, setPillars, 'heading')} multiline />
                  <Field label="Subheading" value={pillars.subheading} onChange={f(pillars, setPillars, 'subheading')} multiline />
                </div>
              </Card>
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <Card key={n}>
                    <div className="space-y-3">
                      <SectionDivider label={`Pillar ${n}`} />
                      <Field label="Title" value={pillars[`pillar${n}_title`]} onChange={f(pillars, setPillars, `pillar${n}_title`)} />
                      <Field label="Description" value={pillars[`pillar${n}_desc`]} onChange={f(pillars, setPillars, `pillar${n}_desc`)} multiline />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Heritage' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Section Header" />
                  <Field label="Badge" value={heritage.badge} onChange={f(heritage, setHeritage, 'badge')} />
                  <Field label="Heading" value={heritage.heading} onChange={f(heritage, setHeritage, 'heading')} multiline />
                  <Field label="Paragraph" value={heritage.paragraph} onChange={f(heritage, setHeritage, 'paragraph')} multiline rows={4} />
                  <Field label="Quality Badge" value={heritage.quality_badge} onChange={f(heritage, setHeritage, 'quality_badge')} />
                  <Field label="Quality Description" value={heritage.quality_desc} onChange={f(heritage, setHeritage, 'quality_desc')} multiline />
                </div>
              </Card>
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <Card key={n}>
                    <div className="space-y-3">
                      <SectionDivider label={`Feature ${n}`} />
                      <Field label="Title" value={heritage[`feature${n}_title`]} onChange={f(heritage, setHeritage, `feature${n}_title`)} />
                      <Field label="Description" value={heritage[`feature${n}_desc`]} onChange={f(heritage, setHeritage, `feature${n}_desc`)} multiline />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'OEM Banner' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Banner Content" />
                  <Field label="Badge" value={oem.badge} onChange={f(oem, setOem, 'badge')} />
                  <Field label="Heading" value={oem.heading} onChange={f(oem, setOem, 'heading')} multiline />
                  <Field label="Paragraph" value={oem.paragraph} onChange={f(oem, setOem, 'paragraph')} multiline rows={4} />
                  <Field label="CTA Button Text" value={oem.cta} onChange={f(oem, setOem, 'cta')} />
                </div>
              </Card>
              <Card>
                <div className="space-y-4">
                  <SectionDivider label="Feature Chips" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Chip {n}</p>
                        <Field label="Title" value={oem[`chip${n}_title`]} onChange={f(oem, setOem, `chip${n}_title`)} />
                        <Field label="Subtitle" value={oem[`chip${n}_sub`]} onChange={f(oem, setOem, `chip${n}_sub`)} />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </EditorShell>
  );
}
