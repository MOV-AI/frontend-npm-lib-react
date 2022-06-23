import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

export const Translations = {
  pt: translationPT,
  en: translationEN
};

export const getTranslationsConfig = ({ files, merge = true }) => {
  const resources = Object.entries(files).reduce(
    (translationsDictionary, [lang, consumerTranslations]) => {
      const baseTranslations = (merge ? Translations[lang] : {}) || {};
      translationsDictionary[lang] = {
        translation: {
          ...baseTranslations,
          ...consumerTranslations
        }
      };
      return translationsDictionary;
    },
    {}
  );

  const language = window?.SERVER_DATA?.Language || "en";
  return {
    resources,
    lng: language,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  };
};

const translationsConfig = getTranslationsConfig(Translations);
// for all options read: https://www.i18next.com/overview/configuration-options
i18n.use(initReactI18next).init(translationsConfig);

export default i18n;
