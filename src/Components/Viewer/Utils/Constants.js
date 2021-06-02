import { Color3 } from "@babylonjs/core";

const Constants = {
  RADIUS: 0.25,
  POINTS_DENSITY: 2,
  CLOUD_FUNCTION_NAME: "backend.viewer",
  NAV_CLOUD_NAME: "backend.generate_path",
  RAD2DEG: 180 / Math.PI,
  DEG2RAD: Math.PI / 180,
  DEBUG: false
};

export const LOGGER_STATUS = {
  init: 0,
  running: 1,
  paused: 2,
  terminated: 3
};

export const SCENE_BACKGROUND = {
  dark: Color3.Black(),
  light: Color3.Gray(),
  default: Color3.Black()
};

export default Constants;
