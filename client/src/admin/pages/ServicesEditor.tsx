import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';
import { useLanguage } from '../../i18n/LanguageContext';
import { builderAddons, builderFreightOptions, builderServices, countryContentDefaults, faqList, productBenefits, productCategories, sourcingMatrixRows, sourcingSteps, trainingCurriculum, trainingEcosystemItems, trainingFormats } from '../../pages/services/servicesData';

const DEFAULTS = {
  badge: 'End-to-End Procurement Infrastructure',
  headline: 'Integrated Global Trading Solutions',
  subheadline: 'From factory-direct auditing and private label OEM formulation to Ministry permits, GDCE customs clearance, and door-to-door logistics in Cambodia.',
  headline_highlight: 'Your Enterprise',
  tab_all: 'All Services',
  tab_product: '01. Product Sales',
  tab_sourcing: '02. Sourcing-as-a-Service',
  tab_training: '03. Sales Training',
  product_badge: 'Service 01 — Local Stock Distribution',
  product_title: 'Product Sales',
  product_highlight: '(Local Cambodian Inventory)',
  product_desc: 'Skip foreign supplier risk and international freight delays. We import premium goods directly, verify quality, and hold local stock in Phnom Penh ready for immediate delivery.',
  product_cta: 'Browse Live Wholesale Stock',
  origin_selector_label: 'Select Origin Country',
  source_from_label: 'Source from',
  corridor_overview_label: 'Overview',
  compliance_standards_label: 'Compliance Standards',
  top_products_label: 'Top Sourced Products',
  stock_categories_label: 'Product Categories Available in Stock',
  origin_countries: countryContentDefaults,
  product_categories: productCategories,
  product_benefits: productBenefits,
  sourcing_badge: 'Service 02 — Custom B2B Procurement Desk',
  sourcing_title: 'Sourcing-as-a-Service',
  sourcing_highlight: '(Factory Procurement)',
  sourcing_desc: 'Need a custom product made abroad? UNT acts as your external procurement team — handling factory audits, price negotiation, sample inspection, freight, and GDCE customs clearance.',
  sourcing_cta: 'Request Custom B2B Sourcing',
  sourcing_roadmap_title: '5-Phase Procurement Roadmap',
  sourcing_roadmap_hint: 'Click any step',
  sourcing_phase_label: 'Phase',
  sourcing_details_label: 'Details',
  sourcing_start_phase_label: 'Start Phase',
  sourcing_steps: sourcingSteps,
  sourcing_manage_title: 'What We Manage For You',
  sourcing_manage_items_text: 'Supplier research & factory background vetting\nWholesale price negotiation & contract terms\nPhysical sample inspection & lab testing\nGDCE customs clearance & Ministry certificates',
  sourcing_terms_title: 'Key Terms & MOQs',
  sourcing_moq_label: 'Minimum Order Quantity:',
  sourcing_moq_value: 'Flexible and negotiated with our specialists based on product type.',
  sourcing_countries_label: 'Countries Covered:',
  sourcing_countries_value: 'Japan, South Korea, Malaysia, Vietnam, Laos, China.',
  sourcing_scope_label: 'Product Scope:',
  sourcing_scope_value: 'Food, Supplements, Skincare, Hair Care, Wellness, Household.',
  training_badge: 'Service 03 — Sales Academy & Ecosystem',
  training_title: 'Sales Training &',
  training_highlight: 'Ecosystem Enablement',
  training_desc: "Transform your sales team into high-revenue closer teams. We teach real-world customer psychology, objection handling, and negotiation — backed by UNT's complete sourcing and digital branding ecosystem.",
  training_cta: 'Book Team Consultation',
  training_format_heading: 'Choose Your Delivery Format',
  training_active_label: 'Active',
  training_formats: trainingFormats,
  training_curriculum_heading: 'Curriculum & Training Modules',
  training_curriculum: trainingCurriculum,
  training_ecosystem_heading: 'The UNT Ecosystem Advantage',
  training_ecosystem_desc: 'Unlike generic training courses, UNT provides an active commercial ecosystem so your sales team learns with real products, real supply chains, and digital branding assets:',
  training_ecosystem_items: trainingEcosystemItems,
  training_director_cta: 'Consult With Our Sales Director',
  builder_badge: 'Interactive Custom Solution Builder', builder_title: 'Build Your Custom', builder_highlight: 'UNT Service Package',
  builder_desc: 'Configure your desired procurement scope, origin country, logistics speed, and ecosystem add-ons to preview instant timeline & compliance metrics.',
  builder_core_label: '1. Select Core Business Need', builder_services: builderServices,
  builder_origin_label: '2. Origin Country', builder_countries_text: 'Japan\nSouth Korea\nMalaysia\nVietnam\nLaos\nChina',
  builder_freight_label: '3. Freight Speed', builder_freight_options: builderFreightOptions,
  builder_addons_label: '4. Ecosystem Add-ons', builder_addons: builderAddons,
  matrix_badge: 'Comparative Sourcing Matrix', matrix_title: 'Why Businesses Choose', matrix_highlight: 'UNT Sourcing',
  matrix_unt_tab: 'UNT Ecosystem', matrix_traditional_tab: 'Traditional / Self-Import', matrix_rows: sourcingMatrixRows,
  faq_badge: 'Frequently Asked Questions', faq_title: 'Got Questions About', faq_highlight: 'UNT Services?',
  faq_desc: 'Search or select a category below for instant answers regarding custom sourcing, GDCE customs clearance, local stock delivery, and sales workshops.',
  faq_search_placeholder: 'Search FAQs (e.g. GDCE, MOQ, delivery, training)...', faq_tab_all: 'All FAQs',
  faq_tab_customs: 'GDCE & Customs', faq_tab_sourcing: 'Sourcing & MOQs', faq_tab_delivery: 'Local Delivery', faq_tab_training: 'Sales Training', faq_items: faqList,
  estimator_title: 'Interactive Sourcing Estimator', estimator_desc: 'Calculate lead times, logistics, & Cambodian import permit requirements',
  estimator_badge: 'B2B Sourcing Tool', estimator_category_label: '1. Product Category', estimator_origin_label: '2. Manufacturing Origin',
  estimator_volume_label: '3. Estimated Lot Volume', estimator_oem_label: 'Requires Turnkey OEM / Custom Brand Re-packaging (+14 Days R&D)',
  estimator_lead_label: 'Est. Delivery Lead Time', estimator_route_label: 'Logistics Shipping Route', estimator_clearance_label: 'Ministry Clearances Secured',
  estimator_note: "Estimates based on Unique Noble Trading Co., Ltd.'s established trade lane frequencies.", estimator_cta: 'Lock In Formal Quotation',
};
const EMPTY_TRANSLATIONS = Object.fromEntries(Object.entries(DEFAULTS).map(([key, value]) => [key, Array.isArray(value) ? [] : '']));

