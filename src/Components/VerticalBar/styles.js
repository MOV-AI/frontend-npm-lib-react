import { bindMagic } from "@tty-pt/styles";

export const verticalBarStyles = bindMagic(() => ({
  container: {
    width: "65px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: props => props.backgroundColor
  },
  divider: {
    width: "100%"
  },
  logoArea: {
    padding: "17px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  navigationArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  navigationItem: {
    padding: "15px 0px"
  },
  growArea: {
    flexGrow: 1
  },
  accountArea: {
    padding: props => (props.unsetAccountAreaPadding ? "unset" : "17px"),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
}));
