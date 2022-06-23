import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationsBuilder } from "./translationsBuilder";

const translationsConfig = translationsBuilder();
// for all options read: https://www.i18next.com/overview/configuration-options
i18n.use(initReactI18next).init(translationsConfig);

export default i18n;
