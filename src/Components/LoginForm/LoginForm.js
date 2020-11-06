import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import defaultLogo from "./movai_red.svg";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import { Authentication } from "mov-fe-lib-core";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    padding: theme.spacing(4, 4),
    borderRadius: 10
  }
});

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    error: false,
    errorMessage: ""
  };

  sendCreds = async () => {
    try {
      const apiResponse = await Authentication.login(
        this.state.username,
        this.state.password,
        this.state.remember
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
      this.props.setLoggedIn(false);
    }
  };

  render() {
    const { classes, logo } = this.props;

    return (
      <Grid
        style={{ paddingTop: "5%" }}
        container
        direction="column"
        alignItems="center"
        justify="space-evenly"
      >
        <Paper elevation={10} className={classes.root}>
          <Grid item>
            <img
              src={logo ? logo : defaultLogo}
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
                <InputLabel htmlFor="component-error">Username</InputLabel>
                <Input
                  id="component-error"
                  value={this.state.username}
                  aria-describedby="component-error-text"
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
                <InputLabel htmlFor="component-error">Password</InputLabel>
                <Input
                  id="component-error"
                  type="password"
                  value={this.state.password}
                  aria-describedby="component-error-text"
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                  onKeyPress={event => {
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
              </FormControl>
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
  logs: PropTypes.any, // expects a svg element
  setLoggedIn: PropTypes.func
};

LoginForm.defaultProps = {
  setLoggedIn: loggedIn => console.log(loggedIn)
};

export default withStyles(styles, { withTheme: true })(LoginForm);
