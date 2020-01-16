import AssetNodeItem from "./AssetNodeItem";

class Map extends AssetNodeItem {
  constructor(mesh, size, textureSrc, assetName) {
    super(mesh, assetName);
    this.size = size;
    this.textureSrc = textureSrc;
  }

  dispose() {
    super.dispose();
  }

  toDict() {
    const dict = super.toDict();
    dict["size"] = this.size;
    dict["textureSrc"] = this.textureSrc;
    return dict;
  }

  toForm() {
    const info = this.toDict();
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
          assetName: {
            type: "string",
            title: "Asset Name"
          }
        }
      },
      uiSchema: {
        type: {
          "ui:disabled": true
        },
        assetName: {
          "ui:disabled": true
        },
        oldName: {
          "ui:widget": "hidden"
        }
      },
      data: {
        oldName: info.name,
        name: info.name,
        type: info.type,
        assetName: info.assetName
      }
    };
    return schema;
  }

  getType = () => Map.TYPE;

  static TYPE = "Map";
}

export default Map;
