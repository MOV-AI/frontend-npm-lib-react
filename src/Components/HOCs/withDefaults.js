import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";

export default function withDefaults(appOptions, themeOptions) {
  const { name: appName, component: appComponent } = appOptions;
  const { provider: themeProvider, theme: applicationTheme } = themeOptions;
  return withTheme(
    withAuthentication(
      withNotification(withOfflineValidation(appComponent)),
      appName
    ),
    themeProvider,
    applicationTheme
  );
}
