import React from "react";
import { getMagicTheme, makeThemeMagicBook } from "@tty-pt/styles";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

export interface Dependencies {
  "react-i18next"?: {
    I18nextProvider?: typeof I18nextProvider;
  },
  i18n: typeof i18n;
}

export interface WithDefaultsProps {
  name: string;
  component: React.ComponentType;
  offlineValidation: boolean;
  themeProps: any;
  dependencies?: Dependencies,
  getStyle: typeof makeThemeMagicBook;
  getTheme: typeof getMagicTheme;
  magicContext: boolean;
}
