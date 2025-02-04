import React from "react";
import { withStyles } from "./../../../../../../hooks/makeStyles";
import { Popover } from "@mui/material";

const StyledMenu = withStyles((_theme) => ({
  paper: {
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  },
}))((props) => (
  <Popover
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    autoFocus={false}
    {...props}
  />
));

export default StyledMenu;
