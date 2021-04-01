import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import { Database } from "mov-fe-lib-core";
import AssetNodeItem from "./AssetNodeItem";
import { Axis, Space, Vector3, Quaternion, Color3 } from "@babylonjs/core";
import _get from "lodash/get";

class Robot extends AssetNodeItem {
  static ROBOT_MESH_NAME = "Tugbot.stl";

  constructor(meshTree, assetName, keyValueMap = {}) {
    super(meshTree.mesh, assetName, keyValueMap);
    this.requestAnimationFrameId = null;
    this.meshTree = meshTree;
    this.timeSinceLastUpdate = 0;
    this.isOnline = true;
    this.speed = Vector3.Zero();
    this.qSpeed = Quaternion.Zero();
    this.newPos = Vector3.Zero();
    this.newOri = Quaternion.Identity();
    this.db = new Database();
  }

  toDict() {
    let dict = super.toDict();
    return dict;
  }

  toForm() {
    const schema = super.toForm();
    schema.jsonSchema.properties = {
      oldName: schema.jsonSchema.properties.oldName,
      name: schema.jsonSchema.properties.name,
      type: schema.jsonSchema.properties.type,
      assetName: {
        type: "string",
        title: "Asset Name"
      },
      position: schema.jsonSchema.properties.position,
      quaternion: schema.jsonSchema.properties.quaternion,
      color: schema.jsonSchema.properties.color,
      annotations: schema.jsonSchema.properties.annotations
    };
    schema.uiSchema["assetName"] = {
      "ui:disabled": true
    };
    schema.data["assetName"] = this.assetName;
    return schema;
  }

