import React, { Fragment, useCallback } from "react";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";

const useSnackbarRef = { current: null };

//========================================================================================
/*                                                                                      *
 *                                   Private Component                                  *
 *                                                                                      */
//========================================================================================

const InnerSnackbarUtilsConfigurator = props => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

//========================================================================================
/*                                                                                      *
 *                                  Exposed Components                                  *
 *                                                                                      */
//========================================================================================

export const SnackbarUtilsConfigurator = () => {
  const setUseSnackbarRef = useCallback(useSnackbarRefProp => {
    useSnackbarRef.current = useSnackbarRefProp;
  }, []);

  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  );
};

//========================================================================================
/*                                                                                      *
 *                                   Exposed Methods                                    *
 *                                                                                      */
//========================================================================================

const closeSnackbar = key => {
  return () => {
    useSnackbarRef.current.closeSnackbar(key);
  };
};

export const snackbar = (props, _theme) => {
  const {
    message,
    closable = true,
    horizontal = "left",
    vertical = "bottom",
    closeButtonText = "Dismiss",
    severity = "default",
    content,
    ...otherProps
  } = props;

  const action = key => {
    if (closable) {
      return (
        <Fragment>
          <Button
            data-testid="input_dismiss-alert"
            onClick={closeSnackbar(key)}
          >
            {closeButtonText}
          </Button>
        </Fragment>
      );
    }
  };

  const snackbarData = {
    ...otherProps,
    action,
    ariaAttributes: { "data-testid": `output_${severity}-message` },
    variant: severity,
    anchorOrigin: {
      vertical,
      horizontal
    }
  };

  if (content) {
    snackbarData.content = content(closeSnackbar);
  };

  useSnackbarRef.current.enqueueSnackbar(message, snackbarData);
};
