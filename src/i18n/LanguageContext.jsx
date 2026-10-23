import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SUPPORTED_LANGS, STORAGE_KEY, translations } from './translations';

const LanguageContext = createContext(null);

function detectInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(browser)) return browser;
  return 'en';
}

function getNested(obj, path) {
  return path.split('.').reduce((acc, part) => (acc != null ? acc[part] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGS.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key) => {
      const value = getNested(translations[lang], key);
      if (value !== undefined) return value;
      const fallback = getNested(translations.en, key);
      if (fallback !== undefined) return fallback;
      return key;
    },
    [lang],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t('pageTitle');
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
