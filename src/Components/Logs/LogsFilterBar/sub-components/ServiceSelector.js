import { MENU_PROPS } from "./_shared/Constants";
import { CONSTANTS } from "@mov-ai/mov-fe-lib-core";
import useSelector from "./../useSelector";

export default function ServiceSelector(props) {
  const { service, handleSelectedService } = props;
  return useSelector(CONSTANTS.SERVICE_LABEL, "services", MENU_PROPS, service, handleSelectedService);
}
