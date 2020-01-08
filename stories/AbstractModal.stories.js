import React from "react";
import AbstractModal from "../src/Components/AbstractModal";
export default {
  title: "Modal"
};

export const simple = () => {
  return (
    <AbstractModal title={"Simple Modal"} open={true} width={500} height={200}>
      Simple
    </AbstractModal>
  );
};

simple.story = {
  name: "simple Modal"
};
