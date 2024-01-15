import React from "react";
import { ThemeOptions, StyleRules, createTheme } from "@material-ui/core/styles";
import i18n from "i18next";

export interface Dependencies {
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
