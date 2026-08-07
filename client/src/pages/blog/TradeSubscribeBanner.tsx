import React, { useState } from 'react';
import { Send, FileDown, CheckCircle, ShieldCheck, Sparkles, Mail, X } from 'lucide-react';
import { Card3D } from '../../components/Card3D';

export const TradeSubscribeBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 my-10">
      <Card3D intensity={8}>
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-8 sm:p-10 border border-emerald-500/40 text-white shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          
          {/* Left Text */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Trade Intelligence Service</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
              Get GDCE Customs Tariff Alerts &amp; Regulatory Briefings Delivered First
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Join over 1,200+ Cambodian retail owners, B2B distributors, and OEM brand directors receiving weekly customs updates and import tax optimizations.
            </p>
          </div>

          {/* Right Action Box */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-400/50 flex items-center gap-3 text-emerald-200 text-sm font-bold animate-fade-in">
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>Subscribed! You will receive GDCE Telegram &amp; Email alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
                <div className="relative w-full">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your corporate email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <button
              onClick={() => setShowPdfModal(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 transition-all hover:scale-105"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span>Download 2026 PDF Report</span>
            </button>
          </div>

        </div>
      </Card3D>

      {/* PDF Summary Modal */}
      {showPdfModal && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setShowPdfModal(false)}
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 text-white shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <FileDown className="w-6 h-6 text-emerald-400" />
                <h4 className="font-bold text-base">2026 Cambodia FMCG Trade &amp; Tariff Report</h4>
              </div>
              <button onClick={() => setShowPdfModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p>
                <strong>Report Contents:</strong>
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>GDCE 2026 Updated Harmonized Tariff Code List (Beauty &amp; Beverage)</li>
                <li>Ministry of Commerce Cosmetic &amp; Supplement Permit Requirements</li>
                <li>AKFTA &amp; ATIGA Free Trade Agreement Tax Relief Matrix</li>
                <li>UNT Cambodian Door-to-Door Wholesale Logistics Case Studies</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-mono">Format: PDF (4.2 MB)</span>
              <button
                onClick={() => {
                  alert('Downloading 2026 Cambodia FMCG Trade & Tariff Outlook Report PDF...');
                  setShowPdfModal(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg"
              >
                <FileDown className="w-4 h-4" />
                <span>Instant Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
