import React, { useState } from "react";

export default function withTheme(Component, ThemeProvider, ApplicationTheme) {
  return function (props) {
    const [theme, setTheme] = useState("dark");

    /**
     * Handle theme toggle
     */
    const handleToggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      ApplicationTheme.setTheme(newTheme);
      setTheme(newTheme);
    };

    /**
     * Update current theme on app start
     */
    React.useEffect(() => {
      const currentTheme = ApplicationTheme.getTheme();
      setTheme(currentTheme);
      document.body.style.background =
        ApplicationTheme[currentTheme].backgroundColor;
    }, []);

    return (
      <ThemeProvider theme={ApplicationTheme[theme]}>
        <Component
          handleToggleTheme={handleToggleTheme}
          theme={theme}
          {...props}
        />
      </ThemeProvider>
    );
  };
}
