import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import AssetNodeItem from "./AssetNodeItem";
import errorIcon from "../../../../resources/alert-error.png";
import {
  Axis,
  Space,
  Vector3,
  Quaternion,
  Color3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  Texture
} from "@babylonjs/core";
import _get from "lodash/get";
import Statistics from "../Utils/Statistics";

class Robot extends AssetNodeItem {
  static ROBOT_MESH_NAME = "Tugbot.stl";

  constructor(meshTree, assetName, keyValueMap = {}, scene, parentView) {
    super(meshTree.mesh, assetName, keyValueMap);
    this.robot = parentView.getRobotManager().getRobot(meshTree.id);
    this.scene = scene;
    this.isOnline = true;
    this.numberOfIte = 0;
    this.is2UsePos = true;
    this.meshTree = meshTree;
    this.parentView = parentView;
    this.timeSinceLastUpdate = 0;
    this.isSubscribedToLogs = true;
    this.speedStats = new Statistics();
    this.alert = null;
    this.loggerSubscription = null;
    this.requestAnimationFrameId = null;
    this.speed = Vector3.Zero();
    this.qSpeed = Quaternion.Zero();
    this.newPos = Vector3.Zero();
    this.newOri = Quaternion.Identity();
    // Build alert mesh
    this.alertMesh = this.buildAlertMesh(meshTree, scene);
    // Get robot ip to start logger
    const robotIP = this.robot.getIP(this.onGetIP(this));
    if (robotIP) this.startLogger();
    // Add click action to alertMesh
    Util3d.addClickActionToMesh(
      this.alertMesh,
      scene,
      this.onMeshAlertClick(this)
    );
  }

  buildAlertMesh(meshTree, scene) {
    if (this.alertMesh) return this.alertMesh;
    const alertMesh = MeshBuilder.CreateDisc(`AlertDisc${meshTree.name}`, {
      radius: 0.2,
      sideOrientation: Mesh.DOUBLESIDE
    });
    const material = new StandardMaterial(`AlertMat${meshTree.name}`, scene);
    material.emissiveColor = new Color3.White();
    material.ambientTexture = new Texture(errorIcon, scene);
    material.freeze();
    alertMesh.material = material;
    alertMesh.isStatic = true;
    alertMesh.position.y = -1.5;
    alertMesh.parent = meshTree.mesh;
    alertMesh.setEnabled(false);
    alertMesh.billboardMode = Mesh.BILLBOARDMODE_ALL;
    return alertMesh;
  }

  /**
   * On alert mesh click handler
   *
   * @param {*} robot: Robot class instance (this)
   * @returns {Function} Function to be triggered whenever there's a click on the alert mesh
   */
  onMeshAlertClick(robot) {
    return () => {
      robot.parentView.showRobotAlertModal(robot.alert);
    };
  }

