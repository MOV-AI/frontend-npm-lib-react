import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { styles } from "./style";
import defaultLogo from "../../../resources/favicon.png";

class NotAuthorized extends Component<{
  classes: { [className: string]: string };
  logo?: string;
  title?: string;
  message: string | JSX.Element;
  progress?: boolean;
}> {
  render() {
    const {
      classes,
      logo = defaultLogo,
      title = "",
      message = "",
      progress = false,
    } = this.props;

    return (
      <Grid
        data-testid="section_login-panel"
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
            <Typography
              data-testid="output_title"
              align="center"
              variant="h2"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              data-testid="output_message"
              align="center"
              variant="subtitle1"
              gutterBottom
            >
              {message}
              {progress && <LinearProgress color="secondary" />}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NotAuthorized);
