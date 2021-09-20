import {
  Scene,
  RotationGizmo,
  UtilityLayerRenderer,
  Vector3,
  StandardMaterial,
  Mesh,
  Space
} from "@babylonjs/core";
import { TextBlock, AdvancedDynamicTexture } from "@babylonjs/gui/2D";
import Util3d from "../Util3d/Util3d";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import Constants from "./Constants";

class DefaultScene {
  static createGizmo = scene => {
    const gizmoManager = new RotationGizmo(new UtilityLayerRenderer(scene));
    gizmoManager.xGizmo.dragBehavior.detach();
    gizmoManager.xGizmo.scaleRatio = 0.0;
    gizmoManager.yGizmo.dragBehavior.detach();
    gizmoManager.yGizmo.scaleRatio = 0.0;
    return gizmoManager;
  };

  static createCamera = (scene, canvas, forEach = camera => {}) => {
    const COLLISION_RADIUS = 1;
    const camera = Util3d.cameraBuilder(scene)
      .sphericalCoordinates(new Vector3(0, 0, 14))
      .target(Vector3.Zero())
      .name("camera")
      .build();
    camera.attachControl(canvas, false);
    camera.inertia = 0.7;
    camera.collisionRadius = new Vector3(
      COLLISION_RADIUS,
      COLLISION_RADIUS,
      COLLISION_RADIUS
    );
    camera.panningInertia = 0.5;
    camera.checkCollisions = true;
    camera.panningSensibility = 0;
    camera.lowerRadiusLimit = 2;
    const browser = get_browser();
    if (browser.name === "Firefox" && browser.version <= 89) {
      camera.wheelPrecision = 100;
    }
    forEach(camera);
    return camera;
  };

  static createLight = scene => {
    return Util3d.directionalLightBuilder(scene)
      .name("light")
      .direction(new Vector3(0, -1, 0))
      .intensity(0.35)
      .build();
  };

  static createMeshGround = (scene, width = 20, height = 20) => {
    const ground = Mesh.CreateGround("groundMesh", width, height, 20, scene);
    ground.translate(new Vector3(0, -1, 0), 1e-2, Space.WORLD);
    ground.material = new StandardMaterial("wireframe", scene);
    ground.material.wireframe = true;
    ground.isPickable = false;
    ground.checkCollisions = true;
    return ground;
  };

  static createScene = engine => {
    const scene = new Scene(engine);
    scene.collisionsEnabled = true;
    scene._uid = scene.getUniqueId();
    if (Constants.DEBUG) {
      scene.debugLayer.show({
        embedMode: true,
        globalRoot: document.body,
        overlay: true
      });
    }
    return scene;
  };

  static createMouseLocationText = scene => {
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      scene
    );
    const text = new TextBlock();
    text.text = "";
    text.color = "white";
    text.fontSize = 17;
    text.left = -560;
    text.top = -145;
    advancedTexture.addControl(text);
    return text;
  };
}

/**
 * From https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
 */
function get_browser() {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
}

export default DefaultScene;
