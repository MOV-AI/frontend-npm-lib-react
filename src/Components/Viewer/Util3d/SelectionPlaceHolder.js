import _uniqBy from "lodash/uniqBy";
import Util3d from "../Util3d/Util3d";
import KeyPoint from "../NodeItem/KeyPoint";
import {
  Quaternion,
  Observable,
  Vector3,
  ShaderMaterial,
  Effect
} from "@babylonjs/core";
import { Maybe } from "monet";
import Vec3 from "../Math/Vec3";
import Vec2 from "../Math/Vec2";
import MeshSelector from "../MainView/MeshSelector";

class SelectionPlaceHolder {
  constructor(mainView) {
    return mainView
      .getSceneMemory()
      .map(({ scene }) => {
        const sceneId = scene._uid;
        if (sceneId in placeHolderInstance) {
          return placeHolderInstance[sceneId];
        }
        this.scene = scene;
        this.mesh = null;
        this.arrayOfMeshes = [];
        this.angleByMeshName = {};
        this.mainView = mainView;
        this.theta = 0;
        placeHolderInstance[sceneId] = this;
        return this;
      })
      .orSome(this);
  }

  push(arrayOfMeshes) {
    if (arrayOfMeshes.length === 0) return this;
    arrayOfMeshes = Array.isArray(arrayOfMeshes)
      ? arrayOfMeshes
      : [arrayOfMeshes];
    this.arrayOfMeshes = _uniqBy(
      this.arrayOfMeshes.concat(arrayOfMeshes),
      mesh => mesh.name
    );
    this.angleByMeshName = this.arrayOfMeshes.reduce((map, m) => {
      map[m.name] = getAngleFromMesh(m);
      return map;
    }, {});
    const placeHolderPosition = Util3d.pointAverage(
      this.arrayOfMeshes.map(mesh =>
        Util3d.getGlobalCoordinates(mesh, mesh.position).toBabylon()
      )
    );
    this.createPlaceHolderIn(placeHolderPosition);
    return this;
  }

  clear() {
    this.arrayOfMeshes = [];
    this.mesh && this.mesh.dispose();
    return this;
  }

  createPlaceHolderIn(p) {
    if (this.mesh === null || this.mesh.isDisposed()) {
      this.mesh = KeyPoint.ofDict(this.scene, {
        name: NAME,
        type: SelectionPlaceHolder,
        position: [0, 0, 0],
        quaternion: Quaternion.Identity(),
        color: [0.5, 0.5, 0.5],
        keyValueMap: {},
        isVisible: true
      }).mesh;
      this.mesh.material = getShaderMaterial(this.scene)();
    }
    const that = this;
    this.mesh.getMouseContextActions = () => [
      {
        title: "Delete",
        onClick: () => {
          that.mainView.addGizmo2Mesh();
          that.clear();
          MeshSelector.ofMainView(this.mainView).clear();
          that.mainView.highlightMeshesInScene();
          that.mainView.highlightNodesInTree();
        }
      }
    ];
    this.mesh.onClick = () => {};
    this.mesh.isSelectionPlaceHolder = true;
    this.mesh.parent = this.mainView.getRootNode().item.mesh;
    this.mesh.position = p.add(new Vector3(0, 0, HEIGHT));
    this.mesh.observers = new Observable();
    this.mesh.observers.add(this.getPlaceHolderObs());
    return this.mesh;
  }

  getPlaceHolderObs() {
    const that = this;
    return ({
      updatedPointMesh: placeHolder,
      is2updateServer,
      displacement
    }) => {
      const filteredMeshes = that.arrayOfMeshes.filter(
        mesh => !mesh.isDisposed()
      );
      const theta = getAngleFromMesh(placeHolder);
      const dTheta = theta - that.theta;
      that.theta = theta;

      filteredMeshes.forEach(mesh => {
        handleMotion(theta, mesh, displacement, placeHolder, dTheta, that);
        if (is2updateServer) {
          that.mainView.updateNodeInServer(mesh.name);
          that.mesh.rotationQuaternion = Quaternion.Identity();
          that.angleByMeshName[mesh.name] = getAngleFromMesh(mesh);
          that.theta = 0;
        }
        // notify babylonjs observers
        Maybe.fromNull(mesh.observers).forEach(obs =>
          obs.notifyObservers({
            updatedPointMesh: mesh,
            is2updateServer,
            displacement
          })
        );
        // notify graph observers
        Maybe.fromNull(mesh.graphVertex).forEach(({ vertexObs }) => {
          vertexObs({
            updatedPointMesh: mesh,
            is2updateServer,
            displacement
          });
        });
      });
      if (filteredMeshes.length === 0) {
        that.clear();
      }
    };
  }

