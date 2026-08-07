import React, { useState } from 'react';
import { Calculator, ShieldCheck, FileText, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card3D } from '../../components/Card3D';

interface CategoryDuty {
  id: string;
  name: string;
  dutyRate: number; // %
  specialTax: number; // %
  vat: number; // %
  permit: string;
  hsCode: string;
  notes: string;
}

const CATEGORIES: Record<string, CategoryDuty> = {
  skincare: {
    id: 'skincare',
    name: 'Skincare & Beauty Cosmetics',
    dutyRate: 15,
    specialTax: 10,
    vat: 10,
    permit: 'MoH Cosmetic Product Notification (CPN)',
    hsCode: '3304.99.00',
    notes: 'Khmer language sticker mandatory. Free trade agreements (AKFTA) may reduce duty to 0% for qualified origin certificates.',
  },
  supplements: {
    id: 'supplements',
    name: 'Health & Dietary Supplements',
    dutyRate: 7,
    specialTax: 0,
    vat: 10,
    permit: 'MoH Food & Supplement Import License',
    hsCode: '2106.90.99',
    notes: 'Requires factory GMP certificate and lab stability report filing prior to GDCE customs clearance.',
  },
  beverage: {
    id: 'beverage',
    name: 'Ready-to-Drink Beverages & Functional Drinks',
    dutyRate: 35,
    specialTax: 25,
    vat: 10,
    permit: 'MoC Quality & Standards Clearance',
    hsCode: '2202.99.00',
    notes: 'Subject to special tax. Cold chain logistics required for fresh fruit and probiotic functional drinks.',
  },
  fmcg: {
    id: 'fmcg',
    name: 'Household & Personal Care FMCG',
    dutyRate: 15,
    specialTax: 0,
    vat: 10,
    permit: 'Ministry of Commerce Import Registration',
    hsCode: '3401.11.00',
    notes: 'Standard GDCE clearance within 24-48 hours upon document submission.',
  },
};

const ORIGIN_HUBS = [
  { id: 'kr', name: 'South Korea', fta: 'AKFTA (ASEAN-Korea FTA)', ftaDiscount: 0.8 },
  { id: 'jp', name: 'Japan', fta: 'AJCEP (ASEAN-Japan EPA)', ftaDiscount: 0.7 },
  { id: 'vn', name: 'Vietnam', fta: 'ATIGA (ASEAN Trade Agreement)', ftaDiscount: 1.0 },
  { id: 'th', name: 'Thailand', fta: 'ATIGA (ASEAN Trade Agreement)', ftaDiscount: 1.0 },
];

export const CustomsDutyWidget: React.FC = () => {
  const [selectedCatKey, setSelectedCatKey] = useState('skincare');
  const [selectedOriginKey, setSelectedOriginKey] = useState('kr');
  const [showSummary, setShowSummary] = useState(false);

  const activeCategory = CATEGORIES[selectedCatKey] ?? CATEGORIES.skincare;
  const activeOrigin = ORIGIN_HUBS.find((h) => h.id === selectedOriginKey) ?? ORIGIN_HUBS[0];

  // Calculate duty relief based on FTA
  const effectiveDuty = Math.max(0, Math.round(activeCategory.dutyRate * (1 - activeOrigin.ftaDiscount * 0.7)));
  const totalTariffLift = effectiveDuty + activeCategory.specialTax + activeCategory.vat;

  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 my-8">
      <Card3D intensity={8}>
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1712] to-slate-950 p-6 sm:p-8 lg:p-10 border border-emerald-500/30 text-white shadow-2xl overflow-hidden">
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none opacity-40" />

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-6 text-left">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Interactive Importer Tool</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Cambodia GDCE Customs Duty &amp; Ministry Permit Calculator
                </h3>
                <p className="text-emerald-100/80 text-xs sm:text-sm">
                  Estimate duty rates, special tax, VAT, and required Cambodian Ministry permits by origin hub.
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-right shrink-0">
                <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider block">Estimated Total Tariff</span>
                <span className="text-2xl font-display font-black text-emerald-400">+{totalTariffLift}%</span>
              </div>
            </div>

            {/* Inputs & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Select Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Select Import Product Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.values(CATEGORIES).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCatKey(cat.id)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                        selectedCatKey === cat.id
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg scale-[1.02]'
                          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-80 mt-1 font-mono">HS: {cat.hsCode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Origin */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Select Origin Manufacturing Hub
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ORIGIN_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedOriginKey(hub.id)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                        selectedOriginKey === hub.id
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg scale-[1.02]'
                          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold">{hub.name}</div>
                      <div className="text-[10px] opacity-80 truncate mt-0.5">{hub.fta}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Base GDCE Duty</span>
                <span className="text-lg font-bold text-white">{effectiveDuty}%</span>
                {activeCategory.dutyRate !== effectiveDuty && (
                  <span className="text-[10px] text-emerald-400 block font-mono">
                    (Reduced from {activeCategory.dutyRate}% via {activeOrigin.fta})
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Special Tax</span>
                <span className="text-lg font-bold text-white">{activeCategory.specialTax}%</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Value Added Tax</span>
                <span className="text-lg font-bold text-white">{activeCategory.vat}%</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Required Ministry Filing</span>
                <span className="text-xs font-bold text-emerald-300 block truncate" title={activeCategory.permit}>
                  {activeCategory.permit}
                </span>
              </div>
            </div>

            {/* Notes & PDF Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-emerald-500/20 text-xs">
              <div className="flex items-center gap-2 text-emerald-200/90 max-w-2xl text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{activeCategory.notes}</span>
              </div>

              <button
                onClick={() => setShowSummary(!showSummary)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 hover:scale-105 transition-all shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>{showSummary ? 'Hide Detailed Compliance Guide' : 'View Import Duty Briefing'}</span>
              </button>
            </div>

            {/* Expandable Compliance Briefing Details */}
            {showSummary && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-left space-y-3 text-xs text-slate-300 animate-fade-in">
                <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-emerald-500/20 pb-2">
                  <span>GDCE &amp; Ministry Clearance Steps for {activeCategory.name}</span>
                  <span className="font-mono text-[11px]">HS Code: {activeCategory.hsCode}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <strong className="text-white block">Step 1: Document Filing</strong>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      Submit Master Bill of Lading, Commercial Invoice, Packing List, and Certificate of Origin ({activeOrigin.name}).
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block">Step 2: Ministry Registration</strong>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      File product notification with Cambodian Ministry ({activeCategory.permit}) and complete Khmer label compliance.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block">Step 3: GDCE Clearance</strong>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      UNT Door-to-Door logistics manages customs declaration and temperature-controlled warehouse dispatch.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card3D>
    </section>
  );
};
