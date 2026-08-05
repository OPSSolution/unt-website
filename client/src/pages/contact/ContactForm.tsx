import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { INITIAL_FORM, type ContactFormData } from './types';

const INTERESTS = ['Product Sourcing', 'OEM / Private Label', 'Wholesale Distribution', 'Sales Training Programs', 'Customs & Ministry Permits', 'Cold Chain Freight'];
const INPUT_CLASS = 'w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500';

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [selectedInterests, setSelectedInterests] = useState(['Product Sourcing']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof ContactFormData, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const toggleInterest = (interest: string) => setSelectedInterests((current) => {
    if (current.includes(interest)) return current.length > 1 ? current.filter((item) => item !== interest) : current;
    return [...current, interest];
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="lg:col-span-7">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Send Us a Direct Message</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select your areas of interest below and our commercial directors will tailor their response.</p>
        </div>
        {submitted ? (
          <SuccessState name={form.contactName} interests={selectedInterests} onReset={() => setSubmitted(false)} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Topic(s) of Interest</label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => {
                  const selected = selectedInterests.includes(interest);
                  return <button type="button" key={interest} onClick={() => toggleInterest(interest)} className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${selected ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{interest} {selected ? '✓' : ''}</button>;
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Full Name *" placeholder="e.g. Sokha Heng" value={form.contactName} onChange={(value) => updateField('contactName', value)} />
              <FormInput label="Company / Organization *" placeholder="e.g. Cambodia FMCG Wholesale Ltd" value={form.company} onChange={(value) => updateField('company', value)} />
              <FormInput type="email" label="Business Email *" placeholder="name@company.com" value={form.email} onChange={(value) => updateField('email', value)} />
              <FormInput label="Phone / Telegram Number *" placeholder="+855 12 345 678" value={form.phone} onChange={(value) => updateField('phone', value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Channel for Response</label>
              <select value={form.preferredChannel} onChange={(event) => updateField('preferredChannel', event.target.value)} className={INPUT_CLASS}>
                <option value="Telegram / WhatsApp">Telegram / WhatsApp Message (Fastest)</option>
                <option value="Email">Official Business Email</option>
                <option value="Direct Phone Call">Direct Phone Call</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Scope / Sourcing Details</label>
              <textarea rows={4} required placeholder="Describe target products, target volumes, factory origins, or compliance questions..." value={form.message} onChange={(event) => updateField('message', event.target.value)} className={`${INPUT_CLASS} p-3`} />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60">
              <span>{isSubmitting ? 'Transmitting Message...' : 'Transmit Message to UNT Headquarters'}</span>{!isSubmitting && <Send className="w-4 h-4" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FormInput({ label, type = 'text', placeholder, value, onChange }: { label: string; type?: string; placeholder: string; value: string; onChange: (value: string) => void }) {
  return <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label><input type={type} required placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} className={INPUT_CLASS} /></div>;
}

function SuccessState({ name, interests, onReset }: { name: string; interests: string[]; onReset: () => void }) {
  return <div className="py-12 text-center space-y-4"><div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center"><CheckCircle2 className="w-8 h-8" /></div><h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Message Transmitted!</h4><p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">Thank you, <span className="font-semibold text-slate-900 dark:text-white">{name}</span>. Your inquiry regarding <span className="font-semibold text-emerald-700 dark:text-emerald-400">{interests.join(', ')}</span> has been routed to our Phnom Penh office.</p><button onClick={onReset} className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm">Send Another Inquiry</button></div>;
}
