import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
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
import i18n from "../../i18n/i18n.js";

const useStyles = makeStyles(theme => {
  return {
    card: {
      margin: "auto",
      position: "absolute",
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
      maxHeight: "98%"
    },
    closeButton: {
      cursor: "pointer",
      position: "absolute",
      color: theme.textColor,
      top: 15,
      right: 15,
      "&:hover": {
        color: "gray"
      }
    }
  };
});

const AbstractModal = props => {
  const classes = useStyles();

  const debounceSubmit = _debounce(() => {
    props.onSubmit();
  }, 50);

  const onKeyPress = e => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    debounceSubmit();
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
        className={classes.card}
        style={{
          ...props.style,
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
            className={classes.closeButton}
            onClick={() => props.onCancel()}
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
  style: PropTypes.object,
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
  hasSubmitButton: true,
  hasCancelButton: true
};

export default AbstractModal;
