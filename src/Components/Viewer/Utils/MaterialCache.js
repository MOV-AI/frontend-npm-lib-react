import { Maybe } from "monet";
/**
 * Material cache for each scene.
 *
 * Each material is associated with a scene therefore we must have a cache per scene.
 *
 * TODO: to similar with mesh cache, therefore there is possibility of abstraction
 *
 */
class MaterialCache {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.materialCacheBySceneId = {};
    this.count = 0;
  }

  static getInstance() {
    return new MaterialCache();
  }

  hasKey(key, scene) {
    const sceneId = scene._uid;
    return Maybe.fromNull(this.materialCacheBySceneId[sceneId])
      .flatMap(materialCache => ofNull(materialCache[key]))
      .cata(
        () => false,
        () => true
      );
  }

  put(key, scene, material) {
    const sceneId = scene._uid;
    if (!(sceneId in this.materialCacheBySceneId)) {
      this.materialCacheBySceneId[sceneId] = {};
    }
    this.materialCacheBySceneId[sceneId][key] = material;
    return this;
  }

  get(key, scene) {
    const sceneId = scene._uid;
    return Maybe.fromNull(this.materialCacheBySceneId[sceneId])
      .flatMap(materialCache => ofNull(materialCache[key]))
      .map(material => {
        this.count++;
        return material;
      });
  }

  del(scene) {
    const sceneId = scene._uid;
    if (sceneId in this.materialCacheBySceneId) {
      delete this.materialCacheBySceneId[sceneId];
    }
  }
}

const ofNull = x => Maybe.fromNull(x);
// private instance
let instance = null;
export default MaterialCache;
