import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Modal } from "@material-ui/core";
import { Authentication, PermissionType, User } from "@mov-ai/mov-fe-lib-core";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
import jwtDecode from "jwt-decode";
import i18n from "../../i18n/index";
import { makeSub } from "../../Utils/Sub";

declare global {
  interface Window {
    DocManager?: {
      hasDirties: () => boolean;
      // Add other DocManager methods/properties if needed
    };
  }
}

const RECHECK_VALID_DELAY = 10000; // milliseconds
const RECHECK_AUTH_FAIL = 60000; // milliseconds

function checkConnection(): Promise<boolean> {
  return fetch(`/token-verify/`, {
    method: "POST",
    body: JSON.stringify({ token: Authentication.getToken() }),
  }).then((res) => res.ok);
}

/**
 * Higher-order component for handling authentication and authorization - refreshes tokens, checks permissions and verifies preodically if the user is still authenticated
 * @param WrappedComponent
 */
export default function withAuthentication<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  appName: PermissionType | string,
) {
  return function (props: any) {
    const firstRender = useRef(true);
    const [state, setState] = useState<{
      loggedIn: boolean;
      hasPermissions: boolean;
      currentUser?: object;
    }>({
      loggedIn: false,
      hasPermissions: false,
      currentUser: {},
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [authenticationProviders, setAuthenticationProviders] = useState<
      string[]
    >([]);

    const authenticate = useCallback(() => {
      const user = new User();
      setLoading(true);
      Promise.all([
        Authentication.checkLogin(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
        user.getCurrentUserWithPermissions(),
      ])
        .then(([loggedIn, _, _user]) => {
          const {
            Resources: { Applications: apps = [] },
            Superuser: isSuperUser,
          } = _user;
          const hasPermissions =
            isSuperUser || apps.includes(appName as PermissionType) || !appName;

          if (loggedIn) {
            firstRender.current = false;
          }

          setState({
            loggedIn,
            hasPermissions,
            currentUser: _user,
          });
        })
        .catch((error) => {
          console.warn("Failed login", error);
          setState({
            loggedIn: false,
            hasPermissions: false,
          });
        })
        .finally(() => setLoading(false));
    }, []);

    // Check if the user is authenticated
    useEffect(() => {
      authenticate();
    }, [authenticate]);

    // Updates the Access Token and the Refresh Token
    useEffect(() => {
      Authentication.getProviders()
        .then((response: { domains: string[] }) =>
          setAuthenticationProviders(response.domains),
        )
        .catch((e) =>
          console.log(
            "Error while fetching authentication providers: ",
            e.error,
          ),
        );
    }, []);

    // Check every 1 minute if the user is still authenticated
    useEffect(() => {
      const interval = setInterval(async () => {
        const isConnected = await checkConnection();
        if (!isConnected && state.loggedIn) {
          setState((prevState) => ({ ...prevState, loggedIn: false }));
        }
      }, RECHECK_AUTH_FAIL);
      return () => clearInterval(interval);
    }, [state.loggedIn]);

    // Updates the Access Token and the Refresh Token
    useEffect(() => {
      try {
        const now = Math.floor(Date.now() * 1e-3);
        const token = Authentication.getToken() as string;

        // decode the token and get exp value
        const exp = (jwtDecode(token) as { exp: number }).exp || now;

        // check if token expiration time is still valid
        const expDelta = exp - now;

        const timeToRun = Math.max(
          expDelta * 1e3 - RECHECK_VALID_DELAY,
          RECHECK_VALID_DELAY,
        );

        const timeOut = setTimeout(
          () =>
            Authentication.refreshTokens()
              .then((res: boolean) => {
                setState((prevState) => ({
                  ...prevState,
                  loggedIn: res,
                }));
              })
              .catch((error: unknown) =>
                console.log("Error while trying to refresh the tokens", error),
              ),
          timeToRun,
        );

        return () => {
          clearTimeout(timeOut);
        };
      } catch (error: unknown) {
        // token expired or no token
        console.log(
          "Error while trying to decode the token:",
          (error as Error).message,
        );
      }
    }, [state]);

    // handleLogOut - log out the user
    const handleLogOut = (redirect?: string) => {
      // Check for unsaved documents using global DocManager (kind of a hack)
      const hasDirties = window?.DocManager?.hasDirties?.() ?? false;
      if (hasDirties) {
        const confirmed = window.confirm(
          "You have unsaved documents. Are you sure you want to quit?",
        );
        if (!confirmed) return;
      }
      window.onbeforeunload = null;
      Authentication.logout(redirect);
    };

    // handleLoginSubmit - handle the user login credentials submit
    const handleLoginSubmit = useCallback(
      async ({
        username,
        password,
        remember,
        selectedProvider,
      }: {
        username: string;
        password: string;
        remember: boolean;
        selectedProvider: string;
      }) => {
        try {
          setLoading(true);
          const apiResponse = await Authentication.login(
            username,
            password,
            remember,
            selectedProvider,
          );
          if (apiResponse.error) throw new Error(apiResponse.error);
          authenticate();
        } catch (e: unknown) {
          setErrorMessage((e as Error).message);
          setLoading(false);
        }
      },
      [authenticate],
    );

    // renderLoading - Renders the loading panel
    const renderLoading = () => {
      return (
        <LoginPanel message={i18n.t("Preparing the bots")} progress={true} />
      );
    };

    // renderLoginForm - Renders the login form
    const renderLoginForm = () => (
      <LoginForm
        domains={authenticationProviders}
        authErrorMessage={errorMessage}
        onLoginSubmit={handleLoginSubmit}
      />
    );

    // handleLoginAfterNotAuthorized - after user is unauthorized, logout and redirect to login
    const handleLoginAfterNotAuthorized = useCallback(() => handleLogOut(), []);

    // renderNotAuthorized - Renders the not authorized panel
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

    // Render the Login form if the user is not logged in
    if (loading && firstRender.current) return renderLoading();
    if (!state.loggedIn && firstRender.current) return renderLoginForm();
    if (!state.hasPermissions) return renderNotAuthorized();

    return (
      <>
        <WrappedComponent
          currentUser={state.currentUser}
          handleLogOut={handleLogOut}
          loggedIn={state.loggedIn}
          {...props}
        />
        {loading ? (
          renderLoading()
        ) : (
          <Modal open={!state.loggedIn}>{renderLoginForm()}</Modal>
        )}
      </>
    );
  };
}

//========================================================================================
/*                                                                                      *
 *                            LEGACY TO DELETE IN THE FUTURE                            *
 *                                                                                      */
//========================================================================================

interface LoginSub {
  loggedIn: boolean;
  currentUser: any;
  loading: boolean;
  providers: { domains: string[] };
}

export const loggedOutInfo = {
  loggedIn: false,
  currentUser: null,
  loading: false,
  providers: { domains: [] },
};

export const authSub = makeSub<LoginSub>(loggedOutInfo);
