import React from "react";
import { EMPTY_FUNCTION } from "../../Utils/Constants";
import AbstractModal from "./AbstractModal";
import { ConfirmModalProps } from "./types";

const ConfirmAlertModal = ({
  onSubmit = EMPTY_FUNCTION,
  onCancel = EMPTY_FUNCTION,
  open = false,
  title = "Insert Text here",
  message = "Are you sure?",
  submitText = "Delete",
  submitColor = "secondary",
  cancelText = "Cancel",
  cancelColor = "primary",
  children = <div></div>,
}: ConfirmModalProps) => {
  return (
    <AbstractModal
      onSubmit={onSubmit}
      onCancel={onCancel}
      open={open}
      title={title}
      submitText={submitText}
      submitColor={submitColor}
      cancelText={cancelText}
      cancelColor={cancelColor}
    >
      <div data-testid="output_message">{message}</div>
      <div data-testid="output_children">{children}</div>
    </AbstractModal>
  );
};

export default ConfirmAlertModal;
