import React, { useCallback, useState, useRef, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { RobotManager } from "@mov-ai/mov-fe-lib-core";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import LogsSkeleton from "./LogsSkeleton";
import {
  ROBOT_STATES,
  DATE_KEY_OPTION,
  ADVANCED_LEVELS_LIST,
  COLUMN_LIST,
  DEFAULT_LIMIT,
  DEFAULT_SELECTED_COLUMNS,
  DEFAULT_SELECTED_LEVELS,
  DEFAULT_SELECTED_SERVICES,
  ROBOT_LOG_TYPE,
  SIMPLE_LEVELS_LIST,
} from "./utils/Constants";
import { findsUniqueKey } from "./utils/Utils";
import _uniqWith from "lodash/uniqWith";
import _isEqual from "lodash/isEqual";
import i18n from "./../../i18n";

import { useStyles } from "./styles";
import "./Logs.css";

/**
 * Tranform log from the format received from the API to the format
 * required to be rendered
 * @returns {array} Transformed log
 */
function transformLog(log, _index, _data, ts_multiplier = 1000) {
  const timestamp = ts_multiplier * log.time;
  const date = new Date(timestamp);
  return {
    ...log,
    timestamp,
    time: date.toLocaleTimeString(),
    date: date.toLocaleDateString(),
    key: log.message + timestamp,
  };
}

/**
 * Remove duplicates from logs for the second overlaping the
 * current and the last request
 * @returns {array} Concatenated logs without duplicates
 */
function logsDedupe(oldLogs, data) {
  if (!data.length) return oldLogs;

  // date of the oldest log received in the current request
  const oldDate = data[data.length - 1].timestamp;
  // map to store the old logs of the overlaped second
  let map = {};

  // iter over old logs with last timestamp of the new logs
  // and put in a map
  for (let i = 0; i < oldLogs.length && oldLogs[i].timestamp === oldDate; i++)
    map[oldLogs[i].message] = oldLogs[i];

  // array to store logs from overlap second which had not
  // been sent  before
  let newSecOverlap = [];
  let z;

  // iter over new logs (oldest to latest) with last timestamp,
  // check if present in last map
  //  - if not, push
  for (z = data.length - 1; z >= 0 && data[z].timestamp === oldDate; z--)
    if (!map[data[z].message]) newSecOverlap.push(data[z]);

  // cut new logs up to z, concat with the deduped ones
  // and the old logs up to i
  return data.slice(0, z + 1).concat(newSecOverlap.reverse(), oldLogs);
}

/**
 * CONSTANTS
 */
const DEFAULT_TIMEOUT_IN_MS = 3000;
const RETRY_IN_MS = 2000;
const UI_TAG = { key: 0, label: "ui" };
const MAX_FETCH_LOGS = 20000;

const Logs = (props) => {
  // Props
  const { advancedMode: initialAdvancedMode, robotsData } = props;
  // Style hook
  const classes = useStyles();
  // Refs
  const getLogsTimeoutRef = useRef();
  const selectedRobotsRef = useRef({});
  const requestTimeout = useRef();
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
    initialAdvancedMode ? ADVANCED_LEVELS_LIST : SIMPLE_LEVELS_LIST,
  );
  const [selectedService, setSelectedService] = useState(
    DEFAULT_SELECTED_SERVICES,
  );
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [columns, setColumns] = useState(DEFAULT_SELECTED_COLUMNS);
  const [tags, setTags] = useState(initialAdvancedMode ? [] : [UI_TAG]);
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
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
  const getFromDate = () => {
    // get logs since last existing log
    return logsDataRef.current.length
      ? logsDataRef.current[0].timestamp
      : (selectedFromDate ?? "");
  };
  /**
   * Get To Date filter
   * @returns {string} To Date in string or empty
   */
  const getToDate = () => {
    return selectedToDate || "";
  };

  /**
   * Clear robot logs
   */
  const clearLogs = () => {
    clearTimeout(getLogsTimeoutRef.current);
    logsDataRef.current = [];
  };

  /**
   * Get selected robot names to compose search query
   * @returns {array<string>}
   */
  const getSelectedRobots = () => {
    return Object.values(selectedRobotsRef.current)
      .filter(
        (robot) =>
          robot.isSelected && // Get selected robots only
          robot.name && // Get only robots with name
          robot.robotState !== ROBOT_STATES.OFFLINE, // Get only robots online
      )
      .map((robot) => robot.name);
  };

  /**
   * Prevent all subsequent requests from being dispatched
   */
  const stopLogger = () => {
    clearTimeout(getLogsTimeoutRef.current);
  };

  /**
   * Get robots log data
   */
  const getRobotLogData = (robots) => {
    // If component is no longer mounted
    if (!isMounted.current) return;
    // If list of selected robot is empty : clear logs data and stop loader
    if (!robots.length) {
      setLoading(false);
      clearLogs();
      return;
    }
    // Set loading state if log data is not empty
    if (logsDataRef.current.length) setLoading(true);
    // Get request parameters
    const queryParams = {
      level: { selected: levels, list: levelsList },
      service: { selected: selectedService },
      tag: { selected: tags },
      searchMessage,
      date: { from: getFromDate(), to: getToDate() },
      robot: { selected: robots },
      limit: limit,
    };

    const requestTime = new Date().getTime();
    clearTimeout(getLogsTimeoutRef.current);
    RobotManager.getLogs(queryParams)
      .then((response) => {
        const data = response?.data || [];
        const oldLogs = logsDataRef.current || [];
        const newLogs = logsDedupe(oldLogs, data.map(transformLog)).slice(
          0,
          MAX_FETCH_LOGS,
        );

        logsDataRef.current = newLogs;

        // Reset timeout for next request to default value
        requestTimeout.current = DEFAULT_TIMEOUT_IN_MS;
        // Doesn't enqueue next request if the 'selectedToDate' inserted manually by the user is before now
        return !(selectedToDate && selectedToDate < requestTime);
      })
      .catch((err) => {
        // Add more time for the next request if it fails
        console.warn("Failed logs request", err);
        requestTimeout.current += RETRY_IN_MS;
        // Enqueue next request
        return true;
      })
      .then((enqueueNextRequest) => {
        setLoading(false);
        clearTimeout(getLogsTimeoutRef.current);
        if (!enqueueNextRequest) return;
        getLogsTimeoutRef.current = setTimeout(() => {
          getLogs();
        }, requestTimeout.current);
      });
  };

  /**
   * Get logs
   */
  const getLogs = async (keepLoading) => {
    if (!isMounted.current) return;
    // Get selected and online robots
    const validRobots = getSelectedRobots();
    // If there's no valid robots, clear logs and try again in 1s
    if (!validRobots.length) {
      clearLogs();
      setTimeout(getLogs, 1000);
      if (!keepLoading) setLoading(false);
      // Stop method execution
      return;
    }
    // Remove previously enqueued requests
    stopLogger();
    // Stop loader if there's not request to do
    getRobotLogData(validRobots);
  };

  /**
   * Refresh logs in table
   */
  const refreshLogs = () => {
    clearLogs();
    setLoading(true);
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
    // Start logger
    getLogs(true);
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
    setSelectedRobots((prevState) => {
      const newRobots = { ...prevState };
      robotsData.forEach((robot) => {
        const id = robot.id;
        newRobots[id] = {
          ...robot,
          isSelected: prevState[id]?.isSelected ?? true,
        };
      });

      selectedRobotsRef.current = newRobots;
      return newRobots;
    });
  }, [robotsData]);

  // On change filter
  useEffect(() => {
    refreshLogs();
  }, [
    levels,
    selectedService,
    advancedMode,
    selectedFromDate,
    selectedToDate,
    columns,
    tags,
  ]);

  // Add timeout before refresh logs on text input change
  //  This will prevent unnecessary re-renders while the user is still typing
  //  Applies for text inputs (search and limit) and date time picker
  useEffect(() => {
    clearTimeout(refreshLogsTimeoutRef.current);
    refreshLogsTimeoutRef.current = setTimeout(refreshLogs, 300);
  }, [searchMessage, limit]);

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
    (robotId) => {
      setSelectedRobots((prevState) => {
        const newRobots = {
          ...prevState,
          [robotId]: {
            ...prevState[robotId],
            isSelected: !prevState[robotId].isSelected,
          },
        };
        selectedRobotsRef.current = newRobots;
        return newRobots;
      });
      // Trigger refresh on logs
      refreshLogs();
    },
    [refreshLogs],
  );

  /**
   * On change levels from filter
   */
  const onChangeLevels = useCallback((event) => {
    setLevels(event.target.value);
  }, []);

  /**
   * On change selected services from filter
   */
  const onChangeServices = useCallback((event) => {
    setSelectedService(event.target.value);
  }, []);

  /**
   * On change limit from filter
   */
  const onChangeLimit = useCallback((event) => {
    let _limit = DEFAULT_LIMIT;
    if (event.target.value !== "") _limit = event.target.value;
    setLimit(_limit);
  }, []);

  /**
   * On change columns from filter
   */
  const onChangeColumns = useCallback((event) => {
    // make sure columns are always with the same order
    const newColumns = Object.keys(COLUMN_LIST).filter((col) =>
      event.target.value.includes(col),
    );
    setColumns(newColumns);
  }, []);

  /**
   * On change dates from filter
   */
  const onChangeDate = useCallback((newDate, keyToChange) => {
    const setDate = {
      [DATE_KEY_OPTION.FROM]: (date) => setSelectedFromDate(date),
      [DATE_KEY_OPTION.TO]: (date) => setSelectedToDate(date),
    };
    setDate[keyToChange](newDate);
  }, []);

  /**
   * Set simple/advanced mode
   */
  const onToggleAdvancedMode = useCallback(() => {
    setAdvancedMode((prevState) => {
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
  const addTag = useCallback((tagText) => {
    setTags((prevState) => {
      const alreadyExists = prevState.find((elem) => elem.label === tagText);
      // Don't add tag if it's empty or duplicate
      if (tagText !== "" && !alreadyExists) {
        return [
          ...prevState,
          {
            key: findsUniqueKey(prevState, "key"),
            label: tagText,
          },
        ];
      }
      return prevState;
    });
  }, []);

  /**
   * On delete tag from filter
   */
  const deleteTag = useCallback((tagToDelete) => {
    setTags((prevState) => {
      return prevState.filter((tag) => tag.key !== tagToDelete.key);
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
  const openLogDetails = useCallback((log) => {
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
          handleMessageRegex={setSearchMessage}
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
        <div
          data-testid="section_table-container"
          ref={handleContainerRef}
          className={classes.tableContainer}
        >
          <LogsTable
            columns={columns}
            columnList={COLUMN_LIST}
            logsData={logsDataRef.current}
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
