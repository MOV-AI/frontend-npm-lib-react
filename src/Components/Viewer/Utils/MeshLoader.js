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
    const meshTask = assetsManager.addMeshTask("", "", "../", meshName);
    meshTask.onSuccess = onSuccess;
    meshTask.onError = onFailure;
    assetsManager.onFinish = onFinally;
    assetsManager.load();
    // }
  }
}

export default MeshLoader;
