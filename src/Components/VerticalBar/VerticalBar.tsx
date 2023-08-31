import React from "react";
import { Divider } from "@material-ui/core";
import useStyles from "./styles";
import { VerticalBarProps } from "./types";

const VerticalBar = (props: VerticalBarProps) => {
  const {
    upperElement = <div></div>,
    creatorElement = null,
    navigationList = [<div></div>],
    lowerElement = <div></div>,
    useDividers = false,
  } = props;

  useStyles();
  // Style hook

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div data-testid="section_vertical-bar" className="vertical-bar background-gray-dark color-primary">
      <div data-testid="section_logo-wrapper" className="logo-area">
        {upperElement}
      </div>
      {useDividers && <Divider className="divider" />}
      {creatorElement && (
        <>
          <div data-testid="section_logo-area" className="logo-area">
            {creatorElement}
          </div>
          {useDividers && <Divider className="divider" />}
        </>
      )}
      <div data-testid="section_navigation" className="navigation-area">
        {navigationList.map((element, index) => {
          return (
            <div key={`navigation-item-${index}`}>
              <div className="navigation-item">{element}</div>
              {useDividers && <Divider className="divider" />}
            </div>
          );
        })}
      </div>
      <div data-testid="section_grow" className="grow-area"></div>
      <div data-testid="section_account" className="account-area">
        {lowerElement}
      </div>
    </div>
  );
};

export default VerticalBar;
