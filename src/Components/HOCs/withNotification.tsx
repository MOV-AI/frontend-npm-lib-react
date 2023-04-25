import React from "react";
{/* import { SnackbarProvider } from "notistack"; */}
import { SnackbarUtilsConfigurator } from "../Snackbar/Snackbar";

export default function withNotification(Component: React.FC): React.FC {
  return function (props: any) {
    return (
      <div>
        <SnackbarUtilsConfigurator />
        <Component {...props} />
      </div>
    );
  };
}
