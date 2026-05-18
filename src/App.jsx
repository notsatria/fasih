import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { I18nProvider } from './i18n/useTranslation.jsx';
import Navbar from './components/layout/Navbar.jsx';
import ApiKeyModal from './components/ui/ApiKeyModal.jsx';
import Home from './pages/Home.jsx';
import SpeakingPractice from './pages/SpeakingPractice.jsx';
import InterviewPrep from './pages/InterviewPrep.jsx';
import VocabularyPractice from './pages/VocabularyPractice.jsx';
import DailyScenario from './pages/DailyScenario.jsx';

function RootLayout() {
  return (
    <I18nProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="page-enter">
          <Outlet />
        </main>
        <ApiKeyModal />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: "'Patrick Hand', cursive",
              border: '2px solid #2d2d2d',
              borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
              boxShadow: '4px 4px 0px 0px #2d2d2d',
              background: '#fdfbf7',
              color: '#2d2d2d',
            },
          }}
        />
      </div>
    </I18nProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'speaking', element: <SpeakingPractice /> },
      { path: 'interview', element: <InterviewPrep /> },
      { path: 'vocabulary', element: <VocabularyPractice /> },
      { path: 'daily', element: <DailyScenario /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
