import { Translations } from "./locales";
import i18n from "i18next";
i18n.init({
  resources: {
    en: { translation: Translations.en },
    pt: { translation: Translations.pt },
  },
  lng: globalThis.SERVER_DATA?.Language || "en",
  fallbackLng: false,
  debug: false,
  missingKeyHandler: (_lng, _ns, key, fallbackValue) => fallbackValue ?? key,
});
export { Translations };
export default i18n;
