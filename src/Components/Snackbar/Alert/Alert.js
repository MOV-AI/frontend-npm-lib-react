import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import SuccessOutlinedIcon from "./svg-icons/SuccessOutlined";
import ReportProblemOutlinedIcon from "./svg-icons/ReportProblemOutlined";
import ErrorOutlineIcon from "./svg-icons/ErrorOutline";
import InfoOutlinedIcon from "./svg-icons/InfoOutlined";
import CloseIcon from "./svg-icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { capitalize } from "@material-ui/core/utils";

export const styles = () => {
  return {
    /* Styles applied to the root element. */
    root: {
      // borderRadius: theme.shape.borderRadius,
      backgroundColor: "transparent",
      display: "flex",
      padding: "6px 16px"
    },
    /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
    filledSuccess: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#4caf50"
    },
    /* Styles applied to the root element if `variant="filled"` and `color="info"`. */
    filledInfo: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#2196f3"
    },
    /* Styles applied to the root element if `variant="filled"` and `color="warning"`. */
    filledWarning: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#ff9800"
    },
    /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
    filledError: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#f44336"
    },
    /* Styles applied to the icon wrapper element. */
    icon: {
      marginRight: 12,
      padding: "7px 0",
      display: "flex",
      fontSize: 22,
      opacity: 0.9
    },
    /* Styles applied to the message wrapper element. */
    message: {
      padding: "8px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      paddingLeft: 16,
      marginRight: -8
    }
  };
};

// const defaultIconMapping = {
//   success: <SuccessOutlinedIcon fontSize="inherit" />,
//   warning: <ReportProblemOutlinedIcon fontSize="inherit" />,
//   error: <ErrorOutlineIcon fontSize="inherit" />,
//   info: <InfoOutlinedIcon fontSize="inherit" />
// };
const defaultIconMapping = {
  success: <div>i</div>,
  warning: <div>i</div>,
  error: <div>i</div>,
  info: <div>i</div>
};

const Alert = props => {
  const {
    action,
    children,
    classes,
    className,
    closeText = "Close",
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = "alert",
    severity = "success",
    variant = "standard",
    theme,
    ...other
  } = props;

  console.log("action", action);

  return (
    <div
      className={clsx(
        classes.root,
        classes[`${variant}${capitalize(color || severity)}`],
        className
      )}
      {...other}
    >
      {icon !== false ? (
        <div className={classes.icon}>
          {icon || iconMapping[severity] || defaultIconMapping[severity]}
        </div>
      ) : null}
      <div className={classes.message}>{children}</div>
      {action != null ? <div className={classes.action}>{action}</div> : null}
      {action == null && onClose ? (
        <div className={classes.action}>
          <IconButton
            size="small"
            aria-label={closeText}
            title={closeText}
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" onClick={onClose} />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};

Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: PropTypes.string,
  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: PropTypes.oneOf(["error", "info", "success", "warning"]),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: PropTypes.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The ARIA role attribute of the element.
   */
  role: PropTypes.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity: PropTypes.oneOf(["error", "info", "success", "warning"]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["filled", "outlined", "standard"])
};

export default withStyles(styles, { name: "MuiAlert" })(Alert);
