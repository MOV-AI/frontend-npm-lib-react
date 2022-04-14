import { makeStyles } from "@material-ui/core";

export const infoButtonStyles = makeStyles(theme => ({
  childWrapper: {
    padding: "10px 0",
    top: "auto",
    left: "auto",
    opacity: 1,
    transition: "all 200ms ease 0s",
    maxWidth: "400px"
  },
  popper: {
    zIndex: 10000,
    borderRadius: "10px"
  },
  transitionIn: {
    transition: "none 0s ease 0s"
  }
}));
