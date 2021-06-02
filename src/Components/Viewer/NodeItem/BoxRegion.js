import NodeItem from "./NodeItem";
import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import Constants from "../Utils/Constants";
import {
  Vector3,
  Axis,
  Color3,
  Observable,
  StandardMaterial,
  Quaternion
} from "@babylonjs/core";
import isEqual from "lodash.isequal";

class BoxRegion extends NodeItem {
  constructor(mesh, corners, keyPoints, keyValueMap = {}) {
    super(mesh, keyValueMap);
    this.corners = corners; // in local coordinates, in relation to center of mass
    this.keyPoints = keyPoints;
  }

  toDict() {
    const dict = super.toDict();
    dict.corners = this.corners;
    return dict;
  }

  toForm() {
    const schema = super.toForm();
    schema.jsonSchema.properties["dimensions"] = {
      type: "object",
      title: "Dimensions",
      properties: {
        lower: {
          type: "object",
          title: "Lower Corner",
          properties: {
            x: {
              type: "number",
              title: "x"
            },
            y: {
              type: "number",
              title: "y"
            }
          }
        },
        size: {
          type: "object",
          title: "Size",
          properties: {
            scaleX: {
              type: "number",
              title: "scale-X"
            },
            scaleY: {
              type: "number",
              title: "scale-Y"
            }
          }
        }
      }
    };
    schema.uiSchema["dimensions"] = { "ui:widget": "collapse" };
    // global ref coordinates
    const worldCorners = this.keyPoints
      .map(x => Util3d.getGlobalCoordinates(x, x.position))
      .map(x => x.toArray());
    schema.data["dimensions"] = {
      lower: {
        x: worldCorners[0][0],
        y: worldCorners[0][1]
      },
      size: {
        // TODO: warning, doesn't take into account possible scaling
        scaleX: this.corners[1][0] - this.corners[0][0],
        scaleY: this.corners[1][1] - this.corners[0][1]
      }
    };
    return schema;
  }

  ofForm(form) {
    const oldForm = this.toForm();
    const oldDimensions = oldForm.data.dimensions;
    if (isEqual(oldDimensions, form.dimensions)) {
      super.ofForm(form);
    } else {
      this.ofFormDimensions(form);
    }
  }

  ofDict(scene, dict = null, mainView = null) {
    return BoxRegion.ofDict(scene, dict, mainView);
  }

  getType = () => BoxRegion.TYPE;

  static TYPE = "BoxRegion";

  ofFormDimensions(form) {
    const newLowerPositionInWorldCoordinates = Vector3.FromArray(
      [form.dimensions.lower.x, form.dimensions.lower.y, 0].map(
        Number.parseFloat
      )
    );
    const newLocalDimensions = [
      form.dimensions.size.scaleX,
      form.dimensions.size.scaleY
    ].map(Number.parseFloat);
    let localLowerPosition = Util3d.getLocalCoordFromGlobal(
      this.keyPoints[0],
      newLowerPositionInWorldCoordinates
    ).toArray();
    const notify = (i, update = false) =>
      this.keyPoints[i].observers.notifyObservers({
        updatedPointMesh: this.keyPoints[i],
        is2updateServer: update
      });

    this.keyPoints[0].position = new Vector3(
      localLowerPosition[0],
      localLowerPosition[1],
      this.keyPoints[0].position.z
    );
    notify(0);
    localLowerPosition = Util3d.getLocalCoordFromGlobal(
      this.keyPoints[0],
      newLowerPositionInWorldCoordinates
    ).toArray();
    this.keyPoints[1].position = new Vector3(
      localLowerPosition[0] + newLocalDimensions[0],
      localLowerPosition[1] + newLocalDimensions[1],
      this.keyPoints[1].position.z
    );
    notify(1);
  }

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict) throw new Error("null dictionary describing Box region");
    const name = Maybe.fromNull(dict.name).orSome(
      `BoxRegion${Math.floor(Math.random() * 1e3)}`
    );
    const mesh = createBoxRegionMesh(dict, name, scene);

    const material = new StandardMaterial(`BoxRegionMaterial${name}`, scene);
    const color = new Color3(dict.color[0], dict.color[1], dict.color[2]);
    material.diffuseColor = color;
    material.emissiveColor = color;
    material.backFaceCulling = false;
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

    const keyPoints = createPlaceHolderKeyPoints(
      scene,
      dict.corners.map(x => Vec3.of(x).toBabylon()),
      mesh,
      mainView
    );
    return new BoxRegion(mesh, dict.corners, keyPoints, dict.keyValueMap);
  }
}

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
    corners[0].add(Axis.X.scale(d.x)),
    corners[0].add(new Vector3(d.x, d.y, 0)),
    corners[0].add(Axis.Y.scale(d.y))
  ];
  const h = new Vector3(0, 0, d.z);
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
  mesh.rotationQuaternion = Quaternion.Identity();
  return mesh;
}

