import NodeItem from "./NodeItem";
import Util3d from "../Util3d/Util3d";
import { Maybe } from "monet";
import {
  Color3,
  Mesh,
  Observable,
  Quaternion,
  StandardMaterial,
  Vector3,
  VertexBuffer,
  VertexData
} from "@babylonjs/core";
import Vec3 from "../Math/Vec3";
import Constants from "../Utils/Constants";
import { Animator } from "../Utils/Animator";
import { Service, ServiceRequest, Ros } from "roslib";
import { MasterDB } from "mov-fe-lib-core";

const MESSAGES = {
  failGenerateCurve: "Fail to generate navigation preview."
};

class NavigationPreviewItem extends NodeItem {
  /**
   *
   * @param {*} mesh: Mesh
   * @param {*} poses
   * @param {*} robotConfig
   * @param {*} scene
   * @param {*} mainView
   */
  constructor(mesh, poses, robotConfig, scene, mainView) {
    super(mesh, {});
    this.poses = poses;
    this.robotConfig = robotConfig;
    this.scene = scene;
    this.mainView = mainView;
    this.arrowMeshes = this.createArrowMeshes();
    this.navPath = this.createNavPath();
  }

  ofDict(scene, dict = null, mainView = null) {
    return NavigationPreviewItem.ofDict(scene, dict, mainView);
  }

  dispose() {
    this.navPath && this.navPath.dispose();
    this.arrowMeshes.forEach(arrow => arrow.dispose());
  }

  toDict() {
    const dict = super.toDict();
    dict.poses = this.poses;
    dict.robotConfig = this.robotConfig;
    return dict;
  }

  toForm() {
    const form = super.toForm();
    delete form.jsonSchema.properties.position;
    delete form.jsonSchema.properties.rotation;
    delete form.jsonSchema.properties.color;
    delete form.jsonSchema.properties.annotations;
    delete form.uiSchema.position;
    delete form.uiSchema.rotation;
    delete form.uiSchema.color;
    delete form.data.position;
    delete form.data.rotation;
    delete form.data.color;
    delete form.data.annotations;
    form.jsonSchema.properties.config = {
      type: "string",
      title: "Robot Configuration"
    };
    form.uiSchema.config = {
      "ui:widget": "selectScopeModal",
      "ui:options": {
        scopeList: "Configuration",
        name: "Robot Config",
        filter: e => true
      }
    };
    form.data.config = this.robotConfig;
    return form;
  }

  ofForm(form) {
    this.name = form.name;
    this.mesh.name = form.name;
    this.robotConfig = form.config;
  }

  createArrowMeshes() {
    return this.poses.map((pose, i) => {
      const beginPos = Vec3.of(pose.position).toBabylon();
      const theta = 2 * Math.atan2(pose.orientation[3], pose.orientation[0]);
      const endPos = new Vector3(Math.cos(theta), Math.sin(theta), 0).add(
        beginPos
      );
      const arrowMesh = Util3d.getArrow(
        this.scene,
        `${this.name}Pose${i}`,
        beginPos,
        endPos,
        Constants.RADIUS / 6
      );
      arrowMesh.parent = this.mesh;
      arrowMesh.getChildren().forEach(m => {
        m.material = Util3d.getMaterialFromColor(
          i % 2 === 0 ? Color3.Red() : Color3.Green()
        );
        m.material.freeze();
        m.observers = new Observable();
        m.observers.add(this.getArrowObserver(this.mainView));
        m.onClick = () => {
          this.mainView.highlightNodesInTree([this.name]);
          this.mainView.setProperties(this.toForm());
          setTimeout(() => {
            this.mainView.highlightMeshesInScene(
              this.arrowMeshes.flatMap(m => m.getChildren())
            );
          });
        };
        m.onDel = () => this.mainView.deleteNodeFromTreeUsingName(this.name);
      });
      return arrowMesh;
    });
  }

  createNavPath() {
    const navPath = new NavigationPath(this);
    navPath.play();
    return navPath;
  }

  getType = () => NavigationPreviewItem.TYPE;

  static TYPE = "NavigationPreviewItem";

  static ofDict(scene, dict = null, mainView = null) {
    const name = Maybe.fromNull(dict)
      .map(x => x.name)
      .orSome(`NavPreview${Math.floor(Math.random() * 1e3)}`);

    const mesh = new Mesh(name, scene);
    mesh.position = Vector3.Zero();
    mesh.scaling = Vector3.One();
    mesh.rotationQuaternion = Quaternion.Identity();
    mesh.isPickable = false;
    const navPreviewItem = new NavigationPreviewItem(
      mesh,
      dict.poses,
      dict.robotConfig,
      scene,
      mainView
    );
    return navPreviewItem;
  }

