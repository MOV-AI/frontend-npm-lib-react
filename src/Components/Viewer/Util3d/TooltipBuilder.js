import { Animation, ActionManager, ExecuteCodeAction } from "@babylonjs/core";
import {
  Rectangle,
  TextBlock,
  Control,
  AdvancedDynamicTexture
} from "@babylonjs/gui";

class TooltipBuilder {
  constructor(mesh, scene) {
    this._mesh = mesh;
    this._scene = scene;
    this._name = `tooltip${Math.floor(Math.random() * 1e3)}`;
    // Tooltip box (Rectangle) properties
    this._width = null;
    this._height = null;
    this._thickness = 2;
    this._linkOffsetX = "100px";
    this._linkOffsetY = "-50px";
    this._background = "grey";
    this._alpha = 0.7;
    this._scaleX = 0;
    this._scaleY = 0;
    this._cornerRadius = 30;
    // Tooltip text (TextBlock) properties
    this._text = "";
    this._color = "White";
    this._fontSize = 14;
    this._padding = "20px";
  }

  name(name) {
    this._name = name;
    return this;
  }

  mesh(mesh) {
    this._mesh = mesh;
    return this;
  }

  // Rectangle properties

  width(width) {
    this._width = width;
    return this;
  }

  height(height) {
    this._height = height;
    return this;
  }

  linkOffsetX(linkOffsetX) {
    this._linkOffsetX = linkOffsetX;
    return this;
  }

  linkOffsetY(linkOffsetY) {
    this._linkOffsetY = linkOffsetY;
    return this;
  }

  background(background) {
    this._background = background;
    return this;
  }

  alpha(alpha) {
    this._alpha = alpha;
    return this;
  }

  scaleX(scaleX) {
    this._scaleX = scaleX;
    return this;
  }

  scaleY(scaleY) {
    this._scaleY = scaleY;
    return this;
  }

  cornerRadius(cornerRadius) {
    this._cornerRadius = cornerRadius;
    return this;
  }

  // Tooltip properties

  text(text) {
    this._text = text;
    return this;
  }

  color(color) {
    this._color = color;
    return this;
  }

  fontSize(fontSize) {
    this._fontSize = fontSize;
    return this;
  }

  padding(padding) {
    this._padding = padding;
    return this;
  }

  build() {
    // GUI
    const builder = this;
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.useInvalidateRectOptimization = false;
    // Set tooltip rectangle box
    const tooltipBox = new Rectangle(this._name);
    advancedTexture.addControl(tooltipBox);
    tooltipBox.thickness = 2;
    if (this._width) tooltipBox.width = this._width;
    if (this._height) tooltipBox.height = this._height;
    tooltipBox.linkOffsetX = this._linkOffsetX;
    tooltipBox.linkOffsetY = this._linkOffsetY;
    tooltipBox.transformCenterX = 0;
    tooltipBox.transformCenterY = 1;
    tooltipBox.background = this._background;
    tooltipBox.alpha = this._alpha;
    tooltipBox.scaleX = this._scaleX;
    tooltipBox.scaleY = this._scaleY;
    tooltipBox.cornerRadius = this._cornerRadius;
    tooltipBox.adaptWidthToChildren = true;
    tooltipBox.adaptHeightToChildren = true;
    tooltipBox.linkWithMesh(this._mesh);
    // Set tooltip text block
    const textBlock = new TextBlock();
    textBlock.text = this._text;
    textBlock.color = this._color;
    textBlock.fontSize = this._fontSize;
    textBlock.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    tooltipBox.addControl(textBlock);
    textBlock.alpha = 1 / textBlock.parent.alpha;
    textBlock.paddingTop = this._padding;
    textBlock.paddingBottom = this._padding;
    textBlock.paddingLeft = this._padding;
    textBlock.paddingRight = this._padding;
    textBlock.resizeToFit = true;
    // Set mesh action manager
    const actionManager = new ActionManager(this._scene);
    this._mesh.actionManager = actionManager;
    // Animation to show/hide tooltip
    const scaleXAnimation = new Animation(
      "tooltipAnimation",
      "scaleX",
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const scaleYAnimation = new Animation(
      "tooltipAnimation",
      "scaleY",
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const keys = [
      {
        frame: 0,
        value: 0
      },
      {
        frame: 10,
        value: 1
      }
    ];
    scaleXAnimation.setKeys(keys);
    scaleYAnimation.setKeys(keys);
    tooltipBox.animations = [];
    tooltipBox.animations.push(scaleXAnimation);
    tooltipBox.animations.push(scaleYAnimation);
    // Register actions: OnPointerOverTrigger
    actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function (_) {
        builder._scene.beginAnimation(tooltipBox, 0, 10, false);
      })
    );
    // Register actions: OnPointerOutTrigger
    actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function (_) {
        builder._scene.beginAnimation(tooltipBox, 10, 0, false);
      })
    );
    return textBlock;
  }
}

export default TooltipBuilder;
