import { Card, Field, SectionDivider } from '../../components/EditorShell';
import { HeroStat, HomepageSection, SetField } from './types';

interface HeroTabProps {
  hero: HomepageSection;
  heroGlobe: HomepageSection;
  stats: HeroStat[];
  setHeroField: SetField;
  setGlobeField: SetField;
  updateStat: (index: number, changes: Partial<HeroStat>) => void;
}

export function HeroTab({ hero, heroGlobe, stats, setHeroField, setGlobeField, updateStat }: HeroTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <SectionDivider label="Hero Badge & Copy" />
            <Field label="Badge Text" value={hero.badge_text ?? ''} onChange={setHeroField('badge_text')} />
            <Field label="Headline" value={hero.headline ?? ''} onChange={setHeroField('headline')} multiline rows={3} />
            <Field label="Subtitle" value={hero.subtitle ?? ''} onChange={setHeroField('subtitle')} multiline rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Primary CTA" value={hero.cta_primary ?? ''} onChange={setHeroField('cta_primary')} />
              <Field label="Secondary CTA" value={hero.cta_secondary ?? ''} onChange={setHeroField('cta_secondary')} />
            </div>
          </div>
        </Card>
        <Card>
          <div className="space-y-4">
            <SectionDivider label="Globe Selector Label" />
            <Field label="Globe Instruction Text" value={heroGlobe.globe_label ?? ''} onChange={setGlobeField('globe_label')} />
            <Field label='"All" Button Label' value={heroGlobe.globe_all_label ?? ''} onChange={setGlobeField('globe_all_label')} />
          </div>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <SectionDivider label="Stats Cards (4 cards below hero)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={stat.id} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Stat {index + 1}</p>
                  <Field label="Value" value={stat.value} onChange={(value) => updateStat(index, { value })} />
                  <Field label="Label" value={stat.label} onChange={(label) => updateStat(index, { label })} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
