import "@fontsource/open-sans";
import "@fontsource/roboto";
import _merge from "lodash/merge";
import "./style.css";
import { alpha } from "@mui/material";

const CONSTANTS = {
  dark: {
    textColor: "#fff",
    background: {
      primary: "#424242",
      secondary: "#212121",
    },
    primary: {
      main: "#36b5e6",
    },
    iconColor: "#fff",
  },
  light: {
    textColor: "rgba(0, 0, 0, 0.87)",
    background: {
      primary: "#e2e2e2",
      secondary: "#b2b2b2",
    },
    primary: {
      main: "#007197",
    },
    iconColor: "#007197",
  },
  indigo: {
    textColor: "#fff",
    background: {
      default: "rgb(5, 5, 5)",
      primary: "#2E334D",
      secondary: "#212121",
      overlay: "radial-gradient(79.34% 81.94% at 123.17% 23.94%, #50577C 0%, #1B1E29 100%)",
      grad: "linear-gradient(37.83deg, #3C415D 35.18%, #4A5070 121.84%)",
    },
    primary: {
      main: "#36b5e6",
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

const getDefaults = constants => {
  const border = alpha(constants.textColor, 0.5);

  return ({
    font: {
      Roboto: {
        fontFamily: "Roboto"
      },
      OpenSans: {
        fontFamily: "Open Sans"
      }
    },
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
    textColor: constants.textColor,
    border: border,
    backgroundColor: "#050505",
    bottomNavigation: { background: "#212121" },
    globalStats: {
      borderColor: "#474747",
      subTextColor: "#CDCDCD",
      upperTextColor: "#E6E6E6"
    },
    palette: {
      type: "dark",
      mode: "dark",
      trigger: 1,
      default: {
        main: constants.textColor,
      },
      primary: {
        main: constants.primary.main,
      },
      secondary: {
        main: "#CF6679"
      },
      green: {
        main: "#03DAC5"
      },
      background: {
        default: "#050505",
        primary: constants.background.primary,
        secondary: constants.background.secondary
      },
      accent: {
        background: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        border: "1px solid kk#dadde9"
      },
      text: {
        primary: constants.textColor,
        disabled: "#ffffff",
      },
      getContrastText: () => constants.iconColor
    },
    icon: { color: "#c6c6c6", hoverColor: "#fff" },
    table: { stripColor: "#505050" },
    verticalBar: {
      iconColor: "#9e9e9e",
      background: "#2b2b2b"
    },
    components: {
      MuiTypography: { styleOverrides: {
        root: {
          color: "inherit",
        }
      } },
      MuiTableCell: { styleOverrides: {
        root: {
          borderBottom: "none",
        },
        head: {
          backgroundColor: constants.background.primary,
          padding: "6px 16px !important",
        },
        body: {
          color: constants.textColor
        }
      } },
      MuiAppBar: { styleOverrides: {
        colorDefault: {
          color: constants.textColor,
          borderColor: border,
          backgroundColor: constants.background.secondary
        },
        colorInherit: {
          color: constants.textColor,
          backgroundColor: "#353535"
        }
      } },
      MuiToggleButton: { styleOverrides: {
        root: {
          color: alpha(constants.textColor, 0.38),
        },
      } },
      MuiButton: { styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: alpha(constants.textColor, 0.3),
          },
        },
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
      } },
      MuiButtonGroup: { styleOverrides: {
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
      } },
      MuiAccordionSummary: { styleOverrides: {
        expandIconWrapper: {
          color: constants.textColor,
        }
      } },
      MuiIconButton: { styleOverrides: {
        root: {
          color: constants.primary.main + " !important",
        }
      } },
      MuiCheckbox: { styleOverrides: {
        root: {
          color: constants.primary.main + " !important",
        }
      } },
      MuiListItem: { styleOverrides: {
        root: {
          width: "100% !important",
        },
        button: {
          "&:hover": {
            backgroundColor: "rgba(54,181,230, 0.15)"
          }
        }
      } },
      MuiFormControlLabel: { styleOverrides: {
        label: {
          color: alpha(constants.textColor, 0.6) + " !important",
        }
      } },
      MuiInputLabel: { styleOverrides: {
        root: {
          color: alpha(constants.textColor, 0.6) + " !important",
        },
      } },
      MuiInputBase: { styleOverrides: {
        root: {
          color: constants.textColor + " !important",
        },
        input: {
          font: "Roboto",
          color: constants.textColor + " !important",
        },
        underline: {
          "&:before": {
            borderBottomColor: constants.textColor + " !important",
          }
        },
      } },
      MuiInput: { styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: constants.textColor + " !important",
          }
        }
      } },
      MuiInputAdornment: { styleOverrides: {
        root: {
          color: constants.textColor + " !important",
        }
      } },
      MuiSelect: { styleOverrides: {
        icon: {
          color: constants.textColor + " !important",
        }
      }, defaultProps: {
        variant: 'standard',
      } },
      MuiDrawer: { styleOverrides: {
        paper: {
          position: 'unset',
        },
      } },
      MuiList: { styleOverrides: {
        root: {
          backgroundColor: 'unset !important',
        },
      } },
      MuiOutlinedInput: { styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255, 255, 255, 0.23) !important",
        }
      } },
      MuiSwitch: { styleOverrides: {
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
          background: constants.background.secondary,
        }
      } },
      MuiFilledInput: { styleOverrides: {
        root: {
          border: "4px",
          backgroundColor: alpha(constants.textColor, 0.09),
          "&:hover": {
            backgroundColor: alpha(constants.textColor, 0.09),
          },
          "&.Mui-focused": {
            backgroundColor: alpha(constants.textColor, 0.09),
          },
        },
        input: {
          "table &": {
            padding: "8px 12px !important",
          }
        },
        underline: {
          "&:before": {
            borderBottomColor: constants.textColor + " !important",
            borderRadius: "4px"
          }
        }
      } },
      MuiTextField: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiBreadcrumbs: { styleOverrides: {
        separator: {
          color: alpha(constants.textColor, 0.54),
        },
      } },
      MuiPaper: { styleOverrides: {
        root: {
          color: constants.textColor + " !important",
          backgroundColor: constants.background.primary + " !important",
        }
      } },
      MuiCssBaseline: { styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
          overflow: "auto",
        },
        "#root": {
          height: "100%",
        },
        "tspan": {
          fill: constants.textColor,
        },
        "text": {
          fill: constants.textColor,
        },
        "line": {
          stroke: constants.textColor + " !important",
        },
        ".fa": {
          color: constants.textColor,
        },
      } },
      MuiTableRow: { styleOverrides: {
        head: {
          "& th": {
            backgroundColor: constants.background.primary,
            borderColor: border,
          }
        },
        root: {
          borderBottom: "none !important",
          "& td": {
            borderColor: border,
          }
        }
      } },
    }
  });
};

