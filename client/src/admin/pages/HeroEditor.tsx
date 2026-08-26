import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

export function HeroEditor() {
  const { token } = useAdminAuth();
  const [content, setContent] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'hero',
    content ? { content } : null,
    async (data) => {
      if (!token) return;
      await api.updateHeroContent(data.content, token);
    },
    1500,
    loaded
  );

  useEffect(() => {
    api.getHeroContent()
      .then((c) => { setContent(c); setLoaded(true); })
      .catch(() => setLoadError('Failed to load hero data. Make sure the server is running.'));
  }, []);

  const handleSave = async () => {
    if (!token) return;
    await api.updateHeroContent(content, token);
  };

  const set = (key: string) => (v: string) => setContent((c: any) => ({ ...c, [key]: v }));

  return (
    <EditorShell
      title="Hero Section"
      description="Edit the homepage hero headline, badge and CTA buttons. Changes are saved automatically."
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

        </div>
      )}
    </EditorShell>
  );
}
