import { useState } from 'react';
import config from '../config';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { isGoogleFormConfigured, submitGoogleForm } from '../utils/submitGoogleForm';
import './Rsvp.css';

function openWhatsApp(url) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function buildWhatsAppMessage(t, { name, attendance, phone, note }) {
  const attendanceLabel =
    attendance === 'yes' ? t('whatsappAttending') : t('whatsappDeclining');
  const lines = [
    t('whatsappIntro'),
    '',
    `${t('whatsappName')}: ${name}`,
    `${t('whatsappAttendance')}: ${attendanceLabel}`,
    `${t('whatsappPhone')}: ${phone.trim() || t('whatsappNone')}`,
    `${t('whatsappNote')}: ${note.trim() || t('whatsappNone')}`,
  ];
  return lines.join('\n');
}

export default function Rsvp() {
  const { t, lang } = useLanguage();
  const reveal = useReveal();
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const savesToSheet = isGoogleFormConfigured(config.googleForm);

  function validate() {
    const next = {};
    if (!name.trim()) next.name = t('formNameError');
    if (!attendance) next.attendance = t('formAttendanceError');
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    const trimmedName = name.trim();

    if (savesToSheet) {
      try {
        await submitGoogleForm(config.googleForm, {
          name: trimmedName,
          attendance,
          phone: phone.trim(),
          note: note.trim(),
          lang,
        });
      } catch {
        /* still open WhatsApp */
      }
    }

    const message = buildWhatsAppMessage(t, {
      name: trimmedName,
      attendance,
      phone,
      note,
    });
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    openWhatsApp(url);
    setSubmitting(false);
  }

  return (
    <section id="rsvp" className="section section--alt rsvp" aria-labelledby="rsvp-heading">
      <div ref={reveal.ref} className={`section__inner rsvp__inner ${reveal.className}`}>
        <span className="label">{t('rsvpLabel')}</span>
        <h2 id="rsvp-heading" className="section-heading">
          {t('rsvpHeading')}
        </h2>
        <div className="rsvp__card">
          <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
            <div className="rsvp__field">
              <label htmlFor="rsvp-name">{t('formName')}</label>
              <input
                id="rsvp-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
              />
              {errors.name && (
                <p id="rsvp-name-error" className="rsvp__error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <fieldset className="rsvp__fieldset">
              <legend>{t('formAttendance')}</legend>
              <div className="rsvp__radios">
                <label className={`rsvp__radio-card${attendance === 'yes' ? ' rsvp__radio-card--selected' : ''}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={attendance === 'yes'}
                    onChange={() => setAttendance('yes')}
                  />
                  <span>{t('formAttendYes')}</span>
                </label>
                <label className={`rsvp__radio-card${attendance === 'no' ? ' rsvp__radio-card--selected' : ''}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={attendance === 'no'}
                    onChange={() => setAttendance('no')}
                  />
                  <span>{t('formAttendNo')}</span>
                </label>
              </div>
              {errors.attendance && (
                <p className="rsvp__error" role="alert">
                  {errors.attendance}
                </p>
              )}
            </fieldset>

            <div className="rsvp__field">
              <label htmlFor="rsvp-phone">{t('formPhone')}</label>
              <input
                id="rsvp-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="rsvp__field">
              <label htmlFor="rsvp-note">{t('formNote')}</label>
              <textarea
                id="rsvp-note"
                name="note"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button type="submit" className="rsvp__submit" disabled={submitting}>
              {submitting ? t('formSubmitting') : t('formSubmit')}
            </button>
            <p className="rsvp__helper">
              {savesToSheet ? t('rsvpHelperWithSheet') : t('rsvpHelper')}
            </p>
            <p className="rsvp__phone-alt">
              {t('rsvpPhoneLabel')}{' '}
              <a href={`tel:+${config.whatsappNumber}`}>{config.phoneDisplay}</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
