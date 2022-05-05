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

export const DEFAULT_SELECTED_SERVICES = ["BACKEND", "SPAWNER"];
export const DEFAULT_SELECTED_LEVELS = ["INFO", "ERROR", "CRITICAL"];
export const DEFAULT_SELECTED_COLUMNS = ["Time", "Robot", "Message"];
export const DEFAULT_LIMIT = 50;
export const ROBOT_LOG_TYPE = ["module", "service"];
