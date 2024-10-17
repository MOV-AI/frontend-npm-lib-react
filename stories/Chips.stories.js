import React from "react";
import Chip from "../src/Components/Chip";

export default {
  title: "Chips",
};

export const chipActive = () => (
  <div style={{ height: "100vh" }}>
    <Chip active={true} label="text"></Chip>
  </div>
);

chipActive.story = {
  name: "Chip Active",
};

export const chipInactive = () => (
  <div style={{ height: "100vh" }}>
    <Chip active={false} label="text"></Chip>
  </div>
);

chipInactive.story = {
  name: "Chip Inactive",
};