const KHMER_COUNTRY_DEFAULTS: Record<string, any> = {
  KH: {
    name: 'កម្ពុជា',
    niche: 'ការចែកចាយក្នុងស្រុក ផលិតផលសម្គាល់ភូមិសាស្ត្រ និងមជ្ឈមណ្ឌលភស្តុភារតំបន់',
    seaTransit: '១ – ២ ថ្ងៃ',
    airTransit: 'ក្នុងថ្ងៃ / បន្ទាន់',
    standards: ['អនុលោមតាម GDCE', 'វិញ្ញាបនបត្រពាណិជ្ជកម្ម', 'ទទួលស្គាល់ដោយក្រសួងសុខាភិបាល'],
    topProducts: ['ម្រេចកំពត និងផលិតផលកសិកម្ម', 'ទំនិញប្រើប្រាស់ក្នុងស្រុក', 'ស្តុកដុំក្នុងស្រុក'],
    desc: 'បណ្តាញឃ្លាំងកណ្តាល និងការដឹកជញ្ជូនដល់ទីតាំងផ្ទាល់នៅភ្នំពេញ និងគ្រប់ ២៥ រាជធានី-ខេត្ត។'
  },
  JP: {
    name: 'ជប៉ុន',
    niche: 'ការថែរក្សាស្បែកលំដាប់ខ្ពស់ កូឡាជែន និងភេសជ្ជៈមុខងារ',
    seaTransit: '១២ – ១៤ ថ្ងៃ',
    airTransit: '៣ – ៥ ថ្ងៃ',
    standards: ['អនុម័តដោយ PMDA', 'ISO 22000', 'ទទួលស្គាល់ដោយ GMP'],
    topProducts: ['សេរ៉ូមកូឡាជែនពន្យារភាពចាស់', 'ម្សៅតែបៃតង និងតែមុខងារ', 'អាហារបំប៉ន Placenta និង NMN'],
    desc: 'ភាពជាដៃគូរោងចក្រផ្ទាល់នៅតូក្យូ អូសាកា និងហ្វូគូអូកា។ ការផលិតរបស់ជប៉ុនធានានូវភាពបរិសុទ្ធនៃរូបមន្ត និងការត្រួតពិនិត្យគុណភាពយ៉ាងម៉ឹងម៉ាត់។'
  },
  KR: {
    name: 'កូរ៉េខាងត្បូង',
    niche: 'K-Beauty ថែរក្សាស្បែក និងផលិតផលសុខភាពទាន់សម័យ',
    seaTransit: '១០ – ១២ ថ្ងៃ',
    airTransit: '២ – ៤ ថ្ងៃ',
    standards: ['ស្តង់ដារ MFDS (KFDA)', 'CGMP', 'ISO 22716'],
    topProducts: ['សេរ៉ូមផ្តល់សំណើម Cica', 'ឡេការពារកម្តៅថ្ងៃ Glass-Skin SPF50+', 'យិនស៊ិនក្រហមចាញ់'],
    desc: 'ក្រុមការងារលទ្ធកម្មផ្ទាល់នៅសេអ៊ូល និងអ៊ីនឈុន។ ទទួលបានរូបមន្ត K-Beauty ទាន់សម័យ និងរោងចក្រ OEM/ODM។'
  },
  VN: {
    name: 'វៀតណាម',
    niche: 'កសិផលពិសេស កាហ្វេ គ្រឿងទេស និងការវេចខ្ចប់',
    seaTransit: '៣ – ៥ ថ្ងៃ',
    airTransit: '១ – ២ ថ្ងៃ',
    standards: ['វិញ្ញាបនបត្រ VFA', 'ISO 9001', 'ស្តង់ដារ VietGAP'],
    topProducts: ['គ្រាប់កាហ្វេ Robusta គុណភាពខ្ពស់', 'ស្វាយកែវរំអៀត និងផ្លែឈើក្រៀម', 'ប្រអប់វេចខ្ចប់បរិស្ថាន'],
    desc: 'ការដឹកជញ្ជូនតាមផ្លូវគោកឆ្លងដែន និងផ្លូវសមុទ្រលឿនបំផុត។ តម្លៃសមរម្យសម្រាប់ទំនិញកសិកម្ម និងអាហារវេចខ្ចប់។'
  },
  LA: {
    name: 'ឡាវ',
    niche: 'ផលិតផលកសិកម្មសរីរាង្គ តែ រ៉ែ និងសិប្បកម្ម',
    seaTransit: '២ – ៤ ថ្ងៃ (ផ្លូវដែក និងរថយន្ត)',
    airTransit: '១ – ២ ថ្ងៃ',
    standards: ['អនុម័តដោយ Lao FDA', 'ISO 9001', 'អនុលោមភាពពាណិជ្ជកម្មអាស៊ាន'],
    topProducts: ['គ្រាប់កាហ្វេភ្នំពិសេស', 'តែសរីរាង្គ និងគ្រឿងទេស', 'សូត្រ និងសម្លៀកបំពាក់បៃតង'],
    desc: 'ច្រកពាណិជ្ជកម្មផ្លូវគោកផ្ទាល់តាមវៀងច័ន្ទ។ ការតភ្ជាប់ភស្តុភារឆ្លងដែនលឿនរហ័សរវាងកម្ពុជា និងឡាវ។'
  },
  CN: {
    name: 'ចិន',
    niche: 'ការវេចខ្ចប់គ្រឿងសម្ភារៈសម្រស់ OEM អេឡិចត្រូនិក និងទំនិញដុំ',
    seaTransit: '៧ – ១០ ថ្ងៃ',
    airTransit: '២ – ៤ ថ្ងៃ',
    standards: ['ចុះបញ្ជី NMPA', 'ISO 13485', 'ស្តង់ដារ CE & CCC'],
    topProducts: ['ដបគ្រឿងសម្អិត Airless', 'ឧបករណ៍ពន្លឺបំប៉នស្បែក LED', 'ប្រអប់រឹងបោះពុម្ពតាមតម្រូវការ'],
    desc: 'ការសវនកម្មរោងចក្រផ្ទាល់នៅក្វាងទុង ចឺជាំង និងជាំងស៊ូ។ ប្រភពចម្បងសម្រាប់ការផលិតពុម្ពវេចខ្ចប់ OEM និងទំនិញដុំ។'
  },
  MY: {
    name: 'ម៉ាឡេស៊ី',
    niche: 'អាហារ ព្រេង និងផលិតផលអនាម័យផ្ទាល់ខ្លួន standard Halal',
    seaTransit: '៧ – ៩ ថ្ងៃ',
    airTransit: '២ – ៣ ថ្ងៃ',
    standards: ['JAKIM Halal', 'MPOB Certified', 'HACCP & GMP'],
    topProducts: ['កាហ្វេស 3-in-1', 'ប្រេងដូងបរិភោគ', 'សាប៊ូកក់សក់ និងសាប៊ូតួខ្លួនសរីរាង្គ'],
    desc: 'ការតភ្ជាប់ភស្តុភាររវាងកំពង់ផែ Klang និងព្រះសីហនុ។ ប្រភពផលិតផលប្រើប្រាស់ និងគ្រឿងសម្អិត Halal។'
  }
};

