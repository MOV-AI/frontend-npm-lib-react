import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import { MasterDB } from "mov.ai-core";
import AssetNodeItem from "./AssetNodeItem";
import { Axis, Space, Vector3, Quaternion, Color3 } from "babylonjs";

class Robot extends AssetNodeItem {
  static ROBOT_MESH_NAME = "Tugbot.STL";

  constructor(meshTree, assetName, keyValueMap = {}) {
    super(meshTree.mesh, assetName, keyValueMap);
    this.requestAnimationFrameId = null;
    this.meshTree = meshTree;
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
    MasterDB.unsubscribe({
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

  static TYPE = "Robot";

  static getDefaultAnimator = parentView => (robot, dt) => {
    const mesh = robot.mesh;
    const speed = 3;
    const vel = Util3d.getRotationMatrix(mesh)
      .prodVec(new Vec3([speed, 0, 0]))
      .toBabylon();
    mesh.position = mesh.position.add(vel.scale(dt));
    mesh.rotate(Axis.Z, (-Math.PI / 2) * dt, Space.LOCAL);
    if (Math.random() < 0.01) parentView.updateNodeInServer(mesh.name);
  };

  static updateRobotMeshTree(newRobotTf, robot) {
    robot.mesh.position = new Vector3(
      newRobotTf.position.x,
      newRobotTf.position.y,
      newRobotTf.position.z
    );
    const quaternion = new Quaternion(
      newRobotTf.orientation.x,
      newRobotTf.orientation.y,
      newRobotTf.orientation.z,
      newRobotTf.orientation.w
    );
    robot.mesh.rotationQuaternion = quaternion.normalize();
  }

  static getSocketAnimator = (robot, parentView) => {
    MasterDB.subscribe(
      { Scope: "Robot", Name: robot.meshTree.id, Parameter: "tf" },
      data => {
        const tf = data.key.Robot[robot.meshTree.id].Parameter.tf.Value;
        if (tf) {
          console.log("ROBOT TF UPDATE...", tf);
          Robot.updateRobotMeshTree(tf, robot);
          console.log("Updating robot ", robot);
          if (Math.random() < 0.01) parentView.updateNodeInServer(robot.name);
        }
      },
      data => {
        console.log("ROBOT INIT SUB...", data.value);
        const tf = data.value.Robot[robot.meshTree.id].Parameter.tf.Value;
        Robot.updateRobotMeshTree(tf, robot);
        console.log("Updating robot ", robot);
        parentView.updateNodeInServer(robot.name);
      }
    );
    return (robot2Animate, dt) => {
      // empty animation
    };
  };

  /**
   * Side effect function
   */
  static transformMesh(mesh, scene) {
    const thetaZ = Math.PI;
    const translate = 0.25;
    const boundScale = 1.9;

    const boundingSphere = mesh.getBoundingInfo().boundingSphere;
    const pivotSphere = Util3d.createSphere(
      scene,
      new Color3(0.0, 0.0, 0.0),
      0.25 * boundingSphere.radius,
      `pivotSphere${mesh.name}`,
      false
    );
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

    tfSphereMesh.addRotation(0, 0, thetaZ);
    tfSphereMesh.position.set(0, 0, translate);
    const spherePlaceHolder = Util3d.createSphere(
      scene,
      new Color3(0.0, 0.0, 0.0),
      boundScale,
      mesh.name,
      true
    );
    spherePlaceHolder.visibility = 0.1;

    mesh.parent = pivotSphere;
    pivotSphere.parent = tfSphereMesh;
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
      this.createRobotMeshTreeRecursive(
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
        throw `There are missing variables to build a robot, e.g ${x}`;
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
