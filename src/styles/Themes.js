import { createTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import "fontsource-open-sans";

const CONSTANTS = {
  dark: {
    borderBottom: "1px solid #212121",
    textColor: "white",
    background: {
      primary: "#424242",
      secondary: "#212121"
    }
  },
  light: {
    borderBottom: "1px solid #ccc",
    textColor: "rgba(0, 0, 0, 0.87)",
    background: {
      primary: "#e2e2e2",
      secondary: "#b2b2b2"
    }
  }
};

const themeFactory = particular => ({
  ...particular,
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
  }
});

const Themes = {
  dark: createTheme(
    themeFactory({
      label: "dark",
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
          primary: CONSTANTS.dark.background.primary,
          secondary: CONSTANTS.dark.background.secondary
        },
        accent: {
          background: "#f5f5f9",
          color: "rgba(0, 0, 0, 0.87)",
          border: "#dadde9"
        }
      },
      icon: { color: "#c6c6c6", hoverColor: "white" },
      table: { stripColor: "#505050" },
      verticalBar: {
        iconColor: "#9e9e9e"
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
            color: "#36b5e6"
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
          input: {
            font: "Roboto"
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
        }
      }
    })
  ),
  light: createTheme(
    themeFactory({
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
      backgroundColor:
        "linear-gradient(122.19deg, #FFFFFF 2.58%, #FFFFFF 76.23%)", // it was white before
      bottomNavigation: { background: "#c3c3c3" },
      icon: { color: "#757575", hoverColor: "black" },
      table: { stripColor: "whitesmoke" },
      globalStats: {
        borderColor: "#E6E6E6",
        subTextColor: "#717171",
        upperTextColor: "#474747"
      },
      palette: {
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
          primary: CONSTANTS.light.background.primary,
          secondary: CONSTANTS.light.background.secondary
        },
        accent: {
          background: "whitesmoke",
          color: CONSTANTS.light.textColor,
          border: "darkgray"
        }
      },
      verticalBar: {
        iconColor: "#616161"
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
            color: "white",
            margin: "8px"
          },
          containedSecondary: {
            color: "white",
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
          input: {
            font: "Roboto"
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
    })
  )
};

Themes.getTheme = () => {
  const theme = window.localStorage.getItem("movai.theme"); // dark or light
  return theme ? theme : "dark";
};

Themes.setTheme = value => {
  window.localStorage.setItem("movai.theme", value);
};

export default Themes;