const KHMER_STRUCTURE_DEFAULTS = {
  origin_countries: countryContentDefaults.map((country) => ({
    code: country.code,
    name: KHMER_COUNTRY_DEFAULTS[country.code]?.name || country.name,
    niche: KHMER_COUNTRY_DEFAULTS[country.code]?.niche || country.niche,
    seaTransit: KHMER_COUNTRY_DEFAULTS[country.code]?.seaTransit || country.seaTransit,
    airTransit: KHMER_COUNTRY_DEFAULTS[country.code]?.airTransit || country.airTransit,
    standards: KHMER_COUNTRY_DEFAULTS[country.code]?.standards || country.standards,
    topProducts: KHMER_COUNTRY_DEFAULTS[country.code]?.topProducts || country.topProducts,
    desc: KHMER_COUNTRY_DEFAULTS[country.code]?.desc || country.desc,
  })),
  product_categories: productCategories.map(() => ({ title: '', count: '' })),
  product_benefits: productBenefits.map(() => ({ title: '', desc: '' })),
  sourcing_steps: sourcingSteps.map((step) => ({ num: step.num, title: '', subtitle: '', desc: '' })),
  training_formats: trainingFormats.map((item) => ({ id: item.id, title: '', desc: '' })),
  training_curriculum: trainingCurriculum.map(() => ''),
  training_ecosystem_items: trainingEcosystemItems.map(() => ''),
  builder_services: builderServices.map((item) => ({ id: item.id, label: '', desc: '' })),
  builder_freight_options: builderFreightOptions.map((item) => ({ id: item.id, label: '', sub: '' })),
  builder_addons: builderAddons.map((item) => ({ id: item.id, label: '', tag: '' })),
  matrix_rows: sourcingMatrixRows.map(() => ({ feature: '', unt: '', traditional: '' })),
  faq_items: faqList.map((item) => ({ category: item.category, q: '', a: '' })),
};

