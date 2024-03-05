import React, { useCallback, useEffect, useState } from "react";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { User } from "@mov-ai/mov-fe-lib-core";
import AppsIcon from "@mui/icons-material/Apps";
import Tooltip from "@mui/material/Tooltip";
import { APP_TYPES, LAUNCHER_APP } from "../../Utils/Constants";
import i18n from "i18next";
import HTMLPopper from "../Popper/HTMLPopper";
import HomeMenuSkeleton from "./HomeMenuSkeleton";
import MenuApp from "./MenuApp";
import { App } from "./types";

import { homeMenuPopperStyles } from "./styles";

const HomeMenuPopper = () => {
  // State hooks
  const classes = homeMenuPopperStyles();
  const [currentApps, setCurrentApps] = useState<App[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  //========================================================================================
  /*                                                                                      *
   *                                      SUBSCRIBERS                                     *
   *                                                                                      */
  //========================================================================================
  /**
   * subscribe to Applications updates
   */
  useEffect(() => {
    (new User())
      .getAllApps()
      .then(res => {
        res.success && setCurrentApps(res.result as any);
      })
      .catch(err => {
        setErrorMessage(err.statusText);
      });
  }, []);

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
            {i18n.t("NoApplications") as any}
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
      const arrayOfApplications: App[] = [];
      const arrayOfExternalApps: App[] = [];
      const arrayOfLayouts: App[] = [];

      currentApps.forEach((app: App) => {
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
          {arrayOfLayouts.length > 0 && (
            <>
              <Divider orientation="horizontal" flexItem />
              {arrayOfLayouts.map(app => (
                <MenuApp key={app.URL} app={app} />
              ))}
            </>
          )}
          {arrayOfExternalApps.length > 0 && (
            <>
              <Divider orientation="horizontal" flexItem />
              {arrayOfExternalApps.map(app => (
                <MenuApp key={app.URL} app={app} />
              ))}
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
    <Tooltip title={i18n.t("Home") || "Home" as any} placement="right">
      {/* Tooltips - To accommodate disabled elements, add a simple wrapper element, such as a span. */}
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
