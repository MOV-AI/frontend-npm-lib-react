import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import StyledMenu from "./StyledMenu";
// import { filterIconStyles } from "./styles";

const FiltersIcon = props => {
  // Props
  const { disabled, tooltip, title, icon, isActive, children } = props;
  // State hooks
  const [anchorEl, setAnchorEl] = useState();
  // Style hook

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
  const handleClose = useCallback(() => {
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
          className={isActive ? "icon-active" : "icon"}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="height"
      >
        <Typography
          component="div"
          data-testid="section_filters-icon"
          className="filter-icon-root"
        >
          <Typography component="div" className="title-row">
            <Typography
              component="div"
              data-testid="output_title"
              className="text"
            >
              {title}
            </Typography>
            <Typography component="div" className="spacer"></Typography>
            <Typography
              data-testid="input_close"
              component="div"
              onClick={handleClose}
              className="icon"
            >
              <i className="fas fa-times"></i>
            </Typography>
          </Typography>
          <Typography component="div" className="children-container">
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