  getArrowObserver(mainView) {
    return ({ updatedPointMesh, is2updateServer, displacement }) => {
      const v = Vec3.ofBabylon(displacement);
      const vLocal = Util3d.getLocalCoordFromWorld(this.mesh, v, false);
      updatedPointMesh.position = updatedPointMesh.position.add(
        vLocal.scale(-1).toBabylon()
      );
      if (is2updateServer) {
        mainView.setProperties(this.toForm());
      }
    };
  }
}

class NavigationPath {
  constructor(navItem) {
    this.navItem = navItem;
    this.scene = navItem.scene;
    this.mainView = navItem.mainView;
    this.pathPromise = this.getPathFromService(
      this.navItem.poses,
      this.navItem.robotConfig
    );
    this.pathPromise.then(({ path }) => {
      this.pathPoses = path.poses.map(x => x.pose);
      this.mesh = this.getNavigationPathMesh(this.pathPoses);
      this.animator = this.getAnimator();
    });
  }

  play() {
    this.pathPromise.then(() => {
      this.animator.play();
    });
  }

  stop() {
    this.pathPromise.then(() => {
      this.animator.stop();
    });
  }

  dispose() {
    this.mesh && this.mesh.dispose();
    this.stop();
  }

  getAnimator() {
    const n = this.pathPoses.length;
    return Animator.builder()
      .initialState({
        time: 0,
        T: new Date().getTime(),
        indices: [...Array(n)].map((_, i) => i)
      })
      .nextState(s => {
        const { time, T, indices } = s;
        const indexSpeed = 3;
        const dt = (new Date().getTime() - T) / 1000;
        const positions = [...Array(n)];
        // with circle topology, check modular arithmetic below
        indices.forEach(
          (index, i) => (indices[i] = (index + indexSpeed * dt) % n)
        );
        positions.forEach((_, i) => {
          let iPrev = Math.floor(indices[i]);
          let iNext = Math.ceil(indices[i]);
          const t = (indices[i] - iPrev) / (iNext - iPrev);
          if (indices[i] > n - 1) {
            iPrev = 0;
            iNext = 1;
          }
          positions[i] = Vec3.of([
            this.pathPoses[iPrev].position.x,
            this.pathPoses[iPrev].position.y,
            this.pathPoses[iPrev].position.z
          ])
            .scale(1 - t)
            .add(
              Vec3.of([
                this.pathPoses[iNext].position.x,
                this.pathPoses[iNext].position.y,
                this.pathPoses[iNext].position.z
              ]).scale(t)
            )
            .toArray();
        });
        this.mesh.updateVerticesData(
          VertexBuffer.PositionKind,
          positions.flatMap(x => x)
        );
        return {
          time: time + dt,
          T: new Date().getTime(),
          indices
        };
      })
      .while(_ => !this.scene.isDisposed)
      .build();
  }

  getNavigationPathMesh(pathPoses) {
    const pointCloudMesh = new Mesh(
      `cloudPoint${this.navItem.name}`,
      this.scene
    );
    const mat = new StandardMaterial(
      `cloudPoint${this.navItem.name}Material`,
      this.scene
    );
    mat.emissiveColor = new Color3(1, 1, 1);
    mat.disableLighting = true;
    mat.pointsCloud = true;
    mat.pointSize = 5;
    pointCloudMesh.material = mat;
    pointCloudMesh.isPickable = false;

    const vertexData = new VertexData();
    const points = pathPoses.map(({ position }) => [
      position.x,
      position.y,
      position.z
    ]);
    //Assign positions
    vertexData.positions = points.flatMap(x => x);
    const colors = new Array(4 * points.length);
    vertexData.colors = colors.fill(1.0);
    //Apply vertexData to custom mesh
    vertexData.applyToMesh(pointCloudMesh, true);
    pointCloudMesh.parent = this.navItem.mesh;
    return pointCloudMesh;
  }

