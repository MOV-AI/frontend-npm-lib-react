import { getJustDateFromServer, getJustTimeFromServer } from "./Utils";

export const SIMPLE_LEVELS_LIST = [
  { value: "INFO", label: "Info" },
  { value: "ERROR", label: "Error" },
  { value: "CRITICAL", label: "Critical" }
];

export const ADVANCED_LEVELS_LIST = [
  { value: "INFO", label: "Info" },
  { value: "WARNING", label: "Warnings" },
  { value: "DEBUG", label: "Debug" },
  { value: "ERROR", label: "Error" },
  { value: "CRITICAL", label: "Critical" }
];

export const SERVICE_LIST = [
  { value: "BACKEND", label: "Backend" },
  { value: "SPAWNER", label: "Spawner" },
  { value: "REDIS", label: "Redis" },
  { value: "ROS", label: "Ros" },
  { value: "HAPROXY", label: "ha-proxy" }
];

export const ROBOT_STATES = {
  ERROR: "ALERT",
  ACTIVE: "ACTIVE",
  OFFLINE: "OFFLINE"
};

export const COLUMN_LIST = {
  Date: {
    label: "Date",
    dataKey: "time",
    width: 110,
    render: time => getJustDateFromServer(time)
  },
  Time: {
    label: "Time",
    dataKey: "time",
    width: 100,
    render: time => getJustTimeFromServer(time)
  },
  Level: {
    label: "Level",
    dataKey: "level",
    width: 100
  },
  Module: {
    label: "Module",
    dataKey: "module",
    width: 150
  },
  Robot: {
    label: "Robot",
    dataKey: "robot",
    width: 100
  },
  Message: {
    label: "Message",
    dataKey: "message",
    width: 100
  }
};

export const DEFAULT_SELECTED_SERVICES = ["BACKEND", "SPAWNER"];
export const DEFAULT_SELECTED_LEVELS = ["INFO", "ERROR", "CRITICAL"];
export const DEFAULT_SELECTED_COLUMNS = ["Time", "Robot", "Message"];
export const DEFAULT_LIMIT = 50;
export const ROBOT_LOG_TYPE = ["module", "service"];

export const DATE_KEY_OPTION = {
  FROM: "selectedFromDate",
  TO: "selectedToDate"
};