function servicesEditorData(language: 'en' | 'km', saved: Record<string, any> | null | undefined) {
  if (language === 'en') return { ...DEFAULTS, ...(saved ?? {}) };
  const merged = { ...EMPTY_TRANSLATIONS, ...KHMER_STRUCTURE_DEFAULTS, ...(saved ?? {}) } as any;
  for (const key of Object.keys(KHMER_STRUCTURE_DEFAULTS) as Array<keyof typeof KHMER_STRUCTURE_DEFAULTS>) {
    if (!Array.isArray(merged[key]) || merged[key].length === 0) merged[key] = KHMER_STRUCTURE_DEFAULTS[key];
  }
  return merged;
}

const TABS = ['Header', 'Product Sales', 'Sourcing', 'Sales Training', 'Advanced Content'] as const;
type Tab = typeof TABS[number];

export function ServicesEditor() {
  const { token } = useAdminAuth();
  const { language } = useLanguage();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Header');
  const [loading, setLoading] = useState(true);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [selectedSourcingStepIndex, setSelectedSourcingStepIndex] = useState(0);

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    `services_page-${language}`,
    data,
    async (d) => {
      if (!token) return;
      await api.updateHomepageSection('services_page', d, token, language);
    },
    1500,
    !loading
  );

  useEffect(() => {
    setLoading(true);
    api.getHomepageSection('services_page')
      .then((r) => {
        setSelectedCountryIndex(0);
        setSelectedSourcingStepIndex(0);
        setData(servicesEditorData(language, r.data));
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [language]);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));
  const updateCountry = (key: string, value: string | string[]) => setData((current: any) => ({
    ...current,
    origin_countries: (Array.isArray(current.origin_countries) ? current.origin_countries : []).map((country: any, index: number) =>
      index === selectedCountryIndex ? { ...country, [key]: value } : country),
  }));

  const addCountry = () => {
    setData((current: any) => {
      const list = Array.isArray(current.origin_countries) ? current.origin_countries : [];
      const isKm = language === 'km';
      const newCountry = isKm ? {
        code: 'KH',
        name: 'កម្ពុជា',
        niche: 'ការចែកចាយក្នុងស្រុក ផលិតផលសម្គាល់ភូមិសាស្ត្រ និងមជ្ឈមណ្ឌលភស្តុភារតំបន់',
        seaTransit: '១ – ២ ថ្ងៃ',
        airTransit: 'ក្នុងថ្ងៃ / បន្ទាន់',
        desc: 'បណ្តាញឃ្លាំងកណ្តាល និងការដឹកជញ្ជូនដល់ទីតាំងផ្ទាល់នៅភ្នំពេញ និងគ្រប់ ២៥ រាជធានី-ខេត្ត។',
        standards: ['អនុលោមតាម GDCE', 'វិញ្ញាបនបត្រពាណិជ្ជកម្ម', 'ទទួលស្គាល់ដោយក្រសួងសុខាភិបាល'],
        topProducts: ['ម្រេចកំពត និងផលិតផលកសិកម្ម', 'ទំនិញប្រើប្រាស់ក្នុងស្រុក', 'ស្តុកដុំក្នុងស្រុក'],
      } : {
        code: 'KH',
        name: 'Cambodia',
        niche: 'Local Distribution, GI Produce & Regional Logistics Hub',
        seaTransit: '1 – 2 Days',
        airTransit: 'Same Day / Express',
        desc: 'Phnom Penh central warehousing and door-to-door distribution network serving all 25 Cambodian provinces.',
        standards: ['GDCE Compliant', 'MOC Certified', 'Ministry of Health Approved'],
        topProducts: ['Kampot Pepper & Organic Produce', 'Local Agricultural FMCG Goods', 'Wholesale Local Stock'],
      };
      const updated = [...list, newCountry];
      setSelectedCountryIndex(updated.length - 1);
      return { ...current, origin_countries: updated };
    });
  };

  const removeCountry = (indexToRemove: number) => {
    setData((current: any) => {
      const list = Array.isArray(current.origin_countries) ? current.origin_countries : [];
      if (list.length <= 1) {
        alert('At least one country corridor must remain.');
        return current;
      }
      const updated = list.filter((_: any, idx: number) => idx !== indexToRemove);
      setSelectedCountryIndex((prev) => Math.max(0, Math.min(prev, updated.length - 1)));
      return { ...current, origin_countries: updated };
    });
  };
  const updateCategory = (index: number, key: 'title' | 'count', value: string) => setData((current: any) => ({
    ...current,
    product_categories: (Array.isArray(current.product_categories) ? current.product_categories : []).map((category: any, itemIndex: number) =>
      itemIndex === index ? { ...category, [key]: value } : category),
  }));
  const updateBenefit = (index: number, key: 'title' | 'desc', value: string) => setData((current: any) => ({
    ...current,
    product_benefits: (Array.isArray(current.product_benefits) ? current.product_benefits : []).map((benefit: any, itemIndex: number) =>
      itemIndex === index ? { ...benefit, [key]: value } : benefit),
  }));
  const updateSourcingStep = (key: string, value: string) => setData((current: any) => ({
    ...current,
    sourcing_steps: (Array.isArray(current.sourcing_steps) ? current.sourcing_steps : []).map((step: any, index: number) =>
      index === selectedSourcingStepIndex ? { ...step, [key]: value } : step),
  }));
  const updateArrayItem = (arrayKey: string, index: number, key: string, value: string) => setData((current: any) => ({
    ...current,
    [arrayKey]: (Array.isArray(current[arrayKey]) ? current[arrayKey] : []).map((item: any, itemIndex: number) =>
      itemIndex === index ? { ...item, [key]: value } : item),
  }));
  const setLineList = (key: string) => (value: string) => setData((current: any) => ({ ...current, [key]: value.split('\n') }));

  const handleSave = async () => {
    if (!token) return;
    try {
      await api.updateHomepageSection('services_page', data, token, language);
    } catch (e: any) { /* auto-save will show errors */ }
  };

  return (
    <EditorShell
      title="Services & Sourcing Page"
      description="Edit content shown on the Services & Sourcing page. Changes are saved automatically."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
      autoSaving={autoSaving} autoSaved={autoSaved} autoSaveError={autoSaveError} dirty={dirty}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Header' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Page Header" />
              <Field label="Badge" value={data.badge} onChange={set('badge')} />
              <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
              <Field label="Highlighted Headline" value={data.headline_highlight} onChange={set('headline_highlight')} />
              <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={4} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Service Filter Buttons" />
              <Field label="All Services" value={data.tab_all} onChange={set('tab_all')} />
              <Field label="Product Sales" value={data.tab_product} onChange={set('tab_product')} />
              <Field label="Sourcing" value={data.tab_sourcing} onChange={set('tab_sourcing')} />
              <Field label="Sales Training" value={data.tab_training} onChange={set('tab_training')} />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Product Sales' && (
        <div className="space-y-6">
          <Card><div className="space-y-4">
            <SectionDivider label="Service 01 — Product Sales" />
            <Field label="Badge" value={data.product_badge ?? ''} onChange={set('product_badge')} />
            <Field label="Title" value={data.product_title ?? ''} onChange={set('product_title')} />
            <Field label="Highlighted Title" value={data.product_highlight ?? ''} onChange={set('product_highlight')} />
            <Field label="Description" value={data.product_desc ?? ''} onChange={set('product_desc')} multiline rows={4} />
            <Field label="CTA Button" value={data.product_cta ?? ''} onChange={set('product_cta')} />
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Origin Country Labels" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <Field label="Selector Label" value={data.origin_selector_label ?? ''} onChange={set('origin_selector_label')} />
              <Field label="Source Button Prefix" value={data.source_from_label ?? ''} onChange={set('source_from_label')} />
              <Field label="Corridor Overview Label" value={data.corridor_overview_label ?? ''} onChange={set('corridor_overview_label')} />
              <Field label="Compliance Label" value={data.compliance_standards_label ?? ''} onChange={set('compliance_standards_label')} />
              <Field label="Top Products Label" value={data.top_products_label ?? ''} onChange={set('top_products_label')} />
              <Field label="Stock Categories Label" value={data.stock_categories_label ?? ''} onChange={set('stock_categories_label')} />
            </div>
          </div></Card>

          <Card><div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <SectionDivider label="Country Corridors" />
              <button
                type="button"
                onClick={addCountry}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Country Corridor
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(Array.isArray(data.origin_countries) ? data.origin_countries : []).map((country: any, index: number) => (
                <div key={`${country.code}-${index}`} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCountryIndex(index)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedCountryIndex === index ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm scale-105' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    {country.name || country.code || `Country ${index + 1}`}
                  </button>
                  {data.origin_countries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete corridor for "${country.name || country.code}"?`)) {
                          removeCountry(index);
                        }
                      }}
                      title={`Delete ${country.name || country.code}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {(() => {
              const countryList = Array.isArray(data.origin_countries) ? data.origin_countries : [];
              const country = countryList[selectedCountryIndex];
              if (!country) return <p className="text-sm text-slate-500">No country content is available for this language.</p>;
              return <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Editing Corridor: <strong className="text-emerald-600 dark:text-emerald-400">{country.name || country.code}</strong>
                  </span>
                  {countryList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete corridor for "${country.name || country.code}"?`)) {
                          removeCountry(selectedCountryIndex);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-bold px-3 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/40 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Corridor
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Country Name" value={country.name ?? ''} onChange={(v) => updateCountry('name', v)} />
                  <Field label="Country Code" value={country.code ?? ''} onChange={(v) => updateCountry('code', v.toUpperCase())} />
                  <div className="md:col-span-2"><Field label="Specialty / Niche" value={country.niche ?? ''} onChange={(v) => updateCountry('niche', v)} /></div>
                  <Field label="Sea / Land Transit" value={country.seaTransit ?? ''} onChange={(v) => updateCountry('seaTransit', v)} />
                  <Field label="Air Transit" value={country.airTransit ?? ''} onChange={(v) => updateCountry('airTransit', v)} />
                  <div className="md:col-span-2"><Field label="Corridor Description" value={country.desc ?? ''} onChange={(v) => updateCountry('desc', v)} multiline rows={4} /></div>
                  <Field label="Compliance Standards (one per line)" value={(country.standards ?? []).join('\n')} onChange={(v) => updateCountry('standards', v.split('\n').map((item) => item.trim()).filter(Boolean))} multiline rows={5} />
                  <Field label="Top Sourced Products (one per line)" value={(country.topProducts ?? []).join('\n')} onChange={(v) => updateCountry('topProducts', v.split('\n').map((item) => item.trim()).filter(Boolean))} multiline rows={5} />
                </div>
              </div>;
            })()}
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Product Categories in Stock" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(Array.isArray(data.product_categories) ? data.product_categories : []).map((category: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                  <Field label="Category" value={category.title ?? ''} onChange={(v) => updateCategory(index, 'title', v)} />
                  <Field label="Product Count" value={category.count ?? ''} onChange={(v) => updateCategory(index, 'count', v)} />
                </div>
              ))}
            </div>
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Product Sales Benefits" />
            <div className="space-y-4">
              {(Array.isArray(data.product_benefits) ? data.product_benefits : []).map((benefit: any, index: number) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                  <Field label={`Benefit ${index + 1} Title`} value={benefit.title ?? ''} onChange={(v) => updateBenefit(index, 'title', v)} />
                  <Field label="Description" value={benefit.desc ?? ''} onChange={(v) => updateBenefit(index, 'desc', v)} multiline rows={3} />
                </div>
              ))}
            </div>
          </div></Card>
        </div>
      )}

      {activeTab === 'Sourcing' && (
        <div className="space-y-6">
          <Card><div className="space-y-4">
            <SectionDivider label="Service 02 — Custom Sourcing" />
            <Field label="Badge" value={data.sourcing_badge ?? ''} onChange={set('sourcing_badge')} />
            <Field label="Title" value={data.sourcing_title ?? ''} onChange={set('sourcing_title')} />
            <Field label="Highlighted Title" value={data.sourcing_highlight ?? ''} onChange={set('sourcing_highlight')} />
            <Field label="Description" value={data.sourcing_desc ?? ''} onChange={set('sourcing_desc')} multiline rows={4} />
            <Field label="CTA Button" value={data.sourcing_cta ?? ''} onChange={set('sourcing_cta')} />
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Procurement Roadmap Labels" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <Field label="Roadmap Title" value={data.sourcing_roadmap_title ?? ''} onChange={set('sourcing_roadmap_title')} />
              <Field label="Instruction" value={data.sourcing_roadmap_hint ?? ''} onChange={set('sourcing_roadmap_hint')} />
              <Field label="Phase Label" value={data.sourcing_phase_label ?? ''} onChange={set('sourcing_phase_label')} />
              <Field label="Details Label" value={data.sourcing_details_label ?? ''} onChange={set('sourcing_details_label')} />
              <Field label="Start Phase Button" value={data.sourcing_start_phase_label ?? ''} onChange={set('sourcing_start_phase_label')} />
            </div>
          </div></Card>

          <Card><div className="space-y-5">
            <SectionDivider label="Five Procurement Phases" />
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(data.sourcing_steps) ? data.sourcing_steps : []).map((step: any, index: number) => (
                <button key={`${step.num}-${index}`} type="button" onClick={() => setSelectedSourcingStepIndex(index)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${selectedSourcingStepIndex === index ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>Phase {step.num || index + 1}</button>
              ))}
            </div>
            {(() => {
              const step = (Array.isArray(data.sourcing_steps) ? data.sourcing_steps : [])[selectedSourcingStepIndex];
              if (!step) return <p className="text-sm text-slate-500">No roadmap phases are available for this language.</p>;
              return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Phase Number" value={step.num ?? ''} onChange={(v) => updateSourcingStep('num', v)} />
                <Field label="Phase Title" value={step.title ?? ''} onChange={(v) => updateSourcingStep('title', v)} />
                <div className="md:col-span-2"><Field label="Short Subtitle" value={step.subtitle ?? ''} onChange={(v) => updateSourcingStep('subtitle', v)} /></div>
                <div className="md:col-span-2"><Field label="Detailed Description" value={step.desc ?? ''} onChange={(v) => updateSourcingStep('desc', v)} multiline rows={4} /></div>
              </div>;
            })()}
          </div></Card>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card><div className="space-y-4">
              <SectionDivider label="What We Manage For You" />
              <Field label="Section Title" value={data.sourcing_manage_title ?? ''} onChange={set('sourcing_manage_title')} />
              <Field label="Managed Items (one per line)" value={data.sourcing_manage_items_text ?? ''} onChange={set('sourcing_manage_items_text')} multiline rows={9} />
            </div></Card>
            <Card><div className="space-y-4">
              <SectionDivider label="Key Terms & MOQs" />
              <Field label="Section Title" value={data.sourcing_terms_title ?? ''} onChange={set('sourcing_terms_title')} />
              <Field label="MOQ Label" value={data.sourcing_moq_label ?? ''} onChange={set('sourcing_moq_label')} />
              <Field label="MOQ Description" value={data.sourcing_moq_value ?? ''} onChange={set('sourcing_moq_value')} multiline rows={3} />
              <Field label="Countries Label" value={data.sourcing_countries_label ?? ''} onChange={set('sourcing_countries_label')} />
              <Field label="Countries Covered" value={data.sourcing_countries_value ?? ''} onChange={set('sourcing_countries_value')} multiline rows={3} />
              <Field label="Product Scope Label" value={data.sourcing_scope_label ?? ''} onChange={set('sourcing_scope_label')} />
              <Field label="Product Scope" value={data.sourcing_scope_value ?? ''} onChange={set('sourcing_scope_value')} multiline rows={3} />
            </div></Card>
          </div>
        </div>
      )}

      {activeTab === 'Sales Training' && (
        <div className="space-y-6">
          <Card><div className="space-y-4"><SectionDivider label="Service 03 — Sales Training" /><Field label="Badge" value={data.training_badge ?? ''} onChange={set('training_badge')} /><Field label="Title" value={data.training_title ?? ''} onChange={set('training_title')} /><Field label="Highlighted Title" value={data.training_highlight ?? ''} onChange={set('training_highlight')} /><Field label="Description" value={data.training_desc ?? ''} onChange={set('training_desc')} multiline rows={4} /><Field label="CTA Button" value={data.training_cta ?? ''} onChange={set('training_cta')} /></div></Card>
          <Card><div className="space-y-4"><SectionDivider label="Delivery Formats" /><Field label="Section Heading" value={data.training_format_heading ?? ''} onChange={set('training_format_heading')} /><Field label="Active Badge" value={data.training_active_label ?? ''} onChange={set('training_active_label')} />{(data.training_formats ?? []).map((item: any, index: number) => <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4"><Field label={`Format ${index + 1}`} value={item.title ?? ''} onChange={(v) => updateArrayItem('training_formats', index, 'title', v)} /><Field label="Description" value={item.desc ?? ''} onChange={(v) => updateArrayItem('training_formats', index, 'desc', v)} multiline rows={3} /></div>)}</div></Card>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card><div className="space-y-4"><SectionDivider label="Curriculum" /><Field label="Section Heading" value={data.training_curriculum_heading ?? ''} onChange={set('training_curriculum_heading')} /><Field label="Modules (one per line)" value={(data.training_curriculum ?? []).join('\n')} onChange={setLineList('training_curriculum')} multiline rows={10} /></div></Card>
            <Card><div className="space-y-4"><SectionDivider label="UNT Ecosystem Advantage" /><Field label="Heading" value={data.training_ecosystem_heading ?? ''} onChange={set('training_ecosystem_heading')} /><Field label="Description" value={data.training_ecosystem_desc ?? ''} onChange={set('training_ecosystem_desc')} multiline rows={4} /><Field label="Advantages (one per line)" value={(data.training_ecosystem_items ?? []).join('\n')} onChange={setLineList('training_ecosystem_items')} multiline rows={7} /><Field label="Director CTA" value={data.training_director_cta ?? ''} onChange={set('training_director_cta')} /></div></Card>
          </div>
        </div>
      )}

      {activeTab === 'Advanced Content' && (
        <div className="space-y-6">
          <Card><div className="space-y-4"><SectionDivider label="Interactive Package Builder" /><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><Field label="Badge" value={data.builder_badge ?? ''} onChange={set('builder_badge')} /><Field label="Title" value={data.builder_title ?? ''} onChange={set('builder_title')} /><Field label="Highlighted Title" value={data.builder_highlight ?? ''} onChange={set('builder_highlight')} /><Field label="Description" value={data.builder_desc ?? ''} onChange={set('builder_desc')} multiline rows={3} /><Field label="Core Business Label" value={data.builder_core_label ?? ''} onChange={set('builder_core_label')} /><Field label="Origin Label" value={data.builder_origin_label ?? ''} onChange={set('builder_origin_label')} /><Field label="Countries (one per line)" value={data.builder_countries_text ?? ''} onChange={set('builder_countries_text')} multiline rows={6} /><Field label="Freight Label" value={data.builder_freight_label ?? ''} onChange={set('builder_freight_label')} /><Field label="Add-ons Label" value={data.builder_addons_label ?? ''} onChange={set('builder_addons_label')} /></div>
            <SectionDivider label="Core Service Options" />{(data.builder_services ?? []).map((item: any, index: number) => <div key={item.id} className="grid grid-cols-2 gap-3"><Field label="Option" value={item.label ?? ''} onChange={(v) => updateArrayItem('builder_services', index, 'label', v)} /><Field label="Description" value={item.desc ?? ''} onChange={(v) => updateArrayItem('builder_services', index, 'desc', v)} /></div>)}
            <SectionDivider label="Freight Options" /><div className="grid grid-cols-1 md:grid-cols-3 gap-3">{(data.builder_freight_options ?? []).map((item: any, index: number) => <div key={item.id} className="space-y-2 rounded-xl border p-3 dark:border-slate-700"><Field label="Name" value={item.label ?? ''} onChange={(v) => updateArrayItem('builder_freight_options', index, 'label', v)} /><Field label="Subtitle" value={item.sub ?? ''} onChange={(v) => updateArrayItem('builder_freight_options', index, 'sub', v)} /></div>)}</div>
            <SectionDivider label="Add-on Options" />{(data.builder_addons ?? []).map((item: any, index: number) => <div key={item.id} className="grid grid-cols-2 gap-3"><Field label="Add-on" value={item.label ?? ''} onChange={(v) => updateArrayItem('builder_addons', index, 'label', v)} /><Field label="Tag" value={item.tag ?? ''} onChange={(v) => updateArrayItem('builder_addons', index, 'tag', v)} /></div>)}
          </div></Card>

          <Card><div className="space-y-4"><SectionDivider label="Comparative Sourcing Matrix" /><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><Field label="Badge" value={data.matrix_badge ?? ''} onChange={set('matrix_badge')} /><Field label="Title" value={data.matrix_title ?? ''} onChange={set('matrix_title')} /><Field label="Highlighted Title" value={data.matrix_highlight ?? ''} onChange={set('matrix_highlight')} /><Field label="UNT Tab" value={data.matrix_unt_tab ?? ''} onChange={set('matrix_unt_tab')} /><Field label="Traditional Tab" value={data.matrix_traditional_tab ?? ''} onChange={set('matrix_traditional_tab')} /></div>{(data.matrix_rows ?? []).map((row: any, index: number) => <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-xl border p-4 dark:border-slate-700"><Field label="Feature" value={row.feature ?? ''} onChange={(v) => updateArrayItem('matrix_rows', index, 'feature', v)} /><Field label="UNT" value={row.unt ?? ''} onChange={(v) => updateArrayItem('matrix_rows', index, 'unt', v)} multiline rows={3} /><Field label="Traditional" value={row.traditional ?? ''} onChange={(v) => updateArrayItem('matrix_rows', index, 'traditional', v)} multiline rows={3} /></div>)}</div></Card>

          <Card><div className="space-y-4"><SectionDivider label="Frequently Asked Questions" /><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><Field label="Badge" value={data.faq_badge ?? ''} onChange={set('faq_badge')} /><Field label="Title" value={data.faq_title ?? ''} onChange={set('faq_title')} /><Field label="Highlighted Title" value={data.faq_highlight ?? ''} onChange={set('faq_highlight')} /><Field label="Description" value={data.faq_desc ?? ''} onChange={set('faq_desc')} multiline rows={3} /><Field label="Search Placeholder" value={data.faq_search_placeholder ?? ''} onChange={set('faq_search_placeholder')} /><Field label="All FAQs Tab" value={data.faq_tab_all ?? ''} onChange={set('faq_tab_all')} /><Field label="Customs Tab" value={data.faq_tab_customs ?? ''} onChange={set('faq_tab_customs')} /><Field label="Sourcing Tab" value={data.faq_tab_sourcing ?? ''} onChange={set('faq_tab_sourcing')} /><Field label="Delivery Tab" value={data.faq_tab_delivery ?? ''} onChange={set('faq_tab_delivery')} /><Field label="Training Tab" value={data.faq_tab_training ?? ''} onChange={set('faq_tab_training')} /></div>{(data.faq_items ?? []).map((faq: any, index: number) => <div key={index} className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-3 rounded-xl border p-4 dark:border-slate-700"><Field label="Category" value={faq.category ?? ''} onChange={(v) => updateArrayItem('faq_items', index, 'category', v)} /><Field label={`Question ${index + 1}`} value={faq.q ?? ''} onChange={(v) => updateArrayItem('faq_items', index, 'q', v)} multiline rows={3} /><Field label="Answer" value={faq.a ?? ''} onChange={(v) => updateArrayItem('faq_items', index, 'a', v)} multiline rows={5} /></div>)}</div></Card>

          <Card><div className="space-y-4"><SectionDivider label="Interactive Sourcing Estimator" /><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">{[
            ['estimator_title','Title'],['estimator_desc','Description'],['estimator_badge','Badge'],['estimator_category_label','Category Label'],['estimator_origin_label','Origin Label'],['estimator_volume_label','Volume Label'],['estimator_oem_label','OEM Label'],['estimator_lead_label','Lead Time Label'],['estimator_route_label','Route Label'],['estimator_clearance_label','Clearance Label'],['estimator_note','Footer Note'],['estimator_cta','CTA Button'],
          ].map(([key,label]) => <Field key={key} label={label} value={data[key] ?? ''} onChange={set(key)} multiline={key === 'estimator_desc' || key === 'estimator_note'} rows={3} />)}</div></div></Card>
        </div>
      )}

    </EditorShell>
  );
}
