import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import defaultLogo from "./movai_red.svg";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    padding: theme.spacing(4, 4),
    borderRadius: 40
  }
});

class NotAuthorized extends Component {
  render() {
    const { classes, logo, title, message, progress } = this.props;

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
            <Typography align="center" variant="h2" gutterBottom>
              {title}
            </Typography>
            <Typography align="center" variant="subtitle1" gutterBottom>
              {message}
              {progress && <LinearProgress />}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

NotAuthorized.propTypes = {
  logo: PropTypes.any, // expects a svg element
  title: PropTypes.string,
  message: PropTypes.string,
  progress: PropTypes.bool
};

NotAuthorized.defaultProps = {
  logo: defaultLogo,
  title: "",
  message: "",
  progress: false
};

export default withStyles(styles, { withTheme: true })(NotAuthorized);
