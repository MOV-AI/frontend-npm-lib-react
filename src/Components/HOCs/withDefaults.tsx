import React from "react";
import { Dependencies, WithDefaultsProps } from "./types";
import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";
import withError from "./withError";

export default function withDefaults(appOptions: WithDefaultsProps) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true,
    dependencies = {} as Dependencies,
    getStyle,
    ApplicationTheme,
    allowGuest,
  } = appOptions;

  let componentWithDefaults = withError(appComponent);

  if (offlineValidation)
    componentWithDefaults = withOfflineValidation(componentWithDefaults);

  const componentWithNotifications = withNotification(componentWithDefaults);

  const componentWithAuthentication = withAuthentication(
    componentWithNotifications,
    appName,
    allowGuest,
  );

  return withTheme(
    componentWithAuthentication as (props: any) => JSX.Element,
    ApplicationTheme,
    getStyle,
    dependencies["@material-ui/core/styles"]?.createTheme,
  );
}
