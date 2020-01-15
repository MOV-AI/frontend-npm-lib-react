import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import MouseAction from "./MouseAction";
import React from "react";
import { Vector3 } from "babylonjs";

class DragObjectsAction extends MouseAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "dragObject";
    this.name = "Drag Objects";
    this.maybeSelectedMesh = Maybe.none();
    this.icon = props => <i className="fas fa-mouse-pointer" {...props}></i>;
    instance = this;
  }

  static getInstace() {
    return new DragObjectsAction();
  }

  setProperties = (parentView, name) => {
    parentView.getNodeFromTree(name).forEach(node => {
      parentView.setProperties(node.item.toForm());
    });
  };

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const camera = memory.camera;
      this.maybeSelectedMesh = Util3d.pickMesh(scene, ground);
      this.maybeSelectedMesh.forEach(currentMesh => {
        currentMesh.onClick
          ? currentMesh.onClick()
          : parentView.closeContextDial();
        parentView.addGizmo(currentMesh.name);
        parentView.highlightNodeInTree(currentMesh.name);
        parentView.highlightNodeInScene(currentMesh.name);
        this.setProperties(parentView, currentMesh.name);
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
        this.maybeSelectedMesh.forEach(selectedMesh => {
          const currentLocal = Util3d.computeLocalCoordinateFromMesh(
            selectedMesh,
            new Vec3([current.x, current.y, current.z])
          );
          selectedMesh.position = new Vector3(
            currentLocal.getX(),
            currentLocal.getY(),
            selectedMesh.position.z
          );
          this.notifyObservers(selectedMesh, false);
        });
      });
    });
  };

  onPointerUp = parentView => {
    parentView.getSceneMemory().forEach(memory => {
      const camera = memory.camera;
      this.maybeSelectedMesh.forEach(selectedMesh => {
        this.notifyObservers(selectedMesh);
        this.setProperties(parentView, selectedMesh.name);
        parentView.updateNodeInServer(selectedMesh.name);
      });
      this.maybeSelectedMesh = Maybe.none();
      camera.attachControl(memory.canvas, true);
    });
  };

  notifyObservers(mesh, is2updateServer = true) {
    Maybe.fromNull(mesh.observers).forEach(obs =>
      obs.notifyObservers({
        updatedPointMesh: mesh,
        is2updateServer: is2updateServer
      })
    );
  }
}

let instance = null;

export default DragObjectsAction;
