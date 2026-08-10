import React, { useState, useMemo } from 'react';
import {
  Sliders, Clock, Truck, Ship, Plane, CheckCircle2, CheckSquare, Square, ArrowRight, Sparkles
} from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Card3D } from '../../components/Card3D';
import { builderAddons as defaultAddons, builderFreightOptions, builderServices } from './servicesData';

interface ServicePackageBuilderProps {
  onOpenQuoteModal: () => void;
  delay?: number;
  content: Record<string, any>;
}

export const ServicePackageBuilder: React.FC<ServicePackageBuilderProps> = ({ onOpenQuoteModal, delay = 0, content }) => {
  const [builderService, setBuilderService] = useState<'sourcing' | 'distribution' | 'training'>('sourcing');
  const [builderCountry, setBuilderCountry] = useState<string>('South Korea');
  const [builderFreight, setBuilderFreight] = useState<'sea' | 'air' | 'land'>('sea');
  const [builderAddons, setBuilderAddons] = useState<{ [key: string]: boolean }>({
    gdce: true,
    privatelabel: false,
    labtesting: true,
    trainingBootcamp: false
  });

  const calculatedLeadTime = useMemo(() => {
    const isFast = builderFreight === 'air';
    const isLand = builderFreight === 'land';
    if (isFast) return '3 – 6 Business Days (Air Express)';
    if (isLand) return '4 – 7 Business Days (Cross-Border Trucking)';
    if (builderCountry === 'Vietnam' || builderCountry === 'Laos') return '2 – 5 Business Days (Regional Route)';
    if (builderCountry === 'Japan' || builderCountry === 'South Korea') return '10 – 14 Business Days (Ocean Container)';
    return '8 – 12 Business Days (Sea Freight)';
  }, [builderFreight, builderCountry]);

  const activeAddonCount = Object.values(builderAddons).filter(Boolean).length;
  const serviceOptions = Array.isArray(content.builder_services) && content.builder_services.length ? content.builder_services : builderServices;
  const countries = typeof content.builder_countries_text === 'string' && content.builder_countries_text.trim() ? content.builder_countries_text.split('\n').map((item: string) => item.trim()).filter(Boolean) : ['Japan', 'South Korea', 'Malaysia', 'Vietnam', 'Laos', 'China'];
  const freightOptions = Array.isArray(content.builder_freight_options) && content.builder_freight_options.length ? content.builder_freight_options : builderFreightOptions;
  const addonOptions = Array.isArray(content.builder_addons) && content.builder_addons.length ? content.builder_addons : defaultAddons;

  const toggleAddon = (key: string) => {
    setBuilderAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="space-y-6">

      {/* ─── Section Header ─── */}
      <ScrollReveal animation="up" delay={delay}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
            {content.builder_badge ?? 'Interactive Custom Solution Builder'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {content.builder_title ?? 'Build Your Custom'} <span className="text-emerald-600 dark:text-emerald-400">{content.builder_highlight ?? 'UNT Service Package'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {content.builder_desc ?? 'Configure your desired procurement scope, origin country, logistics speed, and ecosystem add-ons to preview instant timeline & compliance metrics.'}
          </p>
        </div>
      </ScrollReveal>

      {/* ─── Configurator Grid ─── */}
      <ScrollReveal animation="up" delay={delay + 80}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Col 1 — Service & Country */}
          <Card3D intensity={4}>
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-6 h-full">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 dark:text-emerald-400 tracking-wider block">{content.builder_core_label ?? '1. Select Core Business Need'}</label>
                <div className="space-y-2">
                  {serviceOptions.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => setBuilderService(item.id as any)}
                      className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between ${builderService === item.id
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500 shadow-md font-bold'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-emerald-500 active:scale-[0.98]'
                        }`}
                    >
                      <div>
                        <span className="font-bold text-xs block">{item.label}</span>
                        <span className={`text-[10px] ${builderService === item.id ? 'text-emerald-100 dark:text-slate-900/80' : 'text-slate-400'}`}>{item.desc}</span>
                      </div>
                      {builderService === item.id ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 dark:text-emerald-400 tracking-wider block">{content.builder_origin_label ?? '2. Origin Country'}</label>
                <div className="grid grid-cols-3 gap-2">
                  {countries.map((c: string) => (
                    <button
                      key={c}
                      onClick={() => setBuilderCountry(c)}
                      className={`p-2 rounded-lg text-[11px] font-bold transition-all border text-center ${builderCountry === c
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500 shadow-sm'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-emerald-500 active:scale-95'
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card3D>

          {/* Col 2 — Freight & Add-ons */}
          <Card3D intensity={4}>
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-6 h-full">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 dark:text-emerald-400 tracking-wider block">{content.builder_freight_label ?? '3. Freight Speed'}</label>
                <div className="grid grid-cols-3 gap-2">
                  {freightOptions.map((fm: any, index: number) => {
                    const FmIcon = [Ship, Plane, Truck][index] ?? Truck;
                    const isSel = builderFreight === fm.id;
                    return (
                      <button
                        key={fm.id}
                        onClick={() => setBuilderFreight(fm.id as any)}
                        className={`p-2.5 rounded-xl border text-center space-y-1 transition-all ${isSel
                            ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500 shadow-sm font-bold'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-emerald-500 active:scale-95'
                          }`}
                      >
                        <FmIcon className={`w-3.5 h-3.5 mx-auto ${isSel ? '' : 'text-emerald-600 dark:text-emerald-400'}`} />
                        <div className="font-bold text-[11px]">{fm.label}</div>
                        <div className={`text-[9px] ${isSel ? 'text-emerald-100 dark:text-slate-900/80' : 'text-slate-400'}`}>{fm.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 dark:text-emerald-400 tracking-wider block">{content.builder_addons_label ?? '4. Ecosystem Add-ons'}</label>
                <div className="space-y-1.5">
                  {addonOptions.map((addon: any) => {
                    const addonKey = addon.id ?? addon.key;
                    const isChecked = !!builderAddons[addonKey];
                    return (
                      <button
                        key={addonKey}
                        onClick={() => toggleAddon(addonKey)}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-[11px] transition-all ${isChecked
                            ? 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-400 dark:border-emerald-400/40 text-emerald-900 dark:text-emerald-300 font-semibold'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-400 active:scale-[0.98]'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          {isChecked ? <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
                          <span>{addon.label}</span>
                        </div>
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">{addon.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card3D>

          {/* Col 3 — Summary Panel */}
          <Card3D intensity={4}>
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 dark:border-emerald-500/30 flex flex-col justify-between space-y-5 h-full shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 dark:border-emerald-500/15">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configuration Summary</span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Live
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Core Service</span>
                    <span className="font-bold text-white text-sm capitalize">{builderService === 'sourcing' ? 'Factory Sourcing' : builderService === 'distribution' ? 'Local Bulk Stock' : 'Sales Training'}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Route</span>
                    <span className="font-bold text-emerald-300">{builderCountry} → Phnom Penh ({builderFreight.toUpperCase()})</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Estimated Lead Time</span>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/30 text-emerald-300 font-extrabold text-xs flex items-center gap-2 mt-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{calculatedLeadTime}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Add-ons Active</span>
                    <span className="font-bold text-emerald-300">{activeAddonCount} services</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="btn-shine w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
              >
                <span>Request This Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card3D>

        </div>
      </ScrollReveal>

    </section>
  );
};
