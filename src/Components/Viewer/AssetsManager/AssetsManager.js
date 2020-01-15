import { Maybe } from "monet";
import { ASSETS_TYPES, AssetsTypesFactory } from "../Utils/AssetsTypesFactory";
import { MasterDB } from "mov.ai-core";

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

  addAsset(assetKey, asset) {
    this.assets[assetKey] = asset;
    this.assetsActionMap[assetKey] = AssetsTypesFactory[asset.type](asset);
  }

  addRobot(id, name = null, tf = null) {
    if (!(id in this.robots)) {
      this.robots[id] = {
        id: id,
        name: null,
        tf: null
      };
    }
    Maybe.fromNull(name).forEach(name => (this.robots[id].name = name));
    Maybe.fromNull(tf).forEach(tf => (this.robots[id].tf = tf));
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

  addMap(yamlSrc) {
    return fetch(this.getMapUrl(yamlSrc))
      .then(response => response.text())
      .then(yamlTxt => this.parseYaml(yamlTxt))
      .then(map => {
        map["type"] = ASSETS_TYPES.Map;
        return map;
      })
      .then(map => this.addAsset(map.name, map));
  }

  //========================================================================================
  /*                                                                                      *
   *                                         Utils                                        *
   *                                                                                      */
  //========================================================================================

  getMapUrl = src => `http://${window.CURRENT_HOST}/static/maps/${src}`;

  getImageSize(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve([img.naturalWidth, img.naturalHeight]);
    });
  }

  parseYaml = async yamlTxt => {
    const ans = {};
    const actionDict = {
      image: (k, v) => (ans[k] = v),
      resolution: (k, v) => (ans[k] = Number.parseFloat(v)),
      origin: (k, v) => (ans[k] = JSON.parse(v))
    };
    yamlTxt
      .split("\n")
      .map(s => s.split(": "))
      .filter(split => split.length >= 2)
      .filter(split => split[0] in actionDict)
      .forEach(split => actionDict[split[0]](split[0], split[1]));
    ans["name"] = ans["image"].split("/").pop();
    ans["image"] = this.getMapUrl(ans["image"]);
    console.log("Yaml text", yamlTxt);
    ans["size"] = await this.getImageSize(ans["image"]);
    return ans;
  };

  finishSub = place => {
    console.log("FINISH SUB ", place, this.finishInitialSubscribers);
    if (++this.finishInitialSubscribers > 2) {
      this.afterLoad.forEach(f => f());
    }
  };

  getMapSubscribe = (dataGetter, apply2Maps = () => {}) => {
    return data => {
      return Maybe.fromNull(dataGetter(data))
        .flatMap(v => Maybe.fromNull(v.Package))
        .flatMap(p => Maybe.fromNull(p.maps))
        .flatMap(m => Maybe.fromNull(m.File))
        .forEach(f => {
          const promises = Object.keys(f)
            .filter(s => s.includes(".yaml"))
            .map(y => this.addMap(y));
          Promise.all(promises)
            .then(() => apply2Maps())
            .catch(e => console.log("Caught exception", e));
        });
    };
  };

  getUpdateMapSub = (dataGetter, apply2Maps) => {
    const actionMap = {
      del: data => {
        Maybe.fromNull(dataGetter(data))
          .flatMap(v => Maybe.fromNull(v.Package))
          .flatMap(p => Maybe.fromNull(p.maps))
          .flatMap(m => Maybe.fromNull(m.File))
          .forEach(f => {
            delete this.assets[Object.keys(f)[0]];
            delete this.assetsActionMap[Object.keys(f)[0]];
            apply2Maps();
          });
      },
      set: this.getMapSubscribe(dataGetter, apply2Maps),
      subscribe: this.getMapSubscribe(dataGetter, apply2Maps)
    };
    return data => {
      actionMap[data.event](data);
    };
  };

  retrieveAssetsFromDb() {
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
        Maybe.fromNull(data.value)
          .flatMap(v => Maybe.fromNull(v.Robot))
          .forEach(r => {
            Object.keys(r).forEach(id => this.addRobot(id, r[id].RobotName));
          });
        this.finishSub("RobotName");
      }
    );

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
        Maybe.fromNull(data.value)
          .flatMap(v => Maybe.fromNull(v.Robot))
          .forEach(r => {
            Object.keys(r).forEach(id =>
              this.addRobot(id, null, r[id].Parameter.tf.Value)
            );
          });
        this.finishSub("Robot tf");
      }
    );

    MasterDB.subscribe(
      {
        Scope: "Package",
        File: "*",
        Name: "maps"
      },
      this.getUpdateMapSub(
        data => data.key,
        () => this.observers.forEach(obs => obs())
      ),
      this.getMapSubscribe(
        data => data.value,
        () => this.finishSub("Maps")
      )
    );
  }

  //========================================================================================
  /*                                                                                      *
   *                                        static                                        *
   *                                                                                      */
  //========================================================================================

  static getInstance() {
    return new AssetsManager();
  }
}

// private variable from outside
let instance = null;

export default AssetsManager;
