import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@material-ui/core";
import { Authentication } from "mov-fe-lib-core";
import { LoginForm } from "../LoginForm/LoginForm";
import jwtDecode from "jwt-decode";

export default function withAuthentication(Component) {
  return function (props) {
    const RECHECK_VALID_DELAY = 2000; // milliseconds

    const firstRender = useRef(true);

    const [loggedIn, setLoggedIn] = useState(false);
    const [checkLogin, setCheckLogin] = useState(0);

    /**
     * check if the user is authenticated
     */
    useEffect(() => {
      async function checkLogin() {
        return await Authentication.checkLogin();
      }

      setLoggedIn(checkLogin());
    }, []);

    /**
     * Checks if the refresh token is still valid
     * sets loggedIn accordingly.
     * Setting checkLogin or loggedIn will trigger execution
     */
    useEffect(() => {
      const now = Math.floor(Date.now() * 0.001);
      const token = window.localStorage.getItem("movai.refreshToken");

      try {
        // decode the token and get exp value
        const exp = jwtDecode(token).exp || now;

        // check if token expiration time is still valid
        const expDelta = exp - now;
        if (expDelta <= 0) {
          throw new Error("Token expired");
        }

        // check again in expire time + RECHECK_VALID_DELAY
        setTimeout(
          () => setCheckLogin(now),
          expDelta * 1000 + RECHECK_VALID_DELAY
        );

        setLoggedIn(true);
      } catch (error) {
        // token expired or no token
        setLoggedIn(false);
      }
    }, [checkLogin, loggedIn]);

    /**
     * handleLogOut - log out the user
     */
    const handleLogOut = () => {
      Authentication.logout();
    };

    /**
     * handleFirstRender - If the user is not logged in and it is the first render
     * then show the login form without the application on the background.
     * After the first login, the login form can be showned as a modal instead.
     */
    const handleFirstRender = () => {
      firstRender.current = false;
      return <LoginForm setLoggedIn={state => setLoggedIn(state)} />;
    };

    /**
     * renders the Login form if the user is not logged in
     */
    return (
      <React.Fragment>
        {!loggedIn && firstRender.current ? (
          handleFirstRender()
        ) : (
          <React.Fragment>
            <Component
              handleLogOut={handleLogOut}
              loggedIn={loggedIn}
              {...props}
            />
            <Modal open={!loggedIn}>
              <LoginForm setLoggedIn={state => setLoggedIn(state)} />
            </Modal>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };
}
