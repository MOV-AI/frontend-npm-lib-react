import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/styles";
import { ToggleProps } from "./types";

const useStyles = makeStyles(() => ({
  label: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
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
