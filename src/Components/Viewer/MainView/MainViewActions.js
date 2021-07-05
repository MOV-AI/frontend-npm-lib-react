import DragObjectsAction from "../Actions/DragObjectsAction";
import AddKeyPointAction from "../Actions/AddKeyPointAction";
import BoxRegionAction from "../Actions/BoxRegionAction";
import DrawPathAction from "../Actions/DrawPathAction";
import PolygonRegionAction from "../Actions/PolygonRegionAction";
import OrbitAction from "../Actions/OrbitAction";
import DrawGraphAction from "../Actions/DrawGraphAction";
import MeasureAction from "../Actions/MeasureAction";
import NavigationPreviewAction from "../Actions/NavigationPreviewAction";

/**
 * Order Matters
 */
export const ACTIONS = viewOnly =>
  viewOnly
    ? {
        measure: new MeasureAction(),
        orbit: new OrbitAction()
      }
    : {
        robotPreview: new NavigationPreviewAction((title, reactFactory) => {}),
        measure: new MeasureAction(),
        drawGraph: new DrawGraphAction(),
        drawRegion: new PolygonRegionAction(),
        addKeyPoint: new AddKeyPointAction(),
        drawBoxRegion: new BoxRegionAction(),
        drawPath: new DrawPathAction(),
        dragObjects: new DragObjectsAction(),
        orbit: new OrbitAction()
      };
