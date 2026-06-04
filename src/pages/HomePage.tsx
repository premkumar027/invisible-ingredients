import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Target, BookOpen, Lightbulb, ShieldCheck, ArrowRight, Leaf, Shield, Droplets, Shirt } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TransparencyScore } from '../components/TransparencyScore';
import { useLanguage } from '../i18n/context';

const ALT_ICONS = [Leaf, Droplets, Shirt, Shield];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-8">
        {/* Hero */}
        <section className="pt-20 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1 className="text-6xl md:text-7xl font-serif font-medium leading-[1.06] text-slate-900 mb-8">
              {t.home.heroLine1}
              <br />
              <span className="text-blue-600 italic">{t.home.heroAccent}</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-2xl">
              {t.home.heroSubtitle}
            </p>
          </motion.div>
        </section>

        {/* Cards */}
        <section className="flex flex-col gap-8 pb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users size={20} className="text-blue-600 shrink-0" />
              <h2 className="text-lg font-medium text-slate-900">{t.home.aboutTitle}</h2>
            </div>
            <p className="text-slate-600 text-base leading-relaxed">{t.home.aboutBody}</p>
          </motion.div>

          {/* Our Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10"
          >
            <div className="flex items-center gap-3 mb-7">
              <Target size={20} className="text-blue-600 shrink-0" />
              <h2 className="text-lg font-medium text-slate-900">{t.home.goalTitle}</h2>
            </div>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen size={11} className="text-blue-600" />
                </div>
                <p className="text-base text-slate-600">
                  <span className="font-semibold text-slate-800">{t.home.educateLabel} </span>
                  {t.home.educateBody}
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb size={11} className="text-blue-600" />
                </div>
                <p className="text-base text-slate-600">
                  <span className="font-semibold text-slate-800">{t.home.advocateLabel} </span>
                  {t.home.advocateBody}
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={11} className="text-blue-600" />
                </div>
                <p className="text-base text-slate-600">
                  <span className="font-semibold text-slate-800">{t.home.alternativesLabel} </span>
                  {t.home.alternativesBody}
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Transparency Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <TransparencyScore />
          </motion.div>

          {/* Safer Alternatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10"
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
              {t.alternatives.sectionLabel}
            </p>
            <h2 className="font-serif text-2xl font-medium text-slate-900 mb-2">
              {t.alternatives.heading}
            </h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-xl">
              {t.alternatives.subheading}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.alternatives.items.map((item, i) => {
                const Icon = ALT_ICONS[i];
                return (
                  <div
                    key={i}
                    className="bg-slate-50 rounded-xl border border-slate-100 p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-blue-600" />
                        </div>
                        <h3 className="font-serif text-base font-medium text-slate-900">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-[9px] font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5 uppercase whitespace-nowrap shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex justify-center py-8"
          >
            <Link
              to="/chemicals"
              className="inline-flex items-center gap-3 bg-blue-600 text-white font-bold text-[11px] tracking-[0.15em] uppercase px-8 py-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 group"
            >
              {t.home.ctaButton}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
