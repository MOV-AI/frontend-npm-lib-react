import React, { useState, useCallback } from "react";
import { Button, Modal } from "@mui/material";
import { Authentication, PermissionType, authSub, login, LoginData } from "@mov-ai/mov-fe-lib-core";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
import i18n from "i18next";

export default function withAuthentication(
  WrappedComponent: React.ComponentType,
  appName: PermissionType | string,
  allowGuest?: boolean,
) {
  return function (props: any) {
    const [errorMessage, setErrorMessage] = useState("");
    const authSubRes = authSub.use();
    if (!authSubRes)
      throw new Error("No auth info");
    const { currentUser, loggedIn, loading, providers } = authSubRes;
    const hasPermissions = (currentUser?.Resources?.Applications)
      ? (currentUser.Superuser || currentUser.Resources.Applications.includes(appName as PermissionType) || !appName)
      : (currentUser?.Superuser || allowGuest);

    /**
     * handleLogOut - log out the user
     * @param {string} redirect : Redirect URL location
     */
    const handleLogOut = (redirect?: string) => {
      Authentication.logout(redirect);
    };

    /**
     * handleLoginSubmit - handle the user login credentials submit
     * @param {{ username, password, remember, selectedProvider }}
     */
    const handleLoginSubmit = useCallback(
      async (loginData: LoginData) => {
        try {
          login(loginData);
        } catch (e: unknown) {
          setErrorMessage((e as Error).message);
        }
      },
      []
    );

    /**
     * renderLoading - Renders the loading panel
     * @returns React Component
     */
    const renderLoading = () => {
      return <LoginPanel message={"Preparing the bots"} progress={true} />;
    };

    /**
     * renderLoginForm - Renders the login form
     * @returns React Component
     */
    const renderLoginForm = () => (
      <LoginForm
        appName={appName} 
        domains={providers.domains}
        authErrorMessage={errorMessage}
        onLoginSubmit={handleLoginSubmit}
      />
    );

    /**
     * handleLoginAfterNotAuthorized - after user is unauthorized, logout and redirect to login
     * @returns React Component
     */
    const handleLoginAfterNotAuthorized = useCallback(() => handleLogOut(), []);

    /**
     * renderNotAuthorized - Renders the not authorized panel
     * @returns React Component
     */
    const renderNotAuthorized = () => {
      return (
        <LoginPanel
          title={i18n.t("NotAuthorized")}
          message={
            <>
              <p>{i18n.t("NotAuthorizedDescription") as string}</p>
              <Button
                variant="outlined"
                data-testid="input_unauthorized_login"
                onClick={handleLoginAfterNotAuthorized}
              >
                {i18n.t("NotAuthorizedRedirectToLogin") as string}
              </Button>
            </>
          }
        />
      );
    };

    /**
     * renders the Login form if the user is not logged in
     */
    if (loading) return renderLoading();
    if (!loggedIn) return renderLoginForm();
    if (!hasPermissions) return renderNotAuthorized();
    return (
      <React.Fragment>
        <WrappedComponent
          currentUser={currentUser}
          handleLogOut={handleLogOut}
          loggedIn={loggedIn}
          {...props}
        />
        {loading ? (
          renderLoading()
        ) : (
          <Modal open={!loggedIn}><span>{renderLoginForm()}</span></Modal>
        )}
      </React.Fragment>
    );
  };
}
