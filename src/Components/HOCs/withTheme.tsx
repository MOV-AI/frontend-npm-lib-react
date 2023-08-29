import { WithThemeProps } from "@tty-pt/styles/src/types";
import { ThemeProvider as DefaultThemeProvider } from "@material-ui/styles";
import { defaultGetTheme } from "./../../styles/Themes";
import React, { useEffect, useState, useMemo } from "react";

const defaultTheme = window.localStorage.getItem("movai.theme") ?? "light"; // dark or light

function ThemeContainer(props: any) {
  const { ThemeProvider, getTheme = defaultGetTheme, Component } = props;
  const [theme, setTheme] = useState<string>(defaultTheme);

  useEffect(() => {
    (document.body.parentElement as HTMLElement).className = theme;
  }, [theme]);

  /**
   * Handle theme toggle
   */
  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    (document.body.parentElement as HTMLElement).className = newTheme;
    window.localStorage.setItem("movai.theme", newTheme); // dark or light
    setTheme(newTheme);
  };

  const muiTheme = useMemo(() => getTheme(theme), [theme]);

  return <ThemeProvider theme={muiTheme}>
    <Component
      handleToggleTheme={handleToggleTheme}
      theme={theme}
      {...props}
    />
  </ThemeProvider>;
}

export default function withTheme(
  Component: React.ComponentClass<WithThemeProps>,
  ThemeProvider: typeof DefaultThemeProvider = DefaultThemeProvider,
  getTheme: typeof defaultGetTheme = defaultGetTheme,
) {
  return function (props: any) {
    return <ThemeContainer {...{ Component, getTheme, ThemeProvider, ...props }} />;
  }
}
