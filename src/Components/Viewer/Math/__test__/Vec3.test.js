import Vec3 from "../Vec3";
import { Vector3 } from "@babylonjs/core";

test("test vec add", () => {
  expect(
    new Vec3([1, 0, 0])
      .add(new Vec3([0, 1, 0]))
      .add(new Vec3([0, 0, 1]))
      .equals(new Vec3([1, 1, 1]))
  ).toBeTruthy();
});

test("test vec sub", () => {
  expect(
    new Vec3([1, 0, 0])
      .sub(new Vec3([0, 1, 0]))
      .sub(new Vec3([0, 0, 1]))
      .equals(new Vec3([1, -1, -1]))
  ).toBeTruthy();
});

test("test vec mul", () => {
  expect(
    new Vec3([1, 1, 1])
      .mul(new Vec3([1, -1, 0]))
      .add(new Vec3([2, 1, 1]))
      .equals(new Vec3([2, -1, 0]))
  ).toBeTruthy();
});

test("test vec scale", () => {
  expect(
    new Vec3([1, 1, 1]).scale(10).equals(new Vec3([10, 10, 10]))
  ).toBeTruthy();
});

test("test vec length", () => {
  expect(Vec3.of([1, 1, 1]).length()).toBeCloseTo(Math.sqrt(3), 3);
});

test("test vec creation of Babylon", () => {
  expect(
    Vec3.ofBabylon(new Vector3(1, 1, 1)).equals(Vec3.of([1, 1, 1]))
  ).toBeTruthy();
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
  const e_x = Vec3.of([1, 0, 0]);
  const basis = Vec3.orthogonalBasisFromVector(e_x);
  expect(e_x.dot(basis.u)).toBeCloseTo(1, 3);
  expect(e_x.dot(basis.v)).toBeCloseTo(0, 3);
  expect(e_x.dot(basis.w)).toBeCloseTo(0, 3);
});
