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
import { UndoManager } from "mov-fe-lib-core";

const RADIUS = Constants.RADIUS;

class Path extends NodeItem {
  /**
   * @param {*} mesh
   * @param {*} localPath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} keyPoints: are the keyPoints meshes array
   * @param {*} splinePath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} mainView: MainView
   * @param {*} keyValueMap: annotations
   */
  constructor(
    mesh,
    localPath,
    keyPoints,
    splinePath,
    mainView,
    weight = 1,
    keyValueMap = {}
  ) {
    super(mesh, keyValueMap);
    // Array<Vector3> points in relation to its mean
    this.localPath = localPath;
    // Array<Meshes> representing key points of the curve
    this.keyPoints = keyPoints;
    // spline points from local path
    this.splinePath = splinePath;
    this.selectedKeyPointIndex = -1;
    this.mainView = mainView;
    this.weight = weight;
  }

  toDict() {
    const dict = super.toDict();
    dict.localPath = this.localPath;
    dict.splinePath = this.splinePath;
    dict.weight = this.weight;
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
      const position = Util3d.getGlobalCoordinates(
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
    // re-order attributes
    const props = { ...schema.jsonSchema.properties };
    const newSchema = {
      type: "object",
      properties: {
        oldName: props.oldName,
        name: props.name,
        type: props.type,
        weight: {
          type: "number",
          title: "Weight"
        },
        position: props.position,
        quaternion: props.quaternion,
        color: props.color,
        annotations: props.annotations
      }
    };
    schema.jsonSchema = newSchema;
    schema.data["weight"] = this.weight;
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
      const localPos = Util3d.getLocalCoordFromGlobal(
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
      return;
    }
    this.weight = Number(form.weight);
    this.updatePathEdgeWithForm(this.weight, this.keyValueMap);
  }

  updatePathEdgeWithForm(weight, annotations) {
    this.mainView.getGraph().forEach(({ item: graphItem }) => {
      const { graph } = graphItem;
      const first = this.keyPoints[0];
      const last = this.keyPoints[this.keyPoints.length - 1];
      const edge = [first, last]
        .filter(v => !!v?.graphVertex?.vertex)
        .map(v => v.graphVertex.vertex);
      if (edge.length < 2) return;
      const edgeIds = edge.map(v => v.id);
      graph.getEdge(...edgeIds).forEach(({ data: edgeData }) => {
        edgeData.weight = weight;
        edgeData.keyValueMap = annotations;
      });
      this.mainView.updateNodeInServer(graphItem.name);
    });
  }

  ofDict(scene, dict = null, mainView = null) {
    return Path.ofDict(scene, dict, mainView);
  }

  getCopyFunction(isForceUpdate = true) {
    // mousePosFromRoot : Vector3
    return (mousePosFromRoot, someMainView) => {
      return super
        .getCopyFunction(isForceUpdate)(mousePosFromRoot, someMainView)
        .map(copiedPath => {
          const kp = copiedPath?.keyPoints;
          if (kp !== undefined && isPathOnGraph(this)) {
            Path.updateGraph(someMainView, kp, copiedPath, true);
          }
          return copiedPath;
        });
    };
  }

  getType = () => Path.TYPE;

  static TYPE = "Path";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict || !mainView)
      throw new Error("null dictionary describing path or null mainView");

