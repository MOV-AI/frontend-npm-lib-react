import React from "react";
import ProfileMenu from "../src/Components/ProfileMenu";
import Themes from "../src/styles/Themes";
import { ThemeProvider } from "@material-ui/styles";

export default {
  title: "Profile Menu",
  component: ProfileMenu,
  argTypes: {
    welcomeLabel: {
      description: "welcome description",
      defaultValue: "Hello, ",
      control: {
        type: null
      }
    },
    userName: {
      description: "Set username",
      defaultValue: "User",
      control: {
        type: "string"
      }
    },
    darkThemeLabel: {
      description: "Informs the default theme of the project",
      control: {
        type: "boolean"
      }
    },
    logoutLabel: {
      description: "Set logout message",
      defaultValue: "Logout",
      control: {
        type: "string"
      }
    },
    version: {
      description: "Inform the project version",
      defaultValue: "v1.2.3",
      control: {
        type: "string"
      }
    },
    logoutLabel: {
      description: "Set logout message",
      control: {
        type: "string"
      }
    },
    version: {
      description: "Inform the project version",
      control: {
        type: "string"
      }
    },
    handleLogout: {
      description: "function to logout",
      type: "function"
    },
    isDarkTheme: {
      description: "Inform if dark theme is activated",
      type: "boolean"
    },
    handleToggleTheme: {
      description: "function to change theme",
      type: "function"
    },
    extraItems: {
      description:
        "An array of items that can ben added to the menu, each item must have one label and one function ",
      type: "object"
    }
  }
};

export const profileMenu = args => {
  return (
    <ThemeProvider theme={Themes["dark"]}>
      <ProfileMenu {...args}>Simple</ProfileMenu>
    </ThemeProvider>
  );
};

profileMenu.story = {
  welcomeLabel: "Hello",
  userName: "User",
  darkThemeLabel: "Dark Theme",
  logoutLabel: "Logout",
  version: "v.1.1.2020",
  extraItems: [],
  handleLogout: () => console.log("logout"),
  handleToggleTheme: () => console.log("toggle")
};
