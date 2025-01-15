import React, {
  Component,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChromePicker } from "react-color";
import SelectScopeModal from "./../Modal/SelectScopeModal";
import { snackbar } from "./../Snackbar/Snackbar";
import { Rest } from "@mov-ai/mov-fe-lib-core";
import {
  Badge,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import InputIcon from "@material-ui/icons/Input";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import _groupBy from "lodash/groupBy";
import _isEqual from "lodash/isEqual";
import _omit from "lodash/omit";
import _round from "lodash/round";
import _set from "lodash/set";
import i18n from "./../../i18n";
import { Search } from "../ListItems/ListItems";
import { Item } from "../ListItems/Item";
import CollapseItem from "../ListItems/CollapseItem";
import ErrorBoundary from "../ErrorBoundary";
import { selectOneAction } from "./../../Utils/Utils";
import ComputedAnnotationsModal from "./sub_components/ComputedAnnotationsModal";
import TreeViewData from "./sub_components/TreeViewData";
import { DATA_TYPES } from "./../../hooks/useDataTypes/DataTypes/Constants";

function getRandomValue() {
  return Math.random();
}

const MARGIN_STYLE = { marginLeft: "5%", marginRight: "5%", width: "90%" };
const FLEX_STYLE = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
};

function isObject(item) {
  return Object.prototype.toString.call(item) === "[object Object]";
}

const styles = (theme) => ({
  root: { ...FLEX_STYLE, height: "100%" },
  subRoot: { ...FLEX_STYLE, overflow: "auto" },
  searchHeader: {
    padding: "0px 20px",
    // search box
    "& > div": {
      width: "calc(100% - 50px) !important",
      display: "inline-flex !important",
    },
    // action button
    "& button": {
      float: "right",
    },
  },
  listItemIcon: { minWidth: 25, cursor: "move" },
  listItemText: {
    maxWidth: "calc(100% - 50px)",
    "& span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  listItemTextDisabled: {
    maxWidth: "calc(100% - 50px)",
    "& span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    color: `red`,
  },
  draggingItem: {
    backgroundColor: `${theme?.palette?.primary?.main}26`,
  },
  selector: {
    margin: "8%",
  },
  defaultMarginStyle: {
    ...MARGIN_STYLE,
  },
  buttonDiv: { textAlign: "center" },
  warning: {
    "&.MuiFormHelperText-root": {
      color: theme?.palette?.warning?.main || "#ffa726",
    },
  },
});

const ColorComponent = (props) => {
  const { jsonInstance, parent, disable, keys, color } = props;
  // Refs
  const colorInputRef = useRef();
  // State
  const [isTextFocused, setIsTextFocused] = useState(false);
  // Private functions
  const handleTextFocus = useCallback(() => {
    jsonInstance.removeKeyBinding();
    setIsTextFocused(true);
  }, [setIsTextFocused]);

  const handleTextBlur = useCallback(() => {
    setIsTextFocused(false);
    parent.saveForm();
    parent.forceUpdate();
    jsonInstance.restoreKeyBinding();
  }, [setIsTextFocused, parent]);

  // On mount
  useEffect(() => {
    const pickerComponent = colorInputRef.current;
    const pickerEl = ReactDOM.findDOMNode(pickerComponent);
    const inputElements = pickerEl.getElementsByTagName("input");
    Array.from(inputElements).forEach((inputElement) => {
      inputElement.addEventListener("focus", handleTextFocus);
      inputElement.addEventListener("blur", handleTextBlur);
      inputElement.addEventListener("keyup", parent.onKeyUp);
    });
  }, [colorInputRef, parent, handleTextBlur, handleTextFocus]);

  return (
    <div style={{ margin: "0 13%" }}>
      <ChromePicker
        key={keys.join()}
        ref={colorInputRef}
        color={parent.getFormattedColor(color)}
        onChangeComplete={(color) => {
          if (disable) return;
          parent.setData(keys, parent.getNormalizedColor(color.rgb));
          if (isTextFocused) return;
          parent.saveForm();
          parent.forceUpdate();
        }}
      ></ChromePicker>
    </div>
  );
};

class JsonToReact extends Component {
  state = {
    searchFilter: {},
  };

  memory = {
    formData: this.props.formData,
  };
  inputRef = [];
  currentActiveElement = null;

  //========================================================================================
  /*                                                                                      *
   *                                  Components Factory                                  *
   *                                                                                      */
  //========================================================================================

