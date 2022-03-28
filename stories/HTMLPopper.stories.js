import React from "react";
import HTMLPopper from "../src/Components/Popper/HTMLPopper";

export default {
  title: "Chips"
};

const getIcon = () => {
  return <button>Info</button>;
};

const renderHTML = () => {
  return (
    <>
      <span>It works!</span>
    </>
  );
};

export const chipActive = () => (
  <div style={{ height: "100vh" }}>
    <HTMLPopper clickableElement={getIcon()} hideOnClickAway={true}>
      {renderHTML()}
    </HTMLPopper>
  </div>
);

chipActive.story = {
  name: "HTML Popper"
};
