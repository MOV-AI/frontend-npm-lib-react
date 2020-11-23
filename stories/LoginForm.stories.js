import React from "react";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import LoginForm from "../src/Components/LoginForm/LoginForm";
import Themes from "../src/styles/Themes";

// const Themes = {
//   dark: createMuiTheme({
//     label: "dark",
//     palette: {
//       type: "dark", // Switching the dark mode on, is a single property value change.
//       primary: {
//         main: "#36b5e6"
//       },
//       secondary: {
//         main: "#CF6679"
//       },
//       green: {
//         main: "#03DAC5"
//       }
//     }
//   }),
//   light: createMuiTheme({
//     label: "light",
//     palette: {
//       primary: {
//         main: "#007197"
//       },
//       secondary: {
//         main: "#BE2424"
//       },
//       green: {
//         main: "#03DAC5"
//       }
//     }
//   })
// };

export const loginForm = () => {
  return (
    <div style={{ height: "100vh" }}>
      <ThemeProvider theme={Themes["dark"]}>
        <LoginForm></LoginForm>
      </ThemeProvider>
    </div>
  );
};

loginForm.story = {
  name: "Login Form"
};

export default {
  title: "Login Form"
};
