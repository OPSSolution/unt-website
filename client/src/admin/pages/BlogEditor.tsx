import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS = {
  badge: 'Cambodia & ASEAN Trade Intelligence',
  headline: 'Market Insights & Regulatory News',
  subheadline: 'Stay informed on GDCE customs updates, Ministry of Commerce regulations, regional FMCG trends, and OEM private label innovations.',
};

export function BlogEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<any>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'blog_page',
    data,
    async (d) => {
      if (!token) return;
      await api.updateHomepageSection('blog_page', d, token);
    },
    1500,
    !loading
  );

  useEffect(() => {
    api.getHomepageSection('blog_page')
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    try {
      await api.updateHomepageSection('blog_page', data, token);
    } catch (e: any) { /* auto-save will show errors */ }
  };

  return (
    <EditorShell
      title="Blog / Market Insights Page"
      description="Edit the header content shown on the Market Insights blog page. Changes are saved automatically."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
    >
      <Card className="max-w-2xl">
        <div className="space-y-4">
          <SectionDivider label="Page Header" />
          <Field label="Badge" value={data.badge} onChange={set('badge')} />
          <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
          <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={3} />
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
            To add/edit articles go to <strong>Market Insights → Articles</strong> in the sidebar.
          </p>
        </div>
      </Card>
    </EditorShell>
  );
}
