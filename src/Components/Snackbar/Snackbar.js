import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { Fragment } from "react";

const InnerSnackbarUtilsConfigurator = props => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = useSnackbarRefProp => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  );
};

const closeSnackbar = key => {
  return () => {
    useSnackbarRef.closeSnackbar(key);
  };
};

export const snackbar = (props, theme) => {
  const {
    message,
    closable = true,
    horizontal = "left",
    vertical = "bottom",
    closeButtonText = "Dismiss",
    severity = "default",
    ...otherProps
  } = props;
  const action = key => {
    if (closable) {
      return (
        <Fragment>
          <Button data-testid="output_icon" onClick={closeSnackbar(key)}>
            {closeButtonText}
          </Button>
        </Fragment>
      );
    }
  };
  useSnackbarRef.enqueueSnackbar(message, {
    ...otherProps,
    action,
    variant: severity,
    anchorOrigin: {
      vertical,
      horizontal
    }
  });
};
