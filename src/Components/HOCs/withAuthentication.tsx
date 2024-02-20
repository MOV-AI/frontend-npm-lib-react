import React, { useState, useCallback } from "react";
import { Button, Modal } from "@material-ui/core";
import { Authentication, PermissionType, User } from "@mov-ai/mov-fe-lib-core";
import { Emit, makeSub } from "../../Utils/Sub";
import useSub from "../../hooks/useSub";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
import i18n from "i18next";

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
const loggedOutInfo = {
  loggedIn: false,
  currentUser: null,
  loading: false,
  providers: { domains: [] },
};

export
const authSub = makeSub<LoginSub>(loggedOutInfo);

export
const authEmit: Emit<LoginSub> = authSub.makeEmit(async () => {
  authSub.update({ ...loggedOutInfo, loading: true });

  try {
    const [loggedIn, currentUserBare] = await Promise.all([
      Authentication.checkLogin(),
      (new User()).getCurrentUserWithPermissions(),
    ]);

    console.assert(currentUserBare);

    const currentUser = {
      ...currentUserBare,
      roles: currentUserBare.Roles.reduce((a, role) => ({ ...a, [role]: true }), {}),
    };

    if (loggedIn)
      return {
        loggedIn: true,
        providers: await Authentication.getProviders(),
        currentUser,
        loading: false,
      };

    const [providers, res] = await Promise.all([
      Authentication.getProviders(),
      Authentication.refreshTokens(),
    ]);

    return {
      loggedIn: res,
      providers,
      currentUser,
      loading: false,
    };
  } catch (e: any) {
    if (!(globalThis as any).mock)
      console.error("Auth Error: " + e.error?.message ?? e.message ?? e);
    return { ...loggedOutInfo, loading: false };
  }
});

if (!(window as any).mock)
  authEmit();

export default function withAuthentication(
  WrappedComponent: React.ComponentType,
  appName: PermissionType | string,
  allowGuest?: boolean,
) {
  return function (props: any) {
    const [errorMessage, setErrorMessage] = useState("");
    const authSubRes = useSub<LoginSub>(authSub) as LoginSub;
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
      async ({ username, password, remember, selectedProvider }: LoginData) => {
        try {
          const apiResponse = await Authentication.login(
            username,
            password,
            remember,
            selectedProvider
          );
          if (apiResponse.error) throw new Error(apiResponse.error);
          authEmit();
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
