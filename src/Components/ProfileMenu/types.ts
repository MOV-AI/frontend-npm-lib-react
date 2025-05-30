import { MouseEventHandler } from "react";

export interface ProfileMenuProps {
  welcomeLabel: string;
  darkThemeLabel: string;
  logoutLabel: string;
  version: string;
  extraItems: { func: MouseEventHandler; label: string }[];
  isDarkTheme: boolean;
  isMenuOpen?: boolean;
  onClose?: Function;
  handleLogout: Function;
  handleToggleTheme: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  menuItemConf: {
    [key: string]:
      | {
          handler: Function;
          title: string;
        }
      | React.ElementType;
  };
}
