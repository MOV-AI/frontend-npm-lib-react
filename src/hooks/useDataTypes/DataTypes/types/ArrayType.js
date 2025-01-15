import { DATA_TYPES } from "../Constants";
import DataType from "../AbstractDataType";

class ArrayType extends DataType {
  key = DATA_TYPES.ARRAY;
  label = "Array";
  default = [];

  _validate(value) {
    return value === undefined || Array.isArray(value);
  }
}

export default ArrayType;
