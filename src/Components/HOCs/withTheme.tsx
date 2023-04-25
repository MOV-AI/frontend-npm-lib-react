import { WithThemeProps } from "@tty-pt/styles/lib/types";
import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";

export default function withTheme(
  Component: React.ComponentType<WithThemeProps>,
  ThemeProviderInstance: typeof ThemeProvider,
  ApplicationTheme: {
    getTheme: () => string;
    setTheme: (theme: string) => void;
    [themeName: string]: any;
  }
) {
  return function (props: any) {
    const [theme, setTheme] = useState<string>(ApplicationTheme.getTheme());

    /**
     * Handle theme toggle
     */
    const handleToggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      ApplicationTheme.setTheme(newTheme);
      setTheme(newTheme);
    };

    React.useEffect(() => {
      const currentTheme = ApplicationTheme.getTheme() as string;
      document.body.style.background =
        ApplicationTheme[currentTheme].backgroundColor;
    }, [theme]);

    return (
      <ThemeProviderInstance theme={ApplicationTheme[theme]}>
        <Component
          handleToggleTheme={handleToggleTheme}
          theme={theme}
          {...props}
        />
      </ThemeProviderInstance>
    );
  };
}
