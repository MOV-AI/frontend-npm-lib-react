import React, { Component, KeyboardEvent } from "react";
import { withStyles, Svg } from "@tty-pt/styles";
import { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
{/* import defaultLogo from "../../resources/favicon.png"; */}
import LogoSvg from "../../resources/Logo";
import { authSub, loggedOutInfo } from "../HOCs/withAuthentication";
import Authentication from "@mov-ai/mov-fe-lib-core/api/Authentication/Authentication";
import LoginFormAdvanced from "./LoginFormAdvanced";
import { withTranslation } from "react-i18next";
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
    if (!this.state.password || !this.state.username) return;
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
  checkCapsLock = (event: KeyboardEvent) => {
    if (event.key === "CapsLock" && this.state.capsLockOn)
      this.setState({ capsLockOn: false });
    else {
      const capsLock = event.getModifierState("CapsLock");
      this.setState({ capsLockOn: capsLock });
    }
  };

  handleProviderChange = (
    e: SelectChangeEvent<string>
  ) => {
    const target = e.target as HTMLInputElement;
    this.setState({
      selectedProvider: target.value
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
  > = event => {
    const username = event.target.value || "";
    const errorMessage = !username ? this.props.t("UsernameRequired") : "";
    this.state.username && this.props.onChanges?.();
    this.setState({ username: event.target.value, formErrors: errorMessage });
  };

  /**
   * On change password
   * @param {Event} event : On change event
   */
  onChangePassword: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = event => {
    const password = event.target.value || "";
    const errorMessage = !password ? this.props.t("Password is required") : "";
    this.state.password && this.props.onChanges?.();
    this.setState({
      password,
      formErrors: errorMessage
    });
  };

  /**
   * On key up password input
   * @param {Event} event : On keyUp event
   */
  onKeyUpPassword: React.KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = event => {
    this.checkCapsLock(event);
    if (event.key === "Enter") {
      this.sendCreds();
    }
  };

  toggleShowPassword() {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  }

  hasMultipleDomains = () =>
    this.props.domains?.length > 1 &&
    this.props.domains.some(ap => ap != Authentication.DEFAULT_PROVIDER);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  render() {
    const {
      domains,
      authErrorMessage
    } = this.props;
    const errorMessage = this.state.formErrors || authErrorMessage;
    return (
      <div
        className="pad-big min-size-vertical-view-big-neg vertical-0 align-items justify-content-space-around text-align subtitle-1"
        data-testid="section_login-form"
      >
        <LogoSvg />
        <Paper elevation={10} className="login-form vertical-big border-radius-small size-horizontal-three-fourths max-size-horizontal-550 relative">
          <div className="text-align-left">Sign in to mov.ai account</div>

          <TextField
            inputProps={{ "data-testid": "input_username" }}
            id="component-username-error"
            value={this.state.username}
            label="Username"
            variant="outlined"
            aria-describedby="component-username-error-text"
            onChange={this.onChangeUsername}
          />

          <TextField
            inputProps={{ "data-testid": "input_password" }}
            required
            variant="outlined"
            id="component-password-error"
            type={this.state.showPassword ? "text" : "password"}
            label="Password"
            value={this.state.password}
            aria-describedby="component-password-error-text"
            onChange={this.onChangePassword}
            onKeyUp={this.onKeyUpPassword}
            InputProps={{
              endAdornment: (<InputAdornment position="end"> {(this.state.showPassword
                ? <VisibilityOff className = "cursor" onClick={() => this.toggleShowPassword()} />
                : <Visibility className="cursor" onClick={() => this.toggleShowPassword()} />
                )} </InputAdornment>),
            }}
          />

          <div className="font-size-17 margin-top-medium-neg text-align-left color-primary">Forgot password</div>

          {errorMessage && (
            <FormHelperText className="color-error-light" id="component-error-text">
              {errorMessage}
            </FormHelperText>
          )}

          {this.state.capsLockOn && (
            <FormHelperText id="component-warning-text">
              Warning: Caps lock is ON!
            </FormHelperText>
          )}

          { this.hasMultipleDomains() && (
            <LoginFormAdvanced
              selectedProvider={this.state.selectedProvider}
              domains={domains}
              onProviderChange={this.handleProviderChange}
            />
          ) }

          <Button color="primary" className="size-horizontal" data-testid="input_login" onClick={this.sendCreds}>
            Login
          </Button>

          <IconButton
            className="absolute position-right-0 position-top-0"
            onClick={() => authSub.update({ ...loggedOutInfo, loading: false, loggedIn: true, apps: [this.props.appName] })}
            title="Exit"
          >
            <CloseIcon />
          </IconButton>
        </Paper>
        <div />
      </div>
    );
  }
}

export default withTranslation()(withStyles(theme => ({
  loginForm: {
    background: theme.palette.background.grad,
    padding: "86px",
    width: "calc(438px - 2 * 86px)",
    root: {
      // padding: theme.spacing(4, 4), // TODO replace with "pad"
      borderRadius: 40
    },
    logoImage: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    },
    formControl: {
      width: "40%"
    }
  },
  "!login-form .MuiOutlinedInput-root input": {
    padding: "10px",
    fontSize: "14px",
  },
  "!login-form .MuiOutlinedInput-root input:-webkit-autofill": {
    transition: "background-color 600000s 0s, color 600000s 0s",
  },
  "!login-form .MuiOutlinedInput-root input:-webkit-autofill:focus": {
    transition: "background-color 600000s 0s, color 600000s 0s",
  },
  "!login-form .MuiSelect-select": {
    padding: "10px",
    textAlign: "left",
  },
  "!login-form .MuiTextField-root .MuiFormLabel-root": {
    top: "-6px",
    left: "-4px",
  },
  "!login-form .MuiButtonBase-root .MuiFormLabel-root": { fontSize: "0.875rem" },
  "!login-form .MuiTextField-root .MuiInputLabel-shrink": {
    top: "0px",
    left: "2px",
  },
}))(LoginForm));
