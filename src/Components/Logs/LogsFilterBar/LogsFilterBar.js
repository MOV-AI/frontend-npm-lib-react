import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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
import { useTranslation } from "react-i18next";
// Styles
import { useLogFilterStyles } from "../styles";


const EMPTY_FUNCTION = () => {
  /** Empty on purpose */
};

const LogsFilterBar = props => {
  // Style Hook
  const classes = useLogFilterStyles();
  // Translation hook
  const { t } = useTranslation();
  // Props
  const {
    updateRobotSelection,
    selectedRobots,
    messageRegex,
    handleMessageRegex,
    levels,
    levelsList,
    handleLevels,
    selectedService,
    handleSelectedService,
    tags,
    handleAddTag,
    handleDeleteTag,
    handleExport,
    selectedFromDate,
    selectedToDate,
    handleDateChange,
    limit,
    handleLimit,
    columns,
    handleColumns,
  } = props;

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Handle Robot selection change
   */
  const handleRobotChange = useCallback(
    event => {
      const arrayEvent = event?.target?.value;
      const selectedId = arrayEvent[arrayEvent.length - 1];
      updateRobotSelection(selectedId);
    },
    [updateRobotSelection]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <AppBar position="static" color="inherit">
      <Toolbar data-testid="section_logs-filter-bar" variant="dense">
        <div className={classes.flexContainer}>
          {/* Robot Selector */}
          <RobotSelector
            selectedRobots={selectedRobots}
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
            levelsList={levelsList}
          />
        </div>
        <div className={classes.doubleFlexContainer}>
          {/* Toggle: BACKEND, SPAWNER */}
          <ServiceSelector
            selectedService={selectedService}
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
            <Tooltip title={t("Download logs")}>
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
              limit={limit}
              handleLimit={handleLimit}
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
  levels: PropTypes.array,
  levelsList: PropTypes.array,
  handleLevels: PropTypes.func,
  selectedService: PropTypes.array,
  handleSelectedService: PropTypes.func,
  limit: PropTypes.number,
  handleLimit: PropTypes.func,
  columns: PropTypes.array,
  handleColumns: PropTypes.func,
  handleDeleteTag: PropTypes.func,
  handleExport: PropTypes.func,
  messageRegex: PropTypes.string,
  handleMessageRegex: PropTypes.func,
  selectedFromDate: PropTypes.string,
  selectedToDate: PropTypes.string,
  handleDateChange: PropTypes.func,
  selectedRobots: PropTypes.array,
  updateRobotSelection: PropTypes.func,
  t: PropTypes.func
};

LogsFilterBar.defaultProps = {
  levels: [],
  levelsList: [],
  handleLevels: EMPTY_FUNCTION,
  selectedService: [],
  handleSelectedService: EMPTY_FUNCTION,
  limit: 1,
  handleLimit: EMPTY_FUNCTION,
  columns: [],
  handleColumns: EMPTY_FUNCTION,
  handleDeleteTag: EMPTY_FUNCTION,
  handleExport: EMPTY_FUNCTION,
  messageRegex: "",
  handleMessageRegex: EMPTY_FUNCTION,
  handleDateChange: EMPTY_FUNCTION,
  selectedRobots: [],
  updateRobotSelection: EMPTY_FUNCTION,
  t: string => string
};

//The function returns true when the compared props equal, preventing the component from re-rendering
function arePropsEqual(prevProps, nextProps) {
  return _isEqual(prevProps, nextProps);
}

export default memo(LogsFilterBar, arePropsEqual);
