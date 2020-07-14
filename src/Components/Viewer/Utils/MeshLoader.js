import MeshCache from "./MeshCache";
import { AssetsManager } from "@babylonjs/core";
import "@babylonjs/loaders";

class MeshLoader {
  constructor(scene) {
    this.scene = scene;
  }

  static of(scene) {
    return new MeshLoader(scene);
  }

  load = (meshName, mapFunction = mesh => mesh) =>
    new Promise((re, rej) => {
      const meshCache = MeshCache.getInstance();
      if (meshCache.hasKey(meshName, this.scene)) {
        console.log(`Found Mesh ${meshName} in cache for scene ${this.scene}`);
        re(mapFunction(meshCache.get(meshName, this.scene)));
      } else {
        console.log("Loading mesh....");
        const assetsManager = new AssetsManager(this.scene);
        const meshTask = assetsManager.addMeshTask("", "", MESH_URL, meshName);
        meshTask.onSuccess = task => {
          console.log("Load Success", meshName);
          const mesh = task.loadedMeshes[0];
          mesh.name = meshName;
          meshCache.put(meshName, this.scene, mesh);
        };
        meshTask.onError = (task, message, exception) =>
          rej({ message, exception });
        assetsManager.onFinish = task => {
          console.log("Load finish ");
          re(mapFunction(meshCache.get(meshName, this.scene)));
        };
        assetsManager.load();
      }
    });

  static getMeshUrl = src => `${MESH_URL}${src}`;
}

const MESH_URL = `/static/meshes/`;
export default MeshLoader;
