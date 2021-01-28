import Util3d from "../Util3d/Util3d";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { MeshBuilder } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui/2D";
import Vec2 from "../Math/Vec2";

class MeasureAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "drawWall";
    this.name = "Measure [7]";
    this.ruler = []; // can only have to elements, start point and end point
    this.tempMesh = null;
    this.mesh = null;
    this.advancedTexture = null;
    this.text = null;
    this.icon = props => <i className="fas fa-ruler" {...props}></i>;
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
      const scene = memory.scene;
      const ground = memory.ground;

      Util3d.getGroundPosition(scene, ground).forEach(current => {
        const currentMousePos = Util3d.toGlobalCoord(parentView)(current);
        this.ruler.push(currentMousePos);
        if (this.ruler.length > 2) {
          this.mesh && this.mesh.dispose();
          this.tempMesh && this.tempMesh.dispose();
          this.text && this.text.dispose();
          this.ruler = [];
        }
        if (this.ruler.length === 2) {
          this.mesh = MeshBuilder.CreateLines(
            "ruler",
            {
              points: this.ruler,
              updatable: true
            },
            scene
          );

          this.addTextGUI(
            scene,
            this.calculateDistance(this.ruler[0], currentMousePos),
            evt
          );

          const rootMesh = parentView.getRootNode().item.mesh;
          this.mesh.parent = rootMesh;
        }
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;

      Util3d.getGroundPosition(scene, ground).forEach(current => {
        const currentMousePos = Util3d.toGlobalCoord(parentView)(current);
        // Don't add more than two point to the ruler
        if (this.ruler.length === 1) {
          // Remove previous element from Mesh to not overlap
          this.tempMesh && this.tempMesh.dispose();

          this.tempMesh = MeshBuilder.CreateLines(
            "ruler",
            {
              points: [this.ruler[0], currentMousePos],
              updatable: true
            },
            scene
          );

          this.addTextGUI(
            scene,
            this.calculateDistance(this.ruler[0], currentMousePos),
            evt
          );

          const rootMesh = parentView.getRootNode().item.mesh;
          this.tempMesh.parent = rootMesh;
        }
      });
    });
  };

  onPointerUp = (evt, parentView) => {};

  // Calculate 2D distance from starting of ruler to the end of ruler
  calculateDistance = (start, end) => {
    const startVec = Vec2.ofBabylon(start);
    const endVec = Vec2.ofBabylon(end);
    return startVec.sub(endVec).length().toFixed(3);
  };

  addTextGUI = function (scene, value, evt) {
    this.advancedTexture && this.advancedTexture.removeControl(this.text);
    // GUI
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      scene
    );

    this.text = new TextBlock();
    this.text.text = `${value}m`;
    this.text.fontSize = 17;
    this.text.left = scene.pointerX - evt.target.width / 2 + 20;
    this.text.top = scene.pointerY - evt.target.height / 2 + 20;
    this.text.color = "white";
    this.advancedTexture.addControl(this.text);
  };
}

export default MeasureAction;
