import React from "react";
import PropTypes from "prop-types";
import AbstractModal from "./AbstractModal";

const ConfirmAlertModal = props => {
  return (
    <AbstractModal
      onSubmit={props.onSubmit}
      onCancel={props.onCancel}
      open={props.open}
      title={props.title}
      submitText={props.submitText}
      submitColor={props.submitColor}
      cancelText={props.cancelText}
      cancelColor={props.cancelColor}
    >
      <div data-testid="output_message">{props.message}</div>
      <div data-testid="output_children">{props.children}</div>
    </AbstractModal>
  );
};

ConfirmAlertModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
  submitText: PropTypes.string,
  submitColor: PropTypes.string,
  cancelText: PropTypes.string,
  cancelColor: PropTypes.string
};

ConfirmAlertModal.defaultProps = {
  title: "Insert Text here",
  message: "Are you sure?",
  onSubmit: () => {},
  onCancel: () => {},
  open: false,
  submitText: "Delete",
  submitColor: "secondary",
  cancelText: "Cancel",
  cancelColor: "primary"
};

export default ConfirmAlertModal;
