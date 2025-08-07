import { CONSTANTS } from "@mov-ai/mov-fe-lib-core";
import i18n from "../../../i18n";

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
  date: i18n.t("Date"),
  time: i18n.t("Time"),
  level: i18n.t("Level"),
  module: i18n.t("Module"),
  service: i18n.t("Service"),
  robot: i18n.t("Robot"),
  message: i18n.t("Message"),
};

export const DEFAULT_SERVICE = Object.keys(CONSTANTS.SERVICE_LABEL).reduce(
  (a, item) => ({ [item]: false, ...a }),
  {
    spawner: true,
  },
);

export const DEFAULT_LEVELS = {
  INFO: true,
  WARNING: false,
  DEBUG: false,
  ERROR: true,
  CRITICAL: true,
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
