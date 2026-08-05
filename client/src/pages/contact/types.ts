export interface ContactContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
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
}

export interface ContactFormData {
  contactName: string;
  company: string;
  email: string;
  phone: string;
  preferredChannel: string;
  message: string;
}

export const INITIAL_FORM: ContactFormData = {
  contactName: '',
  company: '',
  email: '',
  phone: '',
  preferredChannel: 'Telegram / WhatsApp',
  message: '',
};

