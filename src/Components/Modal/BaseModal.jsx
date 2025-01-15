import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  Divider,
  Button,
  CardActions,
  Modal,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    card: {
      margin: "auto",
      position: "absolute",
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
      maxHeight: "98%",
    },
    closeButton: {
      cursor: "pointer",
      position: "absolute",
      color: theme.textColor,
      top: 15,
      right: 15,
      "&:hover": {
        color: "gray",
      },
    },
  };
});

const BaseModal = (props) => {
  const classes = useStyles();

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      props.onEnter(submit);
    }
  };

  const submit = () => {
    props.onSubmit();
  };

  const cancel = () => {
    props.onCancel();
  };

  return (
    <Modal
      onKeyPress={onKeyPress}
      open={props.open}
      onClose={cancel}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        className={classes.card}
        style={{
          ...props.style,
          minWidth: props.width,
          minHeight: props.height,
        }}
      >
        <CardContent
          style={{
            flexGrow: 1,
            maxHeight: "calc(100% - 70px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5">{props.title}</Typography>
          <div className={classes.closeButton} onClick={() => props.onCancel()}>
            <CloseIcon></CloseIcon>
          </div>
          <Divider style={{ marginBottom: "12px" }} />
          <div
            style={{
              maxHeight: "calc(100% - 35px)",
              overflowY: "auto",
              paddingTop: 5,
            }}
          >
            {props.children}
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          {props.hasSubmitButton && (
            <Button
              color={props.submitColor}
              onClick={submit}
              disabled={props.readOnly}
            >
              {props.submitText}
            </Button>
          )}
          {props.hasCancelButton && (
            <Button color={props.cancelColor} onClick={cancel}>
              {props.cancelText}
            </Button>
          )}
        </CardActions>
      </Card>
    </Modal>
  );
};

BaseModal.propTypes = {
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
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  hasSubmitButton: PropTypes.bool,
  hasCancelButton: PropTypes.bool,
};

BaseModal.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  onEnter: (submit) => submit(),
  open: false,
  title: "New",
  submitText: "Confirm",
  submitColor: "primary",
  cancelText: "Cancel",
  cancelColor: "secondary",
  width: "20%",
  height: "25%",
  readOnly: false,
  error: false,
  hasFooterButton: true,
  hasCancelButton: true,
};

export default BaseModal;
