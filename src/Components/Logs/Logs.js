import React, { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { RobotManager, Features } from "@mov-ai/mov-fe-lib-core";
import useSub from "../../hooks/useSub";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import { ROBOT_LOG_TYPE } from "./utils/Constants";
import { COLUMNS_LABEL } from "./utils/Constants";
import { getDateTime } from "./utils/Utils";
import useUpdateEffect from "./hooks/useUpdateEffect";
import _isEqual from "lodash/isEqual";
import { useStyles } from "./styles";
import { logsSub } from "./sub";
import "./Logs.css";

function transformLog(log, index, data, ts_multiplier = 1000) {
  const timestamp = ts_multiplier * log.time;
  const date = new Date(timestamp);
  return ({
    ...log,
    timestamp,
    time: date.toLocaleTimeString(),
    date: date.toLocaleDateString(),
    key: log.message + timestamp,
  });
}

function logsDedupe(oldLogs, data) {
  if (!data.length)
    return oldLogs;

  const oldDate = (oldLogs?.[0]?.timestamp ?? 0) * 0.001;
  const oldMsg = oldLogs?.[0]?.message ?? "x";
  let j;

  // starting from oldest new log, compare with newest old log.
  // decrease j until we find a log that is not present

  for (j = data.length - 1; j > -1 ; j--) {
    const newDate = data[j].time;
    const newMsg = data[j].message;

    if (newDate > oldDate || (
      newDate === oldDate && newMsg !== oldMsg
    ))
      break;
  }

  return data.slice(0, j + 1).map(transformLog)
    .concat(oldLogs);
}

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

function getRobots(robotsData) {
  return robotsData
    .map(robot => robot.name)
    .reduce((a, robot) => ({ ...a, [robot]: true }), {});
}

function matchTags(tags, item) {
  for (const tag in tags)
    if (item[tag] !== undefined)
      continue;
    else
      return false;
  return true;
}

const MAX_FETCH_LOGS = 20000;
const MAX_LOGS = 2000;
let logsDataGlobal = [];

const Logs = props => {
  const { robotsData, hide, force, defaults } = props;
  const classes = useStyles();
  const getLogsTimeoutRef = useRef();
  const refreshLogsTimeoutRef = useRef();
  const handleContainerRef = useRef();
  const logModalRef = useRef();
  const sub = useSub(logsSub);
  const {
    robots, levels, service, columns, tags,
    message, selectedFromDate, selectedToDate,
  } = sub;
  const [logsData, setLogsData] = useState(logsDataGlobal);
  const restLogs = useMemo(() => !Features.get("logStreaming"), []);

  const filteredLogs = useMemo(() => (
    logsDataGlobal.filter(item => (
      (levels[item.level] || noSelection(levels))
      && (service[item.service] || noSelection(service))
      && (matchTags(tags, item) || noSelection(tags))
      && (item.message || "").includes(message)
      && (robots[item.robot] || noSelection(robots))
      && (!selectedFromDate || item.timestamp >= selectedFromDate)
      && (!selectedToDate || item.timestamp <= selectedToDate)
    )).slice(0, MAX_LOGS)
  ), [logsData, levels, service, message, tags, robots, selectedFromDate, selectedToDate]);

  useEffect(() => {
    for (const key of Object.keys(props.force ?? {}))
      logsSub.set(key, {
        ...sub[key],
        ...force[key].reduce((a, subKey) => ({ ...a, [subKey]: 'force' }), {}),
      });
  }, [force]);

  useEffect(() => {
    for (const key of Object.keys(props.defaults ?? {}))
      logsSub.set(key, {
        ...sub[key],
        ...defaults[key],
      });
  }, [defaults]);

  // if robotsData changes, update robots
  useEffect(() => { logsSub.set("robots", getRobots(robotsData)); }, [robotsData]);

  const getLogs = useCallback(() => {
    // Remove previously enqueued requests
    clearTimeout(getLogsTimeoutRef.current);
    RobotManager.getLogs({
      limit: MAX_FETCH_LOGS,
      date: { from: logsDataGlobal.length ? logsDataGlobal[0].timestamp : selectedFromDate, to: selectedToDate },
    }).then(response => {
      const data = response?.data || [];
      const oldLogs = logsDataGlobal || [];
      const newLogs = logsDataGlobal = logsDedupe(oldLogs, data)
        .slice(0, MAX_FETCH_LOGS);

      setLogsData(newLogs);
    });
  }, [selectedFromDate, selectedToDate, logsData, setLogsData, robotsData, restLogs]);

  const sock = useMemo(() => restLogs ? null : RobotManager.openLogs({}), []);

  useEffect(() => {
    getLogs();
  }, []);

  const onMessage = useCallback((msg) => {
    const item = JSON.parse(msg?.data ?? {});
    setLogsData((prevState) => logsDataGlobal = [
      transformLog(item, 0, [item], 0.001),
      ...prevState
    ].slice(0, MAX_FETCH_LOGS));
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
        getLogs();
      }, 1000);
    }
  }, [getLogs, restLogs]);

  const handleExport = useCallback(() => {
    const sep = "\t";
    const contents = filteredLogs.map(log => {
      const { date, time, robot, message } = log;
      return [date, time, robot, message].join(sep);
    });
    // from https://www.epochconverter.com/programming/
    const dateString = !filteredLogs.length ? new Date().toISOString() : new Date(filteredLogs[0].timestamp * 0.001).toISOString();
    const columnLabels = Object.keys(columns).filter(key => columns[key]).map(key => COLUMNS_LABEL[key]);
    blobDownload([columnLabels.join(sep), ...contents].join("\n"), `movai-logs-${dateString}.csv`, "text/csv;charset=utf-8");
  }, [columns, filteredLogs]);

  const openLogDetails = useCallback(log => {
    logModalRef.current.open(log.rowData);
  }, []);

  return (
    <div className={classes.externalDiv}>
      <div data-testid="section_logs" className={classes.wrapper}>
        <LogsFilterBar handleExport={handleExport} hide={hide} />
        <div
          data-testid="section_table-container"
          ref={handleContainerRef}
          className={classes.tableContainer}
        >
          <LogsTable
            columns={columns}
            logsData={filteredLogs}
            levels={levels}
            onRowClick={openLogDetails}
          ></LogsTable>
        </div>
      </div>
      <RobotLogModal ref={logModalRef} props={ROBOT_LOG_TYPE}></RobotLogModal>
    </div>
  );
};

export default Logs;
