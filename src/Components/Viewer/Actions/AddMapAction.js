import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import Action from "./Action";
import Map from "../NodeItem/Map";
import { Maybe } from "monet";
import React from "react";
import MasterComponent from "../../MasterComponent/MasterComponent";
import GlobalRef from "../NodeItem/GlobalRef";
import { Vector3 } from "babylonjs";
import DefaultScene from "../Utils/DefaultScene";
import { ACTIONS } from "../MainView/MainViewActions";
import MasterDB from "../../../api/MasterDB";
import Constants from "../Utils/Constants";

class AddMapAction extends Action {
  constructor(name, textureSrc, resolution, origin, imageSize) {
    super();
    this.name = name;
    this.key = `addMap${name}`;
    this.textureSrc = textureSrc;
    this.resolution = resolution;
    this.origin = origin;
    this.imageSize = imageSize;
    this.icon = props => <i {...props} className="fas fa-map"></i>;
  }

  getSensibilityFromArea(area) {
    return expModel(area);
  }

  addMap(parentView) {
    const rootNodeMaybe = Maybe.fromNull(parentView.getRootNode());
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const camera = memory.camera;

      const width = this.resolution * this.imageSize[0];
      const height = this.resolution * this.imageSize[1];
      const mesh = Util3d.groundBuilder(scene)
        .name(Maybe.fromNull(this.memory["name"]).orSome(this.name))
        .width(width)
        .height(height)
        .textureSrc(this.textureSrc)
        .build();

      const origin = Vec3.of([-width / 2, -height / 2, 0]).sub(
        Vec3.of(this.origin)
      );

      // hack needed for the import
      const is2sendServer = this.memory["parentObj"] == null;
      this.memory["parentObj"] = null;
      rootNodeMaybe.forEach(rootNode => {
        const parent = rootNode.item.mesh.parent;
        parent.position = GlobalRef.inverseCoord(origin.toBabylon());
        camera.setTarget(
          new Vector3(parent.position.x, parent.position.y, parent.position.z)
        );
      });

      camera.panningSensibility = this.getSensibilityFromArea(width * height);
      console.log(
        `Panning Sensibility: width(${width}) height(${height}) Area(${width *
          height}) Sensibility(${camera.panningSensibility})`
      );
      const map = new Map(
        mesh,
        [width, height],
        this.textureSrc,
        Maybe.fromNull(this.memory["assetName"]).orSome(this.name)
      );

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
        const oldMapName = parentView.getObjectTree()[1].title;
        MasterComponent.confirmAlert(
          "Switch Maps",
          `Do you want to replace ${oldMapName} by ${this.name}`,
          () => {
            parentView.deleteNodeFromTreeUsingName(oldMapName);
            this.addMap(parentView);
          },
          () => {
            /* Empty */
          },
          "Switch Maps"
        );
      }
    });
    parentView.setSelectedAction(ACTIONS.dragObjects);
  }

  getType = () => AddMapAction.TYPE;

  deleteAsset = () => {
    MasterComponent.confirmAlert(
      "Confirm to delete",
      `Are you sure you want to delete ${this.name}?`,
      () => {
        MasterDB.cloudFunction(
          Constants.CLOUD_FUNCTION_NAME,
          "deleteMap",
          this.name,
          data => {
            console.log("Delete Maps", data);
            MasterComponent.alert(`Map ${this.name} was deleted`);
          }
        );
      }
    );
  };

  static TYPE = "AddMapAction";
}

const linearModel = a => {
  const points = [
    [400, 1000],
    [50000, 100]
  ];
  const m = (points[1][1] - points[0][1]) / (points[1][0] - points[0][0]);
  return points[0][1] + m * (a - points[0][0]);
};
const expModel = a => 1018.74 * Math.exp(-4.64231e-5 * a);

export default AddMapAction;
