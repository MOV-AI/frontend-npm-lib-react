import { MENU_PROPS } from "./_shared/Constants";
import { LEVELS_LABEL } from "./../../utils/Constants";
import useSelector from "./../useSelector";

export default function LevelSelector(props) {
  const { levels, handleLevels } = props;
  return useSelector(LEVELS_LABEL, "levels", MENU_PROPS, levels, handleLevels);
}
