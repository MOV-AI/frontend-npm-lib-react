import AssetNodeItem from "./AssetNodeItem";

class Mesh extends AssetNodeItem {
  constructor(mesh, assetName, keyValueMap = {}) {
    super(mesh, assetName, keyValueMap);
  }

  toDict() {
    let dict = super.toDict();
    return dict;
  }

  toForm() {
    const schema = super.toForm();
    schema.jsonSchema.properties = {
      oldName: schema.jsonSchema.properties.oldName,
      name: schema.jsonSchema.properties.name,
      type: schema.jsonSchema.properties.type,
      assetName: {
        type: "string",
        title: "Asset Name"
      },
      position: schema.jsonSchema.properties.position,
      quaternion: schema.jsonSchema.properties.quaternion,
      color: schema.jsonSchema.properties.color,
      annotations: schema.jsonSchema.properties.annotations
    };
    schema.uiSchema["assetName"] = {
      "ui:disabled": true
    };
    schema.data["assetName"] = this.assetName;
    return schema;
  }

  getMouseContextActions(mainView) {
    return super
      .getMouseContextActions(mainView)
      .filter(x => x.title === "Delete");
  }

  getType = () => Mesh.TYPE;
  static TYPE = "Mesh";
}

export default Mesh;
