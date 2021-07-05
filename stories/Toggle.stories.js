import React from "react";
import Toggle from "../src/Components/Toggle";

export default {
  title: "Toggle Input"
};

export const text = () => <Toggle label="Teste"></Toggle>;

text.story = {
  name: "simple toggle"
};
