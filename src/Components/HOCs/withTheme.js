import React, { useState } from "react";

export default function withTheme(Component, ThemeProvider, ApplicationTheme) {
  return function (props) {
    const [theme, setTheme] = useState(ApplicationTheme.getTheme());

    /**
     * Handle theme toggle
     */
    const handleToggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      ApplicationTheme.setTheme(newTheme);
      setTheme(newTheme);
    };

    React.useEffect(() => {
      const currentTheme = ApplicationTheme.getTheme();
      document.body.style.background =
        ApplicationTheme[currentTheme].backgroundColor;
    }, [theme]);

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
