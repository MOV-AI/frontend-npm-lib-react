import React, { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import { withMagic, themeSub, makeThemeMagicBook } from "@tty-pt/styles";

let localGetStyle: typeof makeThemeMagicBook;

export default function withTheme(
  Component: React.FC,
  userCreateTheme: typeof createTheme = createTheme,
  getStyle?: typeof makeThemeMagicBook,
) {
  let current = themeSub.current(), changed = false;
  const currentTheme = current.themes[current.name] ?? {};

  localGetStyle = getStyle ?? localGetStyle ?? makeThemeMagicBook;

  if (!(currentTheme as any).breakpoints) {
    themeSub.create(userCreateTheme as any);
    changed = true;
  }

  const StyledComponent = withMagic(Component, localGetStyle);

  return function (props: any) {
    const sub = themeSub.use();
    const theme = sub.name;
    const muiTheme = sub.themes[theme] ?? {};
    const [update, setUpdate] = useState(0);

    /**
     * Handle theme toggle
     */
    const handleToggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      window.localStorage.setItem("@tty-pt/styles/theme", newTheme);
      themeSub.name = newTheme;
    };

    React.useEffect(() => {
      if (muiTheme) {
        (document.body.parentElement as HTMLElement).className = themeSub.name;
        document.body.style.color = muiTheme.palette.text.primary;
        document.body.style.background =
          (muiTheme as any).backgroundColor;
      }
    }, [muiTheme]);

    React.useEffect(() => {
      if (changed)
        setUpdate(update + 1);
    }, []);

    if (changed)
      return <StyledComponent
        handleToggleTheme={handleToggleTheme}
        theme={themeSub.current().name}
        {...props}
      />;

    return (
      <ThemeProvider theme={muiTheme}>
        <StyledComponent
          handleToggleTheme={handleToggleTheme}
          theme={themeSub.current().name}
          {...props}
        />
      </ThemeProvider>
    );
  };
}
