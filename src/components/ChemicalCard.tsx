import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, AlertCircle } from 'lucide-react';
import { Chemical } from '../types';

interface Props {
  chemical: Chemical;
}

export function ChemicalCard({ chemical }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const severityDots = Array.from({ length: 5 }, (_, i) => (
    <div
      key={i}
      className={`h-2 w-2 rounded-full ${
        i < chemical.safetyRating ? 'bg-amber-600' : 'bg-slate-200'
      }`}
    />
  ));

  return (
    <div 
      className="group perspective-1000 h-[420px] w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full transition-all duration-500 preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {chemical.category}
              </span>
              <div className="flex gap-1">
                {severityDots}
              </div>
            </div>
            
            <h2 className="text-3xl font-serif font-medium text-slate-900 mb-2">
              {chemical.name}
            </h2>
            {chemical.formula && (
              <p className="text-xs font-mono text-slate-500 mb-6">{chemical.formula}</p>
            )}
            
            <p className="text-slate-600 leading-relaxed">
              {chemical.shortDescription}
            </p>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-100">
            <span className="text-xs text-slate-400 italic truncate max-w-[150px]">
              {chemical.products}
            </span>
            <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1">
              FLIP <Info size={12} />
            </span>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden rounded-xl bg-slate-900 p-8 shadow-xl text-white rotate-y-180 overflow-y-auto custom-scrollbar"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-serif font-medium">{chemical.name}</h3>
            <X size={18} className="text-slate-400 hover:text-white transition-colors" />
          </div>

          <div className="space-y-6">
            <section>
              <h4 className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2">WHAT IT IS</h4>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {chemical.longDescription}
              </p>
            </section>

            <section>
              <h4 className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2">FOUND IN</h4>
              <ul className="flex flex-wrap gap-2">
                {chemical.foundIn.map((item, idx) => (
                  <li key={idx} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-2 flex items-center gap-1">
                HEALTH EFFECTS <AlertCircle size={10} />
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {chemical.healthEffects}
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
