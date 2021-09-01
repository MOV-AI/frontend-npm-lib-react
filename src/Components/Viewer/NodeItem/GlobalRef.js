import NodeItem from "./NodeItem";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import { Maybe } from "monet";
import { Quaternion, MeshBuilder } from "@babylonjs/core";

// ROS/RVIZ default referential
const THETA = -Math.PI / 2;
export const ROS_ORIGIN = {
  position: [0, 0, 0],
  scaling: [1, -1, 1],
  quaternion: [Math.cos(THETA / 2), Math.sin(THETA / 2), 0, 0]
};

class GlobalRef extends NodeItem {
  constructor(mesh, keyValueMap = {}) {
    super(mesh, keyValueMap);
  }

  toForm() {
    const form = super.toForm();
    form.uiSchema.name = {
      "ui:disabled": true
    };
    return form;
  }

  getMouseContextActions() {
    return [];
  }

  getType = () => GlobalRef.TYPE;

  static TYPE = "GlobalRef";

  static NAME = "Global ref";

  static ofDict(scene, dict = null, mainView = null) {
    const rosOrigin = GlobalRef.getRosOrigin(scene);

    const globalRefMesh = Util3d.referentialBuilder(scene)
      .name(GlobalRef.NAME)
      .isPickable(true)
      .boxParams({ isVisible: true, size: 0.25 })
      .build();

    globalRefMesh.parent = rosOrigin;

    NodeItem.mapDict2Mesh(dict, globalRefMesh);

    return new GlobalRef(
      globalRefMesh,
      Maybe.fromNull(dict)
        .flatMap(d => Maybe.fromNull(d.keyValueMap))
        .orUndefined()
    );
  }

  static getRosOrigin(scene) {
    const rosOrigin = MeshBuilder.CreateBox(
      "ROS_ORIGIN",
      { size: 1e-3 },
      scene
    );
    rosOrigin.isVisible = false;
    rosOrigin.isPickable = false;
    rosOrigin.position = Vec3.of(ROS_ORIGIN.position).toBabylon();
    rosOrigin.scaling = Vec3.of(ROS_ORIGIN.scaling).toBabylon();
    const quaternion = new Quaternion(
      ROS_ORIGIN.quaternion[1],
      ROS_ORIGIN.quaternion[2],
      ROS_ORIGIN.quaternion[3],
      ROS_ORIGIN.quaternion[0]
    );
    rosOrigin.rotationQuaternion = quaternion.normalize();
    return rosOrigin;
  }

  /**
   *
   * @param {*} x: Babylon Vector3 in World coordinates
   *
   * returns Babylon Vector3 vector in ROS coordinates
   */
  static inverseCoordinates(x) {
    /**
     * Solves RS\eta + p = x
     *
     * \eta = S^(⁻1)R^T(x-p)
     */
    const quaternion = ROS_ORIGIN.quaternion;
    const rotationMatrix = Util3d.getRotationMatrix({
      rotationQuaternion: new Quaternion(
        quaternion[1],
        quaternion[2],
        quaternion[3],
        quaternion[0]
      )
    });
    const scaling = Vec3.of(ROS_ORIGIN.scaling).map(z => 1 / z);
    const pos = Vec3.of(ROS_ORIGIN.position);
    const result = scaling.mul(
      rotationMatrix.dotVec(Vec3.ofBabylon(x).sub(pos))
    );
    return result.map(z => (Math.abs(z) < 1e-5 ? 0 : z)).toBabylon();
  }

  /**
   *
   * @param {*} x: Babylon Vector3 in ROS coordinates
   *
   * returns Babylon Vector3 vector in World coordinates
   */
  static forwardCoordinates(x) {
    /**
     * computes RS\eta + p = x
     */
    const quaternion = ROS_ORIGIN.quaternion;
    const rotationMatrix = Util3d.getRotationMatrix({
      rotationQuaternion: new Quaternion(
        quaternion[1],
        quaternion[2],
        quaternion[3],
        quaternion[0]
      )
    });
    const scaling = Vec3.of(ROS_ORIGIN.scaling);
    const pos = Vec3.of(ROS_ORIGIN.position);
    const result = rotationMatrix
      .prodVec(scaling.mul(Vec3.ofBabylon(x)))
      .add(pos);
    return result.map(z => (Math.abs(z) < 1e-5 ? 0 : z)).toBabylon();
  }
}

export default GlobalRef;
