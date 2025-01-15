import { DATA_TYPES } from "../Constants";
import DataType from "../AbstractDataType";

class ObjectType extends DataType {
  key = DATA_TYPES.OBJECT;
  label = "Object";
  default = {};

  _validate(value) {
    return (
      value === undefined ||
      (value !== null && typeof value === "object" && !Array.isArray(value))
    );
  }
}

export default ObjectType;
