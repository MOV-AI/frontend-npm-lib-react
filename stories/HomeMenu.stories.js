import React from "react";
import withMock from "storybook-addon-mock";
import HomeMenu from "../src/Components/HomeMenu/HomeMenu";
import "@fortawesome/fontawesome-free/css/all.min.css";
import withAuthentication from "../src/Components/HOCs/withAuthentication";

export default {
  title: "Home menu",
  decorators: [withMock],
};

const HomeMenuSimple = () => {
  return (
    <div style={{ height: "100vh" }}>
      <HomeMenu />
    </div>
  );
};

const Template = () => {
  const AuthHome = withAuthentication(HomeMenuSimple);
  return <AuthHome />;
};

export const HomeMenuSimpleStory = Template.bind({});

HomeMenuSimpleStory.story = {
  name: "Default menu",
};
