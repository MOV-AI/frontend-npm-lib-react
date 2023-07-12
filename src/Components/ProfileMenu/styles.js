import { bindMagic } from "@tty-pt/styles";

export const profileMenuStyles = bindMagic(theme => {
  return {
    root: { // c("vertical0")
      display: "flex",
      flexDirection: "column",
    },
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

export const resetPasswordStyles = bindMagic(() => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    fontSize: "13px",
    margin: "10px"
  },
  formGroup: {
    display: "flex",
    flexFlow: "column"
  }
}));
