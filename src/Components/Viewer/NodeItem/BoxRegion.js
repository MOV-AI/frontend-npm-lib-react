import NodeItem from "./NodeItem";
import * as BABYLON from "babylonjs";
import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import Constants from "../Utils/Constants";

const RADIUS = Constants.RADIUS;
const FACES = [
  [0, 1, 2],
  [2, 3, 0],
  [4, 5, 6],
  [6, 7, 4],
  [0, 1, 5],
  [5, 4, 0],
  [3, 2, 6],
  [6, 7, 3],
  [1, 2, 6],
  [6, 5, 1],
  [0, 3, 7],
  [7, 4, 0]
];

/**
 * @param boxRegion: {position: 3-array, corners: array of 3-arrays }
 */
function createBoxRegionMesh(boxRegion, name, scene) {
  // centered corners vec
  const corners = boxRegion.corners.map(x => Vec3.of(x).toBabylon());
  const d = corners[1].subtract(corners[0]);
  const middlePoint = Vec3.of(boxRegion.position).toBabylon();
  const shape = [
    corners[0],
    corners[0].add(BABYLON.Axis.X.scale(d.x)),
    corners[0].add(new BABYLON.Vector3(d.x, d.y, 0)),
    corners[0].add(BABYLON.Axis.Y.scale(d.y))
  ];
  const h = new BABYLON.Vector3(0, 0, d.z);
  const boxRegionMesh = {
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
    boxRegionMesh.positions,
    boxRegionMesh.faces
  );
  mesh.position = middlePoint;
  return mesh;
}

function createNewMeshFromOldUsingNewBox(newBox, scene, mesh, item) {
  const average = Util3d.pointAverageVec3(newBox.corners.map(x => Vec3.of(x)));
  newBox.position = average.toArray();
  newBox.corners = newBox.corners.map(x =>
    Vec3.of(x)
      .sub(average)
      .toArray()
  );

  const newMesh = createBoxRegionMesh(newBox, mesh.name, scene);
  newMesh.position = mesh.position;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.locallyTranslate(average.toBabylon());
  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.parent = mesh.parent;

  item.mesh = newMesh;
  item.corners = newBox.corners;

  const childrenCopy = [...mesh._children];
  childrenCopy.forEach(c => {
    mesh.removeChild(c);
    c.parent = newMesh;
  });
  item.keyPoints.forEach((k, j) => {
    k.position = Vec3.of(newBox.corners[j]).toBabylon();
  });
  // dispose old mesh
  mesh.dispose();
}

const getKeyPointObserverFunction = (mainView, scene) => {
  return ({ updatedPointMesh, is2updateServer }) => {
    mainView
      .getNodeFromTree(updatedPointMesh.parent.name)
      .forEach(boxRegionTreeNode => {
        const index = updatedPointMesh.index;
        const item = boxRegionTreeNode.item;
        const mesh = item.mesh;
        const name = mesh.name;

        let newBox = {
          position: Vec3.ofBabylon(mesh.position).toArray(),
          corners: item.corners
        };
        newBox.corners[index] = Vec3.ofBabylon(
          updatedPointMesh.position
        ).toArray();

        createNewMeshFromOldUsingNewBox(newBox, scene, mesh, item);

        if (is2updateServer) {
          mainView.updateNodeInServer(name);
        }
      });
  };
};

const createPlaceHolderKeyPoints = (
  scene,
  corners,
  boxRegionMesh,
  mainView
) => {
  const keyPoints = [];
  corners.forEach((corner, i) => {
    const p = corner;

    const keyPoint = Util3d.createSphere(
      scene,
      new BABYLON.Color3(0.25, 0.25, 0.25),
      RADIUS,
      `${boxRegionMesh.name}keyPoint${i}`,
      true
    );

    keyPoint.parent = boxRegionMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new BABYLON.Observable();
    keyPoint.observers.add(getKeyPointObserverFunction(mainView, scene));
    keyPoints.push(keyPoint);
  });
  return keyPoints;
};

class BoxRegion extends NodeItem {
  constructor(mesh, corners, keyPoints, keyValueMap = {}) {
    super(mesh, keyValueMap);
    this.corners = corners;
    this.keyPoints = keyPoints;
  }

  toDict() {
    const dict = super.toDict();
    dict.corners = this.corners;
    return dict;
  }

  getType = () => BoxRegion.TYPE;

  static TYPE = "BoxRegion";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict) throw "null dictionary describing Box region";
    const name = Maybe.fromNull(dict.name).orSome(
      `BoxRegion${Math.floor(Math.random() * 1e3)}`
    );
    const mesh = createBoxRegionMesh(dict, name, scene);

    const material = new BABYLON.StandardMaterial(
      `BoxRegionMaterial${name}`,
      scene
    );
    const color = new BABYLON.Color3(
      dict.color[0],
      dict.color[1],
      dict.color[2]
    );
    material.diffuseColor = color;
    material.emissiveColor = color;
    material.backFaceCulling = false;
    mesh.material = material;

    mesh.visibility = 0.25;

    Maybe.fromNull(dict.quaternion).forEach(quaternion => {
      const babylonQuaternion = new BABYLON.Quaternion(
        quaternion[1],
        quaternion[2],
        quaternion[3],
        quaternion[0]
      );
      mesh.rotationQuaternion = babylonQuaternion.normalize();
    });

    const keypoints = createPlaceHolderKeyPoints(
      scene,
      dict.corners.map(x => Vec3.of(x).toBabylon()),
      mesh,
      mainView
    );
    return new BoxRegion(mesh, dict.corners, keypoints, dict.keyValueMap);
  }
}

export default BoxRegion;
