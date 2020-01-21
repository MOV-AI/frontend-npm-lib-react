import Vec3 from "../Vec3";
import * as BABYLON from "babylonjs";

test("test vec add", () => {
  expect(
    new Vec3([1, 0, 0]).add(new Vec3([0, 1, 0])).add(new Vec3([0, 0, 1]))
  ).toCustomEqual(new Vec3([1, 1, 1]));
});

test("test vec sub", () => {
  expect(
    new Vec3([1, 0, 0]).sub(new Vec3([0, 1, 0])).sub(new Vec3([0, 0, 1]))
  ).toCustomEqual(new Vec3([1, -1, -1]));
});

test("test vec mul", () => {
  expect(
    new Vec3([1, 1, 1]).mul(new Vec3([1, -1, 0])).add(new Vec3([2, 1, 1]))
  ).toCustomEqual(new Vec3([2, -1, 0]));
});

test("test vec scale", () => {
  expect(new Vec3([1, 1, 1]).scale(10)).toCustomEqual(new Vec3([10, 10, 10]));
});

test("test vec length", () => {
  expect(Vec3.of([1, 1, 1]).length()).toBeCloseTo(Math.sqrt(3), 3);
});

test("test vec creation of Babylon", () => {
  expect(Vec3.ofBabylon(new BABYLON.Vector3(1, 1, 1))).toCustomEqual(
    Vec3.of([1, 1, 1])
  );
});

test("test vec to array", () => {
  expect(Vec3.of([1, 1, 1]).toArray()).toEqual([1, 1, 1]);
});

test("test vec normalize", () => {
  expect(Vec3.of([0, 0, 0]).normalize).toThrow(
    "You can't normalize a zero norm vector"
  );
});

test("test vec getOrthogonalBasis", () => {
  const e_x = Vec3.of([1,0,0])
  const basis = Vec3.orthogonalBasisFromVector(e_x)
  expect(e_x.dot(basis.u)).toBeCloseTo(1, 3)
  expect(e_x.dot(basis.v)).toBeCloseTo(0, 3)
  expect(e_x.dot(basis.w)).toBeCloseTo(0, 3)
});
