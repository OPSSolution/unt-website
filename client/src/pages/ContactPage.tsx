import React from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { ContactForm } from './contact/ContactForm';
import { ContactHero } from './contact/ContactHero';
import { ContactInfo } from './contact/ContactInfo';
import type { ContactContent } from './contact/types';

export const ContactPage: React.FC = () => {
  const content = (useHomepageSections().contact_page ?? {}) as ContactContent;

  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      <ContactHero content={content} />
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        <ContactInfo content={content} />
        <ContactForm />
      </section>
    </div>
  );
};
