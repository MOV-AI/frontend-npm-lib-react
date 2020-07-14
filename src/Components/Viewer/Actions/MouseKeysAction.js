import Action from "./Action";
import { ACTIONS } from "../MainView/MainViewActions";

class MouseKeysAction extends Action {
  constructor() {
    super();
  }

  onPointerDown(evt, parentView) {
    // to be implemented on sub classes
  }

  onPointerMove(evt, parentView) {
    // to be implemented on sub classes
  }

  onPointerUp(parentView) {
    // to be implemented on sub classes
  }

  onKeyDown(evt, parentView) {
    const codeActionDict = {
      Escape: buttonActionFactory(ACTIONS.orbit),
      KeyG: buttonActionFactory(ACTIONS.dragObjects),
      KeyP: buttonActionFactory(ACTIONS.drawPath),
      KeyB: buttonActionFactory(ACTIONS.drawBoxRegion),
      KeyR: buttonActionFactory(ACTIONS.drawRegion),
      KeyK: buttonActionFactory(ACTIONS.addKeyPoint),
      KeyC: buttonActionFactory(ACTIONS.drawGraph)
    };
    if (evt.code in codeActionDict) {
      codeActionDict[evt.code](parentView);
    }
  }
}

const buttonActionFactory = action => parentView => {
  action.action(parentView);
  parentView.setSelectedAction(action);
};

export default MouseKeysAction;
