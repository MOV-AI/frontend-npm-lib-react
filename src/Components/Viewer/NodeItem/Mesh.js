import AssetNodeItem from "./AssetNodeItem";

class Mesh extends AssetNodeItem {
  constructor(mesh, assetName, keyValueMap = {}) {
    super(mesh, assetName, keyValueMap);
  }

  toDict() {
    let dict = super.toDict();
    return dict;
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
