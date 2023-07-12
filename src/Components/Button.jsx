import React from "react";
import MaterialButton from "@mui/material/Button";
import PropTypes from "prop-types";

const Button = props => {
  return (
    <MaterialButton
      data-testid="input_button"
      className={props.className}
      style={props.style}
      onClick={props.onClick}
      color={props.color}
      variant={props.variant}
      size={props.size}
      startIcon={props.startIcon}
      disabled={props.disabled}
    >
      {props.children}
    </MaterialButton>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  color: PropTypes.string,
  variant: PropTypes.string.isRequired,
  size: PropTypes.string,
  startIcon: PropTypes.element,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};
Button.defaultProps = {
  style: {},
  onClick: () => console.log("Click MOV.AI button"),
  color: "default", // default, inherit, primary or secondary
  variant: "contained", // text, outlined, contained
  size: "medium", // small, medium, large
  startIcon: undefined,
  children: <div></div>,
  disabled: false
};

export default Button;
