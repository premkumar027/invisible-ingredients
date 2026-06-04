import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white mt-32 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="Invisible Ingredients logo" className="w-8 h-8 object-contain invert" />
              <span className="font-serif text-2xl">Invisible Ingredients</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div className="flex flex-col md:items-end justify-end">
            <div className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-4">
              {t.footer.semester}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              <Link to="/" className="hover:text-blue-400 transition-colors">
                {t.nav.projectIntro}
              </Link>
              <Link to="/chemicals" className="hover:text-blue-400 transition-colors">
                {t.nav.theChemicals}
              </Link>
              <Link to="/methodology" className="hover:text-blue-400 transition-colors">
                {t.footer.methodology}
              </Link>
              <Link to="/lab-results" className="hover:text-blue-400 transition-colors">
                {t.footer.labResults}
              </Link>
              <Link to="/contribute" className="hover:text-blue-400 transition-colors">
                {t.footer.contribute}
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800 flex flex-wrap justify-between items-center gap-4 text-[10px] text-slate-500 tracking-widest">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.dataCredit}</span>
        </div>
      </div>
    </footer>
  );
}
