import NodeItem from "./NodeItem";
import Vec3 from "../Math/Vec3";
import * as BABYLON from "babylonjs";
import Util3d from "../Util3d/Util3d";
import { Maybe } from "monet";
import React from "react";
import { positiveMod } from "../../_shared/Utils/Utils";
import Constants from "../Utils/Constants";

const RADIUS = Constants.RADIUS;

/**
 *
 * @param {*} polygon: boundary as babylonjs vec3
 */
const stitchingBoundaries = polygon => {
  const n = polygon.length;
  const orientation = Util3d.computeOrientation(polygon);
  const ans = [];
  for (let i = 0; i < n; i++) {
    const modi = (i + 1) % n;
    ans.push([i, n + modi, modi]);
    ans.push([i, n + i, n + modi]);
  }
  return orientation > 0 ? ans : ans.map(reverseOrientation);
};

const reverseOrientation = triangleIndice => {
  const ans = [];
  ans.push(triangleIndice[1]);
  ans.push(triangleIndice[0]);
  ans.push(triangleIndice[2]);
  return ans;
};

/**
 *
 * @param {*} scene
 * @param {*} polygon array of babylon js vector3
 * @param {*} height
 * @param {*} name
 */
const createExtrudedPolygonMesh = (scene, polygon, height, name) => {
  const h = new BABYLON.Vector3(0, 0, height);
  const polygonRegionMesh = {
    positions: [],
    faces: []
  };

  polygonRegionMesh.positions = [...polygon];
  for (let i = 0; i < polygon.length; i++) {
    polygonRegionMesh.positions.push(polygon[i].add(h));
  }

  const n = polygon.length;
  const lowerTriangulation = Util3d.triangulatePolygon(polygon);
  const upperTriangulation = Util3d.triangulatePolygon(
    polygonRegionMesh.positions.slice(n)
  )
    .map(x => x.map(z => z + n))
    .map(reverseOrientation);

  const stitchTriangulation = stitchingBoundaries(polygon);

  polygonRegionMesh.faces = lowerTriangulation
    .concat(upperTriangulation)
    .concat(stitchTriangulation);

  const mesh = Util3d.meshFromPositionAndFaces(
    name,
    scene,
    polygonRegionMesh.positions,
    polygonRegionMesh.faces
  );
  return mesh;
};

function defaultKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when keypoint is updated or deleted
  const childrenCopy = [...oldMesh._children];
  childrenCopy.forEach(c => {
    oldMesh.removeChild(c);
    c.parent = item.mesh;
  });

  return item.keyPoints.map((k, i) => {
    k.observers = new BABYLON.Observable();
    k.observers.add(getKeyPointObserverFunction(scene, mainView));
    k.index = i;
    k.name = `${oldMesh.name}keyPoint${i}`;
    k.position = Vec3.of(item.localPolygon[i]).toBabylon();
    return k;
  });
}

function createNewMeshFromOldUsingNewPoints(
  newPoints,
  scene,
  mesh,
  item,
  mainView,
  keyPointUpdateFunction = defaultKeyPointUpdate
) {
  const average = Util3d.pointAverage(newPoints);
  newPoints = newPoints.map(x => x.subtract(average));
  // update mesh
  const newMesh = createExtrudedPolygonMesh(
    scene,
    newPoints,
    item.height,
    mesh.name
  );
  newMesh.position = mesh.position;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.locallyTranslate(average);
  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.parent = mesh.parent;

  item.localPolygon = newPoints.map(x => Vec3.ofBabylon(x).toArray());
  item.mesh = newMesh;

  item.keyPoints = keyPointUpdateFunction(scene, mainView, mesh, item);
  // dispose old mesh
  mesh.dispose();
  return newPoints;
}

const getKeyPointObserverFunction = (scene, mainView) => {
  return ({ updatedPointMesh, is2updateServer }) => {
    mainView
      .getNodeFromTree(updatedPointMesh.parent.name)
      .forEach(polygonTreeNode => {
        const index = updatedPointMesh.index;
        const item = polygonTreeNode.item;
        const mesh = item.mesh;
        const name = mesh.name;
        let newPoints = item.localPolygon.map(x => Vec3.of(x).toBabylon());
        newPoints[index] = updatedPointMesh.position;
        createNewMeshFromOldUsingNewPoints(
          newPoints,
          scene,
          mesh,
          item,
          mainView
        );

        if (is2updateServer) {
          mainView.updateNodeInServer(name);
        }
      });
  };
};

function onAddNewPointKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when new keypoint is added
  return createPlaceHolderKeyPoints(
    scene,
    item.localPolygon.map(x => Vec3.of(x).toBabylon()),
    item.mesh,
    mainView
  );
}

/**
 *
 * @param {*} scene
 * @param {*} keyPointMesh
 * @param {*} curveMesh
 * @param {*} mainView
 * @param {*} orientation: it belongs to the set {-1,1}, represents orientation
 */
