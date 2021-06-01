import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles(theme => ({
  drawerClose: {
    overflowX: "hidden",
    width: 65
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
    <Drawer
      open={false}
      variant="permanent"
      className={classes.drawerClose}
      classes={{
        paper: classes.drawerClose
      }}
    >
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
    </Drawer>
  );
};

VerticalBar.propTypes = {
  upperElement: PropTypes.node,
  navigationList: PropTypes.array,
  lowerElement: PropTypes.node.isRequired,
  unsetAccountAreaPadding: PropTypes.bool
};
VerticalBar.defaultProps = {
  upperElement: <div></div>,
  navigationList: [<div></div>],
  lowerElement: <div></div>,
  unsetAccountAreaPadding: false
};

export default VerticalBar;
