import React from "react";
import AbstractModal from "../src/Components/AbstractModal";
export default {
  title: "Modal"
};

export const simple = () => {
  return (
    <AbstractModal
      title={"Simple Modal"}
      open={true}
      width={"50%"}
      height={"50%"}
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry.Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
    </AbstractModal>
  );
};

simple.story = {
  name: "simple Modal"
};
