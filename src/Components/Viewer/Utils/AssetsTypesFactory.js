import AddMapAction from "../Actions/AddMapAction";
import RobotAction from "../Actions/RobotAction";
import Robot from "../NodeItem/Robot";
import AddMeshAction from "../Actions/AddMeshAction";

export const ASSETS_TYPES = {
  Map: "Map",
  Robot: "Robot",
  Mesh: "Mesh",
};

export const AssetsTypesFactory = {
  Map: (map) => new AddMapAction(map.name, map.loader),
  Robot: (robot) => new RobotAction(robot, Robot.getSocketAnimator),
  Mesh: (mesh) => new AddMeshAction(mesh),
};
