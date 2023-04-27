import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@mui/material/Popover";

const StyledMenu = withStyles(_theme => ({
  paper: {
    borderRadius: "8px",
    width: "242px",
    height: "411px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)"
  }
}))(props => (
  <Popover
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    autoFocus={false}
    {...props}
  />
));

export default StyledMenu;
