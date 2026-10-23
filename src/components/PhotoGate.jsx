import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import PhotoCarousel from './PhotoCarousel';
import './PhotoGate.css';

function formatHomeDateLine(dateStr, city, t) {
  const d = new Date(`${dateStr}T12:00:00`);
  const day = d.getDate();
  const month = t('months')[d.getMonth()];
  const year = d.getFullYear();
  return `${day} · ${month} · ${year} · ${city}`;
}

export default function PhotoGate() {
  const { t } = useLanguage();
  const dateLine = formatHomeDateLine(config.date, config.city, t);

  return (
    <div className="photo-gate">
      <header className="photo-gate__header">
        <a href="#home" className="photo-gate__monogram" aria-label={config.name}>
          {config.initials}
        </a>
        <div className="photo-gate__lang">
          <LanguageSwitcher />
        </div>
      </header>

      <div className="photo-gate__body">
        <h1 className="photo-gate__title">{config.name}</h1>
        <p className="photo-gate__date">{dateLine}</p>
        <PhotoCarousel photos={config.photos} />
        <a href="#details" className="photo-gate__enter">
          {t('enter')}
        </a>
      </div>
    </div>
  );
}
