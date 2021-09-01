import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import Backend from 'i18next-xhr-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

// the translations
const resources =
  window.SERVER_DATA === undefined || window.SERVER_DATA.Languages === undefined
    ? {
        en: { translation: translationEN },
        pt: { translation: translationPT }
      }
    : window.SERVER_DATA.Languages;

// default language
const language =
  window.SERVER_DATA === undefined || window.SERVER_DATA.Language === undefined
    ? "en"
    : window.SERVER_DATA.Language;

i18n
  // load translation using xhr -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-xhr-backend
  //   .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //   .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: language,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });
//   .changeLanguage("en", (err, t) => {
//     if (err) return console.log("something went wrong loading", err);
//   });

export default i18n;
