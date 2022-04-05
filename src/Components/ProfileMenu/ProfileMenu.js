import React, { useState, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import PropTypes from "prop-types";
import Toggle from "../Toggle";
import { profileMenuStyles } from "./styles";
import Divider from "@material-ui/core/Divider";
import { Typography, Tooltip } from "@material-ui/core";
import i18n from "../../i18n/i18n.js";

const ProfileMenu = props => {
  // State hooks
  const [anchorEl, setAnchorEl] = useState(null);
  // Other hooks
  const classes = profileMenuStyles();
  // Props
  const {
    welcomeLabel,
    userName,
    extraItems,
    handleToggleTheme,
    darkThemeLabel,
    isDarkTheme,
    handleLogout,
    logoutLabel,
    version
  } = props;

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Handle click to open ProfileMenu
   * @param {Event} event : Click event
   */
  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  /**
   * Handle close ProfileMenu
   */
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  /**
   * Handle Logout click
   */
  const handleLogoutClick = useCallback(() => {
    handleLogout();
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div>
      <Tooltip title={i18n.t("Settings")}>
        <IconButton aria-haspopup="true" onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography component="div" variant="body1">
          <div className={classes.menuItemSpacing}>
            {welcomeLabel}, {userName}
          </div>
          <Divider variant="middle" />
          {extraItems?.map(item => (
            <MenuItem className={classes.menuItemSpacing} onClick={item.func}>
              {item.label}
            </MenuItem>
          ))}
          <Divider variant="middle" />
          {handleToggleTheme && (
            <div className={classes.menuItemSpacing}>
              {darkThemeLabel}
              <Toggle
                onToggle={handleToggleTheme}
                toggle={isDarkTheme}
              ></Toggle>
            </div>
          )}
          <MenuItem
            className={(classes.menuItemSpacing, classes.cursorPointer)}
            onClick={handleLogoutClick}
          >
            {logoutLabel}
          </MenuItem>
          <Divider variant="middle" />
          <div
            className={`${classes.menuItemSpacing} ${classes.profileMenuFooter}`}
          >
            {version}
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
