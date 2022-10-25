import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Modal } from "@material-ui/core";
import { Authentication, PermissionType, User } from "@mov-ai/mov-fe-lib-core";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
import jwtDecode from "jwt-decode";
import i18n from "../../i18n/i18n.js";

export default function withAuthentication<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  appName: PermissionType | string
) {
  return function (props: any) {
    const RECHECK_VALID_DELAY = 10000; // milliseconds

    const firstRender = useRef(true);
    const [state, setState] = useState<{
      loggedIn: boolean;
      hasPermissions: boolean;
      currentUser?: object;
    }>({
      loggedIn: false,
      hasPermissions: false,
      currentUser: {}
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
        new Promise(resolve => setTimeout(resolve, 2000)),
        user.getCurrentUserWithPermissions()
      ])
        .then(([loggedIn, _, _user]) => {
          const {
            Resources: { Applications: apps = [] },
            Superuser: isSuperUser
          } = _user;
          const hasPermissions =
            isSuperUser || apps.includes(appName as PermissionType) || !appName;

          if (loggedIn) {
            firstRender.current = false;
          }

          setState({
            loggedIn,
            hasPermissions,
            currentUser: _user
          });
        })
        .catch(error => {
          console.warn("Failed login", error);
          setState({
            loggedIn: false,
            hasPermissions: false
          });
        })
        .finally(() => setLoading(false));
    }, []);

    /**
     * check if the user is authenticated
     */
    useEffect(() => {
      authenticate();
    }, []);

    /**
     * Updates the Access Token and the Refresh Token
     */
    useEffect(() => {
      Authentication.getProviders()
        .then(response => setAuthenticationProviders(response.domains))
        .catch(e =>
          console.log(
            "Error while fetching authentication providers: ",
            e.error
          )
        );
    }, []);

    /**
     * Updates the Access Token and the Refresh Token
     */
    useEffect(() => {
      try {
        const now = Math.floor(Date.now() * 0.001);
        const token = Authentication.getToken() as string;

        // decode the token and get exp value
        const exp = (jwtDecode(token) as { exp: number }).exp || now;

        // check if token expiration time is still valid
        const expDelta = exp - now;

        const timeToRun = Math.max(
          expDelta * 1000 - RECHECK_VALID_DELAY,
          10000
        );

        const timeOut = setTimeout(
          () =>
            Authentication.refreshTokens()
              .then(res => {
                setState(prevState => ({
                  ...prevState,
                  loggedIn: res
                }));
              })
              .catch(error =>
                console.log("Error while trying to refresh the tokens", error)
              ),
          timeToRun
        );

        return () => {
          clearTimeout(timeOut);
        };
      } catch (error: unknown) {
        // token expired or no token
        console.log(
          "Error while trying to decode the token:",
          (error as Error).message
        );
      }
    }, [state]);

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
      async ({ username, password, remember, selectedProvider }) => {
        try {
          setLoading(true);
          const apiResponse = await Authentication.login(
            username,
            password,
            remember,
            selectedProvider
          );
          if (apiResponse.error) throw new Error(apiResponse.error);
          authenticate();
        } catch (e: unknown) {
          setErrorMessage((e as Error).message);
          setLoading(false);
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
        domains={authenticationProviders}
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
              <p>{i18n.t("NotAuthorizedDescription")}</p>
              <Button
                variant="outlined"
                data-testid="input_unauthorized_login"
                onClick={handleLoginAfterNotAuthorized}
              >
                {i18n.t("NotAuthorizedRedirectToLogin")}
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
    if (!state.loggedIn && firstRender.current) return renderLoginForm();
    if (!state.hasPermissions) return renderNotAuthorized();
    return (
      <React.Fragment>
        <WrappedComponent
          currentUser={state.currentUser}
          handleLogOut={handleLogOut}
          loggedIn={state.loggedIn}
          {...props}
        />
        <Modal open={!state.loggedIn}>{renderLoginForm()}</Modal>
      </React.Fragment>
    );
  };
}
