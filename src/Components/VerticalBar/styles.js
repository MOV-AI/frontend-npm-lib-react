import { bindMagic } from "@tty-pt/styles";

export default bindMagic(theme => ({
  verticalBar: {
    width: "65px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center"
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    },
  },
}));
