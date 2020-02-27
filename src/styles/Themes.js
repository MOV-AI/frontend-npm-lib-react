import { createMuiTheme } from "@material-ui/core/styles";

const themeFactory = particular => ({
  ...particular,
  typography: {
    fontFamily: "Roboto",
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
  }
});

const Themes = {
  dark: createMuiTheme(
    themeFactory({
      label: "dark",
      general: {
        background: "linear-gradient(114.01deg, #212121 0%, #050505 100.43%)",
        blue: "#2090B7",
        stripePrimary: "#2B2B2B",
        stripeSecondary: "#353535",
        stripeBorder: "#353535",
        stripeHover: "#f0f0f0",
        palette: {
          grey: {
            50: "#F7F7F7",
            100: "#E1E1E1",
            200: "#CFCFCF",
            300: "#B1B1B1",
            400: "#9E9E9E",
            500: "#7E7E7E",
            600: "#626262",
            700: "#515151",
            800: "#3B3B3B",
            900: "#222222",
            A700: "#616161",
            A100: "#d5d5d5",
            A400: "#303030",
            A200: "#aaaaaa"
          },
          common: { black: "" }
        }
      },
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
      label: "light",
      general: {
        background: "linear-gradient(122.19deg, #FFFFFF 2.58%, #FFFFFF 76.23%)", // it was white before
        grey: "#CDCDCD",
        blue: "#007097",
        stripePrimary: "#f0f0f0",
        stripeSecondary: "#FAFAFA",
        stripeBorder: "#F0F0F0",
        stripeHover: "#2B2B2B",
        palette: {
          grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A700: "#616161",
            A100: "#d5d5d5",
            A400: "#303030",
            A200: "#aaaaaa"
          }
        }
      },
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

export default Themes;
