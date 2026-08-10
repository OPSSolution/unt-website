export interface ContactContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
  response_time_badge?: string;
  desk_status_badge?: string;
  section_badge?: string;
  section_heading?: string;
  section_desc?: string;
  hq_address?: string;
  phone_landline?: string;
  phone_telegram?: string;
  phone_whatsapp?: string;
  email_general?: string;
  email_customs?: string;
  hours?: string;
  form_badge?: string;
  form_heading?: string;
  form_description?: string;
  form_subject_label?: string;
  form_topics?: Array<{ id: string; label: string }>;
  full_name_label?: string;
  full_name_placeholder?: string;
  company_label?: string;
  company_placeholder?: string;
  business_email_label?: string;
  business_email_placeholder?: string;
  phone_label?: string;
  phone_placeholder?: string;
  response_channel_label?: string;
  response_channels?: Array<{ id: string; label: string }>;
  project_scope_label?: string;
  project_scope_placeholder?: string;
  submit_label?: string;
  submitting_label?: string;
  faq_heading?: string;
  faq_description?: string;
  contact_faqs?: Array<{ id: string; question: string; answer: string }>;
}

export interface ContactFormData {
  contactName: string;
  company: string;
  email: string;
  phone: string;
  preferredChannel: string;
  urgency: string;
  budget: string;
  message: string;
}

export const INITIAL_FORM: ContactFormData = {
  contactName: '',
  company: '',
  email: '',
  phone: '',
  preferredChannel: 'Telegram / WhatsApp',
  urgency: 'Standard (1-2 Weeks)',
  budget: '$10,000 - $50,000',
  message: '',
};
