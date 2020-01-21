import NodeItem from "./NodeItem";
import Vec3 from "../Math/Vec3";
import Util3d from "../Util3d/Util3d";
import * as BABYLON from "babylonjs";
import { Maybe } from "monet";
import { Quaternion } from "babylonjs";

// ROS/RVIZ default referential
const THETA = -Math.PI / 2;
const ROS_ORIGIN = {
  position: [0, 0, 0],
  scaling: [1, -1, 1],
  quaternion: [Math.cos(THETA / 2), Math.sin(THETA / 2), 0, 0]
};

class GlobalRef extends NodeItem {
  // this class can't be a singleton, because of Babylonjs's strange behaviour
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
    const rosOrigin = BABYLON.MeshBuilder.CreateBox(
      "ROS_ORIGIN",
      { size: 1e-3 },
      scene
    );
    rosOrigin.isVisible = false;
    rosOrigin.isPickable = false;
    rosOrigin.position = Vec3.of(ROS_ORIGIN.position).toBabylon();
    rosOrigin.scaling = Vec3.of(ROS_ORIGIN.scaling).toBabylon();
    const quaternion = new BABYLON.Quaternion(
      ROS_ORIGIN.quaternion[1],
      ROS_ORIGIN.quaternion[2],
      ROS_ORIGIN.quaternion[3],
      ROS_ORIGIN.quaternion[0]
    );
    rosOrigin.rotationQuaternion = quaternion.normalize();
    return rosOrigin;
  }

  static inverseCoord(x) {
    /**
     * Solves RS\eta + p = x
     *
     * \eta = S^(⁻1)R^T(x-p)
     */
    const quaternion = ROS_ORIGIN.quaternion;
    const rmatrix = Util3d.getRotationMatrix({
      rotationQuaternion: new Quaternion(
        quaternion[1],
        quaternion[2],
        quaternion[3],
        quaternion[0]
      )
    });
    const scaling = Vec3.of(ROS_ORIGIN.scaling).map(x => 1 / x);
    const pos = Vec3.of(ROS_ORIGIN.position);
    const result = scaling.mul(rmatrix.dotVec(Vec3.ofBabylon(x).sub(pos)));
    return result.map(x => (Math.abs(x) < 1e-5 ? 0 : x)).toBabylon();
  }
}

export default GlobalRef;
