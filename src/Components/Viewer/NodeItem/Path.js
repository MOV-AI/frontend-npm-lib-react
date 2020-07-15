import NodeItem from "./NodeItem";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import React from "react";
import { Maybe } from "monet";
import Constants from "../Utils/Constants";
import {
  Observable,
  Color3,
  MeshBuilder,
  Quaternion,
  Vector3
} from "@babylonjs/core";

const RADIUS = Constants.RADIUS;

class Path extends NodeItem {
  /**
   * @param {*} mesh
   * @param {*} localPath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} keyPoints: are the keyPoints meshes array
   * @param {*} splinePath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   */
  constructor(mesh, localPath, keyPoints, splinePath, keyValueMap = {}) {
    super(mesh, keyValueMap);
    // Array<Vector3> points in relation to its mean
    this.localPath = localPath;
    // Array<Meshes> representing key points of the curve
    this.keyPoints = keyPoints;
    // spline points from local path
    this.splinePath = splinePath;
    this.selectedKeyPointIndex = -1;
  }

  toDict() {
    const dict = super.toDict();
    dict.localPath = this.localPath;
    dict.splinePath = this.splinePath;
    return dict;
  }

  toForm() {
    const schema = super.toForm();
    if (this.selectedKeyPointIndex >= 0) {
      schema.jsonSchema.properties["selectedKeyPoint"] = {
        type: "object",
        title: `KeyPoint ${this.selectedKeyPointIndex}`,
        properties: {
          x: {
            type: "number",
            title: "x"
          },
          y: {
            type: "number",
            title: "y"
          },
          z: {
            type: "number",
            title: "z"
          }
        }
      };

      schema.uiSchema["selectedKeyPoint"] = {
        "ui:widget": "collapse"
      };
      schema.uiSchema["position"] = { "ui:widget": "hidden" };
      schema.uiSchema["quaternion"] = { "ui:widget": "hidden" };
      schema.uiSchema["color"] = { "ui:widget": "hidden" };
      schema.uiSchema["annotations"] = { "ui:widget": "hidden" };
      const selectedMesh = this.keyPoints[this.selectedKeyPointIndex];
      const position = Util3d.getWorldCoordinates(
        selectedMesh,
        selectedMesh.position
      ).toArray();
      schema.data["selectedKeyPoint"] = {
        x: position[0],
        y: position[1],
        z: position[2]
      };
      return schema;
    }
    return schema;
  }

  ofForm(form) {
    super.ofForm(form);
    if (this.selectedKeyPointIndex >= 0) {
      const selectedKeyPoint = this.keyPoints[this.selectedKeyPointIndex];
      const formPosition = form.selectedKeyPoint;
      const newPosInWorldCoordinates = Vector3.FromArray(
        [formPosition.x, formPosition.y, formPosition.z].map(Number.parseFloat)
      );
      const localPos = Util3d.getLocalCoordinatesFromWorld(
        selectedKeyPoint,
        newPosInWorldCoordinates
      ).toArray();
      selectedKeyPoint.position = new Vector3(
        localPos[0],
        localPos[1],
        localPos[2]
      );
      selectedKeyPoint.observers.notifyObservers({
        updatedPointMesh: selectedKeyPoint,
        is2updateServer: false
      });
    }
  }

  ofDict(scene, dict = null, mainView = null) {
    return Path.ofDict(scene, dict, mainView);
  }

  getType = () => Path.TYPE;

  static TYPE = "Path";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict || !mainView)
      throw "null dictionary describing path or null mainView";

    const name = dict.name;
    const curve = dict.localPath.map(z => Vec3.of(z).toBabylon());
    const spline = Util3d.getSplineFromCurve(curve);
    const { points } = spline;
    let mesh = null;
    //hack
    if (points.length === 1) {
      mesh = MeshBuilder.CreateLines(
        name,
        { points: points, updatable: true },
        scene
      );
    } else {
      mesh = Util3d.createTubeFromPoints(
        scene,
        points,
        Color3.Gray(),
        RADIUS / 8,
        name
      );
    }
    mesh.position = Vec3.of(dict.position).toBabylon();
    mesh.material = Util3d.getMaterialFromColor(
      Color3.FromArray(dict.color),
      scene,
      `PathMaterial${name}`
    );
    mesh.rotationQuaternion = Maybe.fromNull(dict.quaternion)
      .map(quaternion =>
        new Quaternion(
          quaternion[1],
          quaternion[2],
          quaternion[3],
          quaternion[0]
        ).normalize()
      )
      .orSome(Quaternion.Identity());
    const splinePath = Util3d.splineObj2redis(spline);
    const keyPoints = createPlaceHolderKeyPoints(
      scene,
      { ...dict, mesh, splinePath },
      mainView
    );

    const path2return = new Path(
      mesh,
      curve.map(point => [point.x, point.y, point.z]),
      keyPoints,
      splinePath,
      dict.keyValueMap
    );
    mesh.onClick = getMeshOnClick(mainView, path2return);
    return path2return;
  }
}

