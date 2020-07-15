import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import Util3d from "../Util3d/Util3d";
import { Color3 } from "@babylonjs/core";
import Vec3 from "../Math/Vec3";
import GraphItem from "../NodeItem/GraphItem";
import Constants from "../Utils/Constants";

class DrawGraphAction extends MouseKeysAction {
  constructor() {
    if (instance) return instance;
    super();
    this.key = "drawGraph";
    this.name = "Draw Graph [C]";
    this.icon = props => <i className="fas fa-project-diagram" {...props}></i>;

    this.mouseCurve = [];
    this.previewMeshes = [];
    this.mode = MODES.line;
    instance = this;
  }

  static getInstance() {
    return new DrawGraphAction();
  }

  //========================================================================================
  /*                                                                                      *
   *                            Mouse Key Action Implementation                           *
   *                                                                                      */
  //========================================================================================

  action = parentView => {
    super.action(parentView);
    parentView.setSelectedAction(this);
    const contextActions = this.getContextActions();
    parentView.setContextActions(contextActions);
    parentView.setContextActionIndex(
      contextActions.findIndex(ca => ca.mode === this.mode)
    );
  };

  onPointerDown = (evt, parentView) => {
    if (!(evt.buttons === 1)) return;
    this.mousePosConsumer(parentView)((mousePos, memory) => {
      const handlePointerDownByMode = {
        [MODES.line]: this.onPointerDownLine,
        [MODES.curve]: this.onPointerDownCurve
      };
      handlePointerDownByMode[this.mode](mousePos, memory, parentView);
    });
  };

  onPointerMove = (evt, parentView) => {
    this.mousePosConsumer(parentView)((mousePos, memory) => {
      const { scene, ground } = memory;
      Util3d.pickMesh(scene, ground).cata(
        () => parentView.highlightMeshInScene(),
        pickedMesh =>
          parentView.highlightMeshInScene([pickedMesh], Color3.Green())
      );
      if (this.mouseCurve.length === 0) return;
      const handlePointerMoveByMode = {
        [MODES.line]: this.onPointerMoveLine,
        [MODES.curve]: this.onPointerMoveCurve
      };
      handlePointerMoveByMode[this.mode](mousePos, memory, parentView);
    });
  };

  onPointerUp = parentView => {
    parentView
      .getGraph()
      .forEach(graphNode =>
        parentView.setPropertiesWithName(graphNode.item.name)
      );
  };

  onKeyDown = (evt, parentView) => {
    const keyCodeActionMap = {
      Delete: () => this.escapeAction(evt, parentView),
      Backspace: () => this.escapeAction(evt, parentView),
      Escape: () => this.escapeAction(evt, parentView)
    };
    if (evt.code in keyCodeActionMap) {
      keyCodeActionMap[evt.code]();
    } else {
      super.onKeyDown(evt, parentView);
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                  Auxiliary functions                                  *
   *                                                                                      */
  //========================================================================================

  escapeAction = (evt, parentView) => {
    if (this.mouseCurve.length > 0) {
      this.deletePreviewMeshes();
      this.mouseCurve = [];
    } else {
      super.onKeyDown(evt, parentView);
    }
  };

  deletePreviewMeshes = () => {
    this.previewMeshes.forEach(mesh => mesh.dispose());
    this.previewMeshes = [];
  };

  mousePosConsumer = parentView => lambda => {
    parentView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const ground = memory.ground;
      const maybeCurrent = Util3d.getGroundPosition(scene, ground);
      maybeCurrent.forEach(mousePos => lambda(mousePos, memory));
    });
  };

  createGraphItemIfNone = (scene, parentView) =>
    parentView.getGraph().orElseRun(() => {
      const graphItem = new GraphItem(scene, parentView);
      graphItem.mesh.parent = parentView.getRootNode().item.mesh;
      parentView.addNodeItem2Tree(graphItem);
    });

  getContextActions() {
    return [
      {
        icon: props => (
          <i className="fas fa-grip-lines-vertical" {...props}></i>
        ),
        action: parentView => {
          parentView.setContextActionIndex(0);
          this.mode = MODES.line;
          this.mouseCurve = [];
          this.previewMeshes.forEach(mesh => mesh.dispose());
          this.previewMeshes = [];
        },
        name: "Line Mode",
        mode: MODES.line
      },
      {
        icon: props => <i className="fas fa-bezier-curve" {...props}></i>,
        action: parentView => {
          parentView.setContextActionIndex(1);
          this.mode = MODES.curve;
          this.mouseCurve = [];
          this.previewMeshes.forEach(mesh => mesh.dispose());
          this.previewMeshes = [];
        },
        name: "Curve Mode",
        mode: MODES.curve
      }
    ];
  }

