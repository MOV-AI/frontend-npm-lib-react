import React from "react";
import Button from "../src/Components/Button";
import { confirmAlert } from "../src/Components/Snackbar/Snackbar";
import "../src/Components/Snackbar/Snackbar.css";

export default {
  title: "Snackbar"
};

export const simpleSnackbar = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Button
        onClick={() =>
          confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
              {
                label: "Yes",
                onClick: () => alert("Click Yes")
              },
              {
                label: "No",
                onClick: () => alert("Click No")
              }
            ]
          })
        }
      >
        Open Snackbar
      </Button>
    </div>
  );
};

simpleSnackbar.story = {
  name: "Simple Snackbar"
};
