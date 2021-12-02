import React from "react";
import Button from "../src/Components/Button";
import { snackbar } from "../src/Components/Snackbar/Snackbar";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import MatButton from "@material-ui/core/Button";
import Table from "../src/Components/Table";
import AutoRenew from "@material-ui/icons/Autorenew";

const Themes = {
  dark: createTheme({
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
  light: createTheme({
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

export default {
  title: "Snackbar"
};

export const simpleSnackbar = () => {
  return (
    <Button
      onClick={() =>
        snackbar({
          message: "Are you sure to do this.",
          severity: "success"
        })
      }
    >
      Open Snackbar
    </Button>
  );
};

simpleSnackbar.story = {
  name: "Simple Snackbar"
};

export const customSnackbar = () => {
  return (
    <Button
      onClick={() =>
        snackbar({
          message:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          severity: "error",
          closable: false
        })
      }
    >
      Open Snackbar
    </Button>
  );
};

simpleSnackbar.story = {
  name: "Simple Snackbar"
};

export const themeSnackbar = () => {
  return (
    <div>
      <ThemeProvider theme={Themes["dark"]}>
        <Button
          onClick={() =>
            snackbar({
              message:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              severity: "error"
            })
          }
        >
          Open Snackbar
        </Button>
        <Paper>
          <Typography variant="h5">Test of theme with Snackbar</Typography>
          <Table
            columns={[
              { title: "Adı", field: "name" },
              { title: "Soyadı", field: "surname" },
              { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
              {
                title: "Doğum Yeri",
                field: "birthCity",
                lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
              }
            ]}
            data={[
              {
                name: "Vicente",
                surname: "Queiroz",
                birthYear: 1987,
                birthCity: 63
              }
            ]}
            actions={[
              {
                icon: () => <AutoRenew color="primary"></AutoRenew>,
                onClick: () => console.log("recover")
              }
            ]}
          ></Table>
          <MatButton variant="contained" color="primary">
            Primary
          </MatButton>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

themeSnackbar.story = {
  name: "Test Snackbar with Material Theme"
};
