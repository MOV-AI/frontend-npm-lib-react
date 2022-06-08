import React, { useCallback, useState, useRef, useEffect } from "react";
import { Typography } from "@material-ui/core";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import LogsSkeleton from "./LogsSkeleton";
import {
  ROBOT_STATES,
  ADVANCED_LEVELS_LIST,
  COLUMN_LIST,
  DEFAULT_LIMIT,
  DEFAULT_SELECTED_COLUMNS,
  DEFAULT_SELECTED_LEVELS,
  DEFAULT_SELECTED_SERVICES,
  ROBOT_LOG_TYPE,
  SIMPLE_LEVELS_LIST
} from "./utils/Constants";
import {
  getRequestDate,
  getRequestLevels,
  getRequestService,
  getRequestTags,
  getRequestMessage,
  findsUniqueKey
} from "./utils/Utils";
import _uniqWith from "lodash/uniqWith";
import _isEqual from "lodash/isEqual";
import i18n from "../../i18n/i18n";
import { Rest } from "@mov-ai/mov-fe-lib-core";

import { useStyles } from "./styles";
import "./Logs.css";

/**
 * CONSTANTS
 */
const DEFAULT_TIMEOUT_IN_MS = 3000;
const RETRY_IN_MS = 2000;
const UI_TAG = { key: 0, label: "ui" };

