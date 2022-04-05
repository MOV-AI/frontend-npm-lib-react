import React, { useCallback } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import _debounce from "lodash/debounce";
import {
  Card,
  Typography,
  CardContent,
  Divider,
  Button,
  CardActions,
  Modal
} from "@material-ui/core";
import { modalStyles } from "./styles";
import i18n from "../../i18n/i18n.js";

const AbstractModal = props => {
  // Props
  const {
    disableActions,
    onSubmit,
    onCancel,
    open,
    title,
    hasSubmitButton,
    hasCancelButton,
    submitText,
    cancelText,
    submitColor,
    cancelColor
  } = props;
  // Styles hook
  const classes = modalStyles();

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Handle modal close
   */
  const handleClose = useCallback(() => {
    onCancel();
  }, [onCancel]);

  /**
   * Handle Submit button click
   */
  const handleSubmit = useCallback(() => {
    const debounceSubmit = _debounce(() => {
      onSubmit();
    }, 50);

    debounceSubmit();
  }, [onSubmit]);

  /**
   * @param {Event} event : KeyPress event
   */
  const handleKeyPress = useCallback(
    event => {
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
      onKeyPress={handleKeyPress}
      open={open}
      onClose={handleClose}
      className={classes.root}
    >
      <Card
        className={classes.card}
        style={{
          ...props.style,
          minWidth: props.width,
          minHeight: props.height
        }}
      >
        <CardContent className={classes.cardContent}>
          <Typography variant="h5">{title}</Typography>
          <Typography
            component="div"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon></CloseIcon>
          </Typography>
          <Divider className={classes.divider} />
          <Typography component="div" className={classes.childrenContainer}>
            {props.children}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          {hasSubmitButton && (
            <Button
              color={submitColor}
              onClick={handleSubmit}
              disabled={disableActions}
            >
              {submitText}
            </Button>
          )}
          {hasCancelButton && (
            <Button
              color={cancelColor}
              onClick={handleClose}
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

AbstractModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  submitText: PropTypes.string,
  submitColor: PropTypes.string,
  cancelText: PropTypes.string,
  cancelColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  disableActions: PropTypes.bool,
  hasSubmitButton: PropTypes.bool,
  hasCancelButton: PropTypes.bool
};

AbstractModal.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  open: false,
  title: i18n.t("New"),
  submitText: i18n.t("Confirm"),
  submitColor: "primary",
  cancelText: i18n.t("Cancel"),
  cancelColor: "secondary",
  width: "25%",
  height: "25%",
  style: {},
  disableActions: false,
  hasSubmitButton: true,
  hasCancelButton: true
};

export default AbstractModal;
