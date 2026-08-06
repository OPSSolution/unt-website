import React from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { ContactForm } from './contact/ContactForm';
import { ContactHero } from './contact/ContactHero';
import { ContactInfo, ContactFaq } from './contact/ContactInfo';
import type { ContactContent } from './contact/types';

export const ContactPage: React.FC = () => {
  const content = (useHomepageSections().contact_page ?? {}) as ContactContent;

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 animate-fade-in bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh overflow-hidden min-h-screen">
      
      {/* 1. Hero Section */}
      <ContactHero content={content} />

      {/* 2. Main Twin-Card B2B Communication Section (100% Symmetric Heights) */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 text-left items-stretch">
        <ContactInfo content={content} />
        <ContactForm />
      </section>

      {/* 3. Full-Width Frequently Asked Enterprise Questions */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-left">
        <ContactFaq />
      </section>

    </div>
  );
};
