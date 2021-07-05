import Util3d from "../Util3d/Util3d";
import KeyPoint from "../NodeItem/KeyPoint";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { Color3, Axis, Vector3 } from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";

class AddKeyPointAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "addKeyPoint";
    this.name = "Add Key Point [4]";
    this.maybeMousePos = Maybe.none();
    this.tempMesh = null;
    this.icon = props => <i className="fas fa-map-marker" {...props}></i>;
  }

  createKeyPoint(
    position,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = Color3.Gray()
  ) {
    const rootMesh = parentView.getRootNode().item.mesh;

    const keyPoint = KeyPoint.ofDict(scene, {
      name: name,
      color: [color.r, color.g, color.b]
    });
    const mesh = keyPoint.mesh;
    mesh.parent = rootMesh;

    const localPosition = Util3d.getLocalCoordFromWorld(
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
  }

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

  onPointerUp = (evt, parentView) => {
    parentView.getSceneMemory().forEach(({ scene, camera, ground, canvas }) => {
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(current => {
        this.maybeMousePos.forEach(oldMousePos => {
          if (this.tempMesh) this.tempMesh.dispose();
          const name = `KeyPoint${Math.floor(Math.random() * 1e3)}`;
          const keyPoint = this.createKeyPoint(
            current,
            name,
            scene,
            parentView,
            true,
            new Color3(Math.random(), Math.random(), Math.random())
          );
          parentView.setPropertiesWithName(name);
          parentView
            .getUndoManager()
            .addIt(this.getUndoAbleAction(keyPoint, scene, parentView));
        });
      });
      this.maybeMousePos = Maybe.none();
      camera.attachControl(canvas, true);
    });
  };

  getUndoAbleAction(mesh, scene, parentView) {
    return UndoManager.actionBuilder()
      .doAction(() => {
        const keyPoint = this.createKeyPoint(
          Vector3.Zero(),
          mesh.name,
          scene,
          parentView,
          true,
          mesh.material.diffuseColor
        );
        keyPoint.position = mesh.position;
        parentView.updateNodeInServer(mesh.name);
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        parentView.deleteNodeFromTreeUsingName(mesh.name, is2UpdateInServer);
      })
      .build();
  }
}

const TEMP_KEY_POINT_NAME = "temp_key_point";
export default AddKeyPointAction;
