import React, { useCallback } from "react";
import { Utils } from "@mov-ai/mov-fe-lib-core";
import Button from "@mui/material/Button";
import { MenuAppProps } from "./types";

// import { menuAppStyles } from "./styles";

const MenuApp = (props: MenuAppProps) => {
  const { app } = props;

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
      className="menu-button"
      onClick={handleAppClick}
    >
      <div>
        <div className={`app-icon ${app.Icon}`} />
        <div className="app-miniature">{app.Label}</div>
      </div>
    </Button>
  );
};

export default MenuApp;
