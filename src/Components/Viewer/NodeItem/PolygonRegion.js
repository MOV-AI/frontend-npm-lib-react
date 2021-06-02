import NodeItem from "./NodeItem";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import { Maybe } from "monet";
import React from "react";
import { Utils } from "mov-fe-lib-core";
import Constants from "../Utils/Constants";
import {
  Vector3,
  Observable,
  Color3,
  StandardMaterial,
  Quaternion
} from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";

const RADIUS = Constants.RADIUS;

const { mod: positiveMod } = Utils;

class PolygonRegion extends NodeItem {
  /**
   * @param {*} mesh
   * @param {*} localPolygon: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} keyPoints: are the keyPoints meshes array
   */
  constructor(
    mesh,
    localPolygon,
    height,
    keyPoints,
    keyValueMap = {},
    navigationAllowed = true
  ) {
    super(mesh, keyValueMap);
    this.localPolygon = localPolygon;
    this.height = height;
    this.keyPoints = keyPoints;
    this.navigationAllowed = navigationAllowed;
  }

  toDict() {
    const dict = super.toDict();
    dict.localPolygon = this.localPolygon;
    dict.height = this.height;
    dict.navigationAllowed = this.navigationAllowed;
    return dict;
  }

  ofDict(scene, dict = null, mainView = null) {
    return PolygonRegion.ofDict(scene, dict, mainView);
  }

  toForm() {
    const schema = super.toForm();
    const props = { ...schema.jsonSchema.properties };
    const newJsonSchema = {
      type: "object",
      properties: {
        oldName: props.oldName,
        name: props.name,
        type: props.type,
        navigationAllowed: {
          type: "boolean",
          title: "Navigation allowed"
        },
        position: props.position,
        rotation: props.rotation,
        color: props.color,
        annotations: props.annotations
      }
    };
    schema.jsonSchema = newJsonSchema;
    schema.data["navigationAllowed"] = this.navigationAllowed;
    return schema;
  }

  ofForm(form) {
    super.ofForm(form);
    this.navigationAllowed = Boolean(form.navigationAllowed);
  }

  getType = () => PolygonRegion.TYPE;

