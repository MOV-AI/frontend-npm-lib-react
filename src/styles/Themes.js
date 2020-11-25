import { createMuiTheme } from "@material-ui/core/styles";
import "fontsource-roboto";

const themeFactory = particular => ({
  ...particular,
  typography: {
    fontFamily: "Avenir",
    h1: {
      fontFamily: "Avenir"
    },
    h2: {
      fontFamily: "Avenir"
    },
    h3: {
      fontFamily: "Avenir"
    },
    h4: {
      fontFamily: "Avenir"
    },
    h5: {
      fontFamily: "Avenir"
    },
    h6: {
      fontFamily: "Avenir"
    },
    body1: {
      fontFamily: "Roboto"
    }
  },
  cursorDefault: {
    cursor: "default"
  }
});

const Themes = {
  dark: createMuiTheme(
    themeFactory({
      label: "dark",
      backgroundColor:
        "linear-gradient(114.01deg, #212121 0%, #050505 100.43%)",
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
        }
      },
      overrides: {
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
  light: createMuiTheme(
    themeFactory({
      font: {
        Roboto: {
          fontFamily: "Roboto"
        },
        Avenir: {
          fontFamily: "Avenir"
        }
      },
      label: "light",
      backgroundColor:
        "linear-gradient(122.19deg, #FFFFFF 2.58%, #FFFFFF 76.23%)", // it was white before
      bottomNavigation: { background: "#c3c3c3" },
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
        }
      },
      overrides: {
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
