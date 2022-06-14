import React, { useEffect, useMemo } from "react";
import { Button, Divider, IconButton, Typography } from "@material-ui/core";
import { User, Utils } from "@mov-ai/mov-fe-lib-core";
import AppsIcon from "@material-ui/icons/Apps";
import { HomeMenuPopperStyles } from "./styles";
import HomeMenuSkeleton from "./HomeMenuSkeleton";
import HTMLPopper from "../Popper/HTMLPopper";
import { APP_TYPES, LAUNCHER_APP } from "../../Utils/Constants";
import i18n from "../../i18n/i18n.js";

const HomeMenuPopper = () => {
  // State hooks
  const classes = HomeMenuPopperStyles();
  const [currentApps, setCurrentApps] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");

  // Other hooks
  const currentUser = useMemo(() => new User(), []);

  //========================================================================================
  /*                                                                                      *
   *                                      SUBSCRIBERS                                     *
   *                                                                                      */
  //========================================================================================
  /**
   * subscribe to Applications updates
   */
  useEffect(() => {
    currentUser
      .getAllApps()
      .then(res => {
        res.success && setCurrentApps(res.result);
      })
      .catch(err => {
        setErrorMessage(err.statusText);
      });
  }, [currentUser]);

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================
  const getIcon = () => {
    return (
      <IconButton color="primary" component="span">
        <AppsIcon />
      </IconButton>
    );
  };

  /**
   * Handle app click
   * @param {Event} event : click event
   * @param {object} element : App object
   */
  const onAppClick = (event, app) => {
    if (app.Label) {
      Utils.loadResources(event, app);
    }
  };

  const redirectToLocalhost = () =>
    window.location.replace(window.location.origin); // go to localhost or localhost:3000

  //========================================================================================
  /*                                                                                      *
   *                                        RENDERS                                       *
   *                                                                                      */
  //========================================================================================
  const renderApplications = apps => {
    return apps.map(app => (
      <Button
        data-testid="input_application"
        key={app.URL}
        size="large"
        color="primary"
        className={classes.menuButton}
        onClick={event => onAppClick(event, app)}
      >
        <div className={classes.appTextArea}>
          <div className={`${classes.appIcon} ${app.Icon}`} />
          <div className={classes.appMiniature}>{app.Label}</div>
        </div>
      </Button>
    ));
  };

  const renderHTML = () => {
    if (errorMessage)
      return (
        <div
          className={classes.noApplications}
          data-testid="section_no-applications"
        >
          <Typography variant="subtitle1">
            {i18n.t("noApplications")}
          </Typography>
          <Button
            data-testid="input_launcher"
            size="large"
            variant="outlined"
            color="primary"
            className={classes.launcherButton}
            onClick={redirectToLocalhost}
          >
            {LAUNCHER_APP.toUpperCase()}
          </Button>
        </div>
      );
    if (currentApps) {
      const arrayOfApplications = [];
      const arrayOfExternalApps = [];
      const arrayOfLayouts = [];

      currentApps.forEach(app => {
        const appType = app.Type;

        if (appType === APP_TYPES.APPLICATION && app.Label !== LAUNCHER_APP)
          arrayOfApplications.push(app);

        if (appType === APP_TYPES.EXTERNAL) arrayOfExternalApps.push(app);

        if (appType === APP_TYPES.LAYOUT) arrayOfLayouts.push(app);
      });
      return (
        <>
          <div className={classes.menuWrapper}>
            {renderApplications(arrayOfApplications)}
            {arrayOfLayouts.length > 1 && (
              <>
                <Divider orientation="horizontal" flexItem />
                {renderApplications(arrayOfLayouts)}
              </>
            )}
            {arrayOfExternalApps.length > 1 && (
              <>
                <Divider orientation="horizontal" flexItem />
                {renderApplications(arrayOfExternalApps)}
              </>
            )}
          </div>
        </>
      );
    } else {
      return <HomeMenuSkeleton />;
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <HTMLPopper
      clickableElement={getIcon()}
      hideOnClickAway={true}
      popperPlacement="bottom"
    >
      {renderHTML()}
    </HTMLPopper>
  );
};

export default HomeMenuPopper;
