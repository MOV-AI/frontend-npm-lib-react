import { AssetsManager } from "babylonjs";
import MeshCache from "./MeshCache";

class MeshLoader {
  constructor(scene) {
    this.scene = scene;
  }

  static of(scene) {
    return new MeshLoader(scene);
  }

  loadMeshes(
    meshName,
    onSuccess = task => {},
    onFinally = task => {},
    onFailure = (task, message, exception) => {}
  ) {
    // TODO: There is a problem when mesh already exist on cache
    // if (MeshCache.getInstance().hasKey(meshName, this.scene)) {
    //   onFinally();
    // } else {
    const assetsManager = new AssetsManager(this.scene);
    const meshTask = assetsManager.addMeshTask(
      "",
      "",
      REST_API + "/static/meshes/",
      meshName
    );
    meshTask.onSuccess = onSuccess;
    meshTask.onError = onFailure;
    assetsManager.onFinish = onFinally;
    assetsManager.load();
    // }
  }
}

const REST_API =
  window.location.port === ""
    ? `http://${window.location.hostname}`
    : `http://${window.location.hostname}:${window.location.port}`;

export default MeshLoader;
