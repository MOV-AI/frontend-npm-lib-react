import { Clipboard as Clip } from "mov.ai-core";

const SCENE_CONTEXT = "scene";

export default class Clipboard {
  static copy(value) {
    Clip.write(SCENE_CONTEXT, value);
  }
  static paste() {
    return Clip.read(SCENE_CONTEXT);
  }
}
