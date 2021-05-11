import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import {
  Card,
  Typography,
  CardContent,
  Divider,
  Button,
  CardActions,
  Modal
} from "@material-ui/core";

const style = {
  margin: "auto",
  position: "absolute",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  maxHeight: "98%",
  maxWidth: "50%"
};

const closeButtonStyle = {
  cursor: "pointer",
  position: "absolute",
  color: "white",
  top: 15,
  right: 15
};

const AbstractModal = props => {
  const onKeyPress = e => {
    if (e.key === "Enter") {
      submit();
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
        justifyContent: "center"
      }}
    >
      <Card
        style={{
          ...style,
          minWidth: props.width,
          minHeight: props.height
        }}
      >
        <CardContent
          style={{
            flexGrow: 1,
            maxHeight: "calc(100% - 70px)",
            overflowY: "auto"
          }}
        >
          <Typography variant="h5">{props.title}</Typography>
          <Typography
            component="div"
            style={closeButtonStyle}
            onClick={() => props.onCancel()}
            onMouseEnter={evt => (evt.target.style.color = "grey")}
            onMouseLeave={evt => (evt.target.style.color = "white")}
          >
            <CloseIcon></CloseIcon>
          </Typography>
          <Divider style={{ marginBottom: "12px" }} />
          <div
            style={{
              maxHeight: "calc(100% - 35px)",
              overflowY: "auto",
              paddingTop: 5
            }}
          >
            {props.children}
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          {props.hasSubmitButton && (
            <Button color={props.submitColor} onClick={submit}>
              {props.submitText}
            </Button>
          )}
          {props.hasCancelButton && (
            <Button onClick={cancel} color={props.cancelColor}>
              {props.cancelText}
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
  hasSubmitButton: PropTypes.bool,
  hasCancelButton: PropTypes.bool
};

AbstractModal.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  open: false,
  title: "New",
  submitText: "Confirm",
  submitColor: "primary",
  cancelText: "Cancel",
  cancelColor: "secondary",
  width: "25%",
  height: "25%",
  hasSubmitButton: true,
  hasCancelButton: true
};

export default AbstractModal;
