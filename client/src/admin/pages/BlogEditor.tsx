import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';

const DEFAULTS: Record<string, string> = {
  badge: 'Cambodia & ASEAN Trade Intelligence',
  headline: 'Market Insights & Regulatory News',
  subheadline: 'Stay informed on GDCE customs updates, Ministry of Commerce regulations, regional FMCG trends, and OEM private label innovations.',
  hero_chip_1: 'GDCE Customs Tariff Verified',
  hero_chip_2: 'ASEAN Trade & AKFTA Regulations',
  hero_chip_3: 'FMCG Wholesale Market Reports',
  search_placeholder: 'Search GDCE customs guides, FMCG market reports, or Ministry rules...',
  results_label: 'Verified Intelligence Briefings',
  category_all: 'All Reports',
  category_regulatory: 'Regulatory Updates',
  category_oem: 'OEM Case Studies',
  category_supply: 'Supply Chain',
  category_retail: 'Retail Strategy',
  trending_label: 'Trending Topics:',
  trending_1: 'GDCECustoms2026',
  trending_2: 'AKFTAPermits',
  trending_3: 'MoHCosmetics',
  trending_4: 'FMCGBulkPricing',
  trending_5: 'PrivateLabelOEM',
  featured_badge: 'Featured Trade Analysis',
  featured_verified: 'GDCE Verified Briefing',
  featured_read: 'Read Full Briefing',
  card_verified: 'Verified Briefing',
  card_read: 'Read Trade Analysis',
  empty_message: 'No trade insights match your search.',
};

export function BlogEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<Record<string, string>>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    'blog_page', data,
    async (value) => {
      if (token) await api.updateHomepageSection('blog_page', value, token);
    },
    1500,
    !loading,
  );

  useEffect(() => {
    api.getHomepageSection('blog_page')
      .then((response) => { if (response.data) setData({ ...DEFAULTS, ...response.data }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string) => (value: string) => setData((current) => ({ ...current, [key]: value }));
  const handleSave = async () => {
    if (token) await api.updateHomepageSection('blog_page', data, token);
  };

  return (
    <EditorShell
      title="Blog / Market Insights Page"
      description="Edit all labels and page text shown on Market Insights. Article content is managed separately."
      saving={saving} saved={saved} error={error} onSave={handleSave} loading={loading}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card><div className="space-y-4">
          <SectionDivider label="Page Header" />
          <Field label="Badge" value={data.badge} onChange={set('badge')} />
          <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
          <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={3} />
          <SectionDivider label="Hero Highlight Chips" />
          {[1, 2, 3].map((number) => <Field key={number} label={`Highlight ${number}`} value={data[`hero_chip_${number}`]} onChange={set(`hero_chip_${number}`)} />)}
        </div></Card>

        <Card><div className="space-y-4">
          <SectionDivider label="Search & Filters" />
          <Field label="Search Placeholder" value={data.search_placeholder} onChange={set('search_placeholder')} />
          <Field label="Results Counter Label" value={data.results_label} onChange={set('results_label')} />
          <Field label="All Reports" value={data.category_all} onChange={set('category_all')} />
          <Field label="Regulatory Updates" value={data.category_regulatory} onChange={set('category_regulatory')} />
          <Field label="OEM Case Studies" value={data.category_oem} onChange={set('category_oem')} />
          <Field label="Supply Chain" value={data.category_supply} onChange={set('category_supply')} />
          <Field label="Retail Strategy" value={data.category_retail} onChange={set('category_retail')} />
        </div></Card>

        <Card><div className="space-y-4">
          <SectionDivider label="Trending Topics" />
          <Field label="Section Label" value={data.trending_label} onChange={set('trending_label')} />
          {[1, 2, 3, 4, 5].map((number) => <Field key={number} label={`Topic ${number}`} value={data[`trending_${number}`]} onChange={set(`trending_${number}`)} />)}
        </div></Card>

        <Card><div className="space-y-4">
          <SectionDivider label="Article Labels" />
          <Field label="Featured Badge" value={data.featured_badge} onChange={set('featured_badge')} />
          <Field label="Featured Verification Label" value={data.featured_verified} onChange={set('featured_verified')} />
          <Field label="Featured Read Button" value={data.featured_read} onChange={set('featured_read')} />
          <Field label="Card Verification Label" value={data.card_verified} onChange={set('card_verified')} />
          <Field label="Card Read Button" value={data.card_read} onChange={set('card_read')} />
          <Field label="No Results Message" value={data.empty_message} onChange={set('empty_message')} />
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">Article titles, images, and descriptions are managed under <strong>Market Insights → Articles</strong>.</p>
        </div></Card>
      </div>
    </EditorShell>
  );
}
