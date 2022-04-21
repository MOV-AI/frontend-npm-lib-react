import React from "react";
import PropTypes from "prop-types";
import MaterialDrawer from "@material-ui/core/Drawer";

const Drawer = props => {
  return (
    <MaterialDrawer
      data-testid="section_drawer"
      style={props.style}
      anchor={props.anchor}
      open={props.open}
      onClose={props.onClose}
    >
      {props.children}
    </MaterialDrawer>
  );
};

Drawer.propTypes = {
  style: PropTypes.object,
  anchor: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.object
};

Drawer.defaultProps = {
  style: {},
  anchor: "left",
  open: false,
  children: <div></div>
};

Drawer.ANCHOR = { left: "left", right: "right", top: "top", bottom: "bottom" };

export default Drawer;
