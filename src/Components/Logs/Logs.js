import React, { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { Typography } from "@material-ui/core";
import { RobotManager, Features } from "@mov-ai/mov-fe-lib-core";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import LogsSkeleton from "./LogsSkeleton";
import {
  ROBOT_STATES,
  DATE_KEY_OPTION,
  COLUMN_LIST,
  DEFAULT_SELECTED_COLUMNS,
  DEFAULT_LEVELS,
  DEFAULT_SERVICE,
  ROBOT_LOG_TYPE,
} from "./utils/Constants";
import { getDateTime } from "./utils/Utils";
import useUpdateEffect from "./hooks/useUpdateEffect";
import _isEqual from "lodash/isEqual";
import i18n from "i18next";

import { useStyles } from "./styles";
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

function noSelection(obj) {
  for (let key in obj) {
    if (obj[key])
      return false;
  }
  return true;
}

function onChangeSelect(set, event) {
  const selected = event.target.value.reduce((a, key) => ({ ...a, [key]: true }), {});
  set(prevState => Object.entries(prevState).reduce((a, [key]) => ({
    ...a,
    [key]: !!selected[key],
  }), {}));
}

function getRobots(robotsData) {
  return robotsData
    .map(robot => robot.name)
    .reduce((a, robot) => ({ ...a, [robot]: true }), {});
}

async function hashString(string) {
  const msgUint8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const MAX_FETCH_LOGS = 10000;
const MAX_LOGS = 2000;
let logsDataGlobal = [];

const Logs = props => {
  const { robotsData } = props;
  const classes = useStyles();
  const getLogsTimeoutRef = useRef();
  const [robots, setRobots] = useState(getRobots(robotsData));
  const refreshLogsTimeoutRef = useRef();
  const handleContainerRef = useRef();
  const logModalRef = useRef();
  const [levels, setLevels] = useState(DEFAULT_LEVELS);
  const [service, setService] = useState(DEFAULT_SERVICE);
  const [columns, setColumns] = useState(DEFAULT_SELECTED_COLUMNS);
  const [tags, setTags] = useState({});
  const [message, setMessage] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [logsData, setLogsData] = useState(logsDataGlobal);
  const [loading, setLoading] = useState(true);
  const restLogs = useMemo(() => !Features.get("logStreaming"), []);

  const filteredLogs = useMemo(() => (
    logsData.filter(item => (
      (levels[item.level] || noSelection(levels))
      && (service[item.service] || noSelection(service))
      && (tags[item.tag] || noSelection(tags))
      && (item.message || "").includes(message)
      && (robots[item.robot] || noSelection(robots))
    )).slice(0, MAX_LOGS)
  ), [logsData, levels, service, message, robots]);

  // if robotsData changes, update robots
  useEffect(() => { setRobots(getRobots(robotsData)); }, [setRobots, robotsData]);

  const getLogs = useCallback(() => {
    if (logsData.length) {
      console.assert(restLogs);
      setLoading(true);
    }

    const requestTime = new Date().getTime();
    // Remove previously enqueued requests
    clearTimeout(getLogsTimeoutRef.current);
    RobotManager.getLogs({
      limit: MAX_FETCH_LOGS,
      date: { from: lastRequestTime ?? selectedFromDate, to: selectedToDate },
    }).then(response => {
      const data = response?.data || [];
      return Promise.all([Promise.resolve(data)].concat(data.map(item => hashString(item.message))));
    }).then(([data, ...hashes]) => {
      setLogsData(prevState => {
        const oldLogs = prevState || [];

        return (logsDataGlobal = data.map((log, index) => {
          const timestamp = log.time * 1000;
          const date = new Date(timestamp);
          return ({
            ...log,
            time: date.toLocaleTimeString(),
            date: date.toLocaleDateString(),
            key: hashes[index] + (timestamp * 1000),
          });
        }).concat(oldLogs).slice(0, MAX_FETCH_LOGS));
      });
      setLastRequestTime(requestTime);
    });
  }, [selectedFromDate, selectedToDate, logsData, setLogsData, robotsData, restLogs]);

  const sock = useMemo(() => restLogs ? null : RobotManager.openLogs({}), []);

  useEffect(() => {
    getLogs();
  }, []);

  const onMessage = useCallback((msg) => {
    const item = JSON.parse(msg?.data ?? {});
    const date = new Date(item.time / 1000000);
    hashString(item.message).then(hash => {
      setLogsData((prevState) => logsDataGlobal = [
        {
          ...item,
          timestamp: item.time,
          time: date.toLocaleTimeString(),
          date: date.toLocaleDateString(),
          key: hash + item.time
        },
        ...prevState
      ].slice(0, MAX_FETCH_LOGS));
    });
  }, [setLogsData]);

  useEffect(() => {
    if (restLogs)
      return;

    sock.onmessage = onMessage;

    return () => {
      sock.close();
    };
  }, [onMessage, sock, restLogs]);

  useUpdateEffect(() => {
    if (restLogs) {
      clearTimeout(refreshLogsTimeoutRef.current);
      refreshLogsTimeoutRef.current = setTimeout(() => {
        setLoading(true);
        getLogs();
      }, 1000);
    }
  }, [getLogs, restLogs]);

  const onChangeRobots = useCallback(event => onChangeSelect(setRobots, event), [setRobots]);
  const onChangeMessage = useCallback(text => setMessage(text), []);
  const onChangeLevels = useCallback(event => onChangeSelect(setLevels, event), [setLevels]);
  const onChangeServices = useCallback(event => onChangeSelect(setService, event), [setService]);

  const onChangeColumns = useCallback(event => {
    // make sure columns are always with the same order
    const newColumns = Object.keys(COLUMN_LIST).filter(col =>
      event.target.value.includes(col)
    );
    setColumns(newColumns);
  }, []);

  const onChangeDate = useCallback((newDate, keyToChange) => {
    const setDate = {
      [DATE_KEY_OPTION.FROM]: date => setSelectedFromDate(date),
      [DATE_KEY_OPTION.TO]: date => setSelectedToDate(date)
    };
    setDate[keyToChange](newDate);
  }, []);

  const addTag = useCallback(
    tagText => setTags(prevState => ({ ...prevState, [tagText]: true })),
    [setTags]
  );

  const deleteTag = useCallback(tagText => setTags(prevState => {
    const newState = { ...prevState };
    delete newState[tagText];
    return newState;
  }), [setTags]);

  const handleExport = useCallback(() => {
    const sep = "\t";
    const contents = filteredLogs.map(log => {
      const [date, time] = getDateTime(log.time);
      return [date, time, log.robot, log.message].join(sep);
    });
    // from https://www.epochconverter.com/programming/
    const dateString = !logs.length ? new Date().toISOString() : new Date(logs[0].time * 1e3).toISOString();
    blobDownload([columns.join(sep), ...contents].join("\n"), `movai-logs-${dateString}.csv`, "text/csv;charset=utf-8");
  }, [columns, filteredLogs]);

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
  }, [classes.noRows, loading]);

  return (
    <div className={classes.externalDiv}>
      <div data-testid="section_logs" className={classes.wrapper}>
        <LogsFilterBar
          robots={robots}
          handleRobotChange={onChangeRobots}
          handleLevels={onChangeLevels}
          handleSelectedService={onChangeServices}
          handleColumns={onChangeColumns}
          handleMessageRegex={onChangeMessage}
          handleDateChange={onChangeDate}
          handleAddTag={addTag}
          handleDeleteTag={deleteTag}
          handleExport={handleExport}
          levels={levels}
          service={service}
          columns={columns}
          columnList={COLUMN_LIST}
          tags={tags}
          messageRegex={message}
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
            logsData={filteredLogs}
            levels={levels}
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
