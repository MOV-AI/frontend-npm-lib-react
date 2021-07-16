import React, { useEffect } from "react";
import { MasterDB } from "@mov-ai/mov-fe-lib-core";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  alert: { position: "absolute", bottom: 0, width: "100%" }
}));

export default function withOfflineValidation(Component) {
  return function (props) {
    const [isConnected, setConnected] = React.useState(true);
    const [showSuccessAlert, setSuccessAlert] = React.useState(false);
    const [validator, setValidator] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    /**
     * Start offline validation
     */
    useEffect(() => {
      const _validator = MasterDB.offlineValidation({ onOnline, onOffline });
      setValidator(_validator);
    }, []);

    const onOnline = () => {
      setConnected(true);
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 2000);
    };

    const onOffline = () => {
      setConnected(false);
    };

    const retryConnection = () => {
      setLoading(true);
      validator.retryConnection().then(() => setLoading(false));
    };

    /**
     * renders the Login form if the user is not logged in
     */
    return (
      <React.Fragment>
        <React.Fragment>
          <Component {...props} />
          {!isConnected && (
            <Alert
              className={classes.alert}
              variant="filled"
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={retryConnection}>
                  {loading ? (
                    <CircularProgress
                      size={20}
                      color="inherit"
                    ></CircularProgress>
                  ) : (
                    "RETRY"
                  )}
                </Button>
              }
            >
              Connection failed... You're now in offline mode, please wait to
              reconnect.
            </Alert>
          )}
          {isConnected && showSuccessAlert && (
            <Alert
              className={classes.alert}
              variant="filled"
              severity="success"
            >
              You're now online!
            </Alert>
          )}
        </React.Fragment>
      </React.Fragment>
    );
  };
}
