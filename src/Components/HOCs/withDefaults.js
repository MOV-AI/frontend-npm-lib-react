import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";
import withTranslations from "./withTranslations";

export default function withDefaults(appOptions) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true,
    theme = {},
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
  return withTheme(
    withAuthentication(withNotification(componentWithDefaults), appName),
    theme.provider,
    theme.props
  );
}
