import Authentication from "../Authentication/Authentication";

const { checkLogin, getToken, AuthException } = Authentication;

export default class AuthWebSocket {
  constructor({
    url = this.wsUrl,
    onOpen = null,
    onClose = null,
    onError = null,
    onMessage = null,
    connectionHandler = null
  }) {
    this.onOpen = onOpen === null ? this._onOpen : onOpen;
    this.onClose = onClose === null ? this._onClose : onClose;
    this.onError = onError === null ? this._onError : onError;
    this.onMessage = onMessage === null ? this._onMessage : onMessage;
    this.connectionHandler =
      connectionHandler === null ? this._connectionHandler : connectionHandler;

    this.wsUrl = url;
    this.socket = false;
    this.timerId = false;
    this.connected = false;
  }

  _onOpen = evt => {
    console.log("Socket Open: ", evt);
  };

  _onClose = evt => {
    console.log("Socket Close: ", evt);

    this.connected = false;

    // Deal with reconnecting the socket
    this.socket = null;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.createSocket();
    }, 5000);
  };

  _onError = evt => {
    this.connected = false;
    console.log("Socket Error: ", evt);
  };

  _onMessage = evt => {
    console.log("Socket Message: ", evt);
  };

  _connectionHandler = value => {
    console.log("Invalid Token, no handler specified! ", value);
  };

  createSocket(url = false) {
    let sock = false;

    checkLogin()
      .then(res => {
        if (!res) {
          throw new AuthException("login error");
        }

        url = url !== false ? url : this.wsUrl;
        //const wsUrl = `${url}?token=${getToken()}`;

        let wsUrl = new URL(url);
        let params = new URLSearchParams(wsUrl.search.slice(1));
        params.set("token", getToken());
        wsUrl.search = params;

        sock = new WebSocket(wsUrl.toString());
        sock.onopen = this.onOpen;
        sock.onerror = this.onError;
        sock.onclose = this.onClose;
        sock.onmessage = this.onMessage;

        this.socket = sock;
      })
      .catch(e => {
        if (e.name === "AuthException") {
          this.connectionHandler(false);
        }
      });
  }

  send(data) {
    checkLogin()
      .then(res => {
        if (!res) {
          throw new AuthException("login error");
        }

        this.socket.send(data);
      })
      .catch(e => {
        switch (e.name) {
          case "AuthException":
            this.connectionHandler(false);
            break;

          case "InvalidStateError":
            // In case of the socket is not-ready, re-try sending the message until success
            var self = this;
            let sub_interval = undefined;
            sub_interval = setInterval(
              () => {
                if (self.socket.readyState === 1) {
                  clearInterval(sub_interval);
                  self.socket.send(data);
                }
              },
              400,
              sub_interval
            );
            break;
        }
      });
  }

  close() {
    if (this.socket) {
      this.socket.close();
      clearTimeout(this.timerId);
      this.connected = false;
    }
  }
}
