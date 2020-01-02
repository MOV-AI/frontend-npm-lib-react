import Authentication from "../Authentication/Authentication";
import AuthWebSocket from "../AuthWebSocket/AuthWebSocket";
const { getToken, AuthException, checkLogin } = Authentication;

class Database {
  constructor() {
    this.host = `${window.location.hostname}:${window.location.port}`;
    this.WS_API = "ws://" + this.host + "/ws/subscriber";
    this.REST_API = "http://" + this.host + "/api/v1/";
    this.callbacks = {};
    this.evt_callbacks = {};
    this.timeout = 3000;
    this.websocket = undefined;
    this.connect();
  }

  connect = () => {
    this.websocket = new AuthWebSocket({
      url: this.WS_API,
      onOpen: this.onOpen,
      onClose: this.onClose,
      onError: this.onError,
      onMessage: this.onMessage,
      connectionHandler: null
    });
    this.websocket.createSocket();
  };

  onOpen = evt => {
    this.dispatch("onopen", undefined);
  };

  onClose = evt => {
    this.dispatch("onclose", undefined);
    if (evt.code !== 1000) {
      window.setTimeout(this.connect(), this.timeout);
    }
  };

  onMessage = evt => {
    let data;
    try {
      data = JSON.parse(evt.data);
    } catch (err) {
      console.error(err);
      return;
    }
    if (data.error) {
      console.error(data.error);
      return;
    }
    let patterns = data.patterns;
    let is_pattern = true;
    let one_shot = false;
    if (["list", "unsubscribe", "subscribe"].includes(data.event)) {
      patterns = patterns.map(p => {
        if (data.event === "unsubscribe") {
          delete this.callbacks[JSON.stringify(p)];
        }
        return data.event + "/" + JSON.stringify(p);
      });
      if (data.event === "list") {
        patterns = ["list"];
      }

      is_pattern = false;
      one_shot = true;
    }

    patterns.map(pattern => {
      this.dispatch(pattern, data, is_pattern, one_shot);
    });
  };

  /////TEST
  checkTest = (pattern, data, is_pattern, one_shot) => {
    return new Promise((resolve, reject) => {
      this.dispatch(pattern, data, is_pattern, one_shot);
      if (true) {
        resolve("DONE");
      }
    });
  };

  onError = evt => {
    this.dispatch("onerror", undefined);
  };

  /* Subscribe to websocket events onopen, onclose, onerror*/
  onEvent = (event_name, callback = undefined) => {
    this.evt_callbacks[event_name] = this.evt_callbacks[event_name] || [];
    this.evt_callbacks[event_name].push(callback);
  };

  close = () => this.websocket.close();

  /* Subscribe to redis pattern */
  subscribe = (_pattern, callback = undefined, evt_callback = undefined) => {
    const message = { event: "subscribe", pattern: _pattern };
    let pattern = JSON.stringify(_pattern);
    this.callbacks[pattern] = this.callbacks[pattern] || [];
    this.callbacks[pattern].push(callback);
    if (evt_callback) {
      this.evt_callbacks["subscribe/" + pattern] =
        this.evt_callbacks["subscribe" + pattern] || [];
      this.evt_callbacks["subscribe/" + pattern].push(evt_callback);
    }
    this._send(message);
  };

  unsubscribe = (_pattern, evt_callback = undefined) => {
    console.log("Unsubscribe called " + JSON.stringify(_pattern));
    const message = { event: "unsubscribe", pattern: _pattern };
    var pattern = JSON.stringify(_pattern);
    if (evt_callback) {
      this.evt_callbacks["unsubscribe/" + pattern] =
        this.evt_callbacks["unsubscribe/" + pattern] || [];
      this.evt_callbacks["unsubscribe/" + pattern].push(evt_callback);
    }
    this._send(message);
  };

  /* List all subscribed patterns */
  list = (evt_callback = undefined) => {
    const message = { event: "list" };
    this.evt_callbacks["list"] = this.evt_callbacks["list"] || [];
    this.evt_callbacks["list"].push(evt_callback);
    this._send(message);
  };

  _send = message => {
    this.websocket.send(JSON.stringify(message));
  };

  /* Trigger callbacks attached to patterns and events*/
  dispatch = (_pattern, message, is_pattern = false, one_shot = false) => {
    /*if is_pattern is false then pattern is an event thus trigger evt_callbacks */
    let _callbacks = undefined;
    var pattern = _pattern;
    if (is_pattern === true) {
      pattern = JSON.stringify(_pattern);
      _callbacks = this.callbacks[pattern];
    } else {
      _callbacks = this.evt_callbacks[pattern];
    }

    if (_callbacks === undefined) return;
    for (let i = 0; i < _callbacks.length; i++) {
      if (typeof _callbacks[i] === "function") {
        _callbacks[i](message);
      }
    }
    if (_callbacks) {
      if (one_shot === true) {
        _callbacks = [];
      } else {
        //NOTHING
      }
    }
  };

  /**
   * STOPPED HERE
   */

  /* Get value from key in Var, scope fleet or global */
  getVar = (key, callback = undefined, scope = "global") => {
    if (!["global", "fleet"].includes(scope)) {
      throw "Only fleet and global scopes available.";
    }
    if (scope === "fleet") {
      // key format: robot_name@key_name
      if (key.split("@").length < 2) {
        throw "Wrong key format (robot_name@key_name)";
      }
    }
    const url = this.REST_API + "Var/" + scope + "/" + key + "/";

    checkLogin().then(res => {
      fetch(url)
        .then(response => response.json())

        .then(data => {
          if (callback) {
            callback(data);
          } else {
            //NOTHING
          }
        });
    });
  };

