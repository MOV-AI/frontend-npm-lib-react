import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import defaultLogo from "./movai_red.svg";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Authentication } from "@mov-ai/mov-fe-lib-core";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    padding: theme.spacing(4, 4),
    borderRadius: 40
  },
  formControl: {
    width: "50%"
  }
});

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    error: false,
    errorMessage: "",
    capsLockOn: false,
    advancedMenuOpen: false,
    authenticationProvider: Authentication.DEFAULT_PROVIDER
  };

  sendCreds = async () => {
    if (!this.state.password) return;
    try {
      const apiResponse = await Authentication.login(
        this.state.username,
        this.state.password,
        this.state.remember,
        this.state.authenticationProvider
      );
      // If successfully logged in
      if (!apiResponse.error) {
        this.props.setLoggedIn(true);
      } else {
        // Show the error in red
        this.setState({
          error: true,
          errorMessage: apiResponse.error
        });
      }
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: e
      });
    }
  };

  checkCapsLock = event => {
    if (event.key === "CapsLock" && this.state.capsLockOn)
      this.setState({ capsLockOn: false });
    else {
      const capsLock = event.getModifierState("CapsLock");
      this.setState({ capsLockOn: capsLock });
    }
  };

  handleAuthenticationProviderChange = e => {
    this.setState({
      authenticationProvider: e.target.value
    });
  };

  handleAdvancedMenuToggle = () => {
    this.setState({
      advancedMenuOpen: !this.state.advancedMenuOpen
    });
  };

  render() {
    const { classes, logo, authenticationProviders } = this.props;
    return (
      <Grid
        style={{ paddingTop: "5%" }}
        container
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Paper elevation={10} className={classes.root}>
          <Grid item>
            <img
              src={logo}
              className="center"
              alt="logo"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%"
              }}
            />
          </Grid>
          <Grid>
            <Typography align="center" variant="subtitle1" gutterBottom>
              <FormControl
                className={classes.formControl}
                error={this.state.error}
              >
                <InputLabel htmlFor="component-username-error">
                  Username
                </InputLabel>
                <Input
                  id="component-username-error"
                  value={this.state.username}
                  aria-describedby="component-username-error-text"
                  onChange={event =>
                    this.setState({ username: event.target.value })
                  }
                />
              </FormControl>
            </Typography>
          </Grid>
          <Grid>
            <Typography align="center" variant="subtitle1" gutterBottom>
              <FormControl
                className={classes.formControl}
                error={this.state.error}
              >
                <InputLabel htmlFor="component-password-error">
                  Password
                </InputLabel>
                <Input
                  required
                  id="component-password-error"
                  type="password"
                  value={this.state.password}
                  aria-describedby="component-password-error-text"
                  onChange={event => {
                    const isEmptyPassword = event.target.value === "";
                    const errorMessage = isEmptyPassword
                      ? "Password is required"
                      : "";
                    this.setState({
                      password: event.target.value,
                      error: isEmptyPassword,
                      errorMessage
                    });
                  }}
                  onKeyUp={event => {
                    this.checkCapsLock(event);
                    if (event.key === "Enter") {
                      this.sendCreds();
                    }
                  }}
                />
                {this.state.error && (
                  <FormHelperText id="component-error-text">
                    {this.state.errorMessage}
                  </FormHelperText>
                )}
                {this.state.capsLockOn && (
                  <FormHelperText id="component-warning-text">
                    Warning: Caps lock is ON!
                  </FormHelperText>
                )}
              </FormControl>
            </Typography>
          </Grid>
          <Grid>
            <Typography align="center" variant="subtitle1" gutterBottom>
              <div style={{ flexGrow: 1 }}>
                <Button
                  className={classes.formControl}
                  endIcon={
                    this.state.advancedMenuOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  }
                  onClick={this.handleAdvancedMenuToggle}
                  disabled={!authenticationProviders?.length}
                >
                  Advanced
                </Button>
                {authenticationProviders?.length > 0 && (
                  <Collapse in={this.state.advancedMenuOpen}>
                    <List dense={true} component="div">
                      <Typography component="div">
                        <Grid
                          container
                          style={{ padding: "20px", justifyContent: "center" }}
                        >
                          <FormControl
                            className={classes.formControl}
                            error={
                              this.state.authenticationProvider == null ||
                              this.state.authenticationProvider == undefined
                            }
                          >
                            <InputLabel htmlFor="component-authentication-selector">
                              Authentication
                            </InputLabel>
                            <Select
                              id="component-authentication-selector"
                              aria-describedby="component-authentication-error-text"
                              value={this.state.authenticationProvider}
                              onChange={this.handleAuthenticationProviderChange}
                              disabled={false}
                            >
                              {authenticationProviders.map(({ id, text }) => (
                                <MenuItem key={id} value={id}>
                                  {text}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Typography>
                    </List>
                  </Collapse>
                )}
              </div>
            </Typography>
          </Grid>
          <Grid>
            <Typography align="center" gutterBottom>
              <Button onClick={() => this.sendCreds()}>Login</Button>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

LoginForm.propTypes = {
  authenticationProviders: PropTypes.array,
  logo: PropTypes.any, // expects a svg element
  setLoggedIn: PropTypes.func
};

LoginForm.defaultProps = {
  authenticationProviders: [],
  logo: defaultLogo,
  setLoggedIn: loggedIn => console.log(loggedIn)
};

export default withStyles(styles, { withTheme: true })(LoginForm);
