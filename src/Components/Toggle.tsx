import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
{/* import { green, grey } from "@material-ui/core/colors"; */}
import { ToggleProps } from "./types";

makeMagic({
  toggle: {
    label: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0
    },
    // colorSwitchBase: {
    //   color: grey[300],
    //   "&$colorChecked": {
    //     color: green[500],
    //     "& + $colorBar": {
    //       backgroundColor: green[500]
    //     }
    //   }
    // },
    colorBar: {},
    colorChecked: {},
  },
});

const Toggle = (props: ToggleProps) => {
  return (
    <FormControlLabel
      className="toggle"
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
            switchBase: "color-switch-base",
            checked: "color-checked",
            track: "color-bar",
          }}
        />
      }
      labelPlacement={props.labelPlacement}
      label={props.label}
      classes={{ label: "label" }}
      style={{ ...props.style, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
    />
  );
};

export default Toggle;
