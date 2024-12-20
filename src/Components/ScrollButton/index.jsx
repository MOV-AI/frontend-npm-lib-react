import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ScrollUp from "./ScrollUp";
import KeyBoardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import i18n from "./../../i18n";

const useStyles = makeStyles((theme) => {
  return {
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
    },
    inner: {
      display: "flex",
      flexDirection: "column",
    },
  };
});

const defaultClassName =
  " round size-50 text-align align-items position-absolute" +
  " scroll-button right cursor z-index-1 transition-linear-smallest vertical-0 ";

const ScrollButton = (props) => {
  const { className } = props;
  const classes = useStyles();
  return (
    <div className="scroll-button">
      <ScrollUp
        className={className + defaultClassName + classes.scroll}
        {...props}
      >
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
