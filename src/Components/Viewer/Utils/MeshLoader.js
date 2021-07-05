import MeshCache from "./MeshCache";
import {
  AssetsManager,
  Quaternion,
  Vector3,
  VertexBuffer
} from "@babylonjs/core";
import { ASSETS_TYPES } from "../Utils/AssetsTypesFactory";
import "@babylonjs/loaders";

class MeshLoader {
  constructor(scene) {
    this.scene = scene;
  }

  static of(scene) {
    return new MeshLoader(scene);
  }

  load = (meshName, mapFunction = MeshLoader.transformMesh) =>
    new Promise((re, rej) => {
      const meshCache = MeshCache.getInstance();
      if (meshCache.hasKey(meshName, this.scene)) {
        console.log(`Found Mesh ${meshName} in cache for scene ${this.scene}`);
        re(meshCache.get(meshName, this.scene));
      } else {
        console.log("Loading mesh....");
        const assetsManager = new AssetsManager(this.scene);
        const meshTask = assetsManager.addMeshTask("", "", MESH_URL, meshName);
        meshTask.onSuccess = task => {
          console.log("Load Success", meshName);
          const mesh = task.loadedMeshes[0];
          mesh.name = meshName;
          mesh.rotationQuaternion = Quaternion.Identity();
          mesh.position = Vector3.Zero();
          meshCache.put(meshName, this.scene, mesh);
        };
        meshTask.onError = (task, message, exception) => {
          console.log("Load error =>", message);
          rej({
            message,
            exception,
            assetName: meshName,
            assetType: ASSETS_TYPES.Mesh
          });
        };
        assetsManager.onFinish = task => {
          console.log("Load finish ");
          const meshParam = meshCache.get(meshName, this.scene);
          if (meshParam !== null) re(mapFunction(meshParam));
        };
        assetsManager.load();
      }
    });

  static getMeshUrl = src => `${MESH_URL}${src}`;
  /**
   * Side effect function
   */
  static transformMesh(mesh) {
    const theta = Math.PI / 2;
    const positions = mesh.getVerticesData(VertexBuffer.PositionKind);
    const normals = mesh.getVerticesData(VertexBuffer.NormalKind);
    const newPos = new Float32Array(positions.length);
    const newNormals = new Float32Array(positions.length);
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const numberOfVertices = positions.length / 3;
    for (let i = 0; i < numberOfVertices; i++) {
      newPos[i * 3] = positions[i * 3];
      newPos[i * 3 + 1] =
        positions[i * 3 + 1] * cos - positions[i * 3 + 2] * sin;
      newPos[i * 3 + 2] =
        positions[i * 3 + 1] * sin - positions[i * 3 + 2] * cos;
      newNormals[i * 3] = normals[i * 3];
      newNormals[i * 3 + 1] =
        normals[i * 3 + 1] * cos - normals[i * 3 + 2] * sin;
      newNormals[i * 3 + 2] =
        normals[i * 3 + 1] * sin - normals[i * 3 + 2] * cos;
    }
    mesh.setVerticesData(VertexBuffer.PositionKind, newPos, true);
    mesh.setVerticesData(VertexBuffer.NormalKind, newNormals, true);
    return mesh;
  }
}

const MESH_URL = `/static/meshes/`;
export default MeshLoader;
