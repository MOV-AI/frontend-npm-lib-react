//immutable class, not managing exceptions
export default class Vec {
  constructor(...arrayOfNumbers) {
    this.vec = arrayOfNumbers.map(z => (z ? z : 0));
  }

  toArray() {
    return this.vec;
  }

  toString() {
    return "[" + this.vec.join(", ") + "]";
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

  length() {
    return Math.sqrt(this.dot(this));
  }

  normalize() {
    return this.scale(1 / this.length());
  }

  scale(r) {
    return this.map(z => z * r);
  }

  map(lambda) {
    return Vec.fromArray(this.vec.map(lambda));
  }

  /**
   *
   * @param {*} y: Vec
   * @param {*} operation: (a,b) => op(a,b)
   */
  op(y, operation) {
    return Vec.fromArray(this.vec.map((v, i) => operation(v, y.vec[i])));
  }

  reduce(fold, init) {
    return this.vec.reduce(fold, init);
  }

  static fromArray(array) {
    return new Vec(...array);
  }

  static ZERO = n => new Vec(...new Array(n).fill(0));
  static e = n => i =>
    new Vec(...new Array(n).fill(0).map((x, j) => (j === i ? 1 : 0)));
}
