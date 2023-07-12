import React, { useMemo, useCallback, useState, useRef, useEffect } from "react";
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
import { easySub, useSub } from "./../HOCs/withAuthentication";
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

const logsSub = easySub([]);

const logsEmit = logsSub.easyEmit(async filters => {
  const response = await RobotManager.getLogs(filters);
  return response?.data || [];
});

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
  const logsDataRef = useRef([]);
  const logModalRef = useRef();
  const isMounted = useRef();
  // State hooks
  const [columns, setColumns] = useState(DEFAULT_SELECTED_COLUMNS);
  const [logsData, setLogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    limit: DEFAULT_LIMIT,
    level: {
      selected: DEFAULT_SELECTED_LEVELS,
      list: ADVANCED_LEVELS_LIST,
    },
    service: {
      selected: DEFAULT_SELECTED_SERVICES,
    },
    tag: {
      selected: [],
    },
    searchMessage: "",
    robot: {
      selected: {}
    },
    date: {
      from: "",
      to: "",
    },
  });
  const data = useSub(logsSub);

  useEffect(() => { logsEmit(filters) }, [filters]);

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

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
    setFilters(filters => {
      const newRobots = { ...filters.robot.selected };
      robotsData.forEach(robot => {
        const id = robot.id;
        newRobots[id] = {
          ...robot,
          isSelected: filters.robot.selected[id]?.isSelected ?? true
        };
      });

      selectedRobotsRef.current = newRobots;
      return {
        ...filters,
        robot: {
          selected: newRobots,
        }
      };
    });
  }, [robotsData]);

  // On change filter
  useEffect(() => {
    refreshLogs();
  }, [filters]);

  // Add timeout before refresh logs on text input change
  //  This will prevent unnecessary re-renders while the user is still typing
  //  Applies for text inputs (search and limit) and date time picker
  useUpdateEffect(() => {
    clearTimeout(refreshLogsTimeoutRef.current);
    refreshLogsTimeoutRef.current = setTimeout(() => {
      logsEmit(filters);
    }, 1000);
  }, [filters]);

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
      setFilters(filters => {
        const newRobots = {
          ...filters.robot.selected,
          [robotId]: {
            ...filters.robot.selected[robotId],
            isSelected: !filters.robot.selected[robotId].isSelected
          }
        };
        selectedRobotsRef.current = newRobots;
        return {
          ...filters,
          robot: { selected: newRobots },
        };
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
    setFilters({
      ...filters,
      searchMessage: text,
    });
  }, []);

  /**
   * On change levels from filter
   */
  const onChangeLevels = useCallback(event => {
    setFilters({
      ...filters,
      level: {
        ...filters.level,
        selected: event.target.value,

      },
    });
  }, [filters]);

  /**
   * On change selected services from filter
   */
  const onChangeServices = useCallback(event => {
    setFilters({
      ...filters,
      service: {
        selected: event.target.value,
      },
    });
  }, [filters]);

  /**
   * On change limit from filter
   */
  const onChangeLimit = useCallback(event => {
    let _limit = DEFAULT_LIMIT;
    if (event.target.value !== "") _limit = event.target.value;
    setFilters({ ...filters, limit: _limit });
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
      [DATE_KEY_OPTION.FROM]: date => {
        setFilters({
          ...filters,
          date: {
            from: date,
            to: filters.date.to,
          },
        });
      },
      [DATE_KEY_OPTION.TO]: date => {
        setFilters({
          ...filters,
          date: {
            from: filters.date.from,
            to: date,
          },
        });
      },
    };
    lastRequestTimeRef.current = null;
    setDate[keyToChange](newDate);
  }, [filters]);

  /**
   * On add tag from filter
   */
  const addTag = useCallback(tagText => {
    setFilters(filters => {
      const alreadyExists = filters.tag.selected.find(elem => elem.label === tagText);

      // Don't add tag if it's empty or duplicate
      if (tagText !== "" && !alreadyExists)
        return {
          ...filters,
          tag: {
            selected: [
              ...filters.tag.selected,
              {
                key: findsUniqueKey(filters.tag.selected, "key"),
                label: tagText
              }
            ],
          }
        };

      return filters;
    });
  }, []);

  /**
   * On delete tag from filter
   */
  const deleteTag = useCallback(tagToDelete => {
    setFilters(filters => {
      return {
        ...filters,
        tag: {
          selected: filters.tag.selected.filter(tag => tag.key !== tagToDelete.key),
        },
      };
    });
  }, []);

  const getLogsToExport = useCallback(() => {
    const queryParams = {
      level: { selected: filters.level.selected, list: filters.level.list },
      service: { selected: filters.service.selected },
      tag: { selected: filters.tag.selected },
      searchMessage: filters.searchMessage,
      date: filters.date,
      robot: { selected: getSelectedRobots() },
    };
    return RobotManager.getLogs(queryParams)
      .then(response => {
        return response?.data || [];
      })
  }, [filters])

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
    return Object.values(filters.robot.selected);
  }, [filters.robot.selected]);

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
  const formatedLogsData = useMemo(() => formatLogsData(), [formatLogsData]);
  const formatedLogsData2 = useMemo(() => data.map(item => {
    const date = new Date(item.time * 1000);
    const DateTime = date.getDate() === (new Date()).getDate()
      ? date.toLocaleTimeString()
      : date.toLocaleString();
    return {
      ...item,
      Robot: item.robot,
      Message: item.message,
      Level: item.level,
      Module: item.module,
      Time: DateTime,
    };
  }), [data]);
  return (<>
    <div className="vertical-0 size-vertical">
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
        levels={filters.level.selected}
        levelsList={filters.level.list}
        selectedService={filters.service.selected}
        limit={filters.limit}
        columns={columns}
        columnList={COLUMN_LIST}
        tags={filters.tag.selected}
        messageRegex={filters.searchMessage}
        selectedFromDate={filters.date.from}
        selectedToDate={filters.date.to}
        logsData={formatedLogsData}
      ></LogsFilterBar>
      <LogsTable
        columns={columns}
        columnList={COLUMN_LIST}
        logsData={formatedLogsData2}
        levelsList={filters.level.list}
        onRowClick={openLogDetails}
        noRowsRenderer={handleNoRows}
      ></LogsTable>
    </div>
    <RobotLogModal ref={logModalRef} props={ROBOT_LOG_TYPE}></RobotLogModal>
  </>);
};

export default Logs;
