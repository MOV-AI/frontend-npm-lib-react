// Inspired from https://github.com/GA-MO/react-confirm-alert

import React, { Component } from "react";
import PropTypes from "prop-types";
import { render, unmountComponentAtNode } from "react-dom";
// import { Alert } from "@material-ui/lab";
import Alert from "./Alert/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import "./Snackbar.css";

const styles = theme => ({
  root: {}
});

class ReactConfirmAlert extends Component {
  static propTypes = {
    message: PropTypes.string,
    customUI: PropTypes.func,
    closeOnClickOutside: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    willUnmount: PropTypes.func,
    onClickOutside: PropTypes.func,
    onKeypressEscape: PropTypes.func,
    // new props
    severity: PropTypes.string,
    closeText: PropTypes.string,
    autoHideDuration: PropTypes.number,
    closable: PropTypes.bool
  };

  autoClose = null;

  static defaultProps = {
    closeOnClickOutside: true,
    closeOnEscape: true,
    willUnmount: () => null,
    onClickOutside: () => null,
    onKeypressEscape: () => null,
    // new props
    severity: "info", // error, warning, info or success
    closeText: "Close",
    autoHideDuration: 6000,
    closable: true
  };

  handleClickButton = button => {
    if (button.onClick) button.onClick();
    this.close();
  };

  handleClickOverlay = e => {
    const { closeOnClickOutside, onClickOutside } = this.props;
    const isClickOutside = e.target === this.overlay;

    if (closeOnClickOutside && isClickOutside) {
      onClickOutside();
      this.close();
    }
  };

  close = () => {
    removeBodyClass();
    removeElementReconfirm();
  };

  keyboardClose = event => {
    const { closeOnEscape, onKeypressEscape } = this.props;
    const isKeyCodeEscape = event.keyCode === 27;

    if (closeOnEscape && isKeyCodeEscape) {
      onKeypressEscape(event);
      this.close();
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.keyboardClose, false);
    this.autoClose = setTimeout(() => {
      if (
        document.getElementById("react-confirm-alert") ||
        document.getElementById("react-confirm-alert-body-element")
      ) {
        this.close();
      }
    }, this.props.autoHideDuration);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.keyboardClose, false);
    clearTimeout(this.autoClose);
    this.props.willUnmount();
  };

  renderCustomUI = () => {
    const { title, message, customUI } = this.props;
    const dataCustomUI = {
      title,
      message,
      onClose: this.close
    };

    return customUI(dataCustomUI);
  };

  render() {
    const {
      message,
      customUI,
      severity,
      closeText,
      closable,
      theme
    } = this.props;

    console.log("theme inside snackbar", theme);

    return (
      <div
        className="react-confirm-alert-overlay"
        ref={dom => (this.overlay = dom)}
        onClick={this.handleClickOverlay}
      >
        <div className="react-confirm-alert">
          {customUI ? (
            this.renderCustomUI()
          ) : (
            <div className="react-confirm-alert-body">
              <Alert
                theme={theme}
                elevation={6}
                variant="filled"
                severity={severity}
                closeText={closeText}
                action={
                  closable ? (
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={() => this.close()}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    undefined
                  )
                }
              >
                {message}
              </Alert>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function createElementReconfirm(properties, theme) {
  let divTarget = document.getElementById("react-confirm-alert");
  if (divTarget) {
    // Rerender - the mounted ReactConfirmAlert
    render(<ReactConfirmAlert {...properties} theme={theme} />, divTarget);
  } else {
    // Mount the ReactConfirmAlert component
    document.body.children[0].classList.add("react-confirm-alert-blur");
    divTarget = document.createElement("div");
    divTarget.id = "react-confirm-alert";
    document.body.appendChild(divTarget);
    render(<ReactConfirmAlert {...properties} theme={theme} />, divTarget);
  }
}

function removeElementReconfirm() {
  const target = document.getElementById("react-confirm-alert");
  unmountComponentAtNode(target);
  target.parentNode.removeChild(target);
}

function addBodyClass() {
  document.body.classList.add("react-confirm-alert-body-element");
}

function removeBodyClass() {
  document.body.classList.remove("react-confirm-alert-body-element");
}

export function snackbar(properties, theme) {
  addBodyClass();
  createElementReconfirm(properties, theme);
}

export default withStyles(styles, { withTheme: true })(ReactConfirmAlert);
