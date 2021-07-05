import TreeObject from "../TreeObject/TreeObject";
import TreeNode from "../TreeObject/TreeNode";
import GlobalRef from "../NodeItem/GlobalRef";
import { MasterDB } from "mov-fe-lib-core";
import Constants from "./Constants";
import GraphItem from "../NodeItem/GraphItem";
import NavigationPreviewItem from "../NodeItem/NavigationPreviewItem";
import _debounce from "lodash/debounce";

const CLOUD_FUNCTION_NAME = Constants.CLOUD_FUNCTION_NAME;

class TreeServerUtils {
  constructor(sceneName, undoManager, alert = window.alert) {
    this.sceneName = sceneName;
    this.undoManager = undoManager;
    this.alert = (msg, type) => alert(msg, type);
    this.staticNodeTypes = [GraphItem.TYPE, NavigationPreviewItem.TYPE];
  }

  static ofScene(sceneName, undoManager, alert) {
    return new TreeServerUtils(sceneName, undoManager, alert);
  }

  static undoAction = _debounce(utils => utils.lostConnection(), 500);

  //========================================================================================
  /*                                                                                      *
   *                                    Util functions                                    *
   *                                                                                      */
  //========================================================================================

  getNodeFromTree = (name, objectTree) => {
    return new TreeObject(objectTree).getNode(x => name === x.title);
  };

  getParentFromChild = (childName, objectTree) => {
    return new TreeObject(objectTree).getParentNode(x => childName === x.title);
  };

  deleteNodeFromTreeUsingName = (name, objectTree, is2delInServer = true) => {
    this.getNodeFromTree(name, objectTree).forEach(node => {
      // destroy treeNode
      TreeNode.dispose(node);

      if (is2delInServer) {
        this.deleteNodeInServer(name);
      }

      const maybeParent = this.getParentFromChild(name, objectTree);
      maybeParent.forEach(parentNode => {
        parentNode.children = parentNode.children.filter(x => x.title !== name);
      });

      objectTree = objectTree.filter(x => x.title !== name);
    });
    return objectTree;
  };

  getNodeFromTreeWithPredicate = (predicate, objectTree) => {
    return new TreeObject(objectTree).getNode(predicate);
  };

  addNodeItem2Tree = (
    objectTree,
    nodeItem,
    parentName = GlobalRef.NAME,
    is2addInServer = true,
    isVisible = true
  ) => {
    // delete if already exist
    this.deleteNodeFromTreeUsingName(nodeItem.name, objectTree, is2addInServer);
    const isStatic = this.staticNodeTypes.includes(nodeItem.getType());

    const node2Add = TreeNode.builder()
      .title(nodeItem.name)
      .item(nodeItem)
      .isVisible(isVisible)
      .isStatic(isStatic)
      .build();

    if (parentName) {
      const maybeParentNode = this.getNodeFromTree(parentName, objectTree);
      maybeParentNode.forEach(parentNode => {
        if (is2addInServer) this.addNodeItem2Server(node2Add, parentNode.title);
        parentNode.children.push(node2Add);
      });
    } else {
      objectTree.push(node2Add);
      if (is2addInServer) this.addNodeItem2Server(node2Add, null);
    }
    return objectTree;
  };

  lostConnection = () => {
    this.undoManager.undo({ is2UpdateInServer: false });
    setImmediate(() => {
      this.alert(
        "Sorry, work not saved. Please check internet connection",
        "error"
      );
    });
  };

  //========================================================================================
  /*                                                                                      *
   *                                   Server functions                                   *
   *                                                                                      */
  //========================================================================================

  updateNodeInServer = (name, objectTree, oldName = null) => {
    console.log("updateNodeInServer!", name, this.sceneName);
    this.getNodeFromTree(name, objectTree).forEach(node => {
      const parentName = this.getParentFromChild(name, objectTree)
        .map(x => x.title)
        .orNull();
      MasterDB.cloudFunction(
        CLOUD_FUNCTION_NAME,
        "updateNode",
        [TreeNode.toDict(node), parentName, oldName, this.sceneName],
        data => {
          console.log("Update node with success?", data.success, data.error);
        }
      ).catch(err => {
        console.warn("Update node error", name, err);
        TreeServerUtils.undoAction(this);
      });
    });
  };

  addNodeItem2Server = (treeNode, parentName) => {
    MasterDB.cloudFunction(
      CLOUD_FUNCTION_NAME,
      "addNodeItem",
      [TreeNode.toDict(treeNode), parentName, this.sceneName],
      data => {
        console.log("Add node with success?", data.success);
      }
    ).catch(err => {
      console.warn("Add node error", treeNode.title, err);
      TreeServerUtils.undoAction(this);
    });
  };

  deleteNodeInServer = name => {
    MasterDB.cloudFunction(
      CLOUD_FUNCTION_NAME,
      "deleteNodeByName",
      [name, this.sceneName],
      data => {
        console.log("Deleted node with success?", data.success);
      }
    ).catch(err => {
      console.warn("Deleted node error", name, err);
      TreeServerUtils.undoAction(this);
    });
  };
}

export default TreeServerUtils;
