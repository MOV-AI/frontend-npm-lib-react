import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { LoginFormAdvancedProps } from "./types";
import i18n from "../../i18n/i18n.js";

const LoginFormAdvanced = (props: LoginFormAdvancedProps) => {
  const [open, setOpen] = useState(true);

  const textFieldEl = open ? (
    <TextField
      id="component-authentication-selector"
      name="internal"
      aria-describedby="component-authentication-error-text"
      value={props.selectedProvider}
      label={i18n.t("Domain")}
      inputProps={{ "data-testid": "input_domain" }}
      select
      onChange={props.onProviderChange}
      disabled={false}
    >
      {props.domains.map(name => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  ) : null;

  return (<>
    <Button
      disableRipple
      className="expand-collapse-button"
      endIcon={open ? <ExpandLess /> : <ExpandMore />}
      onClick={() => setOpen(!open)}
      disabled={!props.domains?.length}
    >
      {i18n.t("Advanced")}
    </Button>
    { textFieldEl }
  </>);
};

export default LoginFormAdvanced;
