import React from "react";
import Divider from "@mui/material/Divider";
import { verticalBarStyles } from "./styles";
import { VerticalBarProps } from "./types";

const VerticalBar = (props: VerticalBarProps) => {
  const {
    upperElement = <div></div>,
    creatorElement = null,
    navigationList = [<div key="navDef"></div>],
    lowerElement = <div></div>,
    useDividers = false,
  } = props;
  // Style hook
  const classes = verticalBarStyles(props);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div data-testid="section_vertical-bar" className={classes.container + " align-items size-vertical"}>
      <div data-testid="section_logo-wrapper" className={classes.logoArea}>
        {upperElement}
      </div>
      {useDividers && <Divider className={classes.divider} />}
      {creatorElement && (
        <>
          {creatorElement}
          {useDividers && <Divider className={classes.divider} />}
        </>
      )}
      <div data-testid="section_navigation" className={classes.navigationArea + " flex-grow"}>
        {navigationList.map((element, index) => {
          return (
            <div key={`navigation-item-${index}`}>
              <div className={classes.navigationItem}>{element}</div>
              {useDividers && <Divider className={classes.divider} />}
            </div>
          );
        })}
      </div>
      <div data-testid="section_grow" className="grow-area"></div>
      {lowerElement}
    </div>
  );
};

export default VerticalBar;
