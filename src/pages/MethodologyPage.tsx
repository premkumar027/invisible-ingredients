import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Tag, Eye, FileText, AlertTriangle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/context';

function Section({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h2 className="font-serif text-lg font-medium text-slate-900">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function MethodologyPage() {
  const { t } = useLanguage();

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
              {t.methodology.heroLine1}{' '}
              <span className="text-blue-600 italic">{t.methodology.heroAccent}</span>
              <br />
              {t.methodology.heroLine2}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              {t.methodology.intro}
            </p>
          </motion.div>
        </section>

        {/* Sections */}
        <section className="py-16 flex flex-col gap-6">
          <Section icon={<BookOpen size={16} className="text-blue-600" />} title={t.methodology.approachTitle} delay={0.05}>
            <p className="text-base text-slate-600 leading-relaxed">{t.methodology.approachBody}</p>
          </Section>

          <Section icon={<Tag size={16} className="text-blue-600" />} title={t.methodology.classificationTitle} delay={0.1}>
            <p className="text-base text-slate-600 leading-relaxed">{t.methodology.classificationBody}</p>
          </Section>

          <Section icon={<Eye size={16} className="text-blue-600" />} title={t.methodology.disclosureTitle} delay={0.15}>
            <p className="text-base text-slate-600 leading-relaxed">{t.methodology.disclosureBody}</p>
          </Section>

          <Section icon={<FileText size={16} className="text-blue-600" />} title={t.methodology.sourcesTitle} delay={0.2}>
            <ul className="space-y-3">
              {t.methodology.sources.map((src, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="text-blue-400 font-bold shrink-0 font-mono text-xs mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {src}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={<AlertTriangle size={16} className="text-orange-500" />} title={t.methodology.limitationsTitle} delay={0.25}>
            <p className="text-base text-slate-600 leading-relaxed">{t.methodology.limitationsBody}</p>
          </Section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
