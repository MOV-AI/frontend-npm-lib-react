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
    fontSize: "14px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  colorSwitchBase: {
    color: grey[300],
    "&$colorChecked": {
      color: green[500],
      "& + $colorBar": {
        backgroundColor: green[500]
      }
    }
  },
  colorBar: {},
  colorChecked: {}
}));

const Toggle = props => {
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Switch
          checked={props.toggle}
          onChange={props.onToggle}
          color={props.color}
          disabled={props.disabled}
          hidden={props.hidden}
          size={props.size}
          classes={{
            switchBase: classes.colorSwitchBase,
            checked: classes.colorChecked,
            track: classes.colorBar
          }}
        />
      }
      labelPlacement={props.labelPlacement}
      label={props.label}
      classes={{ label: classes.label }}
      style={{ ...props.style, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
    />
  );
};

Toggle.propTypes = {
  toggle: PropTypes.bool,
  onToggle: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
  labelPlacement: PropTypes.string, // 'end', 'start', 'top', 'bottom'
  style: PropTypes.object
};
Toggle.defaultProps = {
  color: "primary" // or secondary
};

export default Toggle;
