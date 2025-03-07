import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ScrollUp from "./ScrollUp";
import KeyBoardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import i18n from "./../../i18n";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: "16px",
      bottom: 0,
      position: "sticky",
      display: "flex",
      justifyContent: "flex-end",
    },
    scroll: {
      fontFamily: "Avenir",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "16px",
      textTransform: "none",
      color: theme.scrollButton?.color,
      backgroundColor:
        theme.scrollButton?.backgroundColor ?? theme.palette.primary.main,
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "50%",
      textAlign: "center",
      width: "50px",
      height: "50px",
      cursor: "pointer",
      zIndex: 1,
      transitionTimingFunction: "linear",
      transitionDuration: "0.2s",
    },
    inner: {
      display: "flex",
      flexDirection: "column",
    },
  };
});

const ScrollButton = (props) => {
  const { className } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ScrollUp className={className + " " + classes.scroll} {...props}>
        <KeyBoardArrowUp></KeyBoardArrowUp>
        <div>{i18n.t("Top")}</div>
      </ScrollUp>
    </div>
  );
};

ScrollButton.propTypes = {
  showUnder: PropTypes.number,
  className: PropTypes.string,
};

ScrollButton.defaultProps = {
  showUnder: 20,
};

export default ScrollButton;
