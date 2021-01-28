import { ArcRotateCamera } from "@babylonjs/core";

class CameraBuilder {
  constructor(scene) {
    this._scene = scene;
    this._sphericalCoordinates = null;
    this._target = null;
    this._name = `camera${Math.floor(Math.random() * 1e3)}`;
  }

  name(name) {
    this._name = name;
    return this;
  }

  sphericalCoordinates(sphericalCoordinates) {
    this._sphericalCoordinates = sphericalCoordinates;
    return this;
  }

  target(target) {
    this._target = target;
    return this;
  }

  build() {
    const variables = Object.values(this);
    variables.forEach(x => {
      if (x === null)
        throw new Error(
          `There are missing variables to build a camera, e.g ${x}`
        );
    });
    return new ArcRotateCamera(
      this._name,
      this._sphericalCoordinates.x,
      this._sphericalCoordinates.y,
      this._sphericalCoordinates.z,
      this._target,
      this._scene
    );
  }
}

export default CameraBuilder;
