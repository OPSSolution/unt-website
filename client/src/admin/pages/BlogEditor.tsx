import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS = {
  badge: 'Cambodia & ASEAN Trade Intelligence',
  headline: 'Market Insights & Regulatory News',
  subheadline: 'Stay informed on GDCE customs updates, Ministry of Commerce regulations, regional FMCG trends, and OEM private label innovations.',
};

export function BlogEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<any>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHomepageSection('blog_page')
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    setSaving(true); setError('');
    try {
      await api.updateHomepageSection('blog_page', data, token);
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  return (
    <EditorShell
      title="Blog / Market Insights Page"
      description="Edit the header content shown on the Market Insights blog page."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
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
