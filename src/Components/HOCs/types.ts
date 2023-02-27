import React from "react";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { Magic, MagicBook } from "@tty-pt/styles/lib/types";
import { withMagicClasses } from "@tty-pt/styles";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

export interface WithDefaultsProps {
  name: string;
  component: React.ComponentType;
  offlineValidation: boolean;
  themeProps: any;
  dependencies: {
    "@tty-pt/styles"?: {
      MagicContext?: React.Context<Magic>,
      withMagicClasses?: typeof withMagicClasses,
    },
    "@material-ui/styles": {
      ThemeProvider: typeof ThemeProvider,
      withStyles: typeof withStyles,
    },
    "react-i18next": {
      I18nextProvider: typeof I18nextProvider,
    },
    i18n: typeof i18n,
  },
  getStyle: (...args: any[]) => MagicBook,
}
