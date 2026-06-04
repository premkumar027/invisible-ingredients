import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/context';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-8 py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-serif text-[8rem] md:text-[12rem] leading-none font-medium text-slate-100 select-none">
            404
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-slate-900 mb-4 -mt-4">
            {t.notFound.heading}
          </h1>
          <p className="text-slate-400 text-base mb-10">{t.notFound.body}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-[11px] tracking-[0.15em] uppercase px-8 py-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            {t.notFound.button}
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
