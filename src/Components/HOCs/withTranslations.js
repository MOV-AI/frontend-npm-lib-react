import React from "react";

export default function withTranslations(Component, _props) {
  return function (props) {
    const { provider: I18nextProvider, i18n } = _props;
    return (
      <I18nextProvider i18n={i18n}>
        <Component {...props} />
      </I18nextProvider>
    );
  };
}
