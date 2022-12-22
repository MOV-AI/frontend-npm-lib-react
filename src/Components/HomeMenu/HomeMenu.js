import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Button, Divider, IconButton, Typography } from "@material-ui/core";
import { User } from "@mov-ai/mov-fe-lib-core";
import AppsIcon from "@material-ui/icons/Apps";
import Tooltip from "@material-ui/core/Tooltip";
import { APP_TYPES, LAUNCHER_APP } from "../../Utils/Constants";
import i18n from "../../i18n/i18n.js";
import HTMLPopper from "../Popper/HTMLPopper";
import HomeMenuSkeleton from "./HomeMenuSkeleton";
import MenuApp from "./MenuApp";

import { homeMenuPopperStyles } from "./styles";

const HomeMenuPopper = () => {
  // State hooks
  const classes = homeMenuPopperStyles();
  const [currentApps, setCurrentApps] = useState();
  const [errorMessage, setErrorMessage] = useState("");

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

  const redirectToLocalhost = useCallback(() => {
    window.location.replace(window.location.origin); // go to localhost or localhost:3000
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                        RENDERS                                       *
   *                                                                                      */
  //========================================================================================

  const renderHTML = () => {
    if (errorMessage) {
      return (
        <div
          className={classes.noApplications}
          data-testid="section_no-applications"
        >
          <Typography variant="subtitle1">
            {i18n.t("NoApplications")}
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
    }

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
        <div className={classes.menuWrapper}>
          {arrayOfApplications.map(app => (
            <MenuApp key={app.URL} app={app} />
          ))}
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
      );
    }

    return <HomeMenuSkeleton />;
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <Tooltip title={i18n.t("Home")} placement="right">
      <span>
        <HTMLPopper
          clickableElement={getIcon()}
          hideOnClickAway={true}
          popperPlacement="bottom"
        >
          {renderHTML()}
        </HTMLPopper>
      </span>
    </Tooltip>
  );
};

export default HomeMenuPopper;
