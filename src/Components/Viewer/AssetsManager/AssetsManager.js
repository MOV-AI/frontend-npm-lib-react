import { Maybe } from "monet";
import { ASSETS_TYPES, AssetsTypesFactory } from "../Utils/AssetsTypesFactory";
import { MasterDB } from "mov-fe-lib-core";
import MapLoader from "./MapLoader";

/**
 *  Graphic Assets Manager, retrieves and manages the assets that are in DB.
 */
class AssetsManager {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.assets = {};
    this.assetsActionMap = {};
    this.robots = {};
    this.observersBySceneId = {};
    this.afterLoad = [];
    this.finishInitialSubscribers = 0;
    this.isLoading = true;
  }

  //========================================================================================
  /*                                                                                      *
   *                                  Getters and Setters                                 *
   *                                                                                      */
  //========================================================================================

  getAssets = () => this.assets;

  getAssetsActionMap = () => this.assetsActionMap;

  load = async () => {
    await this.retrieveAssetsFromDb();
    return this;
  };

  addAfterLoad(afterLoad) {
    this.afterLoad.push(afterLoad);
    return this;
  }

  addObserver(scene, observer) {
    const sceneId = scene._uid;
    if (!(sceneId in this.observersBySceneId)) {
      this.observersBySceneId[sceneId] = [];
    }
    this.observersBySceneId[sceneId].push(observer);
    return this;
  }

  signalObservers = () => {
    Object.keys(this.observersBySceneId).forEach(k => {
      this.observersBySceneId[k].forEach(obs => obs(this));
    });
  };

  addAsset(assetKey, asset) {
    try {
      this.assets[assetKey] = asset;
      this.assetsActionMap[assetKey] = AssetsTypesFactory[asset.type](asset);
      if (!this.isLoading) this.signalObservers();
    } catch (e) {
      console.log("Caught exception while adding asset", e);
      throw Error(`Caught exception while adding asset ${e}`);
    }
  }

  delAsset(assetKey) {
    if (assetKey in this.assets) delete this.assets[assetKey];
    if (assetKey in this.assetsActionMap) delete this.assetsActionMap[assetKey];
    this.signalObservers();
  }

  clearObserver(scene) {
    const sceneId = scene._uid;
    if (sceneId in this.observersBySceneId) {
      console.log("Clear asset observer", sceneId);
      delete this.observersBySceneId[sceneId];
    }
  }

  //========================================================================================
  /*                                                                                      *
   *                                      Subscribers                                     *
   *                                                                                      */
  //========================================================================================

  subs = [
    resolve =>
      MasterDB.subscribe(
        {
          Scope: "Robot",
          Name: "*",
          RobotName: "*"
        },
        this.getRobotNameUpdate(),
        this.getRobotNameSub(
          ({ value }) => value,
          () => this.finishSub("RobotName", resolve)
        )
      ),
    resolve =>
      MasterDB.subscribe(
        {
          Scope: "Package",
          File: "*",
          Name: "maps",
          FileLabel: "*"
        },
        this.getMapUpdater(({ key }) => key),
        this.getMapSubscriber(
          ({ value }) => value,
          () => this.finishSub("Maps", resolve)
        )
      ),
    resolve =>
      MasterDB.subscribe(
        { Scope: "Package", File: "*", Name: "meshes", FileLabel: "*" },
        this.getMeshUpdater(),
        this.getMeshSubscriber(
          ({ value }) => value,
          () => this.finishSub("Meshes", resolve)
        )
      )
  ];

  retrieveAssetsFromDb() {
    return new Promise((re, rej) => {
      this.subs.forEach(f => f(re));
    });
  }

  //========================================================================================
  /*                                                                                      *
   *                                         Utils                                        *
   *                                                                                      */
  //========================================================================================

  finishSub = (place, resolve) => {
    console.log("FINISH SUB ", place, this.finishInitialSubscribers);
    if (++this.finishInitialSubscribers > this.subs.length - 1) {
      this.afterLoad.forEach(f => f(this));
      this.afterLoad = [];
      this.isLoading = false;
      resolve(true);
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Robots                                        *
   *                                                                                      */
  //========================================================================================

  deleteRobot = id => {
    this.delAsset(this.robots[id].name);
    if (id in this.robots) delete this.robots[id];
  };

  addRobot(id, name = null) {
    if (!(id in this.robots)) {
      this.robots[id] = {
        id: id,
        name: null
      };
    }
    ofNull(name).forEach(name => (this.robots[id].name = name));
    if (Object.values(this.robots[id]).every(x => x !== null)) {
      const localRobot = this.robots[id];
      this.addAsset(localRobot.name, {
        name: localRobot.name,
        id: id,
        type: ASSETS_TYPES.Robot,
        robotTree: {
          name: localRobot.name,
          position: { x: 0, y: 0, z: 0 },
          orientation: {
            w: 1,
            x: 0,
            y: 0,
            z: 0
          },
          child: []
        }
      });
    }
  }

  getRobotNameSub(getter, after = () => {}) {
    return data => {
      ofNull(getter(data))
        .flatMap(maybeGet("Robot"))
        .forEach(r =>
          Object.keys(r).forEach(id => this.addRobot(id, r[id].RobotName))
        );
      after();
    };
  }

  getRobotNameUpdate() {
    const actionMap = {
      del: data =>
        ofNull(data.key)
          .flatMap(maybeGet("Robot"))
          .forEach(r => Object.keys(r).forEach(this.deleteRobot)),
      set: this.getRobotNameSub(({ key }) => key)
    };
    return data => {
      console.log("Robot NAME UPDATE", data);
      actionMap[data.event](data);
    };
  }

  //========================================================================================
  /*                                                                                      *
   *                                         Maps                                         *
   *                                                                                      */
  //========================================================================================

  getMapSubscriber = (dataGetter, after = () => {}) => {
    return data =>
      this.getMapFileData(dataGetter, data).forEach(fileName => {
        Object.keys(fileName)
          .filter(f => f.includes(".yaml"))
          .forEach(this.addMap);
        after();
      });
  };

  getMapUpdater = dataGetter => {
    const actionMap = {
      del: data => {
        this.getMapFileData(dataGetter, data).forEach(f => {
          let filename = Object.keys(f)[0];
          filename = filename.split(".")[0];
          this.delAsset(filename);
        });
      },
      set: this.getMapSubscriber(dataGetter),
      subscribe: this.getMapSubscriber(dataGetter)
    };
    return data => {
      console.log("MAP UPDATE", data);
      actionMap[data.event](data);
    };
  };

  addMap = yamlSrc => {
    const map = {
      name: yamlSrc.split(".")[0],
      loader: new MapLoader(yamlSrc),
      type: ASSETS_TYPES.Map
    };
    this.addAsset(map.name, map);
  };

  getMapFileData = (dataGetter, data) =>
    ofNull(dataGetter(data))
      .flatMap(maybeGet("Package"))
      .flatMap(maybeGet("maps"))
      .flatMap(maybeGet("File"));

  //========================================================================================
  /*                                                                                      *
   *                                         Mesh                                         *
   *                                                                                      */
  //========================================================================================

  getMeshSubscriber = (dataGetter, after = () => {}) => data => {
    this.getMeshFileData(dataGetter, data).forEach(d =>
      Object.keys(d).forEach(id => {
        const mesh = { id: id, name: d[id].FileLabel, type: ASSETS_TYPES.Mesh };
        this.addAsset(mesh.name, mesh);
      })
    );
    after();
  };

  getMeshUpdater = () => {
    const actionMap = {
      del: data => {
        this.getMeshFileData(d => d.key, data).forEach(f => {
          let filename = Object.keys(f)[0];
          this.delAsset(filename);
        });
      },
      set: this.getMeshSubscriber(d => d.key),
      subscribe: this.getMeshSubscriber(d => d.key)
    };
    return data => actionMap[data.event](data);
  };

  getMeshFileData = (dataGetter, data) =>
    ofNull(dataGetter(data))
      .flatMap(maybeGet("Package"))
      .flatMap(maybeGet("meshes"))
      .flatMap(maybeGet("File"));

  //========================================================================================
  /*                                                                                      *
   *                                        static                                        *
   *                                                                                      */
  //========================================================================================

  static getInstance() {
    return new AssetsManager();
  }
}

// private variable
let instance = null;

// auxiliary functions
const ofNull = Maybe.fromNull;
const get = prop => obj => obj[prop];
const dot = f => g => x => f(g(x));
const maybeGet = prop => dot(ofNull)(get(prop));

export default AssetsManager;
