import React from "react";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "../Snackbar/Snackbar";

export default function withNotification(Component: React.ComponentType) {
  return function (props: any) {
    return (
      <SnackbarProvider maxSnack={6}>
        <SnackbarUtilsConfigurator />
        <Component {...props} />
      </SnackbarProvider>
    );
  };
}
