import GlobalRef from "../NodeItem/GlobalRef";
import { Maybe } from "monet";
import { ASSETS_TYPES } from "../Utils/AssetsTypesFactory";
import NODE_ITEM_FACTORY_MAP from "./NodeItemFactoryMap";

class MainViewRetriever {
  static importScene(mainView, serverScene = [], parent = null) {
    console.log("Importing scene...", mainView, serverScene);
    if (serverScene.length > 0) {
      importSceneRecursive(mainView, serverScene, parent);
    } else {
      importDefaultScene(mainView);
    }
    console.log("End Importing scene");
  }

  static importNodeItem(mainView, nodeDict, parent, is2addInServer = false) {
    const nodeItemClass = NODE_ITEM_FACTORY_MAP[nodeDict.type]; //retrieve default export
    if (nodeItemClass) {
      mainView.getSceneMemory().forEach(({ scene }) => {
        const nodeItem = nodeItemClass.ofDict(scene, nodeDict, mainView);
        // pseudo lazy migration of isVisible prop
        const isVisible =
          nodeDict.isVisible === undefined ? true : nodeDict.isVisible;
        nodeItem.mesh.setEnabled(isVisible);
        mainView.getNodeFromTree(parent).forEach(treeNode => {
          nodeItem.mesh.parent = treeNode.item.mesh;
        });
        mainView.addNodeItem2Tree(
          nodeItem,
          parent,
          is2addInServer,
          isVisible,
          false
        );
      });
    }
  }
}

function isAsset(nodeDict) {
  return nodeDict.type in ASSETS_TYPES;
}

function importAsset(mainView, nodeDict, parent) {
  const assetName = Maybe.fromNull(nodeDict.assetName).orSome(nodeDict.name);
  const assetActionMap = mainView.getAssetsActionMap();
  // legacy
  const retrievedAction = Maybe.fromNull(assetActionMap[assetName]).orLazy(
    () => assetActionMap[assetName.split(".")[0]]
  );
  if (!retrievedAction) {
    console.warn(`Action ${assetName}, has not found, keep importing...`);
    return;
  }
  retrievedAction.memory["parentObj"] = { parent: parent };
  retrievedAction.memory["nodeItemDict"] = nodeDict;
  retrievedAction.memory["assetName"] = assetName;
  retrievedAction.memory["name"] = nodeDict.name;
  retrievedAction.memory["isImport"] = true;
  retrievedAction.memory["isVisible"] =
    nodeDict.isVisible === undefined ? true : nodeDict.isVisible;
  retrievedAction.action(mainView);
}

function importSceneRecursive(mainView, arrayTree, parent = null) {
  if (!arrayTree) return;
  const sortArrayTree = arrayTree.sort((a, b) => {
    if (a.item.type === "GlobalRef") return -1;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  sortArrayTree.forEach(node => {
    if (isAsset(node.item)) {
      importAsset(mainView, node.item, parent);
    } else {
      MainViewRetriever.importNodeItem(mainView, node.item, parent);
    }
    if (node.children.length > 0) {
      importSceneRecursive(mainView, node.children, node.name);
    }
  });
}

function importDefaultScene(mainView) {
  mainView.getSceneMemory().forEach(memory => {
    const scene = memory.scene;
    const send2server = true;
    mainView.addNodeItem2Tree(GlobalRef.ofDict(scene), null, send2server);
  });
}

export default MainViewRetriever;
