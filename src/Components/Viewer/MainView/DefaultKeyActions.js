import SelectionPlaceHolder from "../Util3d/SelectionPlaceHolder";
import MeshSelector from "./MeshSelector";

export default function getDefaultKeyActions(
  actions,
  parentView,
  defaultAction = () => {}
) {
  const meshSelector = MeshSelector.ofMainView(parentView);
  const selectPlaceHolder = SelectionPlaceHolder.ofMainView(parentView);

  const actionOrderedList = [];
  const actionArray = Object.values(actions);
  for (let index = actionArray.length - 2; index >= 0; index--) {
    actionOrderedList.push(actionArray[index]);
  }

  const predicateActionArray = [
    {
      keys: ["Escape"],
      act: () => {
        parentView.addGizmo2Name();
        parentView.highlightMeshesInScene();
        parentView.highlightNodesInTree();
        parentView.setProperties();
        meshSelector.clear();
        selectPlaceHolder.clear();
        buttonActionFactory(actions.orbit)(parentView);
      }
    }
  ]
    .concat(
      actionOrderedList.map((a, i) => ({
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
