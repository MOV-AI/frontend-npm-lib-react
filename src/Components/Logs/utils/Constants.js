import { CONSTANTS } from "@mov-ai/mov-fe-lib-core";

export const LEVELS_LABEL = {
  INFO: "Info",
  WARNING: "Warnings",
  DEBUG: "Debug",
  ERROR: "Error",
  CRITICAL: "Critical",
};

export const ROBOT_STATES = {
  ERROR: "ALERT",
  ACTIVE: "ACTIVE",
  OFFLINE: "OFFLINE",
};

export const COLUMNS_LABEL = {
  date: "Date",
  time: "Time",
  level: "Level",
  module: "Module",
  service: "Service",
  robot: "Robot",
  message: "Message",
};

export const DEFAULT_COLUMNS = {
  date: true,
  time: true,
  level: false,
  module: false,
  service: false,
  robot: true,
  message: true,
};

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
