import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useActiveSection } from '../hooks/useActiveSection';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const SECTION_IDS = ['about', 'when-where', 'agenda', 'rsvp', 'closing'];

export default function Header() {
  const { t } = useLanguage();
  const activeId = useActiveSection(SECTION_IDS);

  const links = [
    { id: 'about', label: t('navAbout') },
    { id: 'when-where', label: t('navWhenWhere') },
    { id: 'agenda', label: t('navAgenda') },
    { id: 'rsvp', label: t('navRsvp') },
    { id: 'closing', label: t('navClosing') },
  ];

  return (
    <header className="site-header">
      <div className="site-header__row site-header__row--top">
        <a href="#home" className="site-header__back">
          {t('backToPhotos')}
        </a>
        <a href="#details" className="site-header__monogram" aria-label={config.name}>
          {config.initials}
        </a>
        <LanguageSwitcher />
      </div>
      <div className="site-header__row site-header__row--nav">
        <nav className="site-header__nav" aria-label="Primary">
          {links.map(({ id, label }, index) => (
            <span key={id} className="site-header__nav-item">
              {index > 0 && (
                <span className="site-header__nav-dot" aria-hidden="true">
                  ·
                </span>
              )}
              <a
                href={`#${id}`}
                className="site-header__nav-link"
                aria-current={activeId === id ? 'true' : undefined}
              >
                {label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
