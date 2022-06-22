import i18n from "i18next";
import React from "react";
import { initReactI18next } from "react-i18next";
import { getTranslationsConfig } from "../../i18n/i18n";

export default function withTranslations(
  Component,
  { files, provider: I18nextProvider }
) {
  return function (props) {
    const config = getTranslationsConfig(files);
    i18n.use(initReactI18next).init(config);

    return (
      <I18nextProvider i18n={i18n}>
        <Component {...props} />
      </I18nextProvider>
    );
  };
}
