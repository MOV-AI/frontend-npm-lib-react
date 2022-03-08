import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import PropTypes from "prop-types";
import Toggle from "./Toggle";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Typography, Tooltip } from "@material-ui/core";
import i18n from "../i18n/i18n.js";

const useStyles = makeStyles(theme => {
  return {
    menuItemSpacing: {
      fontSize: "18px",
      minHeight: "18px",
      padding: theme.spacing(1.25, 2),
      ...theme.cursorDefault
    },
    profileMenuFooter: {
      fontSize: "14px",
      textAlign: "end"
    }
  };
});

const ProfileMenu = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title={i18n.t("Settings")}>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography component="div" variant="body1">
          <div className={classes.menuItemSpacing}>
            {props.welcomeLabel}, {props.userName}
          </div>
          <Divider variant="middle" />
          {props.extraItems?.map(item => (
            <MenuItem
              className={classes.menuItemSpacing}
              onClick={() => item.func()}
            >
              {item.label}
            </MenuItem>
          ))}
          {props.handleToggleTheme && (
            <div className={classes.menuItemSpacing}>
              {props.darkThemeLabel}
              <Toggle
                onToggle={props.handleToggleTheme}
                toggle={props.isDarkTheme}
              ></Toggle>
            </div>
          )}
          <MenuItem
            className={(classes.menuItemSpacing, classes.cursorPointer)}
            onClick={props.handleLogout}
          >
            {props.logoutLabel}
          </MenuItem>
          <Divider variant="middle" />
          <div
            className={
              classes.menuItemSpacing + " " + classes.profileMenuFooter
            }
          >
            {props.version}
          </div>
        </Typography>
      </Menu>
    </div>
  );
};
ProfileMenu.propTypes = {
  welcomeLabel: PropTypes.string,
  userName: PropTypes.string,
  darkThemeLabel: PropTypes.string,
  logoutLabel: PropTypes.string,
  version: PropTypes.string,
  extraItems: PropTypes.array,
  isDarkTheme: PropTypes.bool,
  handleLogout: PropTypes.func,
  handleToggleTheme: PropTypes.func
};

ProfileMenu.defaultProps = {
  welcomeLabel: "Hello",
  userName: "User",
  darkThemeLabel: "Dark Theme",
  logoutLabel: "Logout",
  version: "",
  extraItems: [],
  isDarkTheme: true,
  handleLogout: () => console.log("logout")
};

export default ProfileMenu;
