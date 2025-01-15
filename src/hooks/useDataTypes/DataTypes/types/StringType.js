import { DATA_TYPES } from "../Constants";
import DataType from "../AbstractDataType";

class StringType extends DataType {
  key = DATA_TYPES.STRING;
  label = "String";
  default = "";

  parse(string) {
    return string;
  }

  unparse(string) {
    return string;
  }
}

export default StringType;
