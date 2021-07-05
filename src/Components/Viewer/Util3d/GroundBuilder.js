import {
  Mesh,
  Vector3,
  StandardMaterial,
  Texture,
  Space
} from "@babylonjs/core";

class GroundBuilder {
  constructor(scene) {
    this._scene = scene;
    this._name = `camera${Math.floor(Math.random() * 1e3)}`;
    this._width = 1;
    this._height = 1;
    this._textureSrc = null;
    this._isPickable = false;
  }

  name(name) {
    this._name = name;
    return this;
  }

  width(width) {
    this._width = width;
    return this;
  }

  height(height) {
    this._height = height;
    return this;
  }

  textureSrc(textureSrc) {
    this._textureSrc = textureSrc;
    return this;
  }

  isPickable(isPickable) {
    this._isPickable = isPickable;
    return this;
  }

  build() {
    const ground = Mesh.CreateGround(
      this._name,
      this._width,
      this._height,
      1,
      this._scene
    );
    ground.translate(new Vector3(0, -1, 0), 1e-1, Space.WORLD);
    if (this._textureSrc) {
      ground.material = new StandardMaterial(
        `Texture${this._name}`,
        this._scene
      );
      ground.material.ambientTexture = new Texture(
        this._textureSrc,
        this._scene
      );
      ground.material.ambientTexture.uScale = 1;
      ground.material.ambientTexture.vScale = 1;
    }
    ground.isPickable = this._isPickable;
    return ground;
  }
}

export default GroundBuilder;
