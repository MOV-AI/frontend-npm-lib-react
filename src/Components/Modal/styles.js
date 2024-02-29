import { makeStyles } from "@mui/styles";

export const modalStyles = makeStyles(theme => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    card: {
      margin: "auto",
      position: "absolute",
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
      maxHeight: "98%"
    },
    cardContent: {
      flexGrow: 1,
      maxHeight: "calc(100% - 70px)",
      display: "flex",
      gap: "16px",
      flexDirection: "column",
      overflowY: "auto"
    },
    divider: {
      marginBottom: "12px"
    },
    childrenContainer: {
      maxHeight: "calc(100% - 35px)",
      overflowY: "auto",
      paddingTop: "5px"
    },
    closeButton: {
      cursor: "pointer",
      position: "absolute",
      color: theme.textColor,
      top: "15px",
      right: "15px",
      "&:hover": {
        color: "gray"
      }
    }
  };
});
