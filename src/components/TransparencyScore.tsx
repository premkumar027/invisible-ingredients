import { motion } from 'motion/react';
import chemicals from '../data/chemicals';
import { useLanguage } from '../i18n/context';

const undisclosed = chemicals.filter((c) => c.typicallyUndisclosed).length;
const total = chemicals.length;
const pct = undisclosed / total;

export function TransparencyScore() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-10"
    >
      <p className="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-5">
        {t.transparency.sectionLabel}
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-slate-900 mb-4 leading-snug">
        {t.transparency.headingStart}{' '}
        <span className="text-blue-600 italic">{t.transparency.headingAccent}</span>
        {t.transparency.headingEnd && <> {t.transparency.headingEnd}</>}
      </h2>
      <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-xl">
        {t.transparency.body}
      </p>

      <div className="space-y-3">
        <div className="flex justify-between text-[11px] font-bold tracking-widest text-slate-400 uppercase">
          <span>{t.transparency.barLabel}</span>
          <span>{undisclosed}/{total}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: pct }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.3, ease: 'easeOut' }}
          />
        </div>
        <div className="flex gap-6 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-[10px] text-slate-400 tracking-wider">
              {t.transparency.legendUndisclosed} ({undisclosed})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-200" />
            <span className="text-[10px] text-slate-400 tracking-wider">
              {t.transparency.legendDisclosed} ({total - undisclosed})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
