import { useState, type FormEvent } from 'react';
import { 
  CheckCircle2, Send, Clock, MessageSquare, Zap, RefreshCw, User, Building2, Mail, Phone, MessageCircle, Package, Tag, Truck, GraduationCap 
} from 'lucide-react';
import { INITIAL_FORM, type ContactContent, type ContactFormData } from './types';

const TELEGRAM_BOT_TOKEN = '8687782746:AAGGOIhorkQnBT7gaD2xJkxOwF4hB39hVQs';
const TELEGRAM_CHAT_ID = '-1004424588112';

const DEFAULT_TOPICS = [
  { id: 'Product Sourcing', label: 'Product Sourcing', icon: Package },
  { id: 'OEM / Private Label', label: 'OEM / Private Label', icon: Tag },
  { id: 'Wholesale Distribution', label: 'Wholesale', icon: Truck },
  { id: 'Sales Training', label: 'Sales Training', icon: GraduationCap },
];

const DEFAULT_CHANNELS = [
  { id: 'Telegram / WhatsApp', label: 'Telegram / WhatsApp Message (Fastest)' },
  { id: 'Email', label: 'Official Business Email' },
  { id: 'Direct Phone Call', label: 'Direct Phone Call from Trade Director' },
];

const INPUT_CLASS = 'w-full bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl px-4.5 py-3.5 sm:px-5 sm:py-3.5 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm font-medium';

