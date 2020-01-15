import Vec3 from "../Math/Vec3";
import { Maybe } from "monet";
import { Utils } from "mov.ai-core";
import AnnotationManager from "../Utils/AnnotationManager";
import { Quaternion, Color3, Vector3 } from "babylonjs";

class NodeItem {
  constructor(mesh, keyValueMap = {}) {
    this.name = mesh.name;
    this.mesh = mesh;
    this.keyValueMap = keyValueMap;
    //Hack to load annotations
    AnnotationManager.getInstance();
  }

  dispose() {
    this.mesh.dispose();
  }

  toDict() {
    return {
      name: this.name,
      type: this.getType(),
      position: Vec3.ofBabylon(this.mesh.position).toArray(),
      quaternion: Maybe.fromNull(this.mesh.rotationQuaternion)
        .map(x => [x.w, x.x, x.y, x.z])
        .orLazy(() => {
          const q = Quaternion.RotationYawPitchRoll(
            this.mesh.rotation.y,
            this.mesh.rotation.x,
            this.mesh.rotation.z
          );
          return [q.w, q.x, q.y, q.z];
        }),
      color: Maybe.fromNull(this.mesh.material)
        .flatMap(x => Maybe.fromNull(x.diffuseColor).map(z => [z.r, z.g, z.b]))
        .orSome([0, 0, 0]),
      keyValueMap: this.keyValueMap
    };
  }

  toForm() {
    const info = this.toDict();
    const color = new Color3(info.color[0], info.color[1], info.color[2]);
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
          quaternion: {
            type: "object",
            title: "Orientation",
            properties: {
              w: {
                type: "number",
                title: "w"
              },
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
            type: "string",
            title: "Color"
          },
          annotations: {
            title: "Annotations",
            type: "object",
            properties: {}
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
        quaternion: {
          w: info.quaternion[0],
          x: info.quaternion[1],
          y: info.quaternion[2],
          z: info.quaternion[3]
        },
        color: color.toHexString(),
        annotations: { ...info.keyValueMap }
      }
    };

    const annotations = AnnotationManager.getAnnotations();
    Object.keys(annotations).forEach(annotation => {
      if (annotations[annotation].labels.length > 0) {
        schema.jsonSchema.properties.annotations.properties[annotation] = {
          title: Utils.capitalize(annotation),
          type: "string",
          enumNames: annotations[annotation].labels,
          enum: annotations[annotation].names
        };
      }
    });

    return schema;
  }

  ofForm(form) {
    // kind of a hack, TODO: please revise;
    const item = new NodeItem(this.mesh);
    item.name = form.name;
    item.mesh.name = form.name;
    item.mesh.position = new Vector3(
      form.position.x,
      form.position.y,
      form.position.z
    );

    item.mesh.rotationQuaternion = new Quaternion(
      form.quaternion.x,
      form.quaternion.y,
      form.quaternion.z,
      form.quaternion.w
    ).normalize();

    if (item.mesh.material) {
      item.mesh.material.diffuseColor = Color3.FromHexString(form.color);
      item.mesh.material.emissiveColor = Color3.FromHexString(form.color);
    }

    item.keyValueMap = { ...form.annotations };

    item.getType = this.getType;
    return item;
  }

  getType = () => NodeItem.TYPE;

  static TYPE = "NodeItem";

  // side-effect function
  static mapDict2Mesh(dict, mesh) {
    if (!mesh) throw "can't map a null mesh";
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
}

export default NodeItem;
