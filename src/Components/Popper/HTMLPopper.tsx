import React, { useState, useCallback, useRef } from "react";
{/* import { infoButtonStyles } from "./styles"; */}
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { HTMLPopperProps } from "./types";

const FADE_OUT_TIMEOUT = 350;

const HTMLPopper = (props: HTMLPopperProps) => {
  const {
    clickableElement,
    children,
    hideOnClickAway = false,
    popperPlacement = "bottom-start"
  } = props;

  const [openPopper, setOpenPopper] = React.useState(false);
  const anchorPopperRef = useRef<any>();

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  const renderPaper = () => {
    return (
      <Paper>
        <div className="transition-in">
          <div data-testid="section_wrapper" className="child-wrapper">
            {children}
          </div>
        </div>
      </Paper>
    );
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Handlers                                      *
   *                                                                                      */
  //========================================================================================

  const handlePopperClose = useCallback(() => {
    setOpenPopper(false);
  }, []);

  const handlePopperOpen = useCallback(() => {
    setOpenPopper(true);
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <>
      <span
        data-testid="input_clickable"
        onClick={handlePopperOpen}
        ref={anchorPopperRef as any}
      >
        {clickableElement}
      </span>

      <Popper
        data-testid="section_popper"
        className="popper"
        open={openPopper}
        anchorEl={anchorPopperRef.current}
        placement={popperPlacement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={FADE_OUT_TIMEOUT}>
            <>
              {hideOnClickAway ? (
                <ClickAwayListener onClickAway={handlePopperClose}>
                  {renderPaper()}
                </ClickAwayListener>
              ) : (
                renderPaper()
              )}
            </>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default HTMLPopper;
