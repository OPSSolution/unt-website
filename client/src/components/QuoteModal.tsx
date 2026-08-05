import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Send,
  Package,
  Globe,
  GraduationCap,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Loader2,
} from 'lucide-react';
import { QuoteRequestState } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

const SERVICE_TYPES = [
  {
    value: 'Product Sourcing',
    label: 'Product Sourcing',
    icon: Package,
    desc: 'Find verified products from overseas factories',
    color: 'emerald',
  },
  {
    value: 'OEM / Private Label',
    label: 'OEM / Private Label',
    icon: Sparkles,
    desc: 'Custom branding & manufacturing',
    color: 'cyan',
  },
  {
    value: 'Wholesale Purchase',
    label: 'Wholesale Purchase',
    icon: ShoppingCart,
    desc: 'Bulk orders at direct factory pricing',
    color: 'blue',
  },
  {
    value: 'Sales Training',
    label: 'Sales Training',
    icon: GraduationCap,
    desc: 'Upskill your commercial teams',
    color: 'violet',
  },
];

const CATEGORIES = [
  'Food & Beverage (F&B)',
  'Skincare & Cosmetics',
  'Personal Care & Hair',
  'Health & Wellness Supplements',
  'Household Goods & Cleaners',
  'Other / Custom Category',
];

