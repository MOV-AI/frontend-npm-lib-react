import GlobalRef from "../NodeItem/GlobalRef";
import Box from "../NodeItem/Box";
import KeyPoint from "../NodeItem/KeyPoint";
import Path from "../NodeItem/Path";
import Wall from "../NodeItem/Wall";
import BoxRegion from "../NodeItem/BoxRegion";
import PolygonRegion from "../NodeItem/PolygonRegion";
import GraphItem from "../NodeItem/GraphItem";
import NavigationPreviewItem from "../NodeItem/NavigationPreviewItem";

const NODE_ITEM_FACTORY_MAP = {
  GlobalRef: GlobalRef,
  Box: Box,
  KeyPoint: KeyPoint,
  Path: Path,
  Wall: Wall,
  BoxRegion: BoxRegion,
  PolygonRegion: PolygonRegion,
  GraphItem: GraphItem,
  NavigationPreviewItem: NavigationPreviewItem
};

export default NODE_ITEM_FACTORY_MAP;
