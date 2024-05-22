import React from "react";
import { StyleRules, ThemeProvider, withStyles } from "@material-ui/styles";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

export interface WithDefaultsProps {
  name: string;
  component: React.ComponentType;
  offlineValidation: boolean;
  themeProps: any;
  dependencies: {
    "@mui/styles"?: {
      ThemeProvider?: typeof ThemeProvider,
      withStyles?: typeof withStyles,
    },
    "react-i18next"?: {
      I18nextProvider?: typeof I18nextProvider,
    },
    i18n: typeof i18n,
  },
  getStyle: (theme: any) => StyleRules;
}
