import Clipboard from "../Utils/Clipboard";
import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import _capitalize from "lodash/capitalize";
import { Quaternion, Color3, Vector3 } from "@babylonjs/core";
import AnnotationManager from "../Utils/AnnotationManager";
import GlobalRef from "./GlobalRef";
import Constants from "../Utils/Constants";

class NodeItem {
  constructor(mesh, keyValueMap = {}) {
    this.name = mesh.name;
    this.mesh = mesh;
    this.mesh.getMouseContextActions = this.getMouseContextActions;
    this.mesh.nodeItem = this;
    this.keyValueMap = keyValueMap;
  }

  dispose() {
    this.delVertex();
    this.mesh.dispose();
  }

  toDict() {
    return {
      name: this.name,
      type: this.getType(),
      position: Vec3.ofBabylon(this.mesh?.position).toArray(),
      quaternion: Maybe.fromNull(this.mesh?.rotationQuaternion)
        .map(x => [x.w, x.x, x.y, x.z])
        .orLazy(() => {
          const q = Quaternion.RotationYawPitchRoll(
            this.mesh.rotation.y,
            this.mesh.rotation.x,
            this.mesh.rotation.z
          );
          return [q.w, q.x, q.y, q.z];
        }),
      color: Maybe.fromNull(this.mesh?.material)
        .flatMap(x =>
          Maybe.fromNull(x.diffuseColor).map(z => [
            z.r,
            z.g,
            z.b,
            this.mesh.visibility
          ])
        )
        .orSome([0, 0, 0, 1]),
      keyValueMap: this.keyValueMap,
      isVisible: this.mesh.isEnabled()
    };
  }

  /**
   * Generates json based on https://github.com/rjsf-team/react-jsonschema-form
   */
  toForm() {
    const info = this.toDict();
    const color = new Color3(info.color[0], info.color[1], info.color[2]);
    const q = new Quaternion(
      info.quaternion[1],
      info.quaternion[2],
      info.quaternion[3],
      info.quaternion[0]
    );
    const euler = q.toEulerAngles();

    const schema = {
      jsonSchema: {
        type: "object",
        properties: {
          oldName: {
            type: "string"
          },
          name: {
            type: "string",
            title: "Name"
          },
          type: {
            type: "string",
            title: "Type"
          },
          position: {
            type: "object",
            title: "Position",
            properties: {
              x: {
                type: "number",
                title: "x"
              },
              y: {
                type: "number",
                title: "y"
              },
              z: {
                type: "number",
                title: "z"
              }
            }
          },
          rotation: {
            type: "object",
            title: "Rotation",
            properties: {
              x: {
                type: "number",
                title: "x"
              },
              y: {
                type: "number",
                title: "y"
              },
              z: {
                type: "number",
                title: "z"
              }
            }
          },
          color: {
            type: "object",
            title: "Color",
            properties: {
              r: {
                type: "number"
              },
              g: {
                type: "number"
              },
              b: {
                type: "number"
              },
              a: {
                type: "number"
              }
            }
          }
        }
      },
      uiSchema: {
        type: {
          "ui:disabled": true
        },
        color: {
          "ui:widget": "color"
        },
        oldName: {
          "ui:widget": "hidden"
        },
        position: {
          "ui:widget": "collapse"
        },
        rotation: {
          "ui:widget": "collapse"
        }
      },
      data: {
        oldName: info.name,
        name: info.name,
        type: info.type,
        position: {
          x: info.position[0],
          y: info.position[1],
          z: info.position[2]
        },
        rotation: {
          x: euler.x * Constants.RAD2DEG,
          y: euler.y * Constants.RAD2DEG,
          z: euler.z * Constants.RAD2DEG
        },
        color: {
          r: color.r,
          g: color.g,
          b: color.b,
          a: this.mesh.visibility
        }
      }
    };

    NodeItem.setAnnotations2Form(schema, this.keyValueMap);
    return schema;
  }

  /**
   * Changes NodeItem based on a form
   *
   * Warning: side effect function
   * @param {*} form
   */
  ofForm(form) {
    this.name = form.name;
    this.mesh.name = form.name;

    Maybe.fromNull(form?.position).forEach(position => {
      const pos = [position.x, position.y, position.z].map(Number.parseFloat);
      this.mesh.position = Vector3.FromArray(pos);
    });
    Maybe.fromNull(form?.rotation).forEach(euler => {
      const angles = [euler.x, euler.y, euler.z]
        .map(Number.parseFloat)
        .map(deg => deg * Constants.DEG2RAD);
      this.mesh.rotationQuaternion = Quaternion.FromEulerAngles(...angles);
    });
    if (this.mesh.material) {
      const color = new Color3(form.color.r, form.color.g, form.color.b);
      this.mesh.material.diffuseColor = color;
      this.mesh.material.emissiveColor = color;
      this.mesh.visibility = form.color.a;
    }
    this.keyValueMap = { ...form.annotations };
  }

