import React, { Fragment, useCallback } from "react";
import { Button } from "@mui/material";
import { OptionsObject, ProviderContext, SnackbarKey, useSnackbar, VariantType } from "notistack";
export interface SnackbarProps extends OptionsObject {
  message: string;
  closable: boolean;
  horizontal: "left" | "center" | "right";
  vertical: "bottom" | "top";
  closeButtonText: string;
  severity: VariantType;
  content: any;
}
interface SnackbarInterface {
  current: ProviderContext | null;
}

const useSnackbarRef: SnackbarInterface = { current: null };

//========================================================================================
/*                                                                                      *
 *                                   Private Component                                  *
 *                                                                                      */
//========================================================================================
export interface InnerSnackbarUtilsConfiguratorProps {
  setUseSnackbarRef: Function;
}

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
  const setUseSnackbarRef = useCallback((useSnackbarRefProp: any) => {
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

const closeSnackbar = (key: SnackbarKey) => {
  return () => {
    useSnackbarRef.current?.closeSnackbar(key);
  };
};

export const snackbar = (props: SnackbarProps, _theme: any) => {
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

  const snackbarData = {
    ...otherProps,
    action,
    // ariaAttributes: { "data-testid": `output_${severity}-message` },
    variant: severity,
    anchorOrigin: {
      vertical,
      horizontal
    },
    content,
  };

  if (content) {
    snackbarData.content = content(closeSnackbar);
  }

  if (!!useSnackbarRef.current) {
    useSnackbarRef.current?.enqueueSnackbar(message, snackbarData);
  }
  return useSnackbarRef.current;
};
