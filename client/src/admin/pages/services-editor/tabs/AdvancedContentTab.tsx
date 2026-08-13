import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';

interface AdvancedContentTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
  updateArrayItem: (arrayKey: string, index: number, key: string, value: string) => void;
}

export function AdvancedContentTab({
  data,
  set,
  updateArrayItem,
}: AdvancedContentTabProps) {
  const estimatorFields: [string, string][] = [
    ['estimator_title', 'Title'],
    ['estimator_desc', 'Description'],
    ['estimator_badge', 'Badge'],
    ['estimator_category_label', 'Category Label'],
    ['estimator_origin_label', 'Origin Label'],
    ['estimator_volume_label', 'Volume Label'],
    ['estimator_oem_label', 'OEM Label'],
    ['estimator_lead_label', 'Lead Time Label'],
    ['estimator_route_label', 'Route Label'],
    ['estimator_clearance_label', 'Clearance Label'],
    ['estimator_note', 'Footer Note'],
    ['estimator_cta', 'CTA Button'],
  ];

  return (
    <div className="space-y-6">
      {/* ─── Interactive Package Builder ─── */}
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Interactive Package Builder" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Badge" value={data.builder_badge ?? ''} onChange={set('builder_badge')} />
            <Field label="Title" value={data.builder_title ?? ''} onChange={set('builder_title')} />
            <Field label="Highlighted Title" value={data.builder_highlight ?? ''} onChange={set('builder_highlight')} />
            <Field label="Description" value={data.builder_desc ?? ''} onChange={set('builder_desc')} multiline rows={3} />
            <Field label="Core Business Label" value={data.builder_core_label ?? ''} onChange={set('builder_core_label')} />
            <Field label="Origin Label" value={data.builder_origin_label ?? ''} onChange={set('builder_origin_label')} />
            <Field label="Countries (one per line)" value={data.builder_countries_text ?? ''} onChange={set('builder_countries_text')} multiline rows={6} />
            <Field label="Freight Label" value={data.builder_freight_label ?? ''} onChange={set('builder_freight_label')} />
            <Field label="Add-ons Label" value={data.builder_addons_label ?? ''} onChange={set('builder_addons_label')} />
          </div>

          <SectionDivider label="Core Service Options" />
          {(data.builder_services ?? []).map((item: any, index: number) => (
            <div key={item.id || index} className="grid grid-cols-2 gap-3">
              <Field label="Option" value={item.label ?? ''} onChange={(v) => updateArrayItem('builder_services', index, 'label', v)} />
              <Field label="Description" value={item.desc ?? ''} onChange={(v) => updateArrayItem('builder_services', index, 'desc', v)} />
            </div>
          ))}

          <SectionDivider label="Freight Options" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(data.builder_freight_options ?? []).map((item: any, index: number) => (
              <div key={item.id || index} className="space-y-2 rounded-xl border p-3 dark:border-slate-700">
                <Field label="Name" value={item.label ?? ''} onChange={(v) => updateArrayItem('builder_freight_options', index, 'label', v)} />
                <Field label="Subtitle" value={item.sub ?? ''} onChange={(v) => updateArrayItem('builder_freight_options', index, 'sub', v)} />
              </div>
            ))}
          </div>

          <SectionDivider label="Add-on Options" />
          {(data.builder_addons ?? []).map((item: any, index: number) => (
            <div key={item.id || index} className="grid grid-cols-2 gap-3">
              <Field label="Add-on" value={item.label ?? ''} onChange={(v) => updateArrayItem('builder_addons', index, 'label', v)} />
              <Field label="Tag" value={item.tag ?? ''} onChange={(v) => updateArrayItem('builder_addons', index, 'tag', v)} />
            </div>
          ))}
        </div>
      </Card>

      {/* ─── Comparative Sourcing Matrix ─── */}
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Comparative Sourcing Matrix" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Badge" value={data.matrix_badge ?? ''} onChange={set('matrix_badge')} />
            <Field label="Title" value={data.matrix_title ?? ''} onChange={set('matrix_title')} />
            <Field label="Highlighted Title" value={data.matrix_highlight ?? ''} onChange={set('matrix_highlight')} />
            <Field label="UNT Tab" value={data.matrix_unt_tab ?? ''} onChange={set('matrix_unt_tab')} />
            <Field label="Traditional Tab" value={data.matrix_traditional_tab ?? ''} onChange={set('matrix_traditional_tab')} />
          </div>
          {(data.matrix_rows ?? []).map((row: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-xl border p-4 dark:border-slate-700">
              <Field label="Feature" value={row.feature ?? ''} onChange={(v) => updateArrayItem('matrix_rows', index, 'feature', v)} />
              <Field label="UNT" value={row.unt ?? ''} onChange={(v) => updateArrayItem('matrix_rows', index, 'unt', v)} multiline rows={3} />
              <Field label="Traditional" value={row.traditional ?? ''} onChange={(v) => updateArrayItem('matrix_rows', index, 'traditional', v)} multiline rows={3} />
            </div>
          ))}
        </div>
      </Card>

      {/* ─── Frequently Asked Questions ─── */}
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Frequently Asked Questions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Badge" value={data.faq_badge ?? ''} onChange={set('faq_badge')} />
            <Field label="Title" value={data.faq_title ?? ''} onChange={set('faq_title')} />
            <Field label="Highlighted Title" value={data.faq_highlight ?? ''} onChange={set('faq_highlight')} />
            <Field label="Description" value={data.faq_desc ?? ''} onChange={set('faq_desc')} multiline rows={3} />
            <Field label="Search Placeholder" value={data.faq_search_placeholder ?? ''} onChange={set('faq_search_placeholder')} />
            <Field label="All FAQs Tab" value={data.faq_tab_all ?? ''} onChange={set('faq_tab_all')} />
            <Field label="Customs Tab" value={data.faq_tab_customs ?? ''} onChange={set('faq_tab_customs')} />
            <Field label="Sourcing Tab" value={data.faq_tab_sourcing ?? ''} onChange={set('faq_tab_sourcing')} />
            <Field label="Delivery Tab" value={data.faq_tab_delivery ?? ''} onChange={set('faq_tab_delivery')} />
            <Field label="Training Tab" value={data.faq_tab_training ?? ''} onChange={set('faq_tab_training')} />
          </div>
          {(data.faq_items ?? []).map((faq: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-3 rounded-xl border p-4 dark:border-slate-700">
              <Field label="Category" value={faq.category ?? ''} onChange={(v) => updateArrayItem('faq_items', index, 'category', v)} />
              <Field label={`Question ${index + 1}`} value={faq.q ?? ''} onChange={(v) => updateArrayItem('faq_items', index, 'q', v)} multiline rows={3} />
              <Field label="Answer" value={faq.a ?? ''} onChange={(v) => updateArrayItem('faq_items', index, 'a', v)} multiline rows={5} />
            </div>
          ))}
        </div>
      </Card>

      {/* ─── Interactive Sourcing Estimator ─── */}
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Interactive Sourcing Estimator" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {estimatorFields.map(([key, label]) => (
              <Field
                key={key}
                label={label}
                value={data[key] ?? ''}
                onChange={set(key)}
                multiline={key === 'estimator_desc' || key === 'estimator_note'}
                rows={3}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
