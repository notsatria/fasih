import { createContext, useContext, useState, useCallback } from 'react';
import en from './en.js';
import id from './id.js';

const translations = { en, id };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('fasih-lang') || 'en';
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'id' : 'en';
      localStorage.setItem('fasih-lang', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      // key format: 'section.key' e.g. 'speaking.btn_start'
      const parts = key.split('.');
      let value = translations[lang];
      for (const part of parts) {
        value = value?.[part];
      }
      return value ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}
