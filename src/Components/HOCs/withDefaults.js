import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";

export default function withDefaults(appOptions, themeOptions = {}) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true
  } = appOptions;
  let componentWithDefaults = { ...appComponent };
  if (offlineValidation)
    componentWithDefaults = withOfflineValidation(componentWithDefaults);
  return withTheme(
    withAuthentication(withNotification(componentWithDefaults), appName),
    themeOptions.provider,
    themeOptions.theme
  );
}
