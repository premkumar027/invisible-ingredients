import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './i18n/context';
import { ChatBot } from './components/ChatBot';
import HomePage from './pages/HomePage';
import ChemicalsPage from './pages/ChemicalsPage';
import ContributePage from './pages/ContributePage';
import MethodologyPage from './pages/MethodologyPage';
import LabResultsPage from './pages/LabResultsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chemicals" element={<ChemicalsPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/lab-results" element={<LabResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </LangProvider>
  );
}
