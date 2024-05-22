import { withStyles, ThemeProvider } from "@material-ui/styles";
import { I18nextProvider } from "react-i18next";
import { withMagicClasses, makeMagicBook } from "@tty-pt/styles";
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
    offlineValidation = true, // this will set to true even if it is false. is this intended?
    dependencies,
    themeProps,
    getStyle,
  } = appOptions;

  const realGetStyle = (getStyle ?? dependencies["@tty-pt/styles"]?.makeMagicBook ?? makeMagicBook);

  let componentWithDefaults = (dependencies["@mui/styles"]?.withStyles ?? withStyles)(
    realGetStyle
  )(
    (dependencies["@tty-pt/styles"]?.withMagicClasses ?? withMagicClasses)(
      withError(appComponent, dependencies),
      dependencies["@tty-pt/styles"]?.MagicContext
    )
  );
  if (offlineValidation) {
    componentWithDefaults = withOfflineValidation(componentWithDefaults);
  }
  if (dependencies.i18n) {
    componentWithDefaults = withTranslations(componentWithDefaults, {
      i18n: dependencies.i18n,
      provider: dependencies["react-i18next"]?.I18nextProvider ?? I18nextProvider
    });
  }
  const componentWithNotifications = withNotification(componentWithDefaults);
  const componentWithAuthentication = withAuthentication(
    componentWithNotifications,
    appName
  );
  return withTheme(
    componentWithAuthentication,
    dependencies["@mui/styles"]?.ThemeProvider ?? ThemeProvider,
    themeProps
  );
}
