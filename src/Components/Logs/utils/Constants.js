import { getJustDateFromServer, getJustTimeFromServer } from "./Utils";

export const SIMPLE_LEVELS_LIST = [
  { value: "INFO", label: "Info" },
  { value: "ERROR", label: "Error" },
  { value: "CRITICAL", label: "Critical" },
];

export const ADVANCED_LEVELS_LIST = [
  { value: "INFO", label: "Info" },
  { value: "WARNING", label: "Warnings" },
  { value: "DEBUG", label: "Debug" },
  { value: "ERROR", label: "Error" },
  { value: "CRITICAL", label: "Critical" },
];

export const ROBOT_STATES = {
  ERROR: "ALERT",
  ACTIVE: "ACTIVE",
  OFFLINE: "OFFLINE",
};

export const COLUMN_LIST = {
  Date: {
    label: "Date",
    dataKey: "date",
    width: 110,
  },
  Time: {
    label: "Time",
    dataKey: "time",
    width: 100,
  },
  Level: {
    label: "Level",
    dataKey: "level",
    width: 100,
  },
  Module: {
    label: "Module",
    dataKey: "module",
    width: 150,
  },
  Robot: {
    label: "Robot",
    dataKey: "robot",
    width: 100,
  },
  Message: {
    label: "Message",
    dataKey: "message",
    width: 100,
  },
};

export const DEFAULT_SELECTED_SERVICES = ["BACKEND", "SPAWNER"];
export const DEFAULT_SELECTED_LEVELS = ["INFO", "ERROR", "CRITICAL"];
export const DEFAULT_SELECTED_COLUMNS = ["Date", "Time", "Robot", "Message"];
export const DEFAULT_LIMIT = 50;
export const ROBOT_LOG_TYPE = ["module", "service"];

export const DATE_KEY_OPTION = {
  FROM: "selectedFromDate",
  TO: "selectedToDate",
};

export const COLOR_CODING = {
  INFO: {
    backgroundColor: "rgba(33, 150, 243, 0.1)",
  },
  WARNING: {
    backgroundColor: "rgba(255, 152, 0, 0.1)",
  },
  DEBUG: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  ERROR: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  CRITICAL: {
    backgroundColor: "rgba(255, 19, 1, 0.1)",
  },
};
