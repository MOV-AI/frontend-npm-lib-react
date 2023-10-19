import React from "react";
import { ThemeOptions, StyleRules, createTheme } from "@material-ui/core/styles";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

export interface Dependencies {
  "react-i18next"?: {
    I18nextProvider?: typeof I18nextProvider;
  },
  "@material-ui/core/styles"?: {
    createTheme?: typeof createTheme;
  },
  i18n: typeof i18n;
}

export interface ApplicationThemeType {
  dark: ThemeOptions;
  light: ThemeOptions;
}

export interface WithDefaultsProps {
  name: string;
  component: React.ComponentType;
  offlineValidation: boolean;
  dependencies?: Dependencies;
  ApplicationTheme: ApplicationThemeType;
  getStyle: (theme: ThemeOptions) => StyleRules;
  allowGuest: boolean;
}
