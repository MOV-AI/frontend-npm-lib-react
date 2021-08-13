import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import Util3d from "../Util3d/Util3d";
import { Color3 } from "@babylonjs/core";
import GraphItem from "../NodeItem/GraphItem";
import Constants from "../Utils/Constants";
import { UndoManager } from "mov-fe-lib-core";
import { selectOneAction } from "../Utils/Utils";
import Path from "../NodeItem/Path";
import { Maybe } from "monet";
import GlobalRef from "../NodeItem/GlobalRef";

class DrawGraphAction extends MouseKeysAction {
  constructor() {
    super();
    this.key = "drawGraph";
    this.name = "Draw Graph [6]";
    this.icon = props => <i className="fas fa-project-diagram" {...props}></i>;

    this.previewMeshes = [];
    this.firstMousePos = undefined;
    this.firstClickedMesh = undefined;
  }

  //========================================================================================
  /*                                                                                      *
   *                            Mouse Key Action Implementation                           *
   *                                                                                      */
  //========================================================================================

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
    // Make LogicGraph visible when action is selected
    parentView.getGraph().forEach(node => {
      if (!node.isVisible) {
        node.item.mesh.setEnabled(true);
      }
    });
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    this.mousePosConsumer(parentView)((mousePos, memory) => {
      const { scene, ground } = memory;
      const maybeMesh = Util3d.pickMesh(scene, ground).filter(
        this.isConnectableMesh(parentView)
      );
      maybeMesh.forEach(possibleMesh => {
        parentView.highlightMeshesInScene([possibleMesh], Color3.Green());
        this.onPointerDownLine(mousePos, possibleMesh, memory, parentView);
      });
      maybeMesh.orElseRun(() => {
        // no mesh found
        parentView.highlightMeshesInScene();
        this.resetPreview();
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    this.mousePosConsumer(parentView)((mousePos, memory) => {
      const { scene, ground } = memory;
      Util3d.pickMesh(scene, ground)
        .filter(this.isConnectableMesh(parentView))
        .cata(
          () => parentView.highlightMeshesInScene(),
          pickedMesh =>
            parentView.highlightMeshesInScene([pickedMesh], Color3.Green())
        );
      if (!this.firstMousePos) return;
      this.onPointerMoveLine(mousePos, memory, parentView);
    });
  };

  onPointerUp = (evt, parentView) => {};

  onKeyUp = (evt, parentView) => {
    const escapeAction = () => this.resetPreview();
    const predicateActionList = [
      {
        predicate: e => ["Backspace", "Delete", "Escape"].includes(e.code),
        action: escapeAction
      }
    ];
    selectOneAction(predicateActionList)(evt);
  };

  onChange() {
    this.resetPreview();
  }

  //========================================================================================
  /*                                                                                      *
   *                                  Auxiliary functions                                  *
   *                                                                                      */
  //========================================================================================

  resetPreview = () => {
    if (!!this.firstMousePos) {
      this.deletePreviewMeshes();
      this.firstMousePos = undefined;
      this.firstClickedMesh = undefined;
    }
  };

  deletePreviewMeshes = () => {
    this.previewMeshes.forEach(mesh => mesh.dispose());
    this.previewMeshes = [];
  };

  mousePosConsumer = parentView => lambda => {
    parentView.getSceneMemory().forEach(memory => {
      const { scene, ground } = memory;
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(mousePos => lambda(mousePos, memory));
    });
  };

  /**
   * returns a predicate(mesh => boolean) that tells if a mesh is connectable by an edge
   * @param {*} parentView
   */
  isConnectableMesh = parentView => mesh => {
    return parentView
      .getNodeFromTree(mesh.name)
      .cata(
        () => {
          // mesh is not a nodeItem, check if mesh parent is a path and is beginning or end of path
          const parentName = mesh?.parent?.name || "";
          return parentView
            .getNodeFromTree(parentName)
            .filter(({ item }) => item.getType() === Path.TYPE)
            .filter(({ item }) => {
              const index = mesh.index;
              return index === 0 || index === item.keyPoints.length - 1;
            });
        },
        ({ item }) => {
          // mesh is a nodeItem, check if not path
          return Maybe.some(mesh).filter(
            _ =>
              item.getType() !== Path.TYPE && item.getType() !== GlobalRef.TYPE
          );
        }
      )
      .orSome(false);
  };

  belongsToPath = parentView => mesh => {
    const parentName = mesh?.parent?.name || "";
    return parentView
      .getNodeFromTree(parentName)
      .filter(({ item }) => item.getType() === Path.TYPE)
      .map(({ item }) => item.name);
  };

  belongs2SamePath = parentView => (meshI, meshJ) => {
    const belongsToPath = this.belongsToPath(parentView);
    return belongsToPath(meshI)
      .flatMap(nameI => belongsToPath(meshJ).map(nameJ => nameI === nameJ))
      .orSome(false);
  };

  //========================================================================================
  /*                                                                                      *
   *                                       Line Edge                                      *
   *                                                                                      */
  //========================================================================================

  onPointerDownLine = (mousePos, clickedMesh, memory, parentView) => {
    const { scene } = memory;
    if (!this.firstMousePos) {
      this.firstMousePos = mousePos;
      this.firstClickedMesh = clickedMesh;
    } else {
      //firstMousePos exists
      if (
        this.belongs2SamePath(parentView)(clickedMesh, this.firstClickedMesh) ||
        GraphItem.isInvalidEdge(this.firstClickedMesh, clickedMesh)
      ) {
        this.resetPreview();
      } else {
        parentView
          .getUndoManager()
          .doIt(
            this.getUndoAbleLineEdge(
              [this.firstClickedMesh, clickedMesh],
              scene,
              parentView,
              clickedMesh
            )
          );
      }
    }
  };

  getUndoAbleLineEdge = (edgeMeshes, scene, parentView) => {
    return UndoManager.actionBuilder()
      .doAction(() => {
        this.createEdge(edgeMeshes, scene, parentView);
        this.resetPreview();
      })
      .undoAction(({ is2UpdateInServer = true }) => {
        this.deleteEdge(edgeMeshes, parentView, is2UpdateInServer);
      })
      .build();
  };

  onPointerMoveLine = (mousePos, memory, parentView) => {
    // preview line
    const visibility = 0.25;
    const { scene } = memory;
    const rootMesh = parentView.getRootNode().item.mesh;
    const edgeEmbedding = toGlobalCoord(parentView)([
      this.firstMousePos,
      mousePos
    ]);
    this.deletePreviewMeshes();
    this.previewMeshes = [
      GraphItem.getEdgeMesh(
        scene,
        edgeEmbedding,
        "previewEdge",
        Color3.Blue(),
        Constants.RADIUS / 4
      )
    ];
    this.previewMeshes.forEach(mesh => {
      mesh.visibility = visibility;
      mesh.parent = rootMesh;
      mesh.isPickable = false;
    });
  };

  //========================================================================================
  /*                                                                                      *
   *                                    Draw functions                                    *
   *                                                                                      */
  //========================================================================================

  createEdge = (edgeMeshes, scene, parentView) => {
    GraphItem.createGraphItemIfNone(scene, parentView);
    parentView.getGraph().forEach(graphNode => {
      const { item: graphItem } = graphNode;
      graphItem.addEdge(...edgeMeshes);
      parentView.updateNodeInServer(graphItem.name);
    });
  };

  deleteEdge = (edgeMeshes, parentView, is2UpdateInServer) => {
    parentView.getGraph().forEach(graphNode => {
      const { item: graphItem } = graphNode;
      graphItem.delEdge(...edgeMeshes);
      if (is2UpdateInServer) parentView.updateNodeInServer(graphItem.name);
    });
  };
}

const toGlobalCoord = Util3d.toGlobalCoord;
export default DrawGraphAction;
