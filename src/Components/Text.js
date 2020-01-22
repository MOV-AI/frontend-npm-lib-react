import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const Text = props => {
  return <TextField {...props}></TextField>;
};

Text.propTypes = {};
Text.defaultProps = {};

export default Text;
