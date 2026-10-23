import { useCallback, useState } from 'react';
import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import './ShareInvite.css';

function inviteUrl() {
  const base = config.siteUrl.replace(/\/$/, '');
  return `${base}/#home`;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

export default function ShareInvite() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const url = inviteUrl();
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=8&color=3d4a2f&bgcolor=e9f5db&data=${encodeURIComponent(url)}`;

  const handleCopy = useCallback(async () => {
    try {
      await copyText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [url]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('pageTitle'),
          text: t('shareText'),
          url,
        });
      } catch {
        /* user cancelled */
      }
      return;
    }
    handleCopy();
  }, [handleCopy, t, url]);

  return (
    <section className="share-invite" aria-labelledby="share-heading">
      <h2 id="share-heading" className="share-invite__heading">
        {t('shareHeading')}
      </h2>
      <div className="share-invite__actions">
        <button type="button" className="share-invite__btn" onClick={handleCopy}>
          {copied ? t('linkCopied') : t('copyLink')}
        </button>
        <button type="button" className="share-invite__btn" onClick={handleShare}>
          {t('shareInvite')}
        </button>
      </div>
      <div className="share-invite__qr">
        <img src={qrSrc} width={160} height={160} alt={t('qrAlt')} loading="lazy" />
        <p className="share-invite__qr-hint">{t('qrHint')}</p>
      </div>
    </section>
  );
}
