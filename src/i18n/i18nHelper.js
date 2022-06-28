import i18n from "i18next";
import { Translations as libReactTranslations } from "./locales";
import { initReactI18next } from "react-i18next";

const mergeTranslations = externalTranslation => {
  const mergedTranslations = Object.entries(externalTranslation).reduce(
    (previous, [lang, appTranslations]) => {
      previous[lang] = {
        ...libReactTranslations[lang],
        ...appTranslations
      };
      return previous;
    },
    libReactTranslations
  );
  return Object.entries(mergedTranslations).reduce(
    (acc, [lang, trans]) => ({
      ...acc,
      [lang]: { translation: trans }
    }),
    mergedTranslations
  );
};

const translationsBuilder = (
  files = {},
  language = window?.SERVER_DATA?.Language || "en"
) => {
  const resources = mergeTranslations(files);
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

export const i18nHelper = {
  createInstance: (files, language, namespace) => {
    const instance = i18n.createInstance();
    const translationsConfig = translationsBuilder(files, language);
    instance.use(initReactI18next).init(translationsConfig);
    return instance;
  }
};
