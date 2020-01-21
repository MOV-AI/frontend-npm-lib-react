import NodeItem from "./NodeItem";
import * as BABYLON from "babylonjs";
import { Maybe } from "monet";
import Util3d from "../Util3d/Util3d";

class Box extends NodeItem {
  static DEFAULT_SIZE = 0.5;

  constructor(mesh, size = Box.DEFAULT_SIZE, keyValueMap = {}) {
    super(mesh, keyValueMap);
    this.size = size;
  }

  toDict() {
    const dict = super.toDict();
    dict.size = this.size;
    return dict;
  }

  getType = () => Box.TYPE;

  static TYPE = "Box";

  static ofDict(scene, dict = null, mainView = null) {
    const maybeDict = Maybe.fromNull(dict);
    const size = maybeDict
      .flatMap(z => Maybe.fromNull(z.size))
      .orSome(Box.DEFAULT_SIZE);
    const name = maybeDict
      .flatMap(z => Maybe.fromNull(z.name))
      .orSome(`Box${Math.floor(Math.random() * 1e3)}`);
    const keyValueMap = maybeDict
      .flatMap(d => Maybe.fromNull(d.keyValueMap))
      .orUndefined();

    const boxMesh = Util3d.createBox(
      scene,
      new BABYLON.Color3(Math.random(), Math.random(), Math.random()),
      size,
      name
    );
    NodeItem.mapDict2Mesh(dict, boxMesh);
    return new Box(boxMesh, size, keyValueMap);
  }
}

export default Box;
