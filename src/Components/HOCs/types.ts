import React from "react";
import { ThemeOptions, StyleRules, createTheme } from "@material-ui/core/styles";

export interface Dependencies {
  "@material-ui/core/styles"?: {
    createTheme?: typeof createTheme;
  },
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
