import { Clipboard as Clip } from "mov-fe-lib-core";

const SCENE_CONTEXT = "scene";
let COPY_PASTE_UID = 0;

export default class Clipboard {
  static copy(value) {
    Clip.write(SCENE_CONTEXT, value);
  }
  static paste() {
    return Clip.read(SCENE_CONTEXT);
  }

  static getUID() {
    return COPY_PASTE_UID++;
  }
}
