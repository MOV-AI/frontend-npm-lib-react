import React from "react";
import {
  defaultTheme,
  registerGetTheme,
  makeMagic,
  makeThemeMagicBook,
  useTheme as baseUseTheme,
} from "@tty-pt/styles";
import "@fontsource/open-sans/index.css";
import "@fontsource/roboto/index.css";

function spacing(a) {
  return (a * 4) + "px";
}

const CONSTANTS = {
  dark: {
    borderBottom: "1px solid #212121",
    textColor: "#fff",
    background: {
      default: "rgb(5, 5, 5)",
      primary: "#424242",
      secondary: "#212121"
    },
    iconColor: "#fff",
    colors: [
      ["GrayDark", "#2b2b2b !important"],
    ],
    baked: {
      gray: {
        dark: "#2b2b2b !important",
      },
    },
  },
  light: {
    borderBottom: "1px solid #ccc",
    textColor: "rgba(0, 0, 0, 0.87)",
    background: {
      default: "linear-gradient(122.19deg, rgb(255, 255, 255) 2.58%, rgb(255, 255, 255) 76.23%)",
      primary: "#e2e2e2",
      secondary: "#b2b2b2",
      overlay: "radial-gradient(79.34% 81.94% at 123.17% 23.94%, #ffffff 0%, #eeeeee 100%)",
    },
    iconColor: "#007197",
    colors: [
      ["GrayDark", "#cccccc !important"],
    ],
    baked: {
      gray: {
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

const themes = {
  dark: {
    ...defaultTheme,
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
      ...defaultTheme.palette,
      baked: CONSTANTS.dark.baked,
      color: [{
        func: x => CONSTANTS.dark.colors[x],
        length: CONSTANTS.dark.colors.length,
      }],
      type: "dark", // Switching the dark mode on, is a single property value change.
      primary: {
        ...defaultTheme.palette.primary,
        main: "#36b5e6"
      },
      secondary: {
        ...defaultTheme.palette.secondary,
        main: "#CF6679"
      },
      green: {
        main: "#03DAC5"
      },
      background: {
        ...defaultTheme.palette.background,
        default: "rgb(5, 5, 5)",
        paper: CONSTANTS.dark.background.primary,
        primary: CONSTANTS.dark.background.primary,
        secondary: CONSTANTS.dark.background.secondary,
      },
      accent: {
        background: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        border: "#dadde9"
      },
      text: {
        ...defaultTheme.palette.text,
        primary: CONSTANTS.dark.textColor
      },
      getContrastText: () => CONSTANTS.dark.iconColor
    },
    icon: { color: "#c6c6c6", hoverColor: "#fff" },
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
    },
    spacing,
  },
  light: {
    ...defaultTheme,
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
    backgroundColor: "linear-gradient(122.19deg, #FFFFFF 2.58%, #FFFFFF 76.23%)", // it was white before
    bottomNavigation: { background: "#c3c3c3" },
    icon: { color: "#757575", hoverColor: "black" },
    table: { stripColor: "whitesmoke" },
    globalStats: {
      borderColor: "#E6E6E6",
      subTextColor: "#717171",
      upperTextColor: "#474747"
    },
    palette: {
      ...defaultTheme.palette,
      baked: CONSTANTS.light.baked,
      color: [{
        func: x => CONSTANTS.light.colors[x],
        length: CONSTANTS.light.colors.length,
      }],
      primary: {
        ...defaultTheme.palette.primary,
        main: "#007197"
      },
      secondary: {
        ...defaultTheme.palette.secondary,
        main: "#BE2424"
      },
      green: {
        main: "#03DAC5"
      },
      background: {
        ...defaultTheme.palette.background,
        default: "linear-gradient(122.19deg, rgb(255, 255, 255) 2.58%, rgb(255, 255, 255) 76.23%)",
        paper: CONSTANTS.light.background.primary,
        primary: CONSTANTS.light.background.primary,
        secondary: CONSTANTS.light.background.secondary,
        overlay: CONSTANTS.light.background.overlay,
      },
      accent: {
        background: "whitesmoke",
        color: CONSTANTS.light.textColor,
        border: "darkgray"
      },
      text: {
        ...defaultTheme.palette.text,
        primary: CONSTANTS.light.textColor,
        secondary: "rgba(0, 0, 0, 0.57)",
      },
      getContrastText: () => CONSTANTS.light.iconColor
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
    },
    spacing,
  },
  indigo: {
    ...defaultTheme,
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
      ...defaultTheme.palette,
      baked: CONSTANTS.indigo.baked,
      color: [{
        func: x => CONSTANTS.indigo.colors[x],
        length: CONSTANTS.indigo.colors.length,
      }],
      type: "indigo", // Switching the indigo mode on, is a single property value change.
      primary: {
        ...defaultTheme.palette.primary,
        ...CONSTANTS.indigo.primary
      },
      success: {
        ...defaultTheme.palette.success,
        ...CONSTANTS.indigo.success,
      },
      info: {
        ...defaultTheme.palette.info,
        ...CONSTANTS.indigo.info,
      },
      divider: "#8E95BA",
      secondary: {
        ...defaultTheme.palette.secondary,
        main: "#CF6679"
      },
      green: {
        main: "#03DAC5"
      },
      background: {
        ...defaultTheme.palette.background,
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
        ...defaultTheme.palette.text,
        primary: CONSTANTS.indigo.textColor
      },
      getContrastText: () => CONSTANTS.indigo.iconColor
    },
    icon: { color: "#fff", hoverColor: "#fff" },
    table: { stripColor: "#505050" },
    spacing,
    // magicBook: {
    //   "!MuiIconButtonk
    // }
  },
};

export
function getTheme(themeName) {
  return themes[themeName];
}

export
function useTheme() {
  return getTheme(baseUseTheme());
}

export
function withTheme(Component) {
  return function WithTheme(props) {
    const theme = useTheme();
    return <Component theme={theme} { ...props }/>;
  };
}

registerGetTheme(getTheme);

makeMagic({
  "?body": {
    margin: 0,
  },
  "?#root > *": {
    minHeight: "100vh",
  }
});

export
function defaultGetStyle(themeName, theme) {
  return {
    ...makeThemeMagicBook(themeName, theme),
  };
}

export default themes;
