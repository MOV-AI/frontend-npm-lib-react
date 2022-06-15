import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "react-virtualized";

export const HomeMenuPopperStyles = makeStyles(theme => ({
  iconButton: { cursor: "pointer", height: "100%" },
  popperIndex: { zIndex: 1400 },
  menuWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    minWidth: "320px",
    minHeight: "400px",
    padding: "0px",
    flexBasis: "29%"
  },
  appMiniature: {
    color: theme.palette.getContrastText("#fff"),
    width: "60px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  appIcon: {
    color: theme.palette.getContrastText("#fff"),
    fontSize: "48px",
    marginBottom: "10px",
    marginTop: "20px"
  },
  menuButton: {
    margin: "5px",
    padding: "0px",
    flexBasis: "27%"
  },
  menuTooltip: {
    zIndex: 999999
  },
  logo: {
    flexGrow: 1,
    fontSize: "50px",
    textAlign: "center",
    lineHeight: "75px",
    color: "inherit"
  },
  appTitle: {
    height: "25%",
    width: "100%",
    textAlign: "center",
    color: "inherit"
  },
  skeleton: {
    margin: "0 10px"
  },
  skeletonCard: {
    height: "20px"
  },
  noApplications: {
    width: "350px",
    height: "100px",
    display: "grid",
    justifyItems: "center",
    gridTemplateRows: "70% 30%"
  },
  launcherButton: { cursor: "pointer" }
}));
