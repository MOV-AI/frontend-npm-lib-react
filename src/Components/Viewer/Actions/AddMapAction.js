import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import Action from "./Action";
import Map from "../NodeItem/Map";
import { Maybe } from "monet";
import React from "react";
import GlobalRef from "../NodeItem/GlobalRef";
import { Vector3 } from "@babylonjs/core";
import DefaultScene from "../Utils/DefaultScene";
import { ACTIONS } from "../MainView/MainViewActions";
import { UndoManager } from "@mov-ai/mov-fe-lib-core";
import AssetsManager from "../AssetsManager/AssetsManager";

class AddMapAction extends Action {
  constructor(name, mapLoader) {
    super();
    this.name = name;
    this.key = `addMap${name}`;
    this.mapLoader = mapLoader;
    this.icon = props => <i {...props} className="fas fa-map"></i>;
    this.firstTimeLoad = true;
  }

  addMap(parentView) {
    parentView.getSceneMemory().forEach(async memory => {
      const { scene, camera } = memory;
      const {
        textureSrc,
        resolution,
        origin,
        imageSize
      } = await this.mapLoader.load();

      const width = resolution * imageSize[0];
      const height = resolution * imageSize[1];
      const mesh = Util3d.groundBuilder(scene)
        .name(Maybe.fromNull(this.memory["name"]).orSome(this.name))
        .width(width)
        .height(height)
        .textureSrc(textureSrc)
        .build();

      const originPos = Vec3.of([-width / 2, -height / 2, 0]).sub(
        Vec3.of(origin)
      );

      const rootNode = parentView.getRootNode();
      const parent = rootNode.item.mesh.parent;
      parent.position = GlobalRef.inverseCoordinates(originPos.toBabylon());
      camera.setTarget(
        new Vector3(parent.position.x, parent.position.y, parent.position.z)
      );

      const map = new Map(
        mesh,
        [width, height],
        this.textureSrc,
        Maybe.fromNull(this.memory["assetName"]).orSome(this.name)
      );

      const isVisible = Maybe.fromNull(this.memory["isVisible"]).orSome(true);
      const is2sendServer = Maybe.fromNull(this.memory["isImport"])
        .map(x => !x)
        .orSome(true);

      mesh.setEnabled(isVisible);
      parentView.addNodeItem2Tree(map, null, is2sendServer, isVisible);
      memory.ground.dispose();
      memory.ground = DefaultScene.createMeshGround(scene, width, height);
      this.memory["isImport"] = false;
    });
  }

  action(parentView) {
    super.action(parentView);
    const maybeNode = parentView.getNodeFromTree(this.name);
    maybeNode.orElseRun(() => {
      const isImport = this.memory["isImport"];
      // you shouldn't be able to undo when importing a scene. isImport prevents removing the map when you undo.
      // firstTimeLoad condition to prevent adding a map when fast map switch, TODO: doesn't work
      if (isImport) {
        this.addMap(parentView);
        this.firstTimeLoad = false;
      } else {
        parentView.getUndoManager().doIt(this.getUndoAction(parentView));
      }
    });
    parentView.setSelectedAction(ACTIONS().orbit);
  }

  getUndoAction(parentView) {
    if (parentView.getObjectTree().length < 2) {
      return UndoManager.actionBuilder()
        .doAction(() => {
          this.addMap(parentView);
        })
        .undoAction(({ is2UpdateInServer = true }) => {
          const name = parentView.getObjectTree()[1].title;
          parentView.deleteNodeFromTreeUsingName(name, is2UpdateInServer);
        })
        .build();
    } else {
      const oldMapName = parentView.getObjectTree()[1].title;
      const newMapName = this.name;
      return UndoManager.actionBuilder()
        .doAction(() => {
          this.switchMaps(oldMapName, newMapName, parentView);
        })
        .undoAction(({ is2UpdateInServer = true }) => {
          parentView.deleteNodeFromTreeUsingName(newMapName, is2UpdateInServer);
          Maybe.fromNull(
            AssetsManager.getInstance().getAssetsActionMap()[oldMapName]
          ).forEach(a => a.action(parentView));
        })
        .build();
    }
  }

  switchMaps(oldMapName, newMapName, parentView) {}

  getType = () => AddMapAction.TYPE;

  deleteAsset = () => {};

  download = async () => {};

  static TYPE = "AddMapAction";
}

export default AddMapAction;
