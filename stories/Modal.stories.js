import React from "react";
import AbstractModal from "../src/Components/Modal/AbstractModal";
import ConfirmAlertModal from "../src/Components/Modal/ConfirmAlertModal";
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
      onSubmit={() => console.log("submit!")}
      onCancel={() => console.log("gðdel!")}
      submitColor={"secondary"}
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

export const simpleConfirm = () => {
  return (
    <ConfirmAlertModal open={true}>
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry.Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
    </ConfirmAlertModal>
  );
};

simpleConfirm.story = {
  name: "Confirm Modal"
};
