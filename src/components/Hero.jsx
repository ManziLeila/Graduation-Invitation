import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import Countdown from './Countdown';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();
  const reveal = useReveal();

  return (
    <section className="hero" aria-labelledby="hero-name">
      <div ref={reveal.ref} className={`hero__inner ${reveal.className}`}>
        <p className="hero__tagline">{t('heroTagline')}</p>
        <h1 id="hero-name" className="hero__name">
          {config.name}
        </h1>
        <p className="hero__invitation">{t('heroInvitation')}</p>
        <Countdown />
      </div>
    </section>
  );
}