function createNewMeshFromOldUsingNewBox(newBox, scene, mesh, item) {
  const average = Util3d.pointAverageVec3(newBox.corners.map(x => Vec3.of(x)));
  newBox.position = average.toArray();
  newBox.corners = newBox.corners.map(x => Vec3.of(x).sub(average).toArray());

  // average in parent coord
  const rotMat3 = Util3d.getRotationMatrix(mesh);
  const scaleVec3 = Vec3.ofBabylon(mesh.scaling);
  const averageInParentCoord = rotMat3
    .prodVec(average.mul(scaleVec3))
    .toBabylon();

  const newMesh = createBoxRegionMesh(newBox, mesh.name, scene);
  newMesh.parent = mesh.parent;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.position = averageInParentCoord.add(mesh.position);

  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.getMouseContextActions = mesh.getMouseContextActions;
  newMesh.nodeItem = mesh.nodeItem;
  newMesh.observers = mesh.observers;
  if (!!mesh.graphVertex) {
    newMesh.graphVertex = mesh.graphVertex;
    newMesh.graphVertex.vertex.mesh = newMesh;
  }
  item.mesh = newMesh;
  item.corners = newBox.corners;

  const childrenCopy = [...mesh._children];
  childrenCopy.forEach(c => {
    c.parent = newMesh;
  });
  item.keyPoints.forEach((k, j) => {
    const saveZ = k.position.z;
    k.position = Vec3.of(newBox.corners[j]).toBabylon();
    k.position.z = saveZ;
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
        newBox.corners[index] = [
          updatedPointMesh.position.x,
          updatedPointMesh.position.y,
          newBox.corners[index][2]
        ];
        createNewMeshFromOldUsingNewBox(newBox, scene, mesh, item);
        mainView.addGizmo2Name();
        if (is2updateServer) {
          mainView.updateNodeInServer(name);
          mainView.getNodeFromTree(name).forEach(node => {
            mainView.setProperties(node.item.toForm());
          });
        }
        // signal box region observers
        Maybe.fromNull(item.mesh.observers).forEach(obs => {
          obs.notifyObservers({
            updatedPointMesh: item.mesh,
            is2updateServer: is2updateServer,
            displacement: Vector3.Zero()
          });
        });
        Maybe.fromNull(item.mesh.graphVertex).forEach(({ vertexObs }) => {
          vertexObs({
            updatedPointMesh: item.mesh,
            is2updateServer: is2updateServer,
            displacement: Vector3.Zero()
          });
        });
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
  const maxHeight = corners.reduce(
    (max, x) => Math.max(max, x.z),
    Number.MIN_VALUE
  );
  corners.forEach((corner, i) => {
    const p = corner;

    const keyPoint = Util3d.createSphere(
      scene,
      new Color3(0.25, 0.25, 0.25),
      RADIUS,
      `${boxRegionMesh.name}keyPoint${i}`,
      true
    );

    keyPoint.parent = boxRegionMesh;
    keyPoint.position = p;
    keyPoint.position.z = maxHeight;
    keyPoint.index = i;
    keyPoint.observers = new Observable();
    keyPoint.observers.add(getKeyPointObserverFunction(mainView, scene));
    keyPoints.push(keyPoint);
  });
  return keyPoints;
};

const VISIBILITY = 0.25;
export default BoxRegion;
