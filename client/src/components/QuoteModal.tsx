import React, { useState } from 'react';
import { X, CheckCircle2, Send, Package } from 'lucide-react';
import { QuoteRequestState } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-slate-900 dark:text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Request a B2B Sourcing Quote</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Direct factory pricing & custom Cambodian import solutions</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Quote Request Received!</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.contactName || 'Valued Client'}</span>. Our trade specialists at UNT Company Phnom Penh HQ will review your parameters and provide a formal quotation within 24 business hours.
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-left max-w-md mx-auto text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <div><strong className="text-emerald-700 dark:text-emerald-400">Service:</strong> {formData.serviceType}</div>
                <div><strong className="text-emerald-700 dark:text-emerald-400">Category:</strong> {formData.productCategory}</div>
                <div><strong className="text-emerald-700 dark:text-emerald-400">Target Origin:</strong> {formData.originPreference}</div>
                <div><strong className="text-emerald-700 dark:text-emerald-400">Est. Volume:</strong> {formData.estimatedVolume}</div>
              </div>
              <button
                onClick={resetAndClose}
                className="mt-4 px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-500 transition-all"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  1. Service / Inquiry Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Product Sourcing', 'OEM / Private Label', 'Wholesale Purchase', 'Sales Training'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, serviceType: type })}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        formData.serviceType === type
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-400 dark:border-emerald-700 shadow-xs font-bold'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Category & Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Product Category</label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Food & Beverage" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Food & Beverage (F&B)</option>
                    <option value="Skincare & Beauty" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Skincare & Cosmetics</option>
                    <option value="Personal Care" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Personal Care & Hair</option>
                    <option value="Health Supplements" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Health & Wellness Supplements</option>
                    <option value="Household Goods" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Household Goods & Cleaners</option>
                    <option value="Other / Multi-Category" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Other / Custom Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Origin</label>
                  <select
                    value={formData.originPreference}
                    onChange={(e) => setFormData({ ...formData, originPreference: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="South Korea" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">South Korea 🇰🇷</option>
                    <option value="Japan" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Japan 🇯🇵</option>
                    <option value="Vietnam" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Vietnam 🇻🇳</option>
                    <option value="China" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">China 🇨🇳</option>
                    <option value="Global / Lowest Cost" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Global (Best Price Match)</option>
                  </select>
                </div>
              </div>

              {/* Estimated Volume */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Target Purchase Volume / MOQs</label>
                <select
                  value={formData.estimatedVolume}
                  onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Trial Batch (500 - 1,000 units)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Trial Batch (500 - 1,000 units)</option>
                  <option value="1,000 - 5,000 units" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Medium Order (1,000 - 5,000 units)</option>
                  <option value="5,000 - 20,000 units" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Large Wholesale (5,000 - 20,000 units)</option>
                  <option value="Full Container Load (FCL 20ft/40ft)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Full Container Load (FCL 20ft/40ft)</option>
                </select>
              </div>

              {/* Company & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company / Store Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phnom Penh Retail Mart"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Telegram / Phone Hotline *</label>
                  <input
                    type="text"
                    required
                    placeholder="+855 12 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Specific Requirements / Product Specs</label>
                <textarea
                  rows={3}
                  placeholder="Mention target pricing, custom formulation needs, or packaging label details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Generating Official Quote...</span>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
