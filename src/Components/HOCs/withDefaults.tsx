import { ThemeProvider } from "@material-ui/styles";
import { I18nextProvider } from "react-i18next";
import { withMagic, makeThemeMagicBook } from "@tty-pt/styles";
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
    getStyle,
    magicContext,
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

  const componentWithMagic = (dependencies?.["@tty-pt/styles"]?.withMagic ?? withMagic)(
    componentWithAuthentication,
    {
      ...(dependencies ?? {}),
      "@tty-pt/styles": {
        ...(dependencies?.["@tty-pt/styles"] ?? {}),
        makeThemeMagicBook: getStyle ?? dependencies?.["@tty-pt/styles"]?.makeThemeMagicBook ?? makeThemeMagicBook,
      },
    },
    magicContext
  );

  return withTheme(
    componentWithMagic,
    dependencies?.["@material-ui/styles"]?.ThemeProvider ?? ThemeProvider,
    themeProps
  );
}
