import { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './PhotoCarousel.css';

const VISIBLE = 4;

function visiblePhotos(photos, start) {
  if (photos.length === 0) return [];
  const items = [];
  for (let i = 0; i < Math.min(VISIBLE, photos.length); i += 1) {
    items.push(photos[(start + i) % photos.length]);
  }
  return items;
}

export default function PhotoCarousel({ photos }) {
  const { t } = useLanguage();
  const [start, setStart] = useState(0);
  const slides = useMemo(() => visiblePhotos(photos, start), [photos, start]);

  if (photos.length === 0) {
    return (
      <div className="photo-carousel photo-carousel--empty" aria-hidden="true">
        <p className="photo-carousel__placeholder">{t('photosPlaceholder')}</p>
      </div>
    );
  }

  function goPrev() {
    setStart((s) => (s - 1 + photos.length) % photos.length);
  }

  function goNext() {
    setStart((s) => (s + 1) % photos.length);
  }

  return (
    <div className="photo-carousel">
      <ul className="photo-carousel__strip">
        {slides.map((photo, index) => (
          <li
            key={`${photo.src}-${start}-${index}`}
            className={`photo-carousel__item photo-carousel__item--${index % 4}`}
          >
            <img src={photo.src} alt={photo.alt || ''} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
      {photos.length > 1 && (
        <div className="photo-carousel__controls">
          <button type="button" className="photo-carousel__arrow" onClick={goPrev} aria-label={t('previousPhotos')}>
            ‹
          </button>
          <button type="button" className="photo-carousel__arrow" onClick={goNext} aria-label={t('nextPhotos')}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}
