// const i18next = jest.createMockFromModule("react-i18next");

const i18nextMock = jest.requireActual("react-i18next");

module.exports = {
  ...i18nextMock,
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  },
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  }
};
