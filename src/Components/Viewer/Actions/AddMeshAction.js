import Action from "./Action";
import React from "react";
import { MasterDB } from "mov.ai-core";
import Constants from "../Utils/Constants";
import { ACTIONS } from "../MainView/MainViewActions";
import MeshLoader from "../Utils/MeshLoader";
import { Maybe } from "monet";
import Mesh from "../NodeItem/Mesh";
import { Vector3, Quaternion, Color3, StandardMaterial } from "@babylonjs/core";

class AddMeshAction extends Action {
  constructor(mesh) {
    super();
    this.key = mesh.id;
    this.name = mesh.name;
    this.icon = props => <i {...props} className="fas fa-draw-polygon"></i>;
  }

  action(parentView) {
    super.action(parentView);
    console.log(`Mesh ${this.key} : ${this.name}`, this.memory);
    this.addMesh(parentView);
    parentView.setSelectedAction(ACTIONS.dragObjects);
  }

  addMesh = parentView => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const actionMemoryClone = { ...this.memory };
      MeshLoader.of(scene)
        .load(this.key)
        .then(this.transformMesh(parentView, scene, actionMemoryClone))
        .then(this.addMesh2Scene(parentView, scene, actionMemoryClone));
    });
    this.memory["isImport"] = false;
  };

  transformMesh = (parentView, scene, memory) => mesh => {
    const parentMesh = this.getParentMesh(parentView);
    mesh.parent = parentMesh;
    mesh.createNormals();
    const isImport = Maybe.fromNull(memory["isImport"]).orSome(false);
    const maybeDict = Maybe.fromNull(memory["nodeItemDict"]);
    mesh.position = maybeDict
      .flatMap(d => (isImport ? Maybe.some(d.position) : Maybe.none()))
      .map(Vector3.FromArray)
      .orSome(Vector3.Zero());
    mesh.rotationQuaternion = maybeDict
      .flatMap(d => (isImport ? Maybe.some(d.quaternion) : Maybe.none()))
      .map(
        quaternion =>
          new Quaternion(
            quaternion[1],
            quaternion[2],
            quaternion[3],
            quaternion[0]
          )
      )
      .orSome(Quaternion.Identity());
    const material = new StandardMaterial(`Mesh${mesh.name}`, scene);
    const color = maybeDict
      .flatMap(d => (isImport ? Maybe.some(d.color) : Maybe.none()))
      .map(Color3.FromArray)
      .orSome(Color3.Gray());
    material.diffuseColor = color;
    material.emissiveColor = color;
    mesh.material = material;
    return mesh;
  };

  addMesh2Scene = (parentView, scene, memory) => mesh => {
    const parentMesh = this.getParentMesh(parentView);
    const isImport = Maybe.fromNull(memory["isImport"]).orSome(false);
    const finalName = Maybe.fromNull(memory["nodeItemDict"])
      .flatMap(d => (isImport ? Maybe.some(d.name) : Maybe.none()))
      .orSome(`${this.name}${Math.floor(Math.random() * 100)}`);
    mesh.name = finalName;

    const meshItem = new Mesh(
      mesh,
      this.name,
      Maybe.fromNull(memory["nodeItemDict"])
        .flatMap(x => (isImport ? Maybe.some(x.keyValueMap) : Maybe.none()))
        .orSome({})
    );

    parentView.addNodeItem2Tree(meshItem, parentMesh.name, !isImport);
    parentView.renderMenus();
  };

  getParentMesh = parentView => {
    return Maybe.fromNull(this.memory["parentObj"])
      .map(parentObj => parentObj.parent)
      .flatMap(parentName => parentView.getNodeFromTree(parentName))
      .map(treeNode => treeNode.item.mesh)
      .orSome(parentView.getRootNode().item.mesh);
  };

  getType = () => AddMeshAction.TYPE;
  static TYPE = "AddMeshAction";

  deleteAsset = () => {};

  download = async () => {
    const downloadLinks = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "5px" }}>Mesh:</div>
          <a href={MeshLoader.getMeshUrl(this.key)} download>
            {this.key}
          </a>
        </div>
      </div>
    );
  };
}

export default AddMeshAction;
