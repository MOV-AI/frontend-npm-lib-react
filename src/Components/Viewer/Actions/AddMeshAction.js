import Action from "./Action";
import React from "react";
import { ACTIONS } from "../MainView/MainViewActions";
import MeshLoader from "../Utils/MeshLoader";
import { Maybe } from "monet";
import Mesh from "../NodeItem/Mesh";
import { Vector3, Quaternion, Color3, StandardMaterial } from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";

//
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
    parentView.setSelectedAction(ACTIONS().dragObjects);
  }

  addMesh = parentView => {
    parentView.getSceneMemory().forEach(memory => {
      const { scene } = memory;
      const actionMemoryClone = { ...this.memory };
      const isImport = this.getIsImport(actionMemoryClone);
      const finalName = this.getFinalNameFromMemory(
        actionMemoryClone,
        isImport
      );
      if (isImport) {
        this.loadMesh(
          parentView,
          scene,
          actionMemoryClone,
          isImport,
          finalName
        );
      } else {
        parentView
          .getUndoManager()
          .doIt(
            this.getUndoAbleAction(
              parentView,
              scene,
              actionMemoryClone,
              isImport,
              finalName
            )
          );
      }
    });
    this.memory["isImport"] = false;
  };

  getIsImport(memory) {
    return ofNull(memory["isImport"]).orSome(false);
  }

  getFinalNameFromMemory(memory, isImport) {
    return ofNull(memory["nodeItemDict"])
      .flatMap(d => (isImport ? some(d.name) : none()))
      .orSome(`${this.name}${Math.floor(Math.random() * 100)}`);
  }

  getUndoAbleAction(parentView, scene, actionMemory, isImport, finalName) {
    return UndoManager.actionBuilder()
      .doAction(() => {
        this.loadMesh(parentView, scene, actionMemory, isImport, finalName);
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        parentView.deleteNodeFromTreeUsingName(finalName, is2UpdateInServer);
      })
      .build();
  }

  loadMesh(parentView, scene, actionMemory, isImport, finalName) {
    MeshLoader.of(scene)
      .load(this.key)
      .then(this.transformMesh(parentView, scene, actionMemory, isImport))
      .then(this.addMesh2Scene(parentView, actionMemory, isImport, finalName));
  }

  transformMesh = (parentView, scene, actionMemory, isImport) => mesh => {
    const parentMesh = this.getParentMesh(parentView);
    mesh.parent = parentMesh;
    mesh.createNormals();
    const maybeDict = ofNull(actionMemory["nodeItemDict"]);
    mesh.position = maybeDict
      .flatMap(d => (isImport ? some(d.position) : none()))
      .map(Vector3.FromArray)
      .orSome(Vector3.Zero());
    mesh.rotationQuaternion = maybeDict
      .flatMap(d => (isImport ? some(d.quaternion) : none()))
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
      .flatMap(d => (isImport ? some(d.color) : none()))
      .map(Color3.FromArray)
      .orSome(Color3.Gray());
    material.diffuseColor = color;
    material.emissiveColor = color;
    mesh.material = material;
    return mesh;
  };

  addMesh2Scene = (parentView, actionMemory, isImport, finalName) => mesh => {
    const parentMesh = this.getParentMesh(parentView);
    mesh.name = finalName;
    const meshItem = new Mesh(
      mesh,
      this.name,
      ofNull(actionMemory["nodeItemDict"])
        .flatMap(x => (isImport ? some(x.keyValueMap) : none()))
        .orSome({})
    );

    parentView.addNodeItem2Tree(meshItem, parentMesh.name, !isImport);
    parentView.renderMenus();
  };

  getParentMesh = parentView => {
    return ofNull(this.memory["parentObj"])
      .map(parentObj => parentObj.parent)
      .flatMap(parentName => parentView.getNodeFromTree(parentName))
      .map(treeNode => treeNode.item.mesh)
      .orSome(parentView.getRootNode().item.mesh);
  };

  getType = () => AddMeshAction.TYPE;
  static TYPE = "AddMeshAction";

  deleteAsset = () => {};

  download = async () => {};
}

const ofNull = Maybe.fromNull;
const none = Maybe.none;
const some = Maybe.some;
export default AddMeshAction;
