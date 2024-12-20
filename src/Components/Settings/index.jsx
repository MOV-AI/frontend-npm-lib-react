import React, { useMemo } from "react";
import PropTypes from "prop-types";
import i18n from "./../../i18n";
import { User } from "@mov-ai/mov-fe-lib-core";
import ResetPasswordModal from "./../ProfileMenu/ResetPassword";
import { useNavContext } from "./../../Components/Navigable";
import Menu from "./../Menu";

export default function Settings(props) {
  const {
    view,
    handleToggleTheme = () => {},
    handleLogOut = () => {},
    theme = "dark",
    go = useNavContext().go,
  } = props;
  const user = useMemo(() => new User(), []);

  const handlePasswordReset = (ref) => {
    ref.current.open();
  };

  const data = {
    title: i18n.t("Hello") + ", " + user.getUsername(),
    darkTheme: theme === "dark",
  };

  const types = {
    title: {
      type: "string",
    },
    resetPassword: {
      type: "modal",
      hidden: !user.isInternalUser(),
      title: i18n.t("Change Password"),
      Modal: ResetPasswordModal,
      onClick: handlePasswordReset,
    },
    darkTheme: {
      type: "bool",
      title: i18n.t("Dark Theme"),
      onClick: handleToggleTheme,
    },
    logout: {
      type: "button",
      title: i18n.t("Logout"),
      onClick: () => handleLogOut(""),
    },
  };

  return <Menu data={data} types={types} view={view} />;
}

Settings.propTypes = {
  view: PropTypes.bool,
};
