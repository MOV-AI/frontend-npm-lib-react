import React, { AriaAttributes, Fragment, useCallback } from "react";
import { Button } from "@material-ui/core";
import { ProviderContext, useSnackbar, SnackbarKey } from "notistack";
import { InnerSnackbarUtilsConfiguratorProps, SnackbarProps } from "./types";

const useSnackbarRef: { current: null | ProviderContext } = { current: null };

//========================================================================================
/*                                                                                      *
 *                                   Private Component                                  *
 *                                                                                      */
//========================================================================================

const InnerSnackbarUtilsConfigurator = (
  props: InnerSnackbarUtilsConfiguratorProps
) => {
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

const closeSnackbar = (key: SnackbarKey) => () =>
  useSnackbarRef.current?.closeSnackbar(key);

export const snackbar = (props: SnackbarProps, _theme: any) => {
  const {
    message,
    closable = true,
    horizontal = "left",
    vertical = "bottom",
    closeButtonText = "Dismiss",
    severity = "default",
    ...otherProps
  } = props;

  const action = (key: SnackbarKey) => {
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

  useSnackbarRef.current?.enqueueSnackbar(message, {
    ...otherProps,
    action,
    ariaAttributes: {
      "data-testid": `output_${severity}-message`
    } as AriaAttributes,
    variant: severity,
    anchorOrigin: {
      vertical,
      horizontal
    }
  });
};
