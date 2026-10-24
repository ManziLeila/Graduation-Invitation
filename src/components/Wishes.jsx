import { useState } from 'react';
import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import './Wishes.css';

function openWhatsApp(url) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function Wishes() {
  const { t } = useLanguage();
  const reveal = useReveal();
  const [fromName, setFromName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const prompts = t('wishesPrompts');
  const hashtag = config.celebrationHashtag?.trim();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      setError(t('wishesMessageError'));
      return;
    }
    setError('');

    const lines = [t('whatsappBlessingIntro'), ''];
    const name = fromName.trim();
    if (name) {
      lines.push(`${t('whatsappBlessingFrom')}: ${name}`);
    }
    lines.push(`${t('whatsappBlessingMessage')}: ${trimmed}`);

    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    openWhatsApp(url);
  }

  return (
    <section id="wishes" className="section wishes" aria-labelledby="wishes-heading">
      <div ref={reveal.ref} className={`section__inner wishes__inner ${reveal.className}`}>
        <span className="label">{t('wishesLabel')}</span>
        <h2 id="wishes-heading" className="section-heading">
          {t('wishesHeading')}
        </h2>
        <p className="wishes__subtitle">{t('wishesSubtitle')}</p>

        <div className="wishes__layout">
          <form className="wishes__card wishes__form" onSubmit={handleSubmit} noValidate>
            {Array.isArray(prompts) && prompts.length > 0 ? (
              <div className="wishes__prompts">
                <p className="wishes__prompts-label">{t('wishesPromptsLabel')}</p>
                <div className="wishes__prompts-list">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="wishes__prompt"
                      onClick={() => {
                        setMessage(prompt);
                        setError('');
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="wishes__field">
              <label htmlFor="wishes-from">{t('wishesFrom')}</label>
              <input
                id="wishes-from"
                name="from"
                type="text"
                autoComplete="name"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
              />
            </div>

            <div className="wishes__field">
              <label htmlFor="wishes-message">{t('wishesMessage')}</label>
              <textarea
                id="wishes-message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError('');
                }}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? 'wishes-message-error' : undefined}
              />
              {error ? (
                <p id="wishes-message-error" className="wishes__error" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <button type="submit" className="wishes__submit">
              {t('wishesSubmit')}
            </button>
            <p className="wishes__helper">{t('wishesHelper')}</p>
          </form>

          {hashtag ? (
            <aside className="wishes__card wishes__aside" aria-labelledby="wishes-hashtag-heading">
              <h3 id="wishes-hashtag-heading" className="wishes__aside-title">
                {t('wishesHashtagTitle')}
              </h3>
              <p className="wishes__hashtag">{hashtag}</p>
              <p className="wishes__aside-text">{t('wishesHashtagHint')}</p>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
