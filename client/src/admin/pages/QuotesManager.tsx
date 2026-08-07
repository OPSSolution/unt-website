import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Loader, Trash2, ChevronDown, Mail, Phone, Building2, User,
  Package, Tag, Globe, ShoppingCart, FileText, Inbox,
} from 'lucide-react';
import type { QuoteFormContent } from '../../components/quote-modal/quoteModalData';

const EMPTY_FORM_CONTENT: QuoteFormContent = {};

const TEXT_FIELDS: Array<[keyof QuoteFormContent, string, string]> = [
  ['title', 'Form title', 'ចំណងជើងទម្រង់'],
  ['subtitle', 'Form subtitle', 'ចំណងជើងរង'],
  ['need_label', 'Service question', 'សំណួរអំពីសេវាកម្ម'],
  ['category_label', 'Category label', 'ស្លាកប្រភេទផលិតផល'],
  ['origin_label', 'Origin label', 'ស្លាកប្រទេសដើម'],
  ['volume_label', 'Volume label', 'ស្លាកបរិមាណ'],
  ['business_label', 'Business details label', 'ស្លាកព័ត៌មានអាជីវកម្ម'],
  ['back_button', 'Back button', 'ប៊ូតុងត្រឡប់ក្រោយ'],
  ['continue_button', 'Continue button', 'ប៊ូតុងបន្ត'],
  ['submitting_button', 'Submitting text', 'អត្ថបទកំពុងផ្ញើ'],
  ['submit_button', 'Submit button', 'ប៊ូតុងផ្ញើ'],
];

const LIST_FIELDS: Array<[keyof QuoteFormContent, string, string]> = [
  ['service_labels', 'Service names (4 lines)', 'ឈ្មោះសេវាកម្ម (៤ បន្ទាត់)'],
  ['category_options', 'Product categories (6 lines)', 'ប្រភេទផលិតផល (៦ បន្ទាត់)'],
  ['origin_options', 'Countries (7 lines)', 'ប្រទេស (៧ បន្ទាត់)'],
  ['volume_options', 'Purchase volumes (4 lines)', 'បរិមាណទិញ (៤ បន្ទាត់)'],
];

interface QuoteRow {
  id: string;
  language: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
  data: {
    serviceType?: string;
    productCategory?: string;
    originPreference?: string;
    estimatedVolume?: string;
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    notes?: string;
  };
}

