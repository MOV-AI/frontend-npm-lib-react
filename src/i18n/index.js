import { Translations } from "./locales";
import i18n from "i18next";

const resources = Object.keys(Translations).reduce((acc, lang) => {
  acc[lang] = {
    translation: {
      ...Translations[lang],
    },
  };
  return acc;
}, {});

i18n.init({
  resources,
  lng: "pt",
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export { Translations };
export default i18n;
