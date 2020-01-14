import NodeItem from "./NodeItem";
import * as BABYLON from "babylonjs";
import Util3d from "../Util3d/Util3d";
import { Maybe } from "monet";

const TRIANGULAR_ANTIPRISM = {
  name: "Triangular Antiprism (Octahedron)",
  category: ["Antiprism"],
  vertex: [
    [0, 0, 1.414214],
    [1.414214, 0, 0],
    [0, 1.414214, 0],
    [-1.414214, 0, 0],
    [0, -1.414214, 0],
    [0, 0, -1.414214]
  ],
  face: [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 1],
    [1, 4, 5],
    [1, 5, 2],
    [2, 5, 3],
    [3, 5, 4]
  ]
};

class KeyPoint extends NodeItem {
  constructor(mesh, keyValueMap) {
    super(mesh, keyValueMap);
  }

  getType = () => KeyPoint.TYPE;

  static TYPE = "KeyPoint";

  static ofDict(scene, dict = null, mainView = null) {
    const name = Maybe.fromNull(dict)
      .map(x => x.name)
      .orSome(`KeyPoint${Math.floor(Math.random() * 1e3)}`);

    const mesh = BABYLON.MeshBuilder.CreatePolyhedron(
      name,
      { custom: TRIANGULAR_ANTIPRISM, size: KeyPoint.DEFAULT_SIZE },
      scene
    );
    const material = new BABYLON.StandardMaterial(
      `KeyPointMaterial${name}`,
      scene
    );
    mesh.material = material;
    mesh.convertToFlatShadedMesh();

    const axis = Util3d.referentialBuilder(scene)
      .isPickable(false)
      .boxParams({ isVisible: false, size: 0.1 * KeyPoint.DEFAULT_SIZE })
      .name(`${name}Axis`)
      .build();
    axis.parent = mesh;

    NodeItem.mapDict2Mesh(dict, mesh);
    return new KeyPoint(mesh, dict.keyValueMap);
  }

  static DEFAULT_SIZE = 0.25;
}

export default KeyPoint;