  toDict() {
    let dict = super.toDict();
    dict.isSubscribedToLogs = this.isSubscribedToLogs;
    return dict;
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
        // isSubscribedToLogs: {
        //   type: "boolean",
        //   title: "Subscribe to alerts"
        // },
        position: props.position,
        rotation: props.rotation,
        color: props.color,
        annotations: props.annotations
      }
    };
    schema.jsonSchema = newJsonSchema;
    schema.data["isSubscribedToLogs"] = this.isSubscribedToLogs;
    return schema;
  }

  ofForm(form) {
    super.ofForm(form);
    this.isSubscribedToLogs = Boolean(form.isSubscribedToLogs);
    // Start/Stop logger based on isSubscribedToLogs property
    if (form.isSubscribedToLogs && this.robot.ip) this.startLogger();
    else this.stopLogger(true);
  }

  dispose() {
    super.dispose();
    this.robot.unsubscribe({
      property: "Parameter",
      propValue: "tf"
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
    this.mesh.visibility = 0.1;
    this.speed = Vector3.Zero();
    this.qSpeed = Quaternion.Zero();
    this.isOnline = false;
    this.numberOfIte = 0;
    this.speedStats = new Statistics();
    this.stopLogger();
  }

  toOnline() {
    if (this.mesh.isDisposed()) return;
    this.mesh.visibility = 1;
    this.isOnline = true;
    this.startLogger();
  }

  /**
   * Start robot logger
   */
  startLogger() {
    if (!this.loggerSubscription) {
      this.loggerSubscription = this.robot.subscribeToLogs(
        this.updateAlertState(this)
      );
    }
  }

  /**
   * Stop robot logger
   *
   * @param {Boolean} is2RemoveAlertMesh: If true: remove alert mesh
   */
  stopLogger(is2RemoveAlertMesh) {
    if (this.loggerSubscription) {
      this.robot.unsubscribeToLogs(this.loggerSubscription);
      this.loggerSubscription = null;
    }
    // Remove robot alert mesh
    if (is2RemoveAlertMesh) this.alertMesh.setEnabled(false);
  }

  /**
   * Update robot alert state
   *
   * @param {*} robot: Robot class instance (this)
   * @returns {Function} Function to be triggered whenever there's a new log for this robot
   */
  updateAlertState(robot) {
    return logs => {
      robot.timeSinceLastUpdate = 0;
      if (
        logs.length > 0 &&
        (logs[0].level === "ERROR" || logs[0].level === "CRITICAL")
      ) {
        robot.alert = logs[0];
        robot.alertMesh.setEnabled(true);
      }
      // If last log is not error/critical then clean alert (set it to null)
      else {
        robot.alertMesh.setEnabled(false);
      }
    };
  }

  /**
   * Start logger after receiving robot IP
   *
   * @param {*} robot: Robot class instance (this)
   * @returns {Function} Function to be triggered when receive robot ip
   */
  onGetIP(robot) {
    return ip => {
      // If robot IP were not found doesn't start logger
      if (!ip) return;
      robot.startLogger();
    };
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Static Functions                                   *
   *                                                                                      */
  //========================================================================================

  static TYPE = "Robot";

  static TIME_2_BE_OFFLINE_IN_SEC = 10;

  static createBaseObject = ({
    robotName,
    robotMeshName = Robot.ROBOT_MESH_NAME,
    id = Robot.randomId(),
    nodeDict = {
      position: [0, 0, 0],
      quaternion: [1, 0, 0, 0]
    }
  }) => {
    return {
      id: id,
      name: robotName,
      type: Robot.TYPE,
      meshName: robotMeshName,
      robotTree: {
        name: robotName,
        child: [],
        position: {
          x: nodeDict.position[0],
          y: nodeDict.position[1],
          z: nodeDict.position[2]
        },
        orientation: {
          w: nodeDict.quaternion[0],
          x: nodeDict.quaternion[1],
          y: nodeDict.quaternion[2],
          z: nodeDict.quaternion[3]
        }
      }
    };
  };

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

    robot.numberOfIte++;
    const isZero = robot.timeSinceLastUpdate === 0;
    const dtInv = isZero ? 1.0 : Math.min(1.0 / robot.timeSinceLastUpdate, 1.0);

    const speed = newPosition.subtract(lastPosition).scale(dtInv);
    const qSpeed = newOrientation.subtract(lastOrientation).scale(dtInv);
    const vel = speed.length();

    if (robot.numberOfIte < SAMPLES) {
      robot.speedStats.update(vel);
    }
    if (robot.speedStats.isOutlier(vel)) {
      robot.is2UsePos = true;
    } else {
      robot.speedStats.update(vel);
      robot.speed = speed;
      robot.qSpeed = qSpeed;
      robot.is2UsePos = false;
    }
    robot.newPos = newPosition;
    robot.newOri = newOrientation;
    robot.timeSinceLastUpdate = 0;
  }

  static getSocketAnimator = (robot, parentView) => {
    const updateTF = data => {
      const tf = _get(
        data,
        `Robot.${robot.meshTree.id}.Parameter.tf.Value`,
        undefined
      );
      if (tf) Robot.updateRobotMeshTree(tf, robot);
    };
    // Subscribe to tf parameter
    robot.robot.subscribe({
      property: "Parameter",
      propValue: "tf",
      onLoad: data => updateTF(data?.value),
      onUpdate: data => updateTF(data?.key)
    });

    // Animate
    return (robot2Animate, dt) => {
      robot2Animate.timeSinceLastUpdate += dt;
      dt = Math.min(dt, 1);
      if (Vec3.ofBabylon(robot2Animate.speed).someNaNOrInfinite()) return;
      if (Vec3.ofBabylon(robot2Animate.qSpeed).someNaNOrInfinite()) return;
      if (robot2Animate.is2UsePos) {
        robot2Animate.mesh.position = robot2Animate.newPos;
        robot2Animate.mesh.rotationQuaternion = robot2Animate.newOri;
      } else {
        robot2Animate.mesh.position = robot2Animate.mesh.position.add(
          robot2Animate.speed.scale(dt)
        );
        robot2Animate.mesh.rotationQuaternion = robot2Animate.mesh.rotationQuaternion
          .add(robot.qSpeed.scale(dt))
          .normalize();
      }
      Robot.setOnOffLine(robot2Animate);
    };
  };

  static setOnOffLine(robot) {
    if (robot.timeSinceLastUpdate > Robot.TIME_2_BE_OFFLINE_IN_SEC) {
      if (robot.isOnline) robot.toOffline();
    } else {
      if (robot.timeSinceLastUpdate > Robot.TIME_2_BE_OFFLINE_IN_SEC / 4) {
        robot.is2UsePos = true;
      }
      if (!robot.isOnline) robot.toOnline();
    }
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
    this._parentView = null;
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

  parentView(parentView) {
    this._parentView = parentView;
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

    return new Robot(
      this._meshTree,
      this._assetName,
      this._keyValueMap,
      this._scene,
      this._parentView
    );
  }
}
//========================================================================================
/*                                                                                      *
 *                                       CONSTANTS                                      *
 *                                                                                      */
//========================================================================================

const SAMPLES = 30;

//========================================================================================
/*                                                                                      *
 *                                        EXPORT                                        *
 *                                                                                      */
//========================================================================================

export default Robot;
