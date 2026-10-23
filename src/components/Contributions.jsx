import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import CopyButton from './CopyButton';
import './Contributions.css';

function momoDigits(number) {
  return number.replace(/\D/g, '');
}

function momoUssdHref(number) {
  const digits = momoDigits(number);
  return `tel:*182*1*1*${digits}%23`;
}

export default function Contributions() {
  const { t } = useLanguage();
  const reveal = useReveal();
  const { bank } = config;

  return (
    <section
      id="contributions"
      className="section contributions"
      aria-labelledby="contributions-heading"
    >
      <div ref={reveal.ref} className={`section__inner ${reveal.className}`}>
        <span className="label">{t('contributionsLabel')}</span>
        <h2 id="contributions-heading" className="section-heading">
          {t('contributionsHeading')}
        </h2>
        <p className="contributions__subtitle">{t('contributionsSubtitle')}</p>

        <div className="contributions__grid">
          <article className="contributions__card">
            <h3 className="contributions__card-title">{t('momoTitle')}</h3>
            <ul className="contributions__momo-list">
              {config.momo.map((entry) => (
                <li key={`${entry.name}-${entry.number}`} className="contributions__momo-row">
                  <div className="contributions__momo-head">
                    <span className="contributions__momo-name">{entry.name}</span>
                    {entry.note ? (
                      <span className="contributions__momo-note">{entry.note}</span>
                    ) : null}
                  </div>
                  <div className="contributions__momo-actions">
                    <span className="contributions__momo-number">{entry.number}</span>
                    <a className="contributions__send" href={momoUssdHref(entry.number)}>
                      {t('send')}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="contributions__card">
            <h3 className="contributions__card-title">{t('bankTitle')}</h3>
            <p className="contributions__bank-line">
              {bank.bank}
              {bank.branch ? ` · ${bank.branch}` : ''}
            </p>
            <p className="contributions__bank-line">{bank.accountName}</p>
            <div className="contributions__account">
              <span className="contributions__account-number">{bank.accountNumber}</span>
              <CopyButton text={bank.accountNumber} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
