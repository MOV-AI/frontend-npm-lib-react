import * as BABYLON from "babylonjs";

class PositionalLightBuilder {
  constructor(scene) {
    this._scene = scene;
    this._position = null;
    this._name = `light${Math.floor(Math.random() * 1e3)}`;
    this._intensity = 1;
  }

  position(position) {
    this._position = position;
    return this;
  }

  name(name) {
    this._name = name;
    return this;
  }

  intensity(intensity) {
    this._intensity = intensity;
    return this;
  }

  build() {
    const variables = Object.values(this);
    variables.forEach(x => {
      if (x === null)
        throw `There are missing variables to build a light, e.g ${x}`;
    });
    const light = new BABYLON.PointLight(
      this._name,
      this._position,
      this._scene
    );
    light.intensity = this._intensity;
    return light;
  }
}

export default PositionalLightBuilder;
