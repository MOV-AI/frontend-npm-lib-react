import "@fontsource/open-sans";
import "@fontsource/roboto";
import { createTheme } from "@mui/material";
import { themeSub } from "@tty-pt/styles";
import _merge from "lodash/merge";

const CONSTANTS = {
  dark: {
    borderBottom: "1px solid #212121",
    textColor: "#fff",
    background: {
      primary: "#424242",
      secondary: "#212121",
    },
    iconColor: "#fff",
    colors: [
      ["Pink", "#E26CDE !important"],
      ["Purple", "#7575CE !important"],
      ["GrayLight", "#8E95BA !important"],
      ["GrayDark", "#2b2b2b !important"],
    ],
    baked: {
      pink: {
        main: "#E26CDE !important",
      },
      purple: {
        main: "#7575CE !important",
      },
      gray: {
        light: "#8E95BA !important",
        dark: "#2b2b2b !important",
      },
    },
  },
  light: {
    borderBottom: "1px solid #ccc",
    textColor: "rgba(0, 0, 0, 0.87)",
    background: {
      primary: "#e2e2e2",
      secondary: "#b2b2b2"
    },
    iconColor: "#007197",
    colors: [
      ["Pink", "#E26CDE !important"],
      ["Purple", "#7575CE !important"],
      ["GrayLight", "#8E95BA !important"],
      ["GrayDark", "#cccccc !important"],
    ],
    baked: {
      pink: {
        main: "#E26CDE !important",
      },
      purple: {
        main: "#7575CE !important",
      },
      gray: {
        light: "#8E95BA !important",
        dark: "#cccccc !important",
      },
    },
  },
  indigo: {
    borderBottom: "1px solid #212121",
    textColor: "#fff",
    background: {
      default: "rgb(5, 5, 5)",
      primary: "#2E334D",
      secondary: "#212121",
      overlay: "radial-gradient(79.34% 81.94% at 123.17% 23.94%, #50577C 0%, #1B1E29 100%)",
      grad: "linear-gradient(37.83deg, #3C415D 35.18%, #4A5070 121.84%)",
    },
    error: {
      main: "#FF3E3E",
      light: "#ff6969",
    },
    success: {
      main: "#3CD2A3",
    },
    info: {
      main: "#4FC3F0",
    },
    iconColor: "#fff",
    colors: [
      ["Pink", "#E26CDE !important"],
      ["Purple", "#7575CE !important"],
      ["GrayLight", "#8E95BA !important"],
      ["GrayDark", "#292D3F !important"],
    ],
    borderBottom: "1px solid #ccc",
    baked: {
      info: {
        main: "#4FC3F0",
      },
      success: {
        main: "#3CD2A3",
      },
      pink: {
        main: "#E26CDE !important",
      },
      purple: {
        main: "#7575CE !important",
      },
      gray: {
        light: "#8E95BA !important",
        dark: "#292D3F !important",
      },
    }
  }
};

const themeFactory = particular => createTheme(_merge(particular, {
  typography: {
    fontFamily: "Open Sans",
    h1: {
      fontFamily: "Open Sans"
    },
    h2: {
      fontFamily: "Open Sans"
    },
    h3: {
      fontFamily: "Open Sans"
    },
    h4: {
      fontFamily: "Open Sans"
    },
    h5: {
      fontFamily: "Open Sans"
    },
    h6: {
      fontFamily: "Open Sans"
    },
    body1: {
      fontFamily: "Roboto"
    }
  },
  cursorDefault: {
    cursor: "default"
  },
  cursorPointer: {
    cursor: "pointer"
  },
  spacing: 8,
  spacing: (number) => number * 8 + "px",
  overrides: {
    MuiListItem: {
      root: {
        width: "100% !important",
      },
    },
    MuiSwitch: {
      thumb: {
          transform: "translateY(-2px)",
      },
      switchBase: {
        transform: "translateX(16px)",
        "&.Mui-checked": {
          transform: "translateX(24px)",
        }
      },
      track: {
        position: "absolute",
        width: "46px",
        height: "16px",
        borderRadius: "8px",
      }
    },
  }
}));