  //========================================================================================
  /*                                                                                      *
   *                                       Line Edge                                      *
   *                                                                                      */
  //========================================================================================

  onPointerDownLine = (mousePos, memory, parentView) => {
    const { camera, canvas, scene } = memory;
    camera.detachControl(canvas);
    if (this.mouseCurve.length === 0) {
      this.mouseCurve.push(mousePos);
    } else {
      //mouseCurve.length > 0
      this.createEdge(
        [this.mouseCurve[0], mousePos],
        scene,
        parentView,
        graphItem => edge => graphItem.addEdge(edge)
      );
      this.mouseCurve = [];
      camera.attachControl(canvas, true);
    }
  };

  onPointerMoveLine = (mousePos, memory, parentView) => {
    // preview line
    const visibility = 0.25;
    const { scene } = memory;
    const rootMesh = parentView.getRootNode().item.mesh;
    const edgeEmbedding = toLocalCoordinates(parentView)([
      this.mouseCurve[0],
      mousePos
    ]);
    this.deletePreviewMeshes();
    this.previewMeshes = GraphItem.getEdgeWithVertexMeshes(
      scene,
      edgeEmbedding,
      Color3.Blue(),
      Constants.RADIUS / 2
    );
    this.previewMeshes.forEach(mesh => {
      mesh.visibility = visibility;
      mesh.parent = rootMesh;
    });
  };

  //========================================================================================
  /*                                                                                      *
   *                                      Curved Edge                                     *
   *                                                                                      */
  //========================================================================================

  onPointerDownCurve = (mousePos, memory, parentView) => {
    const { camera, canvas, scene } = memory;
    camera.detachControl(canvas);
    if (this.mouseCurve.length <= 1) {
      this.mouseCurve.push(mousePos);
    } else {
      //mouseCurve.length > 1
      this.createEdge(
        [this.mouseCurve[0], this.mouseCurve[1], mousePos],
        scene,
        parentView,
        graphItem => edge => graphItem.addCurveEdge(edge)
      );
      this.mouseCurve = [];
      camera.attachControl(canvas, true);
    }
  };

  onPointerMoveCurve = (mousePos, memory, parentView) => {
    if (this.mouseCurve.length < 2) {
      this.onPointerMoveLine(mousePos, memory, parentView);
    } else {
      // mouse curve >= 2
      const visibility = 0.25;
      const { scene } = memory;
      const rootMesh = parentView.getRootNode().item.mesh;
      const edgeEmbedding = toLocalCoordinates(parentView)([
        ...this.mouseCurve,
        mousePos
      ]);
      this.deletePreviewMeshes();
      this.previewMeshes = GraphItem.getCurveEdgeWithVertexMeshes(
        scene,
        edgeEmbedding,
        Color3.Green(),
        Constants.RADIUS / 2
      )
        .concat(
          GraphItem.getEdgeWithVertexMeshes(
            scene,
            [edgeEmbedding[0], edgeEmbedding[1]],
            Color3.Blue(),
            Constants.RADIUS / 2
          )
        )
        .concat(
          GraphItem.getEdgeWithVertexMeshes(
            scene,
            [edgeEmbedding[1], edgeEmbedding[2]],
            Color3.Blue(),
            Constants.RADIUS / 2
          )
        );
      this.previewMeshes.forEach(mesh => {
        mesh.visibility = visibility;
        mesh.parent = rootMesh;
      });
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                    Draw functions                                    *
   *                                                                                      */
  //========================================================================================

  createEdge = (edgeInWorldCoordinate, scene, parentView, drawMethod) => {
    const edge = toLocalCoordinates(parentView)(edgeInWorldCoordinate);
    this.createGraphItemIfNone(scene, parentView);
    parentView.getGraph().forEach(graphNode => {
      const { item: graphItem } = graphNode;
      drawMethod(graphItem)(edge);
      parentView.updateNodeInServer(graphItem.name);
    });
    this.deletePreviewMeshes();
  };
}

let instance = null;
const MODES = {
  line: "line",
  curve: "curve",
  free: "free"
};

const toLocalCoordinates = parentView => {
  const rootMesh = parentView.getRootNode().item.mesh;
  return arrayOfVector3 =>
    arrayOfVector3.map(p =>
      Util3d.computeLocalCoordinatesFromMesh(
        { parent: rootMesh },
        Vec3.ofBabylon(p)
      ).toBabylon()
    );
};
export default DrawGraphAction;
