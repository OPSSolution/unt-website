import React, { useState, useCallback } from 'react';
import { ServicesHero, ServiceTab } from './services/ServicesHero';
import { ProductSalesService } from './services/ProductSalesService';
import { CustomSourcingService } from './services/CustomSourcingService';
import { SalesTrainingService } from './services/SalesTrainingService';
import { ServicePackageBuilder } from './services/ServicePackageBuilder';
import { SourcingMatrix } from './services/SourcingMatrix';
import { ServicesFaqAccordion } from './services/ServicesFaqAccordion';
import { Interactive3DBg } from '../components/Interactive3DBg';
import { ScrollReveal } from '../components/ScrollReveal';
import { SourcingCalculator } from '../components/SourcingCalculator';

interface ServicesPageProps {
  onOpenQuoteModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('all');

  // Smooth scroll when switching filter tabs so user sees the first result
  const handleTabChange = useCallback((tab: ServiceTab) => {
    setActiveTab(tab);
    // Scroll to just below the hero with a slight delay for re-render
    requestAnimationFrame(() => {
      const container = document.getElementById('services-content');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, []);

  return (
    <div className="relative space-y-10 sm:space-y-12 pb-4 bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh overflow-hidden min-h-screen">
      
      {/* 3D Global Canvas Background */}
      <Interactive3DBg variant="cubes" />

      {/* Hero Section */}
      <ServicesHero activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Services Container — Staggered Page Load Flow */}
      <div 
        id="services-content"
        className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-10 sm:space-y-12 scroll-mt-8"
      >

        {/* Service 01: Product Sales */}
        {(activeTab === 'all' || activeTab === 'product-sales') && (
          <ProductSalesService onOpenQuoteModal={onOpenQuoteModal} delay={80} />
        )}

        {/* Service 02: Custom Sourcing */}
        {(activeTab === 'all' || activeTab === 'sourcing') && (
          <CustomSourcingService onOpenQuoteModal={onOpenQuoteModal} delay={160} />
        )}

        {/* Service 03: Sales Training */}
        {(activeTab === 'all' || activeTab === 'training') && (
          <SalesTrainingService onOpenQuoteModal={onOpenQuoteModal} delay={240} />
        )}

        {/* Custom Package Builder Configurator */}
        <ServicePackageBuilder onOpenQuoteModal={onOpenQuoteModal} delay={320} />

        {/* Comparative Sourcing Matrix */}
        <SourcingMatrix delay={400} />

        {/* Searchable FAQ Accordion */}
        <ServicesFaqAccordion delay={480} />

        {/* Sourcing Calculator */}
        <section className="pt-0">
          <ScrollReveal animation="scale" delay={560}>
            <SourcingCalculator onOpenQuoteModal={onOpenQuoteModal} />
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
};
