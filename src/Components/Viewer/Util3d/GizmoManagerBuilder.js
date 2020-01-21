import * as BABYLON from "babylonjs";

class GizmoManagerBuilder {
  constructor(scene) {
    this._scene = scene;
    this._isPosition = false;
    this._isRotation = false;
    this._isBoundingBox = false;
    this._isScale = false;
    this._usePointerToAttachGizmos = false;
  }

  isPosition(v) {
    this._isPosition = v;
    return this;
  }

  isRotation(v) {
    this._isRotation = v;
    return this;
  }

  isBoundingBox(v) {
    this._isBoundingBox = v;
    return this;
  }

  isScale(v) {
    this._isScale = v;
    return this;
  }

  usePointerToAttachGizmos(v) {
    this._usePointerToAttachGizmos = v;
    return this;
  }

  build() {
    const gizmoManager = new BABYLON.GizmoManager(this._scene);
    gizmoManager.positionGizmoEnabled = this._isPosition;
    gizmoManager.rotationGizmoEnabled = this._isRotation;
    gizmoManager.boundingBoxGizmoEnabled = this._isBoundingBox;
    gizmoManager.scaleGizmoEnabled = this._isScale;
    gizmoManager.usePointerToAttachGizmos = this._usePointerToAttachGizmos;
    return gizmoManager;
  }
}

export default GizmoManagerBuilder;
