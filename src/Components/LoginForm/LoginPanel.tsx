import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import defaultLogo from "../../resources/favicon.png";

export default
class NotAuthorized extends Component<{
  logo?: string;
  title?: string;
  message: string | React.ElementType;
  progress?: boolean;
}> {
  render() {
    const {
      logo = defaultLogo,
      title = "",
      message = "",
      progress = false
    } = this.props;

    return (<div className="vertical-0 align-items text-align justify-content-space-around">
      <Paper elevation={10}
        data-testid="section_login-panel"
        className="container pad-big vertical-0 border-radius-big align-items size-horizontal-three-fourths"
      >
        <div className="size-horizontal-three-fourths">
          <img
            data-testid="output_logo"
            src={logo}
            alt="logo"
            className="center logo-image size-horizontal-half"
          />
        </div>
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
          variant="subtitle1"
          gutterBottom
          className="size-horizontal-full"
        >
          {message}
          {progress && <LinearProgress color="secondary" />}
        </Typography>
      </Paper>
    </div>);
  }
}
