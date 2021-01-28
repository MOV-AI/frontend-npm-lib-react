import Action from "./Action";

class MouseKeysAction extends Action {
  onPointerDown(evt, parentView) {
    // to be implemented on sub classes
  }

  onPointerMove(evt, parentView) {
    // to be implemented on sub classes
  }

  onPointerUp(evt, parentView) {
    // to be implemented on sub classes
  }

  onKeyUp(evt, parentView) {}
}

export default MouseKeysAction;
