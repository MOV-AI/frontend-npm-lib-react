import { Vector3 } from "@babylonjs/core";
import Util3d from "../Util3d/Util3d";
import { Animator } from "./Animator";

export default class DefaultMouseEvents {
  static onPointerDown = mainView => evt => {
    mainView.mousePosClick = mainView
      .getMouseCoordsFromRoot()
      .orSome(Vector3.Zero());
    mainView.mousePosMove = mainView.mousePosClick;
    mainView.sceneMemory.forEach(({ camera, canvas }) => {
      if (evt.buttons === 2 || evt.buttons === 4 || evt.ctrlKey) {
        camera.detachControl(canvas);
      }
    });
  };

  static onPointerUp = mainView => () => {
    mainView.sceneMemory.forEach(({ camera, canvas }) => {
      camera.attachControl(canvas, true);
    });
  };

  static onPointerMove = mainView => evt => {
    mainView.sceneMemory.forEach(({ mouseLocationText, camera }) => {
      mainView.getMouseCoordsFromRoot().forEach(currentLocal => {
        setMouseLocationTxt(mouseLocationText, currentLocal);
        const panCamera = () => {
          const v = currentLocal.subtract(mainView.mousePosMove);
          const vBabylon = Util3d.getBabylonCoordinates(v).scale(-1);
          animateCamera(camera, vBabylon);
          mainView.mousePosMove = currentLocal;
        };
        const mouseButtonActions = [
          { predicate: evt.ctrlKey && evt.buttons === 1, action: panCamera },
          { predicate: evt.buttons === 4, action: panCamera }
        ];
        const filterActions = mouseButtonActions.filter(
          ({ predicate }) => predicate
        );
        if (filterActions.length > 0) filterActions[0].action();
      });
    });
  };
}

function animateCamera(camera, v) {
  Animator.builder()
    .initialState({
      camera: camera,
      time: 0,
      T: new Date().getTime()
    })
    .nextState(s => {
      const { camera, time } = s;
      const dt = 0.1; //(new Date().getTime() - T) / 1000;
      const vdt = v.scale(dt);
      camera.position = camera.position.add(vdt);
      camera.setTarget(camera.target.add(vdt));
      return {
        camera: camera,
        time: time + dt,
        T: new Date().getTime()
      };
    })
    .while(s => s.time <= 1)
    .build()
    .play();
}

function setMouseLocationTxt(mouseLocationText, currentLocal) {
  mouseLocationText.text = `x: ${currentLocal.x.toFixed(
    2
  )}, y: ${currentLocal.y.toFixed(2)}`;
}
