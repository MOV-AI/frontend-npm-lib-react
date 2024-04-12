import React, { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { RobotManager, Features } from "@mov-ai/mov-fe-lib-core";
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

// TODO this should be exported. Fleetboard uses it
function blobDownload(file, fileName, charset = "text/plain;charset=utf-8") {
  const blob = new Blob([file], { type: charset });
  const url = URL.createObjectURL(blob);
  const a = globalThis.document.createElement("a");
  globalThis.document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
  globalThis.document.body.removeChild(a);
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

async function hashString(string) {
  const msgUint8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
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
  const sub = logsSub.use();
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
      date: { from: logsDataGlobal.length ? logsDataGlobal[logsDataGlobal.length - 1].timestamp : selectedFromDate, to: selectedToDate },
    }).then(response => {
      const data = response?.data || [];
      return Promise.all([Promise.resolve(data)].concat(data.map(item => hashString(item.message))));
    }).then(([data, ...hashes]) => {
      const oldLogs = logsDataGlobal || [];
      let j = data.length - 1;

      for (let i = 0; j > -1 && i < oldLogs.length; i++, j--) {
        const timestamp = data[j].time * 1000;
        const date = new Date(timestamp);

        if (date === oldLogs[i].timestamp && (hashes[j] + (timestamp * 1000)) === oldLogs[i].key)
          break;

        if (date < oldLogs[i].timestamp)
          break;
      }

      const newLogs =  (logsDataGlobal = data.slice(0, j).map((log, index) => {
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

      setLogsData(newLogs);
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
          timestamp: date,
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
        getLogs();
      }, 1000);
    }
  }, [getLogs, restLogs]);

  const handleExport = useCallback(() => {
    const sep = "\t";
    const contents = filteredLogs.map(log => {
      const [date, time] = getDateTime(log.time);
      return [date, time, log.robot, log.message].join(sep);
    });
    // from https://www.epochconverter.com/programming/
    const dateString = !filteredLogs.length ? new Date().toISOString() : new Date(filteredLogs[0].time * 1e3).toISOString();
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
