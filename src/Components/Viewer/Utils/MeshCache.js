import { Maybe } from "monet";

let instance = null;
class MeshCache {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.meshCacheBySceneId = {};
    this.count = 0;
  }

  static getInstance() {
    return new MeshCache();
  }

  hasKey(key, scene) {
    const sceneId = scene._uid;
    return Maybe.fromNull(this.meshCacheBySceneId[sceneId])
    .flatMap(meshCache => ofNull(meshCache[key]))
    .orSome(false);
  }

  put(key, scene, mesh) {
    const sceneId = scene._uid;
    if (!(sceneId in this.meshCacheBySceneId)) {
      this.meshCacheBySceneId[sceneId] = {};
    }
    this.meshCacheBySceneId[sceneId][key] = mesh;
    mesh.setEnabled(false);
    return this;
  }

  get(key, scene) {
    const sceneId = scene._uid;
    return Maybe.fromNull(this.meshCacheBySceneId[sceneId])
      .flatMap(meshCache => ofNull(meshCache[key]))
      .map(mesh => {
        console.log(
          "#Mesh: Found Mesh in cache, retrieving copy number",
          this.count
        );
        const cloneMesh = mesh.clone(`${key}${this.count++}`);
        console.log("#Mesh:", cloneMesh);
        return cloneMesh;
      })
      .orNull();
  }
}

const ofNull = x => Maybe.fromNull(x)
export default MeshCache;
