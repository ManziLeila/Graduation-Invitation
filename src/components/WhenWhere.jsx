import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { localized } from '../utils/localized';
import './WhenWhere.css';

function formatDateHeading(dateStr, t) {
  const d = new Date(`${dateStr}T12:00:00`);
  const weekday = t('weekdays')[d.getDay()];
  const month = t('months')[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${weekday}, ${day} ${month} ${year}`;
}

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

export default function WhenWhere() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();
  const dateHeading = formatDateHeading(config.date, t);

  return (
    <section
      id="when-where"
      className="section when-where"
      aria-labelledby="when-where-heading"
    >
      <div ref={reveal.ref} className={`section__inner ${reveal.className}`}>
        <span className="label">{t('whenWhereLabel')}</span>
        <h2 id="when-where-heading" className="section-heading when-where__date">
          {dateHeading}
        </h2>
        <ul className="when-where__timeline">
          {config.events.map((event) => {
            const title = t(`events.${event.key}`);
            return (
              <li key={event.key} className="when-where__row">
                <time className="when-where__time" dateTime={event.time}>
                  {formatTime(event.time, lang, t)}
                </time>
                <div className="when-where__details">
                  <h3 className="when-where__event-title">{title}</h3>
                  <p className="when-where__venue">{localized(event.venue, lang)}</p>
                  <a
                    href={event.mapUrl}
                    className="when-where__directions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('directions')}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
