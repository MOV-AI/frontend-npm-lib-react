import { makeStyles } from "@material-ui/styles";

export const profileMenuStyles = makeStyles((theme) => {
  return {
    viewRoot: {
      padding: "16px",
    },
    root: {
      // c("vertical0")
      display: "flex",
      flexDirection: "column",
    },
    menuItemSpacing: {
      fontSize: "18px",
      minHeight: "18px",
      padding: theme.spacing(1.25, 2) + " !important",
      ...theme.cursorDefault,
    },
    profileMenuFooter: {
      fontSize: "14px",
      textAlign: "end",
    },
  };
});

export const resetPasswordStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    fontSize: "13px",
    margin: "10px",
  },
  formGroup: {
    display: "flex",
    flexFlow: "column",
  },
}));
