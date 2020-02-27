import { createMuiTheme } from "@material-ui/core/styles";

const themeFactory = particular => ({
  ...particular,
  //spacing: value => `${value ** 2}px`,
  fontSize: value => `${[14, 16, 17][value]}px`,
  typography: {
    h1: {
      fontFamily: "Avenir",
      fontSize: "96px",
      fontWeight: 300
    },
    h2: {
      fontFamily: "Avenir",
      fontSize: "60px",
      fontWeight: 300
    },
    h3: {
      fontFamily: "Avenir",
      fontSize: "48px",
      fontWeight: 400
    },
    h4: {
      fontFamily: "Avenir",
      fontSize: "34px",
      fontWeight: 400
    },
    h5: {
      fontFamily: "Avenir",
      fontSize: "24px",
      fontWeight: 400
    },
    h6: {
      fontFamily: "Avenir",
      fontSize: "20px",
      fontWeight: 600
    },
    subtitle1: {
      fontFamily: "Roboto",
      fontSize: "16px",
      fontWeight: 400
    },
    subtitle2: {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: 600
    },
    body1: {
      fontFamily: "Roboto",
      fontSize: "16px",
      fontWeight: 400
    },
    body2: {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: 400
    },
    button: {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "uppercase"
    },
    caption: {
      fontFamily: "Roboto",
      fontSize: "12px",
      fontWeight: 400
    },
    overline: {
      fontFamily: "Roboto",
      fontSize: "10px",
      fontWeight: 400
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
          main: "#2090B7",
          light: "rgb(76, 166, 197)",
          dark: "rgb(22, 100, 128)"
        },
        action: {
          hoverOpacity: 0.08,
          hover: "rgba(32, 144, 183, 0.08)",
          selected: "rgba(32, 144, 183, 0.14)",
          disabledBackground: "rgba(32, 144, 183, 0.12)",
          disabled: "rgba(32, 144, 183, 0.26)",
          active: "rgba(32, 144, 183, 0.54)"
        },
        text: {
          primary: "rgba(255, 255, 255, 0.87)",
          secondary: "rgba(255, 255, 255, 0.54)",
          disabled: "rgba(255, 255, 255, 0.38)",
          hint: "rgba(255, 255, 255, 0.38)"
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
        type: "light",
        primary: {
          main: "#007097",
          light: "rgb(51, 141, 171)",
          dark: "rgb(0, 79, 105)"
        },
        action: {
          hoverOpacity: 0.08,
          hover: "rgba(0, 112, 151, 0.08)",
          selected: "rgba(0, 112, 151, 0.14)",
          disabledBackground: "rgba(0, 112, 151, 0.12)",
          disabled: "rgba(0, 112, 151, 0.26)",
          active: "rgba(0, 112, 151, 0.54)"
        },
        text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.54)",
          disabled: "rgba(0, 0, 0, 0.38)",
          hint: "rgba(0, 0, 0, 0.38)"
        }
      }
    })
  )
};

export default Themes;
