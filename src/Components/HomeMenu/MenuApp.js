import React from "react";
import { Utils } from "@mov-ai/mov-fe-lib-core";
import { Button } from "@material-ui/core";

import { menuAppStyles } from "./styles";

const MenuApp = () => {
  const { app } = props;

  // Hooks
  const classes = menuAppStyles();

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Handle app click
   * @param {Event} event : click event
   * @param {object} element : App object
   */
  const handleAppClick = useCallback(
    event => {
      if (app.Label) Utils.loadResources(event, app);
    },
    [app]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        RENDERS                                       *
   *                                                                                      */
  //========================================================================================

  return (
    <Button
      data-testid="input_application"
      size="large"
      color="primary"
      className={classes.menuButton}
      onClick={handleAppClick}
    >
      <div>
        <div className={`${classes.appIcon} ${app.Icon}`} />
        <div className={classes.appMiniature}>{app.Label}</div>
      </div>
    </Button>
  );
};

export default MenuApp;
