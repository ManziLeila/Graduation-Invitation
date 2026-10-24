import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhenWhere from './components/WhenWhere';
import Agenda from './components/Agenda';
import Rsvp from './components/Rsvp';
import Closing from './components/Closing';
import Footer from './components/Footer';
import PhotoGate from './components/PhotoGate';
import PhotoGallery from './components/PhotoGallery';
import GoodToKnow from './components/GoodToKnow';
import ShareInvite from './components/ShareInvite';
import { useLanguage } from './i18n/LanguageContext';
import { useHashRoute } from './hooks/useHashRoute';

export default function App() {
  const { t } = useLanguage();
  const route = useHashRoute();

  if (route.view === 'home') {
    return <PhotoGate />;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('skipLink')}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <PhotoGallery />
        <WhenWhere />
        <Agenda />
        <GoodToKnow />
        <Rsvp />
        <Closing />
        <ShareInvite />
      </main>
      <Footer />
    </>
  );
}
