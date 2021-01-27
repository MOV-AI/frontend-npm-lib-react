import { UndoManager } from "mov-fe-lib-core";
import MainView from "../../MainView/MainView";
import GraphItem from "../GraphItem";
import { Vector3, Scene, Color3 } from "@babylonjs/core";

jest.mock("../../MainView/MainView");
jest.mock("@babylonjs/core", () => {
  // Works and lets you check for constructor calls:
  return {
    Scene: jest.fn().mockImplementation(() => {
      return { getUniqueId: () => 0 };
    }),
    Color3: jest.fn().mockImplementation(() => {
      return {
        Gray: function () {
          return {};
        }
      };
    })
  };
});

test("undo delete vertex", () => {
  const scene = new Scene({});
  const mainView = new MainView();
  const graph = new GraphItem(scene, mainView);
  graph.addEdge([new Vector3(0, 0, 0), new Vector3(1, 0, 0)]);
  graph.addEdge([new Vector3(1, 0, 0), new Vector3(1, 1, 0)]);
  graph.addEdge([new Vector3(1, 1, 0), new Vector3(0, 1, 0)]);
  graph.addEdge([new Vector3(0, 1, 0), new Vector3(0, 0, 0)]);
});

test("undo delete line edge", () => {});

test("undo delete curve edge", () => {});
