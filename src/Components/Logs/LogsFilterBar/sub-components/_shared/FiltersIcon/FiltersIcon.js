import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import StyledMenu from "./StyledMenu";
import { filterIconStyles } from "./styles";

const FiltersIcon = props => {
  const { disabled, tooltip, title, icon, isActive, children, className } = props;
  const [anchorEl, setAnchorEl] = useState();
  const classes = filterIconStyles();

  const handleOpen = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(_event => {
    setAnchorEl(null);
  }, []);

  return (
    <React.Fragment>
      <Tooltip title={tooltip || title || ""}>
        <IconButton
          data-testid="input_button"
          size="small"
          onClick={handleOpen}
          disabled={disabled}
          className={className + " " + (isActive ? classes.iconActive : classes.icon)}
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
        <div data-testid="section_filters-icon" className={classes.filterIconRoot}>
          <div className={classes.titleRow}>
            <div data-testid="output_title" className="text">
              {title}
            </div>
            <div className={classes.spacer}></div>
            <div
              data-testid="input_close"
              onClick={handleClose}
              className={classes.icon}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div component="div" className={classes.childrenContainer}>
            {children}
          </div>
        </div>
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
