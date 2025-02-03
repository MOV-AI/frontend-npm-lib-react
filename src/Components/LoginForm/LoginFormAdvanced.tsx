import React, { useState } from "react";
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
import { advancedSectionStyles } from "./style";
import { makeStyles } from "./../../hooks/makeStyles";
import i18n from "i18next";
import { LoginFormAdvancedProps } from "./types";

const advancedLoginStyles = makeStyles(advancedSectionStyles);

const LoginFormAdvanced = (props: LoginFormAdvancedProps) => {
  const classes = advancedLoginStyles();
  const [open, setOpen] = useState(true);

  return (
    <div className={classes.container}>
      <Button
        disableRipple
        className={classes.expandCollapseButton}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setOpen(!open)}
        disabled={!props.domains?.length}
      >
        <InputLabel className={classes.label}>
          {i18n.t("Advanced") as string}
        </InputLabel>
      </Button>
      <Collapse in={open}>
        <List dense={true} component="div">
          <Typography component="div">
            <Grid container className={classes.grid}>
              <FormControl
                className={classes.formControl}
                error={
                  props.selectedProvider == null ||
                  props.selectedProvider == undefined
                }
              >
                <InputLabel htmlFor="component-authentication-selector">
                  {i18n.t("Domain") as string}
                </InputLabel>
                <Select
                  id="component-authentication-selector"
                  aria-describedby="component-authentication-error-text"
                  value={props.selectedProvider}
                  inputProps={{ "data-testid": "input_domain" }}
                  classes={{ root: classes.providerSelectorInput }}
                  onChange={props.onProviderChange}
                  disabled={false}
                >
                  {props.domains.map((name) => (
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
