import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import { ROBOT_LOG_TYPE } from "./utils/Constants";
import { COLUMNS_LABEL } from "./utils/Constants";
import _isEqual from "lodash/isEqual";
import { useStyles } from "./styles";
import { useLogs } from "./useLogs";
import { Logs } from "@mov-ai/mov-fe-lib-core";
import { DEFAULT_COLUMNS } from "./utils/Constants";
import useAutoScroll from "./../../hooks/useAutoScroll";
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

function getRobots(robotsData) {
  return robotsData
    .map((robot) => robot.name)
    .reduce((a, robot) => ({ ...a, [robot]: true }), {});
}

function calcFilters(filters, defaults, force) {
  return Object.entries(filters).reduce(
    (a, [key, value]) => ({
      ...a,
      [key]:
        value && typeof value === "object"
          ? {
              ...value,
              ...(force?.[key]
                ? force[key].reduce(
                    (a, subKey) => ({ ...a, [subKey]: "force" }),
                    {},
                  )
                : {}),
              ...(defaults?.[key] ?? {}),
            }
          : value,
    }),
    {},
  );
}

const ReactLogs = (props) => {
  const { robotsData, hide, force, defaults, reverse } = props;
  const classes = useStyles();
  const handleContainerRef = useRef();
  const logModalRef = useRef();

  const [filters, setFilters] = useState(
    calcFilters(
      {
        robots: getRobots(robotsData),
        levels: Logs.CONSTANTS.DEFAULT_LEVELS,
        service: Logs.CONSTANTS.DEFAULT_SERVICE,
        columns: DEFAULT_COLUMNS,
        tags: {},
        message: "",
        selectedFromDate: null,
        selectedToDate: null,
      },
      defaults,
      force,
    ),
  );

  const {
    robots,
    levels,
    service,
    columns,
    tags,
    message,
    selectedFromDate,
    selectedToDate,
  } = filters;

  const filteredLogs = useLogs(
    {
      level: levels,
      service,
      tags,
      message,
      robot: robots,
      fromDate: selectedFromDate,
      toDate: selectedToDate,
      // limit: MAX_LOGS,
    },
    [levels, service, tags, message, robots, selectedFromDate, selectedToDate],
  );

  useEffect(() => {
    setFilters((oldFilters) =>
      calcFilters(
        oldFilters,
        { ...defaults, robots: getRobots(robotsData) },
        force,
      ),
    );
  }, [setFilters, defaults, force, robotsData.length]);

  const handleExport = useCallback(() => {
    const sep = "\t";
    const contents = filteredLogs.map((log) => {
      const { date, time, robot, message } = log;
      return [date, time, robot, message].join(sep);
    });
    // from https://www.epochconverter.com/programming/
    const dateString = !filteredLogs.length
      ? new Date().toISOString()
      : new Date(filteredLogs[0].time * 0.001).toISOString();
    const columnLabels = Object.keys(columns)
      .filter((key) => columns[key])
      .map((key) => COLUMNS_LABEL[key]);
    blobDownload(
      [columnLabels.join(sep), ...contents].join("\n"),
      `movai-logs-${dateString}.csv`,
      "text/csv;charset=utf-8",
    );
  }, [columns, filteredLogs]);

  const openLogDetails = useCallback((log) => {
    logModalRef.current.open(log.rowData);
  }, []);

  const versedLogs = useMemo(
    () => (reverse ? filteredLogs.reverse() : filteredLogs),
    [filteredLogs, reverse],
  );
  const { onScroll, isAutoScroll } = useAutoScroll(handleContainerRef, [
    versedLogs,
  ]);

  return (
    <div className={classes.externalDiv}>
      <div data-testid="section_logs" className={classes.wrapper}>
        <LogsFilterBar
          filters={filters}
          setFilters={setFilters}
          handleExport={handleExport}
          hide={hide}
        />
        <div
          data-testid="section_table-container"
          ref={handleContainerRef}
          className={classes.tableContainer}
          onScroll={onScroll}
        >
          <LogsTable
            columns={columns}
            logsData={versedLogs}
            levels={levels}
            onRowClick={openLogDetails}
            isAutoScroll={reverse ? isAutoScroll : false}
          ></LogsTable>
        </div>
      </div>
      <RobotLogModal ref={logModalRef} props={ROBOT_LOG_TYPE}></RobotLogModal>
    </div>
  );
};

export default ReactLogs;
