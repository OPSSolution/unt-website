import { Card, Field, SectionDivider } from '../../components/EditorShell';
import { HomepageSection, SetField } from './types';

interface HeroTabProps {
  hero: HomepageSection;
  heroGlobe: HomepageSection;
  setHeroField: SetField;
  setGlobeField: SetField;
}

export function HeroTab({ hero, heroGlobe, setHeroField, setGlobeField }: HeroTabProps) {
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
    </div>
  );
}
