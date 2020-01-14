import NodeItem from "./NodeItem";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import React from "react";
import { Maybe } from "monet";
import Constants from "../Utils/Constants";
import {
  Curve3,
  Observable,
  Color3,
  MeshBuilder,
  StandardMaterial,
  Quaternion,
  Vector3
} from "babylonjs";

const RADIUS = Constants.RADIUS;
const POINTS_DENSITY = 2;

const piecewiseCurveDistance = curve => {
  let distance = 0;
  for (let i = 0; i < curve.length - 1; i++) {
    const v = curve[i + 1].subtract(curve[i]);
    distance += v.length();
  }
  return distance;
};

const getCurveOrientations = curve => {
  const orientations = [];
  for (let i = 0; i < curve.length - 1; i++) {
    const v = curve[i + 1].subtract(curve[i]);
    orientations.push(Math.atan2(v.y, v.x));
  }
  orientations.push(orientations[orientations.length - 1]);
  return orientations;
};

const getSplineFromCurve = curve => {
  const distance = piecewiseCurveDistance(curve);
  const nbPoints = Math.ceil(distance * POINTS_DENSITY);
  const closed = false;
  return {
    points: Curve3.CreateCatmullRomSpline(curve, nbPoints, closed).getPoints()
  };
};

const splineObj2redis = splineObj => {
  const orientations = getCurveOrientations(splineObj.points);
  return splineObj.points.map((x, i) => {
    return [x.x, x.y, orientations[i]];
  });
};

function defaultKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when keypoint is updated
  const childrenCopy = [...oldMesh._children];
  const spline = item.splinePath.map(z => new Vector3(z[0], z[1], 0));
  childrenCopy.forEach(c => {
    c.parent = item.mesh;
  });
  return item.keyPoints.map((k, i) => {
    k.observers = new Observable();
    k.observers.add(getKeyPointObserverFunction(scene, mainView));
    k.index = i;
    k.name = `${oldMesh.name}keyPointSpline${i}`;
    k.position = Vec3.of(item.localPath[i]).toBabylon();
    k.rotationQuaternion = Quaternion.Identity();
    if (i > 0 && i < item.keyPoints.length - 1) {
      k._children.forEach(kChild => kChild.dispose());
      const c = getConeMesh(
        scene,
        k.material.diffuseColor,
        item.mesh,
        i,
        spline,
        k.position
      )();
      c.parent = k;
    }
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
  console.log(`Old average ${mesh.position}, average ${average}`)
  newPoints = newPoints.map(x => x.subtract(average));

  const spline = getSplineFromCurve(newPoints);
  const newMesh = MeshBuilder.CreateLines(
    mesh.name,
    { points: spline.points, updatable: true },
    scene
  );

  newMesh.position = mesh.position;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.locallyTranslate(average);
  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.parent = mesh.parent;

  item.localPath = newPoints.map(x => Vec3.ofBabylon(x).toArray());
  item.splinePath = splineObj2redis(spline);
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
      .forEach(pathTreeNode => {
        const index = updatedPointMesh.index;
        const item = pathTreeNode.item;
        const mesh = item.mesh;
        let newPoints = item.localPath.map(x => Vec3.of(x).toBabylon());
        newPoints[index] = updatedPointMesh.position;

        createNewMeshFromOldUsingNewPoints(
          newPoints,
          scene,
          mesh,
          item,
          mainView
        );

        if (is2updateServer) {
          mainView.updateNodeInServer(mesh.name);
        }
      });
  };
};

const deleteKeyPoint = (scene, keyPointMesh, mainView) => {
  const index = keyPointMesh.index;
  const name = keyPointMesh.parent.name;
  mainView.getNodeFromTree(name).forEach(pathTreeNode => {
    const item = pathTreeNode.item;
    const mesh = item.mesh;

    let newPoints = item.localPath.map(x => Vec3.of(x).toBabylon());

    newPoints.splice(index, 1);
    item.keyPoints.splice(index, 1)[0].dispose();

    createNewMeshFromOldUsingNewPoints(
      newPoints,
      scene,
      mesh,
      item,
      mainView,
      onAddNewPointKeyPointUpdate
    );

    mainView.updateNodeInServer(name);
  });
};

function onAddNewPointKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when new keypoint is added
  return createPlaceHolderKeyPoints(scene, item, mainView);
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
    const nextIndex = index + orientation;
    const item = pathTreeNode.item;
    const numberOfPoints = item.localPath.length;
    const mesh = item.mesh;
    let newPoints = [];
    const oldPoints = item.localPath.map(x => Vec3.of(x).toBabylon());

    if (nextIndex < 0) {
      newPoints = [
        oldPoints[0]
          .scale(3)
          .subtract(oldPoints[1])
          .scale(0.5)
      ].concat(oldPoints);
    } else if (nextIndex > numberOfPoints - 1) {
      newPoints = oldPoints.concat([
        oldPoints[numberOfPoints - 1]
          .scale(3)
          .subtract(oldPoints[numberOfPoints - 2])
          .scale(0.5)
      ]);
    } else {
      const specialIndex = index + Math.max(0, orientation);
      for (let i = 0; i < specialIndex; i++) {
        newPoints.push(oldPoints[i]);
      }
      newPoints.push(oldPoints[nextIndex].add(oldPoints[index]).scale(0.5));
      for (let i = specialIndex; i < numberOfPoints; i++) {
        newPoints.push(oldPoints[i]);
      }
    }

    createNewMeshFromOldUsingNewPoints(
      newPoints,
      scene,
      mesh,
      item,
      mainView,
      onAddNewPointKeyPointUpdate
    );

    mainView.updateNodeInServer(name);
  });
};

const getKeyPointActions = (scene, keyPointMesh, mainView) => {
  const actions = [];

  mainView.getNodeFromTree(keyPointMesh.parent.name).forEach(pathTreeNode => {
    const item = pathTreeNode.item;
    const curve = item.localPath;

    if (curve.length !== 2) {
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

const createPlaceHolderKeyPoints = (scene, item, mainView) => {
  const color = new Color3(0.25, 0.25, 0.25);
  const keyPoints = [];
  const curve = item.localPath.map(z => Vec3.of(z).toBabylon());
  const spline = item.splinePath.map(z => new Vector3(z[0], z[1], 0));
  const curveMesh = item.mesh;
  curve.forEach((p, i) => {
    const sphere = getSphereMesh(scene, color, curveMesh, i);
    const cone = () => {
      const c = getConeMesh(scene, color, curveMesh, i, spline, p)();
      const s = getSphereMesh(scene, color, curveMesh, i)();
      s.visibility = 0.1;
      c.parent = s;
      return s;
    };

    const keyPoint = i == 0 || i == curve.length - 1 ? sphere() : cone();
    keyPoint.parent = curveMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new Observable();

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

class Path extends NodeItem {
  /**
   * @param {*} mesh
   * @param {*} localPath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} keyPoints: are the keyPoints meshes array
   * @param {*} splinePath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   */
  constructor(mesh, localPath, keyPoints, splinePath, keyValueMap = {}) {
    super(mesh, keyValueMap);
    this.localPath = localPath;
    this.keyPoints = keyPoints;
    this.splinePath = splinePath;
  }

  toDict() {
    const dict = super.toDict();
    dict.localPath = this.localPath;
    dict.splinePath = this.splinePath;
    return dict;
  }

  getType = () => Path.TYPE;

  static TYPE = "Path";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict || !mainView)
      throw "null dictionary describing path or null mainView";

    const name = dict.name;
    const curve = dict.localPath.map(z => Vec3.of(z).toBabylon());
    const middlePoint = Vec3.of(dict.position).toBabylon();
    const spline = getSplineFromCurve(curve);

    const mesh = MeshBuilder.CreateLines(
      name,
      { points: spline.points, updatable: true },
      scene
    );
    mesh.position = middlePoint;

    const material = new StandardMaterial(`PathMaterial${name}`, scene);
    const color = new Color3(dict.color[0], dict.color[1], dict.color[2]);
    material.diffuseColor = color;
    material.emissiveColor = color;
    mesh.material = material;
    Maybe.fromNull(dict.quaternion).forEach(quaternion => {
      const babylonQuaternion = new Quaternion(
        quaternion[1],
        quaternion[2],
        quaternion[3],
        quaternion[0]
      );
      mesh.rotationQuaternion = babylonQuaternion.normalize();
    });

    const splinePath = splineObj2redis(spline);
    const keypoints = createPlaceHolderKeyPoints(
      scene,
      { ...dict, mesh, splinePath },
      mainView
    );

    return new Path(
      mesh,
      curve.map(point => [point.x, point.y, point.z]),
      keypoints,
      splinePath,
      dict.keyValueMap
    );
  }
}

export default Path;

function getConeMesh(scene, color, curveMesh, i, spline, p) {
  return () => {
    const index = spline
      .map(z => p.subtract(z).length())
      .findIndex(z => z < 1e-5);
    const u = spline[index + 1]
      .subtract(spline[index])
      .normalize()
      .scale(RADIUS);
    const c = Util3d.createOrientedCone(
      scene,
      u,
      color,
      `${curveMesh.name}keyPointCone${i}`,
      false
    );
    return c;
  };
}

function getSphereMesh(scene, color, curveMesh, i) {
  return () =>
    Util3d.createSphere(
      scene,
      color,
      RADIUS,
      `${curveMesh.name}keyPointSpline${i}`,
      true
    );
}
