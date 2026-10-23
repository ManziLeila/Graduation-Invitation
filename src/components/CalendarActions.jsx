import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { buildGoogleCalendarUrl, buildIcsBlob, downloadIcs } from '../utils/calendar';
import { localized } from '../utils/localized';
import './CalendarActions.css';

export default function CalendarActions() {
  const { t, lang } = useLanguage();

  function eventPayload(eventKey) {
    const event = config.events.find((e) => e.key === eventKey);
    if (!event) return null;
    const title = `${t(`events.${event.key}`)} — ${config.name}`;
    const location = localized(event.venue, lang);
    const duration = config.eventDurationMinutes?.[event.key] ?? 120;
    return {
      date: config.date,
      time: event.time,
      durationMinutes: duration,
      title,
      location,
      details: t('calendarDetails'),
    };
  }

  function handleDownloadIcs() {
    const events = config.events.map((event) => ({
      ...event,
      date: config.date,
      durationMinutes: config.eventDurationMinutes?.[event.key] ?? 120,
      title: `${t(`events.${event.key}`)} — ${config.name}`,
      description: t('calendarDetails'),
    }));
    const blob = buildIcsBlob(events, { calendarName: t('calendarName'), lang });
    downloadIcs(blob, 'graduation-invitation.ics');
  }

  return (
    <div className="calendar-actions">
      <p className="calendar-actions__label">{t('calendarLabel')}</p>
      <div className="calendar-actions__buttons">
        {config.events.map((event) => {
          const payload = eventPayload(event.key);
          if (!payload) return null;
          const googleUrl = buildGoogleCalendarUrl(payload);
          return (
            <a
              key={event.key}
              className="calendar-actions__link"
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('addEventCalendar').replace('{event}', t(`events.${event.key}`))}
            </a>
          );
        })}
        <button type="button" className="calendar-actions__link calendar-actions__link--btn" onClick={handleDownloadIcs}>
          {t('downloadIcs')}
        </button>
      </div>
    </div>
  );
}
