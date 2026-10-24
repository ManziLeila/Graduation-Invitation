import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { localized } from '../utils/localized';
import { useReveal } from '../hooks/useReveal';
import './Closing.css';

export default function Closing() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();
  const message = localized(config.thankYou, lang);
  const playlistUrl = config.playlist?.url?.trim();

  if (!message && !playlistUrl) return null;

  return (
    <section id="closing" className="section closing" aria-labelledby="closing-heading">
      <div ref={reveal.ref} className={`section__inner closing__inner ${reveal.className}`}>
        <span className="label">{t('closingLabel')}</span>
        <h2 id="closing-heading" className="section-heading">
          {t('closingHeading')}
        </h2>
        {message ? <p className="closing__message">{message}</p> : null}
        <div className="closing__actions">
          {playlistUrl ? (
            <a
              className="closing__playlist"
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('closingPlaylist')}
            </a>
          ) : null}
          <p className="closing__call">
            {t('closingCallLabel')}{' '}
            <a href={`tel:+${config.whatsappNumber}`}>{config.phoneDisplay}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
