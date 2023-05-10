import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { LoginFormAdvancedProps } from "./types";

const LoginFormAdvanced = (props: LoginFormAdvancedProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const textFieldEl = open ? (
    <TextField
      id="component-authentication-selector"
      aria-describedby="component-authentication-error-text"
      value={props.selectedProvider}
      label={t("Domain")}
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
      {t("Advanced")}
    </Button>
    { textFieldEl }
  </>);
};

export default LoginFormAdvanced;
