import React from "react";
import Text from "../src/Components/Text";
import SearchInput from "../src/Components/SearchInput";
export default {
  title: "Text Fields",
};

export const text = () => <Text></Text>;

text.story = {
  name: "simple text",
};

export const textFilled = () => (
  <Text id="filled-basic" label="Filled" variant="filled" />
);

text.story = {
  name: "Filled Text",
};
export const textOutlined = () => (
  <Text id="filled-basic" label="Outlined" variant="outlined" size="small" />
);

textOutlined.story = {
  name: "Outlined Text",
};

export const searchInput = () => <SearchInput />;

searchInput.story = {
  name: "Search Input",
};
