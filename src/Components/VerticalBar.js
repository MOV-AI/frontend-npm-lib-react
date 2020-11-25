import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100%",
    backgroundColor: props => props.backgroundColor,
    width: props => props.width,
    display: "flex",
    flexDirection: "column"
  },
  logoArea: {
    padding: "17px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  navigationArea: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center"
  },
  accountArea: {
    padding: props => (props.unsetAccountAreaPadding ? "unset" : "17px"),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const VerticalBar = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      <div className={classes.logoArea}>{props.upperElement}</div>
      <div className={classes.navigationArea}>
        {props.navigationList.map((element, index) => {
          return (
            <div key={index} style={{ padding: "15px 0px" }}>
              {element}
            </div>
          );
        })}
      </div>
      <div className={classes.accountArea}>{props.lowerElement}</div>
    </div>
  );
};

VerticalBar.propTypes = {
  upperElement: PropTypes.node.isRequired,
  navigationList: PropTypes.array,
  lowerElement: PropTypes.node.isRequired,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  unsetAccountAreaPadding: PropTypes.bool
};
VerticalBar.defaultProps = {
  upperElement: <div></div>,
  navigationList: [<div></div>],
  lowerElement: <div></div>,
  width: "68px",
  backgroundColor: "#424242",
  unsetAccountAreaPadding: false
};

export default VerticalBar;
