import Action from "./Action";

class MouseAction extends Action {
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
}

export default MouseAction;
