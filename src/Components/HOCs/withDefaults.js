import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";

export default function withDefaults(appOptions) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true,
    theme = {}
  } = appOptions;
  let componentWithDefaults = appComponent;
  if (offlineValidation)
    componentWithDefaults = withOfflineValidation(componentWithDefaults);
  return withTheme(
    withAuthentication(withNotification(componentWithDefaults), appName),
    theme.provider,
    theme.props
  );
}
