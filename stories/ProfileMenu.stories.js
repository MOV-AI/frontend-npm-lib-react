import React from "react";
import ProfileMenu from "../src/Components/ProfileMenu/ProfileMenu";
import Themes from "../src/styles/Themes";
import { ThemeProvider } from "@material-ui/styles";
import { EMPTY_FUNCTION } from "../src/Utils/Constants";

export default {
  title: "Profile Menu",
  component: ProfileMenu,
  argTypes: {
    welcomeLabel: {
      name: "welcomeLabel",
      type: { name: "string", required: false },
      defaultValue: "Hello",
      description: "Welcome description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Hello" }
      },
      control: {
        type: "text"
      }
    },
    userName: {
      name: "userName",
      type: { name: "string", required: false },
      defaultValue: "User",
      description: "Set username",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "User" }
      },
      control: {
        type: "text"
      }
    },
    darkThemeLabel: {
      name: "darkThemeLabel",
      type: { name: "string", required: false },
      defaultValue: "Dark Theme",
      description: "Theme description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Dark Theme" }
      },
      control: {
        type: "text"
      }
    },
    logoutLabel: {
      name: "logoutLabel",
      type: { name: "string", required: false },
      defaultValue: "Logout",
      description: "Set logout label",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Logout" }
      },
      control: {
        type: "text"
      }
    },
    version: {
      name: "version",
      type: { name: "string", required: false },
      defaultValue: "v1.2.3",
      description: "Inform the project version",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "v1.2.3" }
      },
      control: {
        type: "text"
      }
    },
    handleLogout: {
      description: "Function to logout",
      type: "function",
      table: {
        type: { summary: "function" },
        defaultValue: { summary: arg => res }
      }
    },
    isDarkTheme: {
      name: "isDarkTheme",
      type: { name: "boolean", required: false },
      defaultValue: true,
      description: "Inform if dark theme is activated",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true }
      },
      control: {
        type: "boolean"
      }
    },
    handleToggleTheme: {
      description: "Function to change theme",
      type: "function",
      table: {
        type: { summary: "function" },
        defaultValue: { summary: arg => res }
      }
    },
    extraItems: {
      description:
        "An array of items that can ben added to the menu, each item must have one LABEL and one FUNCTION ",
      default: { label: "label", func: foo => bar },
      type: "object",
      table: {
        type: { summary: "[object]" },
        defaultValue: {
          summary: {
            label: "label",
            func: foo => bar
          }
        }
      }
    },
    menuItemConf: {
      description:
        "Another api for custom menu items. It is a map in which values can be React Elements or objects of a certain syntax.",
      default: null,
      type: "object",
      table: {
        type: { summary: "[object]" },
        defaultValue: {
          summary: {
            title: "A string to present inside the menu item",
            handler: foo => bar
          }
        }
      }
    },
  }
};

export const profileMenu = args => {
  return (
    <ThemeProvider theme={Themes["dark"]}>
      <ProfileMenu {...args} handleToggleTheme={EMPTY_FUNCTION} />
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
