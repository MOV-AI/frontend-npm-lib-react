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

const SELECTED_DOMAIN_KEY = "movai.loggedin-domain";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    formErrors: "",
    remember: false,
    capsLockOn: false,
    selectedProvider: Authentication.DEFAULT_PROVIDER
  };

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  componentDidUpdate(prevProps) {
    if (
      !this.hasMultipleDomains() ||
      prevProps.domains.length === this.props.domains.length
    )
      return;
    this.setState({
      selectedProvider:
        localStorage.getItem(SELECTED_DOMAIN_KEY) ||
        Authentication.DEFAULT_PROVIDER
    });
  }

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
    const { username, password, remember, selectedProvider } = this.state;
    this.props.onLoginSubmit({
      username,
      password,
      remember,
      selectedProvider
    });
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
    localStorage.setItem(SELECTED_DOMAIN_KEY, e.target.value);
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
    this.state.username && this.props.onChanges();
    this.setState({ username: event.target.value });
  };

  /**
   * On change password
   * @param {Event} event : On change event
   */
  onChangePassword = event => {
    const password = event.target.value;
    const isEmptyPassword = password === "";
    const errorMessage = isEmptyPassword ? "Password is required" : "";
    this.state.password && this.props.onChanges();
    this.setState({
      password,
      formErrors: errorMessage
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

  hasMultipleDomains = () =>
    this.props.domains?.length > 1 &&
    this.props.domains.some(ap => ap != Authentication.DEFAULT_PROVIDER);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  render() {
    const { classes, logo, domains, authErrorMessage } = this.props;
    const errorMessage = this.state.formErrors || authErrorMessage;
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
                error={!!errorMessage}
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
                error={!!errorMessage}
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
                {errorMessage && (
                  <FormHelperText id="component-error-text">
                    {errorMessage}
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
              {this.hasMultipleDomains() && (
                <LoginFormAdvanced
                  selectedProvider={this.state.selectedProvider}
                  domains={domains}
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
  domains: PropTypes.array,
  logo: PropTypes.any, // expects a svg element
  permissionErrors: PropTypes.string,
  onLoginSubmit: PropTypes.func,
  onChanges: PropTypes.func
};

LoginForm.defaultProps = {
  domains: [],
  logo: defaultLogo,
  permissionErrors: "",
  onLoginSubmit: () => {},
  onChanges: () => {}
};

export default withStyles(styles, { withTheme: true })(LoginForm);
