import React from "react";
import MaterialButton from "@material-ui/core/Button";
import PropTypes from "prop-types";

const Button = props => {
  return (
    <MaterialButton
      className={props.className}
      style={props.style}
      onClick={props.onClick}
      color={props.color}
      variant={props.variant}
      size={props.size}
    >
      {props.children}
    </MaterialButton>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired
};
Button.defaultProps = {
  style: {},
  onClick: () => console.log("Click MOV.AI button"),
  color: "default", // default, inherit, primary or secondary
  variant: "contained", // text, outlined, contained
  size: "medium", // small, medium, large
  children: <div></div>
};

export default Button;
