import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import './PhotoGallery.css';

export default function PhotoGallery() {
  const { t } = useLanguage();
  const reveal = useReveal();

  if (!config.photos?.length) return null;

  return (
    <section id="gallery" className="section photo-gallery" aria-labelledby="gallery-heading">
      <div ref={reveal.ref} className={`section__inner ${reveal.className}`}>
        <span className="label">{t('galleryLabel')}</span>
        <h2 id="gallery-heading" className="section-heading">
          {t('galleryHeading')}
        </h2>
        <ul className="photo-gallery__grid">
          {config.photos.map((photo) => (
            <li key={photo.src} className="photo-gallery__item">
              <img src={photo.src} alt={photo.alt || ''} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
