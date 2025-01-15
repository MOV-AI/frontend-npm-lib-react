import { DATA_TYPES } from "../Constants";
import StringType from "./StringType";

class AnyType extends StringType {
  key = DATA_TYPES.ANY;
  label = "Any";

  _validate(value) {
    return true;
  }
}

export default AnyType;