    const name = dict.name;
    const curve = dict.localPath.map(z => Vec3.of(z).toBabylon());
    const spline = Util3d.getSplineFromCurve(curve);
    const { points } = spline;
    let mesh = null;
    //hack for creating 1 point curves
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
      mainView,
      dict.weight,
      dict.keyValueMap
    );
    mesh.onClick = getMeshOnClick(mainView, path2return);
    mesh.observers = new Observable();
    mesh.observers.add(getMeshObserver(keyPoints));
    return path2return;
  }

  /**
   * Create new mesh from old, has side effects
   *
   * @param {*} newPoints: Vector3
   * @param {*} scene: Scene
   * @param {*} item: PathItem
   * @param {*} mainView: MainView
   * @param {*} keyPointUpdateFunction: (scene, mainView, mesh, item) => Array<Mesh>
   */
  static createNewMeshFromOldUsingNewPoints(
    newPoints,
    scene,
    item,
    mainView,
    keyPointUpdateFunction = defaultKeyPointUpdate
  ) {
    const { mesh: oldMesh } = item;
    const average = Util3d.pointAverage(newPoints);
    newPoints = newPoints.map(x => x.subtract(average));

    const spline = Util3d.getSplineFromCurve(newPoints);
    const newMesh = Util3d.createTubeFromPoints(
      scene,
      spline.points,
      Color3.Gray(),
      RADIUS / 8,
      oldMesh.name
    );

    // average in parent coord
    const rotMat3 = Util3d.getRotationMatrix(oldMesh);
    const scaleVec3 = Vec3.ofBabylon(oldMesh.scaling);
    const averageInParentCoord = rotMat3
      .prodVec(Vec3.ofBabylon(average).mul(scaleVec3))
      .toBabylon();

    newMesh.parent = oldMesh.parent;
    newMesh.rotationQuaternion = oldMesh.rotationQuaternion;
    newMesh.position = averageInParentCoord.add(oldMesh.position);

    newMesh.material = oldMesh.material;
    newMesh.visibility = oldMesh.visibility;
    newMesh.onClick = oldMesh.onClick;
    newMesh.getMouseContextActions = oldMesh.getMouseContextActions;
    newMesh.nodeItem = oldMesh.nodeItem;
    newMesh.observers = oldMesh.observers;
    item.localPath = newPoints.map(x => Vec3.ofBabylon(x).toArray());
    item.splinePath = Util3d.splineObj2redis(spline);
    item.mesh = newMesh;
    const oldKeyPoints = item.keyPoints;
    item.keyPoints = keyPointUpdateFunction(scene, mainView, oldMesh, item);
    // update observer that triggers keypoints observers
    item.mesh.observers.clear();
    item.mesh.observers.add(getMeshObserver(item.keyPoints));

    Path.updateGraph(
      mainView,
      oldKeyPoints,
      item,
      oldKeyPoints.length !== item.keyPoints.length
    );

    oldMesh.dispose();
    return item;
  }

  static deleteKeyPoint(scene, keyPointMesh, mainView) {
    const index = keyPointMesh.index;
    const name = keyPointMesh.parent.name;
    mainView.getNodeFromTree(name).forEach(({ item }) => {
      const { mesh } = item;
      const copyPosition = { ...mesh.position };
      let newPoints = item.localPath.map(x => Vec3.of(x).toBabylon());
      mainView
        .getUndoManager()
        .doIt(
          Path.getUndoDeleteKeyPoint(
            name,
            index,
            copyPosition,
            newPoints,
            scene,
            item,
            mainView
          )
        );
    });
  }

  static getUndoDeleteKeyPoint(
    name,
    index,
    copyPosition,
    newPoints,
    scene,
    item,
    mainView
  ) {
    return UndoManager.actionBuilder()
      .doAction(() => {
        const copyPoints = [...newPoints];
        copyPoints.splice(index, 1);
        Path.createNewMeshFromOldUsingNewPoints(
          copyPoints,
          scene,
          item,
          mainView,
          Path.onAddNewPointKeyPointUpdate
        );
        mainView.updateNodeInServer(name);
      })
      .undoAction(() => {
        const copyPoints = [...newPoints];
        item.mesh.position = copyPosition;
        Path.createNewMeshFromOldUsingNewPoints(
          copyPoints,
          scene,
          item,
          mainView,
          Path.onAddNewPointKeyPointUpdate
        );
        mainView.updateNodeInServer(name);
      })
      .build();
  }

  static onAddNewPointKeyPointUpdate(scene, mainView, oldMesh, item) {
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
  static addKeyPointInBetween(scene, keyPointMesh, mainView, orientation) {
    const index = keyPointMesh.index;
    const name = keyPointMesh.parent.name;
    mainView.getNodeFromTree(name).forEach(({ item }) => {
      const points = item.localPath.map(x => Vec3.of(x).toBabylon());
      const copyPosition = { ...item.mesh.position };
      mainView
        .getUndoManager()
        .doIt(
          Path.getUndoAddKeyPointInBetween(
            name,
            index,
            orientation,
            item,
            points,
            copyPosition,
            scene,
            mainView
          )
        );
    });
  }

  static getUndoAddKeyPointInBetween(
    name,
    index,
    orientation,
    item,
    points,
    copyPosition,
    scene,
    mainView
  ) {
    return UndoManager.actionBuilder()
      .doAction(() => {
        const nextIndex = index + orientation;
        const numberOfPoints = item.localPath.length;
        let newPoints = [];
        const oldPoints = [...points];
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

        Path.createNewMeshFromOldUsingNewPoints(
          newPoints,
          scene,
          item,
          mainView,
          Path.onAddNewPointKeyPointUpdate
        );

        mainView.updateNodeInServer(name);
      })
      .undoAction(() => {
        const copyPoints = [...points];
        item.mesh.position = copyPosition;
        Path.createNewMeshFromOldUsingNewPoints(
          copyPoints,
          scene,
          item,
          mainView,
          Path.onAddNewPointKeyPointUpdate
        );

        mainView.updateNodeInServer(name);
      })
      .build();
  }

  /**
   *
   * @param {*} mainView: MainView
   * @param {*} oldKpMeshes: Mesh
   * @param {*} pathItem: PathItem
   * @param {*} isTopologyChange: boolean
   */
  static updateGraph(mainView, oldKpMeshes, pathItem, isTopologyChange) {
    if (!isTopologyChange) return;
    mainView.getGraph().forEach(({ item: graph }) => {
      //naive algorithm, delete all vertices
      oldKpMeshes.forEach(kp => {
        graph.delVertexFromMesh(kp, false);
      });
      // add final edge
      const keyPoints = pathItem.keyPoints;
      const edgeMeshes = [keyPoints[0], keyPoints[keyPoints.length - 1]];
      graph.addEdge(...edgeMeshes);
      mainView.updateNodeInServer(graph.name);
    });
  }
}

