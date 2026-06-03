import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, ChevronLeft, RefreshCw, Info } from 'lucide-react';
import chemicalData from './data.json';
import { ChemicalCard } from './components/ChemicalCard';
import { Chemical } from './types';

export default function App() {
  const [filter, setFilter] = useState<string>('All');
  const [resetKey, setResetKey] = useState(0);

  const categories = ['All', ...new Set(chemicalData.map(c => c.category))];

  const filteredChemicals = useMemo(() => {
    if (filter === 'All') return chemicalData;
    return chemicalData.filter(c => c.category === filter);
  }, [filter]);

  const handleReset = () => {
    setFilter('All');
    setResetKey(prev => prev + 1); // Triggers a re-render/animation reset
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <Beaker size={18} />
            </div>
            <span className="font-serif text-xl font-medium tracking-tight">Invisible Ingredients</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="text-blue-600 ring-b ring-blue-600">The Chemicals</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 border border-slate-200 rounded-full px-3 py-1">
              B08 • SUMMER SEMESTER
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1] text-slate-900 mb-8">
              Chemical toxins in <br />
              <span className="text-blue-600 italic">period products</span>.
            </h1>
            <button className="group flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all underline underline-offset-4 decoration-blue-200 hover:decoration-blue-600">
              <ChevronLeft size={16} /> Back to summary
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 leading-relaxed max-w-md bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Info size={18} className="text-blue-600 mt-1 shrink-0" />
              <p className="text-sm">
                Each card represents a chemical found during our research. Tap any card to flip and reveal health risks, 
                common aliases, and safety ratings scaled 1-5.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 py-8 border-y border-slate-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                  filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-400 hover:text-slate-600'
                }`}
              >
                {cat} {cat === 'All' && <span className={filter === 'All' ? 'text-blue-200' : 'text-slate-300'}>{chemicalData.length}</span>}
              </button>
            ))}
          </div>

          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-[10px] font-black tracking-[0.1em] text-slate-400 hover:text-blue-600 transition-colors group"
          >
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> RESET FILTERS
          </button>
        </div>

        {/* Card Grid */}
        <div key={resetKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredChemicals.map((chemical, index) => (
              <motion.div
                key={chemical.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ChemicalCard chemical={chemical as Chemical} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-slate-900 text-white mt-32 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Beaker size={18} />
                </div>
                <span className="font-serif text-2xl">Invisible Ingredients</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                A student research project dedicated to raising awareness about the hidden chemical transparency in the menstrual product industry.
              </p>
            </div>
            
            <div className="flex flex-col md:items-end justify-end">
              <div className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-4">
                B08 • SUMMER SEMESTER 2026
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                <a href="#" className="hover:text-blue-400 transition-colors">Methodology</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Lab Results</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 tracking-widest">
            <span>© 2026 GENDER STUDIES 204. ALL RIGHTS RESERVED.</span>
            <span>DATA PROVIDED BY STUDENT CHEMISTS B08</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
