// import { UndoManager } from "mov-fe-lib-core";
// import MainView from "../../MainView/MainView";
// import Path from "../Path";
// import { Vector3 } from "@babylonjs/core";

jest.mock("../../MainView/MainView");

test("undo add vertex", () => {});
// test("undo add vertex", () => {
//   const name = "test";
//   const index = 0;
//   const orientation = 1;
//   const copyPosition = Vector3.Zero();
//   const points = [
//     [0, 0, 0],
//     [1, 0, 0],
//     [1, 1, 0]
//   ].map(array => new Vector3(array[0], array[1], array[2]));
//   const scene = {};
//   const item = { mesh: { position: {} }, localPath: points };
//   const mainView = new MainView();
//   const spyCreateNewMeshFromOldUsingNewPoints = (Path.createNewMeshFromOldUsingNewPoints = jest.fn());
//   const undoManager = new UndoManager();
//   undoManager.doIt(
//     Path.getUndoAddKeyPointInBetween(
//       name,
//       index,
//       orientation,
//       item,
//       points,
//       copyPosition,
//       scene,
//       mainView
//     )
//   );
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledTimes(1);
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledWith(
//     [points[0], new Vector3(0.5, 0, 0), points[1], points[2]],
//     scene,
//     item,
//     mainView,
//     Path.onAddNewPointKeyPointUpdate
//   );
//   undoManager.undo();
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledTimes(2);
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledWith(
//     points,
//     scene,
//     item,
//     mainView,
//     Path.onAddNewPointKeyPointUpdate
//   );
//   undoManager.redo();
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledTimes(3);
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledWith(
//     [points[0], new Vector3(0.5, 0, 0), points[1], points[2]],
//     scene,
//     item,
//     mainView,
//     Path.onAddNewPointKeyPointUpdate
//   );
// });

// test("undo delete vertex", () => {
//   const name = "test";
//   const index = 1;
//   const copyPosition = Vector3.Zero();
//   const newPoints = [
//     [0, 0, 0],
//     [1, 0, 0],
//     [1, 1, 0]
//   ].map(array => new Vector3(array[0], array[1], array[2]));
//   const scene = {};
//   const item = { mesh: { position: {} } };
//   const mainView = new MainView();
//   const spyCreateNewMeshFromOldUsingNewPoints = (Path.createNewMeshFromOldUsingNewPoints = jest.fn());
//   const undoManager = new UndoManager();
//   undoManager.doIt(
//     Path.getUndoDeleteKeyPoint(
//       name,
//       index,
//       copyPosition,
//       newPoints,
//       scene,
//       item,
//       mainView
//     )
//   );
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledTimes(1);
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledWith(
//     [newPoints[0], newPoints[2]],
//     scene,
//     item,
//     mainView,
//     Path.onAddNewPointKeyPointUpdate
//   );
//   undoManager.undo();
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledTimes(2);
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledWith(
//     newPoints,
//     scene,
//     item,
//     mainView,
//     Path.onAddNewPointKeyPointUpdate
//   );
//   undoManager.redo();
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledTimes(3);
//   expect(spyCreateNewMeshFromOldUsingNewPoints).toHaveBeenCalledWith(
//     [newPoints[0], newPoints[2]],
//     scene,
//     item,
//     mainView,
//     Path.onAddNewPointKeyPointUpdate
//   );
// });
