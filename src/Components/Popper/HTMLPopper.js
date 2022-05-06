import React, { useRef } from "react";
import { infoButtonStyles } from "./styles";
import PropTypes from "prop-types";
import { Fade, Paper, Popper } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const HTMLPopper = props => {
  const classes = infoButtonStyles();
  const { clickableElement, children, hideOnClickAway, popperPlacement } =
    props;

  const [openPopper, setOpenPopper] = React.useState(false);
  const anchorPopperRef = useRef();

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
            <div data-testid="section_wrapper" className={classes.childWrapper}>
              {children}
            </div>
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
      <span
        data-testid="input_clickable"
        onClick={handlePopperOpen}
        ref={anchorPopperRef}
      >
        {clickableElement}
      </span>

      <Popper
        data-testid="section_popper"
        className={classes.popper}
        open={openPopper}
        anchorEl={anchorPopperRef.current}
        placement={popperPlacement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
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

HTMLPopper.propTypes = {
  clickableElement: PropTypes.element.isRequired,
  hideOnClickAway: PropTypes.bool,
  popperPlacement: PropTypes.string
};

HTMLPopper.defaultProps = {
  hideOnClickAway: false,
  popperPlacement: "bottom-start"
};

export default HTMLPopper;
