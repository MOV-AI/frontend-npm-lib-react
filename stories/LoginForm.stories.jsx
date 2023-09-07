import React from "react";

import { ThemeProvider } from "@material-ui/styles";
import LoginForm from "../src/Components/LoginForm/LoginForm";
import Themes from "../src/styles/Themes";

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
