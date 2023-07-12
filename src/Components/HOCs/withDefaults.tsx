import { I18nextProvider } from "react-i18next";
import { withMagic, getMagicTheme, makeThemeMagicBook } from "@tty-pt/styles";
import { WithDefaultsProps } from "./types";
import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";
import withTranslations from "./withTranslations";
import withError from "./withError";

export default function withDefaults(appOptions: WithDefaultsProps) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true,
    dependencies,
    themeProps, // this should be named ApplicationTheme
    getTheme,
    getStyle,
  } = appOptions;

  let componentWithDefaults = withError(appComponent);

  if (offlineValidation)
    componentWithDefaults = withOfflineValidation(componentWithDefaults);

  componentWithDefaults = withTranslations(componentWithDefaults, {
    i18n: dependencies?.i18n ?? { t: a => a },
    provider: dependencies?.["react-i18next"]?.I18nextProvider ?? I18nextProvider
  });

  const componentWithNotifications = withNotification(componentWithDefaults);
  const componentWithAuthentication = withAuthentication(
    componentWithNotifications,
    appName
  );

  const componentWithMagic = withMagic(
    componentWithAuthentication,
    getTheme ?? getMagicTheme,
    getStyle ?? makeThemeMagicBook,
  );

  return withTheme(
    componentWithMagic,
    themeProps
  );
}
