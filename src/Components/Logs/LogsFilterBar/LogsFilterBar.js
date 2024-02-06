import React, { memo } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import _isEqual from "lodash/isEqual";
// Sub-Components
import RobotSelector from "./sub-components/RobotSelector";
import SearchInput from "./sub-components/SearchInput";
import LevelSelector from "./sub-components/LevelSelector";
import ServiceSelector from "./sub-components/ServiceSelector";
import TagsPopover from "./sub-components/TagsPopover";
import TimeFilters from "./sub-components/TimeFilters";
import SettingsPopover from "./sub-components/SettingsPopover";
import i18n from "i18next";
// Styles
import { useLogFilterStyles } from "../styles";


const EMPTY_FUNCTION = () => {
  /** Empty on purpose */
};

const LogsFilterBar = props => {
  // Style Hook
  const classes = useLogFilterStyles();
  // Props
  const {
    handleRobotChange,
    robots,
    messageRegex,
    handleMessageRegex,
    levels,
    handleLevels,
    service,
    handleSelectedService,
    tags,
    handleAddTag,
    handleDeleteTag,
    handleExport,
    selectedFromDate,
    selectedToDate,
    handleDateChange,
    columns,
    handleColumns,
  } = props;

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <AppBar position="static" color="inherit" className={classes.root}>
      <Toolbar data-testid="section_logs-filter-bar" variant="dense">
        <div className={classes.flexContainer}>
          {/* Robot Selector */}
          <RobotSelector
            robots={robots}
            handleRobotChange={handleRobotChange}
          />
        </div>
        <div className={`${classes.doubleFlexContainer} ${classes.displayFlex} ${classes.center}`}>
          {/* Search Input */}
          <SearchInput
            messageRegex={messageRegex}
            handleMessageRegex={handleMessageRegex}
          />
        </div>
        <div className={classes.doubleFlexContainer}>
          {/* Toggle: INFO, DEBUG, ERROR, CRITICAL */}
          <LevelSelector
            levels={levels}
            handleLevels={handleLevels}
          />
        </div>
        <div className={classes.doubleFlexContainer}>
          {/* Toggle: BACKEND, SPAWNER */}
          <ServiceSelector
            service={service}
            handleSelectedService={handleSelectedService}
          />
        </div>
        <div
          className={`${classes.doubleFlexContainer} ${classes.displayFlex} ${classes.spaceBetween}`}
        >
          <div className={`${classes.doubleFlexContainer} ${classes.displayFlex}`}>
            {/* Tags */}
            <TagsPopover
              tags={tags}
              handleAddTag={handleAddTag}
              handleDeleteTag={handleDeleteTag}
            />
            {/* Date time filter */}
            <TimeFilters
              selectedFromDate={selectedFromDate}
              selectedToDate={selectedToDate}
              handleDateChange={handleDateChange}
            />
            {/* Export Logs */}
            <Tooltip title={i18n.t("Download logs")}>
              <IconButton
                onClick={handleExport}
              >
                <GetAppIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={`${classes.flexContainer} ${classes.displayFlex} ${classes.flexEnd}`}>
            {/* Settings */}
            <SettingsPopover
              columns={columns}
              handleColumns={handleColumns}
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

LogsFilterBar.propTypes = {
  levels: PropTypes.object,
  handleLevels: PropTypes.func,
  service: PropTypes.object,
  tags: PropTypes.object,
  handleSelectedService: PropTypes.func,
  columns: PropTypes.array,
  handleColumns: PropTypes.func,
  handleDeleteTag: PropTypes.func,
  handleExport: PropTypes.func,
  messageRegex: PropTypes.string,
  handleMessageRegex: PropTypes.func,
  selectedFromDate: PropTypes.string,
  selectedToDate: PropTypes.string,
  handleDateChange: PropTypes.func,
  robots: PropTypes.object,
  handleRobotChange: PropTypes.func,
};

LogsFilterBar.defaultProps = {
  levels: {},
  service: {},
  tags: {},
  handleLevels: EMPTY_FUNCTION,
  handleSelectedService: EMPTY_FUNCTION,
  columns: [],
  handleColumns: EMPTY_FUNCTION,
  handleDeleteTag: EMPTY_FUNCTION,
  handleExport: EMPTY_FUNCTION,
  messageRegex: "",
  handleMessageRegex: EMPTY_FUNCTION,
  handleDateChange: EMPTY_FUNCTION,
  robots: {},
  handleRobotChange: EMPTY_FUNCTION,
};

//The function returns true when the compared props equal, preventing the component from re-rendering
function arePropsEqual(prevProps, nextProps) {
  return _isEqual(prevProps, nextProps);
}

export default memo(LogsFilterBar, arePropsEqual);
