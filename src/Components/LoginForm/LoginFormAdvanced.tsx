import React, { useState } from "react";
import { makeMagic } from "@tty-pt/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { LoginFormAdvancedProps } from "./types";

makeMagic({
  loginFormAdvanced: {
    flexGrow: 1,
    formControl: {
      width: "40%"
    },
    expandCollapseButton: {
      width: "40%",
      justifyContent: "space-between",
      paddingLeft: "1px",
      paddingRight: "0px",
      marginTop: "12px",
      "&:focus-visible": {
        backgroundColor: "rgba(0, 0, 0, 0.04)"
      }
    },
    label: {
      fontSize: "11px"
    },
    providerSelectorInput: {
      display: "flex"
    },
    grid: {
      justifyContent: "center"
    }
  }
});

const LoginFormAdvanced = (props: LoginFormAdvancedProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  return (
    <div className="login-form-advanced">
      <Button
        disableRipple
        className="expand-collapse-button"
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setOpen(!open)}
        disabled={!props.domains?.length}
      >
        <InputLabel className="label">{t("Advanced")}</InputLabel>
      </Button>
      <Collapse in={open}>
        <List dense={true} component="div">
          <Typography component="div">
            <Grid container className="grid">
              <FormControl
                className="form-control"
                error={
                  props.selectedProvider == null ||
                  props.selectedProvider == undefined
                }
              >
                <InputLabel htmlFor="component-authentication-selector">
                  {t("Domain")}
                </InputLabel>
                <Select
                  id="component-authentication-selector"
                  aria-describedby="component-authentication-error-text"
                  value={props.selectedProvider}
                  inputProps={{ "data-testid": "input_domain" }}
                  classes={{ root: "provider-selector-input" }}
                  onChange={props.onProviderChange}
                  disabled={false}
                >
                  {props.domains.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Typography>
        </List>
      </Collapse>
    </div>
  );
};

export default LoginFormAdvanced;
