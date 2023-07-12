import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import defaultLogo from "../../../resources/favicon.png";

export default
class NotAuthorized extends Component<{
  logo?: string;
  title?: string;
  message: string | JSX.Element;
  progress?: boolean;
}> {
  render() {
    const {
      logo = defaultLogo,
      title = "",
      message = "",
      progress = false
    } = this.props;

    return (
      <Grid
        data-testid="section_login-panel"
        className="container"
        container
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Paper elevation={10} className="root">
          <Grid item>
            <img
              data-testid="output_logo"
              src={logo}
              alt="logo"
              className="center logo-image"
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
