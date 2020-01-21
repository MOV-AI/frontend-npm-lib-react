import * as BABYLON from "babylonjs";

class DirectionalLightBuilder {
  constructor(scene) {
    this._scene = scene;
    this._direction = null;
    this._name = `Dlight${Math.floor(Math.random() * 1e3)}`;
    this._intensity = 1;
  }

  direction(direction) {
    this._direction = direction;
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
    const light = new BABYLON.DirectionalLight(
      this._name,
      this._direction.normalize(),
      this._scene
    );
    light.intensity = this._intensity;
    return light;
  }
}

export default DirectionalLightBuilder;
