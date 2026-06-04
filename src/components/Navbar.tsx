import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/context';

export function Navbar() {
  const { pathname } = useLocation();
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.projectIntro },
    { to: '/chemicals', label: t.nav.theChemicals },
    { to: '/methodology', label: t.nav.methodology },
    { to: '/lab-results', label: t.nav.labResults },
    { to: '/contribute', label: t.nav.contribute },
  ];

  const linkClass = (path: string) =>
    `transition-colors font-bold ${
      pathname === path
        ? 'text-blue-600 underline underline-offset-4 decoration-blue-300'
        : 'hover:text-slate-800 text-slate-500'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="Invisible Ingredients logo" className="w-8 h-8 object-contain" />
          <span className="font-serif text-xl font-medium tracking-tight">
            Invisible Ingredients
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(l.to)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* EN | DE */}
          <div className="flex items-center text-[11px] font-bold tracking-widest">
            <button
              onClick={() => setLang('en')}
              aria-label="Switch to English"
              className={`transition-colors ${lang === 'en' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              EN
            </button>
            <span className="text-slate-300 mx-1.5 select-none">|</span>
            <button
              onClick={() => setLang('de')}
              aria-label="Auf Deutsch wechseln"
              className={`transition-colors ${lang === 'de' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              DE
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-slate-500 hover:text-slate-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-slate-100 mt-4 pt-4 pb-2 flex flex-col gap-1"
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-2.5 text-sm rounded-lg ${
                  pathname === l.to
                    ? 'text-blue-600 font-bold bg-blue-50'
                    : 'text-slate-600 font-medium hover:bg-slate-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
