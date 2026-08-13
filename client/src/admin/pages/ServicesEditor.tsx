import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAutoSave } from '../hooks/useAutoSave';
import { EditorShell } from '../components/EditorShell';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEFAULTS, TABS, servicesEditorData, type Tab } from './services-editor/defaults';
import { HeaderTab } from './services-editor/tabs/HeaderTab';
import { ProductSalesTab } from './services-editor/tabs/ProductSalesTab';
import { SourcingTab } from './services-editor/tabs/SourcingTab';
import { SalesTrainingTab } from './services-editor/tabs/SalesTrainingTab';
import { AdvancedContentTab } from './services-editor/tabs/AdvancedContentTab';

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
      .catch(() => {})
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
    } catch (e: any) { /* auto-save will handle error display */ }
  };

  return (
    <EditorShell
      title="Services & Sourcing Page"
      description="Edit content shown on the Services & Sourcing page. Changes are saved automatically."
      saving={saving}
      saved={saved}
      error={error}
      onSave={handleSave}
      loading={loading}
      autoSaving={autoSaving}
      autoSaved={autoSaved}
      autoSaveError={autoSaveError}
      dirty={dirty}
      tabs={[...TABS]}
      activeTab={activeTab}
      onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Header' && <HeaderTab data={data} set={set} />}

      {activeTab === 'Product Sales' && (
        <ProductSalesTab
          data={data}
          set={set}
          selectedCountryIndex={selectedCountryIndex}
          setSelectedCountryIndex={setSelectedCountryIndex}
          addCountry={addCountry}
          removeCountry={removeCountry}
          updateCountry={updateCountry}
          updateCategory={updateCategory}
          updateBenefit={updateBenefit}
        />
      )}

      {activeTab === 'Sourcing' && (
        <SourcingTab
          data={data}
          set={set}
          selectedSourcingStepIndex={selectedSourcingStepIndex}
          setSelectedSourcingStepIndex={setSelectedSourcingStepIndex}
          updateSourcingStep={updateSourcingStep}
        />
      )}

      {activeTab === 'Sales Training' && (
        <SalesTrainingTab
          data={data}
          set={set}
          updateArrayItem={updateArrayItem}
          setLineList={setLineList}
        />
      )}

      {activeTab === 'Advanced Content' && (
        <AdvancedContentTab
          data={data}
          set={set}
          updateArrayItem={updateArrayItem}
        />
      )}
    </EditorShell>
  );
}
