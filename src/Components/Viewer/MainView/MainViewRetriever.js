import GlobalRef from "../NodeItem/GlobalRef";
import { Maybe } from "monet";
import { ASSETS_TYPES, AssetsTypesFactory } from "../Utils/AssetsTypesFactory";
import NODE_ITEM_FACTORY_MAP from "./NodeItemFactoryMap";
import Robot from "../NodeItem/Robot";

class MainViewRetriever {
  static updateErrorList = () => {};

  static importScene(
    mainView,
    serverScene = [],
    parent = null,
    is2addInServer = false,
    updateErrorList = () => {}
  ) {
    console.log("Importing scene...", mainView, serverScene);
    MainViewRetriever.updateErrorList = updateErrorList;
    const errors = [];
    if (serverScene.length > 0) {
      importSceneRecursive(
        mainView,
        serverScene,
        parent,
        errors,
        is2addInServer
      );
    } else {
      importDefaultScene(mainView);
    }
    console.log("End Importing scene");
    return errors;
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

function importAsset(mainView, nodeDict, parent, errors) {
  const assetType = nodeDict.type;
  const assetName = Maybe.fromNull(nodeDict.assetName).orSome(nodeDict.name);
  const assetActionMap = mainView.getAssetsActionMap();
  // legacy
  let retrievedAction = Maybe.fromNull(assetActionMap[assetName]).orLazy(
    () => assetActionMap[assetName.split(".")[0]]
  );
  if (!retrievedAction && assetType === ASSETS_TYPES.Robot) {
    const defaultRobot = Robot.createBaseObject({
      robotName: assetName,
      nodeDict
    });
    retrievedAction = AssetsTypesFactory.Robot(defaultRobot);
  }
  if (!retrievedAction) {
    errors.push({
      cause: `Asset of type ${assetType} with name ${assetName}, was not found`,
      solution: `please upload ${assetType} ${assetName}`
    });
    return;
  }
  retrievedAction.memory["parentObj"] = { parent: parent };
  retrievedAction.memory["nodeItemDict"] = nodeDict;
  retrievedAction.memory["assetName"] = assetName;
  retrievedAction.memory["name"] = nodeDict.name;
  retrievedAction.memory["isImport"] = true;
  retrievedAction.memory["isVisible"] =
    nodeDict.isVisible === undefined ? true : nodeDict.isVisible;
  // Execute action
  retrievedAction.action(mainView, err => {
    if (err?.exception?.name === "RequestFileError") {
      errors.push({
        cause: `Asset of type ${err.assetType} with name ${err.assetName}, was not found`,
        solution: `please upload ${err.assetType} ${err.assetName}`
      });
      MainViewRetriever.updateErrorList(errors);
    }
  });
}

function importSceneRecursive(
  mainView,
  arrayTree,
  parent = null,
  errors = [],
  is2addInServer = false
) {
  if (!arrayTree) return;
  const sortArrayTree = arrayTree.sort((a, b) => {
    // global ref is first
    if (a.item.type === NODE_ITEM_FACTORY_MAP.GlobalRef.TYPE) return -1;
    if (b.item.type === NODE_ITEM_FACTORY_MAP.GlobalRef.TYPE) return 1;
    // graphItem is last
    if (a.item.type === NODE_ITEM_FACTORY_MAP.GraphItem.TYPE) return 1;
    if (b.item.type === NODE_ITEM_FACTORY_MAP.GraphItem.TYPE) return -1;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  sortArrayTree.forEach(node => {
    if (isAsset(node.item)) {
      importAsset(mainView, node.item, parent, errors);
    } else {
      MainViewRetriever.importNodeItem(
        mainView,
        node.item,
        parent,
        is2addInServer
      );
    }
    if (node.children.length > 0) {
      importSceneRecursive(
        mainView,
        node.children,
        node.name,
        errors,
        is2addInServer
      );
    }
  });
}

function importDefaultScene(mainView) {
  mainView.getSceneMemory().forEach(({ scene }) => {
    const send2server = true;
    mainView.addNodeItem2Tree(GlobalRef.ofDict(scene), null, send2server);
  });
}

export default MainViewRetriever;
