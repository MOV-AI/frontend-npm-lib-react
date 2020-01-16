import Vec3 from "../Math/Vec3";
import Mat3 from "../Math/Mat3";
import { Maybe } from "monet";
import GizmoManagerBuilder from "./GizmoManagerBuilder.js";
import CameraBuilder from "./CameraBuilder";
import PositionalLightBuilder from "./PositionalLightBuilder";
import ReferentialBuilder from "./ReferentialBuilder";
import GroundBuilder from "./GroundBuilder";
import DirectionalLightBuilder from "./DirectionalLightBuilder";
import Box from "../NodeItem/Box";
import * as earcut from "earcut";
import {
  Vector3,
  Color3,
  Quaternion,
  StandardMaterial,
  VertexData,
  Mesh,
  Matrix,
  MeshBuilder,
  VertexBuffer
} from "babylonjs";

const randomDigits = () => {
  return Math.floor(Math.random() * 1e3);
};

class Util3d {
  static computeLocalCoordinateFromMesh(mesh, positionInWorldCoord) {
    if (!mesh.parent) {
      return positionInWorldCoord;
    }
    const meshParent = mesh.parent;
    const meshParentPos = Vec3.ofBabylon(meshParent.position);
    const meshParentRotMat = Util3d.getRotationMatrix(meshParent);
    const meshParentScaling = Vec3.ofBabylon(meshParent.scaling);
    // assume scaling != 0
    const inverseScaling = meshParentScaling.map(x => 1.0 / x);

    return inverseScaling.mul(
      meshParentRotMat.dotVec(
        Util3d.computeLocalCoordinateFromMesh(
          meshParent,
          positionInWorldCoord
        ).sub(meshParentPos)
      )
    );
  }

  static getRotationMatrix(mesh) {
    const localRotationMatrix = new Matrix();
    const maybeQuaternion = Maybe.fromNull(mesh.rotationQuaternion);
    maybeQuaternion.forEach(quaternion =>
      quaternion.toRotationMatrix(localRotationMatrix)
    );
    maybeQuaternion.orElseRun(() => {
      const quaternion = Quaternion.RotationYawPitchRoll(
        mesh.rotation.y,
        mesh.rotation.x,
        mesh.rotation.z
      );
      quaternion.toRotationMatrix(localRotationMatrix);
    });
    return Mat3.ofBabylonMatrix(localRotationMatrix);
  }

  static showNormals(scene, mesh, size = 1, color = Color3.Red()) {
    const normals = mesh.getVerticesData(VertexBuffer.NormalKind);
    const positions = mesh.getVerticesData(VertexBuffer.PositionKind);
    const lines = [];
    for (let i = 0; i < normals.length; i += 3) {
      const v1 = Vector3.FromArray(positions, i);
      const v2 = v1.add(Vector3.FromArray(normals, i).scaleInPlace(size));
      lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
    }
    const normalLines = MeshBuilder.CreateLineSystem(
      "normalLines",
      { lines: lines },
      scene
    );
    normalLines.color = color;
    normalLines.parent = mesh;
    return normalLines;
  }

  static orthogonalBasisFromVector(u) {
    const identityMatrix = [
      new Vector3(1, 0, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 0, 1)
    ];
    const uArray = [u.x, u.y, u.z];
    // choose pivot
    let pivot = 0;
    for (let i = 0; i < 3; i++) {
      if (uArray[i] != 0) {
        pivot = i;
        break;
      }
    }
    let v = identityMatrix[(pivot + 1) % 3].add(
      identityMatrix[pivot].scale(-uArray[(pivot + 1) % 3] / uArray[pivot])
    );
    v = v.normalize();
    let w = identityMatrix[(pivot + 2) % 3].add(
      identityMatrix[pivot].scale(-uArray[(pivot + 2) % 3] / uArray[pivot])
    );
    w = w.normalize();
    w = w.subtract(v.scale(Vector3.Dot(v, w)));
    return { u: Vector3.FromArray(uArray).normalize(), v: v, w: w.normalize() };
  }

  static createOrientedCone = (
    scene,
    u = new Vector3(1, 0, 0),
    color = Color3(0.5, 0.5, 0.5),
    name = `OrientedCone${randomDigits()}`,
    isPickable = true,
    segments = 16
  ) => {
    const surface = {
      positions: [],
      faces: []
    };
    const d = u.length() / 3;
    const mat3 = Util3d.orthogonalBasisFromVector(u);
    const v = mat3.v;
    const w = mat3.w;

    const orientation = Math.sign(Vector3.Dot(Vector3.Cross(v, w), u));
    // positions
    for (let i = 0; i < segments; i++) {
      const theta = orientation * ((2 * Math.PI) / segments) * i;
      surface.positions.push(
        v.scale(d * Math.cos(theta)).add(w.scale(d * Math.sin(theta)))
      );
    }

    surface.positions.push(Vector3.Zero());
    surface.positions.push(u);

    const zeroIndex = surface.positions.length - 1;
    const uIndex = surface.positions.length - 2;

    for (let i = 0; i < segments; i++) {
      // bottom faces
      surface.faces.push([zeroIndex, (i + 1) % segments, i]);
      // cone faces
      surface.faces.push([uIndex, i, (i + 1) % segments]);
    }

    // mesh
    const mesh = Util3d.meshFromPositionAndFaces(
      name,
      scene,
      surface.positions,
      surface.faces
    );
    mesh.convertToFlatShadedMesh();
    const material = new StandardMaterial(`OrientedConeMaterial${name}`, scene);
    material.diffuseColor = color;
    material.emissiveColor = color;
    mesh.material = material;
    mesh.isPickable = isPickable;
    return mesh;
  };

