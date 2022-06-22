import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

const Translations = {
  pt: translationPT,
  en: translationEN
};

const getTranslationsConfig = files => {
  const resources = Object.entries(files).reduce(
    (translationsDictionary, [lang, consumerTranslations]) => {
      translationsDictionary[lang] = {
        translation: {
          ...(Translations[lang] || {}),
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

export { getTranslationsConfig };
