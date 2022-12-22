import React from "react";
import withMock from "storybook-addon-mock";
import HomeMenu from "../src/Components/HomeMenu/HomeMenu";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  title: "Home menu",
  decorators: [withMock],
};

export const simple = () => {
  return (
    <div style={{ height: "100vh" }}>
      <HomeMenu />
    </div>
  );
};

simple.story = {
  name: "Default menu"
};

