import SelectionPlaceHolder from "../Util3d/SelectionPlaceHolder";
import MeshSelector from "./MeshSelector";

export default function getDefaultKeyActions(
  actions,
  parentView,
  defaultAction = () => {}
) {
  const meshSelector = MeshSelector.ofMainView(parentView);
  const selectPlaceHolder = SelectionPlaceHolder.ofMainView(parentView);
  const predicateActionArray = [
    {
      keys: ["Escape"],
      act: () => {
        parentView.addGizmo2Name();
        parentView.highlightMeshesInScene();
        parentView.highlightNodesInTree();
        meshSelector.clear();
        selectPlaceHolder.clear();
        buttonActionFactory(actions.orbit)(parentView);
      }
    }
  ]
    .concat(
      [
        actions.dragObjects,
        actions.drawPath,
        actions.drawBoxRegion,
        actions.addKeyPoint,
        actions.drawRegion,
        actions.drawGraph,
        actions.measure
      ].map((a, i) => ({
        keys: [`Digit${i + 1}`, `Numpad${i + 1}`],
        act: () => buttonActionFactory(a)(parentView)
      }))
    )
    .map(keyActPair => ({
      predicate: e => keyActPair.keys.some(k => k === e.code),
      action: () => {
        defaultAction();
        keyActPair.act();
      }
    }));
  return predicateActionArray;
}

const buttonActionFactory = action => parentView => {
  action.action(parentView);
  parentView.setSelectedAction(action);
};
