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
    this.icon = props => <i className="fas fa-ruler" {...props}></i>;
    this.ruler = []; // can only have two elements, start point and end point
    this.rulerMesh = null;
    this.advancedTexture = null;
    this.text = null;
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onChange = parentView => {
    this.resetMeasure(parentView);
  };

  onPointerDown = (evt, parentView) => {
    if (evt.button !== 0) {
      return;
    }
    parentView.getSceneMemory().forEach(({ scene, ground, camera, canvas }) => {
      Util3d.getGroundPosition(scene, ground).forEach(current => {
        const currentMousePos = Util3d.toGlobalCoord(parentView)(current);
        this.ruler.push(currentMousePos);
        if (this.ruler.length > 2) {
          this.resetMeasure(parentView);
        } else if (this.ruler.length === 2) {
          // remove temp mesh
          this.rulerMesh && this.rulerMesh.dispose();
          this.rulerMesh = this.createRulerMesh(this.ruler, scene, parentView);
          this.addTextGUI(
            scene,
            this.calculateDistance(this.ruler[0], currentMousePos),
            evt
          );
          camera.attachControl(canvas, true);
        } else {
          camera.detachControl(canvas);
        }
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    parentView.getSceneMemory().forEach(({ scene, ground }) => {
      Util3d.getGroundPosition(scene, ground).forEach(current => {
        const currentMousePos = Util3d.toGlobalCoord(parentView)(current);
        // If the user pressed the mouse wheel or is rotating the view, it will delete the ruler
        if (
          this.ruler.length >= 2 &&
          (evt.buttons === 4 || evt.pressure === 0.5)
        ) {
          this.resetMeasure(parentView);
        }
        // Fixed one point so display the ruler real time
        if (this.ruler.length === 1) {
          // Remove previous element from Mesh to not overlap
          this.rulerMesh && this.rulerMesh.dispose();
          this.rulerMesh = this.createRulerMesh(
            [this.ruler[0], currentMousePos],
            scene,
            parentView
          );
          this.addTextGUI(
            scene,
            this.calculateDistance(this.ruler[0], currentMousePos),
            evt
          );
        }
      });
    });
  };

  onPointerUp = (evt, parentView) => {};

  onWheel = (evt, parentView) => {
    if (Math.abs(evt.deltaY) > 0) {
      this.resetMeasure(parentView);
    }
  };

  // Calculate 2D distance from starting of ruler to the end of ruler
  calculateDistance = (start, end) => {
    const startVec = Vec2.ofBabylon(start);
    const endVec = Vec2.ofBabylon(end);
    return startVec.sub(endVec).length().toFixed(3);
  };

  addTextGUI = function (scene, value, evt) {
    // TODO: maybe should use mouse coordinates  advanced texture from mainView
    if (!this.advancedTexture) {
      this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
        "UI Ruler",
        true,
        scene
      );
    }
    this.text && this.advancedTexture.removeControl(this.text);
    this.text = new TextBlock();
    this.text.text = `${value}m`;
    this.text.fontSize = 17;
    this.text.left = scene.pointerX - evt.target.width / 2 + 20;
    this.text.top = scene.pointerY - evt.target.height / 2 + 20;
    this.text.color = "white";
    this.advancedTexture.addControl(this.text);
  };

  resetMeasure(parentView) {
    this.rulerMesh && this.rulerMesh.dispose();
    this.text && this.text.dispose();
    this.ruler = [];
    parentView &&
      parentView.getSceneMemory().forEach(({ camera, canvas }) => {
        camera.attachControl(canvas, true);
      });
  }

  createRulerMesh(points, scene, parentView) {
    const rulerMesh = MeshBuilder.CreateLines(
      "ruler",
      {
        points: points,
        updatable: true
      },
      scene
    );
    const rootMesh = parentView.getRootNode().item.mesh;
    rulerMesh.parent = rootMesh;
    return rulerMesh;
  }
}

export default MeasureAction;
