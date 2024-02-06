import { useMemo } from "react";
import { MENU_PROPS } from "./_shared/Constants";
import { useRobotSelectorStyles } from "../../styles";
import useSelector from "./../useSelector";

export default function RobotSelector(props) {
  const { robots, handleRobotChange } = props;
  const robotsLabel = useMemo(() => Object.keys(robots).reduce((a, key) => ({ ...a, [key]: key }), {}), [robots]);
  return useSelector(robotsLabel, "robot-selector", MENU_PROPS, robots, handleRobotChange, useRobotSelectorStyles);
}
