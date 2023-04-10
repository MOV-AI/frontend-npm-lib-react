import { MouseEventHandler } from "react";

export interface ProfileMenuProps {
  welcomeLabel: string;
  darkThemeLabel: string;
  logoutLabel: string;
  version: string;
  extraItems: { func: MouseEventHandler; label: string }[];
  isDarkTheme: boolean;
  handleLogout: Function;
  handleToggleTheme: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  menuItemConf: {
    [key: string]: {
      handler: Function,
      title: string,
    },
  },
  handleAlertNotifications: React.MouseEventHandler<HTMLLIElement>;
}
