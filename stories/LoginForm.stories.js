import React from "react";

import LoginForm from "../src/Components/LoginForm/LoginForm";

export const loginForm = () => {
  return (
    <div style={{ height: "100vh" }}>
      <LoginForm />
    </div>
  );
};

loginForm.story = {
  name: "Login Form",
};

export default {
  title: "Login Form",
};
