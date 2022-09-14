import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";
import withTranslations from "./withTranslations";

export default function withDefaults(appOptions: {
  name: string;
  component: React.ComponentType;
  offlineValidation: boolean;
  theme: { provider: typeof ThemeProvider; props?: any };
  translations: object;
}) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true,
    theme = { provider: ThemeProvider },
    translations
  } = appOptions;
  let componentWithDefaults = appComponent;
  if (offlineValidation)
    componentWithDefaults = withOfflineValidation(componentWithDefaults);
  if (translations)
    componentWithDefaults = withTranslations(
      componentWithDefaults,
      translations
    );
  const componentWithNotifications = withNotification(componentWithDefaults);
  const componentWithAuthentication = withAuthentication(
    componentWithNotifications,
    appName
  );
  return withTheme(componentWithAuthentication, theme.provider, theme.props);
}
