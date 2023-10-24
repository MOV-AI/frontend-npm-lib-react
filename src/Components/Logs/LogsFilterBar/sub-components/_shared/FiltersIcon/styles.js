import { alpha } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export const filterIconStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1) + " !important",
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main
  },
  iconActive: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1)
  },
  buttonApplyFilters: {
    background: theme.palette.primary.main,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#FAFAFA",
    margin: "0px 20px 10px 20px",
    "&:hover": { background: theme.palette.primary.dark }
  },
  icon: {
    "&:hover": { cursor: "pointer" }
  },
  height: { height: "100%" },
  checkbox: { marginLeft: "10px" },
  limitText: {
    width: "50px",
    margin: theme.spacing(0, 3, 0, 3) + "!important",
  },
  filterIconRoot: {
    display: "flex",
    flexDirection: "column",
    height: "-webkit-fill-available"
  },
  titleRow: {
    padding: "10px 10px 0px 20px",
    display: "flex",
    flexDirection: "row",
    "& > div.text": {
      fontSize: "24px",
      fontFamily: "Open Sans",
      fontWeight: 500
    }
  },
  spacer: {
    flexGrow: 1
  },
  childrenContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    margin: "10px 0px 0px 10px"
  }
}));
