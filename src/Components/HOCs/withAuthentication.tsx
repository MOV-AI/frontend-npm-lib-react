import React, { useState, useEffect, useRef, useCallback } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Authentication from "@mov-ai/mov-fe-lib-core/api/Authentication/Authentication";
import PermissionType from "@mov-ai/mov-fe-lib-core/api/PermissionType";
import { User } from "@mov-ai/mov-fe-lib-core/api/User/User";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
import jwtDecode from "jwt-decode";
import i18n from "../../i18n/i18n.js";

export
function easySub(defaultData) {
  const subs = new Map<Function, true>();
  const valueMap = { value: defaultData };

  function update(obj) {
    valueMap.value = obj;
    for (const [sub] of subs)
      sub(obj);
  }

  function subscribe(sub: Function) {
    subs.set(sub, true);
    return () => {
      subs.delete(sub);
    };
  }

  return { update, subscribe, data: valueMap };
}

export
function useSub(sub, defaultData?) {
  const [data, setData] = useState(sub.data.value ?? defaultData);
  useEffect(() => sub.subscribe(setData), []);
  return data;
}

interface LoginData {
  username: string;
  password: string;
  remember: any;
  selectedProvider: any; 
}

export
const loggedOutInfo = {
  loggedIn: false,
  apps: [],
  currentUser: null,
  loading: false,
  clean: true,
};

export
const authSub = easySub(loggedOutInfo);

export
async function auth() {
  authSub.update({ ...loggedOutInfo, loading: true });

  try {
    const [loggedIn, currentUser] = await Promise.all([
      Authentication.checkLogin(),
      (new User()).getCurrentUserWithPermissions(),
      // new Promise(resolve => setTimeout(resolve, 2000)),
    ]);

    const { Resources: { Applications: apps = [] } } = currentUser;
    authSub.update({
      loggedIn,
      currentUser,
      apps,
      loading: false,
    });
  } catch (e) {
    authSub.update({ ...loggedOutInfo, loading: false });
  }
}

auth();

export default function withAuthentication(
  WrappedComponent: React.ComponentType,
  appName: PermissionType | string
) {
  return function (props: any) {
    const RECHECK_VALID_DELAY = 10000; // milliseconds

    const [errorMessage, setErrorMessage] = useState("");
    const [authenticationProviders, setAuthenticationProviders] = useState<
      string[]
    >([]);
    const sub = useSub(authSub);
    const { currentUser, loggedIn, apps, loading, clean } = sub;
    const hasPermissions = currentUser?.Superuser || apps.includes(appName as PermissionType) || !appName;

    /**
     * Updates the Access Token and the Refresh Token
     */
    useEffect(() => {
      Authentication.getProviders()
        .then((response: any) => setAuthenticationProviders(response.domains))
        .catch((e: any) =>
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
        const now = Math.floor(Date.now() * 1e-3);
        const token = Authentication.getToken() as string;

        // decode the token and get exp value
        const exp = (jwtDecode(token) as { exp: number }).exp || now;

        // check if token expiration time is still valid
        const expDelta = exp - now;

        const timeToRun = Math.max(
          expDelta * 1e3 - RECHECK_VALID_DELAY,
          RECHECK_VALID_DELAY
        );

        const timeOut = setTimeout(
          () =>
            Authentication.refreshTokens()
              .then((res: boolean) => authSub.update({
                currentUser,
                apps,
                loggedIn: res,
              })).catch((error: any) =>
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
    }, []);

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
    if (loading && clean) return renderLoading();
    if (!loggedIn && clean) return renderLoginForm();
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
