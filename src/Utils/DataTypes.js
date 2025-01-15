import { Checkbox, TextField } from "@material-ui/core";
import { Rest } from "@mov-ai/mov-fe-lib-core";
import _toString from "lodash/toString";
import AceEditor from "react-ace";
import ConfigurationSelector from "./../Components/ConfigurationSelector";
import React from "react";

/**
 * Check if value is already parsed, or if it still needs to be parsed to return
 * @param {*} value : Value to be parsed
 * @returns parsed value
 */
const _getParsedValue = (value) => {
  return typeof value === "string" ? JSON.parse(value) : value;
};

/**
 * Gets common text editor for regular inputs (strings, arrays, objects, any, default)
 * @param {*} props : Material table row props
 * @param {String} placeholder : Placeholder
 * @returns {Component} Text input for editing common strings
 */
const _stringEditComponent = (props, placeholder = '""', parsedValue) => {
  const value = parsedValue !== undefined ? parsedValue : props.rowData.value;
  return (
    <TextField
      style={{ width: "100%" }}
      placeholder={placeholder}
      value={value || ""}
      onChange={(evt) => props.onChange(evt.target.value)}
    ></TextField>
  );
};

const _codeEditComponent = (props, placeholder = '""') => {
  return (
    <AceEditor
      value={_toString(props.rowData.value)}
      onLoad={(editor) => {
        const codeEditor = editor;
        if (!props.isNewParam) {
          codeEditor.focus();
        }
      }}
      placeholder={placeholder}
      mode={"python"}
      theme={"monokai"}
      width={"100%"}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
      fontSize={15}
      style={{ height: "300px" }}
      scrollMargin={[0, 15]}
      onChange={(value) => {
        props.onChange(value);
      }}
      editorProps={{
        $blockScrolling: Infinity,
      }}
      readOnly={props.disabled}
    />
  );
};

/**
 * Get list of valid data types to be displayed in the select box
 * @param {Array} excluded : Excluded keys
 * @returns {Array} List of valid data types to be displayed in the select box
 */
export const getDataTypes = (excluded = ["default"]) => {
  return Object.keys(DATA_TYPES).filter((type) => !excluded.includes(type));
};

/**
 * Define data types available with its own specific validation, edit components and more
 * Each type defined here must have
 *  label         : To be displayed in UI
 *  parse         : Parse method (default: use JSON.parse)
 *  stringify     : Stringify method (default: use JSON.stringify)
 *  editComponent : React component rendered when editing this data type
 *  preValidation : Prepares data to be validated
 *  validation    : Actual validation for data type
 */