const Themes = {
  dark: themeFactory({
      label: "dark",
      trigger: 1,
      textColor: CONSTANTS.dark.textColor,
      backgroundColor: "#050505",
      bottomNavigation: { background: "#212121" },
      globalStats: {
        borderColor: "#474747",
        subTextColor: "#CDCDCD",
        upperTextColor: "#E6E6E6"
      },
      palette: {
        type: "dark", // Switching the dark mode on, is a single property value change.
        colorOct: [{
          func: x => CONSTANTS.dark.colors[x],
          length: CONSTANTS.dark.colors.length,
        }],
        primary: {
          main: "#36b5e6"
        },
        secondary: {
          main: "#CF6679"
        },
        green: {
          main: "#03DAC5"
        },
        background: {
          default: "#050505",
          primary: CONSTANTS.dark.background.primary,
          secondary: CONSTANTS.dark.background.secondary
        },
        accent: {
          background: "#f5f5f9",
          color: "rgba(0, 0, 0, 0.87)",
          border: "#dadde9"
        },
        text: {
          primary: CONSTANTS.dark.textColor,
          disabled: "#ffffff",
        },
        getContrastText: () => CONSTANTS.dark.iconColor
      },
      icon: { color: "#c6c6c6", hoverColor: "#fff" },
      table: { stripColor: "#505050" },
      verticalBar: {
        iconColor: "#9e9e9e",
        background: "#2b2b2b"
      },
      overrides: {
        MuiTableCell: {
          body: {
            color: CONSTANTS.dark.textColor
          }
        },
        MuiAppBar: {
          colorDefault: {
            color: CONSTANTS.dark.textColor,
            borderColor: "black",
            backgroundColor: CONSTANTS.dark.background.secondary
          },
          colorInherit: {
            color: CONSTANTS.dark.textColor,
            backgroundColor: "#353535"
          }
        },
        MuiButton: {
          outlined: {
            margin: "8px"
          },
          text: {
            margin: "8px"
          },
          contained: {
            margin: "8px"
          },
          containedPrimary: {
            color: "inherit",
            margin: "8px"
          },
          containedSecondary: {
            color: "inherit",
            margin: "8px"
          }
        },
        MuiButtonGroup: {
          root: {
            margin: "0"
          },
          groupedContainedPrimary: {
            margin: "0"
          },
          groupedOutlined: {
            margin: "0"
          },
          groupedText: {
            margin: "0"
          }
        },
        MuiIconButton: {
          root: {
            color: "#36b5e6 !important"
          }
        },
        MuiListItem: {
          button: {
            "&:hover": {
              backgroundColor: "rgba(54,181,230, 0.15)"
            }
          }
        },
        MuiFormControlLabel: {
          label: {
            color: "rgba(255,255,255,0.8)"
          }
        },
        MuiInputBase: {
          root: {
            color: CONSTANTS.dark.textColor + " !important",
          },
          input: {
            font: "Roboto",
            color: CONSTANTS.dark.textColor + " !important",
          }
        },
        MuiFilledInput: {
          root: {
            border: "4px"
          },
          underline: {
            "&::before": {
              borderRadius: "4px"
            }
          }
        },
        MuiPaper: {
          root: {
            color: CONSTANTS.dark.textColor + " !important",
            backgroundColor: CONSTANTS.dark.background.primary + " !important",
          }
        },
      }
  }),
  light: themeFactory({
      font: {
        Roboto: {
          fontFamily: "Roboto"
        },
        OpenSans: {
          fontFamily: "Open Sans"
        }
      },
      label: "light",
      textColor: CONSTANTS.light.textColor,
      backgroundColor: "#ffffff",
      bottomNavigation: { background: "#c3c3c3" },
      icon: { color: "#757575", hoverColor: "black" },
      table: { stripColor: "whitesmoke" },
      globalStats: {
        borderColor: "#E6E6E6",
        subTextColor: "#717171",
        upperTextColor: "#474747"
      },
      palette: {
        colorOct: [{
          func: x => CONSTANTS.light.colors[x],
          length: CONSTANTS.light.colors.length,
        }],
        primary: {
          main: "#007197"
        },
        secondary: {
          main: "#BE2424"
        },
        green: {
          main: "#03DAC5"
        },
        background: {
          default: "#ffffff",
          primary: CONSTANTS.light.background.primary,
          secondary: CONSTANTS.light.background.secondary
        },
        accent: {
          background: "whitesmoke",
          color: CONSTANTS.light.textColor,
          border: "darkgray"
        },
        text: {
          primary: CONSTANTS.light.textColor,
        },
        getContrastText: () => CONSTANTS.light.iconColor
      },
      verticalBar: {
        iconColor: "#616161",
        background: "#cccccc"
      },
      overrides: {
        MuiTableCell: {
          body: {
            color: CONSTANTS.light.textColor
          }
        },
        MuiAppBar: {
          colorDefault: {
            color: CONSTANTS.light.textColor,
            borderColor: CONSTANTS.light.borderBottom,
            backgroundColor: CONSTANTS.light.background.secondary
          },
          colorInherit: {
            color: CONSTANTS.light.textColor,
            backgroundColor: "#d2d2d2"
          }
        },
        MuiButton: {
          outlined: {
            margin: "8px"
          },
          text: {
            margin: "8px"
          },
          contained: {
            margin: "8px"
          },
          containedPrimary: {
            color: "#fff",
            margin: "8px"
          },
          containedSecondary: {
            color: "#fff",
            margin: "8px"
          }
        },
        MuiButtonGroup: {
          root: {
            margin: "0"
          },
          groupedContainedPrimary: {
            margin: "0"
          },
          groupedOutlined: {
            margin: "0"
          },
          groupedText: {
            margin: "0"
          }
        },
        MuiIconButton: {
          root: {
            color: "#007197"
          }
        },
        MuiListItem: {
          button: {
            "&:hover": {
              backgroundColor: "rgba(0,113,151, 0.15)"
            }
          }
        },
        MuiFormControlLabel: {
          label: {
            color: "rgba(0,0,0,0.8)"
          }
        },
        MuiInputBase: {
          root: {
            color: CONSTANTS.light.textColor + " !important",
          },
          input: {
            font: "Roboto",
            color: CONSTANTS.light.textColor + " !important",
          }
        },
        MuiFilledInput: {
          root: {
            border: "4px"
          },
          underline: {
            "&::before": {
              borderRadius: "4px"
            }
          }
        },
        MuiPaper: {
          root: {
            color: "#272727",
            backgroundColor: CONSTANTS.light.background.primary
          }
        },
        MuiTableRow: {
          head: {
            "& th": {
              backgroundColor: CONSTANTS.light.background.primary,
              borderBottom: CONSTANTS.light.borderBottom
            }
          },
          root: {
            "& td": {
              borderBottom: CONSTANTS.light.borderBottom
            }
          }
        }
      }
  }),
  indigo: themeFactory({
    label: "indigo",
    textColor: CONSTANTS.indigo.textColor,
    backgroundColor: "#050505",
    bottomNavigation: { background: "#212121" },
    globalStats: {
      borderColor: "#474747",
      subTextColor: "#CDCDCD",
      upperTextColor: "#E6E6E6"
    },
    palette: {
      baked: CONSTANTS.indigo.baked,
      colorOct: [{
        func: x => CONSTANTS.indigo.colors[x],
        length: CONSTANTS.indigo.colors.length,
      }],
      type: "indigo", // Switching the indigo mode on, is a single property value change.
      primary: {
        main: "#36b5e6"
      },
      divider: "#8E95BA",
      secondary: {
        main: "#CF6679"
      },
      green: {
        main: "#03DAC5"
      },
      background: {
        default: "#1B1E29",
        paper: CONSTANTS.indigo.background.primary,
        primary: CONSTANTS.indigo.background.primary,
        secondary: CONSTANTS.indigo.background.secondary,
        overlay: CONSTANTS.indigo.background.overlay,
        grad: CONSTANTS.indigo.background.grad,
      },
      accent: {
        background: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        border: "#dadde9"
      },
      text: {
        primary: CONSTANTS.indigo.textColor,
        disabled: "#ffffff",
      },
      getContrastText: () => CONSTANTS.indigo.iconColor
    },
    icon: { color: "#fff", hoverColor: "#fff" },
    table: { stripColor: "#505050" },
    verticalBar: {
      iconColor: "#9e9e9e",
      background: "#2b2b2b"
    },
    // spacing,
    // magicBook: {
    //   "!MuiIconButtonk
    // }
  }),
};

export default Themes;
themeSub.add(Themes);

export
function defaultGetStyle(_theme) {
  return {};
}
