import React from "react";
import { Divider } from "@material-ui/core";
import { verticalBarStyles } from "./styles";
import { VerticalBarProps } from "./types";

const VerticalBar = (props: VerticalBarProps) => {
  const {
    upperElement = <div></div>,
    creatorElement = null,
    navigationList = [<div></div>],
    lowerElement = <div></div>,
    useDividers = false,
  } = props;
  // Style hook
  const classes = verticalBarStyles(props);

  const accountEl = lowerElement ? (
    <div data-testid="section_account" className={classes.accountArea}>
      {lowerElement}
    </div>
  ) : null;

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div data-testid="section_vertical-bar" className={classes.container}>
      <div data-testid="section_logo-wrapper" className={classes.logoArea}>
        {upperElement}
      </div>
      {useDividers && <Divider className={classes.divider} />}
      {creatorElement && (
        <>
          <div data-testid="section_logo-area" className={classes.logoArea}>
            {creatorElement}
          </div>
          {useDividers && <Divider className={classes.divider} />}
        </>
      )}
      <div data-testid="section_navigation" className={classes.navigationArea}>
        {navigationList.map((element, index) => {
          return (
            <div key={`navigation-item-${index}`}>
              <div className={classes.navigationItem}>{element}</div>
              {useDividers && <Divider className={classes.divider} />}
            </div>
          );
        })}
      </div>
      <div data-testid="section_grow" className={classes.growArea}></div>
      { accountEl }
    </div>
  );
};

export default VerticalBar;
