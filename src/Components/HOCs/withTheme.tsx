import { createTheme, ThemeProvider, withStyles, Theme, ThemeOptions } from "@material-ui/core/styles";
import DefaultApplicationTheme, { defaultGetStyle } from "../../styles/Themes";
import { makeSub } from "../../Utils/Sub";
import useSub from "../../hooks/useSub";
import { ApplicationThemeType } from "./types";
import React from "react";

type ThemeNameType = "dark" | "light";

interface ThemeSub {
  themeName: ThemeNameType;
  ApplicationTheme: ApplicationThemeType;
  getStyle: typeof defaultGetStyle;
};

export
const themeSub = makeSub<ThemeSub>({
  themeName: (window.localStorage.getItem("movai.theme") ?? "dark") as ThemeNameType,
  ApplicationTheme: DefaultApplicationTheme,
  getStyle: defaultGetStyle,
});

const setTheme = themeSub.makeEmitNow((current: ThemeSub, themeName: ThemeNameType): ThemeSub => {
  window.localStorage.setItem("movai.theme", themeName);

  return {
    ...current,
    themeName,
  };
});

function createThemes(current: ThemeSub): Record<ThemeNameType, Theme> {
  let ApplicationTheme: Record<ThemeNameType, Theme | ThemeOptions>  = { ...current.ApplicationTheme };

  for (const [key, value]  of Object.entries(ApplicationTheme))
    ApplicationTheme[key as ThemeNameType] = createTheme(value);

  return ApplicationTheme as Record<ThemeNameType, Theme>;
}

export default function withTheme(
  Component: (props: any) => JSX.Element,
  ApplicationTheme?: typeof DefaultApplicationTheme,
  getStyle?: typeof defaultGetStyle,
) {
  let current = themeSub.current();

  if (ApplicationTheme || getStyle) {
    current = {
      ...current,
      ApplicationTheme: ApplicationTheme ?? current.ApplicationTheme,
      getStyle: getStyle ?? current.getStyle
    };
    const NewApplicationTheme = createThemes(current);
    current = {
      ...current,
      ApplicationTheme: NewApplicationTheme,
    };
    themeSub.update(current);
  }

  const StyledComponent = withStyles(getStyle ?? defaultGetStyle)(Component);

  return function (props: any) {
    const sub = useSub<ThemeSub>(themeSub);
    const theme = sub.themeName;
    const muiTheme = sub.ApplicationTheme[theme] as Theme;

    /**
     * Handle theme toggle
     */
    const handleToggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    };

    React.useEffect(() => {
      document.body.style.color = muiTheme.palette.text.primary;
      document.body.style.background =
        (muiTheme as any).backgroundColor;
    }, [muiTheme]);

    return (
      <ThemeProvider theme={muiTheme}>
        <StyledComponent
          handleToggleTheme={handleToggleTheme}
          theme={theme}
          {...props}
        />
      </ThemeProvider>
    );
  };
}
