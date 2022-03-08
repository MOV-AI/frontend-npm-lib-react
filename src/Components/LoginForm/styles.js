import { makeStyles } from "@material-ui/core/styles";

export const advancedLoginArea = makeStyles(theme => ({
  formControl: {
    width: "50%"
  },
  container: {
    flexGrow: 1
  },
  expandCollapseButton: {
    width: "50%",
    justifyContent: "space-between",
    paddingLeft: "1px",
    paddingRight: "0px",
    marginTop: "12px"
  },
  label: {
    fontSize: "11px"
  },
  providerSelectorInput: {
    display: "flex"
  },
  grid: {
    justifyContent: "center"
  }
}));
