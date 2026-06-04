import { motion } from 'motion/react';
import chemicals from '../data/chemicals';
import { translateChemical } from '../i18n/chemicalsDE';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/context';

function safetyColor(rating: number) {
  if (rating <= 1) return 'bg-green-100 text-green-700';
  if (rating === 2) return 'bg-lime-100 text-lime-700';
  if (rating === 3) return 'bg-yellow-100 text-yellow-700';
  if (rating === 4) return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
}

export default function LabResultsPage() {
  const { lang, t } = useLanguage();

  const undisclosedCount = chemicals.filter((c) => c.typicallyUndisclosed).length;
  const highRiskCount = chemicals.filter((c) => c.safetyRating >= 4).length;
  const categoryCount = new Set(chemicals.map((c) => c.category)).size;

  const stats = [
    { value: chemicals.length, label: t.labResults.statsChemicals },
    { value: undisclosedCount, label: t.labResults.statsUndisclosed },
    { value: highRiskCount, label: t.labResults.statsHighRisk },
    { value: categoryCount, label: t.labResults.statsCategories },
  ];

  const translated = chemicals.map((c) => translateChemical(c, lang));

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
              {t.labResults.heroLine1}{' '}
              <span className="text-blue-600 italic">{t.labResults.heroAccent}</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              {t.labResults.intro}
            </p>
          </motion.div>
        </section>

        {/* Stats row */}
        <section className="py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center"
            >
              <p className="font-serif text-4xl font-medium text-blue-600 mb-2">{s.value}</p>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase leading-snug">
                {s.label}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Table */}
        <section className="pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {[
                      t.labResults.tableHeadName,
                      t.labResults.tableHeadCategory,
                      t.labResults.tableHeadSafety,
                      t.labResults.tableHeadDisclosed,
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] font-bold tracking-widest text-slate-400 uppercase px-6 py-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {translated.map((c, i) => (
                    <tr
                      key={c.id}
                      className={`border-b border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}
                    >
                      <td className="px-6 py-4 font-serif font-medium text-slate-900">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{c.category}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${safetyColor(c.safetyRating)}`}
                        >
                          {c.safetyRating}/5
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] font-bold tracking-wider ${
                            !c.typicallyUndisclosed ? 'text-green-600' : 'text-red-500'
                          }`}
                        >
                          {c.typicallyUndisclosed ? t.labResults.no : t.labResults.yes}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* Key findings */}
        <section className="pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
          >
            <h2 className="font-serif text-lg font-medium text-slate-900 mb-6">
              {t.labResults.findingsTitle}
            </h2>
            <ul className="space-y-4">
              {t.labResults.findings.map((f, i) => (
                <li key={i} className="flex gap-4 text-base text-slate-600 leading-relaxed">
                  <span className="font-bold text-blue-400 font-mono text-xs shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
