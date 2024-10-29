import React from "react";
import TextField from "@mui/material/TextField";

const Text = (props) => {
  return (
    <TextField
      inputProps={{ "data-testid": "input_textfield" }}
      {...props}
    ></TextField>
  );
};

Text.propTypes = {};
Text.defaultProps = {};

export default Text;
