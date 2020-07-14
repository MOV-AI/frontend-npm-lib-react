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
import { MasterDB } from "mov.ai-core";
import Constants from "../Utils/Constants";
import MapLoader from "../AssetsManager/MapLoader";

class AddMapAction extends Action {
  constructor(name, mapLoader) {
    super();
    this.name = name;
    this.key = `addMap${name}`;
    this.mapLoader = mapLoader;
    this.icon = props => <i {...props} className="fas fa-map"></i>;
  }

  addMap(parentView) {
    const rootNodeMaybe = Maybe.fromNull(parentView.getRootNode());
    parentView.getSceneMemory().forEach(async memory => {
      const scene = memory.scene;
      const camera = memory.camera;
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

      rootNodeMaybe.forEach(rootNode => {
        const parent = rootNode.item.mesh.parent;
        parent.position = GlobalRef.inverseCoordinates(originPos.toBabylon());
        camera.setTarget(
          new Vector3(parent.position.x, parent.position.y, parent.position.z)
        );
      });

      const map = new Map(
        mesh,
        [width, height],
        this.textureSrc,
        Maybe.fromNull(this.memory["assetName"]).orSome(this.name)
      );

      const is2sendServer = Maybe.fromNull(this.memory["isImport"])
        .map(x => !x)
        .orSome(true);
      parentView.addNodeItem2Tree(map, null, is2sendServer);
      memory.ground.dispose();
      memory.ground = DefaultScene.createMeshGround(scene, width, height);
    });
  }

  action(parentView) {
    super.action(parentView);
    const maybeNode = parentView.getNodeFromTree(this.name);
    maybeNode.forEach(node => {});
    maybeNode.orElseRun(() => {
      if (parentView.getObjectTree().length < 2) {
        return this.addMap(parentView);
      } else {
        // empty
      }
    });
    parentView.setSelectedAction(ACTIONS.orbit);
  }

  getType = () => AddMapAction.TYPE;

  deleteAsset = () => {};

  download = async () => {
    const { textureSrc } = await this.mapLoader.load();
    const { yamlSrc } = this.mapLoader;
    const downloadLinks = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "5px" }}>Image:</div>
          <a href={textureSrc} download>
            {textureSrc}
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "5px" }}>Yaml:</div>
          <a href={MapLoader.getMapUrl(yamlSrc)} download>
            {yamlSrc}
          </a>
        </div>
      </div>
    );
  };

  static TYPE = "AddMapAction";
}

export default AddMapAction;
