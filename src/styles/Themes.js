import "@fontsource/open-sans";
import "@fontsource/roboto";
import _merge from "lodash/merge";
import "./style.css";

const CONSTANTS = {
  dark: {
    borderBottom: "1px solid #212121",
    textColor: "#fff",
    background: {
      primary: "#424242",
      secondary: "#212121",
    },
    iconColor: "#fff"
  },
  light: {
    borderBottom: "1px solid #ccc",
    textColor: "rgba(0, 0, 0, 0.87)",
    background: {
      primary: "#e2e2e2",
      secondary: "#b2b2b2"
    },
    iconColor: "#007197"
  }
};

const themeFactory = particular => _merge(particular, {
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
  components: {
    MuiTableCell: { styleOverrides: {
      root: {
        borderBottom: "none",
      },
      head: {
        padding: "6px 16px !important",
      },
    } },
    MuiTypography: { styleOverrides: {
      root: {
        color: "inherit",
      }
    } },
    MuiListItem: { styleOverrides: {
      root: {
        width: "100% !important",
      },
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
      }
    } },
    MuiTableRow: { styleOverrides: {
      root: {
        borderBottom: "none !important",
      },
    } },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
      },
    },
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
    } },
  }
});

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
        mode: "dark",
        default: {
          main: CONSTANTS.dark.textColor,
        },
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
      components: {
        MuiTableCell: { styleOverrides: {
          head: {
            backgroundColor: CONSTANTS.dark.background.primary
          },
          body: {
            color: CONSTANTS.dark.textColor
          }
        } },
        MuiAppBar: { styleOverrides: {
          colorDefault: {
            color: CONSTANTS.dark.textColor,
            borderColor: "black",
            backgroundColor: CONSTANTS.dark.background.secondary
          },
          colorInherit: {
            color: CONSTANTS.dark.textColor,
            backgroundColor: "#353535"
          }
        } },
        MuiToggleButton: { styleOverrides: {
          root: {
            color: "rgba(255, 255, 255, 0.38)",
          },
        } },
        MuiButton: { styleOverrides: {
          root: {
            "&.Mui-disabled": {
              color: "rgba(255, 255, 255, 0.3)",
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
        MuiIconButton: { styleOverrides: {
          root: {
            color: "#36b5e6 !important"
          }
        } },
        MuiCheckbox: { styleOverrides: {
          root: {
            color: "#36b5e6 !important"
          }
        } },
        MuiListItem: { styleOverrides: {
          button: {
            "&:hover": {
              backgroundColor: "rgba(54,181,230, 0.15)"
            }
          }
        } },
        MuiFormControlLabel: { styleOverrides: {
          label: {
            color: "rgba(255,255,255,0.8) !important"
          }
        } },
        MuiInputLabel: { styleOverrides: {
          root: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        } },
        MuiInputBase: { styleOverrides: {
          root: {
            color: CONSTANTS.dark.textColor + " !important",
          },
          input: {
            font: "Roboto",
            color: CONSTANTS.dark.textColor + " !important",
          },
          underline: {
            "&:before": {
              borderBottomColor: CONSTANTS.dark.textColor + " !important",
            }
          },
        } },
        MuiInput: { styleOverrides: {
          underline: {
            "&:before": {
              borderBottomColor: CONSTANTS.dark.textColor + " !important",
            }
          }
        } },
        MuiInputAdornment: { styleOverrides: {
          root: {
            color: CONSTANTS.dark.textColor + " !important",
          }
        } },
        MuiSelect: { styleOverrides: {
          icon: {
            color: CONSTANTS.dark.textColor + " !important",
          }
        } },
        MuiOutlinedInput: { styleOverrides: {
          notchedOutline: {
            borderColor: "rgba(255, 255, 255, 0.23) !important",
          }
        } },
        MuiFilledInput: { styleOverrides: {
          root: {
            border: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.09)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.09)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.09)",
            },
          },
          input: {
            "table &": {
              padding: "8px 12px !important",
            }
          },
          underline: {
            "&:before": {
              borderBottomColor: CONSTANTS.dark.textColor + " !important",
              borderRadius: "4px"
            }
          }
        } },
        MuiBreadcrumbs: { styleOverrides: {
          separator: {
            color: "rgba(255, 255, 255, 0.54)",
          },
        } },
        MuiPaper: { styleOverrides: {
          root: {
            color: CONSTANTS.dark.textColor + " !important",
            backgroundColor: CONSTANTS.dark.background.primary + " !important",
          }
        } },
        MuiCssBaseline: { styleOverrides: {
          "tspan": {
            fill: CONSTANTS.dark.textColor,
          },
          "text": {
            fill: CONSTANTS.dark.textColor,
          },
          "line": {
            stroke: CONSTANTS.dark.textColor + " !important",
          },
          ".fa": {
            color: CONSTANTS.dark.textColor,
          },
        } },
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
        default: {
          main: CONSTANTS.light.textColor,
        },
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
      components: {
        MuiTableCell: { styleOverrides: {
          head: {
            backgroundColor: CONSTANTS.light.background.primary
          },
          body: {
            color: CONSTANTS.light.textColor
          }
        } },
        MuiAppBar: { styleOverrides: {
          colorDefault: {
            color: CONSTANTS.light.textColor,
            borderColor: CONSTANTS.light.borderBottom,
            backgroundColor: CONSTANTS.light.background.secondary
          },
          colorInherit: {
            color: CONSTANTS.light.textColor,
            backgroundColor: "#d2d2d2"
          }
        } },
        MuiToggleButton: { styleOverrides: {
          root: {
            color: "rgba(0, 0, 0, 0.38)",
          },
        } },
        MuiButton: { styleOverrides: {
          root: {
            "&.Mui-disabled": {
              color: "rgba(0, 0, 0, 0.3)",
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
            color: "#fff",
            margin: "8px"
          },
          containedSecondary: {
            color: "#fff",
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
        MuiFormControlLabel: { styleOverrides: {
          label: {
            color: "rgba(0,0,0,0.54)"
          }
        } },
        MuiInputLabel: { styleOverrides: {
          root: {
            color: "rgba(0,0,0,0.54)"
          },
        } },
        MuiInputAdornment: { styleOverrides: {
          root: {
            color: CONSTANTS.light.textColor + " !important",
          }
        } },
        MuiSelect: { styleOverrides: {
          icon: {
            color: CONSTANTS.light.textColor + " !important",
          }
        } },
        MuiInputBase: { styleOverrides: {
          root: {
            color: CONSTANTS.light.textColor + " !important",
          },
          input: {
            font: "Roboto",
            color: CONSTANTS.light.textColor + " !important",
          },
          underline: {
            "&:before": {
              borderBottomColor: CONSTANTS.light.textColor + " !important",
            }
          }
        } },
        MuiFilledInput: { styleOverrides: {
          root: {
            border: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.09)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.09)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(0, 0, 0, 0.09)",
            },
          },
          underline: {
            "&:before": {
              borderBottomColor: CONSTANTS.light.textColor + " !important",
              borderRadius: "4px"
            }
          }
        } },
        MuiBreadcrumbs: { styleOverrides: {
          separator: {
            color: "rgba(0, 0, 0, 0.54)",
          },
        } },
        MuiPaper: { styleOverrides: {
          root: {
            color: "#272727",
            backgroundColor: CONSTANTS.light.background.primary
          }
        } },
        MuiTableRow: { styleOverrides: {
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
        } },
        MuiCssBaseline: { styleOverrides: {
          "tspan": {
            fill: CONSTANTS.light.textColor,
          },
          "text": {
            fill: CONSTANTS.light.textColor,
          },
          "line": {
            stroke: CONSTANTS.light.textColor + " !important",
          },
          ".fa": {
            color: CONSTANTS.light.textColor,
          },
        } },
      }
  }),
};

export default Themes;

export
function defaultGetStyle(_theme) {
  return {};
}
