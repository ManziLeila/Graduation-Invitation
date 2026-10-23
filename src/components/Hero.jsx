import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { localized } from '../utils/localized';
import { useReveal } from '../hooks/useReveal';
import Countdown from './Countdown';
import './Hero.css';

export default function Hero() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();

  return (
    <section className="hero" aria-labelledby="hero-name">
      <div ref={reveal.ref} className={`hero__inner ${reveal.className}`}>
        <p className="hero__tagline">{t('heroTagline')}</p>
        <h1 id="hero-name" className="hero__name">
          {config.name}
        </h1>
        <p className="hero__degree">{localized(config.degree, lang)}</p>
        <p className="hero__invitation">{t('heroInvitation')}</p>
        <blockquote className="hero__quote">
          <p>{t('heroQuote')}</p>
        </blockquote>
        <Countdown />
      </div>
    </section>
  );
}
