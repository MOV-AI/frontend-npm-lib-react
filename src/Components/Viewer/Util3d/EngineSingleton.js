import { Engine } from "@babylonjs/core";

/**
 * Engine singleton
 */
export default class EngineSingleton {
  constructor(canvas) {
    if (EngineSingleton.instance) {
      const { engine } = EngineSingleton.instance;
      engine.inputElement = canvas;
      engine.registerView(canvas);
      return EngineSingleton.instance;
    }
    EngineSingleton.instance = this;
    this._engine = new Engine(document.createElement("canvas"), true);
    this._engine.inputElement = canvas;
    this._engine.registerView(canvas);
  }

  /**
   *  get engine
   */
  get engine() {
    return this._engine;
  }
}
