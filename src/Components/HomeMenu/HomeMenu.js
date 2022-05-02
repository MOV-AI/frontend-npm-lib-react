import React from "react";
import { Button, Divider, IconButton } from "@material-ui/core";
import { User, Utils } from "@mov-ai/mov-fe-lib-core";
import AppsIcon from "@material-ui/icons/Apps";
import { HomeMenuPopperStyles } from "./styles";
import HomeMenuSkeleton from "./HomeMenuSkeleton";
import HTMLPopper from "../Popper/HTMLPopper";
import { APP_TYPES } from "../../Utils/Constants";

const HomeMenuPopper = () => {
  const classes = HomeMenuPopperStyles();
  const [currentApps, setCurrentApps] = React.useState(false);

  const currentUser = new User();

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
    if (app.Label !== undefined) {
      Utils.loadResources(event, app);
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                      SUBSCRIBERS                                     *
   *                                                                                      */
  //========================================================================================
  /**
   * subscribe to Applications updates
   */
  currentUser.getAllApps().then(res => {
    res.success && setCurrentApps(res.result);
  });

  //========================================================================================
  /*                                                                                      *
   *                                        RENDERS                                       *
   *                                                                                      */
  //========================================================================================
  const renderApplications = apps => {
    return apps.map(app => (
      <Button
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
    if (currentApps) {
      const arrayOfApplications = currentApps.filter(
        app => app.Type === APP_TYPES.APPLICATION && app.Label !== "launcher"
      );
      const arrayOfExternalApps = currentApps.filter(
        app => app.Type === APP_TYPES.EXTERNAL
      );
      const arrayOfLayouts = currentApps.filter(
        app => app.Type === APP_TYPES.LAYOUT
      );
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
      popperPlacement="center"
    >
      {renderHTML()}
    </HTMLPopper>
  );
};

export default HomeMenuPopper;
