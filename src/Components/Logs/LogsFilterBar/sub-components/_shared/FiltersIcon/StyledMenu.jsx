import React from "react";
import { makeStyles } from "@mui/styles";
import Popover from "@mui/material/Popover";

const magic = makeStyles({
  styledMenuPaper: {
    borderRadius: "8px",
    width: "242px",
    height: "411px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)"
  }
});

export default
function StyledMenu(props) {
  return (<Popover
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
    classes={magic}
    {...props}
  />);
}
