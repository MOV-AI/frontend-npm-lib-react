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
      loading: true,
      loggedIn: false,
      hasPermissions: false
    });
    const [authenticationProviders, setAuthenticationProviders] = useState([]);

    const authenticate = useCallback(() => {
      const user = new User();
      Promise.all([
        Authentication.checkLogin(),
        new Promise(resolve => setTimeout(resolve, 2000)),
        user.getCurrentUserWithPermissions()
      ])
        .then(([loggedIn, _, user]) => {
          const { Applications: apps, Superuser: isSuperUser } = user;
          const hasPermissions =
            isSuperUser || apps.includes(appName) || !appName;

          if (loggedIn) {
            firstRender.current = false;
          }

          setState({
            loading: false,
            loggedIn,
            hasPermissions
          });
        })
        .catch(e => {
          setState({
            loggedIn: false,
            loading: false,
            hasPermissions: false
          });
        });
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
              .catch(e =>
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
     */
    const handleLogOut = () => {
      Authentication.logout();
    };

    /**
     * handleFirstRender
     * Renders the loading panel while checking the user authentication and permissions
     * Renders the login form when the user is not authenticated
     * @returns React Component
     */
    const handleFirstRender = () => {
      return state.loading ? (
        renderLoading()
      ) : (
        <LoginForm
          authenticationProviders={authenticationProviders}
          setLoggedIn={value => {
            setState(prevState => ({ ...prevState, loading: true }));
            authenticate();
          }}
        />
      );
    };

    /**
     * renderLoading - Renders the loading panel
     * @returns React Component
     */
    const renderLoading = () => {
      return <LoginPanel message={"Preparing the bots"} progress={true} />;
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
    return (
      <React.Fragment>
        {!state.loggedIn && firstRender.current ? (
          handleFirstRender()
        ) : state.hasPermissions ? (
          <React.Fragment>
            <Component
              handleLogOut={handleLogOut}
              loggedIn={state.loggedIn}
              {...props}
            />
            <Modal open={!state.loggedIn}>
              <LoginForm
                authenticationProviders={authenticationProviders}
                setLoggedIn={value =>
                  setState(prevState => ({ ...prevState, loggedIn: value }))
                }
              />
            </Modal>
          </React.Fragment>
        ) : (
          renderNotAuthorized()
        )}
      </React.Fragment>
    );
  };
}
