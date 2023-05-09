import React, { useCallback, useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { RobotManager } from "@mov-ai/mov-fe-lib-core";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import LogsSkeleton from "./LogsSkeleton";
import {
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
import { easySub, useSub } from "Components/HOCs/withAuthentication";

const logsSub = easySub([]);

async function updateLogs() {
  const response = await RobotManager.getLogs(queryParams);
  logsSub.update(response?.data || []);
  return response?.data || [];
}
import "./styles";
import "./Logs.css";

// TODO this should be exported. Fleetboard uses it
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

/**
 * CONSTANTS
 */
const DEFAULT_TIMEOUT_IN_MS = 3000;
const RETRY_IN_MS = 2000;

const NO_ROBOTS_RETRY_TIMEOUT = 1000;
const Logs = props => {
  // Props
  const { robotsData } = props;
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
  const [levelsList] = useState(ADVANCED_LEVELS_LIST);
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
  const getFromDate = useCallback(() => {
    return selectedFromDate || lastRequestTimeRef.current || "";
  }, [selectedFromDate]);
  /**
   * Get To Date filter
   * @returns {string} To Date in string or empty
   */
  const getToDate = useCallback(() => {
    return selectedToDate || "";
  }, [selectedToDate]);

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
          robot.name // Get only robots with name
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
   * Get logs
   */
  const getLogs = useCallback(async keepLoading => {
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
    return validRobots;
  }, []);

  /**
   * Get robots log data
   */
  const getRobotLogData = useCallback(robots => {
    // If component is no longer mounted
    if (!isMounted.current) return;
    console.assert(robots.length);
    // Set loading state if log data is not empty
    if (logsDataRef.current.length) setLoading(true);
    // Get request parameters
    const queryParams = {
      level: { selected: levels, list: levelsList },
      service: { selected: selectedService },
      tag: { selected: tags },
      searchMessage: searchMessage,
      date: { from: getFromDate(), to: getToDate() },
      robot: { selected: robots },
      limit: limit
    };

    const requestTime = new Date().getTime();
    clearTimeout(getLogsTimeoutRef.current);
    RobotManager.getLogs(queryParams)
      .then(response => {
        setLogsData(prevState => {
          const oldLogs = prevState || [];
          const newLogs = response?.data || [];
          return [...oldLogs, ...newLogs];
        });
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
  }, [getFromDate, getLogs, getToDate, levels, levelsList, limit, searchMessage, selectedService, selectedToDate, tags]);

  /**
   * Refresh logs in table
   */
  const refreshLogs = useCallback(() => {
    clearLogs();
    setLoading(true);
    getLogs();
  }, [getLogs]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getLogsToExport = useCallback(() => {
    const queryParams = {
      level: { selected: levels, list: levelsList },
      service: { selected: selectedService },
      tag: { selected: tags },
      searchMessage: searchMessage,
      date: { from: getFromDate(), to: getToDate() },
      robot: { selected: getSelectedRobots() },
    };
    return RobotManager.getLogs(queryParams)
      .then(response => {
        return response?.data || [];
      })
  }, [getFromDate, getToDate, levels, levelsList, searchMessage, selectedService, tags])

  /**
   * On export logs
   */
  const handleExport = useCallback(() => {
    const sep = "\t";
    getLogsToExport().then(logs => {
      const contents = logs.map(log => {
        const [date, time] = getDateTime(log.time);
        return [date, time, log.robot, log.message].join(sep);
      });
      // from https://www.epochconverter.com/programming/
      const dateString = !logs.length ? new Date().toISOString() : new Date(logs[0].time * 1e3).toISOString();
      blobDownload([columns.join(sep), ...contents].join("\n"), `movai-logs-${dateString}.csv`, "text/csv;charset=utf-8");
    })
  }, [columns, getLogsToExport]);

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
          <div className="no-rows">{i18n.t("No matches found")}</div>
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
    // Remove duplicates
    const data = _uniqWith(logsData, _isEqual).sort((a, b) => b.time - a.time);
    logsDataRef.current = data;
    // Return formated data
    return data;
  }, [logsData]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  const formatedLogsData = formatLogsData();
  return (
    <div className="external-div">
      <div data-testid="section_logs" className="wrapper">
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
          logsData={formatedLogsData}
        ></LogsFilterBar>
        <div
          data-testid="section_table-container"
          ref={handleContainerRef}
          className="table-container"
        >
          <LogsTable
            columns={columns}
            columnList={COLUMN_LIST}
            logsData={formatedLogsData}
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
