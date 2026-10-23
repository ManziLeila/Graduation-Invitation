import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import './GoodToKnow.css';

export default function GoodToKnow() {
  const { t } = useLanguage();
  const reveal = useReveal();
  const items = t('goodToKnowItems');

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="good-to-know" className="section section--alt good-to-know" aria-labelledby="good-to-know-heading">
      <div ref={reveal.ref} className={`section__inner good-to-know__inner ${reveal.className}`}>
        <span className="label">{t('goodToKnowLabel')}</span>
        <h2 id="good-to-know-heading" className="section-heading">
          {t('goodToKnowHeading')}
        </h2>
        <ul className="good-to-know__list">
          {items.map((item, index) => (
            <li key={`${index}-${item.slice(0, 24)}`}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
