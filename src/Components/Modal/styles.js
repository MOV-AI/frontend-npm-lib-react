import { makeStyles } from "@tty-pt/styles";

export const modalStyles = makeStyles(theme => {
  return {
    modal: {
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
    },
  };
});
