import React from "react";
import { Paper } from "@material-ui/core";
import i18n from "./../i18n";
import HomeMenuPopper from "./HomeMenu/HomeMenu";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "4px",
    alignItems: "center",
    borderRadius: "0px",
    display: "flex",
  },
  title: {
    fontSize: "1.3em",
    flexGrow: 1,
  },
}));

export default function TopBar(props) {
  const { title = i18n.t("Mov.ai Application"), children = [] } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <HomeMenuPopper />

      <span className={classes.title}>{title}</span>

      {children}
    </Paper>
  );
}
