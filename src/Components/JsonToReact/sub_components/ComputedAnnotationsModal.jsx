import { IconButton, Input, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import {
  default as ChevronRight,
  default as ChevronRightIcon,
} from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import { MTableCell } from "@material-table/core";
import React, { forwardRef } from "react";
import { useExpanded, useTable } from "react-table";
import CustomMaterialTable from "./../../CustomMaterialTable";
import BaseModal from "../../Modal/BaseModal";
import { DATA_TYPES } from "../../../Utils/DataTypes";
import { isObject, validateDataType } from "../../../Utils/Utils";

const useStyles = makeStyles((_theme) => ({
  displayNone: { display: "none" },
  configIcon: { height: 25, width: 25, marginLeft: 10 },
  configValueCell: { textAlign: "right", paddingRight: 100 },
}));

const ComputedAnnotationsModal = (props) => {
  const {
    element,
    data,
    editable,
    overrides,
    onKeyOverride,
    onDeleteOverride,
    removeKeyBinding,
    restoreKeyBinding,
    snackbar,
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();

  const tableIcons = {
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <UndoIcon {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Check: forwardRef((props, ref) => (
      <Check {...props} color="action" ref={ref} />
    )),
    Clear: forwardRef((props, ref) => (
      <Clear {...props} color="action" ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
  };

  const columns = [
    { title: "Key", field: "key", editable: "never" },
    {
      title: "Type",
      field: "annotation.type",
      editable: "never",
      render: (rowData) => (
        <Typography component="div">
          {DATA_TYPES?.[rowData.annotation?.type]?.label}
        </Typography>
      ),
    },
    {
      title: "Value",
      field: "value",
      editComponent: (props) =>
        DATA_TYPES[props.rowData.annotation?.type || "default"].editComponent(
          props,
        ),
      render: (rowData) => {
        return (
          <Typography component="div">
            {rowData.annotation?.type === "config"
              ? rowData.annotation.value
              : rowData.value}
          </Typography>
        );
      },
    },
    {
      title: "Annotation",
      field: "annotation.name",
      editable: "never",
      render: (rowData) => {
        return (
          <Typography component="div">
            {rowData.annotation.type !== "config" && rowData.overwritten
              ? "__overwritten__"
              : rowData.annotation.name}
            {rowData.annotation.type === "config" &&
              rowData.overwritten &&
              " (overwritten)"}
          </Typography>
        );
      },
    },
  ];

  const formattedConfigData = (data, depth = 1, path = []) => {
    return Object.keys(data).map((key) => {
      const newPath = [...path, key];
      if (isObject(data[key]))
        return {
          id: key,
          depth,
          key,
          path: newPath,
          subRows: formattedConfigData(data[key], depth + 1, newPath),
          canExpand: true,
        };
      else
        return {
          id: key,
          key,
          subRows: [],
          path: newPath,
          value:
            typeof data[key] === "string"
              ? data[key]
              : JSON.stringify(data[key]),
          canExpand: false,
          depth,
        };
    });
  };

  const detailPanel = [
    (rowData) => ({
      disabled: rowData.annotation?.type !== "config",
      icon: () => (
        <ChevronRight
          className={
            rowData.annotation?.type !== "config" ? classes.displayNone : ""
          }
        />
      ),
      openIcon: ExpandMoreIcon,
      render: () => (
        <ConfigDataTable
          rowKey={rowData.key}
          data={formattedConfigData(
            rowData.annotation?.type === "config" ? rowData.value : {},
          )}
          onOverrideConfigKey={(key, value) =>
            onOverrideConfigKey(rowData.key, key, value)
          }
          onDeleteOverride={(key) => onDeleteOverride({ key }, true)}
          overrides={overrides}
          editable={editable}
        ></ConfigDataTable>
      ),
    }),
  ];

  /**
   * Add key override
   * @param {Object} data : Key row data
   * @returns {Promise} to be resolved on uppon confirmation
   */
  const onOverrideRow = (newData) => {
    return new Promise((resolve, reject) => {
      return validateDataType(newData.value, newData.annotation?.type).then(
        (paramValidation) => {
          if (paramValidation.isValid) {
            const parsedValue = DATA_TYPES[newData.annotation?.type].parse(
              newData.value,
            );
            onKeyOverride(newData.key, parsedValue);
            resolve();
          } else {
            const errorMessage = paramValidation.error || "Invalid data type";
            snackbar({ message: errorMessage, severity: "error" });
            reject(errorMessage);
          }
        },
      );
    });
  };

  /**
   * Delete key override
   * @param {Object} data : Key row data
   * @returns {Promise} to be resolved on uppon confirmation
   */
  const onRevertOverride = (data) => {
    return new Promise((resolve) => {
      onDeleteOverride(data);
      resolve();
    });
  };

  /**
   * On request override config key
   * @param {Object} rowDataKey : Key row data
   * @param {String} key : Key name
   * @param {*} value : New value
   */
  const onOverrideConfigKey = (rowDataKey, key, value) => {
    const newKey = `${rowDataKey}.${key}`;
    onKeyOverride(newKey, value);
  };

  /**
   * Open modal and remove key bindings from scene
   */
  const openModal = () => {
    removeKeyBinding();
    setIsOpen(true);
  };

  /**
   * Close modal and restore key bindings for scene
   */
  const closeModal = () => {
    setIsOpen(false);
    restoreKeyBinding();
  };

  return (
    <>
      {React.cloneElement(element, {
        onClick: openModal,
      })}
      <BaseModal
        open={isOpen}
        width={"65%"}
        title={"Computed Annotations"}
        hasSubmitButton={false}
        hasCancelButton={false}
        onCancel={closeModal}
      >
        <CssBaseline />
        <CustomMaterialTable
          style={{ boxShadow: "none", justifyContent: "center" }}
          title=""
          columns={columns}
          data={data}
          editable={{
            isEditable: (rowData) =>
              rowData.annotation?.type !== "config" && editable,
            onRowUpdate: (newData) => onOverrideRow(newData),
            // on "delete" -> does revert override
            isDeletable: (rowData) => rowData.overwritten && editable,
            onRowDelete: (rowData) => onRevertOverride(rowData),
          }}
          detailPanel={detailPanel}
          options={{
            rowStyle: (rowData, index) => {
              return index % 2 === 0
                ? {}
                : { backgroundColor: theme?.nodeEditor?.stripeColor };
            },
            search: true,
            searchFieldAlignment: "left",
            actionsColumnIndex: -1,
            draggable: false,
            grouping: false,
            paging: false,
          }}
          components={{
            Cell: (props) => (
              <MTableCell
                {...props}
                style={{
                  fontWeight: "normal",
                }}
              />
            ),
            Action: (props) => {
              const action =
                typeof props.action === "function"
                  ? props.action(props.data)
                  : props.action;
              const iconColor = action.disabled ? "inherit" : "primary";
              // Render action icon button
              return (
                <IconButton
                  disabled={action.disabled}
                  onClick={(event) => {
                    action.onClick(event, props.data);
                  }}
                >
                  {action.icon?.render({ color: iconColor })}
                </IconButton>
              );
            },
          }}
          icons={tableIcons}
          localization={{
            body: {
              editRow: { deleteText: "Are you sure to remove this override?" },
              deleteTooltip: "Remove override",
            },
          }}
        />
      </BaseModal>
    </>
  );
};

/**
 * ConfigDataTable : Render Collapsible/Expandable table
 * @param {*} props : Receive the following object as props
 *  {
 *    data        : Object in tree data
 *    editable    : Boolean to inform if the value can be editable or not
 *    overrideKey : Function to be called on change confirmation
 *  }
 */
const ConfigDataTable = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  const data = props.data;
  const columns = React.useMemo(
    () => [
      {
        id: "expander", // Make sure it has an ID
        Cell: ({ row }) => {
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          return row.subRows.length > 0 ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${(row.depth + 1) * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </span>
          ) : null;
        },
      },
      {
        Header: "Key",
        accessor: "key",
      },
      {
        Header: "Value",
        accessor: "value",
      },
    ],
    [],
  );

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, rows, prepareRow } = useTable(
    {
      columns,
      data,
      autoResetExpanded: false,
    },
    useExpanded, // Use the useExpanded plugin hook
  );

  const getStripedStyle = (index) => {
    return { backgroundColor: index % 2 ? theme?.table?.stripColor : "unset" };
  };

  return (
    <MaUTable {...getTableProps()}>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow key={i} style={{ ...getStripedStyle(i) }}>
              <TableCell
                {...row.cells[0].getCellProps({
                  style: {
                    width: "50px",
                    padding: `0 0.5rem`,
                  },
                })}
              >
                {row.cells[0].render("Cell")}
              </TableCell>
              <TableCell
                {...row.cells[1].getCellProps({
                  style: {
                    paddingLeft: `0.5rem`,
                  },
                })}
              >
                <span style={{ paddingLeft: `${row.depth * 1.3}rem` }}>
                  {row.cells[1].render("Cell")}
                  {row.subRows.length !== 0 && ` (${row.subRows.length})`}
                </span>
              </TableCell>
              <TableCell className={classes.configValueCell}>
                <OverridableConfigKeys
                  cell={row.cells[2]}
                  row={{ ...row, rowKey: props.rowKey }}
                  editable={props.editable}
                  overrides={props.overrides}
                  overrideKey={props.onOverrideConfigKey}
                  onDeleteOverride={props.onDeleteOverride}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

/**
 * OverridableConfigKeys : Render editable config key's values
 * @param {*} props : Receive the following object as props
 *  {
 *    cell        : Row cell to be rendered
 *    row         : Row object
 *    editable    : Boolean to inform if the value can be editable or not
 *    overrideKey : Function to be called on change confirmation
 *  }
 */
const OverridableConfigKeys = (props) => {
  const [isEditing, setEditing] = React.useState(false);
  const inputRef = React.useRef();
  const classes = useStyles();
  const keyPath = props.row.original.path.join(".");
  const keyFullPath = [props.row.rowKey, ...keyPath.split(".")].join(".");
  const hasOverrides = Object.keys(props.overrides).includes(keyFullPath);

  /**
   * Override key inside configuration
   * @param {*} value
   */
  const confirmEditing = (value) => {
    props.overrideKey(keyPath, value);
    setEditing(false);
  };

  /**
   * Remove key override in configuration
   */
  const deleteConfigOverride = () => {
    props.onDeleteOverride(keyFullPath);
  };

  /**
   * Get component to be render when overriding config key
   * @returns {ReactComponent} Editing component
   */
  const getEditingComponent = () => {
    const currentValue = props.row.original.value;
    return (
      <Typography component="div">
        <Input
          type="text"
          ref={inputRef}
          defaultValue={currentValue}
          onKeyPress={(evt) => {
            if (evt.key === "Enter") confirmEditing(evt.target.value);
          }}
        ></Input>
        <IconButton
          className={classes.configIcon}
          onClick={() => {
            const inputValue = inputRef.current.querySelector("input").value;
            confirmEditing(inputValue);
          }}
        >
          <Check color="action" fontSize="small"></Check>
        </IconButton>
        <IconButton
          className={classes.configIcon}
          onClick={() => setEditing(false)}
        >
          <Clear color="action" fontSize="small"></Clear>
        </IconButton>
      </Typography>
    );
  };

  return (
    <>
      {!isEditing ? (
        <>
          {props.cell.render("Cell")}{" "}
          {props.row.subRows.length === 0 && (
            <>
              <IconButton
                className={classes.configIcon}
                disabled={!props.editable}
                onClick={() => setEditing(true)}
              >
                <Edit fontSize="small"></Edit>
              </IconButton>
              <IconButton
                className={classes.configIcon}
                disabled={!(props.editable && hasOverrides)}
                onClick={deleteConfigOverride}
              >
                <UndoIcon fontSize="small"></UndoIcon>
              </IconButton>
            </>
          )}
        </>
      ) : (
        getEditingComponent()
      )}
    </>
  );
};

// Default props definition
ComputedAnnotationsModal.defaultProps = {
  editable: true,
  removeKeyBinding: () => {},
  restoreKeyBinding: () => {},
};

export default ComputedAnnotationsModal;
