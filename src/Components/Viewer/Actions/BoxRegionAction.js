import { Maybe } from "monet";
import MouseAction from "./MouseAction";
import BoxRegion from "../NodeItem/BoxRegion";
import Vec3 from "../Math/Vec3";
import * as BABYLON from "babylonjs";
import Util3d from "../Util3d/Util3d";
import React from "react";

let instance = null;

const TEMP_BOX_REGION_NAME = "temp_box_region";

class BoxRegionAction extends MouseAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "drawBoxRegion";
    this.name = "Draw Box Region";
    this.maybeMousePos = Maybe.none();
    this.tempMesh = null;
    this.icon = props => <i className="fas fa-square" {...props} />;
    instance = this;
  }

  static getInstace() {
    return new BoxRegionAction();
  }

  createBoxRegion = (
    region,
    name,
    scene,
    parentView,
    is2addInServer = true,
    color = BABYLON.Color3.Red(),
    height = 1
  ) => {
    const rootMesh = parentView.getRootNode().item.mesh;

    const localRegion = region.map(r =>
      Util3d.computeLocalCoordinateFromMesh(
        { parent: rootMesh },
        Vec3.ofBabylon(r)
      )
    );

    localRegion[1] = localRegion[1].add(Vec3.of([0, 0, height]));
    const middlePoint = localRegion[0].add(localRegion[1]).scale(0.5);
    const centeredRegion = localRegion.map(r => r.sub(middlePoint));

    const boxRegionItem = BoxRegion.ofDict(
      scene,
      {
        name: name,
        position: middlePoint.toArray(),
        color: [color.r, color.g, color.b],
        corners: centeredRegion.map(x => x.toArray())
      },
      parentView
    );
    boxRegionItem.mesh.parent = rootMesh;
    if (is2addInServer) {
      parentView.addNodeItem2Tree(boxRegionItem, rootMesh.name, is2addInServer);
    }
    return boxRegionItem.mesh;
  };

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const camera = memory.camera;
      const maybeMousePos = Util3d.getGroundPosition(scene, ground);
      this.maybeMousePos = maybeMousePos;
      maybeMousePos.forEach(mousePos => {
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
          this.tempMesh = this.createBoxRegion(
            [oldMousePos, current],
            TEMP_BOX_REGION_NAME,
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
          this.tempMesh.dispose();
          this.createBoxRegion(
            [oldMousePos, current],
            `BoxRegion${Math.floor(Math.random() * 1e3)}`,
            scene,
            parentView,
            true
          );
        });
      });
      this.maybeMousePos = Maybe.none();
      camera.attachControl(memory.canvas, true);
    });
  };
}

export default BoxRegionAction;