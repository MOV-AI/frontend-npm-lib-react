import { Vector3 } from "@babylonjs/core";
import Vec2 from "./Vec2";

/**
 * Class that describes immutable 3-vectors
 */
class Vec3 {
  //no for's because performance
  constructor(array) {
    if (array.constructor !== Array || array.length < 3)
      throw new Error(`${array} is not a valid 3-vector`);
    this.vec3 = [...array];
  }

  get x() {
    return this.vec3[0];
  }

  get y() {
    return this.vec3[1];
  }

  get z() {
    return this.vec3[2];
  }

  add(x) {
    return this.op(x, (a, b) => a + b);
  }

  sub(x) {
    return this.op(x, (a, b) => a - b);
  }

  mul(x) {
    return this.op(x, (a, b) => a * b);
  }

  op(x, operation) {
    const ans = [];
    ans[0] = operation(this.vec3[0], x.vec3[0]);
    ans[1] = operation(this.vec3[1], x.vec3[1]);
    ans[2] = operation(this.vec3[2], x.vec3[2]);
    return new Vec3(ans);
  }

  scale(r) {
    return this.map(x => x * r);
  }

  dot(x) {
    return (
      this.vec3[0] * x.vec3[0] +
      this.vec3[1] * x.vec3[1] +
      this.vec3[2] * x.vec3[2]
    );
  }

  map(f) {
    return new Vec3(this.vec3.map(f));
  }

  length() {
    return Math.sqrt(this.dot(this));
  }

  normalize = () => {
    const l = this.length();
    if (l === 0) throw new Error("You can't normalize a zero norm vector");
    return this.scale(1 / l);
  };

  toBabylon() {
    return new Vector3(this.vec3[0], this.vec3[1], this.vec3[2]);
  }

  toArray() {
    return this.vec3;
  }

  toVec2() {
    return new Vec2(this.x, this.y);
  }

  equals(v) {
    if (v.constructor !== this.constructor) return false;
    return v.vec3
      .map((x, index) => v.vec3[index] === x)
      .reduce((e, v) => e && v, true);
  }

  reduce(binary, initialValue) {
    return this.vec3.reduce(binary, initialValue);
  }

  getMax() {
    return this.reduce((a, b) => Math.max(a, b), -Number.MAX_VALUE);
  }

  getMin() {
    return this.reduce((a, b) => Math.min(a, b), Number.MAX_VALUE);
  }

  someNaNOrInfinite() {
    return this.vec3.some(x => isNaN(x) || !isFinite(x));
  }

  static ofBabylon(babylon) {
    return new Vec3([babylon.x, babylon.y, babylon.z]);
  }

  static of(array) {
    return array ? new Vec3(array) : new Vec3([0, 0, 0]);
  }

  static fromArray(array) {
    return Vec3.of(array);
  }

  static random() {
    return new Vec3([1, 2, 3].map(Math.random()));
  }

  /**
   *
   * @param {*} u: Vec3
   */
  static orthogonalBasisFromVector(u) {
    const identityMatrix = [Vec3.e1, Vec3.e2, Vec3.e3];
    //choose pivot
    let pivot = 0;
    for (let i = 0; i < 3; i++) {
      if (u.vec3[i] !== 0) {
        pivot = i;
        break;
      }
    }
    let v = identityMatrix[(pivot + 1) % 3].add(
      identityMatrix[pivot].scale(-u.vec3[(pivot + 1) % 3] / u.vec3[pivot])
    );
    v = v.normalize();
    let w = identityMatrix[(pivot + 2) % 3].add(
      identityMatrix[pivot].scale(-u.vec3[(pivot + 2) % 3] / u.vec3[pivot])
    );
    w = w.normalize();
    w = w.sub(v.scale(v.dot(w)));
    return { u: u.normalize(), v: v, w: w.normalize() };
  }

  static ONES = Vec3.of([1, 1, 1]);
  static ZERO = Vec3.of([0, 0, 0]);
  static e1 = new Vec3([1, 0, 0]);
  static e2 = new Vec3([0, 1, 0]);
  static e3 = new Vec3([0, 0, 1]);
}

export default Vec3;
