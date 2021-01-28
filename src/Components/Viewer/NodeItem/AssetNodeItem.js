import NodeItem from "./NodeItem";

class AssetNodeItem extends NodeItem {
  constructor(mesh, assetName, keyValueMap = {}) {
    super(mesh, keyValueMap);
    this.assetName = assetName;
  }

  toDict() {
    const ans = super.toDict();
    ans.assetName = this.assetName;
    return ans;
  }

  getCopyFunction = () => {
    return (mousePosFromRoot, someMainView) => {};
  };
}

export default AssetNodeItem;
