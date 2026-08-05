import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { ContactContent } from './types';

export function ContactInfo({ content }: { content: ContactContent }) {
  const landline = content.phone_landline ?? '+855 23 999 888';
  const telegram = content.phone_telegram ?? '@untsourcing';
  const whatsapp = content.phone_whatsapp ?? '+855 12 345 678';
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="space-y-3">
        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">{content.section_badge ?? 'Direct Channels'}</span>
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{content.section_heading ?? 'Connect With Our Team'}</h2>
        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{content.section_desc ?? 'Whether you require urgent customs clearance support, bulk wholesale pricing, or custom OEM formulation — we respond within 4 business hours.'}</p>
      </div>
      <div className="space-y-4">
        <InfoCard icon={MapPin} title="Phnom Penh Headquarters">
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{content.hq_address ?? 'Phnom Penh Tower, Level 14, Monivong Blvd, Sangkat Boeung Keng Kang 1, Doun Penh, Phnom Penh, Kingdom of Cambodia.'}</p>
        </InfoCard>
        <InfoCard icon={Phone} title="Hotline & Instant Support">
          <div className="space-y-1.5 text-xs">
            <ContactLink label="Phnom Penh Landline:" href={`tel:${landline.replace(/\s/g, '')}`} value={landline} />
            <ContactLink label="Telegram Support:" href={`https://t.me/${telegram.replace('@', '')}`} value={telegram} external />
            <ContactLink label="WhatsApp / Mobile:" href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} value={whatsapp} external />
          </div>
        </InfoCard>
        <InfoCard icon={Mail} title="Email Inquiries">
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <div>General Trade & Sourcing: <a href={`mailto:${content.email_general ?? 'info@untcompany.com'}`} className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">{content.email_general ?? 'info@untcompany.com'}</a></div>
            <div>Customs & Compliance: <a href={`mailto:${content.email_customs ?? 'customs@untcompany.com'}`} className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">{content.email_customs ?? 'customs@untcompany.com'}</a></div>
          </div>
        </InfoCard>
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-slate-800 dark:text-slate-200">
          <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" /><span className="font-semibold">Working Hours (GMT+7):</span></div>
          <span className="font-bold text-emerald-800 dark:text-emerald-300">{content.hours ?? 'Mon - Sat: 8:00 AM - 6:00 PM'}</span>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"><div className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-400"><Icon className="w-5 h-5 shrink-0" /><h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">{title}</h3></div><div className="pl-8">{children}</div></div>;
}

function ContactLink({ label, href, value, external = false }: { label: string; href: string; value: string; external?: boolean }) {
  return <div className="flex justify-between items-center text-slate-700 dark:text-slate-300"><span className="font-medium">{label}</span><a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="font-mono font-bold text-emerald-700 dark:text-emerald-400 hover:underline">{value}</a></div>;
}
