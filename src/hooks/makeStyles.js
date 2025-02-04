import React from "react";
import { makeStyles as baseMakeStyles } from "@mui/styles";
import { themeSub } from "./../Components/HOCs/withTheme";

export function makeStyles(styles) {
  return () => {
    const sub = themeSub.use();
    const theme = sub.themeName;
    const muiTheme = sub.ApplicationTheme[theme];
    const useStyles = baseMakeStyles(
      typeof styles === "object" ? styles : styles(muiTheme),
    );
    return useStyles(muiTheme);
  };
}

export function withStyles(styles) {
  return function WithStyles(Component) {
    return function StyledComponent(props) {
      const sub = themeSub.use();
      const theme = sub.themeName;
      const muiTheme = sub.ApplicationTheme[theme];
      const useStyles = baseMakeStyles(
        typeof styles === "object" ? styles : styles(muiTheme),
      );
      const classes = useStyles(muiTheme);
      return <Component classes={classes} {...props} />;
    };
  };
}
