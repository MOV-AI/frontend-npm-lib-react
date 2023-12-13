import { Sub } from "@tty-pt/sub";
import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Authentication, User } from "@mov-ai/mov-fe-lib-core";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
import i18n from "../../i18n/i18n.js";

interface LoginData {
  username: string;
  password: string;
  remember: any;
  selectedProvider: any; 
}

interface LoginSub {
  loggedIn: boolean,
  currentUser: any,
  loading: boolean,
  providers: { domains: string[] },
}

export
const loggedOutInfo: LoginSub = {
  loggedIn: false,
  currentUser: null,
  loading: false,
  providers: { domains: [] },
};

export
const authSub = new Sub(loggedOutInfo);

export
const _auth = authSub.makeEmit((loggedIn: boolean, currentUser: any, providers: string[], refreshTokensRes: boolean) => {
  console.assert(currentUser);

  return loggedIn ? {
    loggedIn: true,
    providers,
    currentUser,
    loading: false,
  } : {
    loggedIn: refreshTokensRes,
    providers,
    currentUser,
    loading: false,
  };
});

export
async function auth() {
  authSub.update({ ...loggedOutInfo, loading: true });

  try {
    const [loggedIn, currentUser, providers] = await Promise.all([
      Authentication.checkLogin(),
      (new User()).getCurrentUserWithPermissions(),
      Authentication.getProviders(),
    ]);

    let refreshTokenRes;
    if (!loggedIn)
      refreshTokenRes = await Authentication.refreshTokens();

    return _auth(loggedIn, currentUser, providers, refreshTokenRes);
  } catch (e: any) {
    console.error("Auth Error: " + e.error?.message ?? e.message ?? e);
    return { ...loggedOutInfo, loading: false };
  }
}


if (!(window as any).mock)
  auth();

export default function withAuthentication(
  WrappedComponent: React.FC,
  appName: string,
  allowGuest?: boolean,
): React.FC {
  return function (props: any) {
    const [errorMessage, setErrorMessage] = useState("");
    const authSubRes = authSub.use();
    if (!authSubRes)
      throw new Error("No auth info");
    const { currentUser, loggedIn, loading, providers } = authSubRes;
    const hasPermissions = (currentUser?.Resources?.Applications)
      ? (currentUser.Superuser || currentUser.Resources.Applications.includes(appName as string) || !appName)
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
      async ({ username, password, remember, selectedProvider }: LoginData) => {
        try {
          const apiResponse = await Authentication.login(
            username,
            password,
            remember,
            selectedProvider
          );
          if (apiResponse.error) throw new Error(apiResponse.error);
          auth();
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
