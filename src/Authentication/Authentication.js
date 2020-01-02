import jwtDecode from "jwt-decode";

const REST_API =
  window.location.port === ""
    ? `http://${window.location.hostname}`
    : `http://${window.location.hostname}:${window.location.port}`;

const Authentication = {};

Authentication.AuthException = function(message) {
  this.message = message;
  this.name = "AuthException";
};

Authentication.getToken = () => {
  const token = window.localStorage.getItem("movai.token");
  return token ? token : false;
};

Authentication.getRefreshToken = () => {
  const refreshToken = window.localStorage.getItem("movai.refreshToken");
  return refreshToken ? refreshToken : false;
};

Authentication.getTokenData = () => {
  const token = getToken();
  const message = jwtDecode(token).message;

  const tokenData = {
    message: message,
    auth_token: false,
    refresh_token: getRefreshToken(),
    error: false,
    access_token: token
  };

  return tokenData;
};

Authentication.login = async (username, password, remember) => {
  // Cleanup...
  window.localStorage.removeItem("movai.token");
  window.localStorage.removeItem("movai.refreshToken");
  window.localStorage.removeItem("movai.tokenRemember");
  window.sessionStorage.removeItem("movai.session");

  let headers = {};
  headers["Content-Type"] = "application/json";

  const url = `${REST_API}/token-auth/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: username,
        password: password,
        remember: remember
      })
    });

    const { status } = response;
    let data = await response.json();

    if (status === 200) {
      window.localStorage.setItem("movai.token", data["access_token"]);
      window.localStorage.setItem("movai.refreshToken", data["refresh_token"]);
      window.localStorage.setItem(
        "movai.tokenRemember",
        remember == "undefined" ? false : remember
      );
      window.sessionStorage.setItem("movai.session", true);
    }

    return data;
  } catch (e) {
    // ToDo Add exception error message
    throw e;
  }
};

Authentication.logout = () => {
  window.localStorage.removeItem("movai.token");
  window.localStorage.removeItem("movai.refreshToken");
  window.localStorage.removeItem("movai.tokenRemember");
  window.sessionStorage.removeItem("movai.session");
};

Authentication.checkLogin = async () => {
  const token = window.localStorage.getItem("movai.token");
  const refreshToken = window.localStorage.getItem("movai.refreshToken");
  const tokenRemember = window.localStorage.getItem("movai.tokenRemember");
  const sessionFlag = window.sessionStorage.getItem("movai.session");

  if (token === null || refreshToken === null) {
    return false;
  }

  let tokenData = null;
  try {
    tokenData = jwtDecode(token);
  } catch (e) {
    return false;
  }

  // Check if token expired
  if (tokenData["exp"] > new Date().getTime() / 1000) {
    return true;
  }

  // Check SessionStorage flag
  if (tokenRemember == "false" && sessionFlag === null) {
    logout();
    return false;
  }

  // Token has expired... Get new Token
  if (refreshToken) {
    // Try to get new token
    try {
      // Refresh Token
      const refreshTokenData = jwtDecode(refreshToken);
      if (refreshTokenData["exp"] < new Date().getTime() / 1000) {
        throw "refresh token has expired";
      }

      const url = `${REST_API}/token-refresh/`;
      const headers = { "Content-Type": "application/json" };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ token: refreshToken })
      });

      const { status } = response;
      let data = await response.json();

      if (status === 200) {
        window.localStorage.setItem("movai.token", data["access_token"]);
        window.localStorage.setItem(
          "movai.refreshToken",
          data["refresh_token"]
        );
        return true;
      }
    } catch (e) {
      // Pass
    }
  }

  return false;
};

export default Authentication;