  getColorInput(keys, schema) {
    const { disable, parent } = this.props;
    const color = this.getData(keys, { r: 1, g: 1, b: 1 });

    return this.collapseComponentFactory(
      keys,
      schema,
      <ColorComponent
        jsonInstance={this}
        parent={parent ?? this}
        color={color}
        disable={disable}
        keys={keys}
      />,
    )();
  }

  getSelector(title, enums, enumNames, keys, disabled, finalClass) {
    const { disable, classes, itemClasses } = this.props;
    const key = keys.concat(enumNames).join(".");
    const value = this.getData(keys);
    const finalDisable = disabled ?? disable;

    finalClass = itemClasses?.[finalClass] || classes.defaultMarginStyle;

    return (
      <Typography
        component="div"
        key={key + `${getRandomValue()}`}
        className={`${classes.selector} ${finalClass}`}
      >
        <InputLabel>{title}</InputLabel>
        <Select
          disabled={finalDisable}
          style={{ width: "95%" }}
          value={value ? value : ""}
          onChange={(evt) => {
            this.setData(keys, evt.target.value);
            this.saveForm();
            this.forceUpdate();
          }}
        >
          {enums.map((e, i) => {
            const key = `${e}MenuItem${i}`;

            return (
              <MenuItem key={key} value={e}>
                {enumNames[i]}
              </MenuItem>
            );
          })}
        </Select>
      </Typography>
    );
  }

  getTextField({
    inputProps,
    keys,
    helperText,
    type = "string",
    disabled = false,
    FormHelperTextProps,
    finalClass = this.props?.classes?.defaultMarginStyle,
  }) {
    const {
      disable,
      classes,
      itemClasses,
      removeKeyBinding,
      restoreKeyBinding,
    } = this.props;
    const isNumber = type === "number";
    const toNumber = (x) => Number.parseFloat(x);
    const handleChange = isNumber
      ? this.getOnChangeFunction(keys, (e) => toNumber(e.target.value))
      : this.getOnChangeFunction(keys);
    const value = this.getData(keys);
    let finalDisable = disabled ?? disable;
    const normalizedValue = isNumber ? _round(parseFloat(value), 5) : value;
    const onClickNumber =
      type === DATA_TYPES.NUMBER ? this.getOnChangeFunction(keys) : () => {};

    finalClass = itemClasses?.[finalClass] || classes.defaultMarginStyle;

    const handleBlur = (e) => {
      this.saveForm();
      restoreKeyBinding();
    };

    return (
      <TextField
        inputRef={(elem) => (this.inputRef[keys.join()] = elem)}
        className={finalClass}
        disabled={finalDisable}
        key={this.generateReactKey(keys)}
        type={type || DATA_TYPES.STRING}
        label={inputProps.title}
        inputProps={inputProps}
        defaultValue={normalizedValue}
        onFocus={removeKeyBinding}
        onChange={handleChange}
        onKeyUp={this.onKeyUp}
        onClick={onClickNumber}
        margin="normal"
        onWheelCapture={(e) => {
          e.target.blur();
        }}
        onBlur={handleBlur}
        helperText={helperText}
        FormHelperTextProps={FormHelperTextProps}
        data-testid={`input_${keys.join("-")}`}
      />
    );
  }

  getToggle({ title, keys, disabled, finalClass, disableControl }) {
    const { disable, classes, itemClasses } = this.props;
    const value = this.getData(keys, false);
    let finalDisable = disabled ?? disable;

    finalClass = itemClasses?.[finalClass] || classes.defaultMarginStyle;

    if (disableControl) {
      finalDisable = !this.getData(disableControl);
    }

    return (
      <FormControlLabel
        key={keys.join(".")}
        disabled={finalDisable}
        className={finalClass}
        control={
          <Switch
            checked={value}
            onChange={this.getOnChangeFunction(
              keys,
              (e) => e.target.checked,
              false,
            )}
            color="primary"
            data-testid={`input_${keys.join("-")}`}
          />
        }
        label={title}
        labelPlacement="start"
      />
    );
  }

  getButton(title, keys) {
    const { classes } = this.props;
    return (
      <div className={classes.buttonDiv}>
        <Button onClick={this.getData(keys)}>{title}</Button>
      </div>
    );
  }

