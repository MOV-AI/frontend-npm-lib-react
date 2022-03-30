import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import defaultLogo from "../../../resources/favicon.png";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import { Authentication } from "@mov-ai/mov-fe-lib-core";
import PropTypes from "prop-types";
import LoginFormAdvanced from "./LoginFormAdvanced";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    error: false,
    errorMessage: "",
    capsLockOn: false,
    selectedProvider: Authentication.DEFAULT_PROVIDER
  };

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * Call authentication login method to send credentials
   */
  sendCreds = async () => {
    if (!this.state.password) return;
    try {
      const apiResponse = await Authentication.login(
        this.state.username,
        this.state.password,
        this.state.remember,
        this.state.selectedProvider
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

  /**
   * Check if caps lock is on
   * @param {Event} event : On key up event
   */
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
      selectedProvider: e.target.value
    });
  };

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * On change username
   * @param {Event} event : On change event
   */
  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  /**
   * On change password
   * @param {Event} event : On change event
   */
  onChangePassword = event => {
    const isEmptyPassword = event.target.value === "";
    const errorMessage = isEmptyPassword ? "Password is required" : "";
    this.setState({
      password: event.target.value,
      error: isEmptyPassword,
      errorMessage
    });
  };

  /**
   * On key up password input
   * @param {Event} event : On keyUp event
   */
  onKeyUpPassword = event => {
    this.checkCapsLock(event);
    if (event.key === "Enter") {
      this.sendCreds();
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  render() {
    const { classes, logo, authenticationProviders } = this.props;
    const showAdvancedSection =
      authenticationProviders?.length > 1 &&
      authenticationProviders.some(ap => ap != Authentication.DEFAULT_PROVIDER);
    return (
      <Grid
        className={classes.container}
        container
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Paper elevation={10} className={classes.root}>
          <Grid item>
            <img
              src={logo}
              alt="logo"
              className={`center ${classes.logoImage}`}
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
                  onChange={this.onChangeUsername}
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
                  onChange={this.onChangePassword}
                  onKeyUp={this.onKeyUpPassword}
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
              {showAdvancedSection && (
                <LoginFormAdvanced
                  selectedProvider={this.state.selectedProvider}
                  providers={authenticationProviders}
                  onProviderChange={this.handleAuthenticationProviderChange}
                />
              )}
            </Typography>
          </Grid>
          <Grid>
            <Typography align="center" gutterBottom>
              <Button onClick={this.sendCreds}>Login</Button>
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
