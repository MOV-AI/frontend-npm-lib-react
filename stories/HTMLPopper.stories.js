import React from "react";
import { IconButton, Icon } from "@mui/material";
import HTMLPopper from "../src/Components/Popper/HTMLPopper";

export default {
  title: "HTMLPopper",
};

const getIcon = () => {
  return (
    <IconButton>
      <Icon>info</Icon>
    </IconButton>
  );
};

const renderHTML = () => {
  return (
    <>
      <span>It works!</span>
    </>
  );
};

export const popper = () => (
  <div style={{ height: "100vh" }}>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <HTMLPopper clickableElement={getIcon()} hideOnClickAway={true}>
      {renderHTML()}
    </HTMLPopper>
  </div>
);

popper.story = {
  name: "HTML Popper",
};
