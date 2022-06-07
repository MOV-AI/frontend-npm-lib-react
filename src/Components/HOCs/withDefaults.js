import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";

export default function withDefaults(appOptions, themeOptions) {
  const { name: appName, component: appComponent } = appOptions;
  const { ThemeProvider, ApplicationTheme } = themeOptions;
  console.log("appName: ", appName, " appComponent: ", appComponent);
  console.log(
    "themeProvider: ",
    ThemeProvider,
    "ApplicationTheme: ",
    ApplicationTheme
  );
  return withTheme(
    withAuthentication(
      withNotification(withOfflineValidation(appComponent)),
      appName
    ),
    ThemeProvider,
    ApplicationTheme
  );
}
