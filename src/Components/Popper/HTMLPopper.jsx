import React, { useRef } from "react";
import { infoButtonStyles } from "./styles";
import { Fade, Paper, Popper } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const HTMLPopper = props => {
  const classes = infoButtonStyles();
  const { clickableElement, children, hideOnClickAway } = props;

  const [openPopper, setOpenPopper] = React.useState(false);
  const anchorPopperRef = useRef();
  const POPPER_PLACEMENT = "bottom-start";

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  const renderPaper = () => {
    return (
      <Paper>
        <React.Fragment>
          <div className={classes.transitionIn}>
            <div className={classes.childWrapper}>{children}</div>
          </div>
        </React.Fragment>
      </Paper>
    );
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Handlers                                      *
   *                                                                                      */
  //========================================================================================

  const handlePopperClose = () => {
    setOpenPopper(false);
  };

  const handlePopperOpen = () => {
    setOpenPopper(true);
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <>
      <span onClick={handlePopperOpen} ref={anchorPopperRef}>
        {clickableElement}
      </span>

      <Popper
        className={classes.popper}
        open={openPopper}
        anchorEl={anchorPopperRef.current}
        placement={POPPER_PLACEMENT}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            {hideOnClickAway ? (
              <ClickAwayListener onClickAway={handlePopperClose}>
                {renderPaper()}
              </ClickAwayListener>
            ) : (
              renderPaper()
            )}
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default HTMLPopper;
