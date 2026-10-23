import config from '../config';
import './Footer.css';

export default function Footer() {
  const year = new Date(config.date + 'T12:00:00').getFullYear();

  return (
    <footer className="site-footer">
      <p className="site-footer__line">
        {config.initials} · {year}
      </p>
    </footer>
  );
}
