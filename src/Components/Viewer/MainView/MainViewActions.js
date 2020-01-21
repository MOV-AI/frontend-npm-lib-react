import DragObjectsAction from "../Actions/DragObjectsAction";
import AddKeyPointAction from "../Actions/AddKeyPointAction";
import BoxRegionAction from "../Actions/BoxRegionAction";
import DrawPathAction from "../Actions/DrawPathAction";
import PolygonRegionAction from "../Actions/PolygonRegionAction";
import DrawWallAction from "../Actions/DrawWallAction";
import RobotAction from "../Actions/RobotAction";

export const ACTIONS = {
    dragObjects: DragObjectsAction.getInstace(),
    addKeyPoint: AddKeyPointAction.getInstace(),
    drawBoxRegion: BoxRegionAction.getInstace(),
    drawPath: DrawPathAction.getInstace(),
    drawRegion: PolygonRegionAction.getInstace(),
    drawWalls: DrawWallAction.getInstace(),
    addRobot: new RobotAction({
      id: "Test",
      name: "Test",
      robotTree: {
        name: "Test",
        position: { x: 0, y: 0, z: 0 },
        orientation: {
          w: 1,
          x: 0,
          y: 0,
          z: 0
        },
        child: [
          {
            name: "TestTF",
            position: { x: 1, y: 0, z: 1 },
            orientation: {
              w: Math.cos(-Math.PI / 4),
              x: 0,
              y: Math.sin(-Math.PI / 4),
              z: 0
            },
            child: []
          }
        ]
      }
    })
};