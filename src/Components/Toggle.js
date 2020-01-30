import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  label: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px"
  }
}));

const Toggle = props => {
  const classes = useStyles();
  console.log("props", props);
  return (
    <FormControlLabel
      control={
        <Switch
          checked={props.toggle}
          onChange={props.onToggle}
          color={props.color}
        />
      }
      labelPlacement="start"
      label={props.label}
      classes={{ label: classes.label }}
      style={props.style}
    />
  );
};

Toggle.propTypes = {
  toggle: PropTypes.bool,
  onToggle: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object
};
Toggle.defaultProps = {
  label: undefined,
  color: "primary" // or secondary
};

export default Toggle;