  getPathFromService([startPose, endPose], robotConfig) {
    const ros = new Ros({
      url: BRIDE_CONNECTION
    });
    const inputMessage = {
      scene: this.mainView.sceneName,
      robot_config: this.navItem.robotConfig,
      initial_pose: rosPoseFromPose(startPose),
      final_pose: rosPoseFromPose(endPose)
    };

    return new Promise(res => {
      // If there is an error on the backend, an 'error' emit will be emitted.
      ros.on("error", error => {
        console.log("Navigation Service ", error);
        // fall back to default
        this.getDefaultPath(inputMessage, res);
      });
      // Find out exactly when we made a connection.
      ros.on("connection", () => {
        console.log("Navigation Service Connection made!");
      });

      ros.on("close", () => {
        console.log("Navigation Service Connection closed.");
      });

      const navigationService = new Service({
        ros: ros,
        name: SERVICE_NAME,
        serviceType: SERVICE_TYPE
      });
      const request = new ServiceRequest(inputMessage);
      navigationService.callService(
        request,
        result => {
          ros.close();
          res(result);
        },
        error => {
          // fall back to default
          this.getDefaultPath(inputMessage, res);
        }
      );
    });
  }

  getDefaultPath(msg, resolve) {
    MasterDB.cloudFunction(
      Constants.NAV_CLOUD_NAME,
      "generate_path",
      [msg.scene, msg.initial_pose, msg.final_pose, msg.robot_config],
      data => {
        console.log("Got default path", data.success);
        if (data.success) {
          resolve({ path: data.result });
        } else {
          console.log("Caught exception in default path", data.error);
          this.getPathFromPoses(this.navItem.poses)
            .then(path => resolve({ path }))
            .catch(err => {
              console.log("Caught error in getPathFromPoses", err);
              this.mainView.showAlert(MESSAGES.failGenerateCurve, "error");
            });
        }
      }
    ).catch(error => {
      console.log("debug couldn't execute default generate path", error);
      this.getPathFromPoses(this.navItem.poses)
        .then(path => resolve({ path }))
        .catch(err => {
          console.log("Caught error in getPathFromPoses", err);
          this.mainView.showAlert(MESSAGES.failGenerateCurve, "error");
        });
    });
  }

  getPathFromPoses(poses, samples = 25) {
    const [start, end] = poses;
    const startPos = Vec3.of(start.position);
    const endPos = Vec3.of(end.position);
    const v = endPos.sub(startPos);
    const nextPoint = startPos
      .add(v.scale(0.5))
      .add(Vec3.of([start.orientation[0], start.orientation[3], 0]).scale(2));
    const nextNextPoint = endPos
      .add(v.scale(-0.5))
      .add(Vec3.of([end.orientation[0], end.orientation[3], 0]).scale(2));
    const splineCage = [startPos, nextPoint, nextNextPoint, endPos];
    const path = [...Array(samples)];
    for (let i = 0; i < samples; i++) {
      path[i] = polyInterpolation(splineCage, i / (samples - 1)).toArray();
    }
    return new Promise(re =>
      re({
        poses: path.map(point => ({
          pose: {
            position: { x: point[0], y: point[1], z: point[2] },
            orientation: { x: 0, y: 0, z: 0, w: 1 }
          }
        }))
      })
    );
  }
}

/**
 *
 * @param {*} cage: Array<Vec3>
 * @param {*} t: [0,1] real
 * @returns
 */
function polyInterpolation(cage, t) {
  if (cage.length === 1) return cage[0];
  const [, ...tail] = cage;
  let pairs = zip(cage, tail);
  pairs.splice(-1, 1);
  const newCage = pairs.map(([x, y]) => {
    return lerp(x, y)(t);
  });
  return polyInterpolation(newCage, t);
}
/**
 *
 * @param {*} x: Vec3
 * @param {*} y: Vec3
 * @returns t: [0,1] real => Vec3
 */
function lerp(x, y) {
  return t => {
    return x.scale(1 - t).add(y.scale(t));
  };
}
/**
 *
 * @param {*} a: Array
 * @param {*} b: Array
 * @returns
 */
function zip(a, b) {
  return a.map((x, i) => [x, b[i]]);
}

function rosPoseFromPose({ position, orientation }) {
  return {
    position: {
      x: position[0],
      y: position[1],
      z: position[2]
    },
    orientation: {
      w: orientation[0],
      x: orientation[1],
      y: orientation[2],
      z: orientation[3]
    }
  };
}

const SERVICE_NAME = "/generate_path/path_points/in";
const SERVICE_TYPE = "movai_common/GeneratePath";
const BRIDE_CONNECTION = "ws://localhost:9090";

export default NavigationPreviewItem;