export default Path;

const getMeshOnClick = (mainView, nodeItem) => () => {
  mainView.closeContextDial();
  mainView
    .getNodeFromTree(nodeItem.name)
    .forEach(node => (node.item.selectedKeyPointIndex = -1));
};

function defaultKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when keypoint is updated
  const childrenCopy = [...oldMesh._children];
  const spline = item.splinePath.map(z => new Vector3(z[0], z[1], 0));
  childrenCopy.forEach(c => {
    c.parent = item.mesh;
  });
  return item.keyPoints.map((k, i) => {
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
  oldMesh,
  item,
  mainView,
  keyPointUpdateFunction = defaultKeyPointUpdate
) {
  const average = Util3d.pointAverage(newPoints);
  newPoints = newPoints.map(x => x.subtract(average));

  const spline = Util3d.getSplineFromCurve(newPoints);
  // const newMesh = MeshBuilder.CreateLines(
  //   oldMesh.name,
  //   { points: spline.points, updatable: true },
  //   scene
  // );

  const newMesh = Util3d.createTubeFromPoints(
    scene,
    spline.points,
    Color3.Gray(),
    RADIUS / 8,
    oldMesh.name
  );

  newMesh.position = oldMesh.position;
  newMesh.rotationQuaternion = oldMesh.rotationQuaternion;
  newMesh.locallyTranslate(average);
  newMesh.material = oldMesh.material;
  newMesh.visibility = oldMesh.visibility;
  newMesh.parent = oldMesh.parent;
  newMesh.onClick = oldMesh.onClick;

  item.localPath = newPoints.map(x => Vec3.ofBabylon(x).toArray());
  item.splinePath = Util3d.splineObj2redis(spline);
  item.mesh = newMesh;

  item.keyPoints = keyPointUpdateFunction(scene, mainView, oldMesh, item);

  oldMesh.dispose();
  return newPoints;
}

const getKeyPointObserverFunction = (scene, mainView) => {
  return ({ updatedPointMesh, is2updateServer }) => {
    if (!updatedPointMesh.parent) return;
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

        if (index > 0 && index < newPoints.length - 1) {
          // we know by construction that this keyPoint has children
          mainView.highlightMeshInScene([item.keyPoints[index]._children[0]]);
        }

        if (is2updateServer) {
          mainView.updateNodeInServer(mesh.name);
          mainView.getNodeFromTree(mesh.name).forEach(node => {
            node.item.selectedKeyPointIndex = index;
            mainView.setProperties(node.item.toForm());
          });
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
        oldPoints[0].scale(3).subtract(oldPoints[1]).scale(0.5)
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
        icon: props => <i className="fas fa-trash" {...props}></i>,
        action: parentView => {
          deleteKeyPoint(scene, keyPointMesh, parentView);
          parentView.closeContextDial();
        },
        name: "Delete node [DEL]"
      });
    }

    actions.push({
      icon: props => <i className="fas fa-less-than" {...props}></i>,
      action: parentView => {
        addKeyPointInBetween(scene, keyPointMesh, parentView, -1);
        parentView.closeContextDial();
      },
      name: "Add previous"
    });

    actions.push({
      icon: props => <i className="fas fa-greater-than" {...props}></i>,
      action: parentView => {
        addKeyPointInBetween(scene, keyPointMesh, parentView, 1);
        parentView.closeContextDial();
      },
      name: "Add next"
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

    const keyPoint = i === 0 || i === curve.length - 1 ? sphere() : cone();
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

function getConeMesh(scene, color, curveMesh, i, spline, p) {
  return () => {
    const index = spline
      .map(z => p.subtract(z).length())
      .reduce((e, x, i) => (e.value < x ? e : { value: x, index: i }), {
        value: Number.MAX_VALUE,
        index: -1
      }).index;
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
