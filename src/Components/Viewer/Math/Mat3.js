import Vec3 from "./Vec3";
import * as BABYLON from "babylonjs";

class Mat3 {
  constructor(v1, v2, v3) {
    const v = [v1, v2, v3];
    for (let i = 0; i < v.length; i++) {
      if (v[i].constructor !== Array || v[i].length < 3)
        throw "One of the inputs is not a array";
    }
    this.mat3 = v.map(x => new Vec3(x));
  }

  /**
   * Matrix prod with  3-vector
   * @param {*} v: 3-vector
   *
   * returns 3-vector
   */
  prodVec(v) {
    let ans = new Vec3([0, 0, 0]);
    for (let i = 0; i < this.mat3.length; i++) {
      ans = ans.add(this.mat3[i].scale(v.vec3[i]));
    }
    return ans;
  }

  /**
   * Matrix transpose prod with 3-vec
   * @param {*} v : 3-vector
   */
  dotVec(v) {
    const ans = [0, 0, 0];
    for (let i = 0; i < this.mat3.length; i++) {
      ans[i] = this.mat3[i].dot(v);
    }
    return new Vec3(ans);
  }

  prod(m) {
    const u = this.prodVec(m.mat3[0]);
    const v = this.prodVec(m.mat3[1]);
    const w = this.prodVec(m.mat3[2]);
    return new Mat3(u.vec3, v.vec3, w.vec3);
  }

  dot(m) {
    const u = this.dotVec(m.mat3[0]);
    const v = this.dotVec(m.mat3[1]);
    const w = this.dotVec(m.mat3[2]);
    return new Mat3(u.vec3, v.vec3, w.vec3);
  }

  map(f) {
    const u = this.mat3[0].map(f);
    const v = this.mat3[1].map(f);
    const w = this.mat3[2].map(f);
    return new Mat3(u.vec3, v.vec3, w.vec3);
  }

  equals(mat) {
    if (mat.constructor !== this.constructor) return false;
    return this.mat3
      .map((v, index) => v.equals(mat.mat3[index]))
      .reduce((e, v) => e && v, true);
  }

  static ofBabylonMatrix(babylonMat) {
    const arrayMat = BABYLON.Matrix.GetAsMatrix3x3(babylonMat);
    const u = [arrayMat[0], arrayMat[1], arrayMat[2]];
    const v = [arrayMat[3], arrayMat[4], arrayMat[5]];
    const w = [arrayMat[6], arrayMat[7], arrayMat[8]];
    return new Mat3(u, v, w);
  }

  static of(v1, v2, v3) {
    return new Mat3(v1, v2, v3);
  }

  static eye() {
    return new Mat3([1, 0, 0], [0, 1, 0], [0, 0, 1]);
  }
}

export default Mat3;
