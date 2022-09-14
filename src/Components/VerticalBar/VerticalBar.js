import React from "react";
import PropTypes from "prop-types";
import { Divider } from "@material-ui/core";
import { verticalBarStyles } from "./styles";

const VerticalBar = props => {
  // Style hook
  const classes = verticalBarStyles(props);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div data-testid="section_vertical-bar" className={classes.container}>
      <div data-testid="section_logo-wrapper" className={classes.logoArea}>
        {props.upperElement}
      </div>
      {props.useDividers && <Divider className={classes.divider} />}
      {props.creatorElement && (
        <>
          <div data-testid="section_logo-area" className={classes.logoArea}>
            {props.creatorElement}
          </div>
          {props.useDividers && <Divider className={classes.divider} />}
        </>
      )}
      <div data-testid="section_navigation" className={classes.navigationArea}>
        {props.navigationList.map((element, index) => {
          return (
            <div key={`navigation-item-${index}`}>
              <div className={classes.navigationItem}>{element}</div>
              {props.useDividers && <Divider className={classes.divider} />}
            </div>
          );
        })}
      </div>
      <div data-testid="section_grow" className={classes.growArea}></div>
      <div data-testid="section_account" className={classes.accountArea}>
        {props.lowerElement}
      </div>
    </div>
  );
};

VerticalBar.propTypes = {
  upperElement: PropTypes.node,
  creatorElement: PropTypes.node,
  navigationList: PropTypes.array,
  lowerElement: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  useDividers: PropTypes.bool,
  unsetAccountAreaPadding: PropTypes.bool
};
VerticalBar.defaultProps = {
  upperElement: <div></div>,
  creatorElement: null,
  navigationList: [<div></div>],
  lowerElement: <div></div>,
  backgroundColor: "#424242",
  useDividers: false,
  unsetAccountAreaPadding: false
};

export default VerticalBar;
