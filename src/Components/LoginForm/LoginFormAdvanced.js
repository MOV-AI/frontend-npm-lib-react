import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import { advancedSectionStyles } from "./style";
import { makeStyles } from "@material-ui/core";

const advancedLoginStyles = makeStyles(advancedSectionStyles);

const LoginFormAdvanced = props => {
  const classes = advancedLoginStyles();
  const [open, setOpen] = useState(false);

  return (
    <div classes={classes.container}>
      <Button
        className={classes.expandCollapseButton}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setOpen(!open)}
        disabled={!props.providers?.length}
      >
        <InputLabel className={classes.label}>Advanced</InputLabel>
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
                  Domain
                </InputLabel>
                <Select
                  id="component-authentication-selector"
                  aria-describedby="component-authentication-error-text"
                  value={props.selectedProvider}
                  classes={{ root: classes.providerSelectorInput }}
                  onChange={props.onProviderChange}
                  disabled={false}
                >
                  {props.providers.map(name => (
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

LoginFormAdvanced.propTypes = {
  selectedProvider: PropTypes.string,
  providers: PropTypes.array,
  onProviderChange: PropTypes.func
};

export default LoginFormAdvanced;
