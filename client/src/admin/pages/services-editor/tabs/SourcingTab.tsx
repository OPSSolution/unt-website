import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';

interface SourcingTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
  selectedSourcingStepIndex: number;
  setSelectedSourcingStepIndex: React.Dispatch<React.SetStateAction<number>>;
  updateSourcingStep: (key: string, value: string) => void;
}

export function SourcingTab({
  data,
  set,
  selectedSourcingStepIndex,
  setSelectedSourcingStepIndex,
  updateSourcingStep,
}: SourcingTabProps) {
  const stepsList = Array.isArray(data.sourcing_steps) ? data.sourcing_steps : [];
  const step = stepsList[selectedSourcingStepIndex];

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Service 02 — Custom Sourcing" />
          <Field label="Badge" value={data.sourcing_badge ?? ''} onChange={set('sourcing_badge')} />
          <Field label="Title" value={data.sourcing_title ?? ''} onChange={set('sourcing_title')} />
          <Field label="Highlighted Title" value={data.sourcing_highlight ?? ''} onChange={set('sourcing_highlight')} />
          <Field label="Description" value={data.sourcing_desc ?? ''} onChange={set('sourcing_desc')} multiline rows={4} />
          <Field label="CTA Button" value={data.sourcing_cta ?? ''} onChange={set('sourcing_cta')} />
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <SectionDivider label="Procurement Roadmap Labels" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <Field label="Roadmap Title" value={data.sourcing_roadmap_title ?? ''} onChange={set('sourcing_roadmap_title')} />
            <Field label="Instruction" value={data.sourcing_roadmap_hint ?? ''} onChange={set('sourcing_roadmap_hint')} />
            <Field label="Phase Label" value={data.sourcing_phase_label ?? ''} onChange={set('sourcing_phase_label')} />
            <Field label="Details Label" value={data.sourcing_details_label ?? ''} onChange={set('sourcing_details_label')} />
            <Field label="Start Phase Button" value={data.sourcing_start_phase_label ?? ''} onChange={set('sourcing_start_phase_label')} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-5">
          <SectionDivider label="Five Procurement Phases" />
          <div className="flex flex-wrap gap-2">
            {stepsList.map((item: any, index: number) => (
              <button
                key={`${item.num}-${index}`}
                type="button"
                onClick={() => setSelectedSourcingStepIndex(index)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                  selectedSourcingStepIndex === index
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Phase {item.num || index + 1}
              </button>
            ))}
          </div>

          {!step ? (
            <p className="text-sm text-slate-500">No roadmap phases are available for this language.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Phase Number" value={step.num ?? ''} onChange={(v) => updateSourcingStep('num', v)} />
              <Field label="Phase Title" value={step.title ?? ''} onChange={(v) => updateSourcingStep('title', v)} />
              <div className="md:col-span-2">
                <Field label="Short Subtitle" value={step.subtitle ?? ''} onChange={(v) => updateSourcingStep('subtitle', v)} />
              </div>
              <div className="md:col-span-2">
                <Field label="Detailed Description" value={step.desc ?? ''} onChange={(v) => updateSourcingStep('desc', v)} multiline rows={4} />
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <SectionDivider label="What We Manage For You" />
            <Field label="Section Title" value={data.sourcing_manage_title ?? ''} onChange={set('sourcing_manage_title')} />
            <Field
              label="Managed Items (one per line)"
              value={data.sourcing_manage_items_text ?? ''}
              onChange={set('sourcing_manage_items_text')}
              multiline
              rows={9}
            />
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <SectionDivider label="Key Terms & MOQs" />
            <Field label="Section Title" value={data.sourcing_terms_title ?? ''} onChange={set('sourcing_terms_title')} />
            <Field label="MOQ Label" value={data.sourcing_moq_label ?? ''} onChange={set('sourcing_moq_label')} />
            <Field label="MOQ Description" value={data.sourcing_moq_value ?? ''} onChange={set('sourcing_moq_value')} multiline rows={3} />
            <Field label="Countries Label" value={data.sourcing_countries_label ?? ''} onChange={set('sourcing_countries_label')} />
            <Field label="Countries Covered" value={data.sourcing_countries_value ?? ''} onChange={set('sourcing_countries_value')} multiline rows={3} />
            <Field label="Product Scope Label" value={data.sourcing_scope_label ?? ''} onChange={set('sourcing_scope_label')} />
            <Field label="Product Scope" value={data.sourcing_scope_value ?? ''} onChange={set('sourcing_scope_value')} multiline rows={3} />
          </div>
        </Card>
      </div>
    </div>
  );
}
