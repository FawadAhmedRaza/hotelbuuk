"use client";

import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import TranslationEn from "./langs/en.json";
import TranslationDe from "./langs/gr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    lng: "en",
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false, // React already escapes content
    },
    resources: {
      en: { translations: TranslationEn },
      de: { translations: TranslationDe },
    },
  });

export default i18n;
