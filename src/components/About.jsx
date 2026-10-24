import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { localized } from '../utils/localized';
import { useReveal } from '../hooks/useReveal';
import './About.css';

export default function About() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();
  const bio = localized(config.about, lang);
  const highlights = config.highlights ?? [];

  if (!bio && highlights.length === 0) return null;

  return (
    <section id="about" className="section section--alt about" aria-labelledby="about-heading">
      <div ref={reveal.ref} className={`section__inner about__inner ${reveal.className}`}>
        <span className="label">{t('aboutLabel')}</span>
        <h2 id="about-heading" className="section-heading">
          {t('aboutHeading')}
        </h2>
        {bio ? <p className="about__bio">{bio}</p> : null}
        {highlights.length > 0 ? (
          <ul className="about__highlights">
            {highlights.map((item) => (
              <li key={localized(item, lang)}>{localized(item, lang)}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