export default Path;

const getMeshOnClick = (mainView, nodeItem) => () => {
  mainView.closeContextDial();
  mainView
    .getNodeFromTree(nodeItem.name)
    .forEach(node => (node.item.selectedKeyPointIndex = -1));
};

const getMeshObserver = keypoints => ({
  updatedPointMesh,
  is2updateServer,
  displacement
}) => {
  keypoints.forEach(k => {
    if (!!k.graphVertex) {
      k.graphVertex.vertexObs({
        updatedPointMesh: k,
        is2updateServer,
        displacement
      });
    }
  });
};

function defaultKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when key point is updated
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
    if (!!oldMesh.graphVertex) k.graphVertex = oldMesh.graphVertex;
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

const getKeyPointObserverFunction = (scene, mainView) => {
  return ({ updatedPointMesh, is2updateServer, displacement }) => {
    if (!updatedPointMesh.parent) return;
    mainView
      .getNodeFromTree(updatedPointMesh.parent.name)
      .forEach(({ item }) => {
        const { index } = updatedPointMesh;
        const { mesh } = item;
        let newPoints = item.localPath.map(x => Vec3.of(x).toBabylon());
        newPoints[index] = updatedPointMesh.position;
        Path.createNewMeshFromOldUsingNewPoints(
          newPoints,
          scene,
          item,
          mainView
        );
        if (index > 0 && index < newPoints.length - 1) {
          // we know by construction that this keyPoint has children
          mainView.highlightMeshesInScene([item.keyPoints[index]._children[0]]);
        }
        if (is2updateServer) {
          mainView.updateNodeInServer(mesh.name);
          mainView.setProperties(item.toForm());
        }
      });
  };
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
          Path.deleteKeyPoint(scene, keyPointMesh, parentView);
          parentView.closeContextDial();
        },
        name: "Delete node [DEL]"
      });
    }

    actions.push({
      icon: props => <i className="fas fa-less-than" {...props}></i>,
      action: parentView => {
        Path.addKeyPointInBetween(scene, keyPointMesh, parentView, -1);
        parentView.closeContextDial();
      },
      name: "Add previous"
    });

    actions.push({
      icon: props => <i className="fas fa-greater-than" {...props}></i>,
      action: parentView => {
        Path.addKeyPointInBetween(scene, keyPointMesh, parentView, 1);
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

  keyPoints.forEach(kp => {
    kp.onClick = () => {
      mainView.setContextActions(getKeyPointActions(scene, kp, mainView));
      mainView.getNodeFromTree(kp.parent.name).forEach(node => {
        node.item.selectedKeyPointIndex = kp.index;
        mainView.setProperties(node.item.toForm());
      });
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

function isPathOnGraph(pathItem) {
  return [
    pathItem.keyPoints[0]?.graphVertex,
    pathItem.keyPoints[pathItem.keyPoints.length - 1]?.graphVertex
  ].every(v => !!v);
}
