import React from "react";

import Logs from "../src/Components/Logs/Logs";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const Themes = {
  dark: createMuiTheme({
    label: "dark",
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
    }
  }),
  light: createMuiTheme({
    label: "light",
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
    }
  })
};

export const logStory = () => {
  return (
    <div style={{ height: "100vh" }}>
      <ThemeProvider theme={Themes["light"]}>
        <Logs
          robotsData={[
            {
              name: "test",
              id: "test",
              timestamp: 1604334778.6494586,
              robotState: "okay",
              battery: 78,
              ip: undefined
            }
          ]}
          robotStates={{
            error: "error",
            temp: "temp",
            okay: "okay",
            off: "off"
          }}
        ></Logs>
      </ThemeProvider>
    </div>
  );
};

logStory.story = {
  name: "Logs"
};

export default {
  title: "Logs Component"
};
