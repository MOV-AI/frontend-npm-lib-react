import { WithThemeProps, ThemeSub } from "@tty-pt/styles/dist/types";
import { useTheme, themeSub, setTheme } from "@tty-pt/styles";
import { ThemeProvider as DefaultThemeProvider } from "@material-ui/styles";
import useSub from "./../../hooks/useSub";
import React from "react";

function ThemeContainer(props: any) {
  const { ThemeProvider, Component } = props;
  const sub = useSub<ThemeSub>(themeSub);
  const theme = sub.name;

  /**
   * Handle theme toggle
   */
  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const muiTheme = useTheme();

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
) {
  return function (props: any) {
    return <ThemeContainer {...{ Component, ThemeProvider, ...props }} />;
  }
}
