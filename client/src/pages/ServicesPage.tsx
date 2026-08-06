import React from 'react';
import { SourcingCalculator } from '../components/SourcingCalculator';
import { ScrollReveal } from '../components/ScrollReveal';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { ServicePillars } from './services/ServicePillars';
import { ServicesHero } from './services/ServicesHero';
import { SourcingProcess } from './services/SourcingProcess';

interface ServicesPageProps {
  onOpenQuoteModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteModal }) => {
  const content = useHomepageSections().services_page ?? {};
  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      <ServicesHero badge={content.badge} headline={content.headline} subheadline={content.subheadline} />
      <SourcingProcess badge={content.steps_badge} heading={content.steps_heading} subheading={content.steps_sub} />
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <ScrollReveal animation="scale"><SourcingCalculator onOpenQuoteModal={onOpenQuoteModal} /></ScrollReveal>
      </section>
      <ServicePillars content={content} onQuote={onOpenQuoteModal} />
    </div>
  );
};
