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
} from "./utils/Constants";
import { findsUniqueKey, getDateTime } from "./utils/Utils";
import useUpdateEffect from "./hooks/useUpdateEffect";
import _uniqWith from "lodash/uniqWith";
import _isEqual from "lodash/isEqual";
import i18n from "../../i18n/i18n";

import { useStyles } from "./styles";
import "./Logs.css";

function blobDownload(file, fileName, charset = "text/plain;charset=utf-8") {
  const blob = new Blob([file], { type: charset });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async function hashString(string) {
  const msgUint8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * CONSTANTS
 */
const DEFAULT_TIMEOUT_IN_MS = 3000;
const RETRY_IN_MS = 2000;
const MAX_FETCH_LOGS = 20000;

const NO_ROBOTS_RETRY_TIMEOUT = 1000;
const Logs = props => {
  // Props
  const { robotsData } = props;
  // Style hook
  const classes = useStyles();
  // Refs
  const getLogsTimeoutRef = useRef();
  const selectedRobotsRef = useRef({});
  const requestTimeout = useRef(DEFAULT_TIMEOUT_IN_MS);
  const lastRequestTimeRef = useRef(null);
  const refreshLogsTimeoutRef = useRef();
  const handleContainerRef = useRef();
  const logsDataRef = useRef([]);
  const logModalRef = useRef();
  const isMounted = useRef();
  // State hooks
  const [selectedRobots, setSelectedRobots] = useState({});
  const [levels, setLevels] = useState(DEFAULT_SELECTED_LEVELS);
  const [levelsList, setLevelsList] = useState(ADVANCED_LEVELS_LIST);
  const [selectedService, setSelectedService] = useState(
    DEFAULT_SELECTED_SERVICES
  );
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [columns, setColumns] = useState(DEFAULT_SELECTED_COLUMNS);
  const [tags, setTags] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [logsData, setLogsData] = useState([]);
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
    return selectedFromDate || lastRequestTimeRef.current || "";
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
    lastRequestTimeRef.current = null;
    setLogsData([]);
  };

  /**
   * Get selected robot names to compose search query
   * @returns {array<string>}
   */
  const getSelectedRobots = () => {
    return Object.values(selectedRobotsRef.current)
      .filter(
        robot =>
          robot.isSelected && // Get selected robots only
          robot.name && // Get only robots with name
          robot.robotState !== ROBOT_STATES.OFFLINE // Get only robots online
      )
      .map(robot => robot.name);
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
  const getRobotLogData = robots => {
    // If component is no longer mounted
    if (!isMounted.current) return;
    // If list of selected robot is empty : clear logs data and stop loader
    if (!robots.length) {
      setLoading(false);
      setLogsData([]);
      return;
    }
    // Set loading state if log data is not empty
    if (logsDataRef.current.length) setLoading(true);
    // Get request parameters
    const queryParams = {
      level: { selected: levels, list: levelsList },
      service: { selected: selectedService },
      tag: { selected: tags },
      message: searchMessage,
      date: { from: getFromDate(), to: getToDate() },
      robot: { selected: robots },
      limit: limit
    };

    const requestTime = new Date().getTime();
    clearTimeout(getLogsTimeoutRef.current);
    RobotManager.getLogs(queryParams)
      .then(response => {
        const data = response?.data || [];
        return Promise.all([Promise.resolve(data)].concat(data.map(item => hashString(item.message))));
      }).then(([data, ...hashes]) => {
        const oldLogs = logsDataRef.current || [];
        let j = data.length - 1;

        for (let i = 0; j > -1 && i < oldLogs.length; i++, j--) {
          const timestamp = data[j].time * 1000;
          const date = new Date(timestamp);

          if (date === oldLogs[i].timestamp && (hashes[j] + (timestamp * 1000)) === oldLogs[i].key)
            break;

          if (date < oldLogs[i].timestamp)
            break;
        }

        const newLogs =  (data.slice(0, j).map((log, index) => {
          const timestamp = log.time * 1000;
          const date = new Date(timestamp);
          return ({
            ...log,
            timestamp: date,
            time: date.toLocaleTimeString(),
            date: date.toLocaleDateString(),
            key: hashes[index] + (timestamp * 1000),
          });
        }).concat(oldLogs).slice(0, MAX_FETCH_LOGS));

        logsDataRef.current = newLogs;
        setLogsData(newLogs);

        // Reset timeout for next request to default value
        lastRequestTimeRef.current = requestTime;
        requestTimeout.current = DEFAULT_TIMEOUT_IN_MS;
        // Doesn't enqueue next request if the 'selectedToDate' inserted manually by the user is before now
        return !(selectedToDate && selectedToDate < requestTime);
      })
      .catch(err => {
        // Add more time for the next request if it fails
        console.warn("Failed logs request", err);
        console.warn("Retry in ", requestTimeout.current);
        requestTimeout.current += RETRY_IN_MS;
        // Enqueue next request
        return true;
      })
      .then(enqueueNextRequest => {
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
  const getLogs = async keepLoading => {
    if (!isMounted.current) return;
    // Get selected and online robots
    const validRobots = getSelectedRobots();
    if (!validRobots.length) {
      console.warn("No robots available", validRobots)
      clearLogs();
      setTimeout(getLogs, NO_ROBOTS_RETRY_TIMEOUT);
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
    setSelectedRobots(prevState => {
      const newRobots = { ...prevState };
      robotsData.forEach(robot => {
        const id = robot.id;
        newRobots[id] = {
          ...robot,
          isSelected: prevState[id]?.isSelected ?? true
        };
      });

      selectedRobotsRef.current = newRobots;
      return newRobots;
    });
  }, [robotsData]);

  // On change filter
  useUpdateEffect(() => {
    refreshLogs();
  }, [levels, selectedService, columns, tags]);

  // Add timeout before refresh logs on text input change
  //  This will prevent unnecessary re-renders while the user is still typing
  //  Applies for text inputs (search and limit) and date time picker
  useUpdateEffect(() => {
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
      [DATE_KEY_OPTION.FROM]: date => setSelectedFromDate(date),
      [DATE_KEY_OPTION.TO]: date => setSelectedToDate(date)
    };
    lastRequestTimeRef.current = null;
    setDate[keyToChange](newDate);
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

  /**
   * On export logs
   */
  const handleExport = useCallback(() => {
    const sep = "\t";
    const contents = logsDataRef.current.map(log => {
      const [date, time] = getDateTime(log.time);
      return date + sep + time + sep + log.robot_name + sep + log.message;
    }).join("\n");
    // from https://www.epochconverter.com/programming/
    const dateString = new Date(logsDataRef.current[0].time * 1e3).toISOString();
    blobDownload(contents, `movai-logs-${dateString}.csv`, "text/csv;charset=utf-8");
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
          handleAddTag={addTag}
          handleDeleteTag={deleteTag}
          handleExport={handleExport}
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
        ></LogsFilterBar>
        <div
          data-testid="section_table-container"
          ref={handleContainerRef}
          className={classes.tableContainer}
        >
          <LogsTable
            columns={columns}
            columnList={COLUMN_LIST}
            logsData={logsData}
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
