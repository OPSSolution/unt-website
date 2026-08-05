import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useHomepageSections } from '../hooks/useHomepageSections';

export const ContactPage: React.FC = () => {
  const sections = useHomepageSections();
  const data = sections.contact_page ?? {};
  const [selectedChips, setSelectedChips] = useState<string[]>(['Product Sourcing']);
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [preferredChannel, setPreferredChannel] = useState('Telegram / WhatsApp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interestChips = [
    'Product Sourcing',
    'OEM / Private Label',
    'Wholesale Distribution',
    'Sales Training Programs',
    'Customs & Ministry Permits',
    'Cold Chain Freight'
  ];

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      if (selectedChips.length > 1) {
        setSelectedChips(selectedChips.filter((c) => c !== chip));
      }
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <ScrollReveal animation="up">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
              {data.badge ?? 'Direct B2B Communication Portal'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">
              {data.headline
                ? data.headline
                : <>Connect with <span className="emerald-gradient-text">UNT Company</span></>}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              {data.subheadline ?? 'Whether you require factory procurement, OEM private label manufacturing, customs clearance consultation, or B2B sales training for your commercial team.'}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Left Col: Contact Cards & Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
              {data.section_badge ?? 'Direct Channels'}
            </span>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              {data.section_heading ?? 'Connect With Our Team'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              {data.section_desc ?? 'Whether you require urgent customs clearance support, bulk wholesale pricing, or custom OEM formulation — we respond within 4 business hours.'}
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-400">
                <MapPin className="w-5 h-5 shrink-0" />
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Phnom Penh Headquarters</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed pl-8">
                {data.hq_address ?? 'Phnom Penh Tower, Level 14, Monivong Blvd, Sangkat Boeung Keng Kang 1, Doun Penh, Phnom Penh, Kingdom of Cambodia.'}
              </p>
            </div>

            {/* Phone & Instant Messaging */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-400">
                <Phone className="w-5 h-5 shrink-0" />
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Hotline & Instant Support</h3>
              </div>
              <div className="pl-8 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Phnom Penh Landline:</span>
                  <a href={`tel:${(data.phone_landline ?? '+855 23 999 888').replace(/\s/g, '')}`} className="font-mono font-bold text-emerald-700 dark:text-emerald-400 hover:underline">{data.phone_landline ?? '+855 23 999 888'}</a>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Telegram Support:</span>
                  <a href={`https://t.me/${(data.phone_telegram ?? '@untsourcing').replace('@', '')}`} target="_blank" rel="noreferrer" className="font-mono text-emerald-700 dark:text-emerald-400 hover:underline">{data.phone_telegram ?? '@untsourcing'}</a>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="font-medium">WhatsApp / Mobile:</span>
                  <a href={`https://wa.me/${(data.phone_whatsapp ?? '+855 12 345 678').replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="font-mono text-emerald-700 dark:text-emerald-400 hover:underline">{data.phone_whatsapp ?? '+855 12 345 678'}</a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-400">
                <Mail className="w-5 h-5 shrink-0" />
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Email Inquiries</h3>
              </div>
              <div className="pl-8 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <div>General Trade & Sourcing: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{data.email_general ?? 'info@untcompany.com'}</strong></div>
                <div>Customs & Compliance: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{data.email_customs ?? 'customs@untcompany.com'}</strong></div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-slate-800 dark:text-slate-200">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold">Working Hours (GMT+7):</span>
              </div>
              <span className="font-bold text-emerald-800 dark:text-emerald-300">{data.hours ?? 'Mon - Sat: 8:00 AM - 6:00 PM'}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select your areas of interest below and our commercial directors will tailor their response.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Message Transmitted!</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{contactName}</span>. Your inquiry regarding <span className="font-semibold text-emerald-700 dark:text-emerald-400">{selectedChips.join(', ')}</span> has been routed to our Phnom Penh office.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Interest Chips */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Select Topic(s) of Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestChips.map((chip) => {
                      const active = selectedChips.includes(chip);
                      return (
                        <button
                          type="button"
                          key={chip}
                          onClick={() => toggleChip(chip)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                            active
                              ? 'bg-emerald-600 text-white font-bold shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {chip} {active ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sokha Heng"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cambodia FMCG Wholesale Ltd"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone / Telegram Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="+855 12 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Channel for Response</label>
                  <select
                    value={preferredChannel}
                    onChange={(e) => setPreferredChannel(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Telegram / WhatsApp" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Telegram / WhatsApp Message (Fastest)</option>
                    <option value="Email" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Official Business Email</option>
                    <option value="Direct Phone Call" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Direct Phone Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Scope / Sourcing Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe target products, target volumes, factory origins, or compliance questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <span>Transmit Message to UNT Headquarters</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