  static createSphere = (
    scene,
    color = Color3(0.5, 0.5, 0.5),
    diameter = 1,
    name = `Sphere${randomDigits()}`,
    isPickable = true
  ) => {
    const sphere = Mesh.CreateSphere(name, 16, diameter, scene);
    const material = new StandardMaterial(`SphereMaterial${name}`, scene);
    material.diffuseColor = color;
    material.emissiveColor = color;
    sphere.material = material;
    sphere.isPickable = isPickable;
    return sphere;
  };

  static createBox = (
    scene,
    color = Color3(0.5, 0.5, 0.5),
    size = Box.DEFAULT_SIZE,
    name = `Box${randomDigits()}`,
    isPickable = true
  ) => {
    const box = Mesh.CreateBox(name, size, scene);
    const material = new StandardMaterial(`BoxMaterial${name}`, scene);
    material.diffuseColor = color;
    material.emissiveColor = color;
    box.material = material;
    box.isPickable = isPickable;
    return box;
  };

  static positionalLightBuilder = scene => {
    return new PositionalLightBuilder(scene);
  };

  static directionalLightBuilder = scene => {
    return new DirectionalLightBuilder(scene);
  };

  static cameraBuilder(scene) {
    return new CameraBuilder(scene);
  }

  static guizoManagerBuilder(scene) {
    return new GizmoManagerBuilder(scene);
  }

  static referentialBuilder = scene => {
    return new ReferentialBuilder(scene);
  };

  /**
   * Return a maybe position of intersection of the mouse and a ground mesh
   *
   * @param {Scene} scene Babylon scene
   * @param {Ground} ground a Babylon mesh that represents the ground
   * @returns {Maybe} a maybe 3-vector representing the mouse ground intersection
   */
  static getGroundPosition = function(scene, ground) {
    // Use a predicate to get position on the ground
    const pickinfo = scene.pick(
      scene.pointerX,
      scene.pointerY,
      mesh => mesh === ground
    );
    if (pickinfo.hit) return Maybe.some(pickinfo.pickedPoint);
    return Maybe.none();
  };

  static pickMesh = (scene, ground) => {
    const pickInfo = scene.pick(
      scene.pointerX,
      scene.pointerY,
      mesh => mesh !== ground && mesh.isEnabled()
    );
    if (pickInfo.hit && pickInfo.pickedMesh.isPickable) {
      return Maybe.some(pickInfo.pickedMesh);
    }
    return Maybe.none();
  };

  static groundBuilder = scene => {
    return new GroundBuilder(scene);
  };

  static meshFromPositionAndFaces(
    name,
    scene,
    positions,
    faces,
    updatable = true
  ) {
    const vertexData = new VertexData();

    vertexData.positions = positions.flatMap(z => [z.x, z.y, z.z]);
    vertexData.indices = faces.flatMap(z => z);

    let mesh = new Mesh(name, scene);
    vertexData.applyToMesh(mesh, updatable);
    // mesh.createNormals();
    return mesh;
  }

  /**
   *
   * @param {*} polygon: Array of babylonjs vector3, representing a boundary of a polygon
   */
  static triangulatePolygon(polygon) {
    const triangulation = earcut(
      polygon.map(x => [x.x, x.y, x.z]).flatMap(x => x),
      null,
      3
    );
    const len = triangulation.length / 3;
    const ans = [];
    for (let i = 0; i < len; i++) {
      const i3 = 3 * i;
      ans.push([
        triangulation[i3],
        triangulation[i3 + 1],
        triangulation[i3 + 2]
      ]);
    }
    return ans;
  }

  /**
   *
   * @param {*} polygon: Array of babylonjs vector3, representing a boundary of a polygon
   * Returns a real number representing the orientation of the curve, if positive represents a counterclockwise orientation, clockwise otherwise.
   */
  static computeOrientation(polygon) {
    const n = polygon.length;
    const vec3Poly = polygon.map(x => Vec3.ofBabylon(x));
    let orientation = 0;
    vec3Poly.forEach((a, i) => {
      const modi = (i + 1) % n;
      const edge = vec3Poly[modi].sub(vec3Poly[i]);
      orientation += Vec3.of([-a.getY(), a.getX(), a.getZ()]).dot(edge);
    });
    return orientation / 2;
  }

  /**
   * @param {*} arrayOfPoints: array of babylon vec3
   * Returns the average
   */
  static pointAverage(arrayOfPoints) {
    if (!arrayOfPoints || arrayOfPoints.length == 0) return Vector3.Zero();
    return arrayOfPoints
      .reduce((e, x) => e.add(x), Vector3.Zero())
      .scale(1 / arrayOfPoints.length);
  }

  static pointAverageVec3(arrayOfPoints) {
    if (!arrayOfPoints || arrayOfPoints.length == 0) return Vec3.ZERO;
    return arrayOfPoints
      .reduce((e, x) => e.add(x), Vec3.ZERO)
      .scale(1 / arrayOfPoints.length);
  }
}

export default Util3d;
