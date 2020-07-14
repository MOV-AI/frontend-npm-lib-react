import { Maybe } from "monet";
import { ASSETS_TYPES, AssetsTypesFactory } from "../Utils/AssetsTypesFactory";
import { MasterDB } from "mov.ai-core";
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
    this.observers = [];
    this.afterLoad = [];
    this.finishInitialSubscribers = 0;
    this.retrieveAssetsFromDb();
  }

  //========================================================================================
  /*                                                                                      *
   *                                  Getters and Setters                                 *
   *                                                                                      */
  //========================================================================================

  getAssets = () => this.assets;

  getAssetsActionMap = () => this.assetsActionMap;

  addAfterLoad = afterLoad => {
    this.afterLoad.push(afterLoad);
    return this;
  };

  addObserver(observer) {
    this.observers.push(observer);
    return this;
  }

  signalObservers = () => this.observers.forEach(obs => obs());

  addAsset(assetKey, asset) {
    try {
      this.assets[assetKey] = asset;
      this.assetsActionMap[assetKey] = AssetsTypesFactory[asset.type](asset);
    } catch (e) {
      console.log("Caught exception while adding asset", e);
    }
  }

  //========================================================================================
  /*                                                                                      *
   *                                      Subscribers                                     *
   *                                                                                      */
  //========================================================================================

  subs = [
    () =>
      MasterDB.subscribe(
        {
          Scope: "Robot",
          Name: "*",
          RobotName: "*"
        },
        data => {
          // console.log("UPDATE ROBOTS", data);
        },
        data => {
          ofNull(data.value)
            .flatMap(maybeGet("Robot"))
            .forEach(r => {
              Object.keys(r).forEach(id => this.addRobot(id, r[id].RobotName));
            });
          this.finishSub("RobotName");
        }
      ),
    () =>
      MasterDB.subscribe(
        {
          Scope: "Robot",
          Name: "*",
          Parameter: "tf"
        },
        data => {
          // console.log("UPDATE ROBOTS", data);
        },
        data => {
          ofNull(data.value)
            .flatMap(maybeGet("Robot"))
            .forEach(r => {
              Object.keys(r).forEach(id =>
                this.addRobot(id, null, r[id].Parameter.tf.Value)
              );
            });
          this.finishSub("Robot tf");
        }
      ),
    () =>
      MasterDB.subscribe(
        {
          Scope: "Package",
          File: "*",
          Name: "maps",
          FileLabel: "*"
        },
        this.getMapUpdater(({ key }) => key, this.signalObservers),
        this.getMapSubscriber(
          ({ value }) => value,
          () => this.finishSub("Maps")
        )
      ),
    () =>
      MasterDB.subscribe(
        { Scope: "Package", File: "*", Name: "meshes", FileLabel: "*" },
        this.getMeshUpdater(),
        this.getMeshSubscriber(
          ({ value }) => value,
          () => this.finishSub("Meshes")
        )
      )
  ];

  retrieveAssetsFromDb() {
    this.subs.forEach(f => f());
  }

  //========================================================================================
  /*                                                                                      *
   *                                         Utils                                        *
   *                                                                                      */
  //========================================================================================

  finishSub = place => {
    console.log("FINISH SUB ", place, this.finishInitialSubscribers);
    if (++this.finishInitialSubscribers > this.subs.length - 1) {
      this.afterLoad.forEach(f => f());
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Robots                                        *
   *                                                                                      */
  //========================================================================================

  addRobot(id, name = null, tf = null) {
    if (!(id in this.robots)) {
      this.robots[id] = {
        id: id,
        name: null,
        tf: null
      };
    }
    ofNull(name).forEach(name => (this.robots[id].name = name));
    ofNull(tf).forEach(tf => (this.robots[id].tf = tf));
    if (Object.values(this.robots[id]).every(x => x !== null)) {
      const localRobot = this.robots[id];
      localRobot.tf.name = localRobot.name;
      this.addAsset(localRobot.name, {
        name: localRobot.name,
        id: id,
        type: ASSETS_TYPES.Robot,
        robotTree: localRobot.tf
      });
    }
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

  getMapUpdater = (dataGetter, after = () => {}) => {
    const actionMap = {
      del: data => {
        this.getMapFileData(dataGetter, data).forEach(f => {
          let filename = Object.keys(f)[0];
          filename = filename.split(".")[0];
          delete this.assets[filename];
          delete this.assetsActionMap[filename];
        });
        after();
      },
      set: this.getMapSubscriber(dataGetter, after),
      subscribe: this.getMapSubscriber(dataGetter, after)
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
          delete this.assets[filename];
          delete this.assetsActionMap[filename];
        });
        this.signalObservers();
      },
      set: this.getMeshSubscriber(d => d.key, this.signalObservers),
      subscribe: this.getMeshSubscriber(d => d.key, this.signalObservers)
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
