//immutable class, not managing exceptions
class Vec2 {
  constructor(x, y) {
    this.vec = [x, y].map(z => (z ? z : 0));
  }

  get x() {
    return this.vec[0];
  }

  get y() {
    return this.vec[1];
  }

  toArray() {
    return this.vec;
  }

  add(y) {
    return this.op(y, (a, b) => a + b);
  }

  sub(y) {
    return this.op(y, (a, b) => a - b);
  }

  mul(y) {
    return this.op(y, (a, b) => a * b);
  }

  div(y) {
    return this.op(y, (a, b) => a / b);
  }

  dot(y) {
    return this.vec.reduce((acc, v, i) => acc + v * y.vec[i], 0);
  }

  prod(y) {
    return new Vec2(this.x * y.x - this.y * y.y, this.x * y.y + this.y * y.x);
  }

  length() {
    return Math.sqrt(this.dot(this));
  }

  normalize() {
    return this.scale(1 / this.length());
  }

  dual() {
    return new Vec2(-this.y, this.x);
  }

  sym() {
    return this.scale(-1);
  }

  conj() {
    return new Vec2(this.x, -this.y);
  }

  scale(r) {
    return this.map(z => z * r);
  }

  map(lambda) {
    return Vec2.fromArray(this.vec.map(lambda));
  }

  /**
   * Returns a vec2 from the operation function bilambda
   * @param {*} y
   * @param {*} biLambda
   */
  op(y, biLambda) {
    return Vec2.fromArray(this.vec.map((v, i) => biLambda(v, y.vec[i])));
  }

  reduce(fold, initial) {
    return this.vec.reduce(fold, initial);
  }

  toObject() {
    return { x: this.x, y: this.y };
  }

  toString() {
    return `{x: ${this.x}, y:${this.y}}`;
  }

  static fromArray(array) {
    if (array.length < 2) throw new Error("array must have size > 2");
    return new Vec2(array[0], array[1]);
  }

  static of(x, y) {
    return new Vec2(x, y);
  }

  static ofBabylon(vector3) {
    return new Vec2(vector3.x, vector3.y);
  }

  static ZERO = new Vec2(0, 0);
  static e1 = new Vec2(1, 0);
  static e2 = new Vec2(0, 1);
}

export default Vec2;
