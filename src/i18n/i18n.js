import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getTranslationsConfig } from "./";

import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

const translationsConfig = getTranslationsConfig({
  en: translationEN,
  pt: translationPT
});

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(translationsConfig);

export default i18n;
