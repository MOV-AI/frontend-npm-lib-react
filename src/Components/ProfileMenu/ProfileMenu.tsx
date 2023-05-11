import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import Toggle from "../Toggle";
// import { profileMenuStyles } from "./styles";
import { useSub, authSub } from "../HOCs/withAuthentication";
import i18n from "../../i18n/i18n.js";
import ResetPasswordModal from "./ResetPassword";
import { ProfileMenuProps } from "./types";

function getCustomMenuElements(menuItemConf: any) {
  return Object.entries(menuItemConf ?? {}).map(([key, menuItem]: [string, any]) => {
    if (React.isValidElement(menuItem))
      return menuItem;

    return (<MenuItem
      key={key}
      data-test-id={"input_" + key}
      className="menu-item-spacing"
      onClick={menuItem.handler}
    >
      { i18n.t(menuItem.title) as string }
    </MenuItem>);
  });
}

const ProfileMenu = (props: ProfileMenuProps) => {
  // State hooks
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useSub(authSub);
  // Refs
  const resetModalRef = useRef<{ open: Function }>();
  // Props
  const {
    welcomeLabel = "Hello",
    darkThemeLabel = "Dark Theme",
    logoutLabel = "Logout",
    version = "",
    extraItems = [],
    isDarkTheme = true,
    handleLogout = () => console.log("logout"),
    handleToggleTheme,
    menuItemConf,
    className,
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
  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);

  /**
   * Handle close ProfileMenu
   */
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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

  const customEl = useMemo(() => getCustomMenuElements(menuItemConf), [menuItemConf]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <>
      <Tooltip title={i18n.t("Settings") as string || ""}>
        <IconButton
          data-testid="input_button"
          aria-haspopup="true"
          onClick={handleClick}
          className={className}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        data-testid="section_menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="body-1"
      >
        <MenuItem className="menu-item-spacing">
          {welcomeLabel}, {currentUser?.Label ?? "guest"}
        </MenuItem>
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
        {currentUser && currentUser.isInternalUser && (
          <MenuItem
            data-testid="input_reset-password"
            className="menu-item-spacing"
            onClick={handlePasswordReset}
          >
            {i18n.t("Change Password") as string}
          </MenuItem>
        )}
        { customEl }
        {handleToggleTheme && (
          <MenuItem className="menu-item-spacing">
            {darkThemeLabel}
            <Toggle
              label=""
              onToggle={handleToggleTheme}
              toggle={isDarkTheme}
            ></Toggle>
          </MenuItem>
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
      </Menu>
      {/* Password Modal */}
      <ResetPasswordModal ref={resetModalRef}></ResetPasswordModal>
    </>
  );
};

export default ProfileMenu;
