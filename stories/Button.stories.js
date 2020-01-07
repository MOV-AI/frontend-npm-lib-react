import React from "react";
import Button from "../src/Components/Button";
export default {
  title: "Button"
};

export const button = () => {
  return <Button>Simple</Button>;
};

button.story = {
  name: "simple button"
};

export const outline = () => {
  return <Button variant="outlined">outlined</Button>;
};

outline.story = {
  name: "outlined button"
};
