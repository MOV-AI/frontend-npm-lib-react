import React from "react";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { makeThemeMagicBook } from "@tty-pt/styles";
import { defaultGetTheme } from "../../styles/Themes";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
export interface Dependencies {
    "react-i18next"?: {
        I18nextProvider?: typeof I18nextProvider;
    };
    "@material-ui/styles"?: {
        ThemeProvider?: typeof ThemeProvider;
        withStyles?: typeof withStyles;
    };
    i18n: typeof i18n;
}
export interface WithDefaultsProps {
    name: string;
    component: React.ComponentType;
    offlineValidation: boolean;
    dependencies?: Dependencies;
    getStyle: typeof makeThemeMagicBook;
    allowGuest: boolean;
    getTheme: typeof defaultGetTheme;
}
