import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal } from "@material-ui/core";
import { Authentication, User } from "@mov-ai/mov-fe-lib-core";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
import jwtDecode from "jwt-decode";

export default function withAuthentication(Component, appName) {
  return function (props) {
    const RECHECK_VALID_DELAY = 10000; // milliseconds

    const firstRender = useRef(true);
    const [state, setState] = useState({
      loggedIn: false,
      hasPermissions: false,
      currentUser: {}
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [authenticationProviders, setAuthenticationProviders] = useState([]);

    const authenticate = useCallback(() => {
      const user = new User();
      setLoading(true);
      Promise.all([
        Authentication.checkLogin(),
        new Promise(resolve => setTimeout(resolve, 2000)),
        user.getCurrentUserWithPermissions()
      ])
        .then(([loggedIn, _, user]) => {
          const {
            Resources: { Applications: apps = [] },
            Superuser: isSuperUser
          } = user;
          const hasPermissions =
            isSuperUser || apps.includes(appName) || !appName;

          if (loggedIn) {
            firstRender.current = false;
          }

          setState({
            loggedIn,
            hasPermissions,
            currentUser: user
          });
        })
        .catch(e => {
          setState({
            loggedIn: false,
            hasPermissions: false
          });
        })
        .finally(_ => setLoading(false));
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
        const token = Authentication.getToken();

        // decode the token and get exp value
        const exp = jwtDecode(token).exp || now;

        // check if token expiration time is still valid
        const expDelta = exp - now;

        const timeToRun =
          10000 || Math.max(expDelta * 1000 - RECHECK_VALID_DELAY, 10000);

        const timeOut = setTimeout(
          () =>
            Authentication.refreshTokens()
              .then(res => {
                setState(prevState => ({
                  ...prevState,
                  loggedIn: false
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
      } catch (error) {
        // token expired or no token
        console.log("Error while trying to decode the token:", error.message);
      }
    }, [state]);

    /**
     * handleLogOut - log out the user
     * @param {string} redirect : Redirect URL location
     */
    const handleLogOut = redirect => {
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
        } catch (e) {
          setErrorMessage(e.message);
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
    const renderLoginForm = () => {
      if (loading) return renderLoading();
      return (
        <LoginForm
          domains={authenticationProviders}
          authErrorMessage={errorMessage}
          onLoginSubmit={handleLoginSubmit}
          onChanges={setErrorMessage}
        />
      );
    };

    /**
     * renderNotAuthorized - Renders the not authorized panel
     * @returns React Component
     */
    const renderNotAuthorized = () => {
      return (
        <LoginPanel
          title={"Not Authorized"}
          message={"You do not have permission to access the application"}
        />
      );
    };

    /**
     * renders the Login form if the user is not logged in
     */
    if (!state.loggedIn && firstRender.current) return renderLoginForm();
    if (!state.hasPermissions) return renderNotAuthorized();
    return (
      <React.Fragment>
        {!loading && (
          <Component
            currentUser={state.currentUser}
            handleLogOut={handleLogOut}
            loggedIn={state.loggedIn}
            {...props}
          />
        )}
        <Modal open={!state.loggedIn}>{renderLoginForm()}</Modal>
      </React.Fragment>
    );
  };
}
