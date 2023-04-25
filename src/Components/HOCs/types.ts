import React from "react";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { Dependencies } from "@tty-pt/styles/lib/types";
import { makeThemeMagicBook } from "@tty-pt/styles";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

export interface ThisDependencies extends Dependencies {
  "@material-ui/styles"?: {
    ThemeProvider?: typeof ThemeProvider;
    withStyles?: typeof withStyles;
  },
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
  dependencies?: ThisDependencies,
  getStyle: typeof makeThemeMagicBook;
  magicContext: boolean;
}
