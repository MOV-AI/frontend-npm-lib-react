import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const Text = props => {
  return <TextField {...props}>{props.children}</TextField>;
};

Text.propTypes = {
  children: PropTypes.node.isRequired
};
Text.defaultProps = {
  children: <div></div>
};

export default Text;
