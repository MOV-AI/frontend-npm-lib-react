"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var IconButton_1 = require("@material-ui/core/IconButton");
var Menu_1 = require("@material-ui/core/Menu");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var Settings_1 = require("@material-ui/icons/Settings");
var Toggle_1 = require("../Toggle");
var styles_1 = require("./styles");
var Divider_1 = require("@material-ui/core/Divider");
var mov_fe_lib_core_1 = require("@mov-ai/mov-fe-lib-core");
var core_1 = require("@material-ui/core");
var i18n_js_1 = require("../../i18n/i18n.js");
var ResetPassword_1 = require("./ResetPassword");
function getCustomMenuElements(menuItemConf, classes) {
    return Object.entries(menuItemConf !== null && menuItemConf !== void 0 ? menuItemConf : {}).map(function (_a) {
        var key = _a[0], menuItem = _a[1];
        if (react_1.default.isValidElement(menuItem))
            return menuItem;
        return (<MenuItem_1.default key={key} data-testid={"input_" + key} className={classes.menuItemSpacing} onClick={menuItem.handler}>
          {i18n_js_1.default.t(menuItem.title)}
        </MenuItem_1.default>);
    });
}
var ProfileMenu = function (props) {
    var _a;
    // Props
    var _b = props.welcomeLabel, welcomeLabel = _b === void 0 ? "Hello" : _b, _c = props.darkThemeLabel, darkThemeLabel = _c === void 0 ? "Dark Theme" : _c, _d = props.logoutLabel, logoutLabel = _d === void 0 ? "Logout" : _d, _e = props.version, version = _e === void 0 ? "" : _e, _f = props.extraItems, extraItems = _f === void 0 ? [] : _f, menuItemConf = props.menuItemConf, isMenuOpen = props.isMenuOpen, _g = props.handleLogout, handleLogout = _g === void 0 ? function () { return console.log("logout"); } : _g, handleToggleTheme = props.handleToggleTheme, onClose = props.onClose;
    // State hooks
    var _h = (0, react_1.useState)(null), anchorEl = _h[0], setAnchorEl = _h[1];
    var _j = (0, react_1.useState)(""), username = _j[0], setUsername = _j[1];
    // Other hooks
    var triggerButtonRef = (0, react_1.useRef)();
    var menuOpenAnimation = (0, react_1.useRef)("auto");
    var user = (0, react_1.useMemo)(function () { return new mov_fe_lib_core_1.User(); }, []);
    var classes = (0, styles_1.profileMenuStyles)();
    // Refs
    var resetModalRef = (0, react_1.useRef)();
    //========================================================================================
    /*                                                                                      *
     *                                       Handlers                                       *
     *                                                                                      */
    //========================================================================================
    /**
     * Handle click to open ProfileMenu
     * @param {Event} event : Click event
     */
    var handleClick = (0, react_1.useCallback)(function (event) {
        setAnchorEl(event.currentTarget);
    }, []);
    /**
     * Handle close ProfileMenu
     */
    var handleClose = (0, react_1.useCallback)(function () {
        setAnchorEl(null);
        onClose && onClose();
    }, [onClose]);
    /**
     * Open Password Reset modal
     */
    var handlePasswordReset = (0, react_1.useCallback)(function () {
        var _a;
        (_a = resetModalRef.current) === null || _a === void 0 ? void 0 : _a.open();
        handleClose();
    }, [handleClose]);
    /*
     * Handle Logout click
     */
    var handleLogoutClick = (0, react_1.useCallback)(function () {
        handleLogout();
    }, [handleLogout]);
    //========================================================================================
    /*                                                                                      *
     *                                    React Lifecycle                                   *
     *                                                                                      */
    //========================================================================================
    (0, react_1.useEffect)(function () {
        var _a;
        if (isMenuOpen) {
            menuOpenAnimation.current = 1;
            (_a = triggerButtonRef.current) === null || _a === void 0 ? void 0 : _a.click();
        }
    }, [isMenuOpen]);
    // On component mount
    (0, react_1.useEffect)(function () {
        // Set authenticated user name
        setUsername(user.getUsername());
    }, [user]);
    var customEl = (0, react_1.useMemo)(function () { return getCustomMenuElements(menuItemConf, classes); }, [menuItemConf, classes]);
    //========================================================================================
    /*                                                                                      *
     *                                        Render                                        *
     *                                                                                      */
    //========================================================================================
    return (<div data-testid="section_profile-menu">
      <core_1.Tooltip title={i18n_js_1.default.t("Settings") || ""}>
        <IconButton_1.default buttonRef={triggerButtonRef} data-testid="input_button" aria-haspopup="true" onClick={handleClick}>
          <Settings_1.default />
        </IconButton_1.default>
      </core_1.Tooltip>
      <Menu_1.default transitionDuration={menuOpenAnimation.current} data-testid="section_menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <core_1.Typography data-testid="section_welcome" component="div" variant="body1" className={classes.root}>
          <div className={classes.menuItemSpacing}>
            {welcomeLabel}, {username}
          </div>
          <Divider_1.default variant="middle"/>
          {extraItems === null || extraItems === void 0 ? void 0 : extraItems.map(function (item, index) { return (<MenuItem_1.default className={classes.menuItemSpacing} onClick={item.func} key={"extraItem-".concat(item.label, "-").concat(index)}>
              {item.label}
            </MenuItem_1.default>); })}
          <Divider_1.default variant="middle"/>
          {user.isInternalUser() && (<MenuItem_1.default data-testid="input_reset-password" className={classes.menuItemSpacing} onClick={handlePasswordReset}>
              {i18n_js_1.default.t("Change Password")}
            </MenuItem_1.default>)}
          {customEl}
          {handleToggleTheme && (<div className={classes.menuItemSpacing}>
              {darkThemeLabel}
              <Toggle_1.default onToggle={handleToggleTheme} toggle={((_a = window.localStorage.getItem("movai.theme")) !== null && _a !== void 0 ? _a : "dark") === "dark"}></Toggle_1.default>
            </div>)}
          <MenuItem_1.default className={classes.menuItemSpacing} onClick={handleLogoutClick}>
            {logoutLabel}
          </MenuItem_1.default>
          <Divider_1.default variant="middle"/>
          <div data-testid="section_footer" className={"".concat(classes.menuItemSpacing, " ").concat(classes.profileMenuFooter)}>
            {version}
          </div>
        </core_1.Typography>
      </Menu_1.default>
      {/* Password Modal */}
      <ResetPassword_1.default ref={resetModalRef}></ResetPassword_1.default>
    </div>);
};
exports.default = ProfileMenu;
