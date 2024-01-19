import i18n from "i18next";
import { Translations as libReactTranslations } from "./locales";

const translationsBuilder = (
  resources = libReactTranslations,
  language = window?.SERVER_DATA?.Language || "en",
) => {
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
    instance.init(translationsConfig);
    return instance;
  }
};
