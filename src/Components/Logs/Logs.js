import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Features, RobotManager } from "@mov-ai/mov-fe-lib-core";
import useSub from "../../hooks/useSub";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import { COLUMNS_LABEL, ROBOT_LOG_TYPE } from "./utils/Constants";
import useUpdateEffect from "./hooks/useUpdateEffect";
import { useStyles } from "./styles";
import { logsSub } from "./sub";
import "./Logs.css";
import i18n from "../../i18n";

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
export function logsDedupe(oldLogs, data) {
  if (!data.length) return oldLogs;

  // date of the oldest log received in the current request
  const oldDate = data.at(-1).timestamp;
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
  const reversed = newSecOverlap.toReversed();
  return data.slice(0, z + 1).concat(reversed, oldLogs);
}

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
  a.remove();
}

function noSelection(obj) {
  for (let key in obj) {
    if (obj[key]) return false;
  }
  return true;
}

function getRobots(robotsData) {
  return robotsData
    .map((robot) => robot.name)
    .reduce((a, robot) => ({ ...a, [robot]: true }), {});
}

function matchTags(tags, item) {
  for (const tag in tags) {
    if (item[tag] === undefined) return false;
  }
  return true;
}

const MAX_FETCH_LOGS = 20000;
const MAX_LOGS = 2000;
let logsDataGlobal = [];

const Logs = (props) => {
  const { robotsData, hide, force, defaults } = props;
  const classes = useStyles();
  const getLogsTimeoutRef = useRef();
  const refreshLogsTimeoutRef = useRef();
  const handleContainerRef = useRef();
  const logModalRef = useRef();
  const sub = useSub(logsSub);
  const {
    robots,
    levels,
    service,
    columns,
    tags,
    message,
    selectedFromDate,
    selectedToDate,
  } = sub;
  const [logsData, setLogsData] = useState(logsDataGlobal);
  const restLogs = useMemo(() => !Features.get("logStreaming"), []);

  const filteredLogs = useMemo(
    () =>
      logsDataGlobal
        .filter(
          (item) =>
            (levels[item.level] || noSelection(levels)) &&
            (service[item.service] || noSelection(service)) &&
            (matchTags(tags, item) || noSelection(tags)) &&
            (item.message || "").includes(message) &&
            (robots[item.robot] || noSelection(robots)) &&
            (!selectedFromDate || item.timestamp >= selectedFromDate) &&
            (!selectedToDate || item.timestamp <= selectedToDate),
        )
        .slice(0, MAX_LOGS),
    [
      logsData,
      levels,
      service,
      message,
      tags,
      robots,
      selectedFromDate,
      selectedToDate,
    ],
  );

  useEffect(() => {
    for (const key of Object.keys(props.force ?? {}))
      logsSub.set(key, {
        ...sub[key],
        ...force[key].reduce((a, subKey) => ({ ...a, [subKey]: "force" }), {}),
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
  useEffect(() => {
    logsSub.set("robots", getRobots(robotsData));
  }, [robotsData]);

  const getLogs = useCallback(() => {
    // Remove previously enqueued requests
    clearTimeout(getLogsTimeoutRef.current);
    RobotManager.getLogs({
      limit: MAX_FETCH_LOGS,
      date: {
        from: logsDataGlobal.length
          ? logsDataGlobal[0].timestamp
          : selectedFromDate,
        to: selectedToDate,
      },
    }).then((response) => {
      const data = response?.data || [];
      const oldLogs = logsDataGlobal || [];
      const newLogs = (logsDataGlobal = logsDedupe(
        oldLogs,
        data.map(transformLog),
      ).slice(0, MAX_FETCH_LOGS));

      setLogsData(newLogs);
    });
  }, [
    selectedFromDate,
    selectedToDate,
    logsData,
    setLogsData,
    robotsData,
    restLogs,
  ]);

  const sock = useMemo(() => (restLogs ? null : RobotManager.openLogs({})), []);

  useEffect(() => {
    getLogs();
  }, []);

  const onMessage = useCallback(
    (msg) => {
      const item = JSON.parse(msg?.data ?? {});
      setLogsData(
        (prevState) =>
          (logsDataGlobal = [
            transformLog(item, 0, [item], 0.000001),
            ...prevState,
          ].slice(0, MAX_FETCH_LOGS)),
      );
    },
    [setLogsData],
  );

  useEffect(() => {
    if (restLogs) return;

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
    const contents = filteredLogs.map((log) => {
      const { date, time, robot, message } = log;
      return [date, time, robot, message].join(sep);
    });
    // from https://www.epochconverter.com/programming/
    const dateString =
      filteredLogs.length === 0
        ? new Date().toISOString()
        : new Date(filteredLogs[0].timestamp * 0.001).toISOString();
    const columnLabels = Object.keys(columns)
      .filter((key) => columns[key])
      .map((key) => i18n.t(COLUMNS_LABEL[key]));
    blobDownload(
      [columnLabels.join(sep), ...contents].join("\n"),
      `movai-logs-${dateString}.csv`,
      "text/csv;charset=utf-8",
    );
  }, [columns, filteredLogs]);

  const openLogDetails = useCallback((log) => {
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

Logs.propTypes = {
  robotsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  hide: PropTypes.object,
  force: PropTypes.object,
  defaults: PropTypes.object,
};
