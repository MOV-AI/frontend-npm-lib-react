import Util3d from "../Util3d/Util3d";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import { Vector3 } from "@babylonjs/core";
import { UndoManager } from "mov-fe-lib-core";
import Clipboard from "../Utils/Clipboard";

class DragObjectsAction extends MouseKeysAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "dragObject";
    this.name = "Grab Objects [G]";
    this.icon = props => <i className="fas fa-mouse-pointer" {...props}></i>;
    this.maybeSelectedMesh = Maybe.none();
    this.shiftFromCenterOfMass = Vec3.ZERO;
    this.mousePointInLocal = Vec3.ZERO;
    this.clickPointInLocal = Vec3.ZERO;
    this.undoManager = new UndoManager();
    instance = this;
  }

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1 || evt.buttons === 2)) return;
    parentView.getSceneMemory().forEach(memory => {
      const { scene, ground, camera, canvas } = memory;
      this.maybeSelectedMesh = Util3d.pickMesh(scene, ground);
      this.maybeSelectedMesh.forEach(currentMesh => {
        camera.detachControl(canvas);
        Util3d.getGroundPosition(scene, ground).forEach(groundPosition => {
          const groundPositionInLocalCoordinates = Util3d.computeLocalCoordinatesFromMesh(
            currentMesh,
            Vec3.ofBabylon(groundPosition)
          );

          this.mousePointInLocal = groundPositionInLocalCoordinates;
          this.clickPointInLocal = groundPositionInLocalCoordinates;
          this.shiftFromCenterOfMass = groundPositionInLocalCoordinates.sub(
            Vec3.ofBabylon(currentMesh.position)
          );

          currentMesh.onClick
            ? currentMesh.onClick()
            : parentView.closeContextDial();

          this.handleMeshRightClick(evt, parentView, currentMesh);

          parentView.addGizmo(currentMesh.name);
          parentView.highlightNodeInTree(currentMesh.name);
          parentView.highlightMeshInScene([currentMesh]);
          this.setProperties(parentView, currentMesh.name);
        });
      });
      this.maybeSelectedMesh.orLazy(() =>
        parentView
          .getMouseCoordinatesFromRoot()
          .forEach(mousePosRoot =>
            this.handleRightClickWithoutMesh(evt, parentView, mousePosRoot)
          )
      );
    });
  };

  handleMeshRightClick = (evt, parentView, mesh) => {
    if (!(evt.buttons === 2)) return;
    if (!mesh || !mesh.getMouseContextActions) return;
    parentView.setMouseContextActions(
      evt,
      mesh.getMouseContextActions(parentView)
    );
  };

  /**
   * @param evt: event
   * @param parentView: MainView
   * @param mousePosFromRoot: Vector3
   */
  handleRightClickWithoutMesh = (evt, parentView, mousePosFromRoot) => {
    if (!(evt.buttons === 2)) return;
    parentView.setMouseContextActions(evt, [
      {
        title: "Paste",
        onClick: this.getPasteOnClick(mousePosFromRoot, parentView)
      }
    ]);
  };

  getPasteOnClick = (mousePosFromRoot, parentView) => () => {
    const pasteAction = Clipboard.paste();
    if (pasteAction && typeof pasteAction === "function") {
      pasteAction(mousePosFromRoot, parentView);
    }
  };

  onPointerMove = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    parentView.getSceneMemory().forEach(memory => {
      const { scene, ground } = memory;
      const maybeGroundPosition = Util3d.getGroundPosition(scene, ground);
      maybeGroundPosition.forEach(current => {
        this.maybeSelectedMesh.forEach(selectedMesh => {
          const currentLocal = Util3d.computeLocalCoordinatesFromMesh(
            selectedMesh,
            Vec3.ofBabylon(current)
          );

          const v = currentLocal.sub(this.shiftFromCenterOfMass);
          selectedMesh.position = new Vector3(
            v.getX(),
            v.getY(),
            selectedMesh.position.z
          );
          this.notifyObservers(
            selectedMesh,
            false,
            currentLocal.sub(this.mousePointInLocal)
          );
          this.mousePointInLocal = currentLocal;
        });
      });
    });
  };

  onPointerUp = parentView => {
    parentView.getSceneMemory().forEach(memory => {
      const { camera, scene, ground, canvas } = memory;
      this.maybeSelectedMesh.forEach(selectedMesh => {
        Util3d.getGroundPosition(scene, ground).forEach(groundPos => {
          const groundPosInLocal = Util3d.computeLocalCoordinatesFromMesh(
            selectedMesh,
            Vec3.ofBabylon(groundPos)
          );
          const bigDisplacement = groundPosInLocal.sub(this.clickPointInLocal);
          this.notifyObservers(selectedMesh, true, Vec3.ZERO);
          this.setProperties(parentView, selectedMesh.name);
          parentView.updateNodeInServer(selectedMesh.name);

          this.undoManager.addIt(
            this.getUndoAbleAction(selectedMesh, bigDisplacement, parentView)
          );
        });
      });
      this.maybeSelectedMesh = Maybe.none();
      this.shiftFromCenterOfMass = Vec3.ZERO;
      this.mousePointInLocal = Vec3.ZERO;
      camera.attachControl(canvas, true);
    });
  };

  onKeyDown = (evt, parentView) => {
    const defaultAction = () => super.onKeyDown(evt, parentView);
    const predicateActionList = [
      {
        predicate: e => ["Backspace", "Delete"].includes(e.code),
        action: this.getDeleteButtonAction(parentView)
      },
      {
        predicate: e => e.ctrlKey && !e.shiftKey && e.code === "KeyZ",
        action: () => this.undoManager.undo()
      },
      {
        predicate: e => e.ctrlKey && e.shiftKey && e.code === "KeyZ",
        action: () => this.undoManager.redo()
      },
      {
        predicate: e => e.ctrlKey && e.code === "KeyC",
        action: () =>
          Maybe.fromNull(parentView.getHighlightedNodeName()).forEach(name =>
            parentView.getNodeFromTree(name).forEach(({ item }) => {
              const { mesh } = item;
              mesh.getMouseContextActions &&
                mesh.getMouseContextActions(parentView)[0].onClick();
            })
          )
      },
      {
        predicate: e => e.ctrlKey && e.code === "KeyV",
        action: () => {
          parentView
            .getMouseCoordinatesFromRoot()
            .forEach(mousePosRoot =>
              this.getPasteOnClick(mousePosRoot, parentView)()
            );
        }
      },
      { predicate: e => true, action: defaultAction }
    ];
    for (let i = 0; i < predicateActionList.length; i++) {
      const predicateAction = predicateActionList[i];
      if (predicateAction.predicate(evt)) {
        predicateAction.action();
        break;
      }
    }
  };

  getDeleteButtonAction(parentView) {
    return () =>
      Maybe.fromNull(parentView.getHighlightedNodeName()).forEach(nodeName => {
        const maybeNode = parentView.getNodeFromTree(nodeName);
        maybeNode.forEach(() => parentView.onDeleteNode(nodeName));
        maybeNode.orElseRun(() => {
          const contextActions = parentView.getContextActions();
          contextActions[0].action(parentView);
        });
      });
  }

  notifyObservers(mesh, is2updateServer, displacement) {
    Maybe.fromNull(mesh.observers).forEach(obs =>
      obs.notifyObservers({
        updatedPointMesh: mesh,
        is2updateServer: is2updateServer,
        displacement: displacement.toBabylon()
      })
    );
  }

  setProperties = (parentView, name) =>
    setTimeout(() => parentView.setPropertiesWithName(name), 100);

  /**
   *
   * @param {*} selectedMesh: babylon js Mesh
   * @param {*} displacement: Vec3
   * @param {*} parentView: mainView instance
   */
  getUndoAbleAction(selectedMesh, displacement, parentView) {
    return UndoManager.actionBuilder()
      .doAction(() => {
        const newPos = Vec3.ofBabylon(selectedMesh.position).add(displacement);
        selectedMesh.position = newPos.toBabylon();
        this.notifyObservers(selectedMesh, true, displacement);
        parentView.updateNodeInServer(selectedMesh.name);
      })
      .undoAction(() => {
        const invertDisplacement = displacement.scale(-1);
        const newPos = Vec3.ofBabylon(selectedMesh.position).add(
          invertDisplacement
        );
        selectedMesh.position = newPos.toBabylon();
        this.notifyObservers(selectedMesh, true, invertDisplacement);
        parentView.updateNodeInServer(selectedMesh.name);
      })
      .build();
  }

  static getInstance() {
    return new DragObjectsAction();
  }
}

let instance = null;

export default DragObjectsAction;
