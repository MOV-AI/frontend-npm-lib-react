import MouseKeysAction from "./MouseKeysAction";
import React from "react";
import Util3d from "../Util3d/Util3d";
import { Maybe } from "monet";
import Constants from "../Utils/Constants";
import Vec3 from "../Math/Vec3";
// import JsonToReact from "../../_shared/JsonToReact/JsonToReact";
import NavigationPreviewItem from "../NodeItem/NavigationPreviewItem";
import { UndoManager } from "mov-fe-lib-core";

class NavigationPreviewAction extends MouseKeysAction {
  /**
   *
   * @param {*} uIInOut: (title, reactFactory) => {}
   */
  constructor(uIInOut) {
    super();
    this.key = "navigationPreviewAction";
    this.name = "Add navigation preview [8]";
    this.icon = props => <i className="fas fa-road" {...props}></i>;
    this.uIInOut = uIInOut;
    this.maybeFirstClickPos = Maybe.none();
    this.previewPoseMesh = undefined;
    this.poses = [];
    this.poseMeshes = [];
    this.schema = {
      jsonSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            title: "Type"
          },
          config: {
            type: "string",
            title: "Robot Configuration"
          }
        }
      },
      uiSchema: {
        type: {
          "ui:disabled": true
        },
        config: {
          "ui:widget": "selectScopeModal",
          "ui:options": {
            scopeList: "Configuration",
            name: "Robot Config",
            filter: e => true
          }
        }
      },
      data: {
        type: NavigationPreviewItem.TYPE,
        config: ""
      }
    };
  }

  action = parentView => {
    setTimeout(() => {
      this.uIInOut("Navigation preview params", () => (
        <div style={{ marginTop: "7px" }}>
          {/* <JsonToReact
            schema={this.schema.jsonSchema}
            uiSchema={this.schema.uiSchema}
            formData={this.schema.data}
            onSubmit={({ formData }) => {
              this.schema.data.config = formData.config;
            }}
            disable={false}
          /> */}
        </div>
      ));
    });
    parentView.setSelectedAction(this);
  };

  onChange(parentView) {
    parentView.renderMenus();
    this.resetData();
  }

  onPointerDown = (evt, parentView) => {
    if (evt.button !== 0) {
      return;
    }
    parentView.getSceneMemory().forEach(({ scene, ground, camera, canvas }) => {
      const maybeMousePos = Util3d.getGroundPosition(scene, ground);
      maybeMousePos.forEach(mousePos => {
        camera.detachControl(canvas);
        if (this.poses.length >= 2) {
          this.resetData();
        }
        this.maybeFirstClickPos = Maybe.some(
          Util3d.toGlobalCoord(parentView)(mousePos)
        );
      });
    });
  };

  onPointerMove = (evt, parentView) => {
    this.maybeFirstClickPos.forEach(firstClickPos => {
      parentView.getSceneMemory().forEach(({ scene, ground }) => {
        const maybeMousePos = Util3d.getGroundPosition(scene, ground);
        maybeMousePos.forEach(mousePos => {
          const secondClickPos = Util3d.toGlobalCoord(parentView)(mousePos);
          this.previewPoseMesh && this.previewPoseMesh.dispose();
          this.previewPoseMesh = this.createPreviewPose(
            scene,
            parentView,
            firstClickPos,
            secondClickPos
          );
        });
      });
    });
  };

  onPointerUp = (evt, parentView) => {
    parentView.getSceneMemory().forEach(({ scene, ground, camera, canvas }) => {
      this.maybeFirstClickPos.forEach(firstClickPos => {
        const maybeMousePos = Util3d.getGroundPosition(scene, ground);
        maybeMousePos.forEach(mousePos => {
          const secondClickPos = Util3d.toGlobalCoord(parentView)(mousePos);
          const poseMesh = this.createPreviewPose(
            scene,
            parentView,
            firstClickPos,
            secondClickPos,
            true
          );
          poseMesh.material = this.poseMeshes.push(poseMesh);
          const first = Vec3.ofBabylon(firstClickPos);
          const v = Vec3.ofBabylon(secondClickPos).sub(first);
          const theta = Math.atan2(v.y, v.x);
          this.poses.push({
            position: first.toArray(),
            orientation: [Math.cos(theta / 2), 0, 0, Math.sin(theta / 2)]
          });
          if (this.poses.length === 2) {
            this.createNavPreviewNode(scene, parentView);
            this.resetData();
          }
        });
      });
      camera.attachControl(canvas, true);
      this.previewPoseMesh && this.previewPoseMesh.dispose();
      this.maybeFirstClickPos = Maybe.none();
    });
  };

  resetData() {
    this.maybeFirstClickPos = Maybe.none();
    this.previewPoseMesh && this.previewPoseMesh.dispose();
    this.poses = [];
    this.poseMeshes.forEach(mesh => mesh.dispose());
    this.poseMeshes = [];
  }

  createPreviewPose(scene, parentView, start, end, normalize = false) {
    const maxLength = 1.3;
    const v = end.subtract(start);
    const length = v.length();
    const finalLength = normalize
      ? maxLength / length
      : Math.min(maxLength / length, length);
    const finalEnd = start.add(v.scale(finalLength));

    const arrowMesh = Util3d.getArrow(
      scene,
      "previewPose",
      start,
      finalEnd,
      Constants.RADIUS / 6
    );
    const rootMesh = parentView.getRootNode().item.mesh;
    arrowMesh.parent = rootMesh;
    return arrowMesh;
  }

  createNavPreviewNode(scene, parentView) {
    const navName = `Navigation${Math.floor(Math.random() * 1e2)}`;
    const poses = [...this.poses];
    const config = this.schema.data.config;
    parentView.getUndoManager().doIt(
      UndoManager.actionBuilder()
        .doAction(() => {
          const root = parentView.getRootNode().item.mesh;
          const navPreviewNode = NavigationPreviewItem.ofDict(
            scene,
            {
              name: navName,
              poses: poses,
              robotConfig: config
            },
            parentView
          );
          navPreviewNode.mesh.parent = root;
          parentView.addNodeItem2Tree(navPreviewNode, root.name);
        })
        .undoAction(() => {
          parentView.deleteNodeFromTreeUsingName(navName);
        })
        .build()
    );
  }
}

export default NavigationPreviewAction;
