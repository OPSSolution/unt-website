import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';
import { useLanguage } from '../../i18n/LanguageContext';

const FORM_TOPICS = [
  { id: 'Product Sourcing', label: 'Product Sourcing' },
  { id: 'OEM / Private Label', label: 'OEM / Private Label' },
  { id: 'Wholesale Distribution', label: 'Wholesale' },
  { id: 'Sales Training', label: 'Sales Training' },
];
const RESPONSE_CHANNELS = [
  { id: 'Telegram / WhatsApp', label: 'Telegram / WhatsApp Message (Fastest)' },
  { id: 'Email', label: 'Official Business Email' },
  { id: 'Direct Phone Call', label: 'Direct Phone Call from Trade Director' },
];
const CONTACT_FAQS = [
  { id: 'response-time', question: "How fast is UNT's response time for B2B sourcing inquiries?", answer: 'Our Phnom Penh trade directors review and respond to all qualified enterprise inquiries within 4 business hours during working hours (Mon - Sat).' },
  { id: 'sample-delivery', question: 'Do you offer OEM private label sample delivery to Cambodian factories?', answer: 'Yes, we facilitate factory sample procurement, quality inspection, and courier delivery within 3-5 business days across Cambodia and ASEAN.' },
  { id: 'licenses', question: 'What MoC tax & customs licenses does UNT hold?', answer: 'UNT holds official Ministry of Commerce (MoC) General Trading License, GDT VAT Registration Certificate, and Customs Import-Export Declaration permits.' },
];

const DEFAULTS = {
  badge: 'Phnom Penh HQ & Regional Hubs',
  headline: "Let's Bridge the Gap Between Agriculture & Logistics",
  subheadline: "Get in touch with Unique Noble Trading Co., Ltd.'s sourcing specialists, customs brokers, and commercial training leads.",
  response_time_badge: 'Avg Response < 4 Hours',
  desk_status_badge: 'Phnom Penh HQ Desk Online',
  section_badge: 'Direct Channels',
  section_heading: 'Connect With Our Team',
  section_desc: 'Whether you require urgent customs clearance support, bulk wholesale pricing, or custom OEM formulation — we respond within 4 business hours.',
  hq_address: 'Phnom Penh Tower, Level 14, Monivong Blvd, Sangkat Boeung Keng Kang 1, Doun Penh, Phnom Penh, Kingdom of Cambodia.',
  phone_landline: '+855 23 999 888',
  phone_telegram: '@untsourcing',
  phone_whatsapp: '+855 12 345 678',
  email_general: 'info@untcompany.com',
  email_customs: 'customs@untcompany.com',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  form_badge: 'Direct B2B Communication Desk',
  form_heading: 'Send Us a Direct Message',
  form_description: 'Submit your commercial inquiry below. Our Phnom Penh directors respond within 4 business hours.',
  form_subject_label: 'Select Inquiry Subject',
  form_topics: FORM_TOPICS,
  full_name_label: 'Full Name *', full_name_placeholder: 'e.g. Sokha Heng',
  company_label: 'Company / Organization *', company_placeholder: 'e.g. Cambodia FMCG Wholesale Ltd',
  business_email_label: 'Business Email *', business_email_placeholder: 'name@company.com',
  phone_label: 'Phone / Telegram Number *', phone_placeholder: 'e.g. 012 345 678 or @username',
  response_channel_label: 'Preferred Channel for Response', response_channels: RESPONSE_CHANNELS,
  project_scope_label: 'Project Scope / Sourcing Details *',
  project_scope_placeholder: 'Describe target products, target volumes, factory origins, or compliance questions...',
  submit_label: 'Transmit Message to UNT Headquarters', submitting_label: 'Transmitting to Telegram & UNT HQ...',
  faq_heading: 'Frequently Asked Enterprise Questions',
  faq_description: 'Quick answers for Cambodian B2B clients, factory importers, and trade partners.',
  contact_faqs: CONTACT_FAQS,
};

const EMPTY_TRANSLATIONS = Object.fromEntries(Object.entries(DEFAULTS).map(([key, value]) => [key, Array.isArray(value) ? [] : '']));
const KHMER_STRUCTURES = {
  form_topics: FORM_TOPICS.map((item) => ({ id: item.id, label: '' })),
  response_channels: RESPONSE_CHANNELS.map((item) => ({ id: item.id, label: '' })),
  contact_faqs: CONTACT_FAQS.map((item) => ({ id: item.id, question: '', answer: '' })),
};

function editorData(language: 'en' | 'km', saved: any) {
  if (language === 'en') return { ...DEFAULTS, ...(saved ?? {}) };
  const result: any = { ...EMPTY_TRANSLATIONS, ...KHMER_STRUCTURES, ...(saved ?? {}) };
  for (const [key, value] of Object.entries(KHMER_STRUCTURES)) {
    if (!Array.isArray(result[key]) || result[key].length === 0) result[key] = value;
  }
  return result;
}

const TABS = ['Header', 'Contact Info', 'Message Form', 'Enterprise FAQs'] as const;
type Tab = typeof TABS[number];

