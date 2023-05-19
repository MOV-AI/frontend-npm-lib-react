import React, { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import _debounce from "lodash/debounce";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
{/* import { modalStyles } from "./styles"; */}
import i18n from "../../i18n/i18n.js";
import { EMPTY_FUNCTION } from "../../Utils/Constants";
import { AbstractModalProps } from "./types";

const AbstractModal = (props: AbstractModalProps) => {
  const {
    disableActions = false,
    onSubmit = EMPTY_FUNCTION,
    onCancel = EMPTY_FUNCTION,
    onKeyPress = EMPTY_FUNCTION,
    open = false,
    title = i18n.t("New"),
    hasSubmitButton = true,
    hasCancelButton = true,
    submitText = i18n.t("Confirm"),
    cancelText = i18n.t("Cancel"),
    submitColor = "primary",
    cancelColor = "secondary",
    width = "25%",
    height = "25%",
    style = {}
  } = props;
  // Styles hook

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Handle Submit button click
   */
  const handleSubmit = useCallback(() => {
    // TODO: check what is causing this workaround - FP-1648
    const debounceSubmit = _debounce(() => {
      onSubmit();
    }, 50);

    debounceSubmit();
  }, [onSubmit]);

  /**
   * @param {Event} event : KeyPress event
   */
  const handleKeyPress = useCallback(
    (event: any) => {
      if (onKeyPress) return onKeyPress(event);
      if (event.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit, onKeyPress]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <Modal
      data-testid="section_abstract-modal"
      onKeyPress={handleKeyPress}
      open={open}
      onClose={onCancel}
      className="absotute position-0 vertical-0 justify-content align-items"
    >
      <div className="relative paper pad vertical">
        <div className="horizontal align-items border-bottom">
          <div data-testid="output_title" className="flex-grow h-5">{title}</div>
          <div data-testid="input_close" onClick={onCancel}>
            <CloseIcon></CloseIcon>
          </div>
        </div>
        <Typography component="div" className="children-container">
          {props.children}
        </Typography>
        <div className="horizontal justify-content-end">
          {hasSubmitButton && (
            <Button
              data-testid="input_submit"
              color={submitColor}
              onClick={handleSubmit}
              disabled={disableActions}
            >
              {submitText}
            </Button>
          )}
          {hasCancelButton && (
            <Button
              data-testid="input_cancel"
              color={cancelColor}
              onClick={onCancel}
              disabled={disableActions}
            >
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AbstractModal;
