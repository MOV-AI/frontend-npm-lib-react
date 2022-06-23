import { Translations as libReactTranslations } from "./locales";

const mergeTranslations = (baseTranslations, externalTranslation) => {
  const mergedTranslations = Object.entries(externalTranslation).reduce(
    (previous, [lang, consumerTranslations]) => {
      previous[lang] = {
        ...baseTranslations[lang],
        ...consumerTranslations
      };
      return previous;
    },
    baseTranslations
  );
  return Object.entries(mergedTranslations).reduce(
    (acc, [lang, trans]) => ({
      ...acc,
      [lang]: { translation: trans }
    }),
    mergedTranslations
  );
};

export const translationsBuilder = (files = {}) => {
  const resources = mergeTranslations(libReactTranslations, files);
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