  getType = () => NodeItem.TYPE;

  getMouseContextActions = mainView => {
    return [
      {
        title: "Copy",
        onClick: () => Clipboard.copy(this.getCopyFunction())
      },
      {
        title: "Delete",
        onClick: () =>
          mainView
            .getNodeFromTree(this.name)
            .forEach(node => mainView.onDeleteNode(node, false))
      }
    ];
  };

  getCopyFunction(
    isForceUpdate = true,
    nameGenerator = old => old + "_copy" + Clipboard.getUID()
  ) {
    // mousePosFromRoot : Vector3
    return (mousePosFromRoot, someMainView) =>
      someMainView.getSceneMemory().map(({ scene }) => {
        const { item: rootItem } = someMainView.getRootNode();
        const copyDict = this.toDict();
        copyDict.name = nameGenerator(copyDict.name);
        const newPosArray = Vec3.ofBabylon(mousePosFromRoot).toArray();
        // preserves z-coordinate
        newPosArray[2] = copyDict.position[2];
        copyDict.position = newPosArray;
        const copiedNodeItem = this.ofDict(scene, copyDict, someMainView);
        const { mesh: copiedMesh } = copiedNodeItem;
        copiedMesh.parent = rootItem.mesh;
        someMainView.addNodeItem2Tree(
          copiedNodeItem,
          GlobalRef.NAME,
          true,
          true,
          isForceUpdate
        );
        return copiedNodeItem;
      });
  }

  delVertex() {
    let delVertex = this.mesh.graphVertex?.delVertex;
    if (!delVertex) {
      const childrenWithDelVertex = (this.mesh?._children || [])
        .filter(childMesh => !!childMesh.graphVertex)
        .map(childMesh => childMesh.graphVertex.delVertex);
      delVertex = () => childrenWithDelVertex.forEach(del => del());
    }
    delVertex();
  }

  //========================================================================================
  /*                                                                                      *
   *                           Static attributes/methods                                  *
   *                                                                                      */
  //========================================================================================

  static TYPE = "NodeItem";

  // side-effect function
  static mapDict2Mesh(dict, mesh) {
    if (!mesh) throw new Error("can't map a null mesh");
    Maybe.fromNull(dict).forEach(someDict => {
      Maybe.fromNull(dict.name).forEach(name => (mesh.name = name));
      Maybe.fromNull(someDict.position).forEach(
        position => (mesh.position = Vec3.of(position).toBabylon())
      );
      Maybe.fromNull(someDict.quaternion).forEach(quaternion => {
        const babylonQuaternion = new Quaternion(
          quaternion[1],
          quaternion[2],
          quaternion[3],
          quaternion[0]
        );
        mesh.rotationQuaternion = babylonQuaternion.normalize();
      });
      Maybe.fromNull(someDict.color).forEach(color => {
        const babylonColor = new Color3(color[0], color[1], color[2]);
        Maybe.fromNull(mesh.material).forEach(material => {
          Maybe.fromNull(material.diffuseColor).forEach(
            z => (mesh.material.diffuseColor = babylonColor)
          );
          Maybe.fromNull(material.emissiveColor).forEach(
            z => (mesh.material.emissiveColor = babylonColor)
          );
        });
      });
    });
    return mesh;
  }

  // side effect function
  static setAnnotations2Form(schema, keyValueMap = {}) {
    schema.jsonSchema.properties.annotations = {
      title: "Annotations",
      type: "object",
      properties: {}
    };
    schema.uiSchema.annotations = {
      "ui:widget": "collapse"
    };
    schema.data["annotations"] = { ...keyValueMap };
    const annotations = AnnotationManager.getAnnotations();

    ["safety", "behaviour", "localization", "navigation"].forEach(
      annotation => {
        // if (annotations[annotation].labels.length > 0) {
        schema.jsonSchema.properties.annotations.properties[annotation] = {
          title: _capitalize(annotation),
          type: "string"
        };
        schema.uiSchema.annotations[annotation] = {
          "ui:widget": "selectScopeModal",
          "ui:options": {
            scopeList: "Annotation",
            name: _capitalize(annotation),
            filter: e => {
              return (
                annotations[annotation] &&
                annotations[annotation].names.includes(e.name)
              );
            }
          }
        };
        // }
      }
    );
  }

  static randomId() {
    return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      // eslint-disable-next-line no-mixed-operators
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

export default NodeItem;
