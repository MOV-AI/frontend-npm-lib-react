import { Mesh, Vector3, Color3, MeshBuilder } from "@babylonjs/core";
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
    const axisX = Mesh.CreateLines(
      `axisX${this._name}`,
      [
        new Vector3.Zero(),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0),
        new Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this._scene
    );
    axisX.color = new Color3(1, 0, 0);
    axisX.isPickable = false;
    const axisY = Mesh.CreateLines(
      `axisY${this._name}`,
      [
        new Vector3.Zero(),
        new Vector3(0, size, 0),
        new Vector3(-0.05 * size, size * 0.95, 0),
        new Vector3(0, size, 0),
        new Vector3(0.05 * size, size * 0.95, 0)
      ],
      this._scene
    );
    axisY.color = new Color3(0, 1, 0);
    axisY.isPickable = false;
    const axisZ = Mesh.CreateLines(
      `axisZ${this._name}`,
      [
        new Vector3.Zero(),
        new Vector3(0, 0, size),
        new Vector3(0, -0.05 * size, size * 0.95),
        new Vector3(0, 0, size),
        new Vector3(0, 0.05 * size, size * 0.95)
      ],
      this._scene
    );
    axisZ.color = new Color3(0, 0, 1);
    axisZ.isPickable = false;

    const localOrigin = MeshBuilder.CreateBox(
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