const addKeyPointInBetween = (scene, keyPointMesh, mainView, orientation) => {
  const index = keyPointMesh.index;
  const name = keyPointMesh.parent.name;
  mainView.getNodeFromTree(name).forEach(pathTreeNode => {
    const item = pathTreeNode.item;
    const numberOfPoints = item.localPolygon.length;
    const nextIndex = positiveMod(index + orientation, numberOfPoints);
    const mesh = item.mesh;
    const oldPoints = item.localPolygon.map(x => Vec3.of(x).toBabylon());

    let newPoints = [];
    const specialIndex = index + Math.max(0, orientation);

    for (let i = 0; i < specialIndex; i++) {
      newPoints.push(oldPoints[i]);
    }

    newPoints.push(oldPoints[nextIndex].add(oldPoints[index]).scale(0.5));

    for (let i = specialIndex; i < numberOfPoints; i++) {
      newPoints.push(oldPoints[i]);
    }

    createNewMeshFromOldUsingNewPoints(
      newPoints,
      scene,
      mesh,
      item,
      mainView,
      onAddNewPointKeyPointUpdate
    );

    // mainView.updateNodeInServer(name);
  });
};

const deleteKeyPoint = (scene, keyPointMesh, mainView) => {
  const index = keyPointMesh.index;
  const name = keyPointMesh.parent.name;
  mainView.getNodeFromTree(name).forEach(pathTreeNode => {
    const item = pathTreeNode.item;
    const mesh = item.mesh;

    let newPoints = item.localPolygon.map(x => Vec3.of(x).toBabylon());

    newPoints.splice(index, 1);
    item.keyPoints.splice(index, 1)[0].dispose();

    createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView);

    mainView.updateNodeInServer(name);
  });
};

const getKeyPointActions = (scene, keyPointMesh, mainView) => {
  const actions = [];

  mainView.getNodeFromTree(keyPointMesh.parent.name).forEach(pathTreeNode => {
    const item = pathTreeNode.item;
    const polygon = item.localPolygon;

    if (polygon.length > 3) {
      actions.push({
        icon: props => <i className="fas fa-times" {...props}></i>,
        action: parentView => {
          deleteKeyPoint(scene, keyPointMesh, parentView);
          parentView.closeContextDial();
        },
        name: "Delete node"
      });
    }

    actions.push({
      icon: props => <i className="fas fa-greater-than" {...props}></i>,
      action: parentView => {
        addKeyPointInBetween(scene, keyPointMesh, parentView, 1);
        parentView.closeContextDial();
      },
      name: "Add next"
    });

    actions.push({
      icon: props => <i className="fas fa-less-than" {...props}></i>,
      action: parentView => {
        addKeyPointInBetween(scene, keyPointMesh, parentView, -1);
        parentView.closeContextDial();
      },
      name: "Add previous"
    });
  });

  return actions;
};

const createPlaceHolderKeyPoints = (scene, polygon, polygonMesh, mainView) => {
  const keyPoints = [];
  polygon.forEach((p, i) => {
    const color = new BABYLON.Color3(0.25, 0.25, 0.25);
    const keyPoint = Util3d.createSphere(
      scene,
      color,
      RADIUS,
      `${polygonMesh.name}keyPointPolygon${i}`,
      true
    );
    keyPoint.parent = polygonMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new BABYLON.Observable();

    keyPoints.push(keyPoint);

    keyPoint.observers.add(getKeyPointObserverFunction(scene, mainView));
  });

  keyPoints.forEach(x => {
    x.onClick = () => {
      mainView.setContextActions(getKeyPointActions(scene, x, mainView));
    };
  });

  return keyPoints;
};

class PolygonRegion extends NodeItem {
  /**
   * @param {*} mesh
   * @param {*} localPolygon: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} keyPoints: are the keyPoints meshes array
   */
  constructor(mesh, localPolygon, height, keyPoints, keyValueMap = {}) {
    super(mesh, keyValueMap);
    this.localPolygon = localPolygon;
    this.height = height;
    this.keyPoints = keyPoints;
  }

  toDict() {
    const dict = super.toDict();
    dict.localPolygon = this.localPolygon;
    dict.height = this.height;
    return dict;
  }

  getType = () => PolygonRegion.TYPE;

  static TYPE = "PolygonRegion";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict || !mainView)
      throw "null dictionary describing polygon or null mainView";

    const polygon = dict.localPolygon.map(z => Vec3.of(z).toBabylon());
    const middlePoint = Vec3.of(dict.position).toBabylon();

    const mesh = createExtrudedPolygonMesh(
      scene,
      polygon,
      dict.height,
      dict.name
    );
    mesh.position = middlePoint;

    const material = new BABYLON.StandardMaterial(
      `PolygonMaterial${dict.name}`,
      scene
    );
    const color = new BABYLON.Color3(
      dict.color[0],
      dict.color[1],
      dict.color[2]
    );
    material.diffuseColor = color;
    material.emissiveColor = color;
    mesh.material = material;
    mesh.visibility = 0.5;
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
      polygon,
      mesh,
      mainView
    );

    return new PolygonRegion(
      mesh,
      polygon.map(point => [point.x, point.y, point.z]),
      dict.height,
      keypoints,
      dict.keyValueMap
    );
  }
}

export default PolygonRegion;
