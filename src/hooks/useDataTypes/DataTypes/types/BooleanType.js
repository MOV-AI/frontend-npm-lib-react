import React from "react";
import { Checkbox } from "@material-ui/core";
import { DATA_TYPES } from "../Constants";
import DataType from "../AbstractDataType";

class BooleanType extends DataType {
  key = DATA_TYPES.BOOLEAN;
  label = "Boolean";
  default = false;

  constructor(opts) {
    // the check box returns a boolean value, so no need to parse the input
    super({ ...opts, stringInput: false });
  }

  parse(value) {
    switch (value) {
      case "":
        return undefined;
      case "True":
        return true;
      case "False":
        return false;
      default:
        return null;
    }
  }

  unparse(value) {
    return value ? "True" : "False";
  }

  editComponent(props) {
    const { label, disabled, onChange, rowData = {} } = props;
    return (
      <Checkbox
        inputProps={{ "data-testid": "input_bool-checkbox" }}
        color={"primary"}
        style={{ width: "fit-content" }}
        checked={this.inputParsing.parse(rowData.value) === true}
        onChange={(evt) => onChange(evt.target.checked)}
        disabled={disabled}
      />
    );
  }
}

export default BooleanType;