const ORIGINS = [
  { value: 'South Korea', flag: '🇰🇷', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png' },
  { value: 'Japan', flag: '🇯🇵', flagUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png' },
  { value: 'Vietnam', flag: '🇻🇳', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png' },
  { value: 'China', flag: '🇨🇳', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  { value: 'Laos', flag: '🇱🇦', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/250px-Flag_of_Laos.svg.png' },
  { value: 'Malaysia', flag: '🇲🇾', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/250px-Flag_of_Malaysia.svg.png' },
  { value: 'Global / Best Price', flag: '🌏', flagUrl: '' },
];

const VOLUMES = [
  'Trial Batch (500 - 1,000 units)',
  'Medium Order (1,000 - 5,000 units)',
  'Large Wholesale (5,000 - 20,000 units)',
  'Full Container Load (FCL 20ft/40ft)',
];

const STEPS = [
  { label: 'Service', number: 1 },
  { label: 'Details', number: 2 },
  { label: 'Contact', number: 3 },
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [formData, setFormData] = useState<QuoteRequestState>({
    serviceType: preselectedProduct ? 'Wholesale Purchase' : 'Product Sourcing',
    productCategory: 'Food & Beverage',
    originPreference: 'Vietnam',
    estimatedVolume: '1,000 - 5,000 units',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: preselectedProduct ? `Inquiring regarding: ${preselectedProduct}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const goNext = () => {
    if (step < 3) {
      setDirection('forward');
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection('back');
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetAndClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      onClose();
    }, 250);
  };

  const progressPct = isSubmitted ? 100 : ((step - 1) / 3) * 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        animateIn ? 'bg-slate-950/70 backdrop-blur-lg' : 'bg-transparent backdrop-blur-none pointer-events-none'
      }`}
      onClick={resetAndClose}
    >
      <div
        className={`relative w-full max-w-2xl bg-white dark:bg-[#0c1322] border border-slate-200/80 dark:border-slate-800 rounded-[2rem] shadow-2xl shadow-emerald-900/10 dark:shadow-emerald-900/20 overflow-hidden max-h-[92vh] flex flex-col text-slate-800 dark:text-slate-100 transition-all duration-500 ${
          animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular Top Glare */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none z-30" />

        {/* ── Progress Bar ── */}
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 relative shrink-0 z-20">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 transition-all duration-700 ease-out rounded-r-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* ── Header ── */}
        <div className="relative bg-gradient-to-b from-slate-50 to-white dark:from-[#0e1527] dark:to-[#0c1322] px-6 pt-5 pb-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/25">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                  Request a B2B Quote
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct factory pricing & custom import solutions
                </p>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-500 dark:hover:text-red-400 flex items-center justify-center transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Indicator */}
          {!isSubmitted && (
            <div className="flex items-center justify-center mt-4 space-x-2">
              {STEPS.map((s, idx) => (
                <React.Fragment key={s.number}>
                  <button
                    type="button"
                    onClick={() => {
                      if (s.number < step) {
                        setDirection('back');
                        setStep(s.number);
                      }
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border ${
                      step === s.number
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105'
                        : step > s.number
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-900'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {step > s.number ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                        {s.number}
                      </span>
                    )}
                    <span>{s.label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`w-6 h-px transition-colors duration-300 ${step > s.number ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* ── Content Body ── */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* ── Success State ── */
            <div className="py-8 text-center space-y-5 animate-fadeIn">
              {/* Animated Success Icon */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                  Quote Request Sent!
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900 dark:text-white">{formData.contactName || 'Valued Client'}</span>. 
                  Our specialists will respond within <span className="text-emerald-600 dark:text-emerald-400 font-semibold">24 business hours</span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-left max-w-sm mx-auto space-y-3">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Request Summary</div>
                {[
                  { label: 'Service', value: formData.serviceType, icon: Package },
                  { label: 'Category', value: formData.productCategory, icon: FileText },
                  { label: 'Origin', value: formData.originPreference, icon: Globe },
                  { label: 'Volume', value: formData.estimatedVolume, icon: ShoppingCart },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs">
                    <item.icon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span className="text-slate-400 dark:text-slate-500 min-w-[60px]">{item.label}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 dark:text-slate-500 font-medium pt-2">
                <span className="flex items-center space-x-1"><ShieldCheck className="w-3 h-3 text-emerald-500" /><span>Secure</span></span>
                <span className="flex items-center space-x-1"><Clock className="w-3 h-3 text-emerald-500" /><span>24hr Response</span></span>
                <span className="flex items-center space-x-1"><BadgeCheck className="w-3 h-3 text-emerald-500" /><span>Verified</span></span>
              </div>

              <button
                onClick={resetAndClose}
                className="mt-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* ── STEP 1: Service Type ── */}
              {step === 1 && (
                <div className={`space-y-5 ${direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'}`}>
                  <div>
                    <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                      What do you need?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_TYPES.map((svc) => {
                        const Icon = svc.icon;
                        const isActive = formData.serviceType === svc.value;
                        return (
                          <button
                            type="button"
                            key={svc.value}
                            onClick={() => setFormData({ ...formData, serviceType: svc.value })}
                            className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 text-left flex items-start space-x-3.5 overflow-hidden ${
                              isActive
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-400 shadow-lg shadow-emerald-500/10'
                                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md'
                            }`}
                          >
                            {/* Active indicator dot */}
                            {isActive && (
                              <div className="absolute top-3 right-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </div>
                            )}
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                isActive
                                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-bold transition-colors ${isActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                                {svc.label}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                {svc.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Product Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setFormData({ ...formData, productCategory: cat })}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                            formData.productCategory === cat
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-800 dark:hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Details ── */}
              {step === 2 && (
                <div className={`space-y-5 ${direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'}`}>
                  {/* Preferred Origin */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                      Preferred Origin Country
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
                      {ORIGINS.map((origin) => {
                        const isActive = formData.originPreference === origin.value;
                        return (
                          <button
                            type="button"
                            key={origin.value}
                            onClick={() => setFormData({ ...formData, originPreference: origin.value })}
                            className={`group relative flex flex-col items-center justify-center gap-2.5 px-3 py-4 rounded-2xl border-2 transition-all duration-300 text-xs font-bold overflow-hidden ${
                              isActive
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 shadow-lg shadow-emerald-500/15 scale-[1.03]'
                                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md'
                            }`}
                          >
                            {/* Active check indicator */}
                            {isActive && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              </div>
                            )}

                            {/* Flag Image or Globe Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${
                              isActive
                                ? 'shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/40'
                                : 'shadow-sm group-hover:shadow-md'
                            }`}>
                              {origin.flagUrl ? (
                                <img
                                  src={origin.flagUrl}
                                  alt={origin.value}
                                  className="w-full h-full object-cover rounded-xl border border-slate-200/80 dark:border-slate-700/80"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 flex items-center justify-center rounded-xl border border-emerald-200 dark:border-emerald-800">
                                  <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                              )}
                            </div>

                            {/* Country Name */}
                            <span className={`text-[11px] font-bold transition-colors ${
                              isActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'
                            }`}>
                              {origin.value.split(' / ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Volume */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Target Purchase Volume
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {VOLUMES.map((vol) => {
                        const isActive = formData.estimatedVolume === vol;
                        return (
                          <button
                            type="button"
                            key={vol}
                            onClick={() => setFormData({ ...formData, estimatedVolume: vol })}
                            className={`px-4 py-3 rounded-2xl border-2 transition-all duration-200 text-xs font-semibold text-left ${
                              isActive
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 shadow-sm'
                                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-700'
                            }`}
                          >
                            {isActive && <CheckCircle2 className="w-3.5 h-3.5 inline mr-2 text-emerald-500" />}
                            {vol}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Specific Requirements <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Target pricing, custom formulation, packaging label details..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 3: Contact ── */}
              {step === 3 && (
                <div className={`space-y-5 ${direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'}`}>
                  <div>
                    <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                      Your Business Details
                    </label>
                    <div className="space-y-3">
                      {/* Company */}
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="Company / Store Name *"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>

                      {/* Contact Name */}
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="Contact Name *"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>

                      {/* Email & Phone Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <input
                            type="email"
                            required
                            placeholder="Business Email *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <input
                            type="text"
                            required
                            placeholder="Telegram / Phone *"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="flex items-center justify-center gap-5 pt-1 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    <span className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>SSL Encrypted</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>24hr Response</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>No Obligation</span>
                    </span>
                  </div>
                </div>
              )}

              {/* ── Navigation Footer ── */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Quote</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
