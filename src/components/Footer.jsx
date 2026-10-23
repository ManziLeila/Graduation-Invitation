import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date(config.date + 'T12:00:00').getFullYear();

  return (
    <footer className="site-footer">
      <p className="site-footer__line">
        {t('footerLine')} · {config.initials} · {year}
      </p>
    </footer>
  );
}