  dispose() {
    super.dispose();
    this.db.unsubscribe({
      Scope: "Robot",
      Name: this.meshTree.id,
      Parameter: "tf"
    });
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  updateRobot = (robot, oldTimeInMillis, robotAnimator) => {
    const time = new Date().getTime();
    const dt = 1e-3 * (time - oldTimeInMillis);
    robotAnimator(robot, dt);
    this.requestAnimationFrameId = requestAnimationFrame(() =>
      this.updateRobot(robot, time, robotAnimator)
    );
  };

  animate = robotAnimator => {
    this.requestAnimationFrameId = requestAnimationFrame(() =>
      this.updateRobot(this, new Date().getTime(), robotAnimator)
    );
  };

  getType = () => Robot.TYPE;

  toOffline() {
    if (this.mesh.isDisposed()) return;
    this.mesh._children[0]._children[0].visibility = 0.1;
    this.speed = Vector3.Zero();
    this.qSpeed = Quaternion.Zero();
    this.isOnline = false;
  }

  toOnline() {
    if (this.mesh.isDisposed()) return;
    this.mesh._children[0]._children[0].visibility = 1;
    this.isOnline = true;
  }
  //========================================================================================
  /*                                                                                      *
   *                                   Static Functions                                   *
   *                                                                                      */
  //========================================================================================

  static TYPE = "Robot";

  static TIME_2_BE_OFFLINE_IN_SEC = 10;

  static getDefaultAnimator = parentView => (robot, dt) => {
    const mesh = robot.mesh;
    const speed = 3;
    const vel = Util3d.getRotationMatrix(mesh)
      .prodVec(new Vec3([speed, 0, 0]))
      .toBabylon();
    mesh.position = mesh.position.add(vel.scale(dt));
    mesh.rotate(Axis.Z, (-Math.PI / 2) * dt, Space.LOCAL);
  };

  static updateRobotMeshTree(newRobotTf, robot) {
    const lastPosition = robot.mesh.position;
    const lastOrientation = robot.mesh.rotationQuaternion;
    const newPosition = new Vector3(
      newRobotTf.position.x,
      newRobotTf.position.y,
      newRobotTf.position.z
    );
    const newOrientation = new Quaternion(
      newRobotTf.orientation.x,
      newRobotTf.orientation.y,
      newRobotTf.orientation.z,
      newRobotTf.orientation.w
    ).normalize();

    const dtReciprocal = 1 / robot.timeSinceLastUpdate;
    robot.speed = newPosition.subtract(lastPosition).scale(dtReciprocal);
    robot.qSpeed = newOrientation.subtract(lastOrientation).scale(dtReciprocal);
    robot.newPos = newPosition;
    robot.newOri = newOrientation;
    robot.timeSinceLastUpdate = 0;
  }

  static getSocketAnimator = (robot, parentView) => {
    robot.db.subscribe(
      { Scope: "Robot", Name: robot.meshTree.id, Parameter: "tf" },
      data => {
        const tf = _get(
          data,
          `key.Robot.${robot.meshTree.id}.Parameter.tf.Value`,
          undefined
        );
        if (tf) Robot.updateRobotMeshTree(tf, robot);
      },
      data => {
        const tf = _get(
          data,
          `key.Robot.${robot.meshTree.id}.Parameter.tf.Value`,
          undefined
        );
        if (tf) Robot.updateRobotMeshTree(tf, robot);
      }
    );
    return (robot2Animate, dt) => {
      const epsilon = 1e-2;
      const n = 1 / epsilon;
      const biasedCoin = robot2Animate.timeSinceLastUpdate % n; // Math.random() < epsilon
      robot2Animate.timeSinceLastUpdate += dt;
      if (Vec3.ofBabylon(robot2Animate.speed).someNaNOrInfinite()) return;
      if (Vec3.ofBabylon(robot2Animate.qSpeed).someNaNOrInfinite()) return;
      robot2Animate.mesh.position = biasedCoin
        ? robot2Animate.newPos
        : robot2Animate.mesh.position.add(robot2Animate.speed.scale(dt));
      robot2Animate.mesh.rotationQuaternion = biasedCoin
        ? robot2Animate.newOri
        : robot2Animate.mesh.rotationQuaternion
            .add(robot.qSpeed.scale(dt))
            .normalize();
      Robot.setOnOffLine(robot2Animate);
    };
  };

  static setOnOffLine(robot) {
    if (robot.timeSinceLastUpdate > Robot.TIME_2_BE_OFFLINE_IN_SEC) {
      robot.toOffline();
    } else {
      if (!robot.isOnline) robot.toOnline();
    }
  }

  /**
   * Side effect function
   */
  static transformMesh(mesh, scene) {
    const thetaX = Math.PI / 2;
    const translate = 0.25;
    const boundScale = 1.9;

    const boundingSphere = mesh.getBoundingInfo().boundingSphere;
    mesh.position.set(
      -boundingSphere.center.x,
      -boundingSphere.center.y,
      -boundingSphere.center.z
    );

    const tfSphereMesh = Util3d.createSphere(
      scene,
      new Color3(0.0, 0.0, 0.0),
      0.5 * boundingSphere.radius,
      `tfsphere${mesh.name}`,
      false
    );
    tfSphereMesh.visibility = 0.25;
    tfSphereMesh.scaling = Vec3.ONES.scale(
      1 / boundingSphere.radius
    ).toBabylon();

    tfSphereMesh.addRotation(thetaX, 0, 0);
    tfSphereMesh.position.set(0, 0, translate);
    const spherePlaceHolder = Util3d.createSphere(
      scene,
      new Color3(0.0, 0.0, 0.0),
      boundScale,
      mesh.name,
      true
    );
    spherePlaceHolder.visibility = 0.1;

    mesh.parent = tfSphereMesh;
    tfSphereMesh.parent = spherePlaceHolder;
    return spherePlaceHolder;
  }

  static createRobotMeshTreeRecursive(node, mesh, parent, scene) {
    if (!mesh) {
      mesh = Util3d.createSphere(
        scene,
        new Color3(0.0, 0.0, 0.0),
        0.5,
        node.name,
        false
      );
    }
    const meshTree = {
      mesh: mesh,
      children: []
    };
    const position = new Vector3(
      node.position.x,
      node.position.y,
      node.position.z
    );
    const quaternion = new Quaternion(
      node.orientation.x,
      node.orientation.y,
      node.orientation.z,
      node.orientation.w
    );
    mesh.position = position;
    mesh.rotationQuaternion = quaternion;
    if (parent) {
      mesh.parent = parent;
    }
    meshTree["children"] = node.child.map(child => {
      return this.createRobotMeshTreeRecursive(
        child,
        Util3d.referentialBuilder(scene)
          .boxParams({ isVisible: false, size: 0.1 })
          .build(),
        mesh,
        scene
      );
    });
    return meshTree;
  }

  static createRobotMeshTree(robotTree, robotMesh, scene) {
    return Robot.createRobotMeshTreeRecursive(
      robotTree,
      robotMesh,
      null,
      scene
    );
  }

  static builder() {
    return new RobotBuilder();
  }
}

class RobotBuilder {
  constructor() {
    this._name = null;
    this._meshTree = null;
    this._parentMesh = null;
    this._scene = null;
    this._isPickable = true;
    this._id = null;
    this._keyValueMap = {};
    this._assetName = null;
  }

  name(name) {
    this._name = name;
    return this;
  }

  meshTree(meshTree) {
    this._meshTree = meshTree;
    return this;
  }

  parentMesh(parentMesh) {
    this._parentMesh = parentMesh;
    return this;
  }

  scene(scene) {
    this._scene = scene;
    return this;
  }

  isPickable(isPickable) {
    this._isPickable = isPickable;
    return this;
  }

  id(id) {
    this._id = id;
    return this;
  }

  keyValueMap(keyValueMap) {
    this._keyValueMap = keyValueMap;
    return this;
  }

  assetName(assetName) {
    this._assetName = assetName;
    return this;
  }

  build() {
    const variables = Object.keys(this)
      .filter(x => x !== "_parentMesh")
      .map(x => this[x]);

    variables.forEach(x => {
      if (x === null)
        throw new Error(
          `There are missing variables to build a robot, e.g ${x}`
        );
    });

    this._meshTree.id = this._id;
    this._meshTree.name = this._name;
    this._meshTree.mesh.name = this._name;
    this._meshTree.mesh.isPickable = this._isPickable;
    this._meshTree.mesh.parent = this._parentMesh;

    const baseAxis = Util3d.referentialBuilder(this._scene)
      .isPickable(false)
      .boxParams({ isVisible: false, size: 0.1 })
      .name(`${this._name}Axis`)
      .build();
    baseAxis.parent = this._meshTree.mesh;

    return new Robot(this._meshTree, this._assetName, this._keyValueMap);
  }
}

export default Robot;
