import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MutableRefObject,
} from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import Toggle from "../Toggle";
import { profileMenuStyles } from "./styles";
import Divider from "@material-ui/core/Divider";
import {
  InternalUserModel,
  Rest,
  User,
  CONSTANTS,
} from "@mov-ai/mov-fe-lib-core";
import { Typography, Tooltip, Select } from "@material-ui/core";
import i18n from "../../i18n";
import ResetPasswordModal from "./ResetPassword";
import { ProfileMenuProps } from "./types";

const LOCAL_STORAGE_LANG_KEY = CONSTANTS.LOCAL_STORAGE_LANG_KEY;

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
          {i18n.t(menuItem.title).toString()}
        </MenuItem>
      );
    },
  );
}

const ProfileMenu = (props: ProfileMenuProps) => {
  // Props
  const {
    welcomeLabel = i18n.t("Hello"),
    darkThemeLabel = i18n.t("Dark Theme"),
    logoutLabel = i18n.t("Logout"),
    version = "",
    extraItems = [],
    menuItemConf,
    isMenuOpen,
    handleLogout = () => console.log("logout"),
    handleToggleTheme,
    onClose,
  } = props;

  // State hooks
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState("");
  // Other hooks
  const triggerButtonRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
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
  const handleClick = useCallback((event: any) => {
    setOpenMenu(true);
  }, []);

  /**
   * Handle close ProfileMenu
   */
  const handleClose = useCallback(() => {
    setOpenMenu(false);
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
    localStorage.removeItem(LOCAL_STORAGE_LANG_KEY);
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
    [menuItemConf, classes],
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div ref={triggerButtonRef} data-testid="section_profile-menu">
      <Tooltip title={i18n.t("Settings") || ("" as any)}>
        <IconButton
          data-testid="input_button"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        transitionDuration={menuOpenAnimation.current}
        data-testid="section_menu"
        anchorEl={triggerButtonRef.current}
        open={openMenu}
        onClose={handleClose}
      >
        <Typography
          data-testid="section_welcome"
          component="div"
          variant="body1"
          className={classes.root}
        >
          <div className={classes.menuItemSpacing}>
            {welcomeLabel}, {username}
          </div>
          <Divider variant="middle" />
          {extraItems?.map((item, index) => (
            <MenuItem
              className={classes.menuItemSpacing}
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
              className={classes.menuItemSpacing}
              onClick={handlePasswordReset}
            >
              {i18n.t("Change Password").toString()}
            </MenuItem>
          )}
          {customEl}
          {handleToggleTheme && (
            <MenuItem className={classes.menuItemSpacing}>
              {darkThemeLabel}
              <Toggle
                onToggle={handleToggleTheme}
                toggle={
                  (window.localStorage.getItem("movai.theme") ?? "dark") ===
                  "dark"
                }
              ></Toggle>
            </MenuItem>
          )}
          <LanguageSelection user={user} />
          <MenuItem
            data-testid="logout"
            className={classes.menuItemSpacing}
            onClick={handleLogoutClick}
          >
            {logoutLabel}
          </MenuItem>
          <Divider variant="middle" />
          <div
            data-testid="section_footer"
            className={`${classes.menuItemSpacing} ${classes.profileMenuFooter}`}
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

const DEFAULT_LANGUAGE = "en";

export const LanguageSelection = (props: { user: User }) => {
  const { user } = props;
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([
    DEFAULT_LANGUAGE,
  ]);
  const classes = profileMenuStyles();

  useEffect(() => {
    const fetchLanguages = async () => {
      // Try to get user language
      try {
        const userData = (await user.getData()) as InternalUserModel;
        const userLanguage = userData?.Language ?? DEFAULT_LANGUAGE;
        setLanguage(userLanguage);
      } catch (error) {
        console.error("Failed to fetch user language:", error);
        setLanguage(DEFAULT_LANGUAGE);
      }

      // Try to get available languages
      try {
        const response = await Rest.get({ path: "v2/languages/" });
        const languages = Array.isArray(response?.languages)
          ? response.languages
          : [DEFAULT_LANGUAGE];
        setAvailableLanguages(
          languages.length > 0 ? languages : [DEFAULT_LANGUAGE],
        );
      } catch (error) {
        console.error("Failed to fetch available languages:", error);
        setAvailableLanguages([DEFAULT_LANGUAGE]);
      }
    };

    fetchLanguages();
  }, [user]);

  const handleChange = async (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const selectedLang = event.target.value as string;
    setLanguage(selectedLang);
    window.localStorage.setItem(LOCAL_STORAGE_LANG_KEY, selectedLang);
    i18n.changeLanguage(selectedLang);
    await user.setLanguage(selectedLang);
    window.location.reload();
  };

  return (
    <MenuItem className={classes.menuItemSpacing}>
      {i18n.t("Language Selection").toString()}
      <Select
        native
        value={language}
        onChange={handleChange}
        className={classes.languageSelector}
        data-testid="input_language-selector"
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </Select>
    </MenuItem>
  );
};

export default ProfileMenu;
