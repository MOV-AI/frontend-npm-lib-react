import {
  Scene,
  Color3,
  RotationGizmo,
  UtilityLayerRenderer,
  Vector3,
  StandardMaterial,
  Mesh,
  Space
} from "babylonjs";
import { TextBlock, AdvancedDynamicTexture } from "@babylonjs/gui/2D";
import Util3d from "../Util3d/Util3d";

class DefaultScene {
  constructor() {
    // empty
  }

  static createGizmo = scene => {
    const gizmoManager = new RotationGizmo(new UtilityLayerRenderer(scene));
    gizmoManager.xGizmo.dragBehavior.detach();
    gizmoManager.xGizmo.scaleRatio = 0.0;
    gizmoManager.yGizmo.dragBehavior.detach();
    gizmoManager.yGizmo.scaleRatio = 0.0;
    return gizmoManager;
  };

  static createCamera = (scene, canvas, forEach) => {
    const COLLISION_RADIUS = 1;
    const camera = Util3d.cameraBuilder(scene)
      .sphericalCoordinates(new Vector3(0, 0, 14))
      .target(Vector3.Zero())
      .name("camera")
      .build();
    camera.attachControl(canvas, false);
    camera.inertia = 0.85;
    camera.collisionRadius = new Vector3(
      COLLISION_RADIUS,
      COLLISION_RADIUS,
      COLLISION_RADIUS
    );
    camera.checkCollisions = true;
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
    scene.clearColor = Color3.Black;
    scene.collisionsEnabled = true;
    scene._uid = scene.getUniqueId();
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
    text.fontSize = 11;
    text.left = -560;
    text.top = -145;
    advancedTexture.addControl(text);
    return text;
  };
}

export default DefaultScene;