import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ملفات الترجمة
import translationAR from './locales/ar.json';
import translationEN from './locales/en.json';

const resources = {
  ar: { translation: translationAR },
  en: { translation: translationEN },
};

i18n
  .use(LanguageDetector) // <-- المهم هنا
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // يحفظ اللغة المختارة
    },
  });

export default i18n;
