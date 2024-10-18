import React, { Component, KeyboardEvent } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import defaultLogo from "../../../resources/favicon.png";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/styles";
import { styles } from "./style";
import { Authentication } from "@mov-ai/mov-fe-lib-core";
import LoginFormAdvanced from "./LoginFormAdvanced";
import i18n from "i18next";
import { LoginFormProps } from "./types";

const SELECTED_DOMAIN_KEY = "movai.loggedin-domain";

class LoginForm extends Component<LoginFormProps> {
  state = {
    username: "",
    password: "",
    formErrors: "",
    remember: false,
    capsLockOn: false,
    selectedProvider: Authentication.DEFAULT_PROVIDER,
  };

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  componentDidUpdate(prevProps: LoginFormProps) {
    if (
      !this.hasMultipleDomains() ||
      prevProps.domains.length === this.props.domains.length
    )
      return;
    this.setState({
      selectedProvider:
        localStorage.getItem(SELECTED_DOMAIN_KEY) ||
        Authentication.DEFAULT_PROVIDER,
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
    if (!this.state.password || !this.state.username) return;
    const { username, password, remember, selectedProvider } = this.state;
    this.props.onLoginSubmit({
      username,
      password,
      remember,
      selectedProvider,
    });
  };

  /**
   * Check if caps lock is on
   * @param {Event} event : On key up event
   */
  checkCapsLock = (event: KeyboardEvent) => {
    if (event.key === "CapsLock" && this.state.capsLockOn)
      this.setState({ capsLockOn: false });
    else {
      const capsLock = event.getModifierState("CapsLock");
      this.setState({ capsLockOn: capsLock });
    }
  };

  handleProviderChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const target = e.target as HTMLInputElement;
    this.setState({
      selectedProvider: target.value,
    });
    localStorage.setItem(SELECTED_DOMAIN_KEY, target.value);
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
  onChangeUsername: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    const username = event.target.value || "";
    const errorMessage = !username ? i18n.t("UsernameRequired") : "";
    this.state.username && this.props.onChanges?.();
    this.setState({ username: event.target.value, formErrors: errorMessage });
  };

  /**
   * On change password
   * @param {Event} event : On change event
   */
  onChangePassword: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    const password = event.target.value || "";
    const errorMessage = !password ? i18n.t("PasswordRequired") : "";
    this.state.password && this.props.onChanges?.();
    this.setState({
      password,
      formErrors: errorMessage,
    });
  };

  /**
   * On key up password input
   * @param {Event} event : On keyUp event
   */
  onKeyUpPassword: React.KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    this.checkCapsLock(event);
    if (event.key === "Enter") {
      this.sendCreds();
    }
  };

  hasMultipleDomains = () =>
    this.props.domains?.length > 1 &&
    this.props.domains.some((ap) => ap != Authentication.DEFAULT_PROVIDER);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  render() {
    const {
      classes,
      logo = defaultLogo,
      domains,
      authErrorMessage,
    } = this.props;
    const errorMessage = this.state.formErrors || authErrorMessage;
    return (
      <Grid
        data-testid="section_login-form"
        className={classes.container}
        container
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Paper elevation={10} className={classes.root}>
          <Grid item>
            <img
              data-testid="output_logo"
              src={logo}
              alt="logo"
              className={`center ${classes.logoImage}`}
            />
          </Grid>
          <Grid>
            <Typography align="center" variant="subtitle1" gutterBottom>
              <FormControl
                data-testid="section_form-control"
                className={classes.formControl}
                error={!!errorMessage}
              >
                <InputLabel htmlFor="component-username-error">
                  Username
                </InputLabel>
                <Input
                  inputProps={{ "data-testid": "input_username" }}
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
                  inputProps={{ "data-testid": "input_password" }}
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
                  onProviderChange={this.handleProviderChange}
                />
              )}
            </Typography>
          </Grid>
          <Grid>
            <Typography align="center" gutterBottom>
              <Button data-testid="input_login" onClick={this.sendCreds}>
                Login
              </Button>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginForm);
