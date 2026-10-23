import { useEffect, useMemo, useState } from 'react';
import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import './Countdown.css';

function getTargetDate() {
  const event =
    config.events.find((e) => e.key === 'ceremony') ?? config.events[0];
  return new Date(`${config.date}T${event.time}:00`);
}

function getRemaining(target) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { done: false, days, hours, minutes, seconds };
}

export default function Countdown() {
  const { t } = useLanguage();
  const target = useMemo(() => getTargetDate(), []);
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const intervalMs = reduced ? 60000 : 1000;

    const tick = () => setRemaining(getRemaining(target));
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { value: remaining.days, label: t('countdownDays') },
    { value: remaining.hours, label: t('countdownHours') },
    { value: remaining.minutes, label: t('countdownMinutes') },
    { value: remaining.seconds, label: t('countdownSeconds') },
  ];

  const ariaSummary = remaining.done
    ? t('countdownComplete')
    : `${remaining.days} ${t('countdownDays')}, ${remaining.hours} ${t('countdownHours')}, ${remaining.minutes} ${t('countdownMinutes')}, ${remaining.seconds} ${t('countdownSeconds')}`;

  return (
    <div className="countdown" role="timer" aria-live="polite" aria-label={ariaSummary}>
      <p className="countdown__label">{t('countdownLabel')}</p>
      {remaining.done ? (
        <p className="countdown__complete">{t('countdownComplete')}</p>
      ) : (
        <ol className="countdown__grid">
          {units.map(({ value, label }) => (
            <li key={label} className="countdown__unit">
              <span className="countdown__value">{String(value).padStart(2, '0')}</span>
              <span className="countdown__unit-label">{label}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
