import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import {
  Card,
  Typography,
  CardContent,
  Divider,
  // Button,
  CardActions,
  Modal
} from "@material-ui/core";

const style = {
  margin: "auto",
  position: "absolute",
  overflow: "auto",
  display: "flex",
  flexDirection: "column"
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
          width: props.width,
          height: props.height,
          minWidth: "260px",
          minHeight: "280px"
        }}
      >
        <CardContent
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0
          }}
        >
          <Typography
            variant="h5"
            style={{
              padding: "12px 0px 12px 6px",
              fontWeight: 600
            }}
          >
            {props.title}
          </Typography>
          <div
            style={{
              paddingLeft: "6px",
              flexGrow: 1,
              overflow: "auto",
              minHeight: 0
            }}
          >
            {props.children}
          </div>
        </CardContent>
        <Divider />
        <CardActions style={{ alignSelf: "flex-end" }}>
          <Button onClick={cancel} variant="outlined" color={props.cancelColor}>
            {props.cancelText}
          </Button>
          <Button color={props.submitColor} onClick={submit}>
            {props.submitText}
          </Button>
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
  height: PropTypes.string
};

AbstractModal.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  open: false,
  title: "New",
  submitText: "Confirm",
  submitColor: "primary",
  cancelText: "Cancel",
  cancelColor: "inherit",
  width: "25%",
  height: "25%"
};

export default AbstractModal;
