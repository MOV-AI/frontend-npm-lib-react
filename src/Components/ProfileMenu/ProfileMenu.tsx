import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MutableRefObject
} from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import { User } from "@mov-ai/mov-fe-lib-core";
import Toggle from "../Toggle";
import { profileMenuStyles } from "./styles";
import i18n from "../../i18n/i18n.js";
import ResetPasswordModal from "./ResetPassword";
import { ProfileMenuProps } from "./types";

function getCustomMenuElements(menuItemConf: any, classes: any) {
  return Object.entries(menuItemConf ?? {}).map(
    ([key, menuItem]: [string, any]) => {
      if (React.isValidElement(menuItem)) return menuItem;

      return (
        <MenuItem
          key={key}
          data-testid={"input_" + key}
          className={classes.menuItemSpacing}
          onClick={menuItem.handler}
        >
          {i18n.t(menuItem.title)}
        </MenuItem>
      );
    }
  );
}

const ProfileMenu = (props: ProfileMenuProps) => {
  // Props
  const {
    welcomeLabel = "Hello",
    darkThemeLabel = "Dark Theme",
    logoutLabel = "Logout",
    version = "",
    extraItems = [],
    menuItemConf,
    isMenuOpen,
    handleLogout = () => console.log("logout"),
    handleToggleTheme,
    onClose,
    className,
  } = props;

  // State hooks
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  // Other hooks
  const triggerButtonRef = useRef<HTMLElement>();
  const menuOpenAnimation: MutableRefObject<number | "auto"> = useRef("auto");
  const user = useMemo(() => new User(), []);
  const classes = profileMenuStyles();
  // Refs
  const resetModalRef = useRef<{ open: Function }>();

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
    onClose && onClose();
  }, [onClose]);

  /**
   * Open Password Reset modal
   */
  const handlePasswordReset = useCallback(() => {
    resetModalRef.current?.open();
    handleClose();
  }, [handleClose]);

  /*
   * Handle Logout click
   */
  const handleLogoutClick = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  useEffect(() => {
    if (isMenuOpen) {
      menuOpenAnimation.current = 1;
      triggerButtonRef.current?.click();
    }
  }, [isMenuOpen]);

  // On component mount
  useEffect(() => {
    // Set authenticated user name
    setUsername(user.getUsername());
  }, [user]);

  const customEl = useMemo(
    () => getCustomMenuElements(menuItemConf, classes),
    [menuItemConf, classes]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div data-testid="section_profile-menu" className={className}>
      <Tooltip title={i18n.t("Settings") || ""}>
        <span
          ref={triggerButtonRef as React.LegacyRef<HTMLElement>}
        >
        <IconButton
          data-testid="input_button"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
      </span>
      </Tooltip>
      <Menu
        transitionDuration={menuOpenAnimation.current}
        data-testid="section_menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography
          data-testid="section_welcome"
          component="div"
          variant="body1"
          className="root"
        >
          <div className="menu-item-spacing">
            {welcomeLabel}, {username}
          </div>
          <Divider variant="middle" />
          {extraItems?.map((item, index) => (
            <MenuItem
              className="menu-item-spacing"
              onClick={item.func}
              key={`extraItem-${item.label}-${index}`}
            >
              {item.label}
            </MenuItem>
          ))}
          <Divider variant="middle" />
          {user.isInternalUser() && (
            <MenuItem
              data-testid="input_reset-password"
              className="menu-item-spacing"
              onClick={handlePasswordReset}
            >
              {i18n.t("Change Password")}
            </MenuItem>
          )}
          {customEl}
          {handleToggleTheme && (
            <div className="menu-item-spacing">
              {darkThemeLabel}
              <Toggle
                onToggle={handleToggleTheme}
                toggle={(window.localStorage.getItem("@tty-pt/styles/theme") ?? "dark") === "dark"}
              ></Toggle>
            </div>
          )}
          <MenuItem
            className="menu-item-spacing"
            onClick={handleLogoutClick}
          >
            {logoutLabel}
          </MenuItem>
          <Divider variant="middle" />
          <div
            data-testid="section_footer"
            className="menu-item-spacing profile-menu-footer"
          >
            {version}
          </div>
        </Typography>
      </Menu>
      {/* Password Modal */}
      <ResetPasswordModal ref={resetModalRef}></ResetPasswordModal>
    </div>
  );
};

export default ProfileMenu;
