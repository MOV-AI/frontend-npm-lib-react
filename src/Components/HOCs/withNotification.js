import React from "react";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "../Snackbar/Snackbar";

export default function withNotification(Component) {
  return function (props) {
    return (
      <SnackbarProvider maxSnack={6}>
        <SnackbarUtilsConfigurator />
        <Component {...props} />
      </SnackbarProvider>
    );
  };
}
