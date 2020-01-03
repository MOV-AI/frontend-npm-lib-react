import React from "react";
import PropTypes from "prop-types";
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
      <Card style={{ ...style, width: props.width, height: props.height }}>
        <CardContent style={{ flexGrow: 1 }}>
          <Typography variant="h5">{props.title}</Typography>
          <Divider style={{ marginBottom: "5%" }} />
          {props.children}
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" onClick={submit}>
            {props.submitText}
          </Button>
          <Button color="secondary" onClick={cancel}>
            {"Cancel"}
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
  width: PropTypes.string,
  height: PropTypes.string
};

AbstractModal.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  open: false,
  title: "New",
  submitText: "Confirm",
  width: "25%",
  height: "25%"
};

export default AbstractModal;
