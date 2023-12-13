import i18n from "i18next";
import { Translations as libReactTranslations } from "./locales";
import { initReactI18next } from "react-i18next";

const mergeTranslations = externalTranslation => {
  return Object.entries(externalTranslation).reduce(
    (result, [lang, appTranslations]) => {
      result[lang] = {
        translation: {
          ...libReactTranslations[lang],
          ...appTranslations
        }
      };
      return result;
    },
    libReactTranslations
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
  createInstance: (files, language) => {
    const instance = i18n.createInstance();
    const translationsConfig = translationsBuilder(files, language);
    instance.use(initReactI18next).init(translationsConfig);
    return instance;
  }
};
