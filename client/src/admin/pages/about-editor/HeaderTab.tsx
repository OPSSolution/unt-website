import { Card, Field, SectionDivider } from '../../components/EditorShell';
import { AboutPageData } from './data';

interface HeaderTabProps {
  data: AboutPageData;
  setField: (key: string) => (value: string) => void;
}

export function HeaderTab({ data, setField }: HeaderTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Page Header Copy" />
          <Field label="Badge Text (Top Label)" value={data.badge} onChange={setField('badge')} />
          <Field label="Main Headline" value={data.headline} onChange={setField('headline')} multiline rows={2} />
          <Field label="Subheadline Paragraph" value={data.subheadline} onChange={setField('subheadline')} multiline rows={5} />
        </div>
      </Card>

      <Card>
        <div className="space-y-4 h-full flex flex-col">
          <SectionDivider label="Live Preview" />
          <div className="flex-1 bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 border border-slate-800 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {data.badge || 'Badge Text'}
              </span>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight leading-tight">
                {data.headline || 'Main Headline'}
              </h2>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                {data.subheadline || 'Subheadline text will appear here...'}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
            Preview of the hero header on the public About Us page
          </p>
        </div>
      </Card>
    </div>
  );
}
