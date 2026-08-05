import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS = {
  badge: 'UNT Trade Capacity Building Institute',
  headline: 'Mastering the Art of Global Commerce',
  subheadline: "Elevate your commercial team's B2B negotiation skills, buyer psychology, key account retention, and international supply chain management.",
  stat1_value: '1,200+', stat1_label: 'Professionals Certified',
  stat2_value: '4.9 / 5.0', stat2_label: 'Average Course Rating',
  stat3_value: '15+', stat3_label: 'Senior Trade Instructors',
  stat4_value: '34%', stat4_label: 'Avg 90-Day Conversion Lift',
  tracks_badge: 'Curriculum',
  tracks_heading: 'Specialized B2B Commercial Tracks',
  tracks_sub: 'Select a track below to review full module syllabi, target audience criteria, and enrollment schedules.',
  bootcamp_badge: 'In-House Corporate Solutions',
  bootcamp_heading: 'Need a Private Masterclass for Your Commercial Team?',
  bootcamp_desc: 'We deliver custom on-site workshops tailored to your industry, product catalog, and specific negotiation challenges directly at your Phnom Penh corporate headquarters.',
  bootcamp_cta: 'Book Corporate Session',
};

const TABS = ['Hero', 'Stats', 'Tracks & Bootcamp'] as const;
type Tab = typeof TABS[number];

export function TrainingEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHomepageSection('training_page')
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    setSaving(true); setError('');
    try {
      await api.updateHomepageSection('training_page', data, token);
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  return (
    <EditorShell
      title="Sales Training Page"
      description="Edit content shown on the Sales Training page."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Hero' && (
        <Card className="max-w-2xl">
          <div className="space-y-4">
            <SectionDivider label="Hero Section" />
            <Field label="Badge" value={data.badge} onChange={set('badge')} />
            <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
            <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={4} />
          </div>
        </Card>
      )}

      {activeTab === 'Stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <Card key={n}>
              <div className="space-y-3">
                <SectionDivider label={`Stat ${n}`} />
                <Field label="Value" value={data[`stat${n}_value`]} onChange={set(`stat${n}_value`)} />
                <Field label="Label" value={data[`stat${n}_label`]} onChange={set(`stat${n}_label`)} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'Tracks & Bootcamp' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Tracks Section" />
              <Field label="Badge" value={data.tracks_badge} onChange={set('tracks_badge')} />
              <Field label="Heading" value={data.tracks_heading} onChange={set('tracks_heading')} multiline />
              <Field label="Subtext" value={data.tracks_sub} onChange={set('tracks_sub')} multiline />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Corporate Bootcamp Banner" />
              <Field label="Badge" value={data.bootcamp_badge} onChange={set('bootcamp_badge')} />
              <Field label="Heading" value={data.bootcamp_heading} onChange={set('bootcamp_heading')} multiline />
              <Field label="Description" value={data.bootcamp_desc} onChange={set('bootcamp_desc')} multiline rows={4} />
              <Field label="CTA Button" value={data.bootcamp_cta} onChange={set('bootcamp_cta')} />
            </div>
          </Card>
        </div>
      )}
    </EditorShell>
  );
}
