import * as BABYLON from "babylonjs";

class ReferentialBuilder {
  constructor(scene) {
    this._scene = scene;
    this._name = `referential${Math.floor(Math.random() * 1e3)}`;
    this._isPickable = true;
    this._boxParams = { isVisible: true, size: 0.25 };
    this._size = 1;
  }

  name(name) {
    this._name = name;
    return this;
  }

  isPickable(isPickable) {
    this._isPickable = isPickable;
    return this;
  }

  boxParams(boxParams) {
    this._boxParams = boxParams;
    return this;
  }

  size(size) {
    this._size = size;
    return this;
  }

  build() {
    const size = this._size;
    const axisX = BABYLON.Mesh.CreateLines(
      `axisX${this._name}`,
      [
        new BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this._scene
    );
    axisX.color = new BABYLON.Color3(1, 0, 0);
    axisX.isPickable = false;
    const axisY = BABYLON.Mesh.CreateLines(
      `axisY${this._name}`,
      [
        new BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
      ],
      this._scene
    );
    axisY.color = new BABYLON.Color3(0, 1, 0);
    axisY.isPickable = false;
    const axisZ = BABYLON.Mesh.CreateLines(
      `axisZ${this._name}`,
      [
        new BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
      ],
      this._scene
    );
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    axisZ.isPickable = false;

    const localOrigin = BABYLON.MeshBuilder.CreateBox(
      this._name,
      { size: this._boxParams.size },
      this._scene
    );
    localOrigin.isVisible = this._boxParams.isVisible;
    localOrigin.isPickable = this._isPickable;

    axisX.parent = localOrigin;
    axisY.parent = localOrigin;
    axisZ.parent = localOrigin;

    return localOrigin;
  }
}

export default ReferentialBuilder;
