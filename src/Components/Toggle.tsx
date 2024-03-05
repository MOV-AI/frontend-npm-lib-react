import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { makeStyles } from "@mui/styles";
import { green, grey } from "@mui/material/colors";
import { ToggleProps } from "./types";

const useStyles = makeStyles(_theme => ({
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

const Toggle = (props: ToggleProps) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      data-testid="section_toggle"
      control={
        <Switch
          data-testid="input_switch"
          checked={props.toggle}
          onChange={props.onToggle}
          color={props.color || "primary"}
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

export default Toggle;
