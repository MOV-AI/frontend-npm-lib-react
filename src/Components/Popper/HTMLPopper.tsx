import React, { useState, useCallback, useRef } from "react";
{/* import { infoButtonStyles } from "./styles"; */}
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { HTMLPopperProps } from "./types";

const HTMLPopper = (props: HTMLPopperProps) => {
  const {
    clickableElement,
    children,
    hideOnClickAway = false,
    popperPlacement = "bottom-end"
  } = props;

  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  //========================================================================================
  /*                                                                                      *
   *                                        Handlers                                      *
   *                                                                                      */
  //========================================================================================

  const handlePopperClose = useCallback((e: MouseEvent|TouchEvent) => {
    setOpenPopper(false);
  }, []);

  const handlePopperOpen = useCallback((e) => {
    setAnchorEl(e.target);
    setOpenPopper(true);
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <div>
      <span data-testid="input_clickable" onClick={handlePopperOpen}>
        {clickableElement}
      </span>

      <Popper
        data-testid="section_popper"
        open={openPopper}
        anchorEl={anchorEl}
        placement={popperPlacement}
        transition
      >
        <ClickAwayListener onClickAway={(hideOnClickAway ? handlePopperClose : null) as (e: MouseEvent|TouchEvent) => void}>
          <Paper className="transition-in">
            <div data-testid="section_wrapper" className="child-wrapper">
              {children}
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default HTMLPopper;
