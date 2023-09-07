import { WithThemeProps } from "@tty-pt/styles/src/types";
import { ThemeProvider as DefaultThemeProvider } from "@material-ui/styles";
import { defaultGetTheme } from "./../../styles/Themes";
import React from "react";
export default function withTheme(Component: React.ComponentClass<WithThemeProps>, ThemeProvider?: typeof DefaultThemeProvider, getTheme?: typeof defaultGetTheme): (props: any) => React.JSX.Element;