const sendTelegramNotification = async (data: {
  contactName: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  preferredChannel: string;
  message: string;
  ticketId: string;
}) => {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const escapeHtml = (str: string) =>
    (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const htmlText = `🚨 <b>NEW UNT B2B CONTACT INQUIRY</b> 🚨

<b>🎫 Ticket Ref:</b> #${escapeHtml(data.ticketId)}
<b>👤 Full Name:</b> ${escapeHtml(data.contactName)}
<b>🏢 Company:</b> ${escapeHtml(data.company)}
<b>📧 Email:</b> ${escapeHtml(data.email)}
<b>📞 Phone / Telegram:</b> ${escapeHtml(data.phone)}
<b>📌 Subject:</b> ${escapeHtml(data.topic)}
<b>💬 Preferred Channel:</b> ${escapeHtml(data.preferredChannel)}

<b>📝 Project Scope Details:</b>
${escapeHtml(data.message)}

⏱️ <b>Submitted At:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' })} (Phnom Penh Time)`;

  try {
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: htmlText,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error('Telegram notification error:', error);
  }
};

export function ContactForm({ content }: { content: ContactContent }) {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [activeTopic, setActiveTopic] = useState('Product Sourcing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const topics = content.form_topics?.length ? content.form_topics : DEFAULT_TOPICS;
  const channels = content.response_channels?.length ? content.response_channels : DEFAULT_CHANNELS;

  const updateField = (field: keyof ContactFormData, value: string) => 
    setForm((current) => ({ ...current, [field]: value }));

  const handleTopicClick = (topicId: string) => {
    setActiveTopic(topicId);
    if (!form.message) {
      updateField('message', `Inquiry regarding ${topicId}: `);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const randomTicket = `UNT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(randomTicket);

    await sendTelegramNotification({
      contactName: form.contactName,
      company: form.company,
      email: form.email,
      phone: form.phone,
      topic: activeTopic,
      preferredChannel: form.preferredChannel,
      message: form.message,
      ticketId: randomTicket,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div id="contact-form-section" className="lg:col-span-7 flex flex-col h-full scroll-mt-28">
      <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden h-full flex flex-col justify-between space-y-6">
        
        {/* Decorative Ambient Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[90px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{content.form_badge ?? 'Direct B2B Communication Desk'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white">
            {content.form_heading ?? 'Send Us a Direct Message'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.form_description ?? 'Submit your commercial inquiry below. Our Phnom Penh directors respond within 4 business hours.'}
          </p>
        </div>

        {submitted ? (
          <SuccessState 
            name={form.contactName} 
            company={form.company}
            topic={activeTopic}
            ticketId={ticketId}
            onReset={() => {
              setSubmitted(false);
              setForm(INITIAL_FORM);
            }} 
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-5">
            
            <div className="space-y-5">
              {/* Quick Inquiry Subject Pills */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {content.form_subject_label ?? 'Select Inquiry Subject'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic, index) => {
                    const Icon = DEFAULT_TOPICS.find((item) => item.id === topic.id)?.icon ?? DEFAULT_TOPICS[index]?.icon ?? Package;
                    const isSelected = activeTopic === topic.id;
                    return (
                      <button
                        type="button"
                        key={topic.id}
                        onClick={() => handleTopicClick(topic.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-md shadow-emerald-600/20 scale-[1.02]'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                        <span>{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1. Contact Information Inputs (Spacious & Prominent) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span>{content.full_name_label ?? 'Full Name *'}</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder={content.full_name_placeholder ?? 'e.g. Sokha Heng'}
                    value={form.contactName} 
                    onChange={(e) => updateField('contactName', e.target.value)} 
                    className={INPUT_CLASS} 
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-500" />
                    <span>{content.company_label ?? 'Company / Organization *'}</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder={content.company_placeholder ?? 'e.g. Cambodia FMCG Wholesale Ltd'}
                    value={form.company} 
                    onChange={(e) => updateField('company', e.target.value)} 
                    className={INPUT_CLASS} 
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    <span>{content.business_email_label ?? 'Business Email *'}</span>
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder={content.business_email_placeholder ?? 'name@company.com'}
                    value={form.email} 
                    onChange={(e) => updateField('email', e.target.value)} 
                    className={INPUT_CLASS} 
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    <span>{content.phone_label ?? 'Phone / Telegram Number *'}</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder={content.phone_placeholder ?? 'e.g. 012 345 678 or @username'}
                    value={form.phone} 
                    onChange={(e) => updateField('phone', e.target.value)} 
                    className={INPUT_CLASS} 
                  />
                </div>
              </div>

              {/* 2. Response Channel Preference */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>{content.response_channel_label ?? 'Preferred Channel for Response'}</span>
                </label>
                <select 
                  value={form.preferredChannel} 
                  onChange={(event) => updateField('preferredChannel', event.target.value)} 
                  className={INPUT_CLASS}
                >
                  {channels.map((channel) => <option key={channel.id} value={channel.id}>{channel.label}</option>)}
                </select>
              </div>

              {/* 3. Project Scope Textarea */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>{content.project_scope_label ?? 'Project Scope / Sourcing Details *'}</span>
                </label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder={content.project_scope_placeholder ?? 'Describe target products, target volumes, factory origins, or compliance questions...'}
                  value={form.message} 
                  onChange={(event) => updateField('message', event.target.value)} 
                  className={`${INPUT_CLASS} leading-relaxed`} 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full py-4.5 sm:py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-sm sm:text-base shadow-xl shadow-emerald-600/25 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 disabled:opacity-60 mt-auto"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{content.submitting_label ?? 'Transmitting to Telegram & UNT HQ...'}</span>
                </>
              ) : (
                <>
                  <span>{content.submit_label ?? 'Transmit Message to UNT Headquarters'}</span>
                  <Send className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

function SuccessState({ name, company, topic, ticketId, onReset }: { name: string; company: string; topic: string; ticketId: string; onReset: () => void }) {
  return (
    <div className="py-8 text-center space-y-4 animate-fade-in my-auto">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 inline-block">
          Ticket Ref: #{ticketId}
        </span>
        <h4 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
          Message Transmitted to Telegram Bot!
        </h4>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-slate-900 dark:text-white">{name}</strong> ({company}). Your inquiry regarding <strong className="text-emerald-600 dark:text-emerald-400">{topic}</strong> has been transmitted to our Telegram Bot & commercial director desk.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
          <Clock className="w-4 h-4 shrink-0" />
          <span>Expected Response Time: &lt; 4 Business Hours</span>
        </div>
        <p className="text-xs text-slate-500 pt-0.5">
          Need emergency support? Contact Telegram <a href="https://t.me/untsourcing" target="_blank" rel="noreferrer" className="text-emerald-500 font-bold hover:underline">@untsourcing</a> or call <a href="tel:012771774" className="text-emerald-500 font-bold hover:underline">012 771 774</a>.
        </p>
      </div>

      <div className="pt-1 flex items-center justify-center gap-3">
        <button 
          onClick={onReset} 
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
        >
          Send Another Message
        </button>
      </div>
    </div>
  );
}
