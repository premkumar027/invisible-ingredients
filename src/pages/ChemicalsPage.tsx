import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Info, Search, X } from 'lucide-react';
import chemicals from '../data/chemicals';
import { translateChemical } from '../i18n/chemicalsDE';
import { ChemicalCard } from '../components/ChemicalCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/context';

// English keys used for filter state — never translated
const enCategories = ['All', ...Array.from(new Set(chemicals.map((c) => c.category)))];

export default function ChemicalsPage() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [resetKey, setResetKey] = useState(0);

  const categoryLabel = (cat: string) =>
    cat === 'All' ? t.chemicals.categoryAll : (t.chemicals.categories[cat] ?? cat);

  const filtered = useMemo(() => {
    let list = filter === 'All' ? chemicals : chemicals.filter((c) => c.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => {
        const tc = translateChemical(c, lang);
        return (
          c.name.toLowerCase().includes(q) ||
          tc.shortDescription.toLowerCase().includes(q)
        );
      });
    }
    return list.map((c) => translateChemical(c, lang));
  }, [filter, search, lang]);

  const handleReset = () => {
    setFilter('All');
    setSearch('');
    setResetKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.06] text-slate-900 mb-8">
              {t.chemicals.pageTitle} <br />
              <span className="text-blue-600 italic">{t.chemicals.pageTitleAccent}</span>.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-slate-500 leading-relaxed max-w-md bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Info size={18} className="text-blue-600 mt-1 shrink-0" />
              <p className="text-base">{t.chemicals.instructionText}</p>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mb-12 py-8 border-y border-slate-200 space-y-5">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.chemicals.searchPlaceholder}
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-full outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 transition-colors placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category chips + reset */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {enCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                    filter === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-400 hover:text-slate-600'
                  }`}
                >
                  {categoryLabel(cat)}{' '}
                  {cat === 'All' && (
                    <span className={filter === 'All' ? 'text-blue-200' : 'text-slate-300'}>
                      {chemicals.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-[10px] font-black tracking-[0.1em] text-slate-400 hover:text-blue-600 transition-colors group"
            >
              <RefreshCw
                size={14}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
              {t.chemicals.resetFilters}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div key={resetKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((chemical) => (
              <motion.div
                key={chemical.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ChemicalCard chemical={chemical} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-24 text-center"
            >
              <p className="font-serif text-2xl text-slate-400 mb-3">
                {t.chemicals.emptyTitle}
              </p>
              <p className="text-sm text-slate-400 italic">{t.chemicals.emptySubtitle}</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
