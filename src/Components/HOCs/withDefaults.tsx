import React from "react";
import { I18nextProvider } from "react-i18next";
import { WithThemeProps } from "@tty-pt/styles/lib/types";
import { withMagic } from "@tty-pt/styles";
import { WithDefaultsProps } from "./types";
import withAuthentication from "./withAuthentication";
import withNotification from "./withNotification";
import withOfflineValidation from "./withOfflineValidation";
import withTheme from "./withTheme";
import withTranslations from "./withTranslations";
import withError from "./withError";
import withDate from "./withDate";
import { defaultGetStyle } from "../../styles/Themes";

export default function withDefaults(appOptions: WithDefaultsProps) {
  const {
    name: appName,
    component: appComponent,
    offlineValidation = true,
    dependencies,
    getStyle,
    allowGuest,
  } = appOptions;

  let componentWithDefaults = withError(appComponent);

  if (offlineValidation)
    componentWithDefaults = withOfflineValidation(componentWithDefaults);

  if (!(window as any).mock)
    componentWithDefaults = withTranslations(componentWithDefaults, {
      i18n: dependencies?.i18n ?? { t: a => a },
      provider: dependencies?.["react-i18next"]?.I18nextProvider ?? I18nextProvider
    });

  const componentWithNotifications = withNotification(componentWithDefaults);

  const componentWithAuthentication = withAuthentication(
    componentWithNotifications,
    appName,
    allowGuest,
  );

  const componentWithMagic = withMagic(
    componentWithAuthentication,
    getStyle ?? defaultGetStyle,
  );

  return withDate(withTheme(componentWithMagic as React.ComponentClass<WithThemeProps>));
}
