import AddMapAction from "../Actions/AddMapAction";
import RobotAction from "../Actions/RobotAction";
import Robot from "../NodeItem/Robot";

export const ASSETS_TYPES = {
  Map: "Map",
  Robot: "Robot"
};

export const AssetsTypesFactory = {
  Map: map => {
    return new AddMapAction(
      map.name,
      map.image,
      map.resolution,
      map.origin,
      map.size
    );
  },
  Robot: robot => new RobotAction(robot, Robot.getSocketAnimator)
};
