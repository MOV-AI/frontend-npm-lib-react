import { PropTypes } from "@material-ui/core";
import React, { MouseEventHandler } from "react";
import AbstractModal from "./AbstractModal";

interface ModalProps {
  onSubmit: Function;
  onCancel: MouseEventHandler;
  onKeyPress: Function;
  open: boolean;
  title: string;
  submitText: string;
  submitColor: PropTypes.Color;
  cancelText: string;
  cancelColor: PropTypes.Color;
  children: React.ReactNode;
  message: string;
}

const ConfirmAlertModal = ({
  onSubmit = () => {},
  onCancel = () => {},
  open = false,
  title = "Insert Text here",
  message = "Are you sure?",
  submitText = "Delete",
  submitColor = "secondary",
  cancelText = "Cancel",
  cancelColor = "primary",
  children = <div></div>
}: ModalProps) => {
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
