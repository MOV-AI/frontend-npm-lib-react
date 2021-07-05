import Mat3 from "../Mat3";
import Vec3 from "../Vec3";
import { Quaternion, Matrix } from "@babylonjs/core";

test("test matrix creation from Babylon", () => {
  const localRotationMatrix = new Matrix();
  const quaternion = Quaternion.RotationYawPitchRoll(-Math.PI / 2, 0, 0);
  quaternion.toRotationMatrix(localRotationMatrix);
  const value = Mat3.ofBabylonMatrix(localRotationMatrix).map(x =>
    Math.abs(x) < 0.01 ? 0 : x
  );
  expect(value).toCustomEqual(new Mat3([0, 0, 1], [0, 1, 0], [-1, 0, 0]));
});

test("test matrix prod with vec", () => {
  const value = Mat3.of([0, 0, 1], [1, 0, 0], [0, 1, 0]).prodVec(
    Vec3.of([1, 2, 3])
  );
  expect(value).toCustomEqual(Vec3.of([2, 3, 1]));
});

test("test matrix transpose prod with vec", () => {
  const value = Mat3.of([0, 0, 1], [1, 0, 0], [0, 1, 0]).dotVec(
    Vec3.of([1, 2, 3])
  );
  expect(value).toCustomEqual(Vec3.of([3, 1, 2]));
});