const Logs = props => {
  // Props
  const { advancedMode: initialAdvancedMode, robotsData } = props;
  // Style hook
  const classes = useStyles();
  // Refs
  const getLogsTimeoutRef = useRef({});
  const selectedRobotsRef = useRef({});
  const requestTimeout = useRef({});
  const lastRequestTimeRef = useRef({});
  const refreshLogsTimeoutRef = useRef();
  const handleContainerRef = useRef();
  const logsDataRef = useRef([]);
  const logModalRef = useRef();
  const isMounted = useRef();
  // State hooks
  const [advancedMode, setAdvancedMode] = useState(initialAdvancedMode);
  const [selectedRobots, setSelectedRobots] = useState({});
  const [levels, setLevels] = useState(DEFAULT_SELECTED_LEVELS);
  const [levelsList, setLevelsList] = useState(
    initialAdvancedMode ? ADVANCED_LEVELS_LIST : SIMPLE_LEVELS_LIST
  );
  const [selectedService, setSelectedService] = useState(
    DEFAULT_SELECTED_SERVICES
  );
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [columns, setColumns] = useState(DEFAULT_SELECTED_COLUMNS);
  const [tags, setTags] = useState(initialAdvancedMode ? [] : [UI_TAG]);
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [logsData, setLogsData] = useState({});
  const [loading, setLoading] = useState(true);

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * Get From Date filter
   *  Consider last successfull request and date on filter
   * @returns {string} From Date in string or empty
   */
  const getFromDate = id => {
    return selectedFromDate || lastRequestTimeRef.current[id] || "";
  };
  /**
   * Get To Date filter
   * @returns {string} To Date in string or empty
   */
  const getToDate = () => {
    return selectedToDate || "";
  };

  /**
   * Prevent all subsequent requests from being dispatched
   */
  const stopLogger = () => {
    Object.keys(getLogsTimeoutRef.current).forEach(robotId => {
      clearTimeout(robotId);
    });
  };

  /**
   * Get robots log data
   */
  const getRobotLogData = robot => {
    const { id, name } = robot;

    // If component is no longer mounted
    if (!isMounted.current) return;
    // If robot doesn't have a name: retry
    if (!name)
      return setTimeout(
        getRobotLogData,
        RETRY_IN_MS,
        selectedRobotsRef.current[id]
      );
    // Set loading state if log data is empty
    if (logsDataRef.current.length) setLoading(true);
    // Get request parameters
    const _levels = getRequestLevels(levels, levelsList);
    const _services = getRequestService(selectedService);
    const _tags = getRequestTags(tags);
    const _message = getRequestMessage(searchMessage);
    const _dates = getRequestDate(getFromDate(id), getToDate());
    const path = `v1/logs/${name}?limit=${limit}${_levels}${_services}${_dates}${_tags}${_message}`;

    const requestTime = new Date().getTime();
    clearTimeout(getLogsTimeoutRef.current[id]);
    Rest.get({ path })
      .then(response => {
        setLogsData(prevState => {
          const oldLogs = prevState[id] || [];
          const newLogs = response?.data || [];
          return {
            ...prevState,
            [id]: [...oldLogs, ...newLogs]
          };
        });
        // Reset timeout for next request to default value
        lastRequestTimeRef.current[id] = requestTime;
        requestTimeout.current[id] = DEFAULT_TIMEOUT_IN_MS;
        // Doesn't enqueue next request if the 'selectedToDate' inserted manually by the user is before now
        return !(selectedToDate && selectedToDate < requestTime);
      })
      .catch(err => {
        // Add more time for the next request if it fails
        console.warn("Failed logs request", err);
        requestTimeout.current[id] += RETRY_IN_MS;
        // Enqueue next request
        return true;
      })
      .then(enqueueNextRequest => {
        setLoading(false);
        clearTimeout(getLogsTimeoutRef.current[id]);
        if (!enqueueNextRequest) return;
        getLogsTimeoutRef.current[id] = setTimeout(() => {
          getLogs();
        }, requestTimeout.current[id]);
      });
  };

  /**
   * Get logs
   */
  const getLogs = async () => {
    if (!isMounted.current) return;
    const robots = Object.values(selectedRobotsRef.current);
    if (!robots.length) return setTimeout(getLogs, RETRY_IN_MS);
    // If robot is offline doesn't bother making the request
    // If robot is not selected, remove from the valid robot list
    const validRobots = robots.filter(
      robot => robot.isSelected && robot.robotState !== ROBOT_STATES.OFFLINE
    );
    // Remove previously enqueued requests
    stopLogger();
    // Stop loader if there's not request to do
    if (!validRobots.length) setLoading(false);
    await Promise.all(validRobots.map(robot => getRobotLogData(robot)));
  };

  /**
   * Refresh logs in table
   */
  const refreshLogs = () => {
    lastRequestTimeRef.current = {};
    setLoading(true);
    setLogsData({});
    getLogs();
  };

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  // on component mount
  useEffect(() => {
    isMounted.current = true;
    getLogs();
    // Stop logger for all robots on unmount
    return () => {
      stopLogger();
      selectedRobotsRef.current = {};
      isMounted.current = false;
    };
  }, []);

  // On change robots data
  useEffect(() => {
    // New robots added, will be added to the selector list
    setSelectedRobots(prevState => {
      const newRobots = { ...prevState };
      robotsData.forEach(robot => {
        const id = robot.id;
        const currentTimeout = requestTimeout.current[id];
        newRobots[id] = {
          ...robot,
          isSelected: prevState[id]?.isSelected ?? true
        };
        requestTimeout.current[id] = currentTimeout ?? DEFAULT_TIMEOUT_IN_MS;
      });

      selectedRobotsRef.current = newRobots;
      return newRobots;
    });
  }, [robotsData]);

  // On change filter
  useEffect(() => {
    refreshLogs();
  }, [levels, selectedService, advancedMode, columns, tags]);

  // Add timeout before refresh logs on text input change
  //  This will prevent unnecessary re-renders while the user is still typing
  //  Applies for text inputs (search and limit) and date time picker
  useEffect(() => {
    clearTimeout(refreshLogsTimeoutRef.current);
    refreshLogsTimeoutRef.current = setTimeout(() => {
      refreshLogs();
    }, 1000);
  }, [searchMessage, limit, selectedFromDate, selectedToDate]);

  //========================================================================================
  /*                                                                                      *
   *                               On filter change actions                               *
   *                                                                                      */
  //========================================================================================

  /**
   * On change selected robot from filter, refresh logs in table
   * @param {string} robotId : Robot ID to toggle select state
   */
  const onChangeRobotSelection = useCallback(
    robotId => {
      setSelectedRobots(prevState => {
        const newRobots = {
          ...prevState,
          [robotId]: {
            ...prevState[robotId],
            isSelected: !prevState[robotId].isSelected
          }
        };
        selectedRobotsRef.current = newRobots;
        return newRobots;
      });
      // Trigger refresh on logs
      refreshLogs();
    },
    [refreshLogs]
  );

  /**
   * On change message from filter
   * @param {string} text : Search text
   */
  const onChangeMessage = useCallback(text => {
    setSearchMessage(text);
  }, []);

  /**
   * On change levels from filter
   */
  const onChangeLevels = useCallback(event => {
    setLevels(event.target.value);
  }, []);

  /**
   * On change selected services from filter
   */
  const onChangeServices = useCallback(event => {
    setSelectedService(event.target.value);
  }, []);

  /**
   * On change limit from filter
   */
  const onChangeLimit = useCallback(event => {
    let _limit = DEFAULT_LIMIT;
    if (event.target.value !== "") _limit = event.target.value;
    setLimit(_limit);
  }, []);

  /**
   * On change columns from filter
   */
  const onChangeColumns = useCallback(event => {
    // make sure columns are always with the same order
    const newColumns = Object.keys(COLUMN_LIST).filter(col =>
      event.target.value.includes(col)
    );
    setColumns(newColumns);
  }, []);

  /**
   * On change dates from filter
   */
  const onChangeDate = useCallback((newDate, keyToChange) => {
    const setDate = {
      selectedFromDate: date => setSelectedFromDate(date),
      selectedToDate: date => setSelectedToDate(date)
    };
    lastRequestTimeRef.current = {};
    setDate[keyToChange](newDate);
  }, []);

  /**
   * Set simple/advanced mode
   */
  const onToggleAdvancedMode = useCallback(() => {
    setAdvancedMode(prevState => {
      const newMode = !prevState;
      setTags(newMode ? [] : [UI_TAG]);
      setLevels(DEFAULT_SELECTED_LEVELS);
      setLevelsList(newMode ? ADVANCED_LEVELS_LIST : SIMPLE_LEVELS_LIST);
      return newMode;
    });
  }, []);

  /**
   * On add tag from filter
   */
  const addTag = useCallback(tagText => {
    setTags(prevState => {
      const alreadyExists = prevState.find(elem => elem.label === tagText);
      // Don't add tag if it's empty or duplicate
      if (tagText !== "" && !alreadyExists) {
        return [
          ...prevState,
          {
            key: findsUniqueKey(prevState, "key"),
            label: tagText
          }
        ];
      }
      return prevState;
    });
  }, []);

  /**
   * On delete tag from filter
   */
  const deleteTag = useCallback(tagToDelete => {
    setTags(prevState => {
      return prevState.filter(tag => tag.key !== tagToDelete.key);
    });
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                Handlers for Logs Table                               *
   *                                                                                      */
  //========================================================================================

  /**
   * Open log details
   */
  const openLogDetails = useCallback(log => {
    logModalRef.current.open(log.rowData);
  }, []);

  /**
   * Render Logs skeleton
   */
  const handleNoRows = useCallback(() => {
    return (
      <Typography data-testid="output_no-rows" variant="h2">
        {loading ? (
          <LogsSkeleton></LogsSkeleton>
        ) : (
          <div className={classes.noRows}>{i18n.t("No matches found")}</div>
        )}
      </Typography>
    );
  }, [loading]);

  //========================================================================================
  /*                                                                                      *
   *                                 Format Data to Render                                *
   *                                                                                      */
  //========================================================================================

  /**
   *
   */
  const formatSelectedRobots = useCallback(() => {
    return Object.values(selectedRobots);
  }, [selectedRobots]);

  /**
   * Format logs data to be displayed
   * @returns {array} All selected robots Logs
   */
  const formatLogsData = useCallback(() => {
    // Flatten array
    const robotLogs = Object.values(logsData);
    const logs = [].concat(...robotLogs);
    // Remove duplicates
    const data = _uniqWith(logs, _isEqual).sort((a, b) => b.time - a.time);
    logsDataRef.current = data;
    // Return formated data
    return data;
  }, [logsData, limit]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div className={classes.externalDiv}>
      <div data-testid="section_logs" className={classes.wrapper}>
        <LogsFilterBar
          selectedRobots={formatSelectedRobots()}
          updateRobotSelection={onChangeRobotSelection}
          handleLevels={onChangeLevels}
          handleSelectedService={onChangeServices}
          handleLimit={onChangeLimit}
          handleColumns={onChangeColumns}
          handleMessageRegex={onChangeMessage}
          handleDateChange={onChangeDate}
          handleAdvancedMode={onToggleAdvancedMode}
          handleAddTag={addTag}
          handleDeleteTag={deleteTag}
          levels={levels}
          levelsList={levelsList}
          selectedService={selectedService}
          limit={limit}
          columns={columns}
          columnList={COLUMN_LIST}
          tags={tags}
          messageRegex={searchMessage}
          selectedFromDate={selectedFromDate}
          selectedToDate={selectedToDate}
          advancedMode={advancedMode}
        ></LogsFilterBar>
        <div data-testid="section_table-container" ref={handleContainerRef} className={classes.tableContainer}>
          <LogsTable
            columns={columns}
            columnList={COLUMN_LIST}
            logsData={formatLogsData()}
            levelsList={levelsList}
            onRowClick={openLogDetails}
            noRowsRenderer={handleNoRows}
          ></LogsTable>
        </div>
      </div>
      <RobotLogModal ref={logModalRef} props={ROBOT_LOG_TYPE}></RobotLogModal>
    </div>
  );
};

export default Logs;
