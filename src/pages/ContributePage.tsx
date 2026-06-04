import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/context';

interface FormData {
  productName: string;
  productType: string;
  ingredient: string;
  source: string;
  name: string;
  email: string;
  note: string;
}

const EMPTY: FormData = {
  productName: '',
  productType: '',
  ingredient: '',
  source: '',
  name: '',
  email: '',
  note: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 transition-colors placeholder:text-slate-400 disabled:opacity-50';
const labelClass = 'block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2';

export default function ContributePage() {
  const { t } = useLanguage();
  const endpoint = import.meta.env.VITE_FEEDBACK_ENDPOINT as string | undefined;

  const [form, setForm] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!endpoint) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-8">
        {/* Hero */}
        <section className="pt-20 pb-16 border-b border-slate-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.08] text-slate-900 mb-6">
              {t.contribute.heroLine1}{' '}
              <span className="text-blue-600 italic">{t.contribute.heroAccent}</span>
              <br />
              {t.contribute.heroLine2}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              {t.contribute.introParagraph}
            </p>
          </motion.div>
        </section>

        {/* Form section */}
        <section className="py-16 pb-24">
          <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle size={24} className="text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h2 className="font-serif text-2xl font-medium text-slate-900 mb-3">
                        {t.contribute.successTitle}
                      </h2>
                      <p className="text-slate-500 text-base leading-relaxed">
                        {t.contribute.successBody}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10 space-y-8"
                  noValidate
                >
                  {/* Row 1: product name + type */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="productName" className={labelClass}>
                        {t.contribute.productNameLabel}
                      </label>
                      <input
                        id="productName"
                        name="productName"
                        type="text"
                        value={form.productName}
                        onChange={handleChange}
                        placeholder={t.contribute.productNamePlaceholder}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="productType" className={labelClass}>
                        {t.contribute.productTypeLabel}
                      </label>
                      <select
                        id="productType"
                        name="productType"
                        value={form.productType}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      >
                        <option value="">{t.contribute.productTypePlaceholder}</option>
                        <option value="tampon">{t.contribute.productTypeTampon}</option>
                        <option value="pad">{t.contribute.productTypePad}</option>
                        <option value="cup">{t.contribute.productTypeCup}</option>
                        <option value="liner">{t.contribute.productTypeLiner}</option>
                        <option value="other">{t.contribute.productTypeOther}</option>
                      </select>
                    </div>
                  </div>

                  {/* Ingredient — required */}
                  <div>
                    <label htmlFor="ingredient" className={labelClass}>
                      {t.contribute.ingredientLabel}{' '}
                      <span className="text-blue-600 normal-case tracking-normal font-normal">*</span>
                    </label>
                    <textarea
                      id="ingredient"
                      name="ingredient"
                      value={form.ingredient}
                      onChange={handleChange}
                      placeholder={t.contribute.ingredientPlaceholder}
                      required
                      aria-required="true"
                      disabled={isSubmitting}
                      rows={4}
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  {/* Source */}
                  <div>
                    <label htmlFor="source" className={labelClass}>
                      {t.contribute.sourceLabel}
                    </label>
                    <select
                      id="source"
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                    >
                      <option value="">{t.contribute.sourcePlaceholder}</option>
                      <option value="packaging">{t.contribute.sourcePackaging}</option>
                      <option value="brand-website">{t.contribute.sourceBrandWebsite}</option>
                      <option value="scientific">{t.contribute.sourceScientific}</option>
                      <option value="other">{t.contribute.sourceOther}</option>
                    </select>
                  </div>

                  {/* Row: name + email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        {t.contribute.nameLabel}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t.contribute.namePlaceholder}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        {t.contribute.emailLabel}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t.contribute.emailPlaceholder}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label htmlFor="note" className={labelClass}>
                      {t.contribute.noteLabel}
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      placeholder={t.contribute.notePlaceholder}
                      disabled={isSubmitting}
                      rows={3}
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  {/* Footer row */}
                  <div className="flex justify-end pt-2">
                    <div className="flex flex-col items-end gap-2">
                      {status === 'error' && (
                        <p className="text-xs text-red-500">{t.contribute.errorMessage}</p>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting || !form.ingredient.trim()}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-[11px] tracking-[0.15em] uppercase px-8 py-3.5 rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting && (
                          <Loader2 size={13} className="animate-spin" />
                        )}
                        {isSubmitting
                          ? t.contribute.submittingButton
                          : t.contribute.submitButton}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
        </section>
      </main>

      <Footer />
    </div>
  );
}
