import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "@/features/localisation/locales/en.json";
import heTranslations from "@/features/localisation/locales/he.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      he: { translation: heTranslations },
    },
    lng: "he",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
