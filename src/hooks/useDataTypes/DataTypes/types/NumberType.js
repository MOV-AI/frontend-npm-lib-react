import { DATA_TYPES } from "../Constants";
import DataType from "../AbstractDataType";

class NumberType extends DataType {
  key = DATA_TYPES.NUMBER;
  inputType = DATA_TYPES.NUMBER;
  label = "Number";
  default = 0;

  _validate(value) {
    return (
      value === undefined ||
      (value !== null &&
        typeof value === this.key &&
        !isNaN(value) &&
        !Array.isArray(value))
    );
  }

  editComponent(props) {
    return this.realEditComponent(props);
  }
}

export default NumberType;
