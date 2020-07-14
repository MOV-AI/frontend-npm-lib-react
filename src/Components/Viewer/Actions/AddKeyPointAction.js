import Util3d from "../Util3d/Util3d";
import KeyPoint from "../NodeItem/KeyPoint";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import React from "react";
import MouseKeysAction from "./MouseKeysAction";
import { Color3, Axis } from "@babylonjs/core";

let instance = null;

const TEMP_KEY_POINT_NAME = "temp_key_point";

class AddKeyPointAction extends MouseKeysAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "addKeyPoint";
    this.name = "Add Key Point [K]";
    this.maybeMousePos = Maybe.none();
    this.tempMesh = null;
    this.icon = props => <i className="fas fa-map-marker" {...props}></i>;
    instance = this;
  }

  static getInstance() {
    return new AddKeyPointAction();
  }

  createKeyPoint = (
    position,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = Color3.Gray()
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const keyPoint = KeyPoint.ofDict(scene, {
      name: name,
      color: [color.r, color.g, color.b]
    });
    const mesh = keyPoint.mesh;
    mesh.parent = rootMesh;

    const localPosition = Util3d.computeLocalCoordinatesFromMesh(
      { parent: rootMesh },
      Vec3.ofBabylon(position)
    ).toBabylon();

    mesh.setPositionWithLocalVector(
      localPosition.add(Axis.Z.scale(KeyPoint.DEFAULT_SIZE))
    );

    if (is2addInServer) {
      parentView.addNodeItem2Tree(keyPoint, rootMesh.name, is2addInServer);
    }
    return mesh;
  };

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (evt.button !== 0) {
      return;
    }
    parentView.getSceneMemory().forEach(memory => {
      const { scene, ground, camera } = memory;
      this.maybeMousePos = Util3d.getGroundPosition(scene, ground);
      this.maybeMousePos.forEach(mousePos => {
        camera.detachControl(memory.canvas);
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(current => {
        this.maybeMousePos.forEach(oldMousePos => {
          if (this.tempMesh) this.tempMesh.dispose();
          this.tempMesh = this.createKeyPoint(
            current,
            TEMP_KEY_POINT_NAME,
            scene,
            parentView,
            false
          );
        });
      });
    });
  };

  onPointerUp = parentView => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const camera = memory.camera;
      const ground = memory.ground;
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(current => {
        this.maybeMousePos.forEach(oldMousePos => {
          if (this.tempMesh) this.tempMesh.dispose();
          const name = `KeyPoint${Math.floor(Math.random() * 1e3)}`;
          this.createKeyPoint(
            current,
            name,
            scene,
            parentView,
            true,
            new Color3(Math.random(), Math.random(), Math.random())
          );
          parentView.setPropertiesWithName(name);
        });
      });
      this.maybeMousePos = Maybe.none();
      camera.attachControl(memory.canvas, true);
    });
  };
}

export default AddKeyPointAction;
