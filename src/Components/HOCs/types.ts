import React from "react";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { StyleRules } from "@mui/styles";

export interface Dependencies {
  "@mui/styles"?: {
    createTheme?: typeof createTheme;
  },
}

export interface ApplicationThemeType {
  dark: ThemeOptions;
  light: ThemeOptions;
  indigo: ThemeOptions;
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
