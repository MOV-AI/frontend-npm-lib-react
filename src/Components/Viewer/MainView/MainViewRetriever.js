import GlobalRef from "../NodeItem/GlobalRef";
import Box from "../NodeItem/Box";
import KeyPoint from "../NodeItem/KeyPoint";
import Path from "../NodeItem/Path";
import Wall from "../NodeItem/Wall";
import BoxRegion from "../NodeItem/BoxRegion";
import PolygonRegion from "../NodeItem/PolygonRegion";
import { Maybe } from "monet";
import { ASSETS_TYPES } from "../Utils/AssetsTypesFactory";
import GraphItem from "../NodeItem/GraphItem";

const NODE_ITEM_FACTORY_MAP = {
  GlobalRef: GlobalRef,
  Box: Box,
  KeyPoint: KeyPoint,
  Path: Path,
  Wall: Wall,
  BoxRegion: BoxRegion,
  PolygonRegion: PolygonRegion,
  GraphItem: GraphItem
};

function isAsset(nodeDict) {
  return nodeDict.type in ASSETS_TYPES;
}

function importAsset(mainView, nodeDict, parent) {
  const assetName = Maybe.fromNull(nodeDict.assetName).orSome(nodeDict.name);
  const assetActionMap = mainView.getAssetsActionMap();
  // legacy
  const retrievedAction = Maybe.fromNull(assetActionMap[assetName]).orSome(
    assetActionMap[assetName.split(".")[0]]
  );
  if (!retrievedAction) {
    console.log(`Action ${assetName}, has not found, keep importing...`);
    return;
  }
  retrievedAction.memory["parentObj"] = { parent: parent };
  retrievedAction.memory["nodeItemDict"] = nodeDict;
  retrievedAction.memory["assetName"] = assetName;
  retrievedAction.memory["name"] = nodeDict.name;
  retrievedAction.memory["isImport"] = true;
  retrievedAction.action(mainView);
}

function importNodeItem(mainView, nodeDict, parent) {
  const nodeItemClass = NODE_ITEM_FACTORY_MAP[nodeDict.type]; //retrieve default export
  if (nodeItemClass) {
    mainView.getSceneMemory().forEach(memory => {
      const scene = memory.scene;
      const nodeItem = nodeItemClass.ofDict(scene, nodeDict, mainView);
      nodeItem.mesh.setEnabled(nodeDict.isVisible);
      mainView.getNodeFromTree(parent).forEach(treeNode => {
        nodeItem.mesh.parent = treeNode.item.mesh;
      });
      mainView.addNodeItem2Tree(nodeItem, parent, false, nodeDict.isVisible);
    });
  }
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
      importNodeItem(mainView, node.item, parent);
    }
    if (node.children.length > 0) {
      importSceneRecursive(mainView, node.children, node.name);
    }
  });
}

function importDefaultScene(mainView, isNewScene) {
  mainView.getSceneMemory().forEach(memory => {
    const scene = memory.scene;
    const send2server = !isNewScene;
    mainView.addNodeItem2Tree(GlobalRef.ofDict(scene), null, send2server);
  });
}

class MainViewRetriever {
  static importScene(mainView, serverScene = [], isNewScene = false) {
    console.log("Importing scene...", mainView, serverScene);
    if (serverScene.length > 0) {
      importSceneRecursive(mainView, serverScene);
    } else {
      importDefaultScene(mainView, isNewScene);
    }
    console.log("End Importing scene");
  }
}

export default MainViewRetriever;