export function QuotesManager() {
  const { token } = useAdminAuth();
  const { language } = useLanguage();
  const isKm = language === 'km';
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [formContent, setFormContent] = useState<QuoteFormContent>(EMPTY_FORM_CONTENT);
  const [contentOpen, setContentOpen] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);

  const t = (en: string, km: string) => (isKm ? km : en);

  const load = () => {
    if (!token) return;
    setLoading(true);
    setError('');
    api.getQuotes(token)
      .then(setQuotes)
      .catch((e: any) => setError(e.message || 'Failed to load quote requests.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [token]);

  useEffect(() => {
    api.getHomepageSection('quote_form')
      .then((result) => setFormContent(result.data ?? EMPTY_FORM_CONTENT))
      .catch(() => setFormContent(EMPTY_FORM_CONTENT));
  }, [language]);

  const saveFormContent = async () => {
    if (!token) return;
    setContentSaving(true);
    setContentSaved(false);
    setError('');
    try {
      await api.updateHomepageSection('quote_form', formContent, token);
      setContentSaved(true);
      window.setTimeout(() => setContentSaved(false), 2000);
    } catch (e: any) {
      setError(e.message || 'Failed to save quote form text.');
    } finally {
      setContentSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeletingId(id);
    try {
      await api.deleteQuote(id, token);
      setQuotes((current) => current.filter((q) => q.id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (e: any) {
      setError(e.message || 'Failed to delete quote request.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, status: QuoteRow['status']) => {
    if (!token) return;
    setUpdatingId(id);
    setError('');
    try {
      const updated = await api.updateQuoteStatus(id, status, token) as QuoteRow;
      setQuotes((current) => current.map((quote) => quote.id === id ? updated : quote));
    } catch (e: any) {
      setError(e.message || 'Failed to update quote status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const field = (labelEn: string, labelKm: string, icon: React.ReactNode, value?: string, href?: string) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-2.5 text-sm">
        <span className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0">{icon}</span>
        <div className="min-w-0">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t(labelEn, labelKm)}</div>
          <div className="flex-1">{href
            ? <a href={href} target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline break-all">{value}</a>
            : <span className="text-slate-800 dark:text-slate-100 break-words">{value}</span>}</div>
        </div>
      </div>
    );
  };

  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleString(isKm ? 'km-KH' : 'en-US', { timeZone: 'Asia/Phnom_Penh', dateStyle: 'medium', timeStyle: 'short' }) : '—';

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t('Quote Requests', 'សំណើសុំតម្លៃ')}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            {t('Client B2B quote form submissions.', 'សំណើសុំតម្លៃ B2B ពីអតិថិជន។')}
          </p>
        </div>
        <button onClick={load} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shrink-0">
          {t('Refresh', 'ធ្វើឱ្យស្រស់')}
        </button>
      </div>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <button type="button" onClick={() => setContentOpen((open) => !open)} className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">{t('Edit Quote Form Text', 'កែសម្រួលអត្ថបទទម្រង់ស្នើសុំតម្លៃ')}</h2>
            <p className="text-xs text-slate-500 mt-1">{t('Use the language switcher above to edit English or Khmer.', 'ប្រើប៊ូតុងប្តូរភាសាខាងលើ ដើម្បីកែភាសាអង់គ្លេស ឬខ្មែរ។')}</p>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${contentOpen ? 'rotate-180' : ''}`} />
        </button>
        {contentOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEXT_FIELDS.map(([key, en, km]) => (
                <label key={key} className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{t(en, km)}</span>
                  <input value={(formContent[key] as string) ?? ''} onChange={(event) => setFormContent((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white" />
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LIST_FIELDS.map(([key, en, km]) => (
                <label key={key} className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{t(en, km)}</span>
                  <textarea rows={5} value={((formContent[key] as string[] | undefined) ?? []).join('\n')} onChange={(event) => setFormContent((current) => ({ ...current, [key]: event.target.value.split('\n').map((line) => line.trim()).filter(Boolean) }))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white resize-y" />
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={saveFormContent} disabled={contentSaving} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold disabled:opacity-50">
                {contentSaving ? t('Saving...', 'កំពុងរក្សាទុក...') : contentSaved ? t('Saved', 'បានរក្សាទុក') : t('Save Form Text', 'រក្សាទុកអត្ថបទទម្រង់')}
              </button>
            </div>
          </div>
        )}
      </section>

      {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-16"><Loader className="w-6 h-6 text-emerald-500 animate-spin" /></div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500 text-sm flex flex-col items-center gap-3">
          <Inbox className="w-10 h-10 opacity-60" />
          {t('No quote requests yet.', 'មិនទាន់មានសំណើសុំតម្លៃនៅឡើយទេ។')}
        </div>
      ) : (
        <div className="space-y-3">
          {quotes.map((quote) => {
            const d = quote.data ?? {};
            const isOpen = expandedId === quote.id;
            return (
              <div key={quote.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedId(isOpen ? null : quote.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-900 dark:text-white font-semibold text-sm truncate">
                        {d.contactName || t('Unknown contact', 'អ្នកទំនាក់ទំនងមិនស្គាល់')}
                      </span>
                      {quote.language === 'km' && (
                        <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 text-[10px] font-bold border border-sky-200 dark:border-sky-500/30">
                          ខ្មែរ
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 truncate">
                      {d.serviceType || '—'} · {d.companyName || '—'}
                    </div>
                  </div>
                  <div className="hidden sm:block text-[10px] text-slate-400 dark:text-slate-500 font-medium shrink-0">{formatDate(quote.created_at)}</div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-4">
                      {field('Service', 'សេវាកម្ម', <Package className="w-4 h-4" />, d.serviceType)}
                      {field('Product Category', 'ប្រភេទផលិតផល', <Tag className="w-4 h-4" />, d.productCategory)}
                      {field('Preferred Origin', 'ប្រទេសដើម', <Globe className="w-4 h-4" />, d.originPreference)}
                      {field('Target Volume', 'បរិមាណ', <ShoppingCart className="w-4 h-4" />, d.estimatedVolume)}
                      {field('Company', 'ក្រុមហ៊ុន', <Building2 className="w-4 h-4" />, d.companyName)}
                      {field('Email', 'អ៊ីមែល', <Mail className="w-4 h-4" />, d.email, d.email ? `mailto:${d.email}` : undefined)}
                      {field('Phone / Telegram', 'ទូរស័ព្ទ / តេឡេក្រាម', <Phone className="w-4 h-4" />, d.phone)}
                      {field('Submitted In', 'ភាសាដែលបានផ្ញើ', <FileText className="w-4 h-4" />, quote.language === 'km' ? t('Khmer', 'ភាសាខ្មែរ') : t('English', 'ភាសាអង់គ្លេស'))}
                    </div>
                    {d.notes ? (
                      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4">
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                          {t('Specific Requirements', 'តម្រូវការពិសេស')}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap break-words">{d.notes}</p>
                      </div>
                    ) : null}
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{formatDate(quote.created_at)} ({t('Phnom Penh time', 'ម៉ោងភ្នំពេញ')})</span>
                      <div className="flex items-center gap-2">
                        <select
                          aria-label={t('Quote status', 'ស្ថានភាពសំណើ')}
                          value={quote.status}
                          disabled={updatingId === quote.id}
                          onChange={(event) => handleStatusChange(quote.id, event.target.value as QuoteRow['status'])}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold disabled:opacity-50"
                        >
                          <option value="new">{t('New', 'ថ្មី')}</option>
                          <option value="in_progress">{t('In progress', 'កំពុងដំណើរការ')}</option>
                          <option value="completed">{t('Completed', 'បានបញ្ចប់')}</option>
                        </select>
                        <button
                        onClick={() => handleDelete(quote.id)}
                        disabled={deletingId === quote.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        {deletingId === quote.id ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        {t('Delete', 'លុប')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
