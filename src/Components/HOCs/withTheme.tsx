import { WithThemeProps } from "@tty-pt/styles/lib/types";
import { ThemeProvider } from "@mui/styles";
import { getTheme } from "styles/Themes";
import React, { useEffect, useState, useMemo } from "react";

const defaultTheme = window.localStorage.getItem("movai.theme") ?? "indigo"; // dark or light

export default function withTheme(
  Component: React.ComponentClass<WithThemeProps>,
) {
  return function (props: any) {
    const [theme, setTheme] = useState<string>(defaultTheme);

    useEffect(() => {
      document.body.className = theme;
    }, [theme]);

    /**
     * Handle theme toggle
     */
    const handleToggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      document.body.className = newTheme;
      window.localStorage.setItem("movai.theme", newTheme); // dark or light
      setTheme(newTheme);
    };

    return (
      <ThemeProvider theme={useMemo(() => getTheme(theme), [theme])}>
        <Component
          handleToggleTheme={handleToggleTheme}
          theme={theme}
          {...props}
        />
      </ThemeProvider>
    );
  };
}
