import NodeItem from "./NodeItem";
import Vec3 from "../Math/Vec3";
import * as BABYLON from "babylonjs";
import { Maybe } from "monet";
import Util3d from "../Util3d/Util3d";
import Constants from "../Utils/Constants";

const RADIUS = Constants.RADIUS;
const FACES = [
  [0, 1, 2],
  [2, 3, 0],
  [4, 6, 5],
  [6, 4, 7],
  [0, 5, 1],
  [5, 0, 4],
  [3, 2, 6],
  [6, 7, 3],
  [1, 6, 2],
  [6, 1, 5],
  [0, 3, 7],
  [7, 4, 0]
];

function createWallMesh(dict, name, scene) {
  const centeredWall = dict.localWall.map(x => Vec3.of(x).toBabylon());
  const middlePoint = Vec3.of(dict.position).toBabylon();
  const tangent = centeredWall[1].subtract(centeredWall[0]).normalize();
  const normal = new BABYLON.Vector3(-tangent.y, tangent.x, 0);
  const shape = [
    centeredWall[0].add(normal.scale(dict.size.width)),
    centeredWall[0].subtract(normal.scale(dict.size.width)),
    centeredWall[1].subtract(normal.scale(dict.size.width)),
    centeredWall[1].add(normal.scale(dict.size.width))
  ];
  const h = new BABYLON.Vector3(0, 0, dict.size.height);
  const wallMesh = {
    positions: [
      shape[0],
      shape[1],
      shape[2],
      shape[3],
      shape[0].add(h),
      shape[1].add(h),
      shape[2].add(h),
      shape[3].add(h)
    ],
    faces: FACES
  };
  const mesh = Util3d.meshFromPositionAndFaces(
    name,
    scene,
    wallMesh.positions,
    wallMesh.faces
  );
  mesh.position = middlePoint;
  return mesh;
}

function createNewMeshFromOldUsingNewPoints(newWall, scene, mesh, item) {
  const average = Util3d.pointAverageVec3(
    newWall.localWall.map(x => Vec3.of(x))
  );
  newWall.position = average.toArray();
  newWall.localWall = newWall.localWall.map(x =>
    Vec3.of(x)
      .sub(average)
      .toArray()
  );

  const newMesh = createWallMesh(newWall, mesh.name, scene);
  newMesh.position = mesh.position;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.locallyTranslate(average.toBabylon());
  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.parent = mesh.parent;

  item.mesh = newMesh;
  item.localWall = newWall.localWall;

  const childrenCopy = [...mesh._children];
  childrenCopy.forEach(c => {
    mesh.removeChild(c);
    c.parent = newMesh;
  });
  item.keyPoints.forEach((k, j) => {
    k.position = Vec3.of(newWall.localWall[j]).toBabylon();
  });
  // dispose old mesh
  mesh.dispose();
}

const getKeyPointObserverFunction = (mainView, scene) => {
  return ({ updatedPointMesh, is2updateServer }) => {
    mainView.getNodeFromTree(updatedPointMesh.parent.name).forEach(wallNode => {
      const index = updatedPointMesh.index;
      const item = wallNode.item;
      const mesh = item.mesh;
      let newWall = {
        position: Vec3.ofBabylon(mesh.position).toArray(),
        localWall: item.localWall,
        size: item.size
      };
      newWall.localWall[index] = Vec3.ofBabylon(
        updatedPointMesh.position
      ).toArray();

      createNewMeshFromOldUsingNewPoints(newWall, scene, mesh, item);

      if (is2updateServer) {
        mainView.updateNodeInServer(mesh.name);
      }
    });
  };
};

const createPlaceHolderKeyPoints = (scene, wall, wallMesh, mainView) => {
  const keyPoints = [];
  wall.forEach((p, i) => {
    const keyPoint = Util3d.createSphere(
      scene,
      new BABYLON.Color3(0.25, 0.25, 0.25),
      RADIUS,
      `${wallMesh.name}keyPointWall${i}`,
      true
    );
    keyPoint.parent = wallMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new BABYLON.Observable();
    keyPoint.observers.add(getKeyPointObserverFunction(mainView, scene));
    keyPoints.push(keyPoint);
  });
  return keyPoints;
};

class Wall extends NodeItem {
  constructor(mesh, localWall, size, keyPoints = {}, keyValueMap = {}) {
    super(mesh, keyValueMap);
    this.localWall = localWall;
    this.size = size;
    this.keyPoints = keyPoints;
  }

  toDict() {
    const dict = super.toDict();
    dict.localWall = this.localWall;
    dict.size = this.size;
    return dict;
  }

  getType = () => Wall.TYPE;

  static TYPE = "Wall";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict) throw "null dictionary describing wall";
    const name = Maybe.fromNull(dict.name).orSome(
      `Wall${Math.floor(Math.random() * 1e3)}`
    );
    const mesh = createWallMesh(dict, name, scene);

    const material = new BABYLON.StandardMaterial(`WallMaterial${name}`, scene);
    const color = new BABYLON.Color3(
      dict.color[0],
      dict.color[1],
      dict.color[2]
    );
    material.diffuseColor = color;
    material.emissiveColor = color;
    mesh.material = material;
    // babylonjs highlight shader flickers when floor intersect
    mesh.position.z += 1e-3;

    const keypoints = createPlaceHolderKeyPoints(
      scene,
      dict.localWall.map(x => Vec3.of(x).toBabylon()),
      mesh,
      mainView
    );
    return new Wall(
      mesh,
      dict.localWall,
      dict.size,
      keypoints,
      dict.keyValueMap
    );
  }
}

export default Wall;
