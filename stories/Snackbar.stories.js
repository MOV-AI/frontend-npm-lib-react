import React from "react";
import Button from "../src/Components/Button";
import { snackbar } from "../src/Components/Snackbar/Snackbar";
import "../src/Components/Snackbar/Snackbar.css";

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