export function ContactEditor() {
  const { token } = useAdminAuth();
  const { language } = useLanguage();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [loading, setLoading] = useState(true);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    `contact_page-${language}`,
    data,
    async (d) => {
      if (!token) return;
      await api.updateHomepageSection('contact_page', d, token, language);
    },
    1500,
    !loading
  );

  useEffect(() => {
    setLoading(true);
    api.getHomepageSection('contact_page', language)
      .then((r) => setData(editorData(language, r.data)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [language]);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));
  const updateArray = (key: string, index: number, field: string, value: string) => setData((current: any) => ({
    ...current,
    [key]: (current[key] ?? []).map((item: any, itemIndex: number) => itemIndex === index ? { ...item, [field]: value } : item),
  }));

  const handleSave = async () => {
    if (!token) return;
    try {
      await api.updateHomepageSection('contact_page', data, token, language);
    } catch (e: any) { /* auto-save will show errors */ }
  };

  return (
    <EditorShell
      title="Contact Page"
      description="Edit contact info, address, phone, and email shown on the Contact page. Changes are saved automatically."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Header' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Page Header" />
              <Field label="Badge" value={data.badge} onChange={set('badge')} />
              <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
              <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={3} />
              <Field label="Response Time Badge" value={data.response_time_badge ?? ''} onChange={set('response_time_badge')} />
              <Field label="Desk Status Badge" value={data.desk_status_badge ?? ''} onChange={set('desk_status_badge')} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Left Column" />
              <Field label="Section Badge" value={data.section_badge} onChange={set('section_badge')} />
              <Field label="Section Heading" value={data.section_heading} onChange={set('section_heading')} />
              <Field label="Section Description" value={data.section_desc} onChange={set('section_desc')} multiline rows={4} />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Contact Info' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Address" />
              <Field label="HQ Address" value={data.hq_address} onChange={set('hq_address')} multiline rows={3} />
              <Field label="Working Hours" value={data.hours} onChange={set('hours')} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Phone & Email" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Landline" value={data.phone_landline} onChange={set('phone_landline')} />
                <Field label="Telegram Handle" value={data.phone_telegram} onChange={set('phone_telegram')} />
                <Field label="WhatsApp / Mobile" value={data.phone_whatsapp} onChange={set('phone_whatsapp')} />
                <Field label="General Email" value={data.email_general} onChange={set('email_general')} />
                <Field label="Customs Email" value={data.email_customs} onChange={set('email_customs')} />
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Message Form' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <SectionDivider label="Form Introduction" />
            <Field label="Badge" value={data.form_badge ?? ''} onChange={set('form_badge')} />
            <Field label="Heading" value={data.form_heading ?? ''} onChange={set('form_heading')} />
            <Field label="Description" value={data.form_description ?? ''} onChange={set('form_description')} multiline rows={3} />
            <Field label="Subject Selector Label" value={data.form_subject_label ?? ''} onChange={set('form_subject_label')} />
            <SectionDivider label="Inquiry Subjects" />
            {(data.form_topics ?? []).map((item: any, index: number) => (
              <Field key={item.id} label={`Subject ${index + 1}`} value={item.label ?? ''} onChange={(value) => updateArray('form_topics', index, 'label', value)} />
            ))}
          </Card>
          <Card className="space-y-4">
            <SectionDivider label="Contact Fields" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name Label" value={data.full_name_label ?? ''} onChange={set('full_name_label')} />
              <Field label="Full Name Placeholder" value={data.full_name_placeholder ?? ''} onChange={set('full_name_placeholder')} />
              <Field label="Company Label" value={data.company_label ?? ''} onChange={set('company_label')} />
              <Field label="Company Placeholder" value={data.company_placeholder ?? ''} onChange={set('company_placeholder')} />
              <Field label="Email Label" value={data.business_email_label ?? ''} onChange={set('business_email_label')} />
              <Field label="Email Placeholder" value={data.business_email_placeholder ?? ''} onChange={set('business_email_placeholder')} />
              <Field label="Phone Label" value={data.phone_label ?? ''} onChange={set('phone_label')} />
              <Field label="Phone Placeholder" value={data.phone_placeholder ?? ''} onChange={set('phone_placeholder')} />
            </div>
            <Field label="Response Channel Label" value={data.response_channel_label ?? ''} onChange={set('response_channel_label')} />
            {(data.response_channels ?? []).map((item: any, index: number) => (
              <Field key={item.id} label={`Response Option ${index + 1}`} value={item.label ?? ''} onChange={(value) => updateArray('response_channels', index, 'label', value)} />
            ))}
            <Field label="Project Scope Label" value={data.project_scope_label ?? ''} onChange={set('project_scope_label')} />
            <Field label="Project Scope Placeholder" value={data.project_scope_placeholder ?? ''} onChange={set('project_scope_placeholder')} multiline rows={2} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Submit Button" value={data.submit_label ?? ''} onChange={set('submit_label')} />
              <Field label="Submitting State" value={data.submitting_label ?? ''} onChange={set('submitting_label')} />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Enterprise FAQs' && (
        <div className="space-y-6">
          <Card className="space-y-4">
            <SectionDivider label="FAQ Section" />
            <Field label="Heading" value={data.faq_heading ?? ''} onChange={set('faq_heading')} />
            <Field label="Description" value={data.faq_description ?? ''} onChange={set('faq_description')} multiline rows={2} />
          </Card>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {(data.contact_faqs ?? []).map((faq: any, index: number) => (
              <Card key={faq.id} className="space-y-4">
                <SectionDivider label={`Question ${String(index + 1).padStart(2, '0')}`} />
                <Field label="Question" value={faq.question ?? ''} onChange={(value) => updateArray('contact_faqs', index, 'question', value)} multiline rows={2} />
                <Field label="Answer" value={faq.answer ?? ''} onChange={(value) => updateArray('contact_faqs', index, 'answer', value)} multiline rows={4} />
              </Card>
            ))}
          </div>
        </div>
      )}
    </EditorShell>
  );
}