  /**
   * Reorder item in reference list
   * @param {Array} list : list reference
   * @param {Integer} startIndex : source index
   * @param {Integer} endIndex : destination index
   * @returns {Array} Reordered list
   */
  reorderListItems = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * Event handler to reorder final list
   * @param {*} event : Drag item event (result)
   * @param {Array} keys : Keys array
   */
  onDragListItemEnd = (event, keys) => {
    // dropped outside the list
    if (!event.destination) return;
    const currentList = this.getData(keys);
    const newList = this.reorderListItems(
      currentList,
      event.source.index,
      event.destination.index,
    );
    // Check if newList is different than currentList
    const isSameList = newList.some((r, i) => currentList[i] === r);
    if (isSameList) return;
    // Save data
    this.setData(keys, newList);
    this.saveForm();
  };

  /**
   * Get re-orderable list
   * @param {Array} keys : Keys array
   * @param {String} scopeTitle : Scope item title (Eg.: Annotation)
   * @param {Array<String>} disabledList: list of disable values
   * @param {String} disabledItemTooltip: string with tooltip title
   * @returns Component containing sortable list
   */
  getSortableList(
    keys,
    scopeTitle,
    disabledList,
    disabledItemTooltip = "Disabled item",
  ) {
    const values = this.getData(keys) || [];
    const { classes, removeKeyBinding, restoreKeyBinding } = this.props;
    const searchText = this.state.searchFilter[scopeTitle] || "";
    return (
      <>
        <Typography component="div" className={classes.searchHeader}>
          <Search
            removeKeyBinding={removeKeyBinding}
            restoreKeyBinding={restoreKeyBinding}
            search={(input) => {
              this.setState({ searchFilter: { [scopeTitle]: input } });
            }}
          />
          <J2RSelectScopeModalSimple
            removeKeyBinding={removeKeyBinding}
            restoreKeyBinding={restoreKeyBinding}
            scopes={[scopeTitle]}
            element={
              <Tooltip title={`Add ${scopeTitle}`}>
                <IconButton
                  edge="end"
                  aria-label="add"
                  className={classes.actionBtn}
                >
                  <AddBoxIcon color="action" />
                </IconButton>
              </Tooltip>
            }
            onSubmit={(selectedItem) => {
              const newValues = [...values, selectedItem];
              // Save data
              this.setData(keys, newValues);
              this.saveForm();
            }}
          />
          <Divider />
        </Typography>
        <DragDropContext
          onDragEnd={(result) => this.onDragListItemEnd(result, keys)}
        >
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <List ref={provided.innerRef} key={keys.join(".")}>
                {values
                  .map((item) => {
                    const formattedTitle = item
                      .split("/")
                      .filter((path) => path !== scopeTitle)
                      .join("/");
                    return { label: formattedTitle, item: item };
                  })
                  .filter((data) => data.label?.includes(searchText))
                  .map(({ item, label }, index) => {
                    const isItemDisabled = disabledList.includes(item);
                    return (
                      <Draggable
                        key={"key" + item + label}
                        draggableId={item}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ListItem
                            ContainerComponent="li"
                            ContainerProps={{ ref: provided.innerRef }}
                            style={provided.draggableProps.style}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={
                              snapshot.isDragging ? classes.draggingItem : ""
                            }
                          >
                            <ListItemIcon className={classes.listItemIcon}>
                              <DragIndicatorIcon />
                            </ListItemIcon>
                            {!isItemDisabled ? (
                              <ListItemText
                                primary={label}
                                className={classes.listItemText}
                              />
                            ) : (
                              <Tooltip title={disabledItemTooltip}>
                                <ListItemText
                                  primary={label}
                                  className={classes.listItemTextDisabled}
                                />
                              </Tooltip>
                            )}
                            <ListItemSecondaryAction>
                              <Tooltip title={`Open ${scopeTitle}`}>
                                <IconButton
                                  disabled={isItemDisabled}
                                  edge="end"
                                  aria-label="open"
                                  onClick={() =>
                                    this.props.onOpenDocument(item)
                                  }
                                >
                                  <OpenInNewIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={`Remove ${scopeTitle}`}>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => {
                                    const newValue = values.filter(
                                      (value) => value !== item,
                                    );
                                    // Save data
                                    this.setData(keys, newValue);
                                    this.saveForm();
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </ListItemSecondaryAction>
                          </ListItem>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }

  collapseComponentFactory =
    (keys, schema, children, height = "auto") =>
    () => (
      <CollapseItem
        key={keys.join(".")}
        height={height}
        item={<Item text={schema.title}></Item>}
      >
        {children}
      </CollapseItem>
    );

  annotationComponentFactory = (keys) => () => {
    const OVERRIDE_KEYS = ["annotations", "annotationPropOverrides"];
    const overrides = this.getData(OVERRIDE_KEYS);
    const ANNOTATIONS_KEYS = ["annotations", "annotationNames"];
    const annotationNames = this.getData(ANNOTATIONS_KEYS);
    const DISABLE_ANNOTATIONS_KEYS = ["annotations", "disabledAnnotationNames"];
    const disableAnnotationNames = this.getData(DISABLE_ANNOTATIONS_KEYS, []);
    const { removeKeyBinding, restoreKeyBinding } = this.props;
    // Return empty if annotation metadata is not present

    let updateComputation = getRandomValue();
    return (
      <Typography component="div" key={keys.join(".")}>
        {this.getSortableList(
          keys,
          i18n.t("Annotation"),
          disableAnnotationNames,
          i18n.t("Annotation doesn't exist"),
        )}
        <ComputedAnnotations
          disabled={this.props.disable}
          updateComputation={updateComputation}
          removeKeyBinding={removeKeyBinding}
          restoreKeyBinding={restoreKeyBinding}
          annotationNames={annotationNames}
          overrides={overrides}
          onKeyOverride={(key, value) => {
            if (overrides === undefined) return;
            const newOverrides = { ...overrides, [key]: value };
            // Save data
            this.setData(OVERRIDE_KEYS, newOverrides);
            this.saveForm();
            // Request computation update
            updateComputation = getRandomValue();
          }}
          onDeleteOverride={(item, matchFullPath = false) => {
            if (overrides === undefined) return;
            // Delete all overrides from item key
            const deleteKeys = Object.keys(overrides).filter((el) => {
              if (matchFullPath) return el === item.key;
              else return el.split(".")[0] === item.key;
            });
            // Remove deleted keys
            const newOverrides = _omit(overrides, deleteKeys);
            // Save data
            this.setData(OVERRIDE_KEYS, newOverrides);
            this.saveForm();
            // Request computation update
            updateComputation = getRandomValue();
          }}
        ></ComputedAnnotations>
      </Typography>
    );
  };

  getSelectScopeModal(keys, uiSchema) {
    const { disable } = this.props;
    const scopes = uiSchema["ui:options"]?.scopeList;
    const name = uiSchema["ui:options"]?.name;
    const filter = uiSchema["ui:options"]?.filter;
    const dataFromKeys = this.getData(keys);
    const value = dataFromKeys ? dataFromKeys : "";
    const handleSubmitForm = () => {
      this.saveForm();
    };
    return (
      <J2RSelectScopeModal
        scopes={scopes}
        name={name}
        onChange={(newValue) => {
          this.setData(keys, newValue);
        }}
        submitForm={handleSubmitForm}
        disabled={disable}
        value={value}
        key={this.generateReactKey(keys)}
        filter={filter}
      ></J2RSelectScopeModal>
    );
  }

  getWarningInput =
    ({ keys, schema }, { predicate, label }) =>
    () => {
      const value = this.getData(keys);
      const { classes } = this.props;
      return this.getTextField({
        keys,
        title: schema.title,
        type: schema.type,
        helperText: predicate(value) ? label : undefined,
        FormHelperTextProps: { classes: { root: classes.warning } },
      });
    };

  //========================================================================================
  /*                                                                                      *
   *                                         Utils                                        *
   *                                                                                      */
  //========================================================================================

  getFormattedColor(color = { r: 1, g: 1, b: 1 }) {
    return {
      r: color.r * 255,
      g: color.g * 255,
      b: color.b * 255,
      a: color.a || 1,
    };
  }

  getNormalizedColor(color) {
    return {
      r: color.r / 255,
      g: color.g / 255,
      b: color.b / 255,
      a: color.a || 1,
    };
  }

  generateReactKey(keys) {
    return `${keys[keys.length - 1]}${this.getData(keys)}`;
  }

  getData(keys, defaultValue = null) {
    const { formData } = this.memory;
    let accumulator = formData;

    keys.forEach((key) => {
      accumulator = accumulator ? accumulator[key] : defaultValue;
    });

    return accumulator;
  }

  setData(keys, value) {
    const { formData } = this.memory;

    if (typeof formData[keys[0]] === DATA_TYPES.OBJECT) {
      formData[keys[0]][keys[keys.length - 1]] = value;
    } else {
      formData[keys[0]] = value;
    }
  }

  getOnChangeFunction(keys, map = (e) => e.target.value, notBool = true) {
    return (event) => {
      if (document.activeElement !== event.target) event.target.focus();

      this.setData(keys, map(event));
      // Trigger save function if target element is of type boolean (eg: Switch, Checkbox, ...)
      if (notBool) this.currentActiveElement = keys;

      this.saveForm();
    };
  }

  onKeyUp = (event) => {
    selectOneAction([
      {
        predicate: (e) => e.key === "Enter" || e.key === "NumpadEnter",
        action: () => {
          this.saveForm();
          this.props.restoreKeyBinding();
        },
      },
    ])(event);
  };

  renderSpecific(schema, uiSchema, keys, extraProps) {
    const disabledProp = extraProps?.disable;
    const classesProp = extraProps?.itemClass;
    const disableControl = extraProps.disableControl;
    const inputProps = {
      title: schema.title,
      min: schema.min,
      max: schema.max,
    };

    const type2ComponentFactory = {
      string: () =>
        this.getTextField({
          inputProps,
          keys,
          type: DATA_TYPES.STRING,
          disabledProp,
          classesProp,
        }),
      number: () =>
        this.getTextField({
          inputProps,
          keys,
          type: DATA_TYPES.NUMBER,
          disabledProp,
          classesProp,
        }),
      boolean: () =>
        this.getToggle({
          title: schema.title,
          keys,
          disabled: disabledProp,
          finalClass: classesProp,
          disableControl,
        }),
      button: () => this.getButton(schema.title, keys),
    };

    const uiSchema2Component = {
      "ui:widget": (widget) =>
        this.getCompFactoryFromWidget(widget)({ keys, schema, uiSchema }),
      "ui:disabled": (disabled) => {
        const inputProps = {
          title: schema.title,
          min: schema.min,
          max: schema.max,
        };
        const type2LazyComponent = {
          string: () =>
            this.getTextField({
              inputProps,
              keys,
              type: DATA_TYPES.STRING,
              disabled,
            }),
          number: () =>
            this.getTextField({
              inputProps,
              keys,
              type: DATA_TYPES.NUMBER,
              disabled,
            }),
          boolean: () =>
            this.getToggle({
              title: schema.title,
              keys,
              disabled,
            }),
        };
        if (schema.type in type2LazyComponent) {
          return type2LazyComponent[schema.type]();
        }
        return [];
      },
    };

    const key = keys[keys.length - 1];

    if (uiSchema)
      // return special
      return Object.keys(uiSchema)
        .filter((k) => Object.keys(uiSchema2Component).includes(k))
        .map((uiType) => uiSchema2Component[uiType](uiSchema[uiType]))[0];

    // selector or text field
    const selectorResult = this.getSelectorResult(schema, keys);
    return selectorResult
      ? selectorResult
      : type2ComponentFactory[schema.type](key);
  }

  getSelectorResult(schema, keys) {
    const schemaEnum = schema.enum;
    const enumNames = schema.enumNames;

    if (schemaEnum && enumNames)
      return this.getSelector(schema.title, schemaEnum, enumNames, keys);
    else return null;
  }

  renderFormRecursive(schema, uiSchema, keys = [], extraProps = {}) {
    if (schema.type === "hidden") return null;

    if (schema.type === DATA_TYPES.OBJECT) {
      const children = Object.keys(schema.properties)
        .map((k) => {
          return this.renderFormRecursive(
            schema.properties[k],
            uiSchema?.[k],
            keys.concat(k),
            schema.properties,
          );
        })
        .filter((item) => !!item);

      if (!children.length) return null;

      if (uiSchema && uiSchema["ui:widget"]) {
        return this.getCompFactoryFromWidget(uiSchema["ui:widget"])({
          keys,
          schema,
          children,
          uiSchema,
        });
      }

      return this.renderBase(keys, schema, children);
    }
    return this.renderSpecific(
      schema,
      uiSchema,
      keys,
      extraProps[keys[keys.length - 1]],
    );
  }

  renderBase(keys, schema, children = []) {
    return (
      <Typography
        style={{ position: "relative", ...schema.style }}
        key={keys.join(".")}
        component="div"
        data-testid={`section_${schema.title}`}
      >
        {schema.title ? (
          <div
            style={{
              fontSize: "0.875rem",
              borderBottom: "1px solid",
              margin: "10px",
            }}
          >
            {schema.title}
          </div>
        ) : (
          []
        )}
        {children}
      </Typography>
    );
  }

  getHiddenComponent = (keys) => () => (
    <div key={this.generateReactKey(keys)} />
  );

  /**
   *
   * @param {Object | String} widgetObj
   * @returns {Object}
   */
  getCompFactoryFromWidget =
    (widgetObj) =>
    (obj = { keys: "", schema: {}, children: [], uiSchema: {} }) => {
      const { keys, schema, children, uiSchema } = obj;
      const widget2Component = {
        hidden: this.getHiddenComponent(keys),
        collapse: this.collapseComponentFactory(keys, schema, children),
        annotations: this.annotationComponentFactory(keys),
        color: () => this.getColorInput(keys, schema),
        selectScopeModal: () => this.getSelectScopeModal(keys, uiSchema),
        warning: (options) => this.getWarningInput({ keys, schema }, options),
      };
      if (typeof widgetObj === "string") {
        return widgetObj in widget2Component
          ? widget2Component[widgetObj]()
          : [];
      }
      // assumes it is a object
      const [composedKey] = Object.keys(widgetObj);
      return composedKey in widget2Component
        ? widget2Component[composedKey](widgetObj[composedKey])
        : [];
    };

  renderForm(schema, uiSchema) {
    return Object.keys(schema).length === 0
      ? []
      : this.renderFormRecursive(schema, uiSchema);
  }

  saveForm() {
    try {
      this.validateFormDataRecursive(
        this.memory.formData,
        this.props.schema.properties,
      );
      this.props.onSubmit(this.memory);
    } catch (e) {
      this.props.onError(e);
    }
    this.props.restoreKeyBinding();
  }

  validateFormDataRecursive(data, validator, section) {
    /**
     * Simple extract function to lower cognitive complexity
     * @param {String} DataType
     * @returns {Boolean} Valid type
     */
    function validateDataType(type) {
      return validator.type === type && typeof data !== validator.type;
    }

    // Validate items in array
    if (Array.isArray(data)) {
      data.forEach((item, index) =>
        this.validateFormDataRecursive(item, validator, index),
      );
      return;
    }
    // Validate items in object
    if (typeof data === DATA_TYPES.OBJECT) {
      for (const key in data) {
        if (validator[key]?.type === DATA_TYPES.ANY) continue;
        const newValidator =
          typeof data[key] === DATA_TYPES.OBJECT
            ? validator[key]["properties"]
            : validator[key];
        this.validateFormDataRecursive(data[key], newValidator, key);
      }
      return;
    }
    // Validate items
    if (!validator?.type) return;

    if (
      validateDataType(DATA_TYPES.STRING) ||
      validateDataType(DATA_TYPES.BOOLEAN) ||
      (validator.type === DATA_TYPES.NUMBER && isNaN(parseFloat(data)))
    )
      throw Error(
        i18n.t("InvalidValueForSection", {
          section,
          validatorType: validator["type"],
          typeOfData: typeof data,
        }),
      );
  }

  //========================================================================================
  /*                                                                                      *
   *                                         React                                        *
   *                                                                                      */
  //========================================================================================
  componentDidUpdate(prevProps) {
    this.inputRef[this.currentActiveElement]?.focus();
    if (
      !_isEqual(this.props.formData, this.memory.formData) &&
      !_isEqual(prevProps.formData, this.props.formData)
    ) {
      this.memory = { formData: this.props.formData };
      this.forceUpdate();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Typography component="div" className={classes.root}>
        <Typography component="div" className={classes.subRoot}>
          <ErrorBoundary>
            {this.renderForm(this.props.schema, this.props.uiSchema)}
          </ErrorBoundary>
        </Typography>
      </Typography>
    );
  }
}

// check NodeItem.toForm to see an example of schema, uiSchema and formData
JsonToReact.propTypes = {
  schema: PropTypes.object,
  uiSchema: PropTypes.object,
  formData: PropTypes.object,
  onSubmit: PropTypes.func,
  disable: PropTypes.bool,
  removeKeyBinding: PropTypes.func,
  restoreKeyBinding: PropTypes.func,
};

JsonToReact.defaultProps = {
  schema: {},
  uiSchema: {},
  formData: {},
  onSubmit: ({ formData }, e) => {},
  onOpenDocument: () => {},
  disable: true,
  removeKeyBinding: () => {},
  restoreKeyBinding: () => {},
};

//The function returns true when the compared props equal, preventing the component from re-rendering
function arePropsEqual(prevProps, nextProps) {
  return _isEqual(prevProps, nextProps);
}

const TEXT_OVERFLOW_STYLE = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
export default withStyles(styles, { withTheme: true })(
  memo(JsonToReact, arePropsEqual),
);

const useStyles = makeStyles((theme) => ({
  overflowEllipsis: {
    ...TEXT_OVERFLOW_STYLE,
    "& input": TEXT_OVERFLOW_STYLE,
  },
  base: {
    fontSize: "0.875rem",
    borderBottom: "1px solid",
    margin: "10px",
  },
  selectScope: {
    alignItems: "center",
    display: "flex",
    ...MARGIN_STYLE,
  },
  searchHeader: {
    padding: "0px 20px",
    // search box
    "& > div": {
      width: "calc(100% - 50px) !important",
      display: "inline-flex !important",
    },
    // action button
    "& button": {
      float: "right",
    },
  },
  subHeaderTitle: {
    padding: "10px 0px",
    display: "block",
  },
  menuContent: {
    padding: "10px 20px",
  },
}));

const J2RSelectScopeModalSimple = ({
  scopes,
  element,
  onSubmit,
  removeKeyBinding = () => {},
  restoreKeyBinding = () => {},
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
    removeKeyBinding();
  };

  const closeModal = () => {
    setIsOpen(false);
    restoreKeyBinding();
  };

  return (
    <>
      {React.cloneElement(element, {
        onClick: openModal,
      })}
      <SelectScopeModal
        open={isOpen}
        onCancel={closeModal}
        onSubmit={(selectedScopeItem) => {
          closeModal();
          onSubmit(selectedScopeItem);
        }}
        scopeList={scopes}
      ></SelectScopeModal>
    </>
  );
};

const CenteredBadge = withStyles((theme) => ({
  badge: {
    right: -10,
    top: 2,
  },
}))(Badge);

const ComputedAnnotations = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [searchText, setSearch] = React.useState("");
  const {
    disabled,
    annotationNames,
    overrides,
    isLogicGraphEdge,
    updateComputation,
    removeKeyBinding,
    restoreKeyBinding,
  } = props;

  /**
   * Stringify values if necessary to render
   * @param {Array} dataArray : Data to be rendered in table
   * @returns {Array} Data with values stringified if necessary
   */
  const formatData = (dataArray) => {
    const newDataArray = [];
    dataArray.forEach((item, index) => {
      newDataArray[index] = { ...dataArray[index] };
      if (item.annotation?.type === "config" && !isObject(item.value)) {
        const currentConfigValue = item.value;
        newDataArray[index].value = { "": currentConfigValue };
      }
      if (
        typeof item.value !== DATA_TYPES.STRING &&
        item.annotation?.type !== "config"
      ) {
        newDataArray[index].value = JSON.stringify(item.value);
      }
    });
    return newDataArray;
  };

  /**
   * Component did mount and did update props
   */
  useEffect(() => {
    const overWriteData = (listOfAnnotations, overwrites) => {
      const overwrittenData = [...listOfAnnotations];
      const annotationsByKey = _groupBy(overwrittenData, (x) => x.key);
      overwrites &&
        Object.keys(overwrites).forEach((annotationKey) => {
          const value = overwrites[annotationKey];
          const [baseKey, ...restKey] = annotationKey.split(".");
          const [annotValue] = annotationsByKey[baseKey];
          annotValue.overwritten = true;
          if (restKey.length < 1) {
            annotValue.value = value;
          } else {
            _set(annotValue.value, restKey, value);
          }
        });
      return overwrittenData;
    };

    const getComputedAnnotations = () => {
      return Rest.cloudFunction({
        cbName: "backend.viewer",
        func: "getComputedAnnotations",
        args: [annotationNames],
      })
        .then((res) => {
          return res.success ? res.result : [];
        })
        .then((res) => {
          const overWrittenData = overWriteData(res, overrides);
          setData(overWrittenData);
        });
    };
    getComputedAnnotations();
  }, [updateComputation, annotationNames, overrides]); // updateComputation needs to be here!!

  return data.length ? (
    <Typography component="div">
      <Typography component="div" className={classes.searchHeader}>
        <Divider />
        <Typography className={classes.subHeaderTitle}>Computed</Typography>
        <Search
          removeKeyBinding={removeKeyBinding}
          restoreKeyBinding={restoreKeyBinding}
          search={(input) => {
            setSearch(input);
          }}
        />
        <ComputedAnnotationsModal
          editable={!disabled}
          data={formatData(data)}
          element={
            <Tooltip title={`Open Computed Annotations`}>
              <IconButton
                edge="end"
                aria-label="add"
                className={classes.actionBtn}
              >
                <InputIcon color="action" />
              </IconButton>
            </Tooltip>
          }
          nodeItem={{}}
          snackbar={snackbar}
          overrides={overrides}
          removeKeyBinding={removeKeyBinding}
          restoreKeyBinding={restoreKeyBinding}
          onKeyOverride={props.onKeyOverride}
          onDeleteOverride={props.onDeleteOverride}
        />
        <Divider />
      </Typography>
      <Typography component="div" className={classes.menuContent}>
        {data
          .filter((item) => {
            return (
              normalizeStr(item.key).includes(normalizeStr(searchText)) ||
              normalizeStr(item.annotation.value).includes(
                normalizeStr(searchText),
              )
            );
          })
          .map((item, index) => {
            const itemKey = stringify(item.key);
            const itemValue =
              item.annotation.type === "config"
                ? stringify(item.annotation.value)
                : stringify(item.value);
            return (
              <div key={item.key + "-" + index}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography
                      component="div"
                      className={classes.overflowEllipsis}
                    >
                      <Tooltip title={itemKey} arrow={true}>
                        <span>{itemKey}</span>
                      </Tooltip>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      component="div"
                      className={classes.overflowEllipsis}
                    >
                      <Tooltip title={itemValue} arrow={true}>
                        <span>{itemValue}</span>
                      </Tooltip>
                    </Typography>
                  </Grid>
                  {item.overwritten && (
                    <Tooltip title="Key overwritten">
                      <Grid item xs={1}>
                        <CenteredBadge
                          color="primary"
                          invisible={!item.overwritten}
                        ></CenteredBadge>
                      </Grid>
                    </Tooltip>
                  )}
                </Grid>
                {item.annotation?.type === "config" && (
                  <Typography component="div">
                    <TreeViewData data={item.value} />
                  </Typography>
                )}
              </div>
            );
          })}
      </Typography>
    </Typography>
  ) : (
    <></>
  );
};

const J2RSelectScopeModal = ({
  scopes = {},
  name = "",
  onChange = () => {},
  disabled = false,
  value = "",
  filter = () => true,
  removeKeyBinding = () => {},
  restoreKeyBinding = () => {},
  submitForm = () => {},
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();

  // remove scope name from document url
  const formattedValue = selectedValue
    ? selectedValue.replace("/" + scopes, "")
    : "";

  const handleSubmitForm = () => {
    submitForm();
  };

  const openModal = () => {
    setIsOpen(true);
    removeKeyBinding();
  };

  const closeModal = () => {
    setIsOpen(false);
    restoreKeyBinding();
  };

  return (
    <div className={`${classes.base} ${classes.selectScope}`}>
      <Tooltip title={selectedValue}>
        <TextField
          disabled
          style={{ width: "100%" }}
          className={classes.overflowEllipsis}
          label={name}
          defaultValue={formattedValue}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={disabled}
                  aria-label="edit"
                  onClick={openModal}
                >
                  <EditIcon></EditIcon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
      <SelectScopeModal
        open={isOpen}
        onCancel={closeModal}
        onSubmit={(selectedScopeItem) => {
          setSelectedValue(selectedScopeItem);
          closeModal();
          onChange(selectedScopeItem);
          handleSubmitForm();
        }}
        filter={filter}
        scopeList={[scopes]}
      ></SelectScopeModal>
    </div>
  );
};

const stringify = (value) => {
  return typeof value === DATA_TYPES.STRING
    ? value
    : JSON.stringify(value ?? "");
};

const normalizeStr = (anyValue) => {
  const answer = stringify(anyValue);
  return answer.toLocaleLowerCase();
};
