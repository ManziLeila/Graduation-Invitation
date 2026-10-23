import { useLanguage } from '../i18n/LanguageContext';
import './LanguageSwitcher.css';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'rw', label: 'RW' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {LANGS.map(({ code, label }, index) => (
        <span key={code} className="lang-switcher__item">
          {index > 0 && <span className="lang-switcher__sep" aria-hidden="true">|</span>}
          <button
            type="button"
            className={`lang-switcher__btn${lang === code ? ' lang-switcher__btn--active' : ''}`}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