  static TYPE = "PolygonRegion";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict || !mainView)
      throw new Error("null dictionary describing polygon or null mainView");

    const polygon = dict.localPolygon.map(z => Vec3.of(z).toBabylon());
    const middlePoint = Vec3.of(dict.position).toBabylon();

    const mesh = createExtrudedPolygonMesh(
      scene,
      polygon,
      dict.height,
      dict.name
    );
    mesh.position = middlePoint;
    mesh.rotationQuaternion = Quaternion.Identity();

    const material = new StandardMaterial(`PolygonMaterial${dict.name}`, scene);
    const color = new Color3(dict.color[0], dict.color[1], dict.color[2]);
    material.diffuseColor = color;
    material.emissiveColor = color;
    mesh.material = material;
    mesh.visibility = dict.color[3] || VISIBILITY;
    Maybe.fromNull(dict.quaternion).forEach(quaternion => {
      const babylonQuaternion = new Quaternion(
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
      dict.keyValueMap,
      dict.navigationAllowed
    );
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

    // average in parent coord
    const rotMat3 = Util3d.getRotationMatrix(oldMesh);
    const scaleVec3 = Vec3.ofBabylon(oldMesh.scaling);
    const averageInParentCoord = rotMat3
      .prodVec(Vec3.ofBabylon(average).mul(scaleVec3))
      .toBabylon();

    // update mesh
    const newMesh = createExtrudedPolygonMesh(
      scene,
      newPoints,
      item.height,
      oldMesh.name
    );

    newMesh.parent = oldMesh.parent;
    newMesh.rotationQuaternion = oldMesh.rotationQuaternion;
    newMesh.position = averageInParentCoord.add(oldMesh.position);

    newMesh.material = oldMesh.material;
    newMesh.visibility = oldMesh.visibility;
    newMesh.onClick = oldMesh.onClick;
    newMesh.getMouseContextActions = oldMesh.getMouseContextActions;
    newMesh.nodeItem = oldMesh.nodeItem;
    newMesh.observers = oldMesh.observers;
    if (!!oldMesh.graphVertex) {
      newMesh.graphVertex = oldMesh.graphVertex;
      newMesh.graphVertex.vertex.mesh = newMesh;
    }

    item.localPolygon = newPoints.map(x => Vec3.ofBabylon(x).toArray());
    item.mesh = newMesh;
    item.keyPoints = keyPointUpdateFunction(scene, mainView, oldMesh, item);
    // update children
    const childrenCopy = [...oldMesh._children];
    childrenCopy
      .filter(c => mainView.getNodeFromTree(c.name).isJust())
      .forEach(c => {
        c.parent = item.mesh;
      });
    oldMesh.dispose();
    return newPoints;
  }

  static deleteKeyPoint(scene, keyPointMesh, mainView) {
    const index = keyPointMesh.index;
    const name = keyPointMesh.parent.name;
    mainView.getNodeFromTree(name).forEach(({ item }) => {
      const { mesh } = item;
      const copyPosition = { ...mesh.position };
      let newPoints = item.localPolygon.map(x => Vec3.of(x).toBabylon());
      mainView
        .getUndoManager()
        .doIt(
          PolygonRegion.getUndoDeleteKeyPoint(
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
        PolygonRegion.createNewMeshFromOldUsingNewPoints(
          copyPoints,
          scene,
          item,
          mainView,
          PolygonRegion.onAddNewPointKeyPointUpdate
        );
        mainView.updateNodeInServer(name);
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        const copyPoints = [...newPoints];
        item.mesh.position = copyPosition;
        PolygonRegion.createNewMeshFromOldUsingNewPoints(
          copyPoints,
          scene,
          item,
          mainView,
          PolygonRegion.onAddNewPointKeyPointUpdate
        );
        if (is2UpdateInServer) mainView.updateNodeInServer(name);
      })
      .build();
  }

  static onAddNewPointKeyPointUpdate(scene, mainView, oldMesh, item) {
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
  static addKeyPointInBetween = (
    scene,
    keyPointMesh,
    mainView,
    orientation
  ) => {
    const index = keyPointMesh.index;
    const name = keyPointMesh.parent.name;
    mainView.getNodeFromTree(name).forEach(({ item }) => {
      const copyPosition = { ...item.mesh.position };
      const points = item.localPolygon.map(x => Vec3.of(x).toBabylon());
      mainView
        .getUndoManager()
        .doIt(
          PolygonRegion.getUndoAddKeyPointInBetween(
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
  };

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
        const numberOfPoints = points.length;
        const nextIndex = positiveMod(index + orientation, numberOfPoints);
        let newPoints = [];
        const specialIndex = index + Math.max(0, orientation);
        for (let i = 0; i < specialIndex; i++) {
          newPoints.push(points[i]);
        }
        newPoints.push(points[nextIndex].add(points[index]).scale(0.5));
        for (let i = specialIndex; i < numberOfPoints; i++) {
          newPoints.push(points[i]);
        }
        PolygonRegion.createNewMeshFromOldUsingNewPoints(
          newPoints,
          scene,
          item,
          mainView,
          PolygonRegion.onAddNewPointKeyPointUpdate
        );
        mainView.updateNodeInServer(name);
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        const copyPoints = [...points];
        item.mesh.position = copyPosition;
        PolygonRegion.createNewMeshFromOldUsingNewPoints(
          copyPoints,
          scene,
          item,
          mainView,
          PolygonRegion.onAddNewPointKeyPointUpdate
        );
        if (is2UpdateInServer) mainView.updateNodeInServer(name);
      })
      .build();
  }
}

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

const reverseOrientation = triangleIndex => {
  const ans = [];
  ans.push(triangleIndex[1]);
  ans.push(triangleIndex[0]);
  ans.push(triangleIndex[2]);
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
  const h = new Vector3(0, 0, height);
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
    c.parent = item.mesh;
    console.log("Moving parents of child", c.name);
  });

  return item.keyPoints.map((k, i) => {
    k.observers = new Observable();
    k.observers.add(getKeyPointObserverFunction(scene, mainView));
    k.index = i;
    k.name = `${oldMesh.name}keyPoint${i}`;
    k.position = Vec3.of(item.localPolygon[i]).toBabylon();
    return k;
  });
}

const getKeyPointObserverFunction = (scene, mainView) => {
  return ({ updatedPointMesh, is2updateServer }) => {
    if (!updatedPointMesh.parent) return;
    mainView
      .getNodeFromTree(updatedPointMesh.parent.name)
      .forEach(polygonTreeNode => {
        const index = updatedPointMesh.index;
        const item = polygonTreeNode.item;
        const mesh = item.mesh;
        const name = mesh.name;
        let newPoints = item.localPolygon.map(x => Vec3.of(x).toBabylon());
        newPoints[index] = updatedPointMesh.position;
        PolygonRegion.createNewMeshFromOldUsingNewPoints(
          newPoints,
          scene,
          item,
          mainView
        );
        if (is2updateServer) {
          mainView.updateNodeInServer(name);
        }
        // signal observers
        Maybe.fromNull(item.mesh.observers).forEach(obs => {
          //side effect update absolute position
          item.mesh.getAbsolutePosition();
          obs.notifyObservers({
            updatedPointMesh: item.mesh,
            is2updateServer: is2updateServer,
            displacement: Vector3.Zero()
          });
        });
        Maybe.fromNull(item.mesh.graphVertex).forEach(({ vertexObs }) => {
          item.mesh.getAbsolutePosition();
          vertexObs({
            updatedPointMesh: item.mesh,
            is2updateServer: is2updateServer,
            displacement: Vector3.Zero()
          });
        });
      });
  };
};

const getKeyPointActions = (scene, keyPointMesh, mainView) => {
  const actions = [];
  mainView.getNodeFromTree(keyPointMesh.parent.name).forEach(pathTreeNode => {
    const item = pathTreeNode.item;
    const polygon = item.localPolygon;
    if (polygon.length > 3) {
      actions.push({
        icon: props => <i className="fas fa-trash" {...props}></i>,
        action: parentView => {
          PolygonRegion.deleteKeyPoint(scene, keyPointMesh, parentView);
          parentView.closeContextDial();
        },
        name: "Delete node [DEL]"
      });
    }
    actions.push({
      icon: props => <i className="fas fa-less-than" {...props}></i>,
      action: parentView => {
        PolygonRegion.addKeyPointInBetween(scene, keyPointMesh, parentView, -1);
        parentView.closeContextDial();
      },
      name: "Add previous"
    });
    actions.push({
      icon: props => <i className="fas fa-greater-than" {...props}></i>,
      action: parentView => {
        PolygonRegion.addKeyPointInBetween(scene, keyPointMesh, parentView, 1);
        parentView.closeContextDial();
      },
      name: "Add next"
    });
  });

  return actions;
};

const createPlaceHolderKeyPoints = (scene, polygon, polygonMesh, mainView) => {
  const keyPoints = [];
  polygon.forEach((p, i) => {
    const color = new Color3(0.25, 0.25, 0.25);
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

const VISIBILITY = 0.5;
export default PolygonRegion;
