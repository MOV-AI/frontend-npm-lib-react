import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Authentication from "@mov-ai/mov-fe-lib-core/api/Authentication/Authentication";
import PermissionType from "@mov-ai/mov-fe-lib-core/api/PermissionType";
import { User } from "@mov-ai/mov-fe-lib-core/api/User/User";
import LoginForm from "../LoginForm/LoginForm";
import LoginPanel from "../LoginForm/LoginPanel";
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

    if (loggedIn)
      return authSub.update({
        loggedIn: true,
        providers: await Authentication.getProviders(),
        currentUser,
        loading: false,
      });

    try {
      const providers = await Authentication.getProviders();
      try {
        const res = await Authentication.refreshTokens();

        authSub.update({
          loggedIn: res,
          providers,
          currentUser,
          loading: false,
        });
      } catch (e) {
        throw new Error("Error while trying to refresh the tokens: " + e.message)
      }
    } catch (e) {
      throw new Error("Error while trying to decode the token: " + e.message)
    }
  } catch (e) {
    console.error(e);
    authSub.update({ ...loggedOutInfo, loading: false });
  }
}

if (!(window as any).mock)
  auth();

export default function withAuthentication(
  WrappedComponent: React.ComponentType,
  appName: PermissionType | string,
  allowGuest?: boolean,
) {
  return function (props: any) {
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser, loggedIn, loading, clean, providers } = useSub(authSub);
    const hasPermissions = currentUser?.Resources?.Applications
      ? currentUser.Superuser || currentUser.Resources.Applications.includes(appName as PermissionType) || !appName
      : allowGuest;

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
        domains={providers}
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