const themeFactory = particular => _merge(
  getDefaults(CONSTANTS[particular.label]),
  particular,
);

const Themes = {
  dark: themeFactory({ label: "dark" }),
  light: themeFactory({
      label: "light",
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
        type: "light",
        mode: "light",
        secondary: {
          main: "#BE2424"
        },
        background: {
          default: "#ffffff",
        },
        accent: {
          background: "whitesmoke",
          color: CONSTANTS.light.textColor,
          border: "darkgray"
        },
        text: {
        },
      },
      verticalBar: {
        iconColor: "#616161",
        background: "#cccccc"
      },
      components: {
        MuiButton: { styleOverrides: {
          containedPrimary: {
            color: "#fff",
          },
          containedSecondary: {
            color: "#fff",
          }
        } },
        MuiIconButton: { styleOverrides: {
          root: {
            color: CONSTANTS.light.iconColor + " !important",
          }
        } },
        MuiListItem: { styleOverrides: {
          button: {
            "&:hover": {
              backgroundColor: "rgba(0,113,151, 0.15)"
            }
          }
        } },
        MuiPaper: { styleOverrides: {
          root: {
            color: "#272727",
          }
        } },
      }
  }),
  indigo: themeFactory({
    label: "indigo",
    palette: {
      type: "indigo",
      baked: CONSTANTS.indigo.baked,
      success: CONSTANTS.indigo.success,
      info: CONSTANTS.indigo.info,
      divider: "#8E95BA",
      background: {
        default: "#1B1E29",
        paper: CONSTANTS.indigo.background.primary,
        overlay: CONSTANTS.indigo.background.overlay,
        grad: CONSTANTS.indigo.background.grad,
      },
    },
    icon: { color: "#fff" },
  }),
};

export default Themes;

export
function defaultGetStyle(_theme) {
  return {};
}