export const DATA_TYPES = {
  string: {
    label: "String",
    groundValue: "",
    parse: (value) => {
      let parsed;
      try {
        parsed = JSON.parse(value);
        parsed = typeof parsed === "string" ? parsed : value;
      } catch (err) {
        parsed = value;
      }
      return parsed;
    },
    stringify: (value) => JSON.stringify(value),
    editComponent: (props, mode = "row") => {
      const editor = {
        row: (props) => {
          let parsed;
          try {
            parsed = JSON.parse(props.rowData.value);
            parsed = typeof parsed === "string" ? parsed : props.rowData.value;
          } catch (err) {
            parsed = props.rowData.value;
          }
          return _stringEditComponent(props, '""', parsed);
        },
        dialog: (props) => {
          return _codeEditComponent(props);
        },
      };
      return editor[mode](props);
    },
    preValidation: (value) => {
      let baseVal = value.replace(/'/g, '"');
      try {
        baseVal = JSON.parse(value);
        if (typeof baseVal !== "string") baseVal = String(baseVal);
      } catch (err) {
        baseVal = value;
      }
      return JSON.stringify(baseVal);
    },
    validation: (value) => {
      return new Promise((resolve) => {
        try {
          const parsed = _getParsedValue(value);
          const isValid =
            typeof parsed === "string" || parsed instanceof String;
          resolve({ success: isValid });
        } catch (e) {
          resolve({ success: false });
        }
      });
    },
  },
  number: {
    label: "Number",
    groundValue: "0",
    parse: (value) => JSON.parse(value),
    stringify: (value) => JSON.stringify(value),
    editComponent: (props) => {
      return (
        <TextField
          style={{ width: "100%" }}
          type="number"
          placeholder={"0"}
          value={props.rowData.value || ""}
          disabled={props.disabled}
          onChange={(evt) => props.onChange(evt.target.value)}
        ></TextField>
      );
    },
    preValidation: (value) => value,
    validation: (value) => {
      return new Promise((resolve) => {
        try {
          const parsed = _getParsedValue(value);
          const isValid = typeof parsed === "number" && !isNaN(parsed);
          resolve({ success: isValid });
        } catch (e) {
          resolve({ success: false });
        }
      });
    },
  },
  boolean: {
    label: "Boolean",
    groundValue: "false",
    parse: (value) => JSON.parse(value),
    stringify: (value) => JSON.stringify(value),
    editComponent: (props, mode = "row") => {
      let parsedValue;
      let pyValue = props.rowData.value;
      if (props.rowData.value === "True") {
        pyValue = "true";
      } else if (props.rowData.value === "False") {
        pyValue = "false";
      }

      try {
        parsedValue = JSON.parse(pyValue);
        if (typeof parsedValue === "string")
          parsedValue = JSON.parse(parsedValue);
      } catch (e) {
        parsedValue = false;
      }
      const editor = {
        row: (props) => {
          return (
            <Checkbox
              color={"primary"}
              checked={parsedValue}
              onChange={(evt) => props.onChange(evt.target.checked)}
              disabled={props.disabled}
            />
          );
        },
        dialog: (props) => {
          return (
            <Checkbox
              color={"primary"}
              checked={parsedValue}
              onChange={(evt) => props.onChange(evt.target.checked)}
              disabled={props.disabled}
            />
          );
        },
      };
      return editor[mode](props);
    },
    preValidation: (value) => {
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
        if (typeof parsedValue === "string")
          parsedValue = JSON.parse(parsedValue);
      } catch (e) {
        parsedValue = false;
      }
      return parsedValue;
    },
    validation: (value) => {
      return new Promise((resolve) => {
        try {
          const parsed = _getParsedValue(value);
          resolve({ success: typeof parsed == "boolean" });
        } catch (e) {
          resolve({ success: false });
        }
      });
    },
  },
  object: {
    label: "Object",
    groundValue: "{}",
    parse: (value) => JSON.parse(value),
    stringify: (value) => JSON.stringify(value),
    editComponent: (props, mode = "row") => {
      const editor = {
        row: (props) => {
          return _stringEditComponent(props, "{}");
        },
        dialog: (props) => {
          return _codeEditComponent(props, "{}");
        },
      };
      return editor[mode](props);
    },
    preValidation: (value) => {
      let newValue = value.replace(/'/g, '"');
      newValue = newValue.replace(
        /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
        '$1"$3":',
      );
      return newValue;
    },
    validation: (value) => {
      return new Promise((resolve) => {
        try {
          const parsed = JSON.parse(value);
          resolve({ success: parsed.constructor === Object });
        } catch (e) {
          resolve({ success: false });
        }
      });
    },
  },
  array: {
    label: "Array",
    groundValue: "[]",
    parse: (value) => JSON.parse(value),
    stringify: (value) => JSON.stringify(value),
    editComponent: (props, mode = "row") => {
      const editor = {
        row: (props) => {
          return _stringEditComponent(props, "[]");
        },
        dialog: (props) => {
          return _codeEditComponent(props, "[]");
        },
      };
      return editor[mode](props);
    },
    preValidation: (value) => value.replace(/'/g, '"'),
    validation: (value) => {
      return new Promise((resolve) => {
        try {
          const parsed = _getParsedValue(value);
          resolve({ success: Array.isArray(parsed) });
        } catch (e) {
          resolve({ success: false });
        }
      });
    },
  },
  config: {
    label: "Configuration",
    groundValue: "",
    parse: (value) => value,
    stringify: (value) => value,
    editComponent: (props, mode = "row") => (
      <ConfigurationSelector
        rowProps={props}
        mode={mode}
      ></ConfigurationSelector>
    ),
    preValidation: (value) => value,
    validation: (value) => {
      return Rest.cloudFunction({
        cbName: "backend.viewer",
        func: "validateConfiguration",
        args: value,
      })
        .then((res) => {
          const isValid = res.success && res.result;
          return { success: isValid, error: "Configuration/key not found" };
        })
        .catch((err) => {
          console.error("Configuration validation err", err);
          return { success: false };
        });
    },
  },
  any: {
    label: "Any",
    groundValue: "",
    parse: (value) => value,
    stringify: (value) => value,
    editComponent: (props, mode = "row") => {
      const editor = {
        row: (props) => {
          return _stringEditComponent(props, "");
        },
        dialog: (props) => {
          return _codeEditComponent(props, "");
        },
      };
      return editor[mode](props);
    },
    preValidation: (value) => value,
    validation: () => new Promise((resolve) => resolve({ success: true })),
  },
  default: {
    label: null,
    groundValue: "",
    editComponent: (props, mode = "row") => {
      const editor = {
        row: (props) => {
          return _stringEditComponent(props, "");
        },
        dialog: (props) => {
          return _codeEditComponent(props, "");
        },
      };
      return editor[mode](props);
    },
    preValidation: (value) => value,
    validation: () => new Promise((resolve) => resolve({ success: false })),
  },
};
