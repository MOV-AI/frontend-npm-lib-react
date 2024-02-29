import React, { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import _debounce from "lodash/debounce";
import {
  Card,
  Typography,
  CardContent,
  Divider,
  Button,
  CardActions,
  Modal
} from "@mui/material";
import { modalStyles } from "./styles";
import i18n from "i18next";
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
  const classes = modalStyles();

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
    [handleSubmit]
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
      className={classes.root}
    >
      <Card
        className={classes.card}
        style={{
          ...style,
          minWidth: width,
          minHeight: height
        }}
      >
        <CardContent className={classes.cardContent}>
          <Typography data-testid="output_title" variant="h5">
            {title}
          </Typography>
          <Typography
            data-testid="input_close"
            component="div"
            className={classes.closeButton}
            onClick={onCancel}
          >
            <CloseIcon></CloseIcon>
          </Typography>
          <Typography component="div" className={classes.childrenContainer}>
            {props.children}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          {hasSubmitButton && (
            <Button
              data-testid="input_submit"
              color={submitColor as any}
              onClick={handleSubmit}
              disabled={disableActions}
            >
              {submitText}
            </Button>
          )}
          {hasCancelButton && (
            <Button
              data-testid="input_cancel"
              color={cancelColor as any}
              onClick={onCancel}
              disabled={disableActions}
            >
              {cancelText}
            </Button>
          )}
        </CardActions>
      </Card>
    </Modal>
  );
};

export default AbstractModal;
