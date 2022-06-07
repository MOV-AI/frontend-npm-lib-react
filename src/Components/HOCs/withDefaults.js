import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";

export default function withDefaults(appOptions, themeOptions) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true
  } = appOptions;
  const { provider: themeProvider, theme: applicationTheme } = themeOptions;
  if (offlineValidation) appComponent = withOfflineValidation(appComponent);
  return withTheme(
    withAuthentication(withNotification(appComponent), appName),
    themeProvider,
    applicationTheme
  );
}
