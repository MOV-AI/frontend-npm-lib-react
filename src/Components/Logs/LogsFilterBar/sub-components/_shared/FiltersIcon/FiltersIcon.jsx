import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import StyledMenu from "./StyledMenu";
import { filterIconStyles } from "./styles";

const FiltersIcon = props => {
  // Props
  const { disabled, tooltip, title, icon, isActive, children } = props;
  // State hooks
  const [anchorEl, setAnchorEl] = useState();
  // Style hook
  const classes = filterIconStyles();

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Handle popup open
   * @param {Event} event : onClick event
   */
  const handleOpen = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  /**
   * Handle popup close
   * @param {Event} _event : Close Event
   */
  const handleClose = useCallback(_event => {
    setAnchorEl(null);
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <React.Fragment>
      <Tooltip title={tooltip || title}>
        <IconButton
          data-testid="input_button"
          size="small"
          onClick={handleOpen}
          disabled={disabled}
          className={isActive ? classes.iconActive : classes.icon}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.height}
      >
        <Typography
          component="div"
          data-testid="section_filters-icon"
          className={classes.filterIconRoot}
        >
          <Typography component="div" className={classes.titleRow}>
            <Typography
              component="div"
              data-testid="output_title"
              className="text"
            >
              {title}
            </Typography>
            <Typography component="div" className={classes.spacer}></Typography>
            <Typography
              data-testid="input_close"
              component="div"
              onClick={handleClose}
              className={classes.icon}
            >
              <i className="fas fa-times"></i>
            </Typography>
          </Typography>
          <Typography component="div" className={classes.childrenContainer}>
            {children}
          </Typography>
        </Typography>
      </StyledMenu>
    </React.Fragment>
  );
};

FiltersIcon.propTypes = {
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.element
};

FiltersIcon.defaultProps = {
  isActive: false,
  disabled: false,
  tooltip: "",
  title: "Filters",
  icon: <FilterListIcon />
};

export default FiltersIcon;
