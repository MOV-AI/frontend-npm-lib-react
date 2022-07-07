import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
console.log("language: ", language);
console.log("resources: ", resources);
i18n
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

export default i18n;
