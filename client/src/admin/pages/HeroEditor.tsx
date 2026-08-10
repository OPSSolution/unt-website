import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

export function HeroEditor() {
  const { token } = useAdminAuth();
  const [content, setContent] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'hero',
    content ? { content, stats } : null,
    async (data) => {
      if (!token) return;
      await api.updateHeroContent(data.content, token);
      await Promise.all(data.stats.map((stat: any) => api.updateHeroStat(stat.id, stat, token)));
    },
    1500,
    loaded
  );

  useEffect(() => {
    Promise.all([api.getHeroContent(), api.getHeroStats()])
      .then(([c, s]) => { setContent(c); setStats(s); setLoaded(true); })
      .catch(() => setLoadError('Failed to load hero data. Make sure the server is running.'));
  }, []);

  const handleSave = async () => {
    if (!token) return;
    await api.updateHeroContent(content, token);
    await Promise.all(stats.map((s) => api.updateHeroStat(s.id, s, token)));
  };

  const set = (key: string) => (v: string) => setContent((c: any) => ({ ...c, [key]: v }));

  return (
    <EditorShell
      title="Hero Section"
      description="Edit the homepage hero headline, badge, CTA buttons and stats. Changes are saved automatically."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={!content && !loadError}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
    >
      {loadError && !content ? null : content && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <SectionDivider label="Hero Content" />
                <Field label="Badge Text" value={content.badge_text} onChange={set('badge_text')} />
                <Field label="Headline" value={content.headline} onChange={set('headline')} multiline rows={3} />
                <Field label="Subtitle" value={content.subtitle} onChange={set('subtitle')} multiline rows={3} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Primary CTA Button" value={content.cta_primary} onChange={set('cta_primary')} />
                  <Field label="Secondary CTA Button" value={content.cta_secondary} onChange={set('cta_secondary')} />
                </div>
              </div>
            </Card>

          </div>

          {/* Right column */}
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Stats Cards" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={stat.id} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Stat {i + 1}</p>
                    <Field
                      label="Value"
                      value={stat.value}
                      onChange={(v) => setStats(stats.map((s, idx) => idx === i ? { ...s, value: v } : s))}
                    />
                    <Field
                      label="Label"
                      value={stat.label}
                      onChange={(v) => setStats(stats.map((s, idx) => idx === i ? { ...s, label: v } : s))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </EditorShell>
  );
}
