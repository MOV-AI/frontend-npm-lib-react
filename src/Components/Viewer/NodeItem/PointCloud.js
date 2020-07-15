import NodeItem from "./NodeItem";
import { Mesh, StandardMaterial, Color3, VertexData } from "@babylonjs/core";
import { Maybe } from "monet";
import { Utils, MasterDB } from "mov.ai-core";

const ofNull = Utils.ofNull;
class PointCloud extends NodeItem {
  /**
   *
   * @param {*} mesh
   * @param {*} robot: {name: string, id: string} representing a robot
   */
  constructor(mesh, robot) {
    super(mesh);
    this.robot = robot;
    this.pointCloudSubscribe();
  }

  pointCloudSubscribe() {
    MasterDB.subscribe(
      {
        Scope: "Robot",
        Name: this.robot.id,
        Parameter: "front_lidar"
      },
      data => {
        Maybe.fromNull(data)
          .flatMap(d => ofNull(d.key))
          .flatMap(k => ofNull(k.Robot[this.robot.id]))
          .flatMap(r => ofNull(r.Parameter))
          .flatMap(p => ofNull(p.front_lidar))
          .flatMap(f => ofNull(f.Value))
          .flatMap(v => ofNull(v.points))
          .forEach(points => this.updatePointCloud(points));
      },
      data => {
        Maybe.fromNull(data.value)
          .flatMap(v => ofNull(v.Robot))
          .flatMap(r => ofNull(r[this.robot.id]))
          .flatMap(r => ofNull(r.Parameter))
          .flatMap(p => ofNull(p.front_lidar))
          .flatMap(f => ofNull(f.Value))
          .flatMap(v => ofNull(v.points))
          .forEach(points => this.updatePointCloud(points));
      }
    );
  }

  /**
   *
   * @param {*} points: Array<3-Array>
   */
  updatePointCloud(points) {
    const vertexData = new VertexData();
    //Assign positions
    vertexData.positions = points.flatMap(x => x);
    const colors = new Array(4 * points.length);
    vertexData.colors = colors.fill(1.0);
    //Apply vertexData to custom mesh
    vertexData.applyToMesh(this.mesh, true);
  }

  dispose() {
    super.dispose();
    MasterDB.unsubscribe({
      Scope: "Robot",
      Name: this.robot.id,
      Parameter: "front_lidar"
    });
  }

  getType = () => PointCloud.TYPE;

  static TYPE = "PointCloud";

  static ofDict(scene, dict = null, mainView = null) {
    if (!dict || !mainView)
      throw "null dictionary describing point cloud or null mainView";

    const pointCloudMesh = new Mesh(`cloudPoint${dict.name}`, scene);
    const mat = new StandardMaterial(`cloudPoint${dict.name}Material`, scene);
    mat.emissiveColor = new Color3(1, 1, 1);
    mat.disableLighting = true;
    mat.pointsCloud = true;
    mat.pointSize = 2;
    pointCloudMesh.material = mat;

    return new PointCloud(pointCloudMesh, dict);
  }
}

export default PointCloud;
