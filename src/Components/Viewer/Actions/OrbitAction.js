import { Maybe } from "monet";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";

class OrbitAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "orbit";
    this.name = "Orbit [ESC]";
    this.maybeSelectedMesh = Maybe.none();
    this.icon = props => <i className="fas fa-globe" {...props}></i>;
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {};

  onPointerMove = (evt, parentView) => {};

  onPointerUp = (evt, parentView) => {};
}

export default OrbitAction;