  /* Set value from key in Var, scope fleet or global */
  setVar = (key, value, callback = undefined, scope = "global") => {
    if (!["global", "fleet"].includes(scope)) {
      throw "Only fleet and global scopes available.";
    }
    if (scope === "fleet") {
      // key format: robot_name@key_name
      const values = key.split("@");
      if (key.split("@").length < 2) {
        throw "Wrong key format (robot_name@key_name)";
      }
    }
    const data = { key: key, scope: scope, value: value };
    const url = this.REST_API + "Var/";

    checkLogin().then(res => {
      if (!res) {
        throw new AuthException("login error");
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      }).then(res => {
        if (callback) {
          callback(res);
        }
      });
    });
  };

  /**
   * Set value from key in Scope
   * @param scope String
   * @param name String - Instance Name
   * @param key String - Key to override
   * @param value Obj
   * @param callback function
   * @memberof Database
   */
  post = (scope, name, key, value, callback = undefined) => {
    let url = this.REST_API + scope + "/" + name + "/";
    if (name === undefined) {
      url = this.REST_API + scope + "/";
    }

    checkLogin().then(res => {
      if (!res) {
        throw new AuthException("login error");
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify({ key: key, data: value }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      }).then(res => {
        if (callback) {
          res.json().then(data => {
            callback(data, res);
          });
        }
      });
    });
  };

  upload = (packageName, key, value, callback = undefined) => {
    const url = `${this.REST_API}upload/${packageName}/`;
    const formData = new FormData();
    formData.append("name", key);
    formData.append(`data`, value);
    fetch(url, { method: "POST", body: formData })
      .then(res => res.json())
      .then(callback);
  };

  /**
   * Update key
   * @param scope String
   * @param name String - Instance Name
   * @param value Obj
   * @param callback function
   * @memberof Database
   */
  put = (scope, name, value, callback = undefined) => {
    let url = this.REST_API + scope + "/" + name + "/";
    console.log("database put", url);
    if (name === undefined) {
      url = this.REST_API + scope + "/";
    }

    checkLogin().then(res => {
      if (!res) {
        throw new AuthException("login error");
      }

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      }).then(res => {
        if (callback) {
          res
            .json()
            .then(data => {
              callback(data, res);
            })
            .catch(e => {
              callback(undefined, res);

              if (process.env.NODE_ENV === "development") {
                alert(
                  "Development Mode \n" +
                    "Status: " +
                    res.status +
                    "\n" +
                    "Error: " +
                    res.statusText
                );
              }
            });
        }
      });
    });
  };

  /**
   * Set value from key in Scope
   * @param scope String
   * @param name String - Instance Name
   * @param key String - Key to override
   * @param value Obj
   * @param callback function
   * @memberof Database
   */
  delete = (scope, name, callback = undefined, data = {}) => {
    let url = this.REST_API + scope + "/" + name + "/";
    if (name === undefined) {
      url = this.REST_API + scope + "/";
      return;
    }

    checkLogin().then(res => {
      if (!res) {
        throw new AuthException("login error");
      }

      fetch(url, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      }).then(res => {
        if (callback) {
          res
            .json()
            .then(data => {
              callback(data, res);
            })
            .catch(e => {
              callback(undefined, res);

              if (process.env.NODE_ENV === "development") {
                alert(
                  "Development Mode \n" +
                    "Status: " +
                    res.status +
                    "\n" +
                    "Error: " +
                    res.statusText
                );
              }
            });
        }
      });
    });
  };

  /**
   * Set value from key in Scope
   * @param cloudFunction String - callback name
   * @param func String - Function in the callback. default ""
   * @param args Object - Args {key:value}... key is the param in the function
   * @param callback func - Callback to parse the response
   * @memberof Database
   */
  cloudFunction = (cloudFunction, func = "", args, callback = undefined) => {
    checkLogin().then(res => {
      if (!res) {
        throw new AuthException("login error");
      }

      const url = this.REST_API + "function/" + cloudFunction + "/";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ func: func, args: args }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      }).then(res => {
        if (callback) {
          res.json().then(data => callback(data));
        }
      });
    });
  };

  /**
   * Set tabs in a currentUser
   * @param scope String
   * @param name String - Instance Name
   * @param key String - Key to override
   * @param value Obj
   * @param callback function
   * @memberof Database
   */
  postTabs = (name, value, callback = undefined) => {
    let scope = "User";
    let url = this.REST_API + scope + "/" + name + "/";
    if (name === undefined) {
      url = this.REST_API + scope + "/";
      return;
    }
    let newValue = value.map(obj => {
      return { componentName: obj.componentName, name: obj.name };
    });
    const key_workspace = {
      Workspace: "*"
    };

    checkLogin().then(res => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ key: key_workspace, data: newValue }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      }).then(res => {
        if (callback) {
          res
            .json()
            .then(data => {
              callback(data, res);
            })
            .catch(e => {
              callback(undefined, res);

              if (process.env.NODE_ENV === "development") {
                alert(
                  "Development Mode \n" +
                    "Status: " +
                    res.status +
                    "\n" +
                    "Error: " +
                    res.statusText
                );
              }
            });
        }
      });
    });
  };
}

export default Database;
