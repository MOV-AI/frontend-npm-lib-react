import { makeStyles } from "@material-ui/core/styles";

export const profileMenuStyles = makeStyles(theme => {
  return {
    menuItemSpacing: {
      fontSize: "18px",
      minHeight: "18px",
      padding: theme.spacing(1.25, 2),
      ...theme.cursorDefault
    },
    profileMenuFooter: {
      fontSize: "14px",
      textAlign: "end"
    }
  };
});
