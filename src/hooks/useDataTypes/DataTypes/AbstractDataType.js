import React, { useState, useEffect, useMemo, useCallback } from "react";
import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MonacoCodeEditor } from "@mov-ai/mov-fe-lib-code-editor";
import { DISABLED_VALUE } from "./Constants.js";

const identity = (a) => a;

/*
 * Handles initial value and onChange for data types that use strings as input
 * Although they might output real objects
 */
export function useTextEdit(props) {
  const { rowData = {}, dataType, onChange = () => {} } = props;
  const initialValue = useMemo(
    () => dataType.inputParsing.unparse(rowData.value),
    [dataType],
  );
  const placeholder = useMemo(
    () => dataType.unparse(dataType.default),
    [dataType],
  );
  const [value, setValue] = useState(initialValue || placeholder);

  const handleOnChange = useCallback(
    (value) => {
      onChange(dataType.inputParsing.parse(value));
      setValue(value);
    },
    [onChange, setValue, dataType],
  );

  useEffect(() => {
    if (rowData.value !== null)
      setValue(dataType.inputParsing.unparse(rowData.value));
  }, [handleOnChange, rowData.value]);

  return { ...props, onChange: handleOnChange, value };
}

function StringEdit(props) {
  const { onChange, dataType, ...rest } = useTextEdit(props);

  return (
    <TextField
      type={dataType.inputType}
      inputProps={{ "data-testid": "input_value" }}
      fullWidth
      onChange={(evt) => onChange(evt.target.value)}
      {...rest}
    />
  );
}

const useCodeEditStyles = makeStyles(() => ({
  root: { width: "100%", height: "100px" },
}));

function CodeEdit(props) {
  const { isNew, disabled, dataType, ...rest } = useTextEdit(props);
  const classes = useCodeEditStyles();

  return (
    <Typography
      data-testid="section_data-type-code-editor"
      component="div"
      className={classes.root}
    >
      <MonacoCodeEditor
        onLoad={(editor) => {
          if (!isNew) editor.focus();
        }}
        language="python"
        disableMinimap={true}
        options={{ readOnly: disabled }}
        theme={dataType._theme?.codeEditor?.theme ?? "dark"}
        {...rest}
      />
    </Typography>
  );
}

/**
 * Class that provides generic data type functionality
 * - parsing and unparsing
 * - validation
 * - basic data type components
 *
 * When a value is undefined, the default value is used
 */
class AbstractDataType {
  key = "";
  label = "";
  default = "";
  inputType = "text";
  _theme = {};

  /**
   * Constructor
   *
   * stringOutput: When true, the output is a string (e.g. stringified dictionary)
   * stringInput: When true, the input returns a string (e.g. false for boolean type)
   */
  constructor({ theme, stringOutput = false, stringInput = true } = {}) {
    this._theme = theme;
    this._stringOutput = stringOutput;

    // when input and output are strings, no parsing is needed
    // when input and output are not strings, no parsing is needed
    // otherwise, parsing is needed
    const noInputParsing = stringOutput === stringInput;
    this.inputParsing = noInputParsing
      ? { parse: identity, unparse: identity }
      : { parse: this.parse, unparse: this.unparse };

    this._validationParse = stringOutput ? this.parse : identity;
    this.getSaveable = stringOutput ? this.unparse : identity;
  }

  getEditComponent() {
    return this.editComponent.bind(this);
  }

  editComponent(props) {
    if (this._stringOutput) return this.stringEditComponent(props);

    return this.realEditComponent(props);
  }

  /**
   * parsing strings into real objects
   */
  parse(value) {
    if (value === "") return undefined;
    try {
      return JSON.parse(value);
    } catch (e) {
      return null; // null is invalid
    }
  }

  /**
   * unparsing real objects into strings
   */
  unparse(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  /**
   * Get Data type key
   */
  getKey() {
    return this.key;
  }

  /**
   * Get data type label
   */
  getLabel() {
    return this.label;
  }

  /**
   * Abstract validation : validation for simple types
   */
  _validate(value) {
    return value === undefined || typeof value === this.key;
  }

  /**
   * Abstract validation : validation for simple types
   */
  async validate(value) {
    // "None" indicates a disabled value
    if (value === DISABLED_VALUE) return { success: true };

    try {
      const parsed = this._validationParse(value);
      return {
        success: await this._validate(parsed),
        parsed,
      };
    } catch (_e) {
      return { success: false };
    }
  }

  /**
   * @private Real object editor
   */
  realEditComponent(props) {
    return <StringEdit dataType={this} {...props} />;
  }

  /**
   * @private String editor
   */
  stringEditComponent = (props) => {
    return <CodeEdit dataType={this} {...props} />;
  };
}

export default AbstractDataType;