  static ofMainView(mainView) {
    return new SelectionPlaceHolder(mainView);
  }
}

const getShaderMaterial = scene => (vertex = VERTEX, frag = FRAG) => {
  Effect.ShadersStore["customVertexShader"] = vertex;
  Effect.ShadersStore["customFragmentShader"] = frag;
  const shaderMaterial = new ShaderMaterial(
    "shader",
    scene,
    { vertex: "custom", fragment: "custom" },
    {
      attributes: ["position", "normal", "uv"],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "time"
      ]
    }
  );
  shaderMaterial.backFaceCulling = false;
  let time = 0;
  let T = new Date().getTime();
  shaderMaterial.onBindObservable.add(() => {
    const dt = (new Date().getTime() - T) / 1000;
    shaderMaterial.setFloat("time", time);
    time = time + dt;
    T = new Date().getTime();
  });
  return shaderMaterial;
};

const VERTEX = `precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;

// Uniforms
uniform mat4 worldViewProjection;

// Varying
varying vec3 vPosition;
varying vec3 vNormal;

void main(void) {
    gl_Position = worldViewProjection * vec4(position, 1.0);
    vPosition = position;
    vNormal = normal;
}`;

const FRAG = `precision highp float;

// Varying
varying vec3 vPosition;
varying vec3 vNormal;

// Uniforms
uniform mat4 world;
uniform float time;

void main(void) {
    // World values
    vec3 p = vec3(world * vec4(vPosition, 1.0));
    vec3 n = normalize(vec3(world * vec4(vNormal, 0.0)));
    float spatialFreq = 10.;
    float timeFreq = 10.;
    float power = sin(spatialFreq * p.y - timeFreq * time);
    vec3 color = power *  vec3( 1, 0, 0 ) + (1. - power) * vec3(1,0.5,0.5);
    gl_FragColor = vec4(color, 1.);
}`;

const getAngleFromMesh = mesh =>
  Maybe.fromNull(mesh.rotationQuaternion)
    .map(q => 2 * Math.atan2(q.z, q.w))
    .orSome(0);

const placeHolderInstance = {};
const NAME = "placeholder";
const HEIGHT = 1.5;

function handleMotion(theta, mesh, displacement, placeHolder, dTheta, that) {
  if (Math.abs(theta) < 1e-3) {
    handleTranslation(mesh, displacement);
  } else {
    handleRotation(placeHolder, mesh, dTheta, that, theta);
  }
}

function handleRotation(placeHolder, mesh, dTheta, that, theta) {
  const baseCoord = Vec3.ofBabylon(placeHolder.position);
  const v = Vec3.ofBabylon(mesh.position).sub(baseCoord).toVec2();
  const eITheta = Vec2.of(Math.cos(dTheta), Math.sin(dTheta));
  const rV = eITheta.prod(v);
  const finalV = Vec3.of([rV.x, rV.y, 0]).toBabylon();
  mesh.position = new Vector3(
    placeHolder.position.x,
    placeHolder.position.y,
    mesh.position.z
  ).add(finalV);
  const finalTheta = that.angleByMeshName[mesh.name] + theta;
  // divide by 2 because of quaternion multiplication.
  mesh.rotationQuaternion = new Quaternion(
    0,
    0,
    Math.sin(finalTheta / 2),
    Math.cos(finalTheta / 2)
  );
}

function handleTranslation(mesh, displacement) {
  const localDisplacement = Util3d.getLocalCoordFromWorld(
    mesh,
    Vec3.ofBabylon(displacement),
    false
  );
  const newPos = Vec3.ofBabylon(mesh.position).add(localDisplacement);
  // translating
  mesh.position = newPos.toBabylon();
}

export default SelectionPlaceHolder;
