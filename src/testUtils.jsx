/**
 * @jest-environment jsdom
 */
const React = require("react");

global.mock = true;

import { render as baseRender } from "@testing-library/react"
// import withAuthentication from "./Components/HOCs/withAuthentication";

const AllTheProviders = ({children}) => {
  return (
    <div className="light">
      {children}
    </div>
  )
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(() => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
  // useTranslation: jest.fn(str => str),
  withTranslation: jest.fn(() => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  }),
}));

jest.mock("@mov-ai/mov-fe-lib-core", () => ({
  Authentication: {
    checkLogin: jest.fn().mockResolvedValue(false),
    refreshTokens: jest.fn().mockResolvedValue(true),
    getToken: jest.fn().mockReturnValue("token"),
    getProviders: jest.fn().mockResolvedValue({ domains: ["internal", "ldap"] }),
    DEFAULT_PROVIDER: "internal"
  }
}));

export
function render(ui, options) {
  return baseRender(ui, {wrapper: AllTheProviders, ...options});
}

// export
// function authRender(WrappedComponent, options = {}, props = {}) {
//   function AuthWrapper() {
//     const Wrapped = withAuthentication(WrappedComponent, options.appName, options.allowGuest);
//     return <AllTheProviders><Wrapped { ...props } /></AllTheProviders>;
//   }

//   return baseRender(<div />, {wrapper: AuthWrapper, ...options});
// }

export { act, waitFor, fireEvent } from "@testing-library/react";
