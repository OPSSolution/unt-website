import React, { useState } from 'react';
import { 
  Clock, Mail, MapPin, Phone, ExternalLink, Copy, Check, HelpCircle, ChevronDown, Globe, Send, MessageCircle 
} from 'lucide-react';
import type { ContactContent } from './types';

const FAQS = [
  {
    question: 'How fast is UNT\'s response time for B2B sourcing inquiries?',
    answer: 'Our Phnom Penh trade directors review and respond to all qualified enterprise inquiries within 4 business hours during working hours (Mon - Sat).'
  },
  {
    question: 'Do you offer OEM private label sample delivery to Cambodian factories?',
    answer: 'Yes, we facilitate factory sample procurement, quality inspection, and courier delivery within 3-5 business days across Cambodia and ASEAN.'
  },
  {
    question: 'What MoC tax & customs licenses does UNT hold?',
    answer: 'UNT holds official Ministry of Commerce (MoC) General Trading License, GDT VAT Registration Certificate, and Customs Import-Export Declaration permits.'
  }
];

export function ContactInfo({ content }: { content: ContactContent }) {
  const landline = content.phone_landline ?? '+855 12 771 774';
  const telegram = content.phone_telegram ?? '@untsourcing';
  const whatsapp = content.phone_whatsapp ?? '012 771 774';
  const emailGeneral = content.email_general ?? 'untcambodia@gmail.com';

  const [copied, setCopied] = useState(false);

  const hqAddress = content.hq_address ?? 'HV8R+PX, 196B & 196A, St 122, Sangkat Teuk Laak I, Khan Toul Kork, Phnom Penh 12157, Kingdom of Cambodia.';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(hqAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-5 flex flex-col h-full">
      <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden h-full flex flex-col justify-between space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[90px] rounded-full pointer-events-none" />

        <div className="space-y-6">
          
          {/* Header */}
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm inline-block">
              {content.section_badge ?? 'Direct Communication Desks'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              {content.section_heading ?? 'Connect With Our Team'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.section_desc ?? 'Whether you require urgent customs clearance support, bulk wholesale pricing, or custom OEM formulation — we respond within 4 business hours.'}
            </p>
          </div>

          {/* 1. Hotlines & Channels Block */}
          <div className="space-y-2.5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>Instant Hotlines & Communication</span>
            </h3>

            <div className="space-y-2 text-xs sm:text-sm">
              <ChannelRow 
                title="Official Business Email" 
                value={emailGeneral} 
                href={`mailto:${emailGeneral}`} 
                badge="Email"
              />
              <ChannelRow 
                title="Phnom Penh Direct Line" 
                value={landline} 
                href={`tel:${landline.replace(/\s/g, '')}`} 
                badge="Phnom Penh HQ"
              />
              <ChannelRow 
                title="Telegram Direct Support" 
                value={telegram} 
                href={`https://t.me/${telegram.replace('@', '')}`} 
                badge="Fastest" 
                isExternal
              />
              <ChannelRow 
                title="WhatsApp Commercial Desk" 
                value={whatsapp} 
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} 
                badge="Mobile" 
                isExternal
              />
            </div>
          </div>

          {/* 2. Phnom Penh HQ Location Block */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Phnom Penh Headquarters</span>
              </h3>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                Plus Code: HV8R+PX
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {hqAddress}
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={handleCopyAddress}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent('HV8R+PX Phnom Penh')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Globe className="w-4 h-4" />
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Live Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md h-[145px] w-full mt-2.5">
              <iframe
                title="HV8R+PX Phnom Penh Headquarters Live Map"
                src="https://maps.google.com/maps?q=HV8R%2BPX+Phnom+Penh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* 3. Live Operating Hours Ticker at Bottom */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 via-slate-900 to-emerald-900 dark:from-emerald-900/90 dark:via-slate-900 dark:to-emerald-950 border border-emerald-500/30 text-white flex items-center justify-between text-xs sm:text-sm shadow-md mt-auto">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-emerald-200">Desk Hours (GMT+7):</span>
          </div>
          <span className="font-mono font-bold text-white bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/40 text-xs">
            {content.hours ?? 'Mon - Sat: 8:00 AM - 6:00 PM'}
          </span>
        </div>

      </div>
    </div>
  );
}

export function ContactFaq() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      <div className="flex items-center gap-3 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg sm:text-xl">Frequently Asked Enterprise Questions</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Quick answers for Cambodian B2B clients, factory importers, and trade partners.</p>
        </div>
      </div>

      {/* Vertical Stacked Card Accordion */}
      <div className="space-y-3 pt-1">
        {FAQS.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <div 
              key={idx} 
              className={`rounded-2xl border transition-all shadow-sm overflow-hidden ${
                isOpen 
                  ? 'bg-slate-50/90 dark:bg-slate-800/80 border-emerald-500/60 dark:border-emerald-500/50' 
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-emerald-400'
              }`}
            >
              <button
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-emerald-600 text-white' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    0{idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  isOpen ? 'bg-emerald-600 text-white rotate-180 shadow-sm' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChannelRow({ title, value, href, badge, isExternal = false }: { title: string; value: string; href: string; badge: string; isExternal?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2.5 px-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800/80">
      <div className="space-y-0.5">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{title}</div>
        <div className="font-mono font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">{value}</div>
      </div>
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold self-start sm:self-auto flex items-center gap-1 shadow-sm transition-colors shrink-0"
      >
        <span>Connect</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
