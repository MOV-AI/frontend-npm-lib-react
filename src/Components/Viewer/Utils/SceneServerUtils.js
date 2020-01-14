import MasterComponent from "../../MasterComponent/MasterComponent";
import MasterDB from "../../../api/MasterDB";
import Constants from "./Constants";

class SceneServerUtils {
  static retrieveScene = (
    sceneName,
    successCallback = DEFAULT_SUCCESS,
    failCallback = DEFAULT_FAILURE("retrieving scene")
  ) => {
    MasterDB.cloudFunction(
      Constants.CLOUD_FUNCTION_NAME,
      "retrieveScene",
      sceneName,
      data => successFailIf(data, successCallback, failCallback)
    );
  };
}

const DEFAULT_FAILURE = failureLocation => data =>
  MasterComponent.alert(
    `Exception caught in ${failureLocation}: ${data.error}`,
    MasterComponent.ALERTS.error
  );

const DEFAULT_SUCCESS = data => {};

const successFailIf = (data, successCallback, failCallback) => {
  if (data.success) {
    successCallback(data);
  } else {
    failCallback(data);
  }
};
export default SceneServerUtils;
