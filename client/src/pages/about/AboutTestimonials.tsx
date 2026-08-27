import { Sparkles } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { AnimatedTestimonials, type Testimonial } from '../../components/AnimatedTestimonials';
import { useLanguage } from '../../i18n/LanguageContext';

const OWNER_PROFILES: Testimonial[] = [
  {
    quote: 'I founded UNT to make international sourcing more accessible for Cambodian businesses. Our work is about building trusted supply chains, bringing quality products to market, and helping local teams grow with confidence.',
    name: 'UNT Founder',
    designation: 'Founder & Managing Director',
    src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop',
  },
  {
    quote: 'Our goal is to turn reliable global connections into lasting local opportunities. Every sourcing decision should create value for businesses, customers, and the communities we serve.',
    name: 'UNT Co-Founder',
    designation: 'Co-Founder & Operations Lead',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
  },
  {
    quote: 'UNT combines international standards with a deep understanding of the Cambodian market. That balance helps our clients move faster and build businesses that last.',
    name: 'UNT Director',
    designation: 'Commercial Director',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
  },
];

export function AboutTestimonials({ content }: { content: Record<string, any> }) {
  const { language } = useLanguage();
  const profiles = Array.isArray(content.owner_profiles) && content.owner_profiles.length > 0
    ? content.owner_profiles as Testimonial[]
    : OWNER_PROFILES;

  return (
    <section className="py-12">
      <ScrollReveal animation="up">
        <div className="mb-10 space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-400/40 dark:bg-emerald-500/20 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'km' ? 'អំពីក្រុមស្ថាបនិករបស់យើង' : 'Meet the Owners'}</span>
          </span>
          <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white sm:text-4xl">
            {language === 'km' ? 'អ្នកនៅពីក្រោយ UNT' : 'The People Behind UNT'}
          </h2>
        </div>
      </ScrollReveal>
      <ScrollReveal animation="up" delay={100}>
        <AnimatedTestimonials testimonials={profiles} autoplay />
      </ScrollReveal>
    </section>
  );
}
