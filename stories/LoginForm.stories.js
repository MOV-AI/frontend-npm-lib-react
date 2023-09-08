import React from "react";
import LoginForm from "../src/Components/LoginForm/LoginForm";
import withTheme from "../src/Components/HOCs/withTheme";

export const loginForm = withTheme(() => {
  return (
    <div style={{ height: "100vh" }}>
      <LoginForm />
    </div>
  );
});

loginForm.story = {
  name: "Login Form"
};

export default {
  title: "Login Form"
};
