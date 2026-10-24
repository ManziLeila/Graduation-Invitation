import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { localized } from '../utils/localized';
import './Agenda.css';

function formatTime(time24, lang, t) {
  const [h, m] = time24.split(':').map(Number);
  const mm = String(m).padStart(2, '0');
  if (lang === 'en') {
    const period = h >= 12 ? t('timePm') : t('timeAm');
    const hour12 = h % 12 || 12;
    return `${hour12}:${mm} ${period}`;
  }
  return `${String(h).padStart(2, '0')}:${mm}`;
}

export default function Agenda() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();
  const steps = config.program ?? [];

  if (steps.length === 0) return null;

  return (
    <section id="agenda" className="section section--alt agenda" aria-labelledby="agenda-heading">
      <div ref={reveal.ref} className={`section__inner agenda__inner ${reveal.className}`}>
        <span className="label">{t('agendaLabel')}</span>
        <h2 id="agenda-heading" className="section-heading">
          {t('programHeading')}
        </h2>
        {config.programIntro ? (
          <p className="agenda__intro">{localized(config.programIntro, lang)}</p>
        ) : null}

        <div className="agenda__card">
          <div className="agenda__head" role="row">
            <span className="agenda__th" role="columnheader">
              {t('programTimeLabel')}
            </span>
            <span className="agenda__th" role="columnheader">
              {t('programDetailsLabel')}
            </span>
          </div>
          <ul className="agenda__list">
            {steps.map((step) => (
              <li key={`${step.time}-${localized(step.title, lang)}`} className="agenda__row">
                <time className="agenda__time" dateTime={step.time}>
                  {formatTime(step.time, lang, t)}
                </time>
                <div className="agenda__details">
                  <p className="agenda__title">{localized(step.title, lang)}</p>
                  {step.note ? (
                    <p className="agenda__note">{localized(step.note, lang)}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
